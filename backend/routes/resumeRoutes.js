const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const pdfParse = require("pdf-parse-fork"); // ✅ ONLY THIS

const Resume = require("../models/Resume");

const upload = multer({ dest: "uploads/" });

/* =========================
   📄 ANALYZE RESUME
========================= */

router.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const dataBuffer = fs.readFileSync(file.path);

    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    const response = await axios.post("http://127.0.0.1:8000/analyze", {
      text,
      job_description: "React Node MongoDB developer",
    });

    return res.json(response.data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

/* =========================
   💾 SAVE RESUME
========================= */

router.post("/", async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
