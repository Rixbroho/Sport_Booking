import React, { useState } from "react";
import { 
  User, Mail, Phone, MapPin, Edit2, Save, Bell, 
  Lock, Camera, Globe, ChevronRight, Loader2, CheckCircle 
} from "lucide-react";
import Nav from "../components/Nav";
import { updateUserProfile } from "../../services/api";

const Profile = ({ user, onLogout, setCurrentPage }) => {
  const [activeNavTab, setActiveNavTab] = useState("Profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [profileData, setProfileData] = useState({
    username: user?.username || "Guest",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    location: "Mumbai, India",
    bio: "Love playing football every weekend!",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      const payload = {
        username: profileData.username,
        email: profileData.email,
        phoneNumber: profileData.phone,
      };

      const userId = user?.id || user?._id;
      await updateUserProfile(userId, payload);
      
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Navigation Sidebar */}
      <Nav 
        activeTab={activeNavTab} 
        setActiveTab={(tab) => { setActiveNavTab(tab); setCurrentPage(tab.toLowerCase()); }} 
        onLogout={onLogout} 
      />

      <main className="flex-1 flex flex-col md:ml-64">
        {/* Modern Header */}
        <header className="fixed top-0 right-0 left-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 md:left-64 z-40">
          <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
          <button className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 pt-28">
          <div className="max-w-5xl mx-auto">
            
            {/* Top Banner Card (Exactly like your request) */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mb-8">
              <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-600" />
              <div className="px-8 pb-8 flex flex-col md:flex-row items-end -mt-12 gap-6">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-3xl bg-white p-1.5 shadow-xl">
                    <div className="w-full h-full rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 text-4xl font-black border-4 border-white">
                      {profileData.username.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-2 right-2 p-2 bg-gray-900 text-white rounded-lg shadow-lg hover:scale-110 transition-transform border border-gray-100">
                      <Camera size={18} />
                    </button>
                  )}
                </div>
                
                <div className="flex-1 flex justify-between items-center pb-2">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">{profileData.username}</h3>
                    <p className="text-gray-500 font-medium text-sm">Manage your identity and settings</p>
                  </div>
                  
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all shadow-lg"
                    >
                      <Edit2 size={16} /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3">
                       <button 
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 bg-gray-100 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        disabled={isUpdating}
                        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg disabled:opacity-50"
                      >
                        {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {isUpdating ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Form Fields (Full Edit Mode) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                    <User size={16} className="text-emerald-500" /> Basic Information
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Username */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 ml-1">Username</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input
                          disabled={!isEditing}
                          name="username"
                          value={profileData.username}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border transition-all outline-none font-semibold ${
                            isEditing ? "bg-white border-emerald-500 ring-4 ring-emerald-50" : "bg-gray-50 border-transparent text-gray-400"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input
                          disabled={!isEditing}
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border transition-all outline-none font-semibold ${
                            isEditing ? "bg-white border-emerald-500 ring-4 ring-emerald-50" : "bg-gray-50 border-transparent text-gray-400"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input
                          disabled={!isEditing}
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border transition-all outline-none font-semibold ${
                            isEditing ? "bg-white border-emerald-500 ring-4 ring-emerald-50" : "bg-gray-50 border-transparent text-gray-400"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 ml-1">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input
                          disabled={!isEditing}
                          name="location"
                          value={profileData.location}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border transition-all outline-none font-semibold ${
                            isEditing ? "bg-white border-emerald-500 ring-4 ring-emerald-50" : "bg-gray-50 border-transparent text-gray-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bio Area */}
                  <div className="mt-6 space-y-2">
                    <label className="text-xs font-bold text-gray-500 ml-1">Bio</label>
                    <textarea
                      disabled={!isEditing}
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-5 py-4 rounded-2xl border transition-all outline-none resize-none font-semibold ${
                        isEditing ? "bg-white border-emerald-500 ring-4 ring-emerald-50" : "bg-gray-50 border-transparent text-gray-400"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Security Sidebar */}
              <div className="space-y-6">
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Security</h4>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-all group">
                      <div className="flex items-center gap-3 text-gray-700 font-bold text-sm">
                        <Lock size={18} className="text-gray-400 group-hover:text-emerald-600" />
                        Update Password
                      </div>
                      <ChevronRight size={14} className="text-gray-300" />
                    </button>
                    
                    <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                      <p className="text-[10px] font-black text-orange-600 uppercase mb-1 tracking-tighter">Identity Verified</p>
                      <div className="flex items-center gap-2 text-orange-800">
                        <CheckCircle size={14} />
                        <span className="text-xs font-bold">Account Secured</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-[2rem] p-8 text-white flex flex-col items-center justify-center text-center">
                  <Globe className="text-emerald-400 mb-2" size={24} />
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Regional Server</p>
                  <p className="text-xs font-bold mt-1">Asia-Pacific (Mumbai)</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;