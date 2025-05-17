const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const BASE_URL = "https://imdb-com.p.rapidapi.com/news/get-by-category";
const API_KEY = process.env.RAPID_API_KEY; // Ensure you have this key in your .env file
const RAPIDAPI_HOST = "imdb-com.p.rapidapi.com";

router.get("/top-headlines", async (req, res) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: { category: "TOP" },
            headers: {
                "X-RapidAPI-Key": API_KEY,
                "X-RapidAPI-Host": RAPIDAPI_HOST,
            },
        });

        res.json({
            success: true,
            message: "Fetched top headlines successfully.",
            data: response.data,
        });
    } catch (error) {
        console.error("Error fetching top headlines:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch top headlines.",
            error: error.message,
        });
    }
});

module.exports = router;
