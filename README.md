# AI-Powered Coding Practice & Interview Preparation Platform

A next-generation coding practice platform that combines AI intelligence with hands-on coding practice to help developers prepare for technical interviews and improve their coding skills.

## 🚀 Features

### Core Features
- **AI-Powered Coding Practice**: Practice with intelligent hints, debugging assistance, and personalized feedback
- **Voice-Based AI Interviews**: Simulate real interview experiences with AI-powered voice interactions
- **Always-Available Chatbot**: Get instant help and explanations for coding problems
- **Two-Player Contest Mode**: Compete with friends in real-time coding contests
- **AI Debugging Assistant**: Get detailed explanations of code issues and bugs

### Advanced Features
- **Algorithm Visualizer**: Interactive animations for sorting, recursion, graphs, and DP tables
- **Edge-Case Generator**: Auto-generates tricky test cases you might miss
- **Code Complexity Analyzer**: Automatically calculates Big-O time/space complexity
- **Adaptive Learning Path**: AI creates personalized study plans based on your performance
- **Real-time Collaboration**: Work on problems together with friends
- **Progress Analytics**: Detailed insights into your coding journey

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Monaco Editor** for code editing
- **Socket.IO** for real-time features
- **React Query** for data fetching
- **React Router** for navigation

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **Socket.IO** for real-time communication
- **JWT** for authentication
- **Google OAuth** for social login
- **Gemini AI API** for AI features

### AI Integration
- **Google Gemini 2.0 Flash** for all AI-powered features
- Voice recognition and synthesis
- Natural language processing
- Code analysis and feedback

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-coding-platform
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   **Backend (.env)**
   ```bash
   cd server
   cp env.example .env
   ```
   
   Edit `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ai-coding-platform
   JWT_SECRET=your_jwt_secret_key_here
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GEMINI_API_KEY=AIzaSyA7C4anyNxXOUVYN-lshnIAhfIUwFfKy4c
   NODE_ENV=development
   ```

   **Frontend (.env)**
   ```bash
   cd client
   cp env.example .env
   ```
   
   Edit `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the backend (port 5000) and frontend (port 3000) servers.

## 🎯 Usage

### Getting Started
1. Visit `http://localhost:3000`
2. Create an account or sign in with Google
3. Explore the dashboard to see your progress
4. Start solving coding problems
5. Try the AI interview simulation
6. Join or create coding contests

### Key Features Guide

#### Coding Problems
- Browse problems by difficulty, topic, or company
- Use the integrated code editor with syntax highlighting
- Get AI-powered hints and debugging help
- Submit solutions and get instant feedback

#### AI Interview
- Start a mock interview session
- Answer questions using voice input
- Get detailed feedback on your performance
- Practice both coding and behavioral questions

#### Contest Mode
- Create or join coding contests
- Compete in real-time with other developers
- Track your ranking and performance
- Win prizes and achievements

#### AI Assistant
- Chat with the AI assistant for help
- Get explanations for algorithms and concepts
- Request code reviews and suggestions
- Generate test cases and edge cases

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Questions
- `GET /api/questions` - Get all questions with filters
- `GET /api/questions/:id` - Get specific question
- `POST /api/questions/:id/submit` - Submit solution
- `POST /api/questions/:id/debug` - Get debug help

### AI Features
- `POST /api/ai/chat` - Chat with AI assistant
- `POST /api/ai/generate-question` - Generate interview question
- `POST /api/ai/analyze-complexity` - Analyze code complexity
- `POST /api/ai/code-review` - Get code review

### Contests
- `POST /api/contest/create` - Create new contest
- `POST /api/contest/:id/join` - Join contest
- `POST /api/contest/:id/submit` - Submit contest solution

## 🎨 Customization

### Themes
The platform supports both light and dark themes. Users can toggle between themes using the theme switcher in the navigation.

### Code Editor
The Monaco Editor supports multiple languages:
- JavaScript
- Python
- Java
- C++
- And more...

### AI Configuration
The AI features can be customized by modifying the prompts in the `server/utils/gemini.js` file.

## 🚀 Deployment

### Backend Deployment
1. Set up a MongoDB Atlas cluster
2. Deploy to Heroku, Vercel, or your preferred platform
3. Update environment variables
4. Configure CORS settings

### Frontend Deployment
1. Build the production bundle:
   ```bash
   cd client
   npm run build
   ```
2. Deploy to Vercel, Netlify, or your preferred platform
3. Update API URLs in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for providing the AI capabilities
- Monaco Editor for the code editing experience
- Radix UI for accessible components
- The open-source community for inspiration and tools

## 📞 Support

If you have any questions or need help, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue
4. Contact the development team

## 🔮 Future Roadmap

- [ ] Mobile app development
- [ ] Advanced algorithm visualizations
- [ ] Integration with more AI models
- [ ] Collaborative coding sessions
- [ ] Advanced analytics dashboard
- [ ] Company-specific interview prep
- [ ] Video interview simulations
- [ ] Machine learning-based problem recommendations

---

**Happy Coding! 🎉**
