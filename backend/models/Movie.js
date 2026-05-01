const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, unique: true }, 
  description: String,
  duration: String,
  language: String,
  genre: String,
  image: String
});

module.exports = mongoose.model("Movie", movieSchema);