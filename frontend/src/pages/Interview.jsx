import { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  Clock,
  Brain,
  Sparkles,
  Target,
  Loader2,
  AlertCircle,
  MessageCircle
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [aiFeedback, setAiFeedback] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const questionStartTimeRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Initialize question timer when question changes
  useEffect(() => {
    questionStartTimeRef.current = Date.now();
  }, [currentQuestionIndex]);

  // Timer effect
  useEffect(() => {
    if (interviewSession && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [interviewSession, timeRemaining]);

  // Audio visualization effect
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

  const startInterview = async (type = 'mock', duration = 30, topics = []) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/interview/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ type, duration, topics })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to start interview');
      }
      
      const data = await response.json();
      
      setInterviewSession(data.interview);
      setQuestions(data.interview.questions);
      setCurrentQuestion(data.interview.questions[0]);
      setTimeRemaining(data.interview.duration * 60);
      setCurrentQuestionIndex(0);
      setUserAnswer('');
      setAiFeedback(null);
      questionStartTimeRef.current = Date.now();

      // Start the interview session
      const startResponse = await fetch(`${API_BASE_URL}/interview/${data.interview.sessionId}/start`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!startResponse.ok) {
        throw new Error('Failed to start interview session');
      }

    } catch (err) {
      setError(err.message);
      console.error('Start interview error:', err);
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone not supported in this browser');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000
        } 
      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudioResponse(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(500); // Collect data every milisecond
      setIsRecording(true);
      setIsListening(false);
      
    } catch (err) {
      setError('Microphone access denied or not available. Please allow microphone permissions.');
      console.error('Recording error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsListening(true);
    }
  };

