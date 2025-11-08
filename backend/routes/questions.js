const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Question = require('../models/Question');
const User = require('../models/User');
const { auth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Helper to clean query parameters
const cleanQueryParams = (params) => {
  const cleaned = {};
  Object.keys(params).forEach(key => {
    if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
      cleaned[key] = params[key];
    }
  });
  return cleaned;
};

// Get all questions with filtering and pagination - FIXED VALIDATION
router.get('/', optionalAuth, [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('difficulty').optional().isIn(['easy', 'medium', 'hard', '']).withMessage('Invalid difficulty level'),
  query('topic').optional().isString().trim().withMessage('Topic must be a string'),
  query('company').optional().isString().trim().withMessage('Company must be a string'),
  query('search').optional().isString().trim().withMessage('Search must be a string'),
  query('sort').optional().isIn(['newest', 'oldest', 'difficulty', 'acceptance', '']).withMessage('Invalid sort option')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    // Clean query parameters
    const cleanedQuery = cleanQueryParams(req.query);
    
    const {
      page = 1,
      limit = 20,
      difficulty,
      topic,
      company,
      search,
      sort = 'newest'
    } = cleanedQuery;

    console.log('Cleaned query parameters:', cleanedQuery);

    // Build filter object
    const filter = { isActive: true };
    
    if (difficulty && difficulty !== '') {
      filter.difficulty = difficulty;
    }
    
    if (topic && topic !== '') {
      filter.topics = { $regex: topic, $options: 'i' };
    }
    
    if (company && company !== '') {
      filter.companies = { $regex: company, $options: 'i' };
    }
    
    if (search && search !== '') {
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
        // Use aggregation for proper difficulty sorting
        try {
          const skip = (parseInt(page) - 1) * parseInt(limit);
          
          const aggregation = [
            { $match: filter },
            {
              $addFields: {
                difficultyOrder: {
                  $switch: {
                    branches: [
                      { case: { $eq: ["$difficulty", "easy"] }, then: 1 },
                      { case: { $eq: ["$difficulty", "medium"] }, then: 2 },
                      { case: { $eq: ["$difficulty", "hard"] }, then: 3 }
                    ],
                    default: 4
                  }
                }
              }
            },
            { $sort: { difficultyOrder: 1, createdAt: -1 } },
            { $skip: skip },
            { $limit: parseInt(limit) },
            { $project: { solutions: 0, testCases: 0, difficultyOrder: 0 } }
          ];
          
          const questions = await Question.aggregate(aggregation);
          const total = await Question.countDocuments(filter);

          // Mark solved questions if user is authenticated
          let solvedQuestionIds = [];
          if (req.user) {
            try {
              const user = await User.findById(req.user._id).select('solvedQuestions');
              solvedQuestionIds = user?.solvedQuestions?.map(sq => sq.questionId?.toString()).filter(Boolean) || [];
            } catch (userError) {
              console.error('Error fetching user data:', userError);
            }
          }

          const questionsWithStatus = questions.map(q => ({
            ...q,
            isSolved: solvedQuestionIds.includes(q._id.toString())
          }));

          return res.json({
            questions: questionsWithStatus,
            pagination: {
              currentPage: parseInt(page),
              totalPages: Math.ceil(total / parseInt(limit)),
              totalQuestions: total,
              hasNext: skip + questions.length < total,
              hasPrev: parseInt(page) > 1
            }
          });
        } catch (aggError) {
          console.error('Aggregation error:', aggError);
          // Fallback to basic sorting
          sortObj = { difficulty: 1 };
        }
        break;
      case 'acceptance':
        sortObj = { acceptanceRate: -1 };
        break;
      default:
        sortObj = { createdAt: -1 };
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
      try {
        const user = await User.findById(req.user._id).select('solvedQuestions');
        solvedQuestionIds = user?.solvedQuestions?.map(sq => sq.questionId?.toString()).filter(Boolean) || [];
      } catch (userError) {
        console.error('Error fetching user data:', userError);
      }
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
    res.status(500).json({ 
      message: 'Server error while fetching questions',
      error: error.message 
    });
  }
});

