const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  explanation: String,
  isHidden: { type: Boolean, default: false }
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  topics: [{
    type: String,
    required: true
  }],
  companies: [String],
  constraints: [String],
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  testCases: [testCaseSchema],
  hints: [String],
  solutions: [{
    language: String,
    code: String,
    explanation: String,
    timeComplexity: String,
    spaceComplexity: String
  }],
  acceptanceRate: { type: Number, default: 0 },
  totalSubmissions: { type: Number, default: 0 },
  correctSubmissions: { type: Number, default: 0 },
  averageTime: { type: Number, default: 0 }, // in minutes
  tags: [String],
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Virtual for acceptance rate calculation
questionSchema.virtual('acceptanceRatePercentage').get(function() {
  if (this.totalSubmissions === 0) return 0;
  return Math.round((this.correctSubmissions / this.totalSubmissions) * 100);
});

// Update acceptance rate
questionSchema.methods.updateAcceptanceRate = function(isCorrect) {
  this.totalSubmissions += 1;
  if (isCorrect) {
    this.correctSubmissions += 1;
  }
  this.acceptanceRate = this.acceptanceRatePercentage;
};

// Index for performance
questionSchema.index({ difficulty: 1 });
questionSchema.index({ topics: 1 });
questionSchema.index({ companies: 1 });
questionSchema.index({ acceptanceRate: -1 });
questionSchema.index({ createdAt: -1 });
questionSchema.index({ isActive: 1 });

module.exports = mongoose.model('Question', questionSchema);
