const Show = require("../models/Show");

exports.createShow = async (req, res) => {
  try {
    const shows = await Show.insertMany(req.body);
    res.json(shows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getShows = async (req, res) => {
  try {
    const shows = await Show.find()
      .populate("movieId")
      .populate("theatreId");
    res.json(shows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};