// Get single question by ID
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    // Validate ID format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid question ID format' });
    }

    const question = await Question.findById(req.params.id);
    
    if (!question || !question.isActive) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if user has solved this question
    let isSolved = false;
    let userSubmission = null;
    
    if (req.user) {
      try {
        const user = await User.findById(req.user._id).select('solvedQuestions');
        const solvedQuestion = user?.solvedQuestions?.find(
          sq => sq.questionId?.toString() === question._id.toString()
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
      } catch (userError) {
        console.error('Error checking solved status:', userError);
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
    res.status(500).json({ 
      message: 'Server error while fetching question',
      error: error.message 
    });
  }
});

// Submit solution
router.post('/:id/submit', auth, [
  body('code').notEmpty().withMessage('Code is required'),
  body('language').notEmpty().withMessage('Language is required'),
  body('timeTaken').isFloat({ min: 0 }).withMessage('Time taken must be a positive number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code, language, timeTaken } = req.body;
    const questionId = req.params.id;

    // Validate ID format
    if (!questionId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid question ID format' });
    }

    const question = await Question.findById(questionId);
    if (!question || !question.isActive) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Simple test case validation
    const isCorrect = await validateSolution(code, language, question.testCases);
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Initialize solvedQuestions if it doesn't exist
    if (!user.solvedQuestions) {
      user.solvedQuestions = [];
    }

    // Check if already solved
    let existingSubmission = user.solvedQuestions.find(
      sq => sq.questionId?.toString() === questionId
    );

    let attempts = 1;

    if (isCorrect) {
      if (!existingSubmission) {
        // First time solving
        user.solvedQuestions.push({
          questionId: question._id,
          code,
          language,
          attempts: 1,
          timeTaken,
          solvedAt: new Date(),
          isCorrect: true
        });
        question.totalSubmissions += 1;
        question.correctSubmissions += 1;
      } else {
        // Re-solving, update attempts
        existingSubmission.attempts += 1;
        existingSubmission.code = code;
        existingSubmission.language = language;
        existingSubmission.timeTaken = timeTaken;
        existingSubmission.solvedAt = new Date();
        existingSubmission.isCorrect = true;
        attempts = existingSubmission.attempts;
        
        // Only count as new submission if it wasn't already correct
        if (!existingSubmission.isCorrect) {
          question.totalSubmissions += 1;
          question.correctSubmissions += 1;
        }
      }
    } else {
      if (existingSubmission) {
        existingSubmission.attempts += 1;
        attempts = existingSubmission.attempts;
        question.totalSubmissions += 1;
      } else {
        // First attempt, add to solved questions with isCorrect: false
        user.solvedQuestions.push({
          questionId: question._id,
          code,
          language,
          attempts: 1,
          timeTaken,
          solvedAt: new Date(),
          isCorrect: false
        });
        question.totalSubmissions += 1;
      }
    }

    // Update acceptance rate
    question.acceptanceRate = question.totalSubmissions === 0 ? 0 : 
      Math.round((question.correctSubmissions / question.totalSubmissions) * 100);

    await user.save();
    await question.save();

    res.json({
      isCorrect,
      message: isCorrect ? 'Solution accepted!' : 'Solution needs improvement. Check your logic and try again.',
      attempts: attempts
    });
  } catch (error) {
    console.error('Submit solution error:', error);
    res.status(500).json({ 
      message: 'Server error while submitting solution',
      error: error.message 
    });
  }
});

// Get AI hints
router.post('/:id/hints', auth, [
  body('description').notEmpty().withMessage('Description is required'),
  body('code').optional().isString().withMessage('Code must be a string'),
  body('difficulty').optional().isIn(['easy', 'medium', 'hard']).withMessage('Difficulty must be easy, medium, or hard')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, code, difficulty } = req.body;
    
    // Simple hint generation
    const hints = generateHints(description, difficulty);
    
    res.json({ hints });
  } catch (error) {
    console.error('Hints error:', error);
    res.status(500).json({ 
      message: 'Server error while generating hints',
      error: error.message 
    });
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

    // Simple debug help
    // const debugHelp = generateDebugHelp(code, language, errorMessage);
    const debugHelp = await geminiService.debugCode(code, language, errorMessage, testCase);
    
    res.json({ debugHelp });
  } catch (error) {
    console.error('Debug help error:', error);
    res.status(500).json({ 
      message: 'Server error while getting debug help',
      error: error.message 
    });
  }
});

