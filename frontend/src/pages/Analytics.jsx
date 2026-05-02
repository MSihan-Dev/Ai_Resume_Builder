import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const Analytics = () => {
  const [resumeScore, setResumeScore] = useState(70);
  const [skillScore, setSkillScore] = useState(60);
  const [experienceScore, setExperienceScore] = useState(75);
  const [educationScore, setEducationScore] = useState(85);
  const [formattingScore, setFormattingScore] = useState(65);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => setLoading(false), 500);

    // Fetch real data from localStorage or API
    const resumeData = JSON.parse(localStorage.getItem("resume") || "{}");
    if (resumeData) {
      // Calculate scores based on resume data
      calculateScores(resumeData);
    }
  }, []);

  const calculateScores = (resumeData) => {
    // Simple scoring logic based on resume completeness
    let skills = 60;
    let experience = 75;
    let education = 85;
    let formatting = 65;

    if (resumeData.skills && resumeData.skills.length > 5) skills += 20;
    if (resumeData.skills && resumeData.skills.length > 10) skills += 10;

    if (resumeData.experience && resumeData.experience.length > 100)
      experience += 15;
    if (resumeData.experience && resumeData.experience.includes("achieved"))
      experience += 10;

    setSkillScore(Math.min(skills, 100));
    setExperienceScore(Math.min(experience, 100));
    setEducationScore(Math.min(education, 100));
    setFormattingScore(Math.min(formatting, 100));
    setResumeScore(
      Math.min(
        Math.floor((skills + experience + education + formatting) / 4),
        100,
      ),
    );
  };

  const barData = [
    { name: "Skills", score: skillScore, fill: "#3b82f6" },
    { name: "Experience", score: experienceScore, fill: "#10b981" },
    { name: "Education", score: educationScore, fill: "#8b5cf6" },
    { name: "Formatting", score: formattingScore, fill: "#f59e0b" },
  ];

  const pieData = [
    { name: "Skills", value: skillScore, color: "#3b82f6" },
    { name: "Experience", value: experienceScore, color: "#10b981" },
    { name: "Education", value: educationScore, color: "#8b5cf6" },
    { name: "Formatting", value: formattingScore, color: "#f59e0b" },
    { name: "Missing", value: 100 - resumeScore, color: "#e2e8f0" },
  ];

  const trendData = [
    { month: "Jan", score: 45 },
    { month: "Feb", score: 52 },
    { month: "Mar", score: 58 },
    { month: "Apr", score: 63 },
    { month: "May", score: 68 },
    { month: "Jun", score: resumeScore },
  ];

  const radarData = [
    { subject: "Skills", score: skillScore, fullMark: 100 },
    { subject: "Experience", score: experienceScore, fullMark: 100 },
    { subject: "Education", score: educationScore, fullMark: 100 },
    { subject: "Formatting", score: formattingScore, fullMark: 100 },
    { subject: "Keywords", score: 55, fullMark: 100 },
    { subject: "Length", score: 70, fullMark: 100 },
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B+";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    return "D";
  };

  const getRecommendations = () => {
    const recommendations = [];
    if (skillScore < 70)
      recommendations.push("Add more relevant skills to your resume");
    if (experienceScore < 70)
      recommendations.push(
        "Quantify your achievements with numbers and metrics",
      );
    if (formattingScore < 70)
      recommendations.push(
        "Improve resume formatting and use professional templates",
      );
    if (educationScore < 70)
      recommendations.push("Include relevant courses and certifications");
    if (resumeScore < 60)
      recommendations.push("Consider using AI to optimize your resume content");
    return recommendations;
  };

  if (loading) {
    return (
      <div style={loadingContainer}>
        <div style={spinner}></div>
        <p style={loadingText}>Analyzing your resume...</p>
      </div>
    );
  }

  return (
    <div style={container}>
      {/* Header */}
      <div style={header}>
        <h1 style={title}>
          <span style={titleIcon}>📊</span>
          Resume Analytics
        </h1>
        <p style={subtitle}>
          Comprehensive analysis of your resume performance
        </p>
      </div>

      {/* Overall Score Card */}
      <div style={overallCard}>
        <div style={overallScore}>
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
                stroke={getScoreColor(resumeScore)}
                strokeWidth="8"
                strokeDasharray={`${(resumeScore / 100) * 283} 283`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ transition: "stroke-dasharray 1s ease" }}
              />
            </svg>
            <div style={scoreText}>
              <div style={scoreValue}>{resumeScore}</div>
              <div style={scoreLabel}>Overall Score</div>
            </div>
          </div>
          <div style={scoreInfo}>
            <div style={scoreGrade}>
              <span style={gradeLabel}>Grade</span>
              <span
                style={{ ...gradeValue, color: getScoreColor(resumeScore) }}
              >
                {getScoreGrade(resumeScore)}
              </span>
            </div>
            <div style={scorePercentile}>
              <span style={percentileLabel}>Percentile</span>
              <span style={percentileValue}>Top {100 - resumeScore}%</span>
            </div>
          </div>
        </div>
        <div style={quickStats}>
          <div style={stat}>
            <span style={statIcon}>📄</span>
            <div>
              <div style={statValue}>ATS Friendly</div>
              <div style={statStatus}>
                {resumeScore >= 70 ? "✅ Yes" : "⚠️ Needs Improvement"}
              </div>
            </div>
          </div>
          <div style={stat}>
            <span style={statIcon}>🎯</span>
            <div>
              <div style={statValue}>Job Match</div>
              <div style={statStatus}>82%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={chartsGrid}>
        {/* Bar Chart */}
        <div style={chartCard}>
          <h3 style={chartTitle}>📊 Category Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => [`${value}%`, "Score"]}
              />
              <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={chartCard}>
          <h3 style={chartTitle}>🥧 Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Trend */}
        <div style={chartCard}>
          <h3 style={chartTitle}>📈 Improvement Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div style={chartCard}>
          <h3 style={chartTitle}>🎯 Skills Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="Your Score"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations */}
      <div style={recommendationsCard}>
        <h3 style={recommendationsTitle}>
          <span>💡</span> AI Recommendations
        </h3>
        <div style={recommendationsList}>
          {getRecommendations().map((rec, index) => (
            <div key={index} style={recommendationItem}>
              <span style={recIcon}>✓</span>
              <span style={recText}>{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Metrics */}
      <div style={metricsGrid}>
        <div style={metricCard}>
          <div style={metricHeader}>
            <span style={metricIcon}>🔑</span>
            <h4 style={metricTitle}>Keyword Analysis</h4>
          </div>
          <div style={keywordList}>
            <span style={keyword}>JavaScript</span>
            <span style={keyword}>React</span>
            <span style={keyword}>Node.js</span>
            <span style={keyword}>Python</span>
            <span style={keywordMissing}>SQL</span>
            <span style={keywordMissing}>TypeScript</span>
          </div>
          <p style={metricNote}>Add missing keywords to improve ATS score</p>
        </div>

        <div style={metricCard}>
          <div style={metricHeader}>
            <span style={metricIcon}>📏</span>
            <h4 style={metricTitle}>Length Analysis</h4>
          </div>
          <div style={lengthBar}>
            <div style={lengthFill}></div>
          </div>
          <div style={lengthInfo}>
            <span>Current: 1.5 pages</span>
            <span>Optimal: 1-2 pages</span>
          </div>
          <p style={metricNote}>Good length for experienced professionals</p>
        </div>

        <div style={metricCard}>
          <div style={metricHeader}>
            <span style={metricIcon}>📝</span>
            <h4 style={metricTitle}>Readability Score</h4>
          </div>
          <div style={readabilityScore}>
            <span style={readabilityValue}>85</span>
            <span style={readabilityLabel}>/100</span>
          </div>
          <p style={metricNote}>Excellent readability, easy to scan</p>
        </div>
      </div>
    </div>
  );
};

// =====================
// STYLES
// =====================
const container = {
  padding: "24px",
  maxWidth: "1400px",
  margin: "0 auto",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const loadingContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "400px",
};

const spinner = {
  width: "40px",
  height: "40px",
  border: "3px solid #e2e8f0",
  borderTopColor: "#3b82f6",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

const loadingText = {
  marginTop: "16px",
  color: "#64748b",
  fontSize: "14px",
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

const overallCard = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: "20px",
  padding: "24px",
  marginBottom: "24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "20px",
  color: "white",
};

const overallScore = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
};

const scoreCircle = {
  position: "relative",
  width: "120px",
  height: "120px",
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
  fontSize: "32px",
  fontWeight: "700",
};

const scoreLabel = {
  fontSize: "10px",
  opacity: 0.8,
};

const scoreInfo = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const scoreGrade = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
};

