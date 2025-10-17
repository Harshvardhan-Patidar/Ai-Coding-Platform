import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Code, 
  Mic, 
  Trophy, 
  Users, 
  Brain, 
  Zap,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Star,
  Crown,
  Target,
  Clock,
  TrendingUp,
  Shield,
  Rocket
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme-based styles
  const backgroundStyles = theme === 'dark' 
    ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';

  const navBackground = theme === 'dark'
    ? 'bg-slate-800/20 backdrop-blur-sm border-b border-slate-700/50'
    : 'bg-white/20 backdrop-blur-sm border-b border-slate-200/50';

  const cardBackground = theme === 'dark'
    ? 'bg-slate-800/40 backdrop-blur-sm border border-slate-700'
    : 'bg-white/80 backdrop-blur-sm border border-slate-200';

  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textMuted = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  const features = [
    {
      icon: Code,
      title: 'AI-Powered Coding Practice',
      description: 'Practice with intelligent hints, debugging assistance, and personalized feedback.',
      color: 'from-purple-500 to-pink-500',
      delay: 0
    },
    {
      icon: Mic,
      title: 'Voice-Based Interviews',
      description: 'Simulate real interview experiences with AI-powered voice interactions.',
      color: 'from-blue-500 to-cyan-500',
      delay: 100
    },
    {
      icon: Trophy,
      title: 'Contest Mode',
      description: 'Compete with friends in real-time coding contests and tournaments.',
      color: 'from-amber-500 to-orange-500',
      delay: 200
    },
    {
      icon: Brain,
      title: 'Smart Learning Path',
      description: 'AI creates personalized study plans based on your strengths and weaknesses.',
      color: 'from-emerald-500 to-green-500',
      delay: 300
    },
    {
      icon: Users,
      title: 'Community & Leaderboards',
      description: 'Track your progress and compete with developers worldwide.',
      color: 'from-indigo-500 to-purple-500',
      delay: 400
    },
    {
      icon: Zap,
      title: 'Real-time Feedback',
      description: 'Get instant feedback on your code with detailed explanations.',
      color: 'from-red-500 to-pink-500',
      delay: 500
    },
  ];

  const stats = [
    { label: 'Coding Problems', value: '1000+', icon: Code, color: 'text-purple-400' },
    { label: 'Active Users', value: '10K+', icon: Users, color: 'text-blue-400' },
    { label: 'Companies', value: '50+', icon: Building, color: 'text-emerald-400' },
    { label: 'Success Rate', value: '95%', icon: TrendingUp, color: 'text-amber-400' },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      content: 'This platform helped me land my dream job. The AI feedback is incredibly accurate!',
      avatar: '👩‍💻'
    },
    {
      name: 'Alex Rodriguez',
      role: 'Full Stack Developer',
      content: 'The voice-based interviews prepared me better than any other platform. Highly recommended!',
      avatar: '👨‍💻'
    },
    {
      name: 'Priya Patel',
      role: 'Computer Science Student',
      content: 'The personalized learning path helped me improve my weak areas dramatically.',
      avatar: '🧑‍🎓'
    }
  ];

  return (
    <div className={`min-h-screen ${backgroundStyles} overflow-hidden transition-colors duration-300`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-500/5'} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-500/5'} rounded-full blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${theme === 'dark' ? 'bg-pink-500/5' : 'bg-pink-500/3'} rounded-full blur-3xl animate-pulse delay-500`}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-float"></div>
        <div className="absolute top-40 right-40 w-1 h-1 bg-blue-400 rounded-full animate-float delay-700"></div>
        <div className="absolute bottom-60 left-40 w-1.5 h-1.5 bg-pink-400 rounded-full animate-float delay-1200"></div>
        <div className="absolute bottom-40 right-60 w-1 h-1 bg-cyan-400 rounded-full animate-float delay-500"></div>
      </div>

      {/* Enhanced Navigation */}
      <nav className={`relative ${navBackground} z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  CodeMaster AI
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  Go to Dashboard
                  <Rocket className="inline h-4 w-4 ml-2 group-hover:animate-pulse" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`${textMuted} hover:${textColor} transition-colors duration-300 font-medium`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    Get Started
                    <Sparkles className="inline h-4 w-4 ml-2 group-hover:animate-pulse" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`mb-6 ${mounted ? 'animate-fade-in-down' : 'opacity-0'}`}>
            <span className={`inline-flex items-center px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-500/20 border border-purple-500/30'} text-purple-500 text-sm font-medium`}>
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              Next-Gen AI Learning Platform
            </span>
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Master Coding with
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI-Powered Learning
            </span>
          </h1>
          
          <p className={`text-xl ${textMuted} mb-8 max-w-3xl mx-auto leading-relaxed ${mounted ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
            The next-generation platform that combines AI intelligence with hands-on coding practice. 
            Prepare for interviews, improve your skills, and become industry-ready.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${mounted ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center justify-center"
            >
              Start Learning Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/questions"
              className={`group ${cardBackground} ${textColor} px-8 py-4 rounded-2xl text-lg font-semibold hover:${theme === 'dark' ? 'bg-slate-700/40' : 'bg-slate-100'} ${theme === 'dark' ? 'hover:border-slate-600' : 'hover:border-slate-300'} hover:scale-105 transition-all duration-300 inline-flex items-center justify-center`}
            >
              Browse Problems
              <Code className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className={`mt-12 flex flex-wrap justify-center items-center gap-8 ${textMuted} ${mounted ? 'animate-fade-in delay-700' : 'opacity-0'}`}>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span>Trusted by 10K+ Developers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-400" />
              <span>24/7 AI Assistance</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-amber-400" />
              <span>95% Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className={`relative py-16 ${theme === 'dark' ? 'bg-slate-800/20' : 'bg-white/20'} backdrop-blur-sm transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-transform duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${theme === 'dark' ? 'bg-slate-800/40' : 'bg-white/60'} rounded-2xl mb-4 group-hover:${theme === 'dark' ? 'bg-slate-700/40' : 'bg-white/80'} transition-colors duration-300`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className={`text-3xl font-bold ${textColor} mb-2`}>{stat.value}</div>
                <div className={`${textMuted} font-medium`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-4 animate-fade-in-up`}>
              Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">CodeMaster</span>?
            </h2>
            <p className={`text-xl ${textMuted} max-w-2xl mx-auto animate-fade-in-up delay-200`}>
              We combine cutting-edge AI technology with proven learning methodologies 
              to create the most effective coding practice experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group ${cardBackground} p-8 rounded-2xl ${theme === 'dark' ? 'hover:border-slate-600' : 'hover:border-slate-300'} hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-fade-in-up`}
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${textColor} mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 transition-all duration-300`}>
                  {feature.title}
                </h3>
                <p className={`${textMuted} leading-relaxed`}>
                  {feature.description}
                </p>
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-4`}>
              What Our <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Users Say</span>
            </h2>
            <p className={`text-xl ${textMuted} max-w-2xl mx-auto`}>
              Join thousands of developers who transformed their careers with CodeMaster
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`${cardBackground} p-8 rounded-2xl ${theme === 'dark' ? 'hover:border-slate-600' : 'hover:border-slate-300'} hover:shadow-xl hover:scale-105 transition-all duration-500 animate-fade-in-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className={`${textMuted} mb-6 italic`}>"{testimonial.content}"</p>
                <div>
                  <div className={`font-bold ${textColor}`}>{testimonial.name}</div>
                  <div className={`${textMuted} text-sm`}>{testimonial.role}</div>
                </div>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className={`relative py-20 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 backdrop-blur-sm transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <Crown className="h-16 w-16 text-amber-400 mx-auto mb-6 animate-pulse" />
            <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-4`}>
              Ready to Level Up Your Coding Skills?
            </h2>
            <p className="text-xl text-purple-600 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already improving their skills with our AI-powered platform.
            </p>
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="group bg-white text-slate-900 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center"
            >
              Get Started Free
              <Rocket className="ml-2 h-5 w-5 group-hover:animate-pulse" />
            </Link>
            
            {/* Guarantee badge */}
            <div className="mt-8 flex items-center justify-center space-x-2 text-slate-600">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <span>No credit card required • 7-day free trial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className={`relative ${theme === 'dark' ? 'bg-slate-800/40' : 'bg-white/40'} backdrop-blur-sm border-t ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'} py-12 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${textMuted}`}>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Code className="h-6 w-6 text-purple-400" />
              <span className="font-semibold text-purple-500">CodeMaster AI</span>
            </div>
            <p>&copy; 2024 CodeMaster AI. All rights reserved. Built with ❤️ for developers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Building icon component since it's not imported
function Building(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}