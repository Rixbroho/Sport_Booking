import React, { useState } from "react";
import {
  Search,
  Bell,
  Plus,
  Clock,
  ChevronRight,
  Trophy,
  Calendar,
  MapPin,
} from "lucide-react";
import Nav from "../components/Nav";

const UserDashboard = ({
  user = { username: "Guest", role: "Player" },
  onLogout,
  setCurrentPage,
}) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Ensure user has the required properties
  const displayUser = {
    username: user?.username || "Guest",
    role: user?.role || "Player",
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "Bookings":
        setCurrentPage("bookings");
        break;
      case "Venues":
        setCurrentPage("venues");
        break;
      case "Profile":
        setCurrentPage("profile");
        break;
      case "Settings":
        setCurrentPage("settings");
        break;
      case "Dashboard":
        setCurrentPage("dashboard");
        break;
      default:
        setCurrentPage("dashboard");
    }
  };

  const stats = [
    {
      label: "Total Bookings",
      value: "12",
      icon: Calendar,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      label: "Favorite Turf",
      value: "Arena 5",
      icon: MapPin,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Hours Played",
      value: "24h",
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      label: "Points",
      value: "850",
      icon: Trophy,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  const upcomingBookings = [
    {
      id: "BK-9921",
      turf: "Champions Arena",
      date: "Oct 24, 2023",
      time: "18:00",
      status: "Confirmed",
      price: "$45",
    },
    {
      id: "BK-9925",
      turf: "Green Valley Turf",
      date: "Oct 28, 2023",
      time: "20:00",
      status: "Pending",
      price: "$50",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <Nav
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden md:ml-64">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeTab} Overview
          </h2>

          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search turfs..."
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 w-64 transition-all"
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">
                  {displayUser.username}
                </p>
                <p className="text-xs text-gray-500">{displayUser.role}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                {displayUser.username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow"
              >
                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Recent Activity (Bookings Table) */}
            <div className="flex-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">
                  Your Upcoming Bookings
                </h3>
                <button
                  onClick={() => handleTabChange("Bookings")}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1"
                >
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Venue / ID</th>
                      <th className="px-6 py-4 font-semibold">Date & Time</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {upcomingBookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-800">
                            {booking.turf}
                          </div>
                          <div className="text-xs font-mono text-gray-400">
                            {booking.id}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-800">
                            {booking.date}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.time}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              booking.status === "Confirmed"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-800">
                          {booking.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Action Sidebar */}
            <div className="flex-1 space-y-6">
              <div className="bg-linear-to-br from-emerald-500 to-green-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Book a Turf</h3>
                  <p className="text-emerald-100 text-sm mb-6">
                    Ready for your next game? Find the best slots near you.
                  </p>
                  <button className="w-full bg-white text-emerald-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all">
                    <Plus size={20} /> New Booking
                  </button>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Quick Shortcuts
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-gray-50 rounded-2xl text-center hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                    <MapPin size={20} className="mx-auto mb-2" />
                    <span className="text-xs font-bold">Nearby</span>
                  </button>
                  <button className="p-3 bg-gray-50 rounded-2xl text-center hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                    <Trophy size={20} className="mx-auto mb-2" />
                    <span className="text-xs font-bold">Leagues</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
