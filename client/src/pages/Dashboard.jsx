import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
        totalSolved: 47,
        easySolved: 25,
        mediumSolved: 18,
        hardSolved: 4,
        currentStreak: 12,
        longestStreak: 15,
        totalTimeSpent: 2850,
        rank: 156
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

  const quickActions = [
    {
      title: 'Practice Problems',
      description: 'Solve coding challenges',
      icon: Code,
      href: '/questions',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: 'Mock Interview',
      description: 'AI-powered interview simulation',
      icon: Trophy,
      href: '/interview',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      title: 'Join Contest',
      description: 'Compete with others',
      icon: Award,
      href: '/contest',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: 'View Leaderboard',
      description: 'See your ranking',
      icon: TrendingUp,
      href: '/leaderboard',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-purple-500 mx-auto"></div>
            <Sparkles className="h-8 w-8 text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="mt-6 text-slate-400 text-lg animate-pulse">Loading your coding journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Welcome Section */}
        <div className="relative bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-purple-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back, {user?.username || 'Coder'}! 👋
                </h1>
                <p className="text-purple-200 text-lg">
                  Ready to continue your coding journey? Let's solve some problems!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-purple-200">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <span>You're on a {stats.currentStreak} day streak! Keep it up!</span>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Total Solved',
              value: stats.totalSolved,
              icon: Code,
              color: 'from-emerald-500 to-green-500',
              bgColor: 'bg-emerald-500/10',
              change: '+5 this week'
            },
            {
              label: 'Current Streak',
              value: `${stats.currentStreak} days`,
              icon: Zap,
              color: 'from-blue-500 to-cyan-500',
              bgColor: 'bg-blue-500/10',
              change: 'Active now'
            },
            {
              label: 'Time Spent',
              value: `${Math.round(stats.totalTimeSpent / 60)}h`,
              icon: Clock,
              color: 'from-purple-500 to-pink-500',
              bgColor: 'bg-purple-500/10',
              change: '+2h today'
            },
            {
              label: 'Global Rank',
              value: `#${stats.rank}`,
              icon: Trophy,
              color: 'from-amber-500 to-orange-500',
              bgColor: 'bg-amber-500/10',
              change: '↑ 12 positions'
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-slate-600 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Difficulty Breakdown */}
          <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 animate-fade-in-up">
            <div className="flex items-center space-x-2 mb-6">
              <Activity className="h-5 w-5 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Problems Solved by Difficulty</h3>
            </div>
            <div className="space-y-4">
              {[
                { level: 'Easy', solved: stats.easySolved, total: 150, color: 'from-emerald-500 to-green-500', bg: 'bg-emerald-500/20' },
                { level: 'Medium', solved: stats.mediumSolved, total: 300, color: 'from-amber-500 to-yellow-500', bg: 'bg-amber-500/20' },
                { level: 'Hard', solved: stats.hardSolved, total: 100, color: 'from-rose-500 to-red-500', bg: 'bg-rose-500/20' }
              ].map((difficulty, index) => {
                const percentage = (difficulty.solved / difficulty.total) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300 font-medium">{difficulty.level}</span>
                      <span className="text-slate-400">{difficulty.solved}/{difficulty.total}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
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

          {/* Enhanced Quick Actions */}
          <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 animate-fade-in-up">
            <div className="flex items-center space-x-2 mb-6">
              <Zap className="h-5 w-5 text-amber-400" />
              <h3 className="text-xl font-bold text-white">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.href}
                  className={`group p-4 rounded-xl border ${action.borderColor} ${action.bgColor} hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 transition-all duration-300">
                        {action.title}
                      </h4>
                      <p className="text-sm text-slate-400">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Achievements */}
        <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 mt-8 animate-fade-in-up">
          <div className="flex items-center space-x-2 mb-6">
            <Crown className="h-5 w-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Achievements</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                  achievement.unlocked
                    ? 'border-emerald-500/30 bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20'
                    : 'border-slate-700 bg-slate-700/30 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      achievement.unlocked
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-600 text-slate-400'
                    }`}
                  >
                    <achievement.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-semibold ${
                        achievement.unlocked
                          ? 'text-white'
                          : 'text-slate-400'
                      }`}
                    >
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-slate-400 mb-2">
                      {achievement.description}
                    </p>
                    <div className="w-full bg-slate-700 rounded-full h-1">
                      <div 
                        className="h-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-1000 ease-out"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>Progress</span>
                      <span>{Math.round(achievement.progress)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Recent Activity */}
        <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 mt-8 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Timer className="h-5 w-5 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Recent Activity</h3>
            </div>
            <Link
              to="/questions"
              className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              View All →
            </Link>
          </div>
          {recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group hover:scale-[1.02]"
                >
                  <div className={`p-2 rounded-lg ${
                    activity.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-400' :
                    activity.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-rose-500/20 text-rose-400'
                  }`}>
                    <Code className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200">
                      {activity.title}
                    </p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                  <div className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    activity.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    activity.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {activity.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Code className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">No recent activity. Start solving problems to see your progress here!</p>
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