import { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Square, 
  Clock,
  CheckCircle,
  XCircle,
  Brain,
  Volume2
} from 'lucide-react';

export default function Interview() {
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [interviewSession, setInterviewSession] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const startInterview = async () => {
    // Simulate starting an interview session
    const mockSession = {
      id: 'interview_123',
      type: 'mock',
      duration: 30, // minutes
      questions: [
        {
          id: 1,
          type: 'coding',
          question: 'Write a function to find the maximum element in an array.',
          difficulty: 'easy',
          timeLimit: 10
        },
        {
          id: 2,
          type: 'behavioral',
          question: 'Tell me about a time when you had to solve a complex problem.',
          difficulty: 'medium',
          timeLimit: 5
        },
        {
          id: 3,
          type: 'coding',
          question: 'Implement a binary search algorithm.',
          difficulty: 'medium',
          timeLimit: 15
        }
      ]
    };

    setInterviewSession(mockSession);
    setQuestions(mockSession.questions);
    setCurrentQuestion(mockSession.questions[0]);
    setTimeRemaining(mockSession.duration * 60); // Convert to seconds
  };

  const startRecording = () => {
    setIsRecording(true);
    setIsListening(true);
    // Here you would implement actual voice recording
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsListening(false);
    // Here you would stop recording and process the audio
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
    } else {
      // Interview completed
      setInterviewSession(null);
      setCurrentQuestion(null);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!interviewSession) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            AI-Powered Mock Interview
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Practice your coding and behavioral interview skills with our AI interviewer
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <Mic className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Voice-Based</h3>
            <p className="text-muted-foreground">
              Answer questions naturally using your voice
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">AI Feedback</h3>
            <p className="text-muted-foreground">
              Get detailed feedback on your performance
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Realistic Timing</h3>
            <p className="text-muted-foreground">
              Practice with actual interview time constraints
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={startInterview}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Mock Interview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Interview Header */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-1000"
              style={{
                width: `${((questions.length - currentQuestionIndex) / questions.length) * 100}%`
              }}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {Math.round(((questions.length - currentQuestionIndex) / questions.length) * 100)}% Complete
          </span>
        </div>
      </div>

      {/* Current Question */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`px-3 py-1 text-sm font-medium rounded-full ${
            currentQuestion?.type === 'coding'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          }`}>
            {currentQuestion?.type === 'coding' ? 'Coding' : 'Behavioral'}
          </div>
          <div className={`px-3 py-1 text-sm font-medium rounded-full ${
            currentQuestion?.difficulty === 'easy'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : currentQuestion?.difficulty === 'medium'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {currentQuestion?.difficulty}
          </div>
          <div className="text-sm text-muted-foreground">
            Time Limit: {currentQuestion?.timeLimit} minutes
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-4">
          {currentQuestion?.question}
        </h3>

        {currentQuestion?.type === 'coding' && (
          <div className="bg-muted p-4 rounded-lg mb-4">
            <h4 className="font-medium text-foreground mb-2">Example:</h4>
            <pre className="text-sm text-muted-foreground">
              Input: [3, 1, 4, 1, 5, 9, 2, 6]<br />
              Output: 9
            </pre>
          </div>
        )}
      </div>

      {/* Voice Recording Interface */}
      <div className="bg-card p-6 rounded-lg border border-border text-center">
        <div className="mb-6">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
            isRecording 
              ? 'bg-red-500 animate-pulse' 
              : isListening 
              ? 'bg-blue-500' 
              : 'bg-muted'
          }`}>
            <Mic className={`h-12 w-12 ${
              isRecording || isListening ? 'text-white' : 'text-muted-foreground'
            }`} />
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {isRecording ? 'Recording...' : isListening ? 'Listening...' : 'Ready to Answer'}
          </h3>
          
          <p className="text-muted-foreground mb-6">
            {isRecording 
              ? 'Speak your answer clearly. Click stop when finished.'
              : isListening 
              ? 'Processing your response...'
              : 'Click the microphone to start recording your answer.'
            }
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          {!isRecording && !isListening && (
            <button
              onClick={startRecording}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center"
            >
              <Mic className="h-5 w-5 mr-2" />
              Start Recording
            </button>
          )}

          {isRecording && (
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors inline-flex items-center"
            >
              <Square className="h-5 w-5 mr-2" />
              Stop Recording
            </button>
          )}

          {isListening && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span>Processing...</span>
            </div>
          )}
        </div>
      </div>

      {/* AI Response */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Brain className="h-5 w-5 mr-2 text-primary" />
          AI Feedback
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-sm text-foreground">Good problem-solving approach</span>
          </div>
          <div className="flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <span className="text-sm text-foreground">Consider edge cases more carefully</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-sm text-foreground">Clear communication</span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Overall Score:</strong> 7/10<br />
            <strong>Suggestions:</strong> Your solution is on the right track, but consider handling edge cases like empty arrays or single elements. Also, try to explain your thought process more clearly.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setInterviewSession(null)}
          className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
        >
          Exit Interview
        </button>
        
        <button
          onClick={nextQuestion}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
        </button>
      </div>
    </div>
  );
}
