const mongoose = require('mongoose');

const contestSubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  code: String,
  language: String,
  submittedAt: { type: Date, default: Date.now },
  isCorrect: { type: Boolean, default: false },
  timeTaken: Number, // in seconds
  attempts: { type: Number, default: 1 }
});

const contestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  type: {
    type: String,
    enum: ['practice', 'rated', 'tournament'],
    default: 'practice'
  },
  status: {
    type: String,
    enum: ['scheduled', 'active', 'finished', 'cancelled'],
    default: 'scheduled'
  },
  participants: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    joinedAt: { type: Date, default: Date.now },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 0 }
  }],
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  submissions: [contestSubmissionSchema],
  duration: { type: Number, required: true }, // in minutes
  startTime: { type: Date, required: true },
  endTime: Date,
  maxParticipants: { type: Number, default: 2 },
  isPrivate: { type: Boolean, default: false },
  password: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

// Calculate end time
contestSchema.pre('save', function(next) {
  if (this.isModified('startTime') || this.isModified('duration')) {
    this.endTime = new Date(this.startTime.getTime() + this.duration * 60 * 1000);
  }
  next();
});

// Add participant
contestSchema.methods.addParticipant = function(userId) {
  if (this.participants.length >= this.maxParticipants) {
    throw new Error('Contest is full');
  }
  
  if (this.participants.some(p => p.userId.toString() === userId.toString())) {
    throw new Error('User already in contest');
  }
  
  this.participants.push({ userId });
};

// Remove participant
contestSchema.methods.removeParticipant = function(userId) {
  this.participants = this.participants.filter(p => p.userId.toString() !== userId.toString());
};

// Submit solution
contestSchema.methods.submitSolution = function(userId, questionId, code, language, isCorrect, timeTaken) {
  const submission = {
    userId,
    questionId,
    code,
    language,
    isCorrect,
    timeTaken,
    submittedAt: new Date()
  };
  
  this.submissions.push(submission);
  
  // Update participant score
  const participant = this.participants.find(p => p.userId.toString() === userId.toString());
  if (participant && isCorrect) {
    participant.score += 1;
  }
  
  return submission;
};

// Calculate rankings
contestSchema.methods.calculateRankings = function() {
  this.participants.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // If scores are equal, rank by submission time
    const aSubmissions = this.submissions.filter(s => s.userId.toString() === a.userId.toString() && s.isCorrect);
    const bSubmissions = this.submissions.filter(s => s.userId.toString() === b.userId.toString() && s.isCorrect);
    
    if (aSubmissions.length === 0 && bSubmissions.length === 0) return 0;
    if (aSubmissions.length === 0) return 1;
    if (bSubmissions.length === 0) return -1;
    
    const aLastSubmission = Math.max(...aSubmissions.map(s => s.submittedAt.getTime()));
    const bLastSubmission = Math.max(...bSubmissions.map(s => s.submittedAt.getTime()));
    
    return aLastSubmission - bLastSubmission;
  });
  
  this.participants.forEach((participant, index) => {
    participant.rank = index + 1;
  });
};

// Check if contest is active
contestSchema.methods.isActive = function() {
  const now = new Date();
  return now >= this.startTime && now <= this.endTime && this.status === 'active';
};

// Check if contest has started
contestSchema.methods.hasStarted = function() {
  return new Date() >= this.startTime;
};

// Index for performance
contestSchema.index({ status: 1 });
contestSchema.index({ startTime: 1 });
contestSchema.index({ createdBy: 1 });
contestSchema.index({ 'participants.userId': 1 });

module.exports = mongoose.model('Contest', contestSchema);
