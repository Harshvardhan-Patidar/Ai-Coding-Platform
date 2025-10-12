const express = require('express');
const { body, validationResult } = require('express-validator');
const Interview = require('../models/Interview');
const Question = require('../models/Question');
const { auth } = require('../middleware/auth');
const geminiService = require('../utils/gemini');

const router = express.Router();

// Start a new interview session
router.post('/start', auth, [
  body('type').isIn(['mock', 'practice', 'assessment']).withMessage('Invalid interview type'),
  body('duration').isInt({ min: 15, max: 180 }).withMessage('Duration must be between 15 and 180 minutes')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, duration, topics = [] } = req.body;
    
    // Generate session ID
    const sessionId = `interview_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Select questions based on topics and difficulty
    const questionFilter = { isActive: true };
    if (topics.length > 0) {
      questionFilter.topics = { $in: topics };
    }
    
    const questions = await Question.find(questionFilter)
      .limit(5) // Limit to 5 questions for now
      .select('title description difficulty topics examples constraints');
    
    if (questions.length === 0) {
      return res.status(400).json({ message: 'No questions available for the selected topics' });
    }
    
    // Create interview session
    const interview = new Interview({
      userId: req.user._id,
      sessionId,
      type,
      duration,
      questions: questions.map(q => ({
        questionId: q._id,
        question: `${q.title}\n\n${q.description}`,
        type: 'coding'
      })),
      status: 'scheduled'
    });
    
    await interview.save();
    
    res.json({
      message: 'Interview session started',
      sessionId,
      interview: {
        id: interview._id,
        sessionId: interview.sessionId,
        type: interview.type,
        duration: interview.duration,
        questions: interview.questions,
        status: interview.status
      }
    });
  } catch (error) {
    console.error('Start interview error:', error);
    res.status(500).json({ message: 'Server error while starting interview' });
  }
});

// Get interview session
router.get('/:sessionId', auth, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      sessionId: req.params.sessionId,
      userId: req.user._id
    });
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview session not found' });
    }
    
    res.json({ interview });
  } catch (error) {
    console.error('Get interview error:', error);
    res.status(500).json({ message: 'Server error while fetching interview' });
  }
});

// Start interview (begin answering)
router.post('/:sessionId/start', auth, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      sessionId: req.params.sessionId,
      userId: req.user._id
    });
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview session not found' });
    }
    
    if (interview.status !== 'scheduled') {
      return res.status(400).json({ message: 'Interview has already been started or completed' });
    }
    
    interview.status = 'in_progress';
    interview.startedAt = new Date();
    await interview.save();
    
    res.json({
      message: 'Interview started',
      interview: {
        status: interview.status,
        startedAt: interview.startedAt,
        questions: interview.questions
      }
    });
  } catch (error) {
    console.error('Start interview error:', error);
    res.status(500).json({ message: 'Server error while starting interview' });
  }
});

// Submit answer for a question
router.post('/:sessionId/answer', auth, [
  body('questionIndex').isInt({ min: 0 }).withMessage('Question index must be a non-negative integer'),
  body('answer').notEmpty().withMessage('Answer is required'),
  body('timeSpent').isInt({ min: 0 }).withMessage('Time spent must be a non-negative integer')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { questionIndex, answer, timeSpent, hintsUsed = 0 } = req.body;
    
    const interview = await Interview.findOne({
      sessionId: req.params.sessionId,
      userId: req.user._id
    });
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview session not found' });
    }
    
    if (interview.status !== 'in_progress') {
      return res.status(400).json({ message: 'Interview is not in progress' });
    }
    
    if (questionIndex >= interview.questions.length) {
      return res.status(400).json({ message: 'Invalid question index' });
    }
    
    // Update the question response
    const question = interview.questions[questionIndex];
    question.userAnswer = answer;
    question.timeSpent = timeSpent;
    question.hintsUsed = hintsUsed;
    
    // Get AI analysis of the answer
    try {
      const aiAnalysis = await geminiService.analyzeInterviewResponse(
        question.question,
        answer,
        question.type
      );
      
      // Parse AI response to extract score and feedback
      const scoreMatch = aiAnalysis.match(/Score[:\s]*(\d+)/i);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 5; // Default score of 5
      
      question.aiFeedback = aiAnalysis;
      question.score = Math.min(Math.max(score, 0), 10); // Clamp between 0 and 10
    } catch (aiError) {
      console.error('AI analysis error:', aiError);
      question.score = 5; // Default score if AI analysis fails
      question.aiFeedback = 'AI analysis temporarily unavailable.';
    }
    
    await interview.save();
    
    res.json({
      message: 'Answer submitted successfully',
      question: {
        index: questionIndex,
        score: question.score,
        feedback: question.aiFeedback
      }
    });
  } catch (error) {
    console.error('Submit answer error:', error);
    res.status(500).json({ message: 'Server error while submitting answer' });
  }
});

// Complete interview
router.post('/:sessionId/complete', auth, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      sessionId: req.params.sessionId,
      userId: req.user._id
    });
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview session not found' });
    }
    
    if (interview.status !== 'in_progress') {
      return res.status(400).json({ message: 'Interview is not in progress' });
    }
    
    // Calculate overall score and generate feedback
    interview.calculateOverallScore();
    interview.generateFeedback();
    
    // Generate AI analysis scores
    const totalTime = interview.questions.reduce((sum, q) => sum + (q.timeSpent || 0), 0);
    const avgTimePerQuestion = totalTime / interview.questions.length;
    
    interview.aiAnalysis = {
      communicationScore: Math.round(interview.questions.reduce((sum, q) => sum + (q.score || 0), 0) / interview.questions.length),
      problemSolvingScore: Math.round(interview.questions.reduce((sum, q) => sum + (q.score || 0), 0) / interview.questions.length),
      codeQualityScore: Math.round(interview.questions.reduce((sum, q) => sum + (q.score || 0), 0) / interview.questions.length),
      timeManagementScore: avgTimePerQuestion < 300 ? 8 : avgTimePerQuestion < 600 ? 6 : 4, // 5min = 8, 10min = 6, >10min = 4
      confidenceScore: Math.round(interview.questions.reduce((sum, q) => sum + (q.score || 0), 0) / interview.questions.length)
    };
    
    interview.status = 'completed';
    interview.completedAt = new Date();
    await interview.save();
    
    res.json({
      message: 'Interview completed successfully',
      interview: {
        id: interview._id,
        sessionId: interview.sessionId,
        overallScore: interview.overallScore,
        feedback: interview.feedback,
        aiAnalysis: interview.aiAnalysis,
        completedAt: interview.completedAt,
        duration: Math.round((interview.completedAt - interview.startedAt) / 1000 / 60) // in minutes
      }
    });
  } catch (error) {
    console.error('Complete interview error:', error);
    res.status(500).json({ message: 'Server error while completing interview' });
  }
});

// Get user's interview history
router.get('/history', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, type } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const filter = { userId: req.user._id };
    if (type) filter.type = type;
    
    const interviews = await Interview.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-questions');
    
    const total = await Interview.countDocuments(filter);
    
    res.json({
      interviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalInterviews: total
      }
    });
  } catch (error) {
    console.error('Get interview history error:', error);
    res.status(500).json({ message: 'Server error while fetching interview history' });
  }
});

// Get interview analytics
router.get('/analytics', auth, async (req, res) => {
  try {
    const interviews = await Interview.find({ 
      userId: req.user._id,
      status: 'completed'
    }).select('overallScore aiAnalysis createdAt type');
    
    if (interviews.length === 0) {
      return res.json({
        totalInterviews: 0,
        averageScore: 0,
        improvementTrend: [],
        skillAnalysis: {},
        message: 'No completed interviews found'
      });
    }
    
    // Calculate average score
    const totalScore = interviews.reduce((sum, interview) => sum + interview.overallScore, 0);
    const averageScore = Math.round(totalScore / interviews.length);
    
    // Calculate improvement trend (last 10 interviews)
    const recentInterviews = interviews
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(-10);
    
    const improvementTrend = recentInterviews.map((interview, index) => ({
      interviewNumber: index + 1,
      score: interview.overallScore,
      date: interview.createdAt
    }));
    
    // Calculate skill analysis
    const skillAnalysis = {
      communication: {
        average: 0,
        trend: 'stable'
      },
      problemSolving: {
        average: 0,
        trend: 'stable'
      },
      codeQuality: {
        average: 0,
        trend: 'stable'
      },
      timeManagement: {
        average: 0,
        trend: 'stable'
      },
      confidence: {
        average: 0,
        trend: 'stable'
      }
    };
    
    // Calculate averages for each skill
    Object.keys(skillAnalysis).forEach(skill => {
      const scores = interviews.map(i => i.aiAnalysis[`${skill}Score`] || 0);
      skillAnalysis[skill].average = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
      
      // Simple trend calculation
      const firstHalf = scores.slice(0, Math.floor(scores.length / 2));
      const secondHalf = scores.slice(Math.floor(scores.length / 2));
      
      const firstAvg = firstHalf.reduce((sum, score) => sum + score, 0) / firstHalf.length;
      const secondAvg = secondHalf.reduce((sum, score) => sum + score, 0) / secondHalf.length;
      
      if (secondAvg > firstAvg + 1) skillAnalysis[skill].trend = 'improving';
      else if (secondAvg < firstAvg - 1) skillAnalysis[skill].trend = 'declining';
      else skillAnalysis[skill].trend = 'stable';
    });
    
    res.json({
      totalInterviews: interviews.length,
      averageScore,
      improvementTrend,
      skillAnalysis,
      recentInterviews: interviews.slice(-5).map(i => ({
        id: i._id,
        type: i.type,
        score: i.overallScore,
        date: i.createdAt
      }))
    });
  } catch (error) {
    console.error('Get interview analytics error:', error);
    res.status(500).json({ message: 'Server error while fetching interview analytics' });
  }
});

module.exports = router;