const processAudioResponse = async (audioBlob) => {
  try {
    setIsListening(true);

    const formData = new FormData();
    formData.append('audio', audioBlob, 'response.webm');

    const response = await fetch(`${API_BASE_URL}/interview/speech-to-text`, {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to process audio');
    }

    const data = await response.json();
    const transcript = data.text;

    setUserAnswer(transcript);
    submitAnswer(transcript);
  } catch (err) {
    setError('Failed to process audio response');
    console.error('Audio processing error:', err);
  } finally {
    setIsListening(false);
  }
};


  const submitAnswer = async (answerText = null) => {
    try {
      const questionIndex = currentQuestionIndex;
      
      console.log('=== SUBMIT ANSWER DEBUG ===');
      console.log('Question index:', questionIndex);
      console.log('Questions array:', questions);
      console.log('Questions length:', questions.length);
      
      // Validate everything
      if (!questions || questions.length === 0) {
        throw new Error('No questions loaded');
      }
      
      if (questionIndex === undefined || questionIndex === null) {
        throw new Error('No current question selected');
      }
      
      if (questionIndex < 0 || questionIndex >= questions.length) {
        throw new Error(`Invalid question index: ${questionIndex}. Available: 0-${questions.length - 1}`);
      }
      
      const currentQuestion = questions[questionIndex];
      
      if (!currentQuestion) {
        throw new Error(`Question not found at index ${questionIndex}`);
      }
      
      // Use provided answer text or current user answer
      const finalAnswer = answerText || userAnswer || '';
      
      // Calculate time spent safely
      const timeSpent = questionStartTimeRef.current ? 
        Math.floor((Date.now() - questionStartTimeRef.current) / 1000) : 0;
      
      const answerData = {
        questionIndex: questionIndex,
        answer: finalAnswer,
        timeSpent: timeSpent,
        hintsUsed: currentQuestion.hintsUsed || 0
      };
      
      console.log('Submitting answer data:', answerData);
      
      // Validate answer is not empty
      if (!answerData.answer.trim()) {
        alert('Please write some code or answer before submitting.');
        return;
      }
      
      // Make the API call
      const response = await fetch(`${API_BASE_URL}/interview/${interviewSession.sessionId}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(answerData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      console.log('✅ Answer submitted successfully:', data);
      
      // Set AI feedback
      setAiFeedback({
        score: data.question?.score || 7,
        feedback: data.question?.feedback || 'Your answer has been submitted successfully.'
      });
      
      setIsListening(false);
      return data;
      
    } catch (error) {
      console.error('❌ Error submitting answer:', error);
      setError(`Error submitting answer: ${error.message}`);
      setIsListening(false);
      throw error;
    }
  };

  const getAIHints = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/hints`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          problemDescription: currentQuestion?.question,
          userApproach: userAnswer,
          difficulty: currentQuestion?.difficulty || 'medium',
        })
      });

      if (!response.ok) throw new Error('Failed to get hints');
      const data = await response.json();
      
      // Add hint to chat history
      setChatHistory(prev => [...prev, 
        { type: 'user', message: "Can you give me a hint for this problem?" },
        { type: 'assistant', message: data.hints }
      ]);
      setShowChat(true);
      
    } catch (err) {
      setError('Failed to get AI hints');
    }
  };

  const sendChatMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMessage = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);

    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: userMessage,
          context: `Current interview question: ${currentQuestion?.question}. User's answer so far: ${userAnswer}`
        })
      });

      if (!response.ok) throw new Error('Failed to send message');
      const data = await response.json();
      
      setChatHistory(prev => [...prev, { type: 'assistant', message: data.response }]);
    } catch (err) {
      setError('Failed to send chat message');
    }
  };

  const analyzeCodeComplexity = async (code, language) => {
    try {
      const response = await fetch(`${API_BASE_URL}/interview/analyze-complexity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ code, language })
      });

      if (!response.ok) throw new Error('Failed to analyze complexity');
      const data = await response.json();
      
      setChatHistory(prev => [...prev, 
        { type: 'user', message: `Can you analyze the complexity of this ${language} code?` },
        { type: 'assistant', message: data.analysis }
      ]);
      setShowChat(true);
      
    } catch (err) {
      setError('Failed to analyze code complexity');
    }
  };

  const handleAutoSubmit = () => {
    if (userAnswer) {
      submitAnswer(userAnswer);
    } else {
      // Auto-submit empty answer when time runs out
      submitAnswer("No answer provided - time expired");
    }
  };

  const nextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
      setUserAnswer('');
      setAiFeedback(null);
      setChatHistory([]);
      questionStartTimeRef.current = Date.now();
    } else {
      await completeInterview();
    }
  };

  // In your Interview.jsx file - update the completeInterview function
const completeInterview = async () => {
  try {
    console.log('Completing interview for session:', interviewSession.sessionId);
    
    const response = await fetch(`${API_BASE_URL}/interview/${interviewSession.sessionId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to complete interview: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log('Interview completed successfully:', data);
    
    setInterviewSession(null);
    setCurrentQuestion(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    
    alert(`🎉 Interview completed! Your score: ${data.interview.overallScore}/100\n\n${data.interview.feedback}`);

  } catch (err) {
    console.error('Error completing interview:', err);
    setError(`Failed to complete interview: ${err.message}`);
  }
};

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Starting interview session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-white text-lg mb-4">{error}</p>
          <button
            onClick={() => setError(null)}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!interviewSession) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto space-y-12">
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
              Practice with realistic AI interviews featuring voice responses, instant feedback, and personalized guidance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                type: 'mock',
                title: 'Full Mock Interview',
                description: 'Complete interview simulation with mixed questions',
                duration: 45,
                color: 'from-purple-500 to-pink-500',
                questions: 5
              },
              {
                type: 'coding',
                title: 'Coding Focus',
                description: 'Algorithm and data structure problems',
                duration: 30,
                color: 'from-blue-500 to-cyan-500',
                questions: 3
              },
              {
                type: 'behavioral',
                title: 'Behavioral',
                description: 'Soft skills and scenario-based questions',
                duration: 20,
                color: 'from-emerald-500 to-green-500',
                questions: 3
              }
            ].map((interviewType) => (
              <div
                key={interviewType.type}
                className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-slate-600 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={() => startInterview(interviewType.type, interviewType.duration)}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${interviewType.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Mic className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{interviewType.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{interviewType.description}</p>
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>⏱️ {interviewType.duration} min</span>
                  <span>❓ {interviewType.questions} questions</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Features</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  '🎤 Voice Response Analysis',
                  '🧠 Real-time AI Feedback',
                  '💡 Smart Hints & Guidance',
                  '⚡ Complexity Analysis',
                  '📊 Performance Analytics',
                  '🎯 Personalized Questions'
                ].map((feature, index) => (
                  <div key={index} className="text-slate-300 flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Interview Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interview Header */}
            <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
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

            {/* Current Question */}
            <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
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

              {currentQuestion?.examples && (
                <div className="bg-slate-700/30 p-5 rounded-xl border border-slate-600 mb-4">
                  <h4 className="font-semibold text-white mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2 text-blue-400" />
                    Example Input/Output
                  </h4>
                  <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-600">
                    <code className="text-sm text-slate-300 font-mono whitespace-pre-wrap">
                      {currentQuestion.examples}
                    </code>
                  </div>
                </div>
              )}

              {/* AI Assistance Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={getAIHints}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-colors"
                >
                  <Brain className="h-4 w-4" />
                  <span>Get Hint</span>
                </button>
                
                {currentQuestion?.type === 'coding' && (
                  <button
                    onClick={() => analyzeCodeComplexity(userAnswer, 'javascript')}
                    disabled={!userAnswer.trim()}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-xl hover:bg-purple-500/30 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Analyze Complexity</span>
                  </button>
                )}
              </div>
            </div>

            {/* Voice Recording Interface */}
            <div className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 text-center">
              <div className="mb-8">
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
                      <Loader2 className="h-8 w-8 text-white animate-spin" />
                    ) : (
                      <Mic className="h-8 w-8 text-slate-300" />
                    )}
                  </div>
                  
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
                    disabled={isListening}
                    className="group bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-2xl font-bold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 inline-flex items-center disabled:opacity-50"
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

              {/* Text Answer Fallback */}
              {!isRecording && !isListening && (
                <div className="mt-6">
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Or type your answer here... You can also paste code for analysis."
                    className="w-full h-32 bg-slate-700/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 resize-none"
                  />
                  <button
                    onClick={() => submitAnswer()}
                    disabled={!userAnswer.trim()}
                    className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Text Answer
                  </button>
                </div>
              )}
            </div>

            {/* AI Feedback */}
            {aiFeedback && (
              <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 animate-fade-in-up">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Brain className="h-6 w-6 mr-3 text-purple-400" />
                  AI Feedback & Analysis
                </h3>
                
                <div className="bg-slate-700/30 p-5 rounded-xl border border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-amber-400" />
                      Overall Assessment
                    </h4>
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {aiFeedback.score}/10
                    </div>
                  </div>
                  <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {aiFeedback.feedback}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to exit the interview? Your progress will be lost.')) {
                    setInterviewSession(null);
                    setCurrentQuestion(null);
                  }
                }}
                className="group px-6 py-3 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-300 border border-slate-700 hover:border-slate-600"
              >
                ← Exit Interview
              </button>
              
              {aiFeedback && (
                <button
                  onClick={nextQuestion}
                  className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 inline-flex items-center"
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Interview 🎉'}
                </button>
              )}
            </div>
          </div>

          {/* AI Chat Sidebar */}
          <div className={`lg:col-span-1 ${showChat ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700 h-full flex flex-col">
              <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-purple-400" />
                  AI Assistant
                </h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="lg:hidden text-slate-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto max-h-96">
                {chatHistory.length === 0 ? (
                  <div className="text-center text-slate-400 mt-8">
                    <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Ask me for hints, explanations, or code reviews!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chatHistory.map((msg, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-xl ${
                          msg.type === 'user' 
                            ? 'bg-blue-500/20 border border-blue-500/30 ml-8' 
                            : 'bg-slate-700/50 border border-slate-600 mr-8'
                        }`}
                      >
                        <div className="text-sm text-slate-300 whitespace-pre-wrap">
                          {msg.message}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-slate-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder="Ask for help..."
                    className="flex-1 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={sendChatMessage}
                    disabled={!chatMessage.trim()}
                    className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Toggle Button for Mobile */}
          {!showChat && (
            <button
              onClick={() => setShowChat(true)}
              className="lg:hidden fixed bottom-6 right-6 bg-purple-500 text-white p-4 rounded-full shadow-2xl hover:bg-purple-600 transition-colors z-50"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}