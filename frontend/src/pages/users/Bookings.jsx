import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  Users,
  Trash2,
  Edit2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Nav from "../components/Nav";

const Bookings = ({ user, onLogout, setCurrentPage }) => {
  const [bookings, setBookings] = useState([
    {
      id: "BK-9921",
      turf: "Champions Arena",
      date: "Oct 24, 2024",
      time: "18:00 - 19:00",
      location: "Downtown Sports Complex",
      players: 10,
      status: "Confirmed",
      price: "$45",
      sport: "Football",
    },
    {
      id: "BK-9925",
      turf: "Green Valley Turf",
      date: "Oct 28, 2024",
      time: "20:00 - 21:00",
      location: "Riverside Arena",
      players: 8,
      status: "Pending",
      price: "$50",
      sport: "Basketball",
    },
    {
      id: "BK-9930",
      turf: "Elite Sports Zone",
      date: "Oct 30, 2024",
      time: "19:00 - 20:00",
      location: "Central Hub",
      players: 12,
      status: "Confirmed",
      price: "$60",
      sport: "Cricket",
    },
  ]);

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeNavTab, setActiveNavTab] = useState("Bookings");

  // Handle navigation tab changes
  const handleNavTabChange = (tab) => {
    setActiveNavTab(tab);
    if (tab === "Dashboard") {
      setCurrentPage("dashboard");
    } else if (tab === "Venues") {
      setCurrentPage("venues");
    } else if (tab === "Profile") {
      setCurrentPage("profile");
    } else if (tab === "Settings") {
      setCurrentPage("settings");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter = filter === "All" || booking.status === filter;
    const matchesSearch =
      booking.turf.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDeleteBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <Nav
        activeTab={activeNavTab}
        setActiveTab={handleNavTabChange}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden md:ml-64">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>

          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 w-64 transition-all"
              />
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.username
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "U"}
              </div>
            </div>
          </div>
        </header>

        {/* Booking Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Filter Section */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setFilter("All")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === "All"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-500"
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setFilter("Confirmed")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === "Confirmed"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-500"
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilter("Pending")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === "Pending"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-500"
              }`}
            >
              Pending
            </button>
          </div>

          {/* Bookings Grid */}
          {filteredBookings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden"
                >
                  {/* Status Bar */}
                  <div
                    className={`h-1 ${booking.status === "Confirmed" ? "bg-emerald-500" : "bg-amber-500"}`}
                  ></div>

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs font-mono text-gray-400 mb-1">
                          {booking.id}
                        </p>
                        <h3 className="text-xl font-bold text-gray-800">
                          {booking.turf}
                        </h3>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                          booking.status === "Confirmed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {booking.status === "Confirmed" ? (
                          <CheckCircle size={14} />
                        ) : (
                          <AlertCircle size={14} />
                        )}
                        {booking.status}
                      </span>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={16} className="text-emerald-500" />
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="font-semibold">{booking.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={16} className="text-emerald-500" />
                        <div>
                          <p className="text-xs text-gray-500">Time</p>
                          <p className="font-semibold">{booking.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={16} className="text-emerald-500" />
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="font-semibold text-sm">
                            {booking.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users size={16} className="text-emerald-500" />
                        <div>
                          <p className="text-xs text-gray-500">Players</p>
                          <p className="font-semibold">{booking.players}</p>
                        </div>
                      </div>
                    </div>

                    {/* Sport and Price */}
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg">
                        {booking.sport}
                      </span>
                      <span className="text-2xl font-bold text-emerald-600">
                        {booking.price}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-semibold">
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-semibold"
                      >
                        <Trash2 size={16} />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Calendar size={64} className="text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No Bookings Found
              </h3>
              <p className="text-gray-500 mb-6">
                You don't have any bookings matching your filters.
              </p>
              <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all">
                Book a Turf Now
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Bookings;
