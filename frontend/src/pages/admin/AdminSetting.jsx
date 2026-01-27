import React, { useState } from "react";
import { Save, Bell, Lock, Globe, Shield } from "lucide-react";

const AdminSetting = () => {
  const [settings, setSettings] = useState({
    siteName: "Venue Booking Pro",
    maintenanceMode: false,
    emailNotifications: true,
    currency: "INR",
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <Globe className="text-blue-600 w-5 h-5" />
            <h2 className="text-xl font-semibold">General Configuration</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Maintenance Mode</p>
                <p className="text-sm text-gray-500">Disable front-end access for users</p>
              </div>
              <button
                onClick={() => handleToggle("maintenanceMode")}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.maintenanceMode ? "bg-red-500" : "bg-gray-300"
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${settings.maintenanceMode ? "translate-x-6" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Security & Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4 border-b pb-2">
              <Bell className="text-yellow-600 w-5 h-5" />
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Email Alerts for new bookings</span>
              <input 
                type="checkbox" 
                checked={settings.emailNotifications}
                onChange={() => handleToggle("emailNotifications")}
                className="w-4 h-4 accent-emerald-600"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4 border-b pb-2">
              <Shield className="text-purple-600 w-5 h-5" />
              <h2 className="text-lg font-semibold">Admin Security</h2>
            </div>
            <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              <Lock className="w-4 h-4" /> Change Admin Password
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSetting;