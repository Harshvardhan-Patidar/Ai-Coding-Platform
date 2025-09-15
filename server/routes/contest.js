const express = require('express');
const { body, validationResult } = require('express-validator');
const Contest = require('../models/Contest');
const Question = require('../models/Question');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Create a new contest
router.post('/create', auth, [
  body('name').notEmpty().withMessage('Contest name is required'),
  body('duration').isInt({ min: 5, max: 180 }).withMessage('Duration must be between 5 and 180 minutes'),
  body('maxParticipants').isInt({ min: 2, max: 10 }).withMessage('Max participants must be between 2 and 10')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, duration, maxParticipants, isPrivate, password, topics = [] } = req.body;
    
    // Select questions for the contest
    const questionFilter = { isActive: true };
    if (topics.length > 0) {
      questionFilter.topics = { $in: topics };
    }
    
    const questions = await Question.find(questionFilter)
      .limit(3) // Limit to 3 questions for contests
      .select('_id');
    
    if (questions.length === 0) {
      return res.status(400).json({ message: 'No questions available for the selected topics' });
    }
    
    const contest = new Contest({
      name,
      description,
      duration,
      maxParticipants,
      questions: questions.map(q => q._id),
      startTime: new Date(),
      isPrivate,
      password: isPrivate ? password : undefined,
      createdBy: req.user._id
    });
    
    // Add creator as first participant
    contest.addParticipant(req.user._id);
    
    await contest.save();
    
    res.json({
      message: 'Contest created successfully',
      contest: {
        id: contest._id,
        name: contest.name,
        description: contest.description,
        duration: contest.duration,
        maxParticipants: contest.maxParticipants,
        participants: contest.participants.length,
        status: contest.status,
        startTime: contest.startTime,
        endTime: contest.endTime,
        isPrivate: contest.isPrivate
      }
    });
  } catch (error) {
    console.error('Create contest error:', error);
    res.status(500).json({ message: 'Server error while creating contest' });
  }
});

// Join a contest
router.post('/:contestId/join', auth, [
  body('password').optional().isString().withMessage('Password must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;
    const contestId = req.params.contestId;
    
    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    
    if (contest.status !== 'scheduled' && contest.status !== 'active') {
      return res.status(400).json({ message: 'Contest is not accepting participants' });
    }
    
    if (contest.isPrivate && contest.password !== password) {
      return res.status(400).json({ message: 'Invalid contest password' });
    }
    
    try {
      contest.addParticipant(req.user._id);
      await contest.save();
      
      res.json({
        message: 'Successfully joined contest',
        contest: {
          id: contest._id,
          name: contest.name,
          participants: contest.participants.length,
          status: contest.status
        }
      });
    } catch (error) {
      if (error.message === 'Contest is full') {
        return res.status(400).json({ message: 'Contest is full' });
      }
      if (error.message === 'User already in contest') {
        return res.status(400).json({ message: 'You are already in this contest' });
      }
      throw error;
    }
  } catch (error) {
    console.error('Join contest error:', error);
    res.status(500).json({ message: 'Server error while joining contest' });
  }
});

// Leave a contest
router.post('/:contestId/leave', auth, async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.contestId);
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    
    if (contest.status === 'finished') {
      return res.status(400).json({ message: 'Cannot leave a finished contest' });
    }
    
    contest.removeParticipant(req.user._id);
    await contest.save();
    
    res.json({ message: 'Successfully left contest' });
  } catch (error) {
    console.error('Leave contest error:', error);
    res.status(500).json({ message: 'Server error while leaving contest' });
  }
});

// Start contest
router.post('/:contestId/start', auth, async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.contestId);
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    
    if (contest.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only contest creator can start the contest' });
    }
    
    if (contest.status !== 'scheduled') {
      return res.status(400).json({ message: 'Contest has already been started or finished' });
    }
    
    if (contest.participants.length < 2) {
      return res.status(400).json({ message: 'Need at least 2 participants to start contest' });
    }
    
    contest.status = 'active';
    contest.startTime = new Date();
    contest.endTime = new Date(contest.startTime.getTime() + contest.duration * 60 * 1000);
    
    await contest.save();
    
    res.json({
      message: 'Contest started successfully',
      contest: {
        id: contest._id,
        status: contest.status,
        startTime: contest.startTime,
        endTime: contest.endTime,
        duration: contest.duration
      }
    });
  } catch (error) {
    console.error('Start contest error:', error);
    res.status(500).json({ message: 'Server error while starting contest' });
  }
});

