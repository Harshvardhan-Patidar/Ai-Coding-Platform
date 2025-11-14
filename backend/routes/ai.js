const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth');
const geminiService = require('../utils/gemini');

const router = express.Router();

// Chat with AI assistant
router.post('/chat', auth, [
  body('message').notEmpty().withMessage('Message is required'),
  body('context').optional().isString().withMessage('Context must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, context = '' } = req.body;
    
    const response = await geminiService.chatWithUser(message, context);
    
    res.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      message: 'Server error while processing chat message',
      error: error.message 
    });
  }
});

// Generate interview question
router.post('/generate-question', auth, [
  body('topic').notEmpty().withMessage('Topic is required'),
  body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty level'),
  body('type').isIn(['coding', 'behavioral', 'system_design']).withMessage('Invalid question type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { topic, difficulty, type } = req.body;
    
    const question = await geminiService.generateInterviewQuestion(topic, difficulty, type);
    
    res.json({ question });
  } catch (error) {
    console.error('Generate question error:', error);
    res.status(500).json({ 
      message: 'Server error while generating question',
      error: error.message 
    });
  }
});

// Analyze code complexity using Gemini
router.post('/analyze-complexity', auth, [
  body('code').notEmpty().withMessage('Code is required'),
  body('language').notEmpty().withMessage('Language is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code, language } = req.body;
    
    const prompt = `
Analyze the time and space complexity of this ${language} code:

\`\`\`${language}
${code}
\`\`\`

Please provide a comprehensive analysis including:
1. Time Complexity (Big O notation) with detailed reasoning
2. Space Complexity (Big O notation) with detailed reasoning  
3. Step-by-step breakdown of how you arrived at these complexities
4. Best case, average case, and worst case scenarios
5. Specific bottlenecks or expensive operations
6. Suggestions for optimization with complexity trade-offs
7. Real-world implications of these complexities

Be educational and specific in your analysis.
    `;
    
    const analysis = await geminiService.generateContent(prompt, { temperature: 0.3 });
    
    res.json({ analysis });
  } catch (error) {
    console.error('Analyze complexity error:', error);
    res.status(500).json({ 
      message: 'Server error while analyzing complexity',
      error: error.message 
    });
  }
});

// Generate test cases using Gemini
router.post('/generate-test-cases', auth, [
  body('problemDescription').notEmpty().withMessage('Problem description is required'),
  body('solution').optional().isString().withMessage('Solution must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { problemDescription, solution = '' } = req.body;
    
    const testCases = await geminiService.generateEdgeCases(problemDescription, solution);
    
    res.json({ testCases });
  } catch (error) {
    console.error('Generate test cases error:', error);
    res.status(500).json({ 
      message: 'Server error while generating test cases',
      error: error.message 
    });
  }
});

// Get coding hints using Gemini
router.post('/hints', auth, [
  body('problemDescription').notEmpty().withMessage('Problem description is required'),
  body('userApproach').optional().isString().withMessage('User approach must be a string'),
  body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty level')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { problemDescription, userApproach = '', difficulty } = req.body;
    
    const prompt = `
Provide helpful, progressive hints for this ${difficulty} level coding problem:

Problem: ${problemDescription}
User's Current Approach: ${userApproach || 'No approach provided yet'}

Please structure your hints as follows:
1. First, provide general problem-solving strategies
2. Then, suggest relevant data structures and algorithms
3. Next, point out common pitfalls and how to avoid them
4. Finally, provide more specific guidance if the user is still stuck

Make the hints educational and encouraging. Don't give away the complete solution, but provide enough guidance to help the user reach the solution themselves.
    `;
    
    const hints = await geminiService.generateContent(prompt, { temperature: 0.6, maxOutputTokens: 3072 });
    
    res.json({ hints });
  } catch (error) {
    console.error('Get hints error:', error);
    res.status(500).json({ 
      message: 'Server error while generating hints',
      error: error.message 
    });
  }
});

