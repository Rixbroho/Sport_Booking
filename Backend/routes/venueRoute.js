const express = require("express");
const router = express.Router();

const { createVenue, getAllVenues ,updateVenue, deleteVenue } = require("../controllers/venueController");
const authGuard = require("../helpers/authguagrd");
const isAdmin = require("../helpers/isAdmin");
const fileUpload = require("../helpers/multer");

router.post("/venue", authGuard, isAdmin, fileUpload("image"), createVenue);
router.get("/venue", getAllVenues);
router.put("/venue/:id", authGuard, isAdmin, fileUpload("image"), updateVenue);
router.delete("/venue/:id", authGuard, isAdmin, deleteVenue);

module.exports = router;
