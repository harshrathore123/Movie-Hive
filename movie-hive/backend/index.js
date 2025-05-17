const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database');
const authRoutes = require('./routes/auth');
const aiRoutes = require("./routes/ai");
const movieRoutes = require("./routes/movies");
const seriesRoutes = require("./routes/series");
const newsRoutes = require("./routes/news"); // Import the news route

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/news", newsRoutes); // Add news API route

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
