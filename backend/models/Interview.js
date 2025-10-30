const mongoose = require('mongoose');

const questionResponseSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  question: String,
  type: { type: String, enum: ['coding', 'behavioral', 'system_design'] },
  userAnswer: String,
  aiFeedback: String,
  score: { type: Number, min: 0, max: 10 },
  timeSpent: Number, // in seconds
  hintsUsed: { type: Number, default: 0 }
});

const interviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: String, required: true, unique: true },
  type: {
    type: String,
    enum: ['mock', 'coding','behavioral'],
    default: 'practice'
  },
  duration: { type: Number, required: true }, // in minutes
  status: {
    type: String,
    enum: ['scheduled', 'in_progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  questions: [questionResponseSchema],
  overallScore: { type: Number, min: 0, max: 100 },
  feedback: {
    strengths: [String],
    weaknesses: [String],
    recommendations: [String],
    overallComments: String
  },
  aiAnalysis: {
    communicationScore: { type: Number, min: 0, max: 10 },
    problemSolvingScore: { type: Number, min: 0, max: 10 },
    codeQualityScore: { type: Number, min: 0, max: 10 },
    timeManagementScore: { type: Number, min: 0, max: 10 },
    confidenceScore: { type: Number, min: 0, max: 10 }
  },
  startedAt: Date,
  completedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

// Calculate overall score
interviewSchema.methods.calculateOverallScore = function() {
  if (this.questions.length === 0) return 0;
  
  const totalScore = this.questions.reduce((sum, q) => sum + (q.score || 0), 0);
  const avgScore = totalScore / this.questions.length;
  
  // Weighted average with AI analysis
  const aiWeight = 0.3;
  const questionWeight = 0.7;
  
  const aiAvg = (
    this.aiAnalysis.communicationScore +
    this.aiAnalysis.problemSolvingScore +
    this.aiAnalysis.codeQualityScore +
    this.aiAnalysis.timeManagementScore +
    this.aiAnalysis.confidenceScore
  ) / 5;
  
  this.overallScore = Math.round((avgScore * questionWeight + aiAvg * aiWeight) * 10);
  return this.overallScore;
};

// Generate feedback
interviewSchema.methods.generateFeedback = function() {
  const strengths = [];
  const weaknesses = [];
  const recommendations = [];
  
  // Analyze scores
  if (this.aiAnalysis.communicationScore >= 8) {
    strengths.push('Excellent communication skills');
  } else if (this.aiAnalysis.communicationScore <= 5) {
    weaknesses.push('Communication needs improvement');
    recommendations.push('Practice explaining your thought process out loud');
  }
  
  if (this.aiAnalysis.problemSolvingScore >= 8) {
    strengths.push('Strong problem-solving approach');
  } else if (this.aiAnalysis.problemSolvingScore <= 5) {
    weaknesses.push('Problem-solving approach needs work');
    recommendations.push('Practice breaking down complex problems into smaller steps');
  }
  
  if (this.aiAnalysis.codeQualityScore >= 8) {
    strengths.push('Clean and efficient code');
  } else if (this.aiAnalysis.codeQualityScore <= 5) {
    weaknesses.push('Code quality needs improvement');
    recommendations.push('Focus on writing cleaner, more readable code');
  }
  
  if (this.aiAnalysis.timeManagementScore >= 8) {
    strengths.push('Good time management');
  } else if (this.aiAnalysis.timeManagementScore <= 5) {
    weaknesses.push('Time management needs improvement');
    recommendations.push('Practice with time constraints and learn to prioritize');
  }
  
  if (this.aiAnalysis.confidenceScore >= 8) {
    strengths.push('Confident presentation');
  } else if (this.aiAnalysis.confidenceScore <= 5) {
    weaknesses.push('Confidence needs building');
    recommendations.push('Practice mock interviews to build confidence');
  }
  
  this.feedback = {
    strengths,
    weaknesses,
    recommendations,
    overallComments: `Overall performance: ${this.overallScore}/100. ${strengths.length > 0 ? 'Keep up the good work on your strengths!' : ''} ${weaknesses.length > 0 ? 'Focus on improving the identified areas.' : ''}`
  };
};

// Index for performance
interviewSchema.index({ userId: 1 });
interviewSchema.index({ sessionId: 1 });
interviewSchema.index({ status: 1 });
interviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Interview', interviewSchema);
