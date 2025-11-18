const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const userRoutes = require('./routes/users');
const interviewRoutes = require('./routes/interview');
const leaderboardRoutes = require('./routes/leaderboard');
const contestRoutes = require('./routes/contest');
const aiRoutes = require('./routes/ai');

const app = express();
const server = createServer(app);

// Socket.IO setup - FIXED CONFIGURATION
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // increased limit
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint - ADD THIS
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/contest', contestRoutes);
app.use('/api/ai', aiRoutes);

// Enhanced Socket.io for real-time features - FIXED
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Contest room management
  socket.on('join-contest', (contestId) => {
    socket.join(contestId);
    console.log(`User ${socket.id} joined contest ${contestId}`);
  });
  
  socket.on('leave-contest', (contestId) => {
    socket.leave(contestId);
    console.log(`User ${socket.id} left contest ${contestId}`);
  });
  
  socket.on('contest-submission', (data) => {
    socket.to(data.contestId).emit('opponent-submission', data);
  });

  // Question collaboration features
  socket.on('join-question', (questionId) => {
    socket.join(questionId);
    console.log(`User ${socket.id} joined question ${questionId}`);
  });

  socket.on('code-change', (data) => {
    socket.to(data.questionId).emit('code-update', data);
  });

  socket.on('disconnect', (reason) => {
    console.log('User disconnected:', socket.id, 'Reason:', reason);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-platform');
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Socket.IO server running`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  });
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = { app, io };