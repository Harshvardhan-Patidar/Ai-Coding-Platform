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
    res.status(500).json({ message: 'Server error while processing chat message' });
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
    res.status(500).json({ message: 'Server error while generating question' });
  }
});

// Analyze code complexity
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

Please provide:
1. Time Complexity (Big O notation)
2. Space Complexity (Big O notation)
3. Explanation of why these complexities are achieved
4. Suggestions for optimization if possible
5. Best case, average case, and worst case scenarios

Be specific and educational in your analysis.
    `;
    
    const analysis = await geminiService.generateContent(prompt, { temperature: 0.3 });
    
    res.json({ analysis });
  } catch (error) {
    console.error('Analyze complexity error:', error);
    res.status(500).json({ message: 'Server error while analyzing complexity' });
  }
});

// Generate test cases
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
    res.status(500).json({ message: 'Server error while generating test cases' });
  }
});

// Get coding hints
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
Provide helpful hints for this ${difficulty} level coding problem:

Problem: ${problemDescription}
User's Current Approach: ${userApproach || 'No approach provided yet'}

Please provide:
1. A gentle hint that guides without giving away the solution
2. Key concepts to consider
3. Common pitfalls to avoid
4. Next steps to think about

Make the hints progressive - start with general guidance and get more specific if the user is stuck.
    `;
    
    const hints = await geminiService.generateContent(prompt, { temperature: 0.6 });
    
    res.json({ hints });
  } catch (error) {
    console.error('Get hints error:', error);
    res.status(500).json({ message: 'Server error while generating hints' });
  }
});

// Code review and suggestions
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
Review this ${language} code and provide constructive feedback:

Problem Context: ${problemContext}
Code:
\`\`\`${language}
${code}
\`\`\`

Please provide:
1. Code quality assessment (1-10)
2. Strengths of the code
3. Areas for improvement
4. Specific suggestions for better practices
5. Performance considerations
6. Readability improvements
7. Best practices that could be applied

Be constructive and educational in your feedback.
    `;
    
    const review = await geminiService.generateContent(prompt, { temperature: 0.4 });
    
    res.json({ review });
  } catch (error) {
    console.error('Code review error:', error);
    res.status(500).json({ message: 'Server error while reviewing code' });
  }
});

// Generate algorithm explanation
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
    res.status(500).json({ message: 'Server error while explaining algorithm' });
  }
});

// Generate personalized study plan
router.post('/study-plan', auth, [
  body('currentLevel').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid current level'),
  body('targetLevel').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid target level'),
  body('timeAvailable').isInt({ min: 1, max: 168 }).withMessage('Time available must be between 1 and 168 hours per week'),
  body('weakAreas').isArray().withMessage('Weak areas must be an array'),
  body('strongAreas').isArray().withMessage('Strong areas must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentLevel, targetLevel, timeAvailable, weakAreas, strongAreas, goals } = req.body;
    
    const prompt = `
Create a personalized study plan for a programmer:

Current Level: ${currentLevel}
Target Level: ${targetLevel}
Time Available: ${timeAvailable} hours per week
Weak Areas: ${weakAreas.join(', ')}
Strong Areas: ${strongAreas.join(', ')}
Goals: ${goals || 'General improvement'}

Please provide:
1. A 4-week detailed study plan
2. Daily and weekly goals
3. Specific resources for each topic
4. Practice problems to work on
5. Milestones to track progress
6. Tips for staying motivated
7. Time allocation for each area

Make it practical, achievable, and tailored to their current level and available time.
    `;
    
    const studyPlan = await geminiService.generateContent(prompt, { temperature: 0.7 });
    
    res.json({ studyPlan });
  } catch (error) {
    console.error('Generate study plan error:', error);
    res.status(500).json({ message: 'Server error while generating study plan' });
  }
});

// Voice interview simulation
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
    res.status(500).json({ message: 'Server error while processing voice interview' });
  }
});

module.exports = router;
