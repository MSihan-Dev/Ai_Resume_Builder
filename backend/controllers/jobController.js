const Job = require("../models/Job");
const Resume = require("../models/Resume");

exports.matchResumeToJob = async (req, res) => {
  const { resumeId, jobId } = req.body;

  const resume = await Resume.findById(resumeId);
  const job = await Job.findById(jobId);

  if (!resume || !job) {
    return res.status(404).json({ message: "Data not found" });
  }

  const resumeSkills = resume.skills || [];
  const requiredSkills = job.requiredSkills || [];

  const matched = resumeSkills.filter((skill) =>
    requiredSkills.includes(skill),
  );

  const score = (matched.length / requiredSkills.length) * 100 || 0;

  res.json({
    matchScore: score,
    matchedSkills: matched,
    missingSkills: requiredSkills.filter(
      (skill) => !resumeSkills.includes(skill),
    ),
  });
};
