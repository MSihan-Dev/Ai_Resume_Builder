const fs = require("fs");
const pdfParse = require("pdf-parse");
const { analyzeResume } = require("../services/aiService");

// Upload & Analyze Resume
exports.uploadAndAnalyze = async (req, res) => {
  try {
    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    const extractedText = pdfData.text;

    const jobDescription = req.body.jobDescription || "";

    // Call AI microservice
    const analysis = await analyzeResume(extractedText, jobDescription);

    const resume = await Resume.create({
      user: req.user._id,
      title: "Uploaded Resume",
      fileUrl: filePath,
      analysis,
    });

    res.json({
      message: "Resume analyzed successfully",
      analysis,
      resume,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
