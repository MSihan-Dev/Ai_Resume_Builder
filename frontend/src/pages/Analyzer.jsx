import { useState } from "react";
import API from "../api/axios";

const Analyzer = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setFile(file);
        setFileName(file.name);
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
      setFileName(file.name);
    } else if (file) {
      alert("Please upload a PDF file");
      e.target.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a resume (PDF format)");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setResult(null);

      const res = await API.post("/resume/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult({
        score: res.data.smartScore || 0,
        skills: res.data.analysis?.skills || [],
        missingKeywords: res.data.analysis?.missingKeywords || [],
        suggestions: res.data.analysis?.suggestions || [],
        atsScore: res.data.analysis?.atsScore || 0,
        readability: res.data.analysis?.readability || 0,
        formatScore: res.data.analysis?.formatScore || 0,
      });
    } catch (err) {
      console.log(err);
      alert("❌ Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Average";
    if (score >= 40) return "Needs Work";
    return "Poor";
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div style={container}>
      {/* Header */}
      <div style={header}>
        <h1 style={title}>
          <span style={titleIcon}>🤖</span>
          AI Resume Analyzer
        </h1>
        <p style={subtitle}>
          Upload your resume and get instant AI-powered analysis with actionable
          insights
        </p>
      </div>

      {/* Upload Section */}
      <div style={uploadSection}>
        <div
          style={{
            ...uploadCard,
            ...(dragActive && uploadCardActive),
            ...(file && uploadCardSuccess),
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div style={uploadIcon}>{file ? "📄" : "📤"}</div>
          <h3 style={uploadTitle}>
            {file ? "Resume Ready" : "Upload Your Resume"}
          </h3>
          <p style={uploadText}>
            {file
              ? fileName
              : "Drag & drop your PDF file here or click to browse"}
          </p>
          {file && (
            <div style={fileInfo}>
              <span>📄 {fileName}</span>
              <span>🔒 PDF • {formatFileSize(file.size)}</span>
            </div>
          )}
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={fileInput}
            id="file-upload"
          />
          <label htmlFor="file-upload" style={browseBtn}>
            {file ? "Change File" : "Browse Files"}
          </label>
        </div>

        <button
          onClick={handleUpload}
          style={{
            ...analyzeBtn,
            ...(loading && analyzeBtnDisabled),
          }}
          disabled={loading || !file}
        >
          {loading ? (
            <>
              <span style={spinner}></span>
              Analyzing Resume...
            </>
          ) : (
            "Start Analysis"
          )}
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <div style={resultsContainer}>
          {/* Main Score Card */}
          <div style={mainScoreCard}>
            <div style={scoreCircle}>
              <svg style={circleSvg} viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={getScoreColor(result.score)}
                  strokeWidth="8"
                  strokeDasharray={`${(result.score / 100) * 283} 283`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: "stroke-dasharray 1s ease" }}
                />
              </svg>
              <div style={scoreText}>
                <div style={scoreValue}>{result.score}</div>
                <div style={scoreLabel}>Overall Score</div>
              </div>
            </div>
            <div style={scoreDetails}>
              <div style={scoreGrade}>
                <span style={gradeLabel}>Grade</span>
                <span
                  style={{ ...gradeValue, color: getScoreColor(result.score) }}
                >
                  {getScoreGrade(result.score)}
                </span>
              </div>
              <div style={scoreMetrics}>
                <div style={metric}>
                  <span style={metricLabel}>ATS Score</span>
                  <span style={metricValue}>
                    {result.atsScore || result.score}%
                  </span>
                </div>
                <div style={metric}>
                  <span style={metricLabel}>Readability</span>
                  <span style={metricValue}>{result.readability || 75}%</span>
                </div>
                <div style={metric}>
                  <span style={metricLabel}>Formatting</span>
                  <span style={metricValue}>{result.formatScore || 70}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={statsGrid}>
            <div style={statCard}>
              <div style={statIcon}>🎯</div>
              <div style={statContent}>
                <div style={statValue}>
                  {result.score >= 70
                    ? "High"
                    : result.score >= 40
                      ? "Medium"
                      : "Low"}
                </div>
                <div style={statLabel}>Match Rate</div>
              </div>
            </div>
            <div style={statCard}>
              <div style={statIcon}>📊</div>
              <div style={statContent}>
                <div style={statValue}>{result.skills?.length || 0}</div>
                <div style={statLabel}>Skills Found</div>
              </div>
            </div>
            <div style={statCard}>
              <div style={statIcon}>⚠️</div>
              <div style={statContent}>
                <div style={statValue}>
                  {result.missingKeywords?.length || 0}
                </div>
                <div style={statLabel}>Missing Keywords</div>
              </div>
            </div>
            <div style={statCard}>
              <div style={statIcon}>💡</div>
              <div style={statContent}>
                <div style={statValue}>{result.suggestions?.length || 0}</div>
                <div style={statLabel}>Suggestions</div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div style={sectionCard}>
            <div style={sectionHeader}>
              <h3 style={sectionTitle}>
                <span style={sectionIcon}>🧠</span>
                Detected Skills
              </h3>
              <span style={sectionBadge}>
                {result.skills?.length || 0} skills
              </span>
            </div>
            <div style={tagWrap}>
              {result.skills?.length > 0 ? (
                result.skills.map((s, i) => (
                  <span key={i} style={tag}>
                    {s}
                  </span>
                ))
              ) : (
                <p style={emptyText}>
                  No skills detected. Try adding more technical keywords.
                </p>
              )}
            </div>
          </div>

          {/* Missing Keywords */}
          <div style={sectionCard}>
            <div style={sectionHeader}>
              <h3 style={sectionTitle}>
                <span style={sectionIcon}>⚠️</span>
                Missing Keywords
              </h3>
              <span
                style={{
                  ...sectionBadge,
                  background: "#fee2e2",
                  color: "#dc2626",
                }}
              >
                {result.missingKeywords?.length || 0} missing
              </span>
            </div>
            <div style={missingWrap}>
              {result.missingKeywords?.length > 0 ? (
                result.missingKeywords.map((k, i) => (
                  <span key={i} style={missingTag}>
                    {k}
                  </span>
                ))
              ) : (
                <p style={successText}>
                  🎉 Great job! Your resume contains all key keywords!
                </p>
              )}
            </div>
          </div>

          {/* Suggestions */}
          <div style={sectionCard}>
            <div style={sectionHeader}>
              <h3 style={sectionTitle}>
                <span style={sectionIcon}>💡</span>
                AI Improvement Suggestions
              </h3>
            </div>
            <div style={suggestionsList}>
              {result.suggestions?.length > 0 ? (
                result.suggestions.map((s, i) => (
                  <div key={i} style={suggestionItem}>
                    <span style={suggestionIcon}>✓</span>
                    <span style={suggestionText}>{s}</span>
                  </div>
                ))
              ) : (
                <p style={successText}>
                  ✨ Your resume looks great! No major issues found.
                </p>
              )}
            </div>
          </div>

          {/* AI Summary */}
          <div style={summaryCard}>
            <div style={summaryHeader}>
              <span style={summaryIcon}>🧠</span>
              <h3 style={summaryTitle}>AI Feedback Summary</h3>
            </div>
            <p style={summaryText}>
              Your resume shows a{" "}
              <strong style={{ color: getScoreColor(result.score) }}>
                {result.score}% alignment
              </strong>{" "}
              with the target role.{" "}
              {result.skills?.length > 0 ? (
                <>
                  You have strong experience in{" "}
                  <strong>{result.skills.slice(0, 3).join(", ")}</strong>
                  {result.skills.length > 3 &&
                    ` and ${result.skills.length - 3} more skills`}
                  .{" "}
                </>
              ) : (
                "Your technical skill coverage is currently limited. "
              )}
              {result.missingKeywords?.length > 0 ? (
                <>
                  However, you are missing key terms such as{" "}
                  <strong>
                    {result.missingKeywords.slice(0, 3).join(", ")}
                  </strong>
                  {result.missingKeywords.length > 3 &&
                    ` and ${result.missingKeywords.length - 3} more`}
                  .{" "}
                </>
              ) : (
                "You are aligned well with job keywords. "
              )}
              {result.suggestions?.length > 0 ? (
                <>
                  Key improvement areas include:{" "}
                  <strong>{result.suggestions[0].toLowerCase()}</strong>.
                </>
              ) : (
                "Overall your resume is well structured and optimized."
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// =====================
// STYLES
// =====================
const container = {
  padding: "24px",
  maxWidth: "1200px",
  margin: "0 auto",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const header = {
  marginBottom: "32px",
};

const title = {
  fontSize: "28px",
  fontWeight: "700",
  background: "linear-gradient(135deg, #1e293b, #334155)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: "8px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const titleIcon = {
  fontSize: "32px",
};

const subtitle = {
  fontSize: "14px",
  color: "#64748b",
  margin: 0,
};

const uploadSection = {
  marginBottom: "32px",
};

const uploadCard = {
  background: "white",
  borderRadius: "20px",
  padding: "40px",
  textAlign: "center",
  border: "2px dashed #cbd5e1",
  transition: "all 0.3s ease",
  cursor: "pointer",
  marginBottom: "20px",
};

const uploadCardActive = {
  borderColor: "#3b82f6",
  background: "#eff6ff",
};

const uploadCardSuccess = {
  borderColor: "#10b981",
  background: "#f0fdf4",
};

const uploadIcon = {
  fontSize: "48px",
  marginBottom: "16px",
};

const uploadTitle = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#1e293b",
  marginBottom: "8px",
};

const uploadText = {
  fontSize: "14px",
  color: "#64748b",
  marginBottom: "16px",
};

const fileInfo = {
  background: "#f1f5f9",
  padding: "8px 16px",
  borderRadius: "8px",
  display: "inline-flex",
  gap: "12px",
  fontSize: "12px",
  color: "#334155",
  marginBottom: "16px",
};

const fileInput = {
  display: "none",
};

const browseBtn = {
  background: "#f1f5f9",
  color: "#3b82f6",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.2s",
  border: "none",
};

const analyzeBtn = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const analyzeBtnDisabled = {
  opacity: 0.6,
  cursor: "not-allowed",
};

const spinner = {
  width: "16px",
  height: "16px",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderTopColor: "white",
  borderRadius: "50%",
  animation: "spin 0.6s linear infinite",
};

const resultsContainer = {
  animation: "fadeIn 0.5s ease",
};

const mainScoreCard = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: "20px",
  padding: "24px",
  marginBottom: "24px",
  display: "flex",
  alignItems: "center",
  gap: "32px",
  flexWrap: "wrap",
  color: "white",
};

const scoreCircle = {
  position: "relative",
  width: "140px",
  height: "140px",
};

const circleSvg = {
  width: "100%",
  height: "100%",
};

const scoreText = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
};

const scoreValue = {
  fontSize: "36px",
  fontWeight: "700",
};

const scoreLabel = {
  fontSize: "10px",
  opacity: 0.8,
};

const scoreDetails = {
  flex: 1,
};

const scoreGrade = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  paddingBottom: "16px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
};

const gradeLabel = {
  fontSize: "14px",
  opacity: 0.8,
};

const gradeValue = {
  fontSize: "24px",
  fontWeight: "700",
};

const scoreMetrics = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
};

const metric = {
  textAlign: "center",
};

const metricLabel = {
  fontSize: "11px",
  opacity: 0.8,
  marginBottom: "4px",
};

const metricValue = {
  fontSize: "18px",
  fontWeight: "600",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
  marginBottom: "24px",
};

const statCard = {
  background: "white",
  borderRadius: "16px",
  padding: "20px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const statIcon = {
  fontSize: "32px",
};

const statContent = {
  flex: 1,
};

const statValue = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1e293b",
};

const statLabel = {
  fontSize: "12px",
  color: "#64748b",
};

const sectionCard = {
  background: "white",
  borderRadius: "16px",
  padding: "24px",
  marginBottom: "24px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  flexWrap: "wrap",
  gap: "12px",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1e293b",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  margin: 0,
};

const sectionIcon = {
  fontSize: "20px",
};

const sectionBadge = {
  background: "#dcfce7",
  color: "#166534",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "500",
};

const tagWrap = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const tag = {
  background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
  color: "#1e40af",
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "500",
};

const missingWrap = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const missingTag = {
  background: "#fee2e2",
  color: "#dc2626",
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "500",
};

const suggestionsList = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const suggestionItem = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  background: "#f8fafc",
  borderRadius: "10px",
};

