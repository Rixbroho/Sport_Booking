import React, { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import {
  Users,
  Calendar,
  Settings,
  BarChart2,
  Activity,
} from "lucide-react";
import UserBookingSetting from "./UserBookingSetting";
import VenueManagement from "./VenueManagement";
import AdminSetting from "./AdminSetting";

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    document.title = `Admin - ${activeTab}`;
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
              <div className="p-4 bg-emerald-100 rounded-full">
                <Users className="text-emerald-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">120</h3>
                <p className="text-gray-500">Total Users</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <Calendar className="text-blue-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">45</h3>
                <p className="text-gray-500">Bookings Today</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
              <div className="p-4 bg-yellow-100 rounded-full">
                <BarChart2 className="text-yellow-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">₹50,000</h3>
                <p className="text-gray-500">Revenue</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
              <div className="p-4 bg-red-100 rounded-full">
                <Activity className="text-red-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">5</h3>
                <p className="text-gray-500">Pending Issues</p>
              </div>
            </div>
          </div>
        );
      case "Users":
        return <p>Manage users here.</p>;
      case "Bookings":
        return <UserBookingSetting />; // Use the new UserBookingSetting component
      case "Venues":
        return <VenueManagement />; // Ensure this renders the VenueManagement component
      case "Settings":
        return <AdminSetting />; // Use the AdminSetting component
      default:
        return <p>Content not found.</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />
      <main className="flex-1 p-6 ml-64"> {/* Added ml-64 to account for AdminNav width */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{activeTab}</h1>
          {activeTab === "Dashboard" && (
            <p className="text-gray-600">Overview of recent activities and stats</p>
          )}
        </header>
        <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;