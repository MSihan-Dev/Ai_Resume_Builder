import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [stats, setStats] = useState({
    resumes: 0,
    atsScore: 0,
    interviews: 0,
    achievements: 0,
  });

  // Load user on first render
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Load stats (mock data - replace with API call)
    setStats({
      resumes: 3,
      atsScore: 85,
      interviews: 2,
      achievements: 7,
    });
  }, []);

  // Listen for profile updates
  useEffect(() => {
    const update = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("userUpdated", update);
    return () => window.removeEventListener("userUpdated", update);
  }, []);

  return (
    <div style={container}>
      {/* Welcome Section */}
      <div style={welcomeSection}>
        <div style={welcomeContent}>
          <div>
            <h1 style={greetingText}>{greeting}! 👋</h1>
            <h2 style={welcomeTitle}>
              Welcome back, <span style={userName}>{user?.name || "User"}</span>
            </h2>
            <p style={welcomeSubtitle}>
              Build smarter resumes with AI and land your dream job faster
            </p>
          </div>
          <div style={statsBadge}>
            <span style={statsBadgeIcon}>🏆</span>
            <div>
              <div style={statsBadgeValue}>Pro Plan</div>
              <div style={statsBadgeLabel}>Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={statsGrid}>
        <StatCard
          icon="📄"
          value={stats.resumes}
          label="Resumes Created"
          color="#3b82f6"
          trend="+2 this month"
        />
        <StatCard
          icon="📊"
          value={`${stats.atsScore}%`}
          label="Avg. ATS Score"
          color="#10b981"
          trend="+15% improvement"
        />
        <StatCard
          icon="🎯"
          value={stats.interviews}
          label="Interview Calls"
          color="#8b5cf6"
          trend="From applications"
        />
        <StatCard
          icon="⭐"
          value={stats.achievements}
          label="Achievements"
          color="#f59e0b"
          trend="This month"
        />
      </div>

      {/* Main Action Cards */}
      <div style={sectionHeader}>
        <h3 style={sectionTitle}>Quick Actions</h3>
        <p style={sectionSubtitle}>Start building your professional resume</p>
      </div>

      <div style={grid}>
        <ActionCard
          icon="📄"
          title="Resume Builder"
          description="Create professional ATS-friendly resumes with AI assistance"
          buttonText="Start Building"
          onClick={() => navigate("/builder")}
          gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        />

        <ActionCard
          icon="🤖"
          title="AI Analyzer"
          description="Get instant ATS score and improvement suggestions"
          buttonText="Analyze Now"
          onClick={() => navigate("/analyzer")}
          gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        />

        <ActionCard
          icon="💬"
          title="AI Chatbot"
          description="Get career advice and resume tips from our AI assistant"
          buttonText="Chat Now"
          onClick={() => navigate("/chatbot")}
          gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        />

        <ActionCard
          icon="📊"
          title="Analytics"
          description="Track your resume performance and application success"
          buttonText="View Stats"
          onClick={() => navigate("/analytics")}
          gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        />
      </div>

      {/* Recent Activity Section */}
      <div style={sectionHeader}>
        <h3 style={sectionTitle}>Recent Activity</h3>
        <p style={sectionSubtitle}>Your latest resume activities</p>
      </div>

      <div style={activityContainer}>
        <ActivityItem
          icon="✏️"
          title="Resume Updated"
          description="Frontend Developer resume was edited"
          time="2 hours ago"
        />
        <ActivityItem
          icon="🤖"
          title="AI Analysis Completed"
          description="Your resume scored 92% ATS compatibility"
          time="Yesterday"
        />
        <ActivityItem
          icon="📥"
          title="Resume Downloaded"
          description="PDF version was downloaded"
          time="2 days ago"
        />
      </div>

      {/* Quick Tips */}
      <div style={tipsContainer}>
        <div style={tipsIcon}>💡</div>
        <div style={tipsContent}>
          <h4 style={tipsTitle}>Pro Tip</h4>
          <p style={tipsText}>
            Use action verbs and quantify your achievements to improve your ATS
            score by up to 40%!
          </p>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, value, label, color, trend }) => (
  <div style={statCard}>
    <div style={{ ...statIcon, background: `${color}15` }}>
      <span style={{ fontSize: "24px" }}>{icon}</span>
    </div>
    <div>
      <div style={statValue}>{value}</div>
      <div style={statLabel}>{label}</div>
      <div style={statTrend}>{trend}</div>
    </div>
  </div>
);

// Action Card Component
const ActionCard = ({
  icon,
  title,
  description,
  buttonText,
  onClick,
  gradient,
}) => (
  <div style={actionCard}>
    <div style={{ ...cardIcon, background: gradient }}>
      <span style={cardIconText}>{icon}</span>
    </div>
    <h3 style={cardTitle}>{title}</h3>
    <p style={cardDesc}>{description}</p>
    <button style={cardBtn} onClick={onClick}>
      {buttonText}
      <span style={btnArrow}>→</span>
    </button>
  </div>
);

