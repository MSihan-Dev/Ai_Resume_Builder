import { useState } from "react";
import API from "../api/axios";

export default function UploadBox() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("resume", file);

    const { data } = await API.post("/resumes/upload", formData);

    setResult(data.analysis);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={upload} className="bg-green-500 text-white px-4 py-2">
        Analyze
      </button>

      {result && (
        <div className="mt-4">
          <h2>Score: {result.score}</h2>
          <p>Suggestions: {result.suggestions.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
