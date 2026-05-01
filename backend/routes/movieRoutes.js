const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie
} = require("../controllers/movieController");
const isAdmin = (req, res, next) => {
  if (req.user?.email === "admin@gmail.com") {
    next();
  } else {
    return res.status(403).json("Access denied");
  }
};
router.post("/", auth, createMovie);
router.get("/", auth, getMovies);
router.put("/:id", auth, isAdmin, updateMovie);
router.delete("/:id", auth, isAdmin, deleteMovie);
module.exports = router;