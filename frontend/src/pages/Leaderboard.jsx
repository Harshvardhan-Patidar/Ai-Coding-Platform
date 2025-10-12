// Leaderboard.jsx
import { useState, useEffect } from 'react';
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp,
  Users,
  Award,
  Sparkles
} from 'lucide-react';

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('overall');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const mockLeaderboard = [
    {
      rank: 1,
      username: 'alex_coder',
      name: 'Alex Johnson',
      score: 2450,
      problemsSolved: 156,
      streak: 23,
      avatar: 'AJ',
      badge: 'gold'
    },
    {
      rank: 2,
      username: 'sarah_dev',
      name: 'Sarah Chen',
      score: 2380,
      problemsSolved: 142,
      streak: 18,
      avatar: 'SC',
      badge: 'silver'
    },
    {
      rank: 3,
      username: 'mike_algo',
      name: 'Mike Rodriguez',
      score: 2290,
      problemsSolved: 138,
      streak: 15,
      avatar: 'MR',
      badge: 'bronze'
    },
    {
      rank: 4,
      username: 'emma_tech',
      name: 'Emma Wilson',
      score: 2150,
      problemsSolved: 125,
      streak: 12,
      avatar: 'EW',
      badge: null
    },
    {
      rank: 5,
      username: 'david_code',
      name: 'David Kim',
      score: 2080,
      problemsSolved: 118,
      streak: 10,
      avatar: 'DK',
      badge: null
    }
  ];

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'gold':
        return <Crown className="h-6 w-6 text-yellow-400 animate-pulse" />;
      case 'silver':
        return <Medal className="h-6 w-6 text-gray-300 animate-pulse" />;
      case 'bronze':
        return <Award className="h-6 w-6 text-amber-500 animate-pulse" />;
      default:
        return null;
    }
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-400 bg-gradient-to-r from-yellow-600/20 to-transparent';
    if (rank === 2) return 'text-gray-300 bg-gradient-to-r from-gray-600/20 to-transparent';
    if (rank === 3) return 'text-amber-500 bg-gradient-to-r from-amber-600/20 to-transparent';
    return 'text-gray-400';
  };

  const getRankGradient = (rank) => {
    if (rank === 1) return 'from-yellow-500/10 via-yellow-600/5 to-transparent';
    if (rank === 2) return 'from-gray-500/10 via-gray-600/5 to-transparent';
    if (rank === 3) return 'from-amber-500/10 via-amber-600/5 to-transparent';
    return 'from-gray-800/50 to-gray-900/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
      <div className={`max-w-6xl mx-auto space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Leaderboard
            </h1>
            <p className="text-gray-300 text-lg">
              See how you rank against other developers
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center justify-center space-x-2 text-gray-300 bg-gray-800/50 px-4 py-3 rounded-xl backdrop-blur-sm border border-gray-700">
            <Users className="h-5 w-5 text-purple-400" />
            <span>{mockLeaderboard.length} active users</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 backdrop-blur-sm shadow-2xl">
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Time Period
              </label>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-900/80 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
              </select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-900/80 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              >
                <option value="overall">Overall</option>
                <option value="problems">Problems Solved</option>
                <option value="streak">Current Streak</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-gray-800/40 rounded-2xl border border-gray-700 overflow-hidden backdrop-blur-sm shadow-2xl">
          <div className="px-8 py-6 border-b border-gray-700 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Sparkles className="h-6 w-6 mr-3 text-purple-400" />
              Top Performers
            </h2>
          </div>
          
          <div className="divide-y divide-gray-700">
            {mockLeaderboard.map((user, index) => (
              <div
                key={user.username}
                className={`px-8 py-6 transition-all duration-500 hover:scale-[1.02] hover:bg-gray-700/30 ${
                  index < 3 ? `bg-gradient-to-r ${getRankGradient(user.rank)}` : ''
                } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-6">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 text-center">
                    <div className={`text-xl font-bold ${getRankColor(user.rank)} px-3 py-2 rounded-full`}>
                      {user.rank}
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                      {user.avatar}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {user.name}
                      </h3>
                      {getBadgeIcon(user.badge)}
                      <span className="text-sm text-gray-400">
                        @{user.username}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 mt-2 text-sm text-gray-400">
                      <span>{user.problemsSolved} problems solved</span>
                      <span>{user.streak} day streak</span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="flex-shrink-0 text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {user.score.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Rank */}
        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 p-8 rounded-2xl border border-purple-500/30 backdrop-blur-sm shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-3 text-green-400" />
            Your Ranking
          </h3>
          
          <div className="flex items-center space-x-6">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              #42
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h4 className="text-lg font-semibold text-white">Your Current Rank</h4>
                <TrendingUp className="h-5 w-5 text-green-400 animate-bounce" />
              </div>
              <p className="text-gray-300 mt-2">
                You've moved up <span className="text-green-400 font-semibold">3 positions</span> this week!
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">1,850</div>
              <div className="text-sm text-gray-400">points</div>
            </div>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <Trophy className="h-10 w-10 text-yellow-400 mx-auto mb-4 animate-pulse" />
            <div className="text-3xl font-bold text-white">3</div>
            <div className="text-gray-400">Achievements</div>
          </div>
          
          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <Award className="h-10 w-10 text-blue-400 mx-auto mb-4 animate-pulse" />
            <div className="text-3xl font-bold text-white">15</div>
            <div className="text-gray-400">Contests Won</div>
          </div>
          
          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <TrendingUp className="h-10 w-10 text-green-400 mx-auto mb-4 animate-pulse" />
            <div className="text-3xl font-bold text-white">+12%</div>
            <div className="text-gray-400">This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
}