import { useState, useEffect } from 'react';
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
  Volume2,
  Sparkles,
  Target,
  User,
  Zap,
  Crown,
  Star,
  AlertCircle,
  ThumbsUp
} from 'lucide-react';

export default function Interview() {
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [interviewSession, setInterviewSession] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setAudioLevel(Math.floor(Math.random() * 100));
      }, 100);
    } else {
      setAudioLevel(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

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
          timeLimit: 10,
          category: 'Algorithms'
        },
        {
          id: 2,
          type: 'behavioral',
          question: 'Tell me about a time when you had to solve a complex problem under pressure.',
          difficulty: 'medium',
          timeLimit: 5,
          category: 'Behavioral'
        },
        {
          id: 3,
          type: 'coding',
          question: 'Implement a binary search algorithm with proper error handling.',
          difficulty: 'medium',
          timeLimit: 15,
          category: 'Data Structures'
        }
      ]
    };

    setInterviewSession(mockSession);
    setQuestions(mockSession.questions);
    setCurrentQuestion(mockSession.questions[0]);
    setTimeRemaining(mockSession.duration * 60); // Convert to seconds
    setCurrentQuestionIndex(0);
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
      <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Enhanced Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl">
                  <Mic className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-4">
              AI-Powered Mock Interview
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Practice your coding and behavioral interview skills with our advanced AI interviewer that provides real-time feedback
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Mic,
                title: 'Voice-Based Interview',
                description: 'Answer questions naturally using your voice with real-time speech recognition',
                color: 'from-blue-500 to-cyan-500',
                delay: 0
              },
              {
                icon: Brain,
                title: 'AI-Powered Feedback',
                description: 'Get detailed feedback on your technical and communication skills instantly',
                color: 'from-purple-500 to-pink-500',
                delay: 100
              },
              {
                icon: Clock,
                title: 'Realistic Timing',
                description: 'Practice with actual interview time constraints and pressure scenarios',
                color: 'from-amber-500 to-orange-500',
                delay: 200
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-slate-800/40 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-slate-600 hover:shadow-xl hover:scale-105 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '95%', label: 'Success Rate', icon: Target },
                { value: '2K+', label: 'Interviews', icon: User },
                { value: '4.8/5', label: 'User Rating', icon: Star },
                { value: '30s', label: 'Setup Time', icon: Zap }
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button
              onClick={startInterview}
              className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-2xl text-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center"
            >
              <Play className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
              Start Mock Interview
              <Sparkles className="h-5 w-5 ml-2 group-hover:animate-pulse" />
            </button>
            <p className="mt-4 text-slate-500 text-sm">
              No setup required • Instant AI feedback • Free trial
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Enhanced Interview Header */}
        <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 animate-fade-in-down">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
                <p className="text-slate-400 text-sm">{currentQuestion?.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-slate-700/50 px-4 py-2 rounded-xl border border-slate-600">
              <Clock className="h-5 w-5 text-purple-400" />
              <span className="text-white font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-slate-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                }}
              />
            </div>
            <span className="text-sm text-slate-400 font-medium">
              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
        </div>

        {/* Enhanced Current Question */}
        <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 animate-fade-in-up">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className={`px-4 py-2 text-sm font-semibold rounded-xl border ${
              currentQuestion?.type === 'coding'
                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            }`}>
              {currentQuestion?.type === 'coding' ? '💻 Coding' : '🗣️ Behavioral'}
            </div>
            <div className={`px-4 py-2 text-sm font-semibold rounded-xl border ${
              currentQuestion?.difficulty === 'easy'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : currentQuestion?.difficulty === 'medium'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}>
              {currentQuestion?.difficulty}
            </div>
            <div className="px-4 py-2 text-sm text-slate-400 bg-slate-700/50 rounded-xl border border-slate-600">
              ⏱️ {currentQuestion?.timeLimit} minutes
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-6 leading-relaxed">
            {currentQuestion?.question}
          </h3>

          {currentQuestion?.type === 'coding' && (
            <div className="bg-slate-700/30 p-5 rounded-xl border border-slate-600 mb-4">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <Target className="h-4 w-4 mr-2 text-blue-400" />
                Example Input/Output
              </h4>
              <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-600">
                <code className="text-sm text-slate-300 font-mono">
                  <span className="text-green-400">Input:</span> [3, 1, 4, 1, 5, 9, 2, 6]<br />
                  <span className="text-blue-400">Output:</span> 9<br />
                  <span className="text-amber-400">Explanation:</span> The maximum element is 9
                </code>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Voice Recording Interface */}
        <div className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 text-center animate-fade-in-up">
          <div className="mb-8">
            {/* Animated Voice Visualization */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></div>
              <div className={`absolute inset-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording 
                  ? 'bg-red-500 animate-pulse shadow-2xl shadow-red-500/50' 
                  : isListening 
                  ? 'bg-blue-500 shadow-2xl shadow-blue-500/50' 
                  : 'bg-slate-700 shadow-lg'
              }`}>
                {isRecording ? (
                  <div className="relative">
                    <Mic className="h-8 w-8 text-white" />
                    <div className="absolute -inset-1 bg-red-400 rounded-full animate-ping"></div>
                  </div>
                ) : isListening ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                ) : (
                  <Mic className="h-8 w-8 text-slate-300" />
                )}
              </div>
              
              {/* Audio Level Visualization */}
              {isRecording && (
                <div className="absolute inset-0 flex items-center justify-center space-x-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-green-400 rounded-full transition-all duration-100"
                      style={{
                        height: `${audioLevel * (i + 1) / 10}%`,
                        opacity: 0.3 + (i * 0.1)
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3">
              {isRecording ? '🎤 Recording Your Answer...' : 
               isListening ? '🔍 Analyzing Response...' : 
               '🎯 Ready to Answer'}
            </h3>
            
            <p className="text-slate-400 mb-2">
              {isRecording 
                ? 'Speak clearly and concisely. Click stop when finished.'
                : isListening 
                ? 'Processing your answer with AI...'
                : 'Click the microphone to start recording your response.'
              }
            </p>
            {isRecording && (
              <p className="text-sm text-green-400 animate-pulse">
                ● Live - AI is listening
              </p>
            )}
          </div>

          <div className="flex justify-center space-x-4">
            {!isRecording && !isListening && (
              <button
                onClick={startRecording}
                className="group bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-2xl font-bold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 inline-flex items-center"
              >
                <Mic className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Start Recording
                <Sparkles className="h-4 w-4 ml-2 group-hover:animate-pulse" />
              </button>
            )}

            {isRecording && (
              <button
                onClick={stopRecording}
                className="group bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 inline-flex items-center"
              >
                <Square className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Stop Recording
              </button>
            )}

            {isListening && (
              <div className="flex items-center space-x-3 text-slate-300 bg-slate-700/50 px-6 py-4 rounded-2xl border border-slate-600">
                <div className="flex space-x-1">
                  <div className="w-2 h-6 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-6 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-6 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="font-semibold">Processing with AI...</span>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced AI Response */}
        <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 animate-fade-in-up">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Brain className="h-6 w-6 mr-3 text-purple-400" />
            AI Feedback & Analysis
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-white flex items-center">
                <ThumbsUp className="h-4 w-4 mr-2 text-emerald-400" />
                Strengths
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-white">Clear problem-solving approach</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-white">Good communication skills</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-amber-400" />
                Areas for Improvement
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <XCircle className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <span className="text-sm text-white">Consider edge cases more carefully</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <XCircle className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <span className="text-sm text-white">Work on time management</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/30 p-5 rounded-xl border border-slate-600">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-white flex items-center">
                <Crown className="h-4 w-4 mr-2 text-amber-400" />
                Overall Assessment
              </h4>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                7/10
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong>Summary:</strong> Your solution demonstrates good algorithmic thinking and clear communication. 
              The approach is logical, but would benefit from considering edge cases like empty arrays or single elements. 
              Try to explain your thought process more systematically and practice time management for complex problems.
            </p>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <div className="flex justify-between animate-fade-in-up">
          <button
            onClick={() => setInterviewSession(null)}
            className="group px-6 py-3 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-300 border border-slate-700 hover:border-slate-600"
          >
            ← Exit Interview
          </button>
          
          <button
            onClick={nextQuestion}
            className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 inline-flex items-center"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Interview 🎉'}
          </button>
        </div>
      </div>
    </div>
  );
}