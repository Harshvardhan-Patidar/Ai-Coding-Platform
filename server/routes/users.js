const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const geminiService = require('../utils/gemini');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('solvedQuestions.questionId', 'title difficulty topics')
      .select('-password');

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('stats solvedQuestions');
    
    // Calculate additional stats
    const totalQuestions = user.solvedQuestions.length;
    const solvedQuestions = user.solvedQuestions.filter(sq => sq.isCorrect !== false);
    
    const stats = {
      ...user.stats,
      totalQuestions,
      solvedQuestions: solvedQuestions.length,
      accuracy: totalQuestions > 0 ? Math.round((solvedQuestions.length / totalQuestions) * 100) : 0
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error while fetching stats' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await User.find({ isActive: true })
      .select('username profile stats')
      .sort({ 'stats.totalSolved': -1, 'stats.rank': 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments({ isActive: true });

    res.json({
      leaderboard: users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalUsers: total
      }
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error while fetching leaderboard' });
  }
});

// Get personalized learning plan
router.get('/learning-plan', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('learningPath stats solvedQuestions');
    
    // Analyze user's performance to identify weak and strong topics
    const topicStats = {};
    
    user.solvedQuestions.forEach(sq => {
      if (sq.questionId && sq.questionId.topics) {
        sq.questionId.topics.forEach(topic => {
          if (!topicStats[topic]) {
            topicStats[topic] = { total: 0, solved: 0 };
          }
          topicStats[topic].total++;
          if (sq.isCorrect !== false) {
            topicStats[topic].solved++;
          }
        });
      }
    });

    const weakTopics = Object.entries(topicStats)
      .filter(([_, stats]) => stats.total > 0 && (stats.solved / stats.total) < 0.5)
      .map(([topic, _]) => topic);

    const strongTopics = Object.entries(topicStats)
      .filter(([_, stats]) => stats.total > 0 && (stats.solved / stats.total) >= 0.8)
      .map(([topic, _]) => topic);

    const learningPlan = await geminiService.generatePersonalizedPlan(
      weakTopics,
      strongTopics,
      user.learningPath.currentLevel
    );

    // Update user's learning path
    user.learningPath.weakTopics = weakTopics;
    user.learningPath.completedTopics = strongTopics;
    await user.save();

    res.json({ learningPlan, weakTopics, strongTopics });
  } catch (error) {
    console.error('Get learning plan error:', error);
    res.status(500).json({ message: 'Server error while generating learning plan' });
  }
});

// Update learning preferences
router.put('/preferences', auth, [
  body('theme').optional().isIn(['light', 'dark']).withMessage('Invalid theme'),
  body('language').optional().isString().withMessage('Language must be a string'),
  body('difficulty').optional().isIn(['easy', 'medium', 'hard', 'all']).withMessage('Invalid difficulty'),
  body('notifications.email').optional().isBoolean().withMessage('Email notifications must be boolean'),
  body('notifications.push').optional().isBoolean().withMessage('Push notifications must be boolean'),
  body('notifications.contest').optional().isBoolean().withMessage('Contest notifications must be boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { theme, language, difficulty, notifications } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update preferences
    if (theme) user.preferences.theme = theme;
    if (language) user.preferences.language = language;
    if (difficulty) user.preferences.difficulty = difficulty;
    if (notifications) {
      user.preferences.notifications = {
        ...user.preferences.notifications,
        ...notifications
      };
    }

    user.updatedAt = new Date();
    await user.save();

    res.json({
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ message: 'Server error while updating preferences' });
  }
});

// Get user's solved questions
router.get('/solved-questions', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, difficulty, topic } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const user = await User.findById(req.user._id)
      .populate({
        path: 'solvedQuestions.questionId',
        match: {
          isActive: true,
          ...(difficulty && { difficulty }),
          ...(topic && { topics: { $in: [new RegExp(topic, 'i')] } })
        },
        select: 'title difficulty topics companies'
      })
      .select('solvedQuestions');

    const solvedQuestions = user.solvedQuestions
      .filter(sq => sq.questionId) // Filter out null questions
      .sort((a, b) => new Date(b.solvedAt) - new Date(a.solvedAt))
      .slice(skip, skip + parseInt(limit));

    const total = user.solvedQuestions.filter(sq => sq.questionId).length;

    res.json({
      solvedQuestions,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalSolved: total
      }
    });
  } catch (error) {
    console.error('Get solved questions error:', error);
    res.status(500).json({ message: 'Server error while fetching solved questions' });
  }
});

// Get user's progress analytics
router.get('/analytics', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('stats solvedQuestions');
    
    // Calculate daily activity for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const dailyActivity = {};
    const last30Days = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      last30Days.push(dateStr);
      dailyActivity[dateStr] = 0;
    }
    
    user.solvedQuestions.forEach(sq => {
      const solvedDate = new Date(sq.solvedAt).toISOString().split('T')[0];
      if (dailyActivity.hasOwnProperty(solvedDate)) {
        dailyActivity[solvedDate]++;
      }
    });
    
    // Calculate topic-wise performance
    const topicPerformance = {};
    user.solvedQuestions.forEach(sq => {
      if (sq.questionId && sq.questionId.topics) {
        sq.questionId.topics.forEach(topic => {
          if (!topicPerformance[topic]) {
            topicPerformance[topic] = { total: 0, solved: 0 };
          }
          topicPerformance[topic].total++;
          if (sq.isCorrect !== false) {
            topicPerformance[topic].solved++;
          }
        });
      }
    });
    
    // Calculate difficulty-wise performance
    const difficultyPerformance = {
      easy: { total: 0, solved: 0 },
      medium: { total: 0, solved: 0 },
      hard: { total: 0, solved: 0 }
    };
    
    user.solvedQuestions.forEach(sq => {
      if (sq.questionId && sq.questionId.difficulty) {
        const diff = sq.questionId.difficulty;
        difficultyPerformance[diff].total++;
        if (sq.isCorrect !== false) {
          difficultyPerformance[diff].solved++;
        }
      }
    });

    res.json({
      dailyActivity: last30Days.map(date => ({
        date,
        count: dailyActivity[date]
      })),
      topicPerformance: Object.entries(topicPerformance).map(([topic, stats]) => ({
        topic,
        total: stats.total,
        solved: stats.solved,
        accuracy: stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0
      })),
      difficultyPerformance: Object.entries(difficultyPerformance).map(([difficulty, stats]) => ({
        difficulty,
        total: stats.total,
        solved: stats.solved,
        accuracy: stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0
      })),
      currentStreak: user.stats.currentStreak,
      longestStreak: user.stats.longestStreak,
      totalTimeSpent: user.stats.totalTimeSpent
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Server error while fetching analytics' });
  }
});

module.exports = router;
