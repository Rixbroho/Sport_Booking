import React from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  LogOut,
  MapPin,
} from "lucide-react";

const AdminNav = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = ["Dashboard", "Users", "Bookings", "Venues", "Settings"];
  const icons = {
    Dashboard: LayoutDashboard,
    Users: Users,
    Bookings: Calendar,
    Venues: MapPin,
    Settings: Settings,
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-800 text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-8 flex items-center gap-3">
        <div className="bg-emerald-500 p-2 rounded-lg">
          <LayoutDashboard className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-bold">Admin Panel</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = icons[item];
          const isActive = activeTab === item;

          return (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-emerald-600 text-white"
                  : "text-gray-400 hover:bg-gray-700"
              }`}
            >
              <Icon size={20} />
              <span className="font-semibold">{item}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-600 rounded-lg transition-all"
        >
          <LogOut size={20} />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminNav;