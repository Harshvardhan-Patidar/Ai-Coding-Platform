const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Question = require('../models/Question');
const User = require('../models/User');
const { auth, optionalAuth } = require('../middleware/auth');
const geminiService = require('../utils/gemini');

const router = express.Router();

// Get all questions with filtering and pagination
router.get('/', optionalAuth, [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('difficulty').optional().isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty level'),
  query('topic').optional().isString().withMessage('Topic must be a string'),
  query('company').optional().isString().withMessage('Company must be a string'),
  query('search').optional().isString().withMessage('Search must be a string'),
  query('sort').optional().isIn(['newest', 'oldest', 'difficulty', 'acceptance']).withMessage('Invalid sort option')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 20,
      difficulty,
      topic,
      company,
      search,
      sort = 'newest'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topics = { $in: [new RegExp(topic, 'i')] };
    if (company) filter.companies = { $in: [new RegExp(company, 'i')] };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { topics: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'oldest':
        sortObj = { createdAt: 1 };
        break;
      case 'difficulty':
        sortObj = { difficulty: 1 };
        break;
      case 'acceptance':
        sortObj = { acceptanceRate: -1 };
        break;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const questions = await Question.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-solutions -testCases');

    const total = await Question.countDocuments(filter);

    // Mark solved questions if user is authenticated
    let solvedQuestionIds = [];
    if (req.user) {
      const user = await User.findById(req.user._id).select('solvedQuestions');
      solvedQuestionIds = user.solvedQuestions.map(sq => sq.questionId.toString());
    }

    const questionsWithStatus = questions.map(q => ({
      ...q.toObject(),
      isSolved: solvedQuestionIds.includes(q._id.toString())
    }));

    res.json({
      questions: questionsWithStatus,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalQuestions: total,
        hasNext: skip + questions.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({ message: 'Server error while fetching questions' });
  }
});

// Get single question by ID
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question || !question.isActive) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if user has solved this question
    let isSolved = false;
    let userSubmission = null;
    
    if (req.user) {
      const user = await User.findById(req.user._id).select('solvedQuestions');
      const solvedQuestion = user.solvedQuestions.find(
        sq => sq.questionId.toString() === question._id.toString()
      );
      
      if (solvedQuestion) {
        isSolved = true;
        userSubmission = {
          code: solvedQuestion.code,
          language: solvedQuestion.language,
          solvedAt: solvedQuestion.solvedAt,
          timeTaken: solvedQuestion.timeTaken,
          attempts: solvedQuestion.attempts
        };
      }
    }

    res.json({
      question: {
        ...question.toObject(),
        isSolved,
        userSubmission
      }
    });
  } catch (error) {
    console.error('Get question error:', error);
    res.status(500).json({ message: 'Server error while fetching question' });
  }
});

// Submit solution
router.post('/:id/submit', auth, [
  body('code').notEmpty().withMessage('Code is required'),
  body('language').notEmpty().withMessage('Language is required'),
  body('timeTaken').isNumeric().withMessage('Time taken must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code, language, timeTaken } = req.body;
    const questionId = req.params.id;

    const question = await Question.findById(questionId);
    if (!question || !question.isActive) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Simple test case validation (in production, use proper code execution)
    const isCorrect = await validateSolution(code, language, question.testCases);
    
    const user = await User.findById(req.user._id);
    
    // Check if already solved
    const existingSubmission = user.solvedQuestions.find(
      sq => sq.questionId.toString() === questionId
    );

    if (isCorrect) {
      if (!existingSubmission) {
        // First time solving
        user.updateStats(question, timeTaken, 1);
        question.updateAcceptanceRate(true);
      } else {
        // Re-solving, update attempts
        existingSubmission.attempts += 1;
        existingSubmission.code = code;
        existingSubmission.language = language;
        existingSubmission.timeTaken = timeTaken;
        existingSubmission.solvedAt = new Date();
      }
    } else {
      if (existingSubmission) {
        existingSubmission.attempts += 1;
      } else {
        // First attempt, add to solved questions with isCorrect: false
        user.solvedQuestions.push({
          questionId: question._id,
          code,
          language,
          attempts: 1,
          timeTaken
        });
      }
      question.updateAcceptanceRate(false);
    }

    await user.save();
    await question.save();

    res.json({
      isCorrect,
      message: isCorrect ? 'Solution accepted!' : 'Solution needs improvement',
      attempts: existingSubmission ? existingSubmission.attempts : 1
    });
  } catch (error) {
    console.error('Submit solution error:', error);
    res.status(500).json({ message: 'Server error while submitting solution' });
  }
});

// Get AI debugging help
router.post('/:id/debug', auth, [
  body('code').notEmpty().withMessage('Code is required'),
  body('language').notEmpty().withMessage('Language is required'),
  body('errorMessage').notEmpty().withMessage('Error message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code, language, errorMessage, testCase } = req.body;
    
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const debugHelp = await geminiService.debugCode(code, language, errorMessage, testCase);
    
    res.json({ debugHelp });
  } catch (error) {
    console.error('Debug help error:', error);
    res.status(500).json({ message: 'Server error while getting debug help' });
  }
});

// Get AI explanation for algorithm
router.post('/:id/explain', auth, [
  body('code').notEmpty().withMessage('Code is required'),
  body('algorithm').notEmpty().withMessage('Algorithm name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code, algorithm } = req.body;
    
    const explanation = await geminiService.explainAlgorithm(algorithm, code);
    
    res.json({ explanation });
  } catch (error) {
    console.error('Algorithm explanation error:', error);
    res.status(500).json({ message: 'Server error while getting explanation' });
  }
});

// Get edge cases for a problem
router.get('/:id/edge-cases', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const edgeCases = await geminiService.generateEdgeCases(
      question.description,
      question.solutions[0]?.code || ''
    );
    
    res.json({ edgeCases });
  } catch (error) {
    console.error('Edge cases error:', error);
    res.status(500).json({ message: 'Server error while generating edge cases' });
  }
});

// Get topics and companies for filtering
router.get('/meta/filters', async (req, res) => {
  try {
    const topics = await Question.distinct('topics');
    const companies = await Question.distinct('companies');
    
    res.json({ topics, companies });
  } catch (error) {
    console.error('Get filters error:', error);
    res.status(500).json({ message: 'Server error while fetching filters' });
  }
});

// Simple solution validation (replace with proper code execution in production)
async function validateSolution(code, language, testCases) {
  // This is a simplified validation
  // In production, you would use a proper code execution service
  // For now, we'll do basic checks
  
  if (!code || code.trim().length === 0) {
    return false;
  }
  
  // Basic syntax checks based on language
  if (language === 'javascript') {
    try {
      // Basic syntax validation
      new Function(code);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  // For other languages, you would implement proper validation
  return true;
}

module.exports = router;
