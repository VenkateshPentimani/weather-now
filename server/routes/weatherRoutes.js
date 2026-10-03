const express = require("express");

const {
  getWeather,
  getSearchHistory,
} = require("../controllers/weatherController");

const router = express.Router();

router.get("/", getWeather);

router.get("/history", getSearchHistory);

module.exports = router;