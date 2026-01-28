import React from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  LogOut,
  MapPin,
  ShieldCheck,
} from "lucide-react";

const AdminNav = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Users", icon: Users },
    { name: "Bookings", icon: Calendar },
    { name: "Venues", icon: MapPin },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-50">
      {/* Brand Section */}
      <div className="p-8">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-emerald-600 p-2.5 rounded-xl shadow-lg shadow-emerald-100 group-hover:scale-105 transition-transform">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-gray-900 leading-none">
              TurfTime
            </span>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">
              Admin Portal
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-50/50"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon 
                  size={20} 
                  className={`${isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-600"} transition-colors`} 
                />
                <span className={`text-sm font-bold ${isActive ? "opacity-100" : "opacity-80"}`}>
                  {item.name}
                </span>
              </div>
              
              {/* Active Indicator Dot */}
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User / Logout Section */}
      <div className="p-4 mt-auto">
        <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                AD
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-gray-900 truncate">Master Admin</span>
                <span className="text-[10px] text-gray-500 truncate">admin@turftime.com</span>
              </div>
           </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3.5 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminNav;