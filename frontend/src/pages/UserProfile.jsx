import React, { useState } from 'react';
import { 
  User, Mail, Phone, Camera, Save, 
  MapPin, ArrowLeft, ShieldCheck, 
  CheckCircle, Edit3 
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminProfile = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState({
    fullName: 'Super Admin',
    email: 'admin@turftime.com',
    phone: '+1 (555) 000-1234',
    location: 'Management HQ'
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      
      {/* 1. Header with Back Button */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-emerald-50 text-gray-500 hover:text-emerald-600 rounded-xl transition-all border border-transparent hover:border-emerald-100"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Profile</h2>
        </div>
        
        <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full border border-emerald-200">
          <ShieldCheck className="text-emerald-600" size={18} />
          <span className="text-emerald-700 text-xs font-black uppercase tracking-widest">Verified Admin</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-gray-100 overflow-hidden">
          
          {/* 2. Visual Banner (Concept from Login Reference) */}
          <div className="h-40 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 relative overflow-hidden">
             {/* Animated-style background circles */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
          </div>

          <div className="px-8 pb-10">
            {/* 3. Avatar Section */}
            <div className="relative -mt-16 mb-8 flex items-end gap-6">
              <div className="w-32 h-32 rounded-3xl bg-white p-1.5 shadow-2xl">
                <div className="w-full h-full bg-emerald-100 rounded-[1.25rem] flex items-center justify-center text-emerald-600 relative group overflow-hidden">
                  <User size={56} className="group-hover:scale-110 transition-transform duration-500" />
                  <label className="absolute inset-0 bg-emerald-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer">
                    <Camera size={24} />
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
              <div className="pb-3">
                <h3 className="text-2xl font-black text-gray-900 leading-none">{adminData.fullName}</h3>
                <p className="text-emerald-600 font-bold mt-2 flex items-center gap-1.5">
                  <CheckCircle size={14} /> Super Admin Role
                </p>
              </div>
            </div>

            {/* 4. Profile Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              
              <ProfileInput 
                label="Full Name" 
                value={adminData.fullName} 
                icon={<User size={20}/>} 
                disabled={!isEditing}
                onChange={(e) => setAdminData({...adminData, fullName: e.target.value})}
              />

              <ProfileInput 
                label="Email Address" 
                value={adminData.email} 
                icon={<Mail size={20}/>} 
                disabled={!isEditing}
                onChange={(e) => setAdminData({...adminData, email: e.target.value})}
              />

              <ProfileInput 
                label="Phone Number" 
                value={adminData.phone} 
                icon={<Phone size={20}/>} 
                disabled={!isEditing}
                onChange={(e) => setAdminData({...adminData, phone: e.target.value})}
              />

              <ProfileInput 
                label="Headquarters / Location" 
                value={adminData.location} 
                icon={<MapPin size={20}/>} 
                disabled={!isEditing}
                onChange={(e) => setAdminData({...adminData, location: e.target.value})}
              />

              {/* 5. Bottom Action Buttons */}
              <div className="md:col-span-2 flex justify-end items-center gap-4 mt-8 pt-8 border-t border-gray-50">
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-gray-200"
                  >
                    <Edit3 size={18} /> Edit Profile Info
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="text-gray-400 font-bold hover:text-gray-600 px-4 transition-colors"
                    >
                      Discard Changes
                    </button>
                    <button 
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-emerald-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Save size={18} /> Save Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Component for Input Fields (Matching your Login Style)
const ProfileInput = ({ label, value, icon, disabled, onChange }) => (
  <div className="space-y-2">
    <label className="text-[11px] uppercase font-black tracking-[0.1em] text-gray-400 ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${disabled ? 'text-gray-300' : 'text-gray-400 group-focus-within:text-emerald-500'}`}>
        {icon}
      </div>
      <input 
        type="text" 
        value={value} 
        disabled={disabled}
        onChange={onChange}
        className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all font-bold 
          ${disabled 
            ? 'bg-gray-50 border-transparent text-gray-500' 
            : 'bg-white border-gray-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 text-gray-800 shadow-sm'
          }`}
      />
    </div>
  </div>
);

export default AdminProfile;