// Submit solution
router.post('/:contestId/submit', auth, [
  body('questionId').isMongoId().withMessage('Valid question ID is required'),
  body('code').notEmpty().withMessage('Code is required'),
  body('language').notEmpty().withMessage('Language is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { questionId, code, language } = req.body;
    const contestId = req.params.contestId;
    
    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    
    if (!contest.isActive()) {
      return res.status(400).json({ message: 'Contest is not active' });
    }
    
    // Check if user is a participant
    const isParticipant = contest.participants.some(
      p => p.userId.toString() === req.user._id.toString()
    );
    
    if (!isParticipant) {
      return res.status(403).json({ message: 'You are not a participant in this contest' });
    }
    
    // Check if question is part of contest
    if (!contest.questions.includes(questionId)) {
      return res.status(400).json({ message: 'Question is not part of this contest' });
    }
    
    // Simple validation (replace with proper code execution in production)
    const isCorrect = await validateSolution(code, language);
    
    const timeTaken = Math.floor((new Date() - contest.startTime) / 1000);
    
    const submission = contest.submitSolution(
      req.user._id,
      questionId,
      code,
      language,
      isCorrect,
      timeTaken
    );
    
    await contest.save();
    
    res.json({
      message: isCorrect ? 'Solution accepted!' : 'Solution needs improvement',
      submission: {
        id: submission._id,
        isCorrect,
        timeTaken,
        submittedAt: submission.submittedAt
      }
    });
  } catch (error) {
    console.error('Submit solution error:', error);
    res.status(500).json({ message: 'Server error while submitting solution' });
  }
});

// Get contest details
router.get('/:contestId', auth, async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.contestId)
      .populate('participants.userId', 'username profile')
      .populate('questions', 'title difficulty topics');
    
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    
    // Check if user is a participant or creator
    const isParticipant = contest.participants.some(
      p => p.userId._id.toString() === req.user._id.toString()
    );
    const isCreator = contest.createdBy.toString() === req.user._id.toString();
    
    if (!isParticipant && !isCreator) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json({ contest });
  } catch (error) {
    console.error('Get contest error:', error);
    res.status(500).json({ message: 'Server error while fetching contest' });
  }
});

// Get contest leaderboard
router.get('/:contestId/leaderboard', auth, async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.contestId)
      .populate('participants.userId', 'username profile');
    
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    
    // Check if user is a participant or creator
    const isParticipant = contest.participants.some(
      p => p.userId._id.toString() === req.user._id.toString()
    );
    const isCreator = contest.createdBy.toString() === req.user._id.toString();
    
    if (!isParticipant && !isCreator) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Calculate rankings
    contest.calculateRankings();
    await contest.save();
    
    res.json({
      leaderboard: contest.participants.map(p => ({
        rank: p.rank,
        userId: p.userId._id,
        username: p.userId.username,
        profile: p.userId.profile,
        score: p.score
      })),
      contestStatus: contest.status,
      timeRemaining: contest.isActive() ? Math.max(0, contest.endTime - new Date()) : 0
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error while fetching leaderboard' });
  }
});

// Get active contests
router.get('/active', auth, async (req, res) => {
  try {
    const contests = await Contest.find({
      status: { $in: ['scheduled', 'active'] },
      $or: [
        { createdBy: req.user._id },
        { 'participants.userId': req.user._id }
      ]
    })
    .populate('participants.userId', 'username')
    .populate('questions', 'title difficulty')
    .sort({ createdAt: -1 });
    
    res.json({ contests });
  } catch (error) {
    console.error('Get active contests error:', error);
    res.status(500).json({ message: 'Server error while fetching active contests' });
  }
});

// Get contest history
router.get('/history', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const contests = await Contest.find({
      $or: [
        { createdBy: req.user._id },
        { 'participants.userId': req.user._id }
      ]
    })
    .populate('participants.userId', 'username')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await Contest.countDocuments({
      $or: [
        { createdBy: req.user._id },
        { 'participants.userId': req.user._id }
      ]
    });
    
    res.json({
      contests,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalContests: total
      }
    });
  } catch (error) {
    console.error('Get contest history error:', error);
    res.status(500).json({ message: 'Server error while fetching contest history' });
  }
});

// Simple solution validation (replace with proper code execution in production)
async function validateSolution(code, language) {
  if (!code || code.trim().length === 0) {
    return false;
  }
  
  if (language === 'javascript') {
    try {
      new Function(code);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  return true;
}

module.exports = router;
