const express = require("express");
const axios = require("axios");
require("dotenv").config();


const router = express.Router();

const GEMINI_URL = process.env.GEMINI_API_URL;
const API_KEY = process.env.GEMINI_API_KEY;

// Ask AI
router.post("/ask-ai", async (req, res) => {
    const { query } = req.body;
  
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query is required.",
      });
    }
  
    try {
      const response = await axios.post(
        GEMINI_URL,
        {
          contents: [
            {
              parts: [
                { text: `Answer this movie or web series related query: ${query}` },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            key: API_KEY,
          },
        }
      );
  
      if (response.data.candidates && response.data.candidates[0]?.content?.parts[0]?.text) {
        const aiResponse = response.data.candidates[0].content.parts[0].text;
        return res.json({
          success: true,
          message: "AI response generated successfully.",
          data: aiResponse,
        });
      } else {
        return res.json({
          success: false,
          message: "No AI response generated.",
        });
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
      res.status(500).json({
        success: false,
        message: "Failed to generate AI response.",
        error: error.message,
      });
    }
  });
  

module.exports = router;
