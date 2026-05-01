const express = require("express");
const router = express.Router();
const { createTheatre, getTheatres } = require("../controllers/theatreController");
router.post("/", createTheatre);
router.get("/", getTheatres);
module.exports = router;