const gradeLabel = {
  fontSize: "12px",
  opacity: 0.8,
};

const gradeValue = {
  fontSize: "18px",
  fontWeight: "700",
};

const scorePercentile = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
};

const percentileLabel = {
  fontSize: "12px",
  opacity: 0.8,
};

const percentileValue = {
  fontSize: "14px",
  fontWeight: "500",
};

const quickStats = {
  display: "flex",
  gap: "24px",
};

const stat = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "rgba(255, 255, 255, 0.1)",
  padding: "12px 16px",
  borderRadius: "12px",
};

const statIcon = {
  fontSize: "24px",
};

const statValue = {
  fontSize: "12px",
  opacity: 0.8,
};

const statStatus = {
  fontSize: "14px",
  fontWeight: "600",
};

const chartsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
  gap: "24px",
  marginBottom: "24px",
};

const chartCard = {
  background: "white",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const chartTitle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1e293b",
  marginBottom: "16px",
};

const tooltipStyle = {
  background: "white",
  border: "none",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  padding: "8px 12px",
  fontSize: "12px",
};

const recommendationsCard = {
  background: "white",
  borderRadius: "16px",
  padding: "20px",
  marginBottom: "24px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const recommendationsTitle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1e293b",
  marginBottom: "16px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const recommendationsList = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const recommendationItem = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "10px",
  background: "#f8fafc",
  borderRadius: "10px",
};

