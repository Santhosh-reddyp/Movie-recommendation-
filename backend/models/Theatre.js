const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
  name: String,
  location: String,
  screens: Number
});

module.exports = mongoose.model("Theatre", theatreSchema);