// Get AI explanation for algorithm
router.post('/explain-algorithm', auth, [
  body('algorithm').notEmpty().withMessage('Algorithm name is required'),
  body('code').notEmpty().withMessage('Code is required'),
  body('language').notEmpty().withMessage('Language is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { algorithm, code, language } = req.body;
    
    // Simple explanation
    // const explanation = generateAlgorithmExplanation(algorithm, code, language);
    const explanation = await geminiService.explainAlgorithm(algorithm, code);
    
    res.json({ explanation });
  } catch (error) {
    console.error('Algorithm explanation error:', error);
    res.status(500).json({ 
      message: 'Server error while getting explanation',
      error: error.message 
    });
  }
});

// Get edge cases for a problem
router.get('/:id/edge-cases', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Simple edge cases generation
    // const edgeCases = generateEdgeCases(question.description);
     const edgeCases = await geminiService.generateEdgeCases(
      question.description,
      question.solutions[0]?.code || ''
    );
    
    res.json({ edgeCases });
  } catch (error) {
    console.error('Edge cases error:', error);
    res.status(500).json({ 
      message: 'Server error while generating edge cases',
      error: error.message 
    });
  }
});

// Get topics and companies for filtering
router.get('/meta/filters', async (req, res) => {
  try {
    const topics = await Question.distinct('topics', { isActive: true });
    const companies = await Question.distinct('companies', { isActive: true });
    
    // Filter out null/undefined and empty strings, then sort
    const cleanTopics = topics.filter(t => t && t.trim() !== '').sort();
    const cleanCompanies = companies.filter(c => c && c.trim() !== '').sort();
    
    res.json({ 
      topics: cleanTopics, 
      companies: cleanCompanies 
    });
  } catch (error) {
    console.error('Get filters error:', error);
    res.status(500).json({ 
      message: 'Server error while fetching filters',
      error: error.message 
    });
  }
});

// Simple solution validation
async function validateSolution(code, language, testCases) {
  try {
    if (!code || code.trim().length === 0) {
      return false;
    }
    
    // Basic validation - in real implementation, you would run the code against test cases
    if (language === 'javascript') {
      try {
        // Basic syntax check for JavaScript
        new Function(code);
        return true;
      } catch (e) {
        return false;
      }
    }
    
    if (language === 'python') {
      // Basic Python syntax check
      const hasDef = /def\s+\w+\(/.test(code);
      return hasDef;
    }
    
    // For other languages, return true for basic validation
    return code.length > 5;
  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
}

// Helper functions for AI features
function generateHints(description, difficulty) {
  const baseHints = [
    "Think about the problem step by step",
    "Consider edge cases and boundary conditions",
    "Break down the problem into smaller subproblems",
    "Try to solve the problem manually with examples first"
  ];
  
  const difficultyHints = {
    easy: [
      "Try a brute force approach first",
      "Consider using basic data structures like arrays or objects",
      "Focus on getting a working solution before optimizing"
    ],
    medium: [
      "Think about time and space complexity optimization",
      "Consider using hash maps or two-pointer technique",
      "Look for patterns that can be optimized"
    ],
    hard: [
      "Consider dynamic programming or divide and conquer",
      "Think about graph algorithms or advanced data structures",
      "Break the problem into multiple simpler subproblems"
    ]
  };
  
  const hints = [...baseHints, ...(difficultyHints[difficulty] || [])];
  return hints.join('\n• ');
}

// function generateDebugHelp(code, language, errorMessage) {
//   return `Debug help for ${language} code:

// Common issues to check:
// 1. Syntax errors in your code
// 2. Variable naming consistency
// 3. Proper return statements
// 4. Edge case handling
// 5. Loop termination conditions

// Error context: ${errorMessage}

// Review your logic and test with sample inputs.`;
// }

// function generateAlgorithmExplanation(algorithm, code, language) {
//   return `Algorithm Explanation for ${algorithm}:

// This solution implements the ${algorithm} approach in ${language}.

// Key points:
// 1. Time complexity analysis
// 2. Space complexity considerations
// 3. Step-by-step logic breakdown
// 4. Key operations and their purpose

// The code follows best practices for ${language} programming.`;
// }

// function generateEdgeCases(description) {
//   return `Common edge cases to consider:
// 1. Empty input
// 2. Single element input
// 3. Large input sizes
// 4. Negative numbers (if applicable)
// 5. Duplicate values
// 6. Sorted/unsorted input
// 7. Boundary values`;
// }

module.exports = router;