
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit } from "lucide-react";

const VenueManagement = () => {
  const [venues, setVenues] = useState([]);
  const [newVenue, setNewVenue] = useState({ name: "", location: "" });

  useEffect(() => {
    // Fetch venues data (replace with actual API call)
    setVenues([
      { id: 1, name: "Greenfield Arena", location: "Downtown" },
      { id: 2, name: "Skyline Turf", location: "Uptown" },
    ]);
  }, []);

  const handleAddVenue = () => {
    if (!newVenue.name || !newVenue.location) {
      alert("Please fill in all fields");
      return;
    }
    // Add venue logic (replace with actual API call)
    setVenues([...venues, { id: Date.now(), ...newVenue }]);
    setNewVenue({ name: "", location: "" });
  };

  const handleDeleteVenue = (id) => {
    // Delete venue logic (replace with actual API call)
    setVenues(venues.filter((venue) => venue.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Venue Management</h2>

      {/* Add New Venue Form */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Add New Ground</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Venue Name"
            value={newVenue.name}
            onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })}
            className="flex-1 p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Location"
            value={newVenue.location}
            onChange={(e) =>
              setNewVenue({ ...newVenue, location: e.target.value })
            }
            className="flex-1 p-3 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleAddVenue}
            className="bg-emerald-500 text-white px-4 py-3 rounded-lg hover:bg-emerald-600 flex items-center gap-2"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>

      {/* Venue List */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-3 text-left">Venue Name</th>
            <th className="border border-gray-200 p-3 text-left">Location</th>
            <th className="border border-gray-200 p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-3">{venue.name}</td>
              <td className="border border-gray-200 p-3">{venue.location}</td>
              <td className="border border-gray-200 p-3 text-center">
                <button
                  onClick={() => console.log(`Edit venue with ID: ${venue.id}`)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteVenue(venue.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VenueManagement;