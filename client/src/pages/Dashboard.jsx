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
  Zap
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

  useEffect(() => {
    // Simulate loading user stats
    setTimeout(() => {
      setStats(user?.stats || {
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        rank: 0
      });
      setIsLoading(false);
    }, 1000);
  }, [user]);

  const quickActions = [
    {
      title: 'Practice Problems',
      description: 'Solve coding challenges',
      icon: Code,
      href: '/questions',
      color: 'bg-blue-500',
    },
    {
      title: 'Mock Interview',
      description: 'AI-powered interview simulation',
      icon: Trophy,
      href: '/interview',
      color: 'bg-green-500',
    },
    {
      title: 'Join Contest',
      description: 'Compete with others',
      icon: Award,
      href: '/contest',
      color: 'bg-purple-500',
    },
    {
      title: 'View Leaderboard',
      description: 'See your ranking',
      icon: TrendingUp,
      href: '/leaderboard',
      color: 'bg-orange-500',
    },
  ];

  const achievements = [
    {
      title: 'First Problem Solved',
      description: 'Solved your first coding problem',
      icon: Target,
      unlocked: stats.totalSolved > 0,
    },
    {
      title: 'Streak Master',
      description: 'Maintained a 7-day streak',
      icon: Zap,
      unlocked: stats.longestStreak >= 7,
    },
    {
      title: 'Problem Solver',
      description: 'Solved 10 problems',
      icon: Code,
      unlocked: stats.totalSolved >= 10,
    },
    {
      title: 'Time Master',
      description: 'Spent 10 hours coding',
      icon: Clock,
      unlocked: stats.totalTimeSpent >= 600, // 10 hours in minutes
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.username || 'Coder'}! 👋
        </h1>
        <p className="text-primary-foreground/80">
          Ready to continue your coding journey? Let's solve some problems!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Code className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Solved</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalSolved}</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold text-foreground">{stats.currentStreak} days</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Time Spent</p>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(stats.totalTimeSpent / 60)}h
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Trophy className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Rank</p>
              <p className="text-2xl font-bold text-foreground">
                #{stats.rank || 'Unranked'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Problems Solved by Difficulty</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.easySolved}
            </div>
            <div className="text-sm text-muted-foreground">Easy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {stats.mediumSolved}
            </div>
            <div className="text-sm text-muted-foreground">Medium</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {stats.hardSolved}
            </div>
            <div className="text-sm text-muted-foreground">Hard</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.href}
              className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 ${action.color} rounded-lg`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground group-hover:text-primary">
                    {action.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg ${
                achievement.unlocked
                  ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                  : 'border-border bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    achievement.unlocked
                      ? 'bg-green-100 dark:bg-green-900'
                      : 'bg-muted'
                  }`}
                >
                  <achievement.icon
                    className={`h-5 w-5 ${
                      achievement.unlocked
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                </div>
                <div>
                  <h4
                    className={`font-medium ${
                      achievement.unlocked
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        {recentActivity.length > 0 ? (
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Code className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <div className="text-sm text-muted-foreground">{activity.status}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity. Start solving problems to see your progress here!</p>
            <Link
              to="/questions"
              className="inline-block mt-4 text-primary hover:text-primary/80 font-medium"
            >
              Browse Problems →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
