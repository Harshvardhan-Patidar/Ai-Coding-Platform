import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
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
  X
} from 'lucide-react';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    bio: user?.profile?.bio || '',
    location: user?.profile?.location || '',
    website: user?.profile?.website || '',
    github: user?.profile?.github || '',
    linkedin: user?.profile?.linkedin || '',
  });

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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-start space-x-6">
          <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-foreground">
                {user?.profile?.firstName} {user?.profile?.lastName}
              </h1>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                >
                  <Edit className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <p className="text-muted-foreground mb-2">@{user?.username}</p>
            
            {user?.profile?.bio && (
              <p className="text-foreground mb-4">{user?.profile?.bio}</p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {user?.profile?.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user?.profile?.location}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(user?.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Personal Information</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="text-muted-foreground">{user?.profile?.firstName || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="text-muted-foreground">{user?.profile?.lastName || 'Not provided'}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={editData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-muted-foreground">{user?.profile?.bio || 'No bio provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="City, Country"
                />
              ) : (
                <p className="text-muted-foreground">{user?.profile?.location || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Social Links</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={editData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://yourwebsite.com"
                />
              ) : (
                <p className="text-muted-foreground">{user?.profile?.website || 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                GitHub
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.github}
                  onChange={(e) => handleChange('github', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="username"
                />
              ) : (
                <p className="text-muted-foreground">{user?.profile?.github || 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                LinkedIn
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="username"
                />
              ) : (
                <p className="text-muted-foreground">{user?.profile?.linkedin || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Statistics</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{user?.stats?.totalSolved || 0}</div>
            <div className="text-sm text-muted-foreground">Problems Solved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{user?.stats?.currentStreak || 0}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{user?.stats?.longestStreak || 0}</div>
            <div className="text-sm text-muted-foreground">Longest Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round((user?.stats?.totalTimeSpent || 0) / 60)}h
            </div>
            <div className="text-sm text-muted-foreground">Time Spent</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md inline-flex items-center"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors inline-flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