const recIcon = {
  width: "24px",
  height: "24px",
  background: "#10b981",
  color: "white",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
};

const recText = {
  fontSize: "13px",
  color: "#334155",
};

const metricsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "24px",
};

const metricCard = {
  background: "white",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const metricHeader = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "16px",
};

const metricIcon = {
  fontSize: "20px",
};

const metricTitle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#1e293b",
  margin: 0,
};

const keywordList = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginBottom: "12px",
};

const keyword = {
  background: "#dcfce7",
  color: "#166534",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
};

const keywordMissing = {
  background: "#fee2e2",
  color: "#dc2626",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
};

const metricNote = {
  fontSize: "11px",
  color: "#94a3b8",
  marginTop: "12px",
  marginBottom: 0,
};

const lengthBar = {
  background: "#e2e8f0",
  height: "8px",
  borderRadius: "4px",
  overflow: "hidden",
  marginBottom: "8px",
};

const lengthFill = {
  width: "75%",
  height: "100%",
  background: "linear-gradient(90deg, #10b981, #059669)",
};

const lengthInfo = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "11px",
  color: "#64748b",
  marginBottom: "8px",
};

const readabilityScore = {
  display: "flex",
  alignItems: "baseline",
  gap: "4px",
  marginBottom: "8px",
};

const readabilityValue = {
  fontSize: "36px",
  fontWeight: "700",
  color: "#10b981",
};

const readabilityLabel = {
  fontSize: "14px",
  color: "#64748b",
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

  ${chartCard}, ${recommendationsCard}, ${metricCard} {
    animation: fadeIn 0.5s ease;
  }

  @media (max-width: 1024px) {
    ${chartsGrid} {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    ${container} {
      padding: 16px;
    }
    
    ${overallCard} {
      flex-direction: column;
      text-align: center;
    }
    
    ${overallScore} {
      flex-direction: column;
    }
    
    ${quickStats} {
      width: 100%;
      justify-content: center;
    }
    
    ${title} {
      font-size: 24px;
    }
    
    ${chartsGrid} {
      grid-template-columns: 1fr;
    }
    
    ${metricsGrid} {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    ${quickStats} {
      flex-direction: column;
    }
    
    ${chartCard}, ${recommendationsCard}, ${metricCard} {
      padding: 16px;
    }
  }
`;

// Inject global styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = globalStyles;
  document.head.appendChild(styleSheet);
}

export default Analytics;
