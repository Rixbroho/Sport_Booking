import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { toast } from "react-toastify";
import Nav from "../components/Nav";
import { getUserBookings } from "../../services/api";

const Bookings = ({ user, onLogout, setCurrentPage }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await getUserBookings();
        if (response.data.success) {
          setBookings(response.data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getFilteredBookings = () => {
    if (activeTab === "all") return bookings;
    if (activeTab === "pending") return bookings.filter(b => b.status === "Pending");
    if (activeTab === "confirmed") return bookings.filter(b => b.status === "Confirmed");
    return bookings;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <AlertCircle size={20} className="text-amber-500" />;
      case "Confirmed":
        return <CheckCircle2 size={20} className="text-emerald-500" />;
      case "Declined":
        return <XCircle size={20} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Declined":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const filteredBookings = getFilteredBookings();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <Nav
        activeTab="Bookings"
        setActiveTab={(tab) => {
          setCurrentPage(tab.toLowerCase());
        }}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden md:ml-64">
        {/* Header */}
        <header className="fixed top-0 right-0 left-0 h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 md:left-64 z-40">
          <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>

          <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">
                {user?.username || "Guest"}
              </p>
              <p className="text-xs text-gray-500">{user?.role || "User"}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
              {user?.username
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "U"}
            </div>
          </div>
        </header>

        {/* Bookings Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-28">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {["all", "pending", "confirmed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-semibold transition-all capitalize border-b-2 ${
                  activeTab === tab
                    ? "text-emerald-600 border-emerald-500"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                {tab === "all" && `All (${bookings.length})`}
                {tab === "pending" && `Pending (${bookings.filter(b => b.status === "Pending").length})`}
                {tab === "confirmed" && `Confirmed (${bookings.filter(b => b.status === "Confirmed").length})`}
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Calendar size={64} className="text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                {activeTab === "all" ? "No Bookings Yet" : `No ${activeTab} bookings`}
              </h3>
              <p className="text-gray-500">
                {activeTab === "all"
                  ? "Browse venues and make your first booking!"
                  : `You don't have any ${activeTab} bookings.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    {/* Header with Status */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {booking.venueName}
                        </h3>
                        <p className="text-sm text-gray-500">{booking.type}</p>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusIcon(booking.status)}
                        <span className="font-semibold text-sm">{booking.status}</span>
                      </div>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-100">
                      {/* Date */}
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Calendar size={18} className="text-blue-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold">DATE</p>
                          <p className="font-bold text-gray-800">
                            {new Date(booking.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <Clock size={18} className="text-purple-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold">TIME</p>
                          <p className="font-bold text-gray-800">{booking.time}</p>
                        </div>
                      </div>

                      {/* Players */}
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <Users size={18} className="text-green-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold">PLAYERS</p>
                          <p className="font-bold text-gray-800">{booking.players}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">PRICE</p>
                        <p className="font-bold text-emerald-600 text-lg">{booking.price}</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">LOCATION</p>
                        <p className="text-gray-800">{booking.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Bookings;
