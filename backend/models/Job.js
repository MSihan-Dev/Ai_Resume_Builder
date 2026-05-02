const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: String,
    company: String,
    description: String,
    requiredSkills: [String],
    keywords: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", jobSchema);
