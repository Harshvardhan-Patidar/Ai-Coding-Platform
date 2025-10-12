const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId;
    },
    minlength: 6
  },
  googleId: {
    type: String,
    sparse: true
  },
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    bio: String,
    location: String,
    website: String,
    github: String,
    linkedin: String
  },
  stats: {
    totalSolved: { type: Number, default: 0 },
    easySolved: { type: Number, default: 0 },
    mediumSolved: { type: Number, default: 0 },
    hardSolved: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastActiveDate: Date,
    totalTimeSpent: { type: Number, default: 0 }, // in minutes
    rank: { type: Number, default: 0 }
  },
  preferences: {
    theme: { type: String, default: 'light', enum: ['light', 'dark'] },
    language: { type: String, default: 'javascript' },
    difficulty: { type: String, default: 'all', enum: ['easy', 'medium', 'hard', 'all'] },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      contest: { type: Boolean, default: true }
    }
  },
  solvedQuestions: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    solvedAt: { type: Date, default: Date.now },
    timeTaken: Number, // in minutes
    attempts: { type: Number, default: 1 },
    code: String,
    language: String
  }],
  learningPath: {
    currentLevel: { type: String, default: 'beginner' },
    completedTopics: [String],
    weakTopics: [String],
    recommendedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
  },
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Update stats when solving a question
userSchema.methods.updateStats = function(question, timeTaken, attempts) {
  this.stats.totalSolved += 1;
  this.stats[`${question.difficulty}Solved`] += 1;
  this.stats.totalTimeSpent += timeTaken;
  this.stats.lastActiveDate = new Date();
  
  // Update streak
  const today = new Date();
  const lastActive = this.stats.lastActiveDate;
  if (lastActive && this.isConsecutiveDay(today, lastActive)) {
    this.stats.currentStreak += 1;
  } else {
    this.stats.currentStreak = 1;
  }
  
  if (this.stats.currentStreak > this.stats.longestStreak) {
    this.stats.longestStreak = this.stats.currentStreak;
  }
  
  // Add to solved questions
  this.solvedQuestions.push({
    questionId: question._id,
    timeTaken,
    attempts,
    code: question.userCode || '',
    language: question.language || 'javascript'
  });
};

userSchema.methods.isConsecutiveDay = function(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.abs(date1 - date2) <= oneDay;
};

// Index for performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ 'stats.totalSolved': -1 });
userSchema.index({ 'stats.rank': 1 });

module.exports = mongoose.model('User', userSchema);
