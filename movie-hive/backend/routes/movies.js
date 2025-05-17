const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const BASE_URL = process.env.TMDB_MOVIE_URL;
const BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;
const SEARCH_URL = process.env.TMDB_SEARCH_URL;

//Route Search Movies
router.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ success: false, message: "Query parameter (q) is required." });
  }

  try {
    const response = await axios.get(`${SEARCH_URL}/movie`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      params: {
        query: query,
        language: req.query.language || "en-US",
        page: req.query.page || 1,
      },
    });

    res.json({
      success: true,
      message: "Searched movies fetched successfully.",
      data: response.data,
    });
  } catch (error) {
    console.error("Error searching movies:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to search movies.",
      error: error.message,
    });
  }
});

// Fetch Popular Movies
router.get("/popular", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/popular`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      params: {
        language: req.query.language || "en-US",
        page: req.query.page || 1,
      },
    });

    res.json({
      success: true,
      message: "Fetched popular movies successfully.",
      data: response.data,
    });
  } catch (error) {
    console.log(error)
    console.error("Error fetching popular movies:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch popular movies.",
      error: error.message,
    });
  }
});

// Fetch Top Rated Movies
router.get("/top-rated", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/top_rated`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      params: {
        language: req.query.language || "en-US",
        page: req.query.page || 1,
      },
    });

    res.json({
      success: true,
      message: "Fetched top-rated movies successfully.",
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching top-rated movies:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch top-rated movies.",
      error: error.message,
    });
  }
});

// Fetch Now Playing Movies
router.get("/now-playing", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/now_playing`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      params: {
        language: req.query.language || "en-US",
        page: req.query.page || 1,
      },
    });

    res.json({
      success: true,
      message: "Fetched now-playing movies successfully.",
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching now-playing movies:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch now-playing movies.",
      error: error.message,
    });
  }
});

// Fetch Upcoming Movies
router.get("/upcoming", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/upcoming`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      params: {
        language: req.query.language || "en-US",
        page: req.query.page || 1,
      },
    });

    res.json({
      success: true,
      message: "Fetched upcoming movies successfully.",
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching upcoming movies:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch upcoming movies.",
      error: error.message,
    });
  }
});

module.exports = router;
