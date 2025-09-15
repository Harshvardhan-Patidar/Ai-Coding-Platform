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
  AlertCircle
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
        timeTaken: 0, // This would be calculated based on actual time
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Question Not Found</h3>
        <p className="text-muted-foreground mb-4">The question you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/questions')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Back to Questions
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Problem Description */}
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">{question.title}</h1>
            <div className="flex items-center space-x-2">
              {question.isSolved && (
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              )}
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  question.difficulty === 'easy'
                    ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900'
                    : question.difficulty === 'medium'
                    ? 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900'
                    : 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900'
                }`}
              >
                {question.difficulty}
              </span>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-foreground">
            <div dangerouslySetInnerHTML={{ __html: question.description }} />
          </div>

          {question.examples && question.examples.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Examples</h3>
              {question.examples.map((example, index) => (
                <div key={index} className="bg-muted p-4 rounded-lg mb-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Input:</p>
                      <pre className="text-sm text-muted-foreground bg-background p-2 rounded">
                        {example.input}
                      </pre>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Output:</p>
                      <pre className="text-sm text-muted-foreground bg-background p-2 rounded">
                        {example.output}
                      </pre>
                    </div>
                  </div>
                  {example.explanation && (
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Explanation:</strong> {example.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {question.constraints && question.constraints.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Constraints</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {question.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {question.topics?.map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Hints */}
        {showHints && hints.length > 0 && (
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
              Hints
            </h3>
            <div className="space-y-2">
              {hints.map((hint, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  {hint}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Code Editor */}
      <div className="space-y-6">
        <div className="bg-card rounded-lg border border-border">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1 text-sm border border-border rounded bg-background text-foreground"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleGetHints}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded"
                title="Get Hints"
              >
                <Lightbulb className="h-4 w-4" />
              </button>
              <button
                onClick={handleDebug}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded"
                title="Debug Help"
              >
                <Bug className="h-4 w-4" />
              </button>
              <button
                onClick={handleExplainAlgorithm}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded"
                title="Explain Algorithm"
              >
                <Brain className="h-4 w-4" />
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
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCode('')}
              className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </button>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!code.trim() || isSubmitting}
            className="flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            {isSubmitting ? 'Running...' : 'Run Code'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center space-x-2 mb-3">
              {result.isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              )}
              <h3 className="font-semibold text-foreground">
                {result.isCorrect ? 'Accepted!' : 'Wrong Answer'}
              </h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              {result.message}
            </p>
            
            {result.attempts && (
              <p className="text-xs text-muted-foreground">
                Attempts: {result.attempts}
              </p>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card p-4 rounded-lg border border-border text-center">
            <Clock className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">Avg Time</div>
            <div className="font-semibold text-foreground">
              {question.averageTime || 0} min
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border text-center">
            <Code className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">Acceptance</div>
            <div className="font-semibold text-foreground">
              {question.acceptanceRate || 0}%
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border text-center">
            <CheckCircle className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">Solved</div>
            <div className="font-semibold text-foreground">
              {question.isSolved ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