// Activity Item Component
const ActivityItem = ({ icon, title, description, time }) => (
  <div style={activityItem}>
    <div style={activityIcon}>{icon}</div>
    <div style={activityContent}>
      <div style={activityTitle}>{title}</div>
      <div style={activityDesc}>{description}</div>
      <div style={activityTime}>{time}</div>
    </div>
  </div>
);

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

const welcomeSection = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: "20px",
  padding: "32px",
  marginBottom: "32px",
  color: "white",
  position: "relative",
  overflow: "hidden",
};

const welcomeContent = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexWrap: "wrap",
  gap: "20px",
};

const greetingText = {
  fontSize: "14px",
  fontWeight: "500",
  opacity: 0.9,
  marginBottom: "8px",
  letterSpacing: "0.5px",
};

const welcomeTitle = {
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "8px",
};

const userName = {
  background: "linear-gradient(135deg, #fff, #e0e7ff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const welcomeSubtitle = {
  fontSize: "14px",
  opacity: 0.9,
  margin: 0,
};

const statsBadge = {
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  borderRadius: "12px",
  padding: "12px 20px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const statsBadgeIcon = {
  fontSize: "28px",
};

const statsBadgeValue = {
  fontSize: "14px",
  fontWeight: "600",
};

const statsBadgeLabel = {
  fontSize: "11px",
  opacity: 0.8,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
  marginBottom: "40px",
};

const statCard = {
  background: "white",
  borderRadius: "16px",
  padding: "20px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
};

const statIcon = {
  width: "56px",
  height: "56px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const statValue = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#1e293b",
  marginBottom: "4px",
};

const statLabel = {
  fontSize: "13px",
  color: "#64748b",
  marginBottom: "4px",
};

const statTrend = {
  fontSize: "11px",
  color: "#10b981",
};

const sectionHeader = {
  marginBottom: "20px",
};

const sectionTitle = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#1e293b",
  marginBottom: "4px",
};

const sectionSubtitle = {
  fontSize: "13px",
  color: "#64748b",
  margin: 0,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
  marginBottom: "40px",
};

const actionCard = {
  background: "white",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
};

const cardIcon = {
  width: "56px",
  height: "56px",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px",
};

const cardIconText = {
  fontSize: "28px",
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1e293b",
  marginBottom: "8px",
};

const cardDesc = {
  fontSize: "13px",
  color: "#64748b",
  lineHeight: "1.5",
  marginBottom: "20px",
};

const cardBtn = {
  background: "#f1f5f9",
  border: "none",
  padding: "8px 16px",
  borderRadius: "10px",
  color: "#3b82f6",
  fontWeight: "500",
  fontSize: "13px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  transition: "all 0.2s ease",
};

const btnArrow = {
  transition: "transform 0.2s ease",
};

const activityContainer = {
  background: "white",
  borderRadius: "16px",
  padding: "20px",
  marginBottom: "24px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const activityItem = {
  display: "flex",
  gap: "16px",
  padding: "16px",
  borderBottom: "1px solid #e2e8f0",
  transition: "all 0.2s ease",
};

const activityIcon = {
  width: "40px",
  height: "40px",
  background: "#f1f5f9",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
};

const activityContent = {
  flex: 1,
};

const activityTitle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#1e293b",
  marginBottom: "4px",
};

const activityDesc = {
  fontSize: "12px",
  color: "#64748b",
  marginBottom: "4px",
};

const activityTime = {
  fontSize: "11px",
  color: "#94a3b8",
};

const tipsContainer = {
  background: "linear-gradient(135deg, #fef3c7, #fde68a)",
  borderRadius: "16px",
  padding: "20px",
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const tipsIcon = {
  fontSize: "32px",
};

const tipsContent = {
  flex: 1,
};

const tipsTitle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#92400e",
  marginBottom: "4px",
};

const tipsText = {
  fontSize: "13px",
  color: "#78350f",
  margin: 0,
};

// Add CSS animations
const globalStyles = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${statCard}:hover,
  ${actionCard}:hover,
  ${activityItem}:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }

  ${actionCard}:hover ${btnArrow} {
    transform: translateX(4px);
  }

  ${cardBtn}:hover {
    background: #3b82f6;
    color: white;
  }

  ${activityItem}:hover {
    background: #f8fafc;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    ${container} {
      padding: 16px;
    }
    
    ${welcomeSection} {
      padding: 24px;
    }
    
    ${welcomeTitle} {
      font-size: 24px;
    }
    
    ${statsGrid} {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    
    ${statValue} {
      font-size: 24px;
    }
    
    ${grid} {
      gap: 16px;
    }
    
    ${actionCard} {
      padding: 20px;
    }
  }

  @media (max-width: 480px) {
    ${welcomeContent} {
      flex-direction: column;
    }
    
    ${statsBadge} {
      width: 100%;
      justify-content: center;
    }
    
    ${statsGrid} {
      grid-template-columns: 1fr;
    }
    
    ${statCard} {
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

export default Dashboard;
