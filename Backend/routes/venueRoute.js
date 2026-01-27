const express = require("express");
const router = express.Router();

const { createVenue, getAllVenues } = require("../controllers/venueController");
const authGuard = require("../helpers/authguagrd");
const isAdmin = require("../helpers/isAdmin");

router.post("/venue", authGuard, isAdmin, createVenue);
router.get("/venue", getAllVenues);

module.exports = router;
