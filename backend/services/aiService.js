const axios = require("axios");

const AI_SERVICE_URL = "http://localhost:8000/analyze";

exports.analyzeResume = async (text, jobDescription) => {
  try {
    const response = await axios.post(AI_SERVICE_URL, {
      text,
      job_description: jobDescription,
    });

    return response.data;
  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw new Error("AI analysis failed");
  }
};
