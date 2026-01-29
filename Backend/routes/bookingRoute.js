const router = require("express").Router();
const bookingController = require("../controllers/bookingController");
const authGuard = require("../helpers/authguagrd"); // Fixed filename match
const isAdmin = require("../helpers/isAdmin");

// User routes
router.post("/booking", authGuard, bookingController.createBooking);
router.get("/booking/user", authGuard, bookingController.getUserBookings);

// Admin routes
router.get("/booking", authGuard, isAdmin, bookingController.getAllBookings);
router.put("/booking/:id/status", authGuard, isAdmin, bookingController.updateBookingStatus);
router.get("/dashboard/stats", authGuard, isAdmin, bookingController.getDashboardStats);

module.exports = router;