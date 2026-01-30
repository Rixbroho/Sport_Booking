import React, { useState, useEffect } from "react";
import { 
  Save, 
  User, 
  ShieldCheck, 
  BellRing, 
  Globe2, 
  Key, 
  Database,
  CheckCircle2
} from "lucide-react";
import { toast } from 'react-toastify';
import { getSettings, updateSettings, updateUserProfile, forgotPassword } from '../../services/api';

const AdminSetting = () => {
  const [formData, setFormData] = useState({
    adminName: "",
    adminEmail: "",
    adminAddress: "",
    siteName: "",
    currency: "INR (₹)",
    bookingAutoApprove: false,
    emailAlerts: false,
    twoFactor: false
  });

  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getSettings();
        if (res.data.success) {
          const s = res.data.settings;
          setFormData({
            adminName: s.adminName || "",
            adminEmail: s.adminEmail || "",
            adminAddress: s.adminAddress || "",
            siteName: s.siteName || "",
            currency: s.currency || "INR (₹)",
            bookingAutoApprove: s.bookingAutoApprove === 'true',
            emailAlerts: s.emailAlerts === 'true',
            twoFactor: s.twoFactor === 'true'
          });
        }
      } catch (err) {
        console.error('Could not load settings', err);
        toast.error('Failed to load admin settings');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (isSaved) setIsSaved(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = {
        adminName: formData.adminName,
        adminEmail: formData.adminEmail,
        adminAddress: formData.adminAddress,
        siteName: formData.siteName,
        currency: formData.currency,
        bookingAutoApprove: formData.bookingAutoApprove,
        emailAlerts: formData.emailAlerts,
        twoFactor: formData.twoFactor
      };

      await updateSettings(payload);

      // Also update admin user profile (username/email and optional password)
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user && user.id) {
        // Validate password fields if provided
        if (newPassword || confirmPassword) {
          if (newPassword.length < 8) {
            toast.error('Password must be at least 8 characters long');
            setLoading(false);
            return;
          }
          if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            setLoading(false);
            return;
          }
        }

        const userPayload = { username: formData.adminName, email: formData.adminEmail };
        if (newPassword) userPayload.password = newPassword;

        await updateUserProfile(user.id, userPayload);
        // refresh local storage user
        const updatedUser = { ...user, username: formData.adminName, email: formData.adminEmail };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        // clear password fields after successful update
        setNewPassword('');
        setConfirmPassword('');
      }

      setIsSaved(true);
      toast.success('Settings saved');
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error('Error saving settings', err);
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      const email = formData.adminEmail;
      if (!email) {
        toast.error('Admin email is required to reset password');
        return;
      }
      await forgotPassword(email);
      toast.success('Password reset requested. Check the admin email for the OTP.');
    } catch (err) {
      console.error('Error requesting password reset', err);
      toast.error('Failed to request password reset');
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      {/* Top Bar / Actions */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-sm font-medium text-emerald-600 font-mono uppercase tracking-wider">System Configuration</h2>
          <p className="text-gray-500 text-sm">Manage your account and platform-wide preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-black transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
          {isSaved ? "Settings Saved" : loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile & Security */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Administrator Profile */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800">Admin Profile</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                <input
                  name="adminName"
                  type="text"
                  value={formData.adminName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                <input
                  name="adminEmail"
                  type="email"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Address</label>
                <input
                  name="adminAddress"
                  type="text"
                  value={formData.adminAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Platform Logic */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Globe2 className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-800">Global Settings</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Site Name</label>
                  <input
                    name="siteName"
                    type="text"
                    value={formData.siteName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Display Currency</label>
                  <select 
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  >
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Database className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Auto-Approve Bookings</p>
                    <p className="text-xs text-gray-500">System will confirm bookings without manual review.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="bookingAutoApprove"
                    checked={formData.bookingAutoApprove}
                    onChange={handleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Security & Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-gray-800">Security</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">2FA Security</span>
                <span className="px-2 py-1 text-[10px] font-bold bg-emerald-100 text-emerald-700 rounded uppercase">Active</span>
              </div>

              {/* Change Password Fields */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 8 chars)"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              <button onClick={handleResetPassword} disabled={loading} className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <Key className="w-4 h-4" />
                Reset Password
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <BellRing className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold">System Alerts</h3>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Get notified via email when users book a venue or cancel an existing reservation.
            </p>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                name="emailAlerts"
                checked={formData.emailAlerts}
                onChange={handleChange}
                className="w-5 h-5 rounded border-none bg-gray-700 accent-emerald-500" 
              />
              <span className="text-sm font-medium group-hover:text-emerald-400 transition-colors">Enable Email Alerts</span>
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminSetting;