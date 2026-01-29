import React, { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import {
  Users,
  Calendar,
  Settings,
  BarChart2,
  Activity,
  ArrowUpRight,
  Bell
} from "lucide-react";
import UserBookingSetting from "./UserBookingSetting";
import VenueManagement from "./VenueManagement";
import AdminSetting from "./AdminSetting";
import UsersPage from "./Users";

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    document.title = `Admin - ${activeTab}`;
  }, [activeTab]);

  // Data for the stat cards
  const stats = [
    { label: "Total Users", value: "120", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+12%" },
    { label: "Bookings Today", value: "45", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50", trend: "+5%" },
    { label: "Revenue", value: "₹50,000", icon: BarChart2, color: "text-amber-600", bg: "bg-amber-50", trend: "+18%" },
    { label: "Pending Issues", value: "5", icon: Activity, color: "text-rose-600", bg: "bg-rose-50", trend: "Stable" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 ${stat.bg} rounded-xl`}>
                      <stat.icon className={`${stat.color} w-6 h-6`} />
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center">
                      {stat.trend} <ArrowUpRight className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{stat.value}</h3>
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-gray-400 text-xs uppercase border-b border-gray-50">
                        <th className="pb-3 font-semibold">User</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[1, 2, 3].map((item) => (
                        <tr key={item} className="group">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">JD</div>
                              <span className="text-sm font-medium text-gray-700">John Doe</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full uppercase">Success</span>
                          </td>
                          <td className="py-4 text-right text-sm font-bold text-gray-900">₹1,200</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
                <h3 className="font-bold text-lg mb-2">Pro Tip</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  You can now export your monthly revenue reports directly from the Settings tab!
                </p>
                <button className="mt-6 w-full bg-white text-indigo-600 font-bold py-2 rounded-xl text-sm hover:bg-indigo-50 transition-colors">
                  Try it now
                </button>
              </div>
            </div>
          </div>
        );
      case "Users":
        return <UsersPage/>;
      case "Bookings":
        return <UserBookingSetting />;
      case "Venues":
        return <VenueManagement />;
      case "Settings":
        return <AdminSetting />;
      default:
        return <p>Content not found.</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <AdminNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />
      
      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">{activeTab}</h1>
            <p className="text-gray-500 text-sm">Dashboard / {activeTab}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors bg-white rounded-xl border border-gray-100 shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
          </div>
        </header>

        <section>
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;