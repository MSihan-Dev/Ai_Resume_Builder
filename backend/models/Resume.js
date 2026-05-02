const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, default: "Untitled Resume" },

    template: {
      type: String,
      enum: ["modern", "professional", "minimal"],
      default: "modern",
    },

    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      summary: String,
    },

    education: [
      {
        institution: String,
        degree: String,
        year: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        duration: String,
        description: String,
      },
    ],

    skills: [String],

    projects: [
      {
        title: String,
        description: String,
        link: String,
      },
    ],

    // 🔥 Versioning
    version: {
      type: Number,
      default: 1,
    },

    parentResume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },

    // 🤖 AI Analysis Result
    analysis: {
      score: Number,
      keywordsMatched: [String],
      missingKeywords: [String],
      suggestions: [String],
      readability: String,
    },

    // 📎 Uploaded file reference
    fileUrl: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Resume", resumeSchema);
