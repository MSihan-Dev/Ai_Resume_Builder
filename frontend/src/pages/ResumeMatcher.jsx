import { useState } from "react";
import API from "../api/axios";

const ResumeMatcher = () => {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState(null);

  const handleMatch = async () => {
    const res = await API.post("/jobs/match", {
      resume,
      job,
    });

    setResult(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 ATS Resume Matcher</h1>

      <textarea
        placeholder="Paste Resume"
        onChange={(e) => setResume(e.target.value)}
      />

      <textarea
        placeholder="Paste Job Description"
        onChange={(e) => setJob(e.target.value)}
      />

      <button onClick={handleMatch}>Check Match</button>

      {result && <h2>Match Score: {result.matchScore}%</h2>}
    </div>
  );
};

export default ResumeMatcher;