const suggestionIcon = {
  width: "24px",
  height: "24px",
  background: "#3b82f6",
  color: "white",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
};

const suggestionText = {
  fontSize: "13px",
  color: "#334155",
  lineHeight: "1.5",
};

const summaryCard = {
  background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
  borderRadius: "16px",
  padding: "24px",
  marginTop: "8px",
};

const summaryHeader = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "16px",
};

const summaryIcon = {
  fontSize: "24px",
};

const summaryTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1e293b",
  margin: 0,
};

const summaryText = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#475569",
  margin: 0,
};

const emptyText = {
  color: "#94a3b8",
  fontSize: "13px",
};

const successText = {
  color: "#10b981",
  fontSize: "13px",
  fontWeight: "500",
};

// Add CSS animations
const globalStyles = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${browseBtn}:hover {
    background: #e2e8f0;
    transform: translateY(-2px);
  }

  ${analyzeBtn}:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
  }

  ${tag}:hover, ${missingTag}:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    ${container} {
      padding: 16px;
    }
    
    ${title} {
      font-size: 24px;
    }
    
    ${mainScoreCard} {
      flex-direction: column;
      text-align: center;
    }
    
    ${scoreMetrics} {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    
    ${uploadCard} {
      padding: 24px;
    }
    
    ${statsGrid} {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    ${statsGrid} {
      grid-template-columns: 1fr;
    }
    
    ${sectionHeader} {
      flex-direction: column;
      align-items: flex-start;
    }
    
    ${scoreCircle} {
      width: 120px;
      height: 120px;
    }
  }
`;

// Inject global styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = globalStyles;
  document.head.appendChild(styleSheet);
}

export default Analyzer;
