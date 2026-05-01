const Theatre = require("../models/Theatre");


exports.createTheatre = async (req, res) => {
  try {
    const theatres = await Theatre.insertMany(req.body);
    res.json(theatres);
  } catch (err) {
    res.status(500).json(err.message);
  }
};


exports.getTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find();
    res.json(theatres);
  } catch (err) {
    res.status(500).json(err.message);
  }
};