const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
    trim: true,
  },
  expectedOutput: {
    type: String,
    required: true,
    trim: true,
  },
  explanation: {
    type: String,
    trim: true,
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Question title is required"],
    trim: true,
    maxlength: [200, "Title cannot exceed 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Question description is required"],
    trim: true,
  },
  difficulty: {
    type: String,
    required: [true, "Difficulty level is required"],
    enum: {
      values: ["easy", "medium", "hard"],
      message: "Difficulty must be easy, medium, or hard",
    },
  },
  topics: [
    {
      type: String,
      required: [true, "At least one topic is required"],
      trim: true,
    },
  ],
  companies: [
    {
      type: String,
      trim: true,
    },
  ],
  constraints: [
    {
      type: String,
      trim: true,
    },
  ],
  examples: [
    {
      input: {
        type: String,
        trim: true,
      },
      output: {
        type: String,
        trim: true,
      },
      explanation: {
        type: String,
        trim: true,
      },
    },
  ],
  testCases: [testCaseSchema],
  hints: [
    {
      type: String,
      trim: true,
    },
  ],
  solutions: [
    {
      language: {
        type: String,
        required: true,
        trim: true,
      },
      code: {
        type: String,
        required: true,
        trim: true,
      },
      explanation: {
        type: String,
        trim: true,
      },
      timeComplexity: {
        type: String,
        trim: true,
      },
      spaceComplexity: {
        type: String,
        trim: true,
      },
    },
  ],
  acceptanceRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  totalSubmissions: {
    type: Number,
    default: 0,
    min: 0,
  },
  correctSubmissions: {
    type: Number,
    default: 0,
    min: 0,
  },
  averageTime: {
    type: Number,
    default: 0,
    min: 0,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual for acceptance rate calculation
questionSchema.virtual("acceptanceRatePercentage").get(function () {
  if (this.totalSubmissions === 0) return 0;
  return Math.round((this.correctSubmissions / this.totalSubmissions) * 100);
});

// Update acceptance rate
questionSchema.methods.updateAcceptanceRate = function (isCorrect) {
  this.totalSubmissions += 1;
  if (isCorrect) {
    this.correctSubmissions += 1;
  }
  this.acceptanceRate = this.acceptanceRatePercentage;
  return this.save();
};

// Update average time
questionSchema.methods.updateAverageTime = function (timeTaken) {
  if (this.averageTime === 0) {
    this.averageTime = timeTaken;
  } else {
    // Weighted average to prevent extreme fluctuations
    this.averageTime = this.averageTime * 0.7 + timeTaken * 0.3;
  }
  return this.save();
};

// Index for performance
questionSchema.index({ difficulty: 1 });
questionSchema.index({ topics: 1 });
questionSchema.index({ companies: 1 });
questionSchema.index({ acceptanceRate: -1 });
questionSchema.index({ createdAt: -1 });
questionSchema.index({ isActive: 1 });
questionSchema.index({ title: "text", description: "text" }); // Text search index

// Middleware to update updatedAt before saving
questionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();

  // Ensure acceptance rate is calculated
  if (
    this.isModified("totalSubmissions") ||
    this.isModified("correctSubmissions")
  ) {
    this.acceptanceRate = this.acceptanceRatePercentage;
  }

  next();
});

// Static method to find questions by difficulty
questionSchema.statics.findByDifficulty = function (difficulty) {
  return this.find({ difficulty, isActive: true });
};

// Instance method to check if question is solved by user
questionSchema.methods.isSolvedByUser = async function (userId) {
  if (!userId) return false;

  const User = mongoose.model("User");
  const user = await User.findById(userId).select("solvedQuestions");

  if (!user || !user.solvedQuestions) return false;

  return user.solvedQuestions.some(
    (sq) =>
      sq.questionId &&
      sq.questionId.toString() === this._id.toString() &&
      sq.isCorrect
  );
};

module.exports = mongoose.model("Question", questionSchema);
