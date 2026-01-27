import React from "react";
import {
  LayoutDashboard,
  Calendar,
  MapPin,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const Nav = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = ["Dashboard", "Bookings", "Venues", "Profile", "Settings"];
  const icons = {
    Dashboard: LayoutDashboard,
    Bookings: Calendar,
    Venues: MapPin,
    Profile: User,
    Settings: Settings,
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
      {/* Logo Section */}
      <div className="p-8 flex items-center gap-3">
        <div className="bg-emerald-500 p-2 rounded-lg">
          <LayoutDashboard className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          TurfTime
        </span>
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
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-emerald-50 text-emerald-600 border-r-4 border-emerald-500"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              <span className="font-semibold">{item}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};  

export default Nav;
