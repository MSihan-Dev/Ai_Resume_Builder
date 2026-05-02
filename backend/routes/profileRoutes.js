const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const {
  parseLinkedIn,
  githubProfile,
} = require("../controllers/profileController");

// 🔗 GitHub profile
router.get("/github/:username", githubProfile);

// 💼 LinkedIn PDF upload + parse
router.post("/linkedin", upload.single("profile"), parseLinkedIn);

// 💬 Chatbot route
router.post("/chat", chatBot);

module.exports = router;
