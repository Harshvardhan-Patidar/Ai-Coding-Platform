import { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp,
  Users,
  Award
} from 'lucide-react';

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('overall');

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
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 'silver':
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 'bronze':
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-600 dark:text-yellow-400';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-amber-600 dark:text-amber-400';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground">
            See how you rank against other developers
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{mockLeaderboard.length} active users</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-lg border border-border">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Time Period
            </label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="week">This Week</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="overall">Overall</option>
              <option value="problems">Problems Solved</option>
              <option value="streak">Current Streak</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Top Performers</h2>
        </div>
        
        <div className="divide-y divide-border">
          {mockLeaderboard.map((user, index) => (
            <div
              key={user.username}
              className={`px-6 py-4 hover:bg-muted/50 transition-colors ${
                index < 3 ? 'bg-gradient-to-r from-primary/5 to-transparent' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                {/* Rank */}
                <div className="flex-shrink-0 w-8 text-center">
                  <div className={`text-lg font-bold ${getRankColor(user.rank)}`}>
                    {user.rank}
                  </div>
                </div>

                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {user.avatar}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {user.name}
                    </h3>
                    {getBadgeIcon(user.badge)}
                    <span className="text-xs text-muted-foreground">
                      @{user.username}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                    <span>{user.problemsSolved} problems solved</span>
                    <span>{user.streak} day streak</span>
                  </div>
                </div>

                {/* Score */}
                <div className="flex-shrink-0 text-right">
                  <div className="text-lg font-bold text-foreground">
                    {user.score.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Rank */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Ranking</h3>
        
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-primary">#42</div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-foreground">Your Current Rank</h4>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground">
              You've moved up 3 positions this week!
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-foreground">1,850</div>
            <div className="text-xs text-muted-foreground">points</div>
          </div>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border text-center">
          <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">3</div>
          <div className="text-sm text-muted-foreground">Achievements</div>
        </div>
        
        <div className="bg-card p-4 rounded-lg border border-border text-center">
          <Award className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">15</div>
          <div className="text-sm text-muted-foreground">Contests Won</div>
        </div>
        
        <div className="bg-card p-4 rounded-lg border border-border text-center">
          <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">+12%</div>
          <div className="text-sm text-muted-foreground">This Month</div>
        </div>
      </div>
    </div>
  );
}
