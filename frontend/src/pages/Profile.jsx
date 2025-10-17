import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin,
  Edit,
  Save,
  X,
  Sparkles,
  Zap
} from 'lucide-react';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    bio: user?.profile?.bio || '',
    location: user?.profile?.location || '',
    website: user?.profile?.website || '',
    github: user?.profile?.github || '',
    linkedin: user?.profile?.linkedin || '',
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Theme-based styles
  const backgroundStyles = theme === 'dark' 
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';

  const cardBackground = theme === 'dark'
    ? 'bg-gray-800/40 backdrop-blur-sm border border-gray-700'
    : 'bg-white/80 backdrop-blur-sm border border-gray-200';

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textMuted = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const hoverBackground = theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100';

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData({
      firstName: user?.profile?.firstName || '',
      lastName: user?.profile?.lastName || '',
      bio: user?.profile?.bio || '',
      location: user?.profile?.location || '',
      website: user?.profile?.website || '',
      github: user?.profile?.github || '',
      linkedin: user?.profile?.linkedin || '',
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      await updateUser(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${backgroundStyles} p-6`}>
      <div className={`max-w-6xl mx-auto space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Profile Header */}
        <div className={`${cardBackground} p-8 rounded-2xl backdrop-blur-sm shadow-2xl`}>
          <div className="flex items-start space-x-8">
            <div className="relative">
              <div className="h-28 w-28 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-2xl">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 border-4 border-gray-900">
                <Zap className="h-4 w-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className={`text-3xl font-bold ${textColor}`}>
                  {user?.profile?.firstName} {user?.profile?.lastName}
                </h1>
                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className={`p-3 ${textMuted} hover:${textColor} ${hoverBackground} rounded-xl transition-all duration-300`}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              <p className={`${textMuted} text-lg mb-4`}>@{user?.username}</p>
              
              {user?.profile?.bio && (
                <p className={`${textColor} text-lg mb-6`}>{user?.profile?.bio}</p>
              )}
              
              <div className="flex flex-wrap gap-6 text-gray-400">
                {user?.profile?.location && (
                  <div className={`flex items-center space-x-2 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/50'} px-4 py-2 rounded-lg`}>
                    <MapPin className="h-5 w-5" />
                    <span>{user?.profile?.location}</span>
                  </div>
                )}
                <div className={`flex items-center space-x-2 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/50'} px-4 py-2 rounded-lg`}>
                  <Calendar className="h-5 w-5" />
                  <span>Joined {new Date(user?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className={`${cardBackground} p-8 rounded-2xl backdrop-blur-sm shadow-2xl`}>
            <h2 className={`text-2xl font-bold ${textColor} mb-6 flex items-center`}>
              <User className="h-6 w-6 mr-3 text-purple-400" />
              Personal Information
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${textColor} mb-2`}>
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-900/80' : 'border-gray-300 bg-white/60'} ${textColor} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                    />
                  ) : (
                    <p className={`${textColor} text-lg`}>{user?.profile?.firstName || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${textColor} mb-2`}>
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-900/80' : 'border-gray-300 bg-white/60'} ${textColor} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                    />
                  ) : (
                    <p className={`${textColor} text-lg`}>{user?.profile?.lastName || 'Not provided'}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${textColor} mb-2`}>
                  Email
                </label>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-5 w-5 text-purple-400" />
                  <p className={`${textColor} text-lg`}>{user?.email}</p>
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${textColor} mb-2`}>
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    rows={4}
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-900/80' : 'border-gray-300 bg-white/60'} ${textColor} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className={`${textColor} text-lg`}>{user?.profile?.bio || 'No bio provided'}</p>
                )}
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${textColor} mb-2`}>
                  Location
                </label>
                {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-900/80' : 'border-gray-300 bg-white/60'} ${textColor} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                      placeholder="City, Country"
                    />
                  ) : (
                    <p className={`${textColor} text-lg`}>{user?.profile?.location || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className={`${cardBackground} p-8 rounded-2xl backdrop-blur-sm shadow-2xl`}>
            <h2 className={`text-2xl font-bold ${textColor} mb-6 flex items-center`}>
              <Sparkles className="h-6 w-6 mr-3 text-purple-400" />
              Social Links
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium ${textColor} mb-2`}>
                  <Globe className="h-5 w-5 inline mr-2 text-blue-400" />
                  Website
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={editData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-900/80' : 'border-gray-300 bg-white/60'} ${textColor} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    placeholder="https://yourwebsite.com"
                  />
                ) : (
                  <p className={`${textColor} text-lg`}>{user?.profile?.website || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${textColor} mb-2`}>
                  <Github className="h-5 w-5 inline mr-2 text-gray-400" />
                  GitHub
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.github}
                    onChange={(e) => handleChange('github', e.target.value)}
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-900/80' : 'border-gray-300 bg-white/60'} ${textColor} rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300`}
                    placeholder="username"
                  />
                ) : (
                  <p className={`${textColor} text-lg`}>{user?.profile?.github || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${textColor} mb-2`}>
                  <Linkedin className="h-5 w-5 inline mr-2 text-blue-500" />
                  LinkedIn
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.linkedin}
                    onChange={(e) => handleChange('linkedin', e.target.value)}
                    className={`w-full px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-900/80' : 'border-gray-300 bg-white/60'} ${textColor} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    placeholder="username"
                  />
                ) : (
                  <p className={`${textColor} text-lg`}>{user?.profile?.linkedin || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`${cardBackground} p-8 rounded-2xl backdrop-blur-sm shadow-2xl`}>
          <h2 className={`text-2xl font-bold ${textColor} mb-8 flex items-center`}>
            <Zap className="h-6 w-6 mr-3 text-yellow-400" />
            Statistics
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className={`text-center ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/50'} p-6 rounded-2xl hover:scale-105 transition-transform duration-300`}>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {user?.stats?.totalSolved || 0}
              </div>
              <div className={`${textMuted} mt-2`}>Problems Solved</div>
            </div>
            <div className={`text-center ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/50'} p-6 rounded-2xl hover:scale-105 transition-transform duration-300`}>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                {user?.stats?.currentStreak || 0}
              </div>
              <div className={`${textMuted} mt-2`}>Current Streak</div>
            </div>
            <div className={`text-center ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/50'} p-6 rounded-2xl hover:scale-105 transition-transform duration-300`}>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                {user?.stats?.longestStreak || 0}
              </div>
              <div className={`${textMuted} mt-2`}>Longest Streak</div>
            </div>
            <div className={`text-center ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/50'} p-6 rounded-2xl hover:scale-105 transition-transform duration-300`}>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {Math.round((user?.stats?.totalTimeSpent || 0) / 60)}h
              </div>
              <div className={`${textMuted} mt-2`}>Time Spent</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className={`px-6 py-3 ${textMuted} hover:${textColor} ${hoverBackground} rounded-xl transition-all duration-300 inline-flex items-center border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
            >
              <X className="h-5 w-5 mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center shadow-2xl"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>
    
  );
}