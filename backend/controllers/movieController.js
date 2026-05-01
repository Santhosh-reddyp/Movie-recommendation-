const Movie = require("../models/Movie");


exports.createMovie = async (req, res) => {
  try {
    let movie;

    if (Array.isArray(req.body)) {
      movie = await Movie.insertMany(req.body);
    } else {
      movie = await Movie.create(req.body);
    }

    res.json(movie);
  } catch (err) {
    res.status(500).json(err.message);
  }
};


exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json(err.message);
  }
};


exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(movie);
  } catch (err) {
    res.status(500).json(err.message);
  }
};


exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json("Movie deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.json("Movie added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Error adding movie");
  }
};