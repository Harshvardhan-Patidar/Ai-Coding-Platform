import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Loader2, LogIn, Sparkles, Shield, Mail, Lock, User, Key } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(formData);
      if (result.success) {
        toast.success('Welcome back! Login successful! 🎉');
        navigate(from, { replace: true });
      } else {
        toast.error(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-blue-400 rounded-full animate-float"></div>
        <div className="absolute top-40 left-40 w-1 h-1 bg-purple-400 rounded-full animate-float delay-700"></div>
        <div className="absolute bottom-60 right-40 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float delay-1200"></div>
        <div className="absolute bottom-40 left-60 w-1 h-1 bg-indigo-400 rounded-full animate-float delay-500"></div>
      </div>

      <div className={`max-w-md w-full space-y-8 relative z-10 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Enhanced Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-2xl">
                <LogIn className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            Sign in to continue your coding journey
          </p>
          <div className="mt-2 flex items-center justify-center space-x-2 text-slate-500">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="text-sm">New to CodeMaster?</span>
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
            >
              Create an account
            </Link>
          </div>
        </div>

        {/* Enhanced Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 space-y-6 shadow-2xl">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 transition-colors duration-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-slate-600 rounded-xl bg-slate-800/60"
                />
                <label htmlFor="remember-me" className="text-sm text-slate-400">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  Forgot password?
                </a>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center items-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Sign In
                <Sparkles className="h-4 w-4 ml-2 group-hover:animate-pulse" />
              </>
            )}
          </button>

          {/* Enhanced Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-800/40 text-slate-500 rounded-full py-1 backdrop-blur-sm">
                Or continue with
              </span>
            </div>
          </div>

          {/* Enhanced Google Sign In */}
          <div>
            <button
              type="button"
              className="group w-full inline-flex justify-center items-center py-3 px-4 border border-slate-700 rounded-xl text-sm font-semibold text-slate-300 bg-slate-800/40 hover:bg-slate-700/40 hover:border-slate-600 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="group-hover:text-white transition-colors duration-300">
                Sign in with Google
              </span>
            </button>
          </div>

          {/* Security Note */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-slate-500 text-sm">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span>Your data is securely encrypted and protected</span>
            </div>
          </div>

          {/* Quick Demo Credentials */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center space-x-2 text-slate-400 text-sm mb-2">
              <Key className="h-4 w-4 text-amber-400" />
              <span className="font-semibold">Demo Credentials:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>Email: demo@codemaster.com</span>
              </div>
              <div className="flex items-center space-x-1">
                <Lock className="h-3 w-3" />
                <span>Password: demo123</span>
              </div>
            </div>
          </div>
        </form>

        {/* Stats Footer */}
        <div className="text-center">
          <div className="grid grid-cols-3 gap-4 text-slate-500 text-sm">
            <div className="space-y-1">
              <div className="text-white font-bold">10K+</div>
              <div>Active Users</div>
            </div>
            <div className="space-y-1">
              <div className="text-white font-bold">95%</div>
              <div>Success Rate</div>
            </div>
            <div className="space-y-1">
              <div className="text-white font-bold">24/7</div>
              <div>AI Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}