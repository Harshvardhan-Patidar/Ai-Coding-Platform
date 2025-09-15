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
  AlertCircle
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
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900';
    }
  };

  const getStatusIcon = (isSolved) => {
    if (isSolved) {
      return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
    }
    return <Circle className="h-5 w-5 text-muted-foreground" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Questions</h3>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Coding Problems</h1>
          <p className="text-muted-foreground">
            Practice with {data?.pagination?.totalQuestions || 0} coding problems
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground bg-background hover:bg-accent"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search problems..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-card p-4 rounded-lg border border-border space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Difficulty
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Topic
                </label>
                <select
                  value={filters.topic}
                  onChange={(e) => handleFilterChange('topic', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Topics</option>
                  {filterOptions?.topics?.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Company
                </label>
                <select
                  value={filters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Companies</option>
                  {filterOptions?.companies?.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Sort By
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="difficulty">Difficulty</option>
                  <option value="acceptance">Acceptance Rate</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {data?.questions?.length > 0 ? (
          data.questions.map((question) => (
            <Link
              key={question._id}
              to={`/questions/${question._id}`}
              className="block bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(question.isSolved)}
                    <h3 className="text-lg font-semibold text-foreground">
                      {question.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                        question.difficulty
                      )}`}
                    >
                      {question.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-3 line-clamp-2">
                    {question.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {question.topics?.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                      >
                        {topic}
                      </span>
                    ))}
                    {question.topics?.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                        +{question.topics.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{question.averageTime || 0} min avg</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Code className="h-4 w-4" />
                      <span>{question.acceptanceRate || 0}% acceptance</span>
                    </div>
                    {question.companies?.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <span>Companies: {question.companies.slice(0, 2).join(', ')}</span>
                        {question.companies.length > 2 && (
                          <span>+{question.companies.length - 2} more</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-12">
            <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Problems Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((data.pagination.currentPage - 1) * 20) + 1} to{' '}
            {Math.min(data.pagination.currentPage * 20, data.pagination.totalQuestions)} of{' '}
            {data.pagination.totalQuestions} results
          </div>
          <div className="flex space-x-2">
            <button
              disabled={!data.pagination.hasPrev}
              className="px-3 py-2 text-sm border border-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
            >
              Previous
            </button>
            <button
              disabled={!data.pagination.hasNext}
              className="px-3 py-2 text-sm border border-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
