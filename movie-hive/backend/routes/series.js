const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const BASE_URL = process.env.TMDB_SERIES_URL;
const BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;
const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/search';

//Route Search Movies
router.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ success: false, message: "Query parameter (q) is required." });
  }

  try {
    const response = await axios.get(`${TMDB_SEARCH_URL}/tv`, {
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
      message: "Searched series fetched successfully.",
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

// Fetch Popular Series
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
      message: "Fetched popular series successfully.",
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching popular series:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch popular series.",
      error: error.message,
    });
  }
});

// Fetch Top Rated Series
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
      message: "Fetched top-rated series successfully.",
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching top-rated series:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch top-rated series.",
      error: error.message,
    });
  }
});

// Fetch Airing Today Series
router.get("/airing-today", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/airing_today`, {
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
      message: "Fetched series airing today successfully.",
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching series airing today:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch series airing today.",
      error: error.message,
    });
  }
});

// Fetch On The Air Series
router.get("/on-the-air", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/on_the_air`, {
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
      message: "Fetched series on the air successfully.",
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching series on the air:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch series on the air.",
      error: error.message,
    });
  }
});

module.exports = router;
