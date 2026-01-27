import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit, 
  MapPin, 
  Star, 
  Search, 
  X, 
  LayoutGrid,
  Menu,
  ChevronRight
} from "lucide-react";

const VenueManagement = ({ user }) => {
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For sidebar on mobile
  
  const [newVenue, setNewVenue] = useState({ 
    name: "", 
    location: "", 
    type: "Football", 
    price: "", 
    rating: 5.0,
    image: "🏟️" 
  });

  useEffect(() => {
    setVenues([
      { id: 1, name: "Greenfield Arena", location: "Downtown", type: "Football", price: "$45/hr", rating: 4.8, image: "🏟️" },
      { id: 2, name: "Skyline Turf", location: "Uptown", type: "Basketball", price: "$50/hr", rating: 4.5, image: "🏀" },
    ]);
  }, []);

  const handleAddVenue = () => {
    if (!newVenue.name || !newVenue.location) return;
    setVenues([...venues, { id: Date.now(), ...newVenue }]);
    setIsModalOpen(false);
  };

  const filteredVenues = venues.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
      
      {/* --- RESPONSIVE HEADER --- */}
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle (Only visible on small screens) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg md:hidden text-gray-600"
          >
            <Menu size={24} />
          </button>
          
          <div className="bg-emerald-500 p-2 rounded-lg text-white hidden xs:block">
            <LayoutGrid size={20} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Manage Venues</h2>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Search - Hidden on very small screens, shown as icon or expanded on MD */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 w-40 xl:w-64 transition-all"
            />
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-500 text-white p-2.5 md:px-5 md:py-2.5 rounded-xl hover:bg-emerald-600 flex items-center gap-2 font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Venue</span>
          </button>
        </div>
      </header>

      {/* --- RESPONSIVE GRID --- */}
      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredVenues.map((venue) => (
            <div key={venue.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all">
              {/* Card Header */}
              <div className="h-28 md:h-24 bg-emerald-50 flex items-center justify-center text-5xl relative">
                {venue.image}
                {/* Always visible actions on mobile, hover on desktop */}
                <div className="absolute top-3 right-3 flex gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white text-blue-500 rounded-full shadow-md hover:bg-blue-50">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 bg-white text-red-500 rounded-full shadow-md hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="max-w-[70%]">
                    <h3 className="text-lg font-bold text-gray-800 truncate">{venue.name}</h3>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{venue.type}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg flex-shrink-0">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-yellow-700">{venue.rating}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 mb-6 text-gray-600 min-h-[40px]">
                  <MapPin size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm line-clamp-2">{venue.location}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                   <span className="text-lg font-black text-gray-900">{venue.price || "$0/hr"}</span>
                   <button className="text-emerald-600 text-sm font-bold flex items-center hover:translate-x-1 transition-transform">
                     Stats <ChevronRight size={16} />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- RESPONSIVE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          {/* Modal Container */}
          <div className="bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] w-full max-w-lg relative z-10 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom sm:zoom-in duration-300">
            
            <div className="bg-emerald-500 p-6 md:p-8 text-white flex-shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-white/80 hover:text-white">
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold">New Venue</h3>
              <p className="text-emerald-50 opacity-80 text-sm">Add a new ground to the listing.</p>
            </div>
            
            <div className="p-6 md:p-8 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Venue Name</label>
                  <input type="text" placeholder="e.g. Champions Arena" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Type</label>
                  <select className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none appearance-none">
                    <option>Football</option>
                    <option>Cricket</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Price</label>
                  <input type="text" placeholder="$50/hr" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none" />
                </div>
              </div>

              <button
                onClick={handleAddVenue}
                className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 shadow-lg mt-4 active:scale-95 transition-all"
              >
                Create Venue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueManagement;