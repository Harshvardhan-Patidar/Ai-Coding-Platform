import { useState } from 'react';
import { 
  Trophy, 
  Users, 
  Clock, 
  Play, 
  Plus,
  Crown,
  Zap
} from 'lucide-react';

export default function Contest() {
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const mockContests = [
    {
      id: 1,
      name: 'Weekly Coding Challenge',
      participants: 156,
      duration: 60,
      status: 'active',
      startTime: new Date(),
      difficulty: 'medium',
      prize: 'Premium Subscription'
    },
    {
      id: 2,
      name: 'Algorithm Masters',
      participants: 89,
      duration: 90,
      status: 'upcoming',
      startTime: new Date(Date.now() + 3600000),
      difficulty: 'hard',
      prize: '$100 Gift Card'
    },
    {
      id: 3,
      name: 'Beginner Friendly',
      participants: 234,
      duration: 45,
      status: 'completed',
      startTime: new Date(Date.now() - 7200000),
      difficulty: 'easy',
      prize: 'Certificate'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900';
      case 'upcoming':
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900';
      case 'completed':
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Coding Contests</h1>
          <p className="text-muted-foreground">
            Compete with developers worldwide in real-time coding challenges
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Contest
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'active', name: 'Active Contests', count: 1 },
            { id: 'upcoming', name: 'Upcoming', count: 1 },
            { id: 'completed', name: 'Completed', count: 1 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Contest List */}
      <div className="space-y-4">
        {mockContests
          .filter(contest => contest.status === activeTab)
          .map((contest) => (
            <div key={contest.id} className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{contest.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contest.status)}`}>
                      {contest.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(contest.difficulty)}`}>
                      {contest.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{contest.participants} participants</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{contest.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4" />
                      <span>{contest.prize}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Started: {contest.startTime.toLocaleString()}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {contest.status === 'active' && (
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center">
                      <Play className="h-4 w-4 mr-2" />
                      Join Now
                    </button>
                  )}
                  {contest.status === 'upcoming' && (
                    <button className="border border-border text-foreground px-4 py-2 rounded-md hover:bg-accent transition-colors">
                      Register
                    </button>
                  )}
                  {contest.status === 'completed' && (
                    <button className="text-muted-foreground px-4 py-2 rounded-md hover:text-foreground">
                      View Results
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {mockContests.filter(contest => contest.status === activeTab).length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No {activeTab} contests
          </h3>
          <p className="text-muted-foreground mb-4">
            {activeTab === 'active' 
              ? 'No contests are currently running. Check back later!'
              : activeTab === 'upcoming'
              ? 'No upcoming contests scheduled. Create one to get started!'
              : 'You haven\'t participated in any contests yet.'
            }
          </p>
          {activeTab !== 'completed' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Contest
            </button>
          )}
        </div>
      )}

      {/* Create Contest Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg border border-border w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Create New Contest</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Contest Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter contest name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="60"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Difficulty
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Create Contest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
