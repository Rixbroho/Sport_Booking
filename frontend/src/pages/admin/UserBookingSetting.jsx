
import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";

const UserBookingSetting = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings data (replace with 
    setBookings([
      { id: 1, user: "John Doe", venue: "Venue A", date: "2023-10-01", status: "Confirmed" },
      { id: 2, user: "Jane Smith", venue: "Venue B", date: "2023-10-02", status: "Pending" },
    ]);
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit booking with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete booking with ID: ${id}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Bookings</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-3 text-left">User</th>
            <th className="border border-gray-200 p-3 text-left">Venue</th>
            <th className="border border-gray-200 p-3 text-left">Date</th>
            <th className="border border-gray-200 p-3 text-left">Status</th>
            <th className="border border-gray-200 p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-3">{booking.user}</td>
              <td className="border border-gray-200 p-3">{booking.venue}</td>
              <td className="border border-gray-200 p-3">{booking.date}</td>
              <td className="border border-gray-200 p-3">{booking.status}</td>
              <td className="border border-gray-200 p-3 text-center">
                <button
                  onClick={() => handleEdit(booking.id)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(booking.id)}
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

export default UserBookingSetting;