const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");
const path = require("path");
const useragent = require("useragent");
const geoip = require("geoip-lite");
const { OAuth2Client } = require("google-auth-library");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const getCountryByIp = async (ip) => {
  const apiUrl = `http://ip-api.com/json/${ip}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    console.log("loc data", data)
    return data.country || 'Unknown';
  } catch (error) {
    console.error('Error fetching country by IP:', error.message);
    return 'Unknown';
  }
};

// Google Login Route
router.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1] || "",
        email,
        password: '',
        profilePicture: picture,
      });

      await user.save();

      await sendEmail(
        email,
        "Welcome to Movie Hive!",
        `Hi ${user.firstName}, welcome to Movie Hive! We're excited to have you on board.`,
        path.join(__dirname, "../html/signUp.html"),
        { firstName: user.firstName }
      );
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Google login successful",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: jwtToken,
      },
    });
  } catch (error) {
    console.error("Google Login Error:", error.message);
    res.status(401).json({
      success: false,
      message: "Google login failed",
    });
  }
});

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (firstName, lastName, email, password) are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await sendEmail(
      email,
      "Welcome to Movie Hive!",
      `Hi ${firstName}, welcome to Movie Hive! We're excited to have you on board.`,
      path.join(__dirname, "../html/signUp.html"),
      { firstName }
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (email, password) are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("token", token)

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Me Route
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Me API Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});


// Change password route
router.post("/change-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields (email, oldPassword, newPassword) are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    // ✅ Get IP (with fallback)
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      req.ip ||
      "Unknown";
    console.log("User IP:", ip);

    // ✅ Location (optional)
    const location = geoip.lookup(ip);
    const locationText = location
      ? `${location.city || ""}, ${location.region || ""}, ${location.country || ""}`
      : "Unknown";

    // ✅ User Agent
    const userAgentString = req.headers["user-agent"] || "Unknown";
    const agent = useragent.parse(userAgentString);

    const details = {
      ip,
      location: locationText,
      device: `${agent.device?.family || "Unknown"} ${agent.device?.model || "Unknown"}`,
      platform: agent.os?.toString() || "Unknown",
      browser: agent.toAgent() || "Unknown",
      timestamp: new Date().toLocaleString(),
    };

    // ✅ Send confirmation email
    await sendEmail(
      user.email,
      "Password Changed Successfully",
      `Hi ${user.firstName}, your password has been successfully changed.`,
      path.join(__dirname, "../html/passwordChanged.html"),
      { firstName: user.firstName, ...details }
    );

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change Password Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Forget Password Route
router.post("/forget-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    console.log("reset token", resetToken)

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await sendEmail(
      user.email,
      "Password Reset Request",
      `Hi ${user.firstName}, please use the link below to reset your password:`,
      path.join(__dirname, "../html/forgetPassword.html"),
      { firstName: user.firstName, resetLink }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error("Forget Password Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Reset Password Route
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ success: false, message: "Invalid or expired token." });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgentString = req.headers["user-agent"] || "Unknown";
    const geoip = require("geoip-lite");
    const location = geoip.lookup(ip);
    const useragent = require("useragent");
    const userAgent = useragent.parse(userAgentString);

    const details = {
      ip: ip || "Unknown",
      location: location ? `${location.city}, ${location.region}, ${location.country}` : "Unknown",
      device: `${userAgent.device?.vendor || "Unknown"} ${userAgent.device?.model || "Unknown"}`,
      browser: `${userAgent.ua?.name || "Unknown"} (${userAgent.os?.name || "Unknown"})`,
      timestamp: new Date().toLocaleString(),
    };

    await sendEmail(
      user.email,
      "Your Password Has Been Reset",
      `Hi ${user.firstName}, your password has been reset successfully.`,
      path.join(__dirname, "../html/resetPassword.html"),
      { firstName: user.firstName, ...details }
    );

    return res.status(200).json({ success: true, message: "Password reset successful. Email notification sent." });
  } catch (error) {
    console.error("Reset Password Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
});



module.exports = router;
