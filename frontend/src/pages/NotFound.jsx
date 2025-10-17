import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Home, ArrowLeft, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Theme-based styles
  const backgroundStyles = theme === 'dark' 
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textMuted = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${backgroundStyles}`}>
      <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="mb-12">
          <div className="relative">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <div className="absolute -top-4 -right-4">
              <Star className="h-8 w-8 text-yellow-400 animate-spin" />
            </div>
          </div>
          <h2 className={`text-3xl font-semibold ${textColor} mb-6`}>Page Not Found</h2>
          <p className={`${textMuted} mb-8 max-w-md text-lg`}>
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or doesn't exist.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <Home className="h-5 w-5 mr-3" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className={`inline-flex items-center px-8 py-4 border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} ${textMuted} rounded-2xl ${theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100/50'} transition-all duration-300 transform hover:scale-105 backdrop-blur-sm`}
          >
            <ArrowLeft className="h-5 w-5 mr-3" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}