import React, { useState, useEffect } from "react";
import { 
  Plus, Trash2, Edit, MapPin, Star, Search, X, 
  LayoutGrid, Menu, ChevronRight 
} from "lucide-react";
import { createVenue, getAllVenues, updateVenue, deleteVenue } from "../../services/api"; 
import { toast } from "react-toastify";

const VenueManagement = ({ user }) => {
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // To track Edit mode
  const [currentVenueId, setCurrentVenueId] = useState(null); // ID for updating
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ 
    name: "", 
    location: "", 
    type: "Football", 
    price: "", 
    rating: 5.0,
    image: "🏟️" 
  });

  const fetchVenues = async () => {
    try {
      const response = await getAllVenues();
      if (response.data.success) {
        setVenues(response.data.venues);
      }
    } catch (error) {
      toast.error("Failed to load venues");
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open Modal for Editing
  const handleEditClick = (venue) => {
    setIsEditing(true);
    setCurrentVenueId(venue.id);
    setFormData({
      name: venue.name,
      location: venue.location,
      type: venue.type,
      price: venue.price,
      rating: venue.rating,
      image: venue.image || "🏟️"
    });
    setIsModalOpen(true);
  };

  // Handle Delete
  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      try {
        const response = await deleteVenue(id);
        if (response.data.success) {
          toast.success("Venue deleted!");
          fetchVenues();
        }
      } catch (error) {
        toast.error("Failed to delete venue");
      }
    }
  };

  // Submit Logic (Both Add and Update)
  const handleSubmit = async () => {
    if (!formData.name || !formData.location || !formData.price) {
      toast.warn("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      let response;
      if (isEditing) {
        response = await updateVenue(currentVenueId, formData);
      } else {
        response = await createVenue(formData);
      }

      if (response.data.success) {
        toast.success(isEditing ? "Venue updated!" : "Venue added!");
        closeModal();
        fetchVenues();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentVenueId(null);
    setFormData({ name: "", location: "", type: "Football", price: "", rating: 5.0, image: "🏟️" });
  };

  const filteredVenues = venues.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Manage Venues</h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-600 flex items-center gap-2 font-bold transition-all active:scale-95"
          >
            <Plus size={20} />
            <span>Add Venue</span>
          </button>
        </div>
      </header>

      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVenues.map((venue) => (
            <div key={venue.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group relative">
              <div className="h-28 bg-emerald-50 flex items-center justify-center text-5xl">
                {venue.image || "🏟️"}
                {/* Edit/Delete Overlay */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEditClick(venue)}
                    className="p-2 bg-white text-blue-500 rounded-full shadow-md hover:bg-blue-50"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(venue.id)}
                    className="p-2 bg-white text-red-500 rounded-full shadow-md hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 truncate">{venue.name}</h3>
                <p className="text-xs font-bold text-emerald-600 uppercase mb-2">{venue.type}</p>
                <div className="flex items-start gap-2 mb-4 text-gray-600">
                  <MapPin size={16} className="text-emerald-500 flex-shrink-0" />
                  <p className="text-sm line-clamp-1">{venue.location}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-lg font-black text-gray-900">{venue.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg relative z-10 overflow-hidden shadow-2xl">
            <div className="bg-emerald-500 p-8 text-white">
              <button onClick={closeModal} className="absolute top-6 right-6 text-white/80 hover:text-white">
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold">{isEditing ? "Edit Venue" : "New Venue"}</h3>
              <p className="opacity-80 text-sm">Update ground details for your users.</p>
            </div>
            
            <div className="p-8 space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Venue Name</label>
                  <input name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Location</label>
                  <input name="location" value={formData.location} onChange={handleInputChange} type="text" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Type</label>
                    <select name="type" value={formData.type} onChange={handleInputChange} className="w-full p-4 bg-gray-50 rounded-2xl outline-none">
                      <option value="Football">Football</option>
                      <option value="Cricket">Cricket</option>
                      <option value="Basketball">Basketball</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Price</label>
                    <input name="price" value={formData.price} onChange={handleInputChange} type="text" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg mt-4"
              >
                {loading ? "Saving..." : isEditing ? "Update Venue" : "Create Venue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueManagement;