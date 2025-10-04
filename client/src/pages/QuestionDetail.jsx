// QuestionDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { questionService } from '../services/questionService';
import { chatService } from '../services/chatService';
import { useChat } from '../contexts/ChatContext';
import { 
  Play, 
  RotateCcw, 
  Lightbulb, 
  Bug, 
  CheckCircle,
  XCircle,
  Clock,
  Code,
  Brain,
  AlertCircle,
  Zap,
  Sparkles
} from 'lucide-react';
import Editor from '@monaco-editor/react';

export default function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openChat } = useChat();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [hints, setHints] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['question', id],
    queryFn: () => questionService.getQuestion(id),
  });

  const question = data?.question;

  useEffect(() => {
    if (question?.userSubmission?.code) {
      setCode(question.userSubmission.code);
      setLanguage(question.userSubmission.language);
    }
  }, [question]);

  const handleSubmit = async () => {
    if (!code.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await questionService.submitSolution(id, {
        code,
        language,
        timeTaken: 0,
      });

      setResult(response);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDebug = async () => {
    if (!code.trim()) return;

    try {
      const response = await questionService.getDebugHelp(id, {
        code,
        language,
        errorMessage: result?.message || 'Code execution failed',
        testCase: 'Sample test case',
      });

      openChat(`Debug Help:\n\n${response.debugHelp}`);
    } catch (error) {
      console.error('Debug error:', error);
    }
  };

  const handleGetHints = async () => {
    if (!question) return;

    try {
      const response = await questionService.getHints(
        question.description,
        code,
        question.difficulty
      );

      setHints([response.hints]);
      setShowHints(true);
    } catch (error) {
      console.error('Hints error:', error);
    }
  };

  const handleExplainAlgorithm = async () => {
    if (!code.trim()) return;

    try {
      const response = await questionService.explainAlgorithm(
        'Solution Algorithm',
        code,
        language
      );

      openChat(`Algorithm Explanation:\n\n${response.explanation}`);
    } catch (error) {
      console.error('Explanation error:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400 bg-green-900/30 border-green-500/50';
      case 'medium':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
      case 'hard':
        return 'text-red-400 bg-red-900/30 border-red-500/50';
      default:
        return 'text-gray-400 bg-gray-900/30 border-gray-500/50';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Question Not Found</h3>
          <p className="text-gray-300 mb-6">The question you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/questions')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            Back to Questions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
      <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Problem Description */}
        <div className="space-y-6">
          <div className="bg-gray-800/40 p-8 rounded-2xl border border-gray-700 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white">{question.title}</h1>
              <div className="flex items-center space-x-3">
                {question.isSolved && (
                  <CheckCircle className="h-7 w-7 text-green-400 animate-pulse" />
                )}
                <span
                  className={`px-4 py-2 text-sm font-bold rounded-full border ${getDifficultyColor(question.difficulty)}`}
                >
                  {question.difficulty}
                </span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-gray-300 text-lg">
              <div dangerouslySetInnerHTML={{ __html: question.description }} />
            </div>

            {question.examples && question.examples.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
                  Examples
                </h3>
                {question.examples.map((example, index) => (
                  <div key={index} className="bg-gray-700/50 p-6 rounded-xl mb-4 border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-300 mb-2">Input:</p>
                        <pre className="text-sm text-gray-200 bg-gray-900/80 p-4 rounded-lg border border-gray-600">
                          {example.input}
                        </pre>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-300 mb-2">Output:</p>
                        <pre className="text-sm text-gray-200 bg-gray-900/80 p-4 rounded-lg border border-gray-600">
                          {example.output}
                        </pre>
                      </div>
                    </div>
                    {example.explanation && (
                      <p className="text-sm text-gray-400 mt-3">
                        <strong className="text-purple-400">Explanation:</strong> {example.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {question.constraints && question.constraints.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                  Constraints
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {question.constraints.map((constraint, index) => (
                    <li key={index} className="text-lg">{constraint}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {question.topics?.map((topic) => (
                <span
                  key={topic}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-purple-900/50 to-pink-900/50 text-purple-300 rounded-full border border-purple-500/30"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Hints */}
          {showHints && hints.length > 0 && (
            <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 p-6 rounded-2xl border border-yellow-500/30 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Lightbulb className="h-6 w-6 mr-3 text-yellow-400 animate-pulse" />
                Hints
              </h3>
              <div className="space-y-3">
                {hints.map((hint, index) => (
                  <p key={index} className="text-gray-200 text-lg">
                    {hint}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Code Editor */}
        <div className="space-y-6">
          <div className="bg-gray-800/40 rounded-2xl border border-gray-700 overflow-hidden backdrop-blur-sm shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
              <div className="flex items-center space-x-4">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-600 rounded-lg bg-gray-900/80 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleGetHints}
                  className="p-3 text-gray-400 hover:text-yellow-400 hover:bg-yellow-900/20 rounded-xl transition-all duration-300"
                  title="Get Hints"
                >
                  <Lightbulb className="h-5 w-5" />
                </button>
                <button
                  onClick={handleDebug}
                  className="p-3 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-xl transition-all duration-300"
                  title="Debug Help"
                >
                  <Bug className="h-5 w-5" />
                </button>
                <button
                  onClick={handleExplainAlgorithm}
                  className="p-3 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-xl transition-all duration-300"
                  title="Explain Algorithm"
                >
                  <Brain className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="h-96">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={setCode}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  fontFamily: 'Fira Code, monospace',
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCode('')}
                className="flex items-center px-6 py-3 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-300 border border-gray-600"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset
              </button>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!code.trim() || isSubmitting}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
              ) : (
                <Play className="h-5 w-5 mr-3" />
              )}
              {isSubmitting ? 'Running...' : 'Run Code'}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
              result.isCorrect 
                ? 'bg-green-900/20 border-green-500/30' 
                : 'bg-red-900/20 border-red-500/30'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                {result.isCorrect ? (
                  <CheckCircle className="h-7 w-7 text-green-400 animate-pulse" />
                ) : (
                  <XCircle className="h-7 w-7 text-red-400 animate-pulse" />
                )}
                <h3 className="text-xl font-bold text-white">
                  {result.isCorrect ? 'Accepted!' : 'Wrong Answer'}
                </h3>
              </div>
              
              <p className="text-gray-300 text-lg mb-3">
                {result.message}
              </p>
              
              {result.attempts && (
                <p className="text-gray-400">
                  Attempts: <span className="text-purple-400 font-semibold">{result.attempts}</span>
                </p>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <Clock className="h-7 w-7 text-purple-400 mx-auto mb-3" />
              <div className="text-sm text-gray-400">Avg Time</div>
              <div className="text-xl font-bold text-white">
                {question.averageTime || 0} min
              </div>
            </div>
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <Code className="h-7 w-7 text-blue-400 mx-auto mb-3" />
              <div className="text-sm text-gray-400">Acceptance</div>
              <div className="text-xl font-bold text-white">
                {question.acceptanceRate || 0}%
              </div>
            </div>
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CheckCircle className="h-7 w-7 text-green-400 mx-auto mb-3" />
              <div className="text-sm text-gray-400">Solved</div>
              <div className="text-xl font-bold text-white">
                {question.isSolved ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}