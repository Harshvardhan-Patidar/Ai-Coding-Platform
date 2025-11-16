import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Code, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Target,
  Calendar,
  Award,
  Zap,
  Sparkles,
  Star,
  Crown,
  User,
  Activity,
  Timer,
  TrendingDown
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalTimeSpent: 0,
    rank: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate loading user stats
    setTimeout(() => {
      setStats({
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        rank: 0
      });
      setRecentActivity([
        {
          title: 'Solved "Two Sum"',
          time: '2 hours ago',
          status: 'Easy',
          difficulty: 'easy'
        },
        {
          title: 'Attempted "Trapping Rain Water"',
          time: '1 day ago',
          status: 'Hard',
          difficulty: 'hard'
        },
        {
          title: 'Solved "Valid Parentheses"',
          time: '2 days ago',
          status: 'Easy',
          difficulty: 'easy'
        }
      ]);
      setIsLoading(false);
    }, 1500);
  }, [user]);

  // Enhanced theme-based styles with better contrast
  const backgroundStyles = theme === 'dark' 
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50';

  const cardBackground = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 shadow-xl'
    : 'bg-white border-gray-200 shadow-lg';

  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textMuted = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const hoverBackground = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

  const quickActions = [
    {
      title: 'Practice Problems',
      description: 'Solve coding challenges',
      icon: Code,
      href: '/questions',
      color: 'from-blue-500 to-cyan-500',
      bgColor: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
      borderColor: theme === 'dark' ? 'border-blue-700' : 'border-blue-200',
      textColor: theme === 'dark' ? 'text-blue-100' : 'text-blue-900'
    },
    {
      title: 'Mock Interview',
      description: 'AI-powered interview simulation',
      icon: Trophy,
      href: '/interview',
      color: 'from-emerald-500 to-green-500',
      bgColor: theme === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-50',
      borderColor: theme === 'dark' ? 'border-emerald-700' : 'border-emerald-200',
      textColor: theme === 'dark' ? 'text-emerald-100' : 'text-emerald-900'
    },
    {
      title: 'Join Contest',
      description: 'Compete with others',
      icon: Award,
      href: '/contest',
      color: 'from-purple-500 to-pink-500',
      bgColor: theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50',
      borderColor: theme === 'dark' ? 'border-purple-700' : 'border-purple-200',
      textColor: theme === 'dark' ? 'text-purple-100' : 'text-purple-900'
    },
    {
      title: 'View Leaderboard',
      description: 'See your ranking',
      icon: TrendingUp,
      href: '/leaderboard',
      color: 'from-orange-500 to-red-500',
      bgColor: theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50',
      borderColor: theme === 'dark' ? 'border-orange-700' : 'border-orange-200',
      textColor: theme === 'dark' ? 'text-orange-100' : 'text-orange-900'
    },
  ];

  const achievements = [
    {
      title: 'First Problem Solved',
      description: 'Solved your first coding problem',
      icon: Target,
      unlocked: stats.totalSolved > 0,
      progress: 100
    },
    {
      title: 'Streak Master',
      description: 'Maintained a 7-day streak',
      icon: Zap,
      unlocked: stats.longestStreak >= 7,
      progress: Math.min((stats.longestStreak / 7) * 100, 100)
    },
    {
      title: 'Problem Solver',
      description: 'Solved 10 problems',
      icon: Code,
      unlocked: stats.totalSolved >= 10,
      progress: Math.min((stats.totalSolved / 10) * 100, 100)
    },
    {
      title: 'Time Master',
      description: 'Spent 10 hours coding',
      icon: Clock,
      unlocked: stats.totalTimeSpent >= 600,
      progress: Math.min((stats.totalTimeSpent / 600) * 100, 100)
    },
  ];

  if (isLoading) {
    return (
      <div className={`min-h-screen ${backgroundStyles} flex items-center justify-center`}>
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-purple-500 mx-auto"></div>
            <Sparkles className="h-8 w-8 text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className={`mt-6 ${textMuted} text-lg animate-pulse`}>Loading your coding journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${backgroundStyles} ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Welcome Section with better contrast */}
        <div className={`relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl p-8 mb-8 border border-purple-500/30 overflow-hidden shadow-2xl`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back, {user?.username || 'Coder'}! 👋
                </h1>
                <p className="text-purple-100 text-lg">
                  Ready to continue your coding journey? Let's solve some problems!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-purple-100">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <span>You're on a {stats.currentStreak} day streak! Keep it up!</span>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid with better contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Total Solved',
              value: stats.totalSolved,
              icon: Code,
              color: 'from-emerald-500 to-green-500',
              bgColor: theme === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-50',
              change: '+5 this week',
              changeColor: 'text-emerald-400'
            },
            {
              label: 'Current Streak',
              value: `${stats.currentStreak} days`,
              icon: Zap,
              color: 'from-blue-500 to-cyan-500',
              bgColor: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
              change: 'Active now',
              changeColor: 'text-blue-400'
            },
            {
              label: 'Time Spent',
              value: `${Math.round(stats.totalTimeSpent / 60)}h`,
              icon: Clock,
              color: 'from-purple-500 to-pink-500',
              bgColor: theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50',
              change: '+2h today',
              changeColor: 'text-purple-400'
            },
            {
              label: 'Global Rank',
              value: `#${stats.rank}`,
              icon: Trophy,
              color: 'from-amber-500 to-orange-500',
              bgColor: theme === 'dark' ? 'bg-amber-900/30' : 'bg-amber-50',
              change: '↑ 12 positions',
              changeColor: 'text-amber-400'
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className={`${cardBackground} p-6 rounded-2xl transition-all duration-300 animate-fade-in-up border`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-xs font-semibold ${stat.changeColor} bg-opacity-20 px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/5'}`}>
                  {stat.change}
                </span>
              </div>
              <p className={`text-2xl font-bold ${textColor} mb-1`}>{stat.value}</p>
              <p className={`${textMuted} text-sm`}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Difficulty Breakdown */}
          <div className={`${cardBackground} p-6 rounded-2xl animate-fade-in-up border`}>
            <div className="flex items-center space-x-2 mb-6">
              <Activity className={`h-5 w-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              <h3 className={`text-xl font-bold ${textColor}`}>Problems Solved by Difficulty</h3>
            </div>
            <div className="space-y-4">
              {[
                { level: 'Easy', solved: stats.easySolved, total: 150, color: 'from-emerald-500 to-green-500', bg: theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-500/30' },
                { level: 'Medium', solved: stats.mediumSolved, total: 300, color: 'from-amber-500 to-yellow-500', bg: theme === 'dark' ? 'bg-amber-500/20' : 'bg-amber-500/30' },
                { level: 'Hard', solved: stats.hardSolved, total: 100, color: 'from-rose-500 to-red-500', bg: theme === 'dark' ? 'bg-rose-500/20' : 'bg-rose-500/30' }
              ].map((difficulty, index) => {
                const percentage = (difficulty.solved / difficulty.total) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={`${textColor} font-medium`}>{difficulty.level}</span>
                      <span className={textMuted}>{difficulty.solved}/{difficulty.total}</span>
                    </div>
                    <div className={`w-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} rounded-full h-2`}>
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${difficulty.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Quick Actions with better contrast */}
          <div className={`${cardBackground} p-6 rounded-2xl animate-fade-in-up border`}>
            <div className="flex items-center space-x-2 mb-6">
              <Zap className={`h-5 w-5 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
              <h3 className={`text-xl font-bold ${textColor}`}>Quick Actions</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.href}
                  className={`group p-4 rounded-xl border ${action.borderColor} ${action.bgColor} hover:shadow-xl hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${action.textColor} transition-all duration-300`}>
                        {action.title}
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Achievements with better contrast */}
        <div className={`${cardBackground} p-6 rounded-2xl mt-8 animate-fade-in-up border`}>
          <div className="flex items-center space-x-2 mb-6">
            <Crown className={`h-5 w-5 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
            <h3 className={`text-xl font-bold ${textColor}`}>Achievements</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  achievement.unlocked
                    ? `${theme === 'dark' ? 'border-emerald-500 bg-emerald-900/20' : 'border-emerald-400 bg-emerald-50'} hover:shadow-lg ${theme === 'dark' ? 'hover:shadow-emerald-500/20' : 'hover:shadow-emerald-500/10'}`
                    : `${theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-100'} ${theme === 'dark' ? 'hover:border-gray-600' : 'hover:border-gray-400'}`
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      achievement.unlocked
                        ? `${theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`
                        : `${theme === 'dark' ? 'bg-gray-700 text-gray-500' : 'bg-gray-300 text-gray-500'}`
                    }`}
                  >
                    <achievement.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-semibold ${
                        achievement.unlocked
                          ? textColor
                          : textSecondary
                      }`}
                    >
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${textMuted} mb-2`}>
                      {achievement.description}
                    </p>
                    <div className={`w-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} rounded-full h-1`}>
                      <div 
                        className="h-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-1000 ease-out"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                    <div className={`flex justify-between text-xs ${textMuted} mt-1`}>
                      <span>Progress</span>
                      <span>{Math.round(achievement.progress)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Recent Activity with better contrast */}
        <div className={`${cardBackground} p-6 rounded-2xl mt-8 animate-fade-in-up border`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Timer className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className={`text-xl font-bold ${textColor}`}>Recent Activity</h3>
            </div>
            <Link
              to="/questions"
              className={`text-sm font-medium transition-colors ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
            >
              View All →
            </Link>
          </div>
          {recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 group hover:scale-[1.02] ${
                    theme === 'dark' ? 'bg-gray-700/30 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    activity.difficulty === 'easy' ? 
                      `${theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}` :
                    activity.difficulty === 'medium' ? 
                      `${theme === 'dark' ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'}` :
                      `${theme === 'dark' ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600'}`
                  }`}>
                    <Code className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${textColor}`}>
                      {activity.title}
                    </p>
                    <p className={`text-xs ${textMuted}`}>{activity.time}</p>
                  </div>
                  <div className={`px-2 py-1 text-xs font-semibold rounded-full border ${
                    activity.difficulty === 'easy' ? 
                      `${theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}` :
                    activity.difficulty === 'medium' ? 
                      `${theme === 'dark' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-100 text-amber-700 border-amber-200'}` :
                      `${theme === 'dark' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-rose-100 text-rose-700 border-rose-200'}`
                  }`}>
                    {activity.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Code className={`h-16 w-16 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
              <p className={`${textMuted} mb-4`}>No recent activity. Start solving problems to see your progress here!</p>
              <Link
                to="/questions"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105"
              >
                <Code className="h-4 w-4 mr-2" />
                Browse Problems
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}