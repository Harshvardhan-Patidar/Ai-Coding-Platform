import { useState, useRef, useEffect } from 'react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Loader2,
  Sparkles,
  Zap
} from 'lucide-react';

export default function ChatWidget() {
  const { 
    isOpen, 
    messages, 
    isLoading, 
    sendMessage, 
    toggleChat, 
    closeChat 
  } = useChat();
  const { isAuthenticated } = useAuth();
  const [inputMessage, setInputMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      sendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Enhanced Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className={`fixed bottom-8 right-8 h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-500 transform hover:scale-110 z-50 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <div className="relative">
            <MessageCircle className="h-7 w-7 mx-auto" />
            <div className="absolute -top-1 -right-1">
              <div className="h-3 w-3 bg-green-400 rounded-full animate-ping"></div>
              <div className="h-3 w-3 bg-green-400 rounded-full absolute top-0 right-0"></div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse opacity-20"></div>
        </button>
      )}

      {/* Enhanced Chat Panel */}
      {isOpen && (
        <div className={`fixed bottom-8 right-8 w-96 h-[500px] bg-gray-800/90 backdrop-blur-lg border border-purple-500/30 rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-500 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-6 border-b border-purple-500/30 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-gray-800"></div>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">AI Assistant</h3>
                <p className="text-xs text-purple-300 flex items-center">
                  <Zap className="h-3 w-3 mr-1" />
                  Ready to help
                </p>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Enhanced Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-900/50 to-gray-800/30">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <div className="relative mb-4">
                  <div className="h-16 w-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="h-8 w-8 text-purple-400" />
                  </div>
                  <div className="absolute top-0 right-0">
                    <div className="h-4 w-4 bg-purple-500 rounded-full animate-ping"></div>
                  </div>
                </div>
                <p className="text-lg font-semibold text-white mb-2">Hello! I'm your AI Assistant</p>
                <p className="text-sm">Ask me anything about coding, algorithms, or debugging!</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} transition-all duration-500 ${
                    index === messages.length - 1 ? 'animate-fade-in' : ''
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 backdrop-blur-sm border transition-all duration-300 transform hover:scale-[1.02] ${
                      message.type === 'user'
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-400/30 shadow-lg'
                        : message.isError
                        ? 'bg-gradient-to-br from-red-500/20 to-red-600/20 text-red-200 border-red-500/30'
                        : 'bg-gradient-to-br from-gray-700/80 to-gray-600/80 text-gray-200 border-gray-600/50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {message.type === 'ai' && !message.isError && (
                        <div className="h-6 w-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                      )}
                      {message.type === 'user' && (
                        <div className="h-6 w-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2 flex items-center">
                          <span>{new Date(message.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-gray-700/80 to-gray-600/80 text-gray-200 rounded-2xl px-4 py-3 border border-gray-600/50 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <div className="h-6 w-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area */}
          <form onSubmit={handleSubmit} className="p-6 border-t border-purple-500/30 bg-gray-900/50 rounded-b-2xl">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about coding..."
                  className="w-full px-4 py-3 text-sm bg-gray-800/80 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 pr-12 backdrop-blur-sm transition-all duration-300"
                  disabled={isLoading}
                />
                {!inputMessage && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className={`px-4 py-3 rounded-xl transition-all duration-300 transform ${
                  !inputMessage.trim() || isLoading
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg'
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              Press Enter to send • AI-powered assistance
            </p>
          </form>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </>
  );
}