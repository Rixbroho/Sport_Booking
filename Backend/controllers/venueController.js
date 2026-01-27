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

module.exports = { createVenue, getAllVenues };
