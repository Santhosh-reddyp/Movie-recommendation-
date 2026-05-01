const Booking = require("../models/Booking");
const Show = require("../models/Show");


exports.createBooking = async (req, res) => {
  try {
    const { showId, seats } = req.body[0]; // ✅ now receiving seats array

    const show = await Show.findById(showId);

    if (!show) return res.status(404).json("Show not found");

   
    if (show.seatsAvailable < seats.length)
      return res.status(400).json("Not enough seats");

   
    const existingBookings = await Booking.find({ showId });

    const alreadyBookedSeats = existingBookings.flatMap(b => b.seats);

    const conflict = seats.some(seat => alreadyBookedSeats.includes(seat));

    if (conflict) {
      return res.status(400).json("Some seats already booked");
    }

    show.seatsAvailable -= seats.length;
    await show.save();

    
    const booking = new Booking({
      userId: req.user.id,
      showId,
      seats
    });

    await booking.save();

    res.json("Booking successful");
  } catch (err) {
    console.log(err);
    res.status(500).json("Booking failed");
  }
};
exports.getBookedSeatsByShow = async (req, res) => {
  try {
    const { showId } = req.params;

    const bookings = await Booking.find({ showId });

   
    const bookedSeats = bookings.flatMap((b) => b.seats);

    res.json(bookedSeats);
  } catch (err) {
    res.status(500).json("Error fetching seats");
  }
};
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate({
        path: "showId",
        populate: [
          { path: "movieId" },   
          { path: "theatreId" }  
        ]
      });

    res.json(bookings);
  } catch (err) {
    res.status(500).json("Error fetching bookings");
  }
};