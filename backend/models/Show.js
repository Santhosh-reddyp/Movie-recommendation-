const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  theatreId: { type: mongoose.Schema.Types.ObjectId, ref: "Theatre" },

  screen: String,
  showTime: String,
  date: String,

  pricing: {
    gold: Number,
    silver: Number
  },
  movieId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Movie"
},
theatreId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Theatre"
},

  seatsAvailable: Number
});

module.exports = mongoose.model("Show", showSchema);