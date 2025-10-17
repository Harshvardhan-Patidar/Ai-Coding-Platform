import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Menu, 
  X, 
  Home, 
  Code, 
  Mic, 
  Trophy, 
  User, 
  LogOut, 
  Sun, 
  Moon,
  Settings,
  Sparkles,
  Zap,
  Brain,
  Crown
} from 'lucide-react';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, color: 'from-blue-500 to-cyan-500' },
    { name: 'Questions', href: '/questions', icon: Code, color: 'from-purple-500 to-pink-500' },
    { name: 'Interview', href: '/interview', icon: Mic, color: 'from-green-500 to-emerald-500' },
    { name: 'Contest', href: '/contest', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
    { name: 'Leaderboard', href: '/leaderboard', icon: Crown, color: 'from-red-500 to-pink-500' },
  ];

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
  };

  const isActive = (href) => location.pathname === href;

  // Theme-based background styles
  const backgroundStyles = theme === 'dark' 
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';

  const sidebarBackground = theme === 'dark'
    ? 'bg-gray-800/90 backdrop-blur-lg border-r border-purple-500/30'
    : 'bg-white/90 backdrop-blur-lg border-r border-purple-200';

  const topbarBackground = theme === 'dark'
    ? 'bg-gray-800/80 backdrop-blur-lg border-b border-purple-500/30'
    : 'bg-white/80 backdrop-blur-lg border-b border-purple-200';

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textMuted = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const hoverBackground = theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${backgroundStyles}`}>
      {/* Mobile sidebar overlay */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
          sidebarOpen 
            ? 'bg-black/60 backdrop-blur-sm' 
            : 'bg-black/0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        {/* Mobile sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 w-80 ${sidebarBackground} transform transition-all duration-500 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className={`flex h-20 items-center justify-between px-6 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-b border-purple-500/30' 
                : 'bg-gradient-to-r from-purple-100 to-pink-100 border-b border-purple-200'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h1 className={`text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>
                  CodeMaster AI
                </h1>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`p-2 ${textMuted} ${hoverBackground} rounded-xl transition-all duration-300`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-4 py-6">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-4 py-4 text-sm font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      active
                        ? `bg-gradient-to-r ${item.color} text-white shadow-2xl`
                        : `${textColor} ${hoverBackground}`
                    }`}
                  >
                    <div className={`p-2 rounded-xl mr-4 ${
                      active ? 'bg-white/20' : theme === 'dark' ? 'bg-gray-700/50 group-hover:bg-gray-600/50' : 'bg-gray-200/50 group-hover:bg-gray-300/50'
                    }`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    {item.name}
                    {active && (
                      <div className="ml-auto">
                        <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* User section */}
            <div className={`border-t ${
              theme === 'dark' ? 'border-purple-500/30' : 'border-purple-200'
            } p-6 ${
              theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50/50'
            }`}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${textColor} truncate`}>
                    {user?.username}
                  </p>
                  <p className={`text-xs ${textMuted} truncate`}>
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm ${textMuted} hover:${textColor} ${hoverBackground} rounded-xl transition-all duration-300`}
                >
                  <User className="mr-3 h-4 w-4" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className={`flex w-full items-center px-4 py-3 text-sm ${textMuted} hover:text-white hover:bg-red-500/20 rounded-xl transition-all duration-300`}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-80 lg:flex-col">
        <div className={`flex flex-col flex-grow ${sidebarBackground}`}>
          {/* Header */}
          <div className={`flex h-20 items-center px-6 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-b border-purple-500/30'
              : 'bg-gradient-to-r from-purple-100 to-pink-100 border-b border-purple-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  CodeMaster AI
                </h1>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
                } flex items-center`}>
                  <Zap className="h-3 w-3 mr-1" />
                  AI-Powered Learning
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-4 py-4 text-sm font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    active
                      ? `bg-gradient-to-r ${item.color} text-white shadow-2xl`
                      : `${textColor} ${hoverBackground}`
                  }`}
                >
                  <div className={`p-2 rounded-xl mr-4 ${
                    active ? 'bg-white/20' : theme === 'dark' ? 'bg-gray-700/50 group-hover:bg-gray-600/50' : 'bg-gray-200/50 group-hover:bg-gray-300/50'
                  }`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  {item.name}
                  {active && (
                    <div className="ml-auto">
                      <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className={`border-t ${
            theme === 'dark' ? 'border-purple-500/30' : 'border-purple-200'
          } p-6 ${
            theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50/50'
          }`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-gray-800"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${textColor} truncate`}>
                  {user?.username}
                </p>
                <p className={`text-xs ${textMuted} truncate`}>
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Link
                to="/profile"
                className={`flex items-center px-4 py-3 text-sm ${textMuted} hover:${textColor} ${hoverBackground} rounded-xl transition-all duration-300`}
              >
                <User className="mr-3 h-4 w-4" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className={`flex w-full items-center px-4 py-3 text-sm ${textMuted} hover:text-white hover:bg-red-500/20 rounded-xl transition-all duration-300`}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-80">
        {/* Enhanced Top bar */}
        <div className={`sticky top-0 z-40 flex h-20 shrink-0 items-center gap-x-4 ${topbarBackground} transition-all duration-500 ${
          isScrolled 
            ? 'shadow-2xl' 
            : 'border-b border-transparent'
        } px-6 sm:gap-x-6 lg:px-8`}>
          <button
            type="button"
            className={`-m-2.5 p-2.5 ${textMuted} ${hoverBackground} rounded-xl transition-all duration-300 lg:hidden`}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-6">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-3 ${textMuted} ${hoverBackground} rounded-xl transition-all duration-300 transform hover:scale-110`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>

              {/* User Info (Desktop) */}
              <div className={`hidden lg:flex items-center space-x-4 ${
                theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/50'
              } px-4 py-2 rounded-xl border ${
                theme === 'dark' ? 'border-gray-600/50' : 'border-gray-300/50'
              }`}>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${textColor}`}>
                    {user?.username}
                  </p>
                  <p className={`text-xs ${textMuted}`}>
                    {user?.stats?.totalSolved || 0} problems
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            {children}
          </div>
        </main>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.8); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}