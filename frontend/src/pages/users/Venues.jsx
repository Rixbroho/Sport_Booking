import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Star,
  Users,
  Clock,
  AlertCircle,
  Loader2
} from "lucide-react";
import Nav from "../components/Nav";
import { getAllVenues } from "../../services/api"; // Ensure path matches your project structure

const Venues = ({ user, onLogout, setCurrentPage }) => {
  const [activeNavTab, setActiveNavTab] = useState("Venues");
  const [searchTerm, setSearchTerm] = useState("");
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNavTabChange = (tab) => {
    setActiveNavTab(tab);
    setCurrentPage(tab.toLowerCase());
  };

  // Fetch venues from the backend
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const response = await getAllVenues();
        if (response.data.success) {
          setVenues(response.data.venues);
        }
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const filteredVenues = venues.filter(
    (venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
        <header className="fixed top-0 right-0 left-0 h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 md:left-64 z-40">
          <h2 className="text-2xl font-bold text-gray-800">Venues</h2>

          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 w-64 transition-all"
              />
            </div>
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
          </div>
        </header>

        {/* Venues Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-28">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading venues...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVenues.map((venue) => (
                  <div
                    key={venue.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden"
                  >
                    {/* Header */}
                    <div
                      className={`h-20 flex items-center justify-center text-6xl ${
                        venue.availability === "Available" ? "bg-emerald-50" : "bg-amber-50"
                      }`}
                    >
                      {venue.image || "🏟️"}
                    </div>

                    <div className="p-6">
                      {/* Title and Rating */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="max-w-[70%]">
                          <h3 className="text-lg font-bold text-gray-800 truncate">
                            {venue.name}
                          </h3>
                          <p className="text-sm text-gray-500">{venue.type}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                          <Star
                            size={14}
                            className="text-yellow-500 fill-yellow-500"
                          />
                          <span className="text-sm font-bold text-yellow-700">
                            {venue.rating || "5.0"}
                          </span>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-2 mb-4 text-gray-700 h-10">
                        <MapPin
                          size={16}
                          className="text-emerald-500 mt-1 flex-shrink-0"
                        />
                        <p className="text-sm line-clamp-2">{venue.location}</p>
                      </div>

                      {/* Contact Info (Shows placeholders if null in DB) */}
                      <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={14} className="text-emerald-500" />
                          <p className="text-xs">{venue.contact || "Contact via App"}</p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail size={14} className="text-emerald-500" />
                          <p className="text-xs">{venue.email || "No email listed"}</p>
                        </div>
                      </div>

                      {/* Price and Availability */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-emerald-600">
                          {venue.price}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                            venue.availability === "Available"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {venue.availability === "Available" ? "✓" : "⏱"}
                          {venue.availability}
                        </span>
                      </div>

                      {/* Action Button */}
                      <button className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all font-semibold active:scale-95">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredVenues.length === 0 && (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <MapPin size={64} className="text-gray-300 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">
                    No Venues Found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search criteria or check back later.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Venues;