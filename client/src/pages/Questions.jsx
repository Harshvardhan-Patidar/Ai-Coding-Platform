import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { questionService } from '../services/questionService';
import { 
  Search, 
  Filter, 
  SortAsc, 
  Code, 
  Clock, 
  CheckCircle,
  Circle,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function Questions() {
  const [filters, setFilters] = useState({
    search: '',
    difficulty: '',
    topic: '',
    company: '',
    sort: 'newest'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['questions', filters],
    queryFn: () => questionService.getQuestions(filters),
  });

  const { data: filterOptions } = useQuery({
    queryKey: ['question-filters'],
    queryFn: questionService.getFilters,
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      difficulty: '',
      topic: '',
      company: '',
      sort: 'newest'
    });
  };


  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'medium':
        return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'hard':
        return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default:
        return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getStatusIcon = (isSolved) => {
    if (isSolved) {
      return <CheckCircle className="h-5 w-5 text-emerald-400 animate-pulse" />;
    }
    return <Circle className="h-5 w-5 text-slate-600" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto"></div>
            <Sparkles className="h-6 w-6 text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="mt-4 text-slate-400 animate-pulse">Loading problems...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="relative inline-block">
          <AlertCircle className="h-16 w-16 text-rose-400 mx-auto mb-4 animate-bounce" />
          <div className="absolute inset-0 bg-rose-400/20 rounded-full animate-ping"></div>
        </div>
        <h3 className="text-xl font-bold text-slate-200 mb-2">Error Loading Questions</h3>
        <p className="text-slate-400">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
            Coding Problems
          </h1>
          <p className="text-slate-400 mt-2 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
            Practice with {data?.pagination?.totalQuestions || 0} carefully curated problems
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm font-medium text-slate-200 backdrop-blur-sm hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
          >
            <Filter className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
            Filters
            {showFilters && (
              <span className="ml-2 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            )}
          </button>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="space-y-6">
        {/* Search Bar with Glow Effect */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search problems by title, topic, or company..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-slate-800/80 border border-slate-700 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
            />
          </div>
        </div>

        {/* Enhanced Filter Panel */}
        {showFilters && (
          <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 space-y-6 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">
                  Difficulty
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-slate-600"
                >
                  <option value="" className="bg-slate-800">All Difficulties</option>
                  <option value="easy" className="bg-slate-800 text-emerald-400">Easy</option>
                  <option value="medium" className="bg-slate-800 text-amber-400">Medium</option>
                  <option value="hard" className="bg-slate-800 text-rose-400">Hard</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">
                  Topic
                </label>
                <select
                  value={filters.topic}
                  onChange={(e) => handleFilterChange('topic', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-slate-600"
                >
                  <option value="" className="bg-slate-800">All Topics</option>
                  {filterOptions?.topics?.map((topic) => (
                    <option key={topic} value={topic} className="bg-slate-800">
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">
                  Company
                </label>
                <select
                  value={filters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-slate-600"
                >
                  <option value="" className="bg-slate-800">All Companies</option>
                  {filterOptions?.companies?.map((company) => (
                    <option key={company} value={company} className="bg-slate-800">
                      {company}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">
                  Sort By
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-slate-600"
                >
                  <option value="newest" className="bg-slate-800">Newest First</option>
                  <option value="oldest" className="bg-slate-800">Oldest First</option>
                  <option value="difficulty" className="bg-slate-800">Difficulty</option>
                  <option value="acceptance" className="bg-slate-800">Acceptance Rate</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Questions List */}
      <div className="space-y-4">
        {data?.questions?.length > 0 ? (
          data.questions.map((question, index) => (
            <Link
              key={question._id}
              to={`/questions/${question._id}`}
              className="block bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-slate-600 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getStatusIcon(question.isSolved)}
                    <h3 className="text-xl font-semibold text-slate-200 group-hover:text-white transition-colors">
                      {question.title}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(
                        question.difficulty
                      )}`}
                    >
                      {question.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-slate-400 mb-4 line-clamp-2 group-hover:text-slate-300 transition-colors">
                    {question.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {question.topics?.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1.5 text-xs bg-slate-700/50 text-slate-300 rounded-lg backdrop-blur-sm hover:bg-slate-600/50 transition-all duration-300"
                      >
                        {topic}
                      </span>
                    ))}
                    {question.topics?.length > 3 && (
                      <span className="px-3 py-1.5 text-xs bg-slate-700/50 text-slate-400 rounded-lg backdrop-blur-sm">
                        +{question.topics.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-slate-500">
                    <div className="flex items-center space-x-2 group/time">
                      <Clock className="h-4 w-4 group-hover/time:text-purple-400 transition-colors" />
                      <span className="group-hover/time:text-slate-300 transition-colors">
                        {question.averageTime || 0} min avg
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 group/acceptance">
                      <Code className="h-4 w-4 group-hover/acceptance:text-green-400 transition-colors" />
                      <span className="group-hover/acceptance:text-slate-300 transition-colors">
                        {question.acceptanceRate || 0}% acceptance
                      </span>
                    </div>
                    {question.companies?.length > 0 && (
                      <div className="flex items-center space-x-2 group/companies">
                        <span className="group-hover/companies:text-slate-300 transition-colors">
                          {question.companies.slice(0, 2).join(', ')}
                          {question.companies.length > 2 && (
                            <span className="text-slate-500 ml-1">
                              +{question.companies.length - 2}
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <div className="relative inline-block mb-4">
              <Code className="h-16 w-16 text-slate-600 mx-auto" />
              <div className="absolute inset-0 bg-slate-600/20 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No Problems Found</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Pagination */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-8 border-t border-slate-700/50 animate-fade-in">
          <div className="text-sm text-slate-400">
            Showing {((data.pagination.currentPage - 1) * 20) + 1} to{' '}
            {Math.min(data.pagination.currentPage * 20, data.pagination.totalQuestions)} of{' '}
            {data.pagination.totalQuestions} results
          </div>
          <div className="flex space-x-3">
            <button
              disabled={!data.pagination.hasPrev}
              className="px-4 py-2.5 text-sm bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700/50 hover:border-slate-600 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              Previous
            </button>
            <button
              disabled={!data.pagination.hasNext}
              className="px-4 py-2.5 text-sm bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700/50 hover:border-slate-600 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}