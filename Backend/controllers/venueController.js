const Venue = require("../models/venueModel");

const createVenue = async (req, res) => {
  try {
    const { name, location, type, price, rating, image } = req.body;

    if (!name || !location || !type || !price) {
      return res.status(400).json({ message: "All fields required" });
    }

    const venue = await Venue.create({
      name,
      location,
      type,
      price,
      rating,
      image,
    });

    res.status(201).json({
      success: true,
      venue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.findAll();
    res.json({ success: true, venues });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Add these to venueController.js

const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, type, price, rating, image, availability } = req.body;
    
    const venue = await Venue.findByPk(id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });

    await venue.update({ name, location, type, price, rating, image, availability });

    res.json({ success: true, message: "Venue updated successfully", venue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Venue.findByPk(id);
    
    if (!venue) return res.status(404).json({ message: "Venue not found" });

    await venue.destroy();
    res.json({ success: true, message: "Venue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update your exports
module.exports = { createVenue, getAllVenues, updateVenue, deleteVenue };
