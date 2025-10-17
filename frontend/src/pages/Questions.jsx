import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '../contexts/ThemeContext';
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
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme-based styles
  const backgroundStyles = theme === 'dark' 
    ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';

  const cardBackground = theme === 'dark'
    ? 'bg-slate-800/40 backdrop-blur-sm border border-slate-700'
    : 'bg-white/80 backdrop-blur-sm border border-slate-200';

  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textMuted = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';
  const hoverBackground = theme === 'dark' ? 'hover:bg-slate-700/50' : 'hover:bg-slate-100';

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
    return <Circle className={`h-5 w-5 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`} />;
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-[60vh] ${backgroundStyles}`}>
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto"></div>
            <Sparkles className="h-6 w-6 text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className={`mt-4 ${textMuted} animate-pulse`}>Loading problems...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 animate-fade-in ${backgroundStyles}`}>
        <div className="relative inline-block">
          <AlertCircle className="h-16 w-16 text-rose-400 mx-auto mb-4 animate-bounce" />
          <div className="absolute inset-0 bg-rose-400/20 rounded-full animate-ping"></div>
        </div>
        <h3 className={`text-xl font-bold ${textColor} mb-2`}>Error Loading Questions</h3>
        <p className={textMuted}>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300 ${backgroundStyles} ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Coding Problems
          </h1>
          <p className={`${textMuted} mt-2 flex items-center`}>
            <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
            Practice with {data?.pagination?.totalQuestions || 0} carefully curated problems
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center px-4 py-2.5 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/60'} border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} rounded-xl text-sm font-medium ${textColor} backdrop-blur-sm ${hoverBackground} ${theme === 'dark' ? 'hover:border-slate-600' : 'hover:border-slate-400'} transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
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
              className={`w-full pl-12 pr-6 py-4 ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-white/60'} border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} rounded-2xl ${textColor} placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300`}
            />
          </div>
        </div>

        {/* Enhanced Filter Panel */}
        {showFilters && (
          <div className={`${cardBackground} p-6 rounded-2xl space-y-6 animate-slide-down`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${textColor}`}>
                  Difficulty
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/60'} border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300 ${theme === 'dark' ? 'hover:border-slate-600' : 'hover:border-slate-400'}`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>All Difficulties</option>
                  <option value="easy" className={theme === 'dark' ? 'bg-slate-800 text-emerald-400' : 'bg-white text-emerald-600'}>Easy</option>
                  <option value="medium" className={theme === 'dark' ? 'bg-slate-800 text-amber-400' : 'bg-white text-amber-600'}>Medium</option>
                  <option value="hard" className={theme === 'dark' ? 'bg-slate-800 text-rose-400' : 'bg-white text-rose-600'}>Hard</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${textColor}`}>
                  Topic
                </label>
                <select
                  value={filters.topic}
                  onChange={(e) => handleFilterChange('topic', e.target.value)}
                  className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/60'} border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300 ${theme === 'dark' ? 'hover:border-slate-600' : 'hover:border-slate-400'}`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>All Topics</option>
                  {filterOptions?.topics?.map((topic) => (
                    <option key={topic} value={topic} className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${textColor}`}>
                  Company
                </label>
                <select
                  value={filters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                  className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/60'} border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300 ${theme === 'dark' ? 'hover:border-slate-600' : 'hover:border-slate-400'}`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>All Companies</option>
                  {filterOptions?.companies?.map((company) => (
                    <option key={company} value={company} className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${textColor}`}>
                  Sort By
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/60'} border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} rounded-xl ${textColor} focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300 ${theme === 'dark' ? 'hover:border-slate-600' : 'hover:border-slate-400'}`}
                >
                  <option value="newest" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>Newest First</option>
                  <option value="oldest" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>Oldest First</option>
                  <option value="difficulty" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>Difficulty</option>
                  <option value="acceptance" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>Acceptance Rate</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className={`px-6 py-2.5 text-sm ${textMuted} hover:${textColor} ${hoverBackground} rounded-xl transition-all duration-300 hover:scale-105`}
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
              className={`block ${cardBackground} p-6 rounded-2xl ${theme === 'dark' ? 'hover:border-slate-600' : 'hover:border-slate-300'} hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getStatusIcon(question.isSolved)}
                    <h3 className={`text-xl font-semibold ${textColor} group-hover:${theme === 'dark' ? 'text-white' : 'text-slate-900'} transition-colors`}>
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
                  
                  <p className={`${textMuted} mb-4 line-clamp-2 group-hover:${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} transition-colors`}>
                    {question.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {question.topics?.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className={`px-3 py-1.5 text-xs ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-100/50'} ${textMuted} rounded-lg backdrop-blur-sm ${theme === 'dark' ? 'hover:bg-slate-600/50' : 'hover:bg-slate-200/50'} transition-all duration-300`}
                      >
                        {topic}
                      </span>
                    ))}
                    {question.topics?.length > 3 && (
                      <span className={`px-3 py-1.5 text-xs ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-100/50'} ${textMuted} rounded-lg backdrop-blur-sm`}>
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
              <Code className={`h-16 w-16 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'} mx-auto`} />
              <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-slate-600/20' : 'bg-slate-400/20'} rounded-full animate-ping`}></div>
            </div>
            <h3 className={`text-xl font-semibold ${textColor} mb-2`}>No Problems Found</h3>
            <p className={`${textMuted} max-w-md mx-auto`}>
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Pagination */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className={`flex items-center justify-between pt-8 border-t ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-300/50'} animate-fade-in`}>
          <div className={`text-sm ${textMuted}`}>
            Showing {((data.pagination.currentPage - 1) * 20) + 1} to{' '}
            {Math.min(data.pagination.currentPage * 20, data.pagination.totalQuestions)} of{' '}
            {data.pagination.totalQuestions} results
          </div>
          <div className="flex space-x-3">
            <button
              disabled={!data.pagination.hasPrev}
              className={`px-4 py-2.5 text-sm ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/60'} border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} rounded-xl ${textColor} disabled:opacity-30 disabled:cursor-not-allowed ${hoverBackground} ${theme === 'dark' ? 'hover:border-slate-600' : 'hover:border-slate-400'} hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
            >
              Previous
            </button>
            <button
              disabled={!data.pagination.hasNext}
              className={`px-4 py-2.5 text-sm ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/60'} border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} rounded-xl ${textColor} disabled:opacity-30 disabled:cursor-not-allowed ${hoverBackground} ${theme === 'dark' ? 'hover:border-slate-600' : 'hover:border-slate-400'} hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}