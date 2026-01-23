import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, Bell } from 'lucide-react';
import Nav from '../components/Nav';

const Profile = ({ user, onLogout, setCurrentPage }) => {
  const [activeNavTab, setActiveNavTab] = useState('Profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || 'Guest',
    email: user?.email || '',
    phone: '+1-234-567-8900',
    location: 'New York, USA',
    bio: 'Sports enthusiast and turf booking lover',
    bookings: 12,
    reviews: 8
  });

  const handleNavTabChange = (tab) => {
    setActiveNavTab(tab);
    setCurrentPage(tab.toLowerCase());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the profile
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <Nav activeTab={activeNavTab} setActiveTab={handleNavTabChange} onLogout={onLogout} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.username?.split(' ').map(n => n[0]).join('') || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {profileData.username.split(' ').map(n => n[0]).join('') || 'U'}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{profileData.username}</h3>
                    <p className="text-gray-500 text-sm">{user?.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all font-semibold"
                >
                  {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>

              {/* Profile Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">{profileData.bookings}</p>
                  <p className="text-sm text-gray-500">Total Bookings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">{profileData.reviews}</p>
                  <p className="text-sm text-gray-500">Reviews Given</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">4.8</p>
                  <p className="text-sm text-gray-500">Rating</p>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h4 className="text-lg font-bold text-gray-800 mb-6">Personal Information</h4>
              
              <div className="space-y-6">
                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <User size={16} className="text-emerald-500" />
                      Username
                    </div>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={profileData.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.username}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail size={16} className="text-emerald-500" />
                      Email Address
                    </div>
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone size={16} className="text-emerald-500" />
                      Phone Number
                    </div>
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.phone}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-emerald-500" />
                      Location
                    </div>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.location}</p>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.bio}</p>
                  )}
                </div>

                {/* Save Button */}
                {isEditing && (
                  <button
                    onClick={handleSaveProfile}
                    className="w-full px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all font-semibold"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
