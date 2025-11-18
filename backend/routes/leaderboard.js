const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/leaderboard - Get leaderboard data
router.get('/', async (req, res) => {
  try {
    const { timeFilter = 'all', category = 'overall' } = req.query;

    // Build query based on filters
    let query = { isActive: true };
    
    // Add time-based filtering if needed
    if (timeFilter !== 'all') {
      const now = new Date();
      let startDate;
      
      if (timeFilter === 'week') {
        startDate = new Date(now.setDate(now.getDate() - 7));
      } else if (timeFilter === 'month') {
        startDate = new Date(now.setMonth(now.getMonth() - 1));
      }
      
      query['stats.lastActiveDate'] = { $gte: startDate };
    }

    // Fetch users with their stats
    const users = await User.find(query)
      .select('username email profile stats solvedQuestions learningPath createdAt')
      .sort({ 
        'stats.totalSolved': -1,
        'stats.currentStreak': -1,
        'stats.longestStreak': -1 
      })
      .limit(100)
      .lean();

    // Calculate scores and sort based on category
    const rankedUsers = users.map(user => {
      let score;
      
      switch (category) {
        case 'problems':
          score = user.stats.totalSolved;
          break;
        case 'streak':
          score = user.stats.currentStreak;
          break;
        case 'overall':
        default:
          // Overall score calculation
          const baseScore = user.stats.totalSolved * 10;
          const streakBonus = user.stats.currentStreak * 2;
          const difficultyBonus = (user.stats.hardSolved * 5) + (user.stats.mediumSolved * 3) + user.stats.easySolved;
          const timeBonus = Math.floor(user.stats.totalTimeSpent / 60); // 1 point per hour
          score = baseScore + streakBonus + difficultyBonus + timeBonus;
      }
      
      return {
        ...user,
        score
      };
    }).sort((a, b) => b.score - a.score);

    // Add rank to each user
    const leaderboardWithRanks = rankedUsers.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    // For demo purposes, using first user as current user
    // In real app, you'd get this from authentication
    const currentUserId = users[0]?._id;
    const currentUserRank = leaderboardWithRanks.find(user => user._id.toString() === currentUserId?.toString());

    res.status(200).json({
      success: true,
      leaderboard: leaderboardWithRanks.slice(0, 50), // Top 50
      currentUserRank: currentUserRank || null,
      filters: {
        timeFilter,
        category
      }
    });

  } catch (error) {
    console.error('Leaderboard API error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// GET /api/leaderboard/user/:userId - Get specific user's rank
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { timeFilter = 'all', category = 'overall' } = req.query;

    // Get all users for ranking calculation
    const users = await User.find({ isActive: true })
      .select('username profile stats')
      .lean();

    // Calculate scores (same logic as main endpoint)
    const rankedUsers = users.map(user => {
      const baseScore = user.stats.totalSolved * 10;
      const streakBonus = user.stats.currentStreak * 2;
      const difficultyBonus = (user.stats.hardSolved * 5) + (user.stats.mediumSolved * 3) + user.stats.easySolved;
      const timeBonus = Math.floor(user.stats.totalTimeSpent / 60);
      const score = baseScore + streakBonus + difficultyBonus + timeBonus;
      
      return {
        ...user,
        score
      };
    }).sort((a, b) => b.score - a.score);

    // Find user's rank
    const userIndex = rankedUsers.findIndex(user => user._id.toString() === userId);
    const userRank = userIndex !== -1 ? userIndex + 1 : null;
    const userData = rankedUsers[userIndex] || null;

    res.status(200).json({
      success: true,
      rank: userRank,
      user: userData,
      totalUsers: rankedUsers.length
    });

  } catch (error) {
    console.error('User rank API error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

module.exports = router;