// Code review and suggestions using Gemini
router.post('/code-review', auth, [
  body('code').notEmpty().withMessage('Code is required'),
  body('language').notEmpty().withMessage('Language is required'),
  body('problemContext').optional().isString().withMessage('Problem context must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code, language, problemContext = '' } = req.body;
    
    const prompt = `
Perform a comprehensive code review for this ${language} code:

Problem Context: ${problemContext}
Code:
\`\`\`${language}
${code}
\`\`\`

Please provide a detailed review covering:
1. Code Quality Assessment (1-10 scale with justification)
2. Correctness and Logic
3. Efficiency (Time & Space Complexity)
4. Readability and Maintainability
5. Best Practices Adherence
6. Error Handling
7. Edge Case Coverage
8. Specific Improvement Suggestions
9. Security Considerations (if applicable)
10. Overall Strengths and Weaknesses

Be constructive, specific, and educational in your feedback.
    `;
    
    const review = await geminiService.generateContent(prompt, { temperature: 0.4 });
    
    res.json({ review });
  } catch (error) {
    console.error('Code review error:', error);
    res.status(500).json({ 
      message: 'Server error while reviewing code',
      error: error.message 
    });
  }
});

// Generate algorithm explanation using Gemini
router.post('/explain-algorithm', auth, [
  body('algorithmName').notEmpty().withMessage('Algorithm name is required'),
  body('code').notEmpty().withMessage('Code is required'),
  body('language').notEmpty().withMessage('Language is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { algorithmName, code, language } = req.body;
    
    const explanation = await geminiService.explainAlgorithm(algorithmName, code);
    
    res.json({ explanation });
  } catch (error) {
    console.error('Explain algorithm error:', error);
    res.status(500).json({ 
      message: 'Server error while explaining algorithm',
      error: error.message 
    });
  }
});

// Generate personalized study plan using Gemini
router.post('/study-plan', auth, [
  body('currentLevel').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid current level'),
  body('targetLevel').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid target level'),
  body('timeAvailable').isInt({ min: 1, max: 168 }).withMessage('Time available must be between 1 and 168 hours per week'),
  body('weakAreas').isArray().withMessage('Weak areas must be an array'),
  body('strongAreas').isArray().withMessage('Strong areas must be an array'),
  body('goals').optional().isString().withMessage('Goals must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentLevel, targetLevel, timeAvailable, weakAreas, strongAreas, goals } = req.body;
    
    const prompt = `
Create a comprehensive personalized study plan for a programmer:

Current Level: ${currentLevel}
Target Level: ${targetLevel}
Time Available: ${timeAvailable} hours per week
Weak Areas: ${weakAreas.join(', ')}
Strong Areas: ${strongAreas.join(', ')}
Goals: ${goals || 'General improvement and interview preparation'}

Please provide a detailed 4-week study plan including:
1. Weekly learning objectives and milestones
2. Daily study schedule breakdown
3. Specific topics to cover each week
4. Recommended resources (books, courses, practice platforms)
5. Hands-on coding projects and exercises
6. Practice problems with increasing difficulty
7. Review and assessment strategies
8. Time management tips
9. Motivation and progress tracking methods
10. Interview preparation strategies

Make the plan realistic, actionable, and tailored to their specific needs and time constraints.
    `;
    
    const studyPlan = await geminiService.generateContent(prompt, { temperature: 0.7 });
    
    res.json({ studyPlan });
  } catch (error) {
    console.error('Generate study plan error:', error);
    res.status(500).json({ 
      message: 'Server error while generating study plan',
      error: error.message 
    });
  }
});

// Voice interview simulation using Gemini
router.post('/voice-interview', auth, [
  body('question').notEmpty().withMessage('Question is required'),
  body('userResponse').notEmpty().withMessage('User response is required'),
  body('questionType').isIn(['coding', 'behavioral', 'system_design']).withMessage('Invalid question type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question, userResponse, questionType } = req.body;
    
    const analysis = await geminiService.analyzeInterviewResponse(question, userResponse, questionType);
    
    res.json({ analysis });
  } catch (error) {
    console.error('Voice interview error:', error);
    res.status(500).json({ 
      message: 'Server error while processing voice interview',
      error: error.message 
    });
  }
});

module.exports = router;