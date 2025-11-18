import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp,
  Users,
  Award,
  Sparkles,
  Loader2
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('overall');
  const [isVisible, setIsVisible] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    setIsVisible(true);
    fetchLeaderboardData();
  }, [timeFilter, categoryFilter]);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${API_BASE_URL}/leaderboard?timeFilter=${timeFilter}&category=${categoryFilter}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setLeaderboardData(data.leaderboard || []);
        setCurrentUserRank(data.currentUserRank || null);
      } else {
        throw new Error(data.message || 'Failed to fetch leaderboard data');
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      setError(error.message);
      setLeaderboardData([]);
      setCurrentUserRank(null);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced theme-based styles with better contrast
  const backgroundStyles = theme === 'dark' 
    ? 'bg-gradient-to-br from-gray-900 via-purple-900/50 to-violet-900'
    : 'bg-gradient-to-br from-gray-50 via-blue-50/50 to-indigo-50';

  const cardBackground = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 shadow-xl'
    : 'bg-white border-gray-200 shadow-lg';

  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textMuted = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  const getBadgeIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500 animate-pulse" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400 animate-pulse" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600 animate-pulse" />;
      default:
        return null;
    }
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-500 bg-gradient-to-r from-yellow-500/20 to-transparent';
    if (rank === 2) return 'text-gray-400 bg-gradient-to-r from-gray-500/20 to-transparent';
    if (rank === 3) return 'text-amber-600 bg-gradient-to-r from-amber-500/20 to-transparent';
    return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  };

  const getRankGradient = (rank) => {
    if (rank === 1) return 'from-yellow-500/10 via-yellow-600/5 to-transparent';
    if (rank === 2) return 'from-gray-500/10 via-gray-600/5 to-transparent';
    if (rank === 3) return 'from-amber-500/10 via-amber-600/5 to-transparent';
    return theme === 'dark' ? 'from-gray-800/50 to-gray-900/30' : 'from-white/50 to-gray-100/30';
  };

  const getRankBorder = (rank) => {
    if (rank === 1) return theme === 'dark' ? 'border-yellow-500/30' : 'border-yellow-500/40';
    if (rank === 2) return theme === 'dark' ? 'border-gray-500/30' : 'border-gray-500/40';
    if (rank === 3) return theme === 'dark' ? 'border-amber-500/30' : 'border-amber-500/40';
    return theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  };

  const getAvatarInitials = (user) => {
    if (user.profile?.firstName && user.profile?.lastName) {
      return `${user.profile.firstName[0]}${user.profile.lastName[0]}`.toUpperCase();
    }
    return user.username.substring(0, 2).toUpperCase();
  };

  const getUserDisplayName = (user) => {
    if (user.profile?.firstName && user.profile?.lastName) {
      return `${user.profile.firstName} ${user.profile.lastName}`;
    }
    return user.username;
  };

  if (loading) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${backgroundStyles} p-6 flex items-center justify-center`}>
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className={`text-xl ${textColor}`}>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${backgroundStyles} p-6 flex items-center justify-center`}>
        <div className="text-center">
          <div className={`${cardBackground} p-8 rounded-2xl border border-red-500/20 max-w-md`}>
            <h2 className={`text-2xl font-bold text-red-600 mb-4`}>Error Loading Leaderboard</h2>
            <p className={`${textMuted} mb-4`}>{error}</p>
            <button
              onClick={fetchLeaderboardData}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${backgroundStyles} p-6`}>
      <div className={`max-w-6xl mx-auto space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Leaderboard
            </h1>
            <p className={`${textMuted} text-lg`}>
              See how you rank against other developers
            </p>
          </div>
          <div className={`mt-4 sm:mt-0 flex items-center justify-center space-x-2 ${textMuted} ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} px-4 py-3 rounded-xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} shadow-lg`}>
            <Users className="h-5 w-5 text-purple-500" />
            <span>{leaderboardData.length} active users</span>
          </div>
        </div>

        {/* Filters */}
        <div className={`${cardBackground} p-6 rounded-2xl border`}>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[200px]">
              <label className={`block text-sm font-medium ${textColor} mb-3`}>
                Time Period
              </label>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
              >
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
              </select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <label className={`block text-sm font-medium ${textColor} mb-3`}>
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
              >
                <option value="overall">Overall Score</option>
                <option value="problems">Problems Solved</option>
                <option value="streak">Current Streak</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className={`${cardBackground} rounded-2xl overflow-hidden border`}>
          <div className={`px-8 py-6 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-900/50' : 'border-gray-300 bg-gray-100'} bg-gradient-to-r from-purple-500/10 to-pink-500/10`}>
            <h2 className={`text-2xl font-bold ${textColor} flex items-center`}>
              <Sparkles className="h-6 w-6 mr-3 text-purple-500" />
              Top Performers
            </h2>
          </div>
          
          {leaderboardData.length === 0 ? (
            <div className="px-8 py-12 text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold ${textColor} mb-2`}>No Users Found</h3>
              <p className={textMuted}>There are no users to display on the leaderboard yet.</p>
            </div>
          ) : (
            <div className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-300'}`}>
              {leaderboardData.map((user, index) => (
                <div
                  key={user._id || user.username}
                  className={`px-8 py-6 transition-all duration-500 hover:scale-[1.02] border-l-4 ${getRankBorder(user.rank)} ${
                    theme === 'dark' ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'
                  } ${
                    user.rank <= 3 ? `bg-gradient-to-r ${getRankGradient(user.rank)}` : ''
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
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                        {getAvatarInitials(user)}
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <h3 className={`text-lg font-semibold ${textColor} truncate`}>
                          {getUserDisplayName(user)}
                        </h3>
                        {getBadgeIcon(user.rank)}
                        <span className={`text-sm ${textSecondary}`}>
                          @{user.username}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                        <span className={textMuted}>{user.stats.totalSolved} problems solved</span>
                        <span className={textMuted}>{user.stats.currentStreak} day streak</span>
                        <span className={textMuted}>
                          {user.stats.easySolved}E / {user.stats.mediumSolved}M / {user.stats.hardSolved}H
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="flex-shrink-0 text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {user.score.toLocaleString()}
                      </div>
                      <div className={`text-sm ${textMuted}`}>points</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Your Rank */}
        {currentUserRank && (
          <div className={`bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border ${theme === 'dark' ? 'border-purple-500/30' : 'border-purple-500/20'} ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <h3 className={`text-2xl font-bold ${textColor} mb-6 flex items-center`}>
              <TrendingUp className="h-6 w-6 mr-3 text-green-500" />
              Your Ranking
            </h3>
            
            <div className="flex items-center space-x-6">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent">
                #{currentUserRank.rank}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className={`text-lg font-semibold ${textColor}`}>Your Current Rank</h4>
                  <TrendingUp className="h-5 w-5 text-green-500 animate-bounce" />
                </div>
                <p className={`${textMuted} mt-2`}>
                  You're in the top {Math.round((currentUserRank.rank / leaderboardData.length) * 100)}% of users!
                </p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${textColor}`}>{currentUserRank.score.toLocaleString()}</div>
                <div className={`text-sm ${textMuted}`}>points</div>
              </div>
            </div>
          </div>
        )}

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${cardBackground} p-6 rounded-2xl text-center border hover:scale-105 transition-transform duration-300`}>
            <Trophy className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
            <div className={`text-3xl font-bold ${textColor}`}>
              {Math.floor(currentUserRank?.score / 100) || 0}
            </div>
            <div className={`${textMuted}`}>Achievement Points</div>
          </div>
          
          <div className={`${cardBackground} p-6 rounded-2xl text-center border hover:scale-105 transition-transform duration-300`}>
            <Award className="h-10 w-10 text-blue-500 mx-auto mb-4" />
            <div className={`text-3xl font-bold ${textColor}`}>
              {currentUserRank?.stats?.longestStreak || 0}
            </div>
            <div className={`${textMuted}`}>Longest Streak</div>
          </div>
          
          <div className={`${cardBackground} p-6 rounded-2xl text-center border hover:scale-105 transition-transform duration-300`}>
            <TrendingUp className="h-10 w-10 text-green-500 mx-auto mb-4" />
            <div className={`text-3xl font-bold ${textColor}`}>
              {currentUserRank ? `Top ${Math.round((currentUserRank.rank / leaderboardData.length) * 100)}%` : 'N/A'}
            </div>
            <div className={`${textMuted}`}>Percentile</div>
          </div>
        </div>
      </div>
    </div>
  );
}