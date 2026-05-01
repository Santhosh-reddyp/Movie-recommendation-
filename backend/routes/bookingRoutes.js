const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBookedSeatsByShow 
} = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/", authMiddleware, createBooking);
router.get("/my", authMiddleware, getMyBookings);
router.get("/seats/:showId", getBookedSeatsByShow);
module.exports = router;