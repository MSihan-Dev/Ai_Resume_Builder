const express = require("express");
const router = express.Router();
const axios = require("axios");

// SMART MATCH ROUTE
router.post("/smart-match", async (req, res) => {
  try {
    const { resume, job } = req.body;

    const response = await axios.post("http://localhost:8000/smart-score", {
      text: resume,
      job: job,
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
