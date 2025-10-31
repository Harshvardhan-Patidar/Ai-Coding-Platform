const express = require('express');
const { body, validationResult } = require('express-validator');
const Interview = require('../models/Interview');
const Question = require('../models/Question');
const { auth } = require('../middleware/auth');
import multer from 'multer';
import fs from 'fs';
import path from 'path';
const geminiService = require('../utils/gemini');

const router = express.Router();

// Temporary storage for uploaded audio
const upload = multer({ dest: 'uploads/' });

// Start a new interview session
router.post('/start', auth, [
  body('type').isIn(['mock', 'practice', 'assessment','coding','behavioral']).withMessage('Invalid interview type'),
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

// Submit answer for a question - with enhanced debugging
router.post('/:sessionId/answer', auth, [
  body('questionIndex').isInt({ min: 0 }).withMessage('Question index must be a non-negative integer'),
  body('answer').notEmpty().withMessage('Answer is required'),
  body('timeSpent').isInt({ min: 0 }).withMessage('Time spent must be a non-negative integer')
], async (req, res) => {
  try {
    console.log('=== ANSWER SUBMISSION REQUEST ===');
    console.log('Session ID:', req.params.sessionId);
    console.log('User ID:', req.user._id);
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { questionIndex, answer, timeSpent, hintsUsed = 0 } = req.body;
    const { sessionId } = req.params;
    
    console.log('Processing answer for question index:', questionIndex);
    
    const interview = await Interview.findOne({
      sessionId: sessionId,
      userId: req.user._id
    });
    
    if (!interview) {
      console.log('Interview not found for session:', sessionId);
      return res.status(404).json({ message: 'Interview session not found' });
    }
    
    console.log('Interview status:', interview.status);
    
    if (interview.status !== 'in_progress') {
      return res.status(400).json({ 
        message: 'Interview is not in progress',
        currentStatus: interview.status 
      });
    }
    
    if (questionIndex >= interview.questions.length) {
      return res.status(400).json({ 
        message: 'Invalid question index',
        maxIndex: interview.questions.length - 1,
        receivedIndex: questionIndex
      });
    }
    
    // Update the question response
    const question = interview.questions[questionIndex];
    question.userAnswer = answer;
    question.timeSpent = timeSpent;
    question.hintsUsed = hintsUsed;
    
    console.log('Question updated, getting AI analysis...');
    
    // Get AI analysis of the answer
    try {
      const aiAnalysis = await geminiService.analyzeInterviewResponse(
        question.question,
        answer,
        question.type
      );
      
      // Parse AI response to extract score and feedback
      const scoreMatch = aiAnalysis.match(/Score[:\s]*(\d+)/i);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 5;
      
      question.aiFeedback = aiAnalysis;
      question.score = Math.min(Math.max(score, 0), 10);
      
      console.log('AI analysis completed, score:', question.score);
    } catch (aiError) {
      console.error('AI analysis error:', aiError);
      question.score = 5;
      question.aiFeedback = 'AI analysis temporarily unavailable.';
    }
    
    await interview.save();
    
    console.log('Answer submitted successfully');
    
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
    res.status(500).json({ 
      message: 'Server error while submitting answer',
      error: error.message 
    });
  }
});

// Complete interview
router.post('/:sessionId/complete', auth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    console.log('=== COMPLETING INTERVIEW ===');
    console.log('Session ID:', sessionId);
    console.log('User ID:', req.user._id);

    const interview = await Interview.findOne({
      sessionId: sessionId,
      userId: req.user._id
    });

    if (!interview) {
      console.log('Interview not found');
      return res.status(404).json({ message: 'Interview session not found' });
    }

    console.log('Interview found, current status:', interview.status);

    if (interview.status !== 'in_progress') {
      return res.status(400).json({ 
        message: 'Interview is not in progress',
        currentStatus: interview.status 
      });
    }

    // Calculate overall score
    let totalScore = 0;
    let answeredQuestions = 0;
    
    interview.questions.forEach((question, index) => {
      const score = Number(question.score);
      if (!isNaN(score) && score >= 0) {
        totalScore += score;
        answeredQuestions++;
      }
    });
    
    const overallScore = answeredQuestions > 0 ? Math.round((totalScore / answeredQuestions) * 10) : 0;
    interview.overallScore = overallScore;

    // Calculate time metrics
    const totalTime = interview.questions.reduce((sum, q) => sum + (q.timeSpent || 0), 0);
    const avgTimePerQuestion = interview.questions.length > 0 ? totalTime / interview.questions.length : 0;
    
    // Calculate average question score
    const avgQuestionScore = interview.questions.length > 0 
      ? interview.questions.reduce((sum, q) => sum + (q.score || 0), 0) / interview.questions.length 
      : 5;

    // Generate AI analysis scores
    interview.aiAnalysis = {
      communicationScore: Math.max(1, Math.min(10, Math.round(avgQuestionScore) || 5)),
      problemSolvingScore: Math.max(1, Math.min(10, Math.round(avgQuestionScore) || 5)),
      codeQualityScore: Math.max(1, Math.min(10, Math.round(avgQuestionScore) || 5)),
      timeManagementScore: avgTimePerQuestion < 300 ? 8 : avgTimePerQuestion < 600 ? 6 : 4,
      confidenceScore: Math.max(1, Math.min(10, Math.round(avgQuestionScore) || 5))
    };

    // Generate feedback according to your model structure
    const strengths = [];
    const weaknesses = [];
    const recommendations = [];
    let overallComments = '';

    // Analyze scores for feedback
    if (overallScore >= 80) {
      strengths.push('Excellent overall performance');
      overallComments = "Excellent performance! You demonstrated strong problem-solving skills and clear communication.";
    } else if (overallScore >= 60) {
      strengths.push('Good overall performance');
      overallComments = "Good performance. You have a solid understanding but can improve on some areas.";
    } else if (overallScore >= 40) {
      weaknesses.push('Needs improvement in several areas');
      overallComments = "Fair performance. Consider practicing more to improve your skills.";
    } else {
      weaknesses.push('Significant improvement needed');
      overallComments = "Needs improvement. Focus on fundamental concepts and practice regularly.";
    }

    // Add specific feedback based on AI analysis
    if (interview.aiAnalysis.communicationScore >= 8) {
      strengths.push('Clear and effective communication');
    } else if (interview.aiAnalysis.communicationScore <= 5) {
      weaknesses.push('Communication could be more clear');
      recommendations.push('Practice explaining your thought process more clearly');
    }

    if (interview.aiAnalysis.problemSolvingScore >= 8) {
      strengths.push('Strong problem-solving approach');
    } else if (interview.aiAnalysis.problemSolvingScore <= 5) {
      weaknesses.push('Problem-solving approach needs refinement');
      recommendations.push('Break down problems into smaller steps before solving');
    }

    if (interview.aiAnalysis.timeManagementScore >= 8) {
      strengths.push('Good time management');
    } else if (interview.aiAnalysis.timeManagementScore <= 5) {
      weaknesses.push('Time management needs improvement');
      recommendations.push('Practice with time constraints to improve pacing');
    }

    // Set the feedback object according to your model
    interview.feedback = {
      strengths,
      weaknesses,
      recommendations,
      overallComments
    };

    // Update status and completion time
    interview.status = 'completed';
    interview.completedAt = new Date();

    // Calculate duration
    const durationMinutes = interview.startedAt 
      ? Math.round((interview.completedAt - interview.startedAt) / 1000 / 60)
      : interview.duration;

    console.log('Saving interview with data:', {
      overallScore,
      feedback: interview.feedback,
      aiAnalysis: interview.aiAnalysis
    });

    // Save the interview
    await interview.save();
    
    console.log('Interview completed successfully');

    res.json({
      message: 'Interview completed successfully',
      interview: {
        id: interview._id,
        sessionId: interview.sessionId,
        type: interview.type,
        overallScore: interview.overallScore,
        feedback: interview.feedback,
        aiAnalysis: interview.aiAnalysis,
        completedAt: interview.completedAt,
        duration: durationMinutes,
        questions: interview.questions.map((q, index) => ({
          index,
          score: q.score || 0,
          feedback: q.aiFeedback || 'No feedback available'
        }))
      }
    });

  } catch (error) {
    console.error('Complete interview error:', error);
    console.error('Error details:', error.message);
    
    res.status(500).json({ 
      message: 'Server error while completing interview',
      error: error.message
    });
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
router.get('/analyze-complexity', auth, async (req, res) => {
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

router.post('/speech-to-text', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    const filePath = path.resolve(req.file.path);
    const mimeType = req.file.mimetype;

    // Call Gemini service
    const transcript = await geminiService.transcribeAudio(filePath, mimeType);

    // Clean up temporary file
    fs.unlinkSync(filePath);

    res.status(200).json({ text: transcript });
  } catch (error) {
    console.error('Speech-to-text error:', error.message);
    res.status(500).json({ error: 'Failed to process audio' });
  }
});

module.exports = router;
