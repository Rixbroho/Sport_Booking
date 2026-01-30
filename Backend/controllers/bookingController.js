const Booking = require("../models/bookingModel");

exports.createBooking = async (req, res) => {
  try {
    // Log this to your terminal to see what's actually inside your token
    console.log("Token Data:", req.user);

    // Prevent double-booking: check if the same venue/date/time already exists
    const { venueId, date, time } = req.body;
    const existing = await Booking.findOne({ where: { venueId, date, time } });
    if (existing) {
      return res.status(409).json({ success: false, message: "Selected time slot is already booked for this venue." });
    }

    const newBooking = await Booking.create({
      ...req.body,
      userId: req.user.id,
      // Fallback logic: if username is missing from token, use "User" or email
      userName: req.user.username || req.user.email || "Guest User",
      status: "Pending"
    });

    res.status(201).json({ success: true, booking: newBooking });
  } catch (error) {
    console.error("Booking Create Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ 
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Return bookings for a specific venue on a specific date (used to show unavailable time slots)
exports.getBookingsForVenue = async (req, res) => {
  try {
    const { venueId, date } = req.query;
    if (!venueId || !date) {
      return res.status(400).json({ success: false, message: 'venueId and date are required' });
    }

    const bookings = await Booking.findAll({ where: { venueId, date } });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Booking.update({ status }, { where: { id } });
    res.json({ success: true, message: `Booking ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const { sequelize } = require("../database/db");
    const { Op } = require("sequelize");

    // Get total bookings
    const totalBookings = await Booking.count();

    // Get bookings today (created on current date)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const bookingsToday = await Booking.count({
      where: {
        createdAt: {
          [Op.gte]: today,
          [Op.lt]: tomorrow
        }
      }
    });

    // Get pending bookings
    const pendingBookings = await Booking.count({
      where: { status: "Pending" }
    });

    // Calculate total revenue from confirmed bookings
    const confirmedBookings = await Booking.findAll({
      where: { status: "Confirmed" },
      raw: true
    });

    const totalRevenue = confirmedBookings.reduce((sum, booking) => {
      const price = parseInt(booking.price?.replace(/[^\d]/g, '') || 0);
      return sum + price;
    }, 0);

    res.json({
      success: true,
      stats: {
        totalBookings,
        bookingsToday,
        pendingBookings,
        totalRevenue
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};