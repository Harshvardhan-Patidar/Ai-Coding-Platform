const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Question = require('../models/Question');
const User = require('../models/User');
const geminiService = require('../utils/gemini');
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

// Get all questions with filtering and pagination
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
        sortObj = { 
          difficulty: {
            $cond: {
              if: { $eq: ["$difficulty", "easy"] },
              then: 1,
              else: {
                $cond: {
                  if: { $eq: ["$difficulty", "medium"] },
                  then: 2,
                  else: 3
                }
              }
            }
          }
        };
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

// Submit solution using Gemini AI for evaluation
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

    // Use Gemini AI to evaluate the solution
    const prompt = `
Evaluate this ${language} code solution for the following problem:

PROBLEM TITLE: ${question.title}
PROBLEM DESCRIPTION: ${question.description}

EXAMPLES:
${question.examples?.map(ex => `Input: ${ex.input}\nOutput: ${ex.output}\nExplanation: ${ex.explanation || 'None'}`).join('\n\n')}

CONSTRAINTS:
${question.constraints?.join('\n')}

USER'S CODE:
\`\`\`${language}
${code}
\`\`\`

Please analyze this code and determine if it correctly solves the problem. Consider:
1. Does it handle all the examples correctly?
2. Does it satisfy all constraints?
3. Are there any logical errors?
4. Does it handle edge cases?

Respond with a JSON object in this exact format:
{
  "isCorrect": true/false,
  "feedback": "Detailed feedback about the solution",
  "score": 0-100,
  "issues": ["list of specific issues found"],
  "suggestions": ["list of improvement suggestions"]
}
    `;

    const aiEvaluation = await geminiService.generateContent(prompt, { temperature: 0.3, maxOutputTokens: 3072 });
    
    let evaluation;
    try {
      // Try to parse JSON response
      const jsonMatch = aiEvaluation.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        evaluation = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback evaluation
        evaluation = {
          isCorrect: false,
          feedback: "Unable to evaluate solution properly. Please try again.",
          score: 0,
          issues: ["Evaluation failed"],
          suggestions: ["Please check your code and try again"]
        };
      }
    } catch (parseError) {
      console.error('Failed to parse AI evaluation:', parseError);
      evaluation = await this.fallbackEvaluation(code, language, question);
      // evaluation = {
      //   isCorrect: false,
      //   feedback: "Evaluation service temporarily unavailable.",
      //   score: 0,
      //   issues: ["Service error"],
      //   suggestions: ["Please try again later"]
      // };
    }

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

    if (evaluation.isCorrect) {
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
      isCorrect: evaluation.isCorrect,
      message: evaluation.isCorrect ? 
        'Solution accepted! ' + evaluation.feedback : 
        'Solution needs improvement. ' + evaluation.feedback,
      attempts: attempts,
      score: evaluation.score,
      issues: evaluation.issues,
      suggestions: evaluation.suggestions
    });
  } catch (error) {
    console.error('Submit solution error:', error);
    res.status(500).json({ 
      message: 'Server error while submitting solution',
      error: error.message 
    });
  }
});

// Get AI hints using Gemini
router.post('/hints', auth, [
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
        
    const hints = await geminiService.getHints(description, code, difficulty);
    
    res.json({ hints });
  } catch (error) {
    console.error('Hints generation error:', error.message);
    
    // Provide meaningful fallback hints
    const fallbackHints = `General problem-solving tips:
1. Break the problem into smaller parts
2. Consider relevant data structures
3. Handle edge cases
4. Test with examples
5. Debug step by step`;

    res.json({ 
      success: false,
      message: 'Using fallback hints: ' + error.message,
      hints: fallbackHints
    });
  }
});

// Get AI debugging help using Gemini
router.post('/:id/debug', auth, [
  body('code').notEmpty().withMessage('Code is required'),
  body('language').notEmpty().withMessage('Language is required'),
  body('errorMessage').notEmpty().withMessage('Error message is required'),
  body('testCase').optional().isString().withMessage('Test case must be a string')
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
    // Provide meaningful fallback hints
    const fallbackDebug = `Debugging tips:
1. Check for syntax errors
2. Check variable naming consistency
3. Ensure proper return statements
4. Handle edge cases
5. Test with examples`;

    res.json({ 
      success: false,
      message: 'Using fallback Debug: ' + error.message,
      hints: fallbackDebug
    });
  }
});

// Get AI explanation for algorithm using Gemini
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
    
    const explanation = await geminiService.explainAlgorithm(algorithm, code);
    
    res.json({ explanation });
  } catch (error) {
    console.error('Algorithm explanation error:', error);
    const fallbackHints = `Algorithm explanation tips:
1. Understand the purpose of the algorithm
2. Analyze the input and output
3. Consider relevant data structures
4. Handle edge cases
5. Test with examples`;

    res.json({ 
      success: false,
      message: 'Using fallback Explianation: ' + error.message,
      hints: fallbackExplain
    });
  }
});

// Get edge cases for a problem using Gemini
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

// Fallback evaluation when AI is unavailable
async function fallbackEvaluation(code, language, question) {
  console.log('Using fallback evaluation');
  
  // Basic syntax and structure checks
  let isCorrect = false;
  let feedback = 'Basic evaluation: ';
  let score = 0;
  
  if (!code || code.trim().length < 10) {
    feedback += 'Code is too short or empty. ';
    score = 10;
  } else if (language === 'javascript') {
    try {
      // Basic syntax check
      new Function(code);
      isCorrect = true;
      feedback += 'Code syntax appears valid. ';
      score = 60;
    } catch (e) {
      feedback += 'Syntax error detected. ';
      score = 20;
    }
  } else if (language === 'python') {
    // Basic Python checks
    const hasDef = /def\s+\w+\(/.test(code);
    if (hasDef) {
      isCorrect = true;
      feedback += 'Function definition found. ';
      score = 50;
    } else {
      feedback += 'No function definition found. ';
      score = 20;
    }
  } else {
    // For other languages, basic check
    isCorrect = code.length > 20;
    feedback += isCorrect ? 'Code structure appears reasonable. ' : 'Code may be incomplete. ';
    score = isCorrect ? 40 : 20;
  }

  feedback += 'Note: AI evaluation is temporarily unavailable.';

  return {
    isCorrect,
    score,
    feedback,
    issues: ['AI evaluation unavailable'],
    suggestions: ['Test your code with multiple examples', 'Check for syntax errors']
  };
}

module.exports = router;