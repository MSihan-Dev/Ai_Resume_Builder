const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { saveMessage, getChat } = require("../controllers/chatController");

// ✅ MUST be functions
router.post("/save", protect, saveMessage);
router.get("/", protect, getChat);

module.exports = router;
