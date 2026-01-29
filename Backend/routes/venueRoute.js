const express = require("express");
const router = express.Router();

const { createVenue, getAllVenues ,updateVenue, deleteVenue } = require("../controllers/venueController");
const authGuard = require("../helpers/authguagrd");
const isAdmin = require("../helpers/isAdmin");

router.post("/venue", authGuard, isAdmin, createVenue);
router.get("/venue", getAllVenues);
router.put("/venue/:id", authGuard, isAdmin, updateVenue); // NEW
router.delete("/venue/:id", authGuard, isAdmin, deleteVenue); // NEW

module.exports = router;
