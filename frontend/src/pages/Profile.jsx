import { useEffect, useState } from "react";
import API from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/user/profile");
      setUser(res.data);
      setForm({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        title: res.data.title || "",
        bio: res.data.bio || "",
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear messages when user starts typing
    if (success) setSuccess("");
    if (error) setError("");
  };

  const updateProfile = async () => {
    if (!form.name || !form.email) {
      setError("Name and email are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await API.put("/user/profile", form);

      // Update local storage
      localStorage.setItem("user", JSON.stringify(res.data));

      // Update user state
      setUser(res.data);

      setSuccess("✅ Profile updated successfully!");
      setIsEditing(false);

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "❌ Update failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      title: user.title || "",
      bio: user.bio || "",
    });
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  return (
    <div style={container}>
      {/* Header */}
      <div style={header}>
        <h1 style={title}>
          <span style={titleIcon}>👤</span>
          Profile Settings
        </h1>
        <p style={subtitle}>
          Manage your personal information and account settings
        </p>
      </div>

      <div style={contentWrapper}>
        {/* Profile Overview Card */}
        <div style={overviewCard}>
          <div style={avatarSection}>
            <div style={avatar}>
              <span style={avatarText}>{user.name?.charAt(0) || "U"}</span>
            </div>
            <div style={avatarInfo}>
              <h3 style={userName}>{user.name || "Your Name"}</h3>
              <p style={userTitle}>
                {user.title || "Add your professional title"}
              </p>
              <span style={userBadge}>Member</span>
            </div>
          </div>
          <div style={statsSection}>
            <div style={stat}>
              <div style={statValue}>85%</div>
              <div style={statLabel}>Profile Complete</div>
              <div style={progressBar}>
                <div style={{ ...progressFill, width: "85%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <div style={formCard}>
          <div style={cardHeader}>
            <h3 style={cardTitle}>
              <span style={cardIcon}>✏️</span>
              {isEditing ? "Edit Profile" : "Profile Information"}
            </h3>
            {!isEditing && (
              <button style={editBtn} onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            )}
          </div>

          {success && (
            <div style={successMessage}>
              <span>✅</span>
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div style={errorMessage}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div style={form}>
            <div style={formGroup}>
              <label style={label}>
                Full Name <span style={required}>*</span>
              </label>
              <div style={inputWrapper}>
                <span style={inputIcon}>👤</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  style={input}
                  placeholder="Enter your full name"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div style={formGroup}>
              <label style={label}>
                Email Address <span style={required}>*</span>
              </label>
              <div style={inputWrapper}>
                <span style={inputIcon}>📧</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  style={input}
                  placeholder="Enter your email"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div style={formGroup}>
              <label style={label}>Phone Number</label>
              <div style={inputWrapper}>
                <span style={inputIcon}>📱</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  style={input}
                  placeholder="Enter your phone number"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div style={formGroup}>
              <label style={label}>Professional Title</label>
              <div style={inputWrapper}>
                <span style={inputIcon}>💼</span>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  style={input}
                  placeholder="e.g., Frontend Developer, UI/UX Designer"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div style={formGroup}>
              <label style={label}>Bio</label>
              <div style={inputWrapper}>
                <span style={inputIcon}>📝</span>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  style={{ ...input, ...textarea }}
                  placeholder="Tell us a little about yourself"
                  rows="4"
                  disabled={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <div style={buttonGroup}>
                <button
                  onClick={updateProfile}
                  style={saveBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span style={spinner}></span>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  style={cancelBtn}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Account Information Card */}
        <div style={infoCard}>
          <h3 style={infoTitle}>
            <span style={infoIcon}>ℹ️</span>
            Account Information
          </h3>
          <div style={infoRow}>
            <span style={infoLabel}>Member since:</span>
            <span style={infoValue}>January 2024</span>
          </div>
          <div style={infoRow}>
            <span style={infoLabel}>Last updated:</span>
            <span style={infoValue}>{new Date().toLocaleDateString()}</span>
          </div>
          <div style={infoRow}>
            <span style={infoLabel}>Account status:</span>
            <span style={activeBadge}>Active</span>
          </div>
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
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtitle = {
  fontSize: "14px",
  color: "#64748b",
  margin: 0,
};

const contentWrapper = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};

const overviewCard = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: "20px",
  padding: "24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "20px",
  color: "white",
};

const avatarSection = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const avatar = {
  width: "80px",
  height: "80px",
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "3px solid rgba(255, 255, 255, 0.3)",
};

const avatarText = {
  fontSize: "36px",
  fontWeight: "600",
};

const avatarInfo = {
  flex: 1,
};

const userName = {
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "4px",
};

const userTitle = {
  fontSize: "13px",
  opacity: 0.9,
  marginBottom: "8px",
};

const userBadge = {
  background: "rgba(255, 255, 255, 0.2)",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  display: "inline-block",
};

const statsSection = {
  minWidth: "200px",
};

const stat = {
  textAlign: "right",
};

const statValue = {
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "4px",
};

const statLabel = {
  fontSize: "12px",
  opacity: 0.9,
  marginBottom: "8px",
};

const progressBar = {
  background: "rgba(255, 255, 255, 0.2)",
  height: "6px",
  borderRadius: "3px",
  overflow: "hidden",
};

const progressFill = {
  background: "white",
  height: "100%",
  borderRadius: "3px",
  transition: "width 0.3s ease",
};

const formCard = {
  background: "white",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  paddingBottom: "16px",
  borderBottom: "2px solid #e2e8f0",
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1e293b",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  margin: 0,
};

const cardIcon = {
  fontSize: "20px",
};

const editBtn = {
  background: "#f1f5f9",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  color: "#3b82f6",
  fontWeight: "500",
  fontSize: "13px",
  cursor: "pointer",
  transition: "all 0.2s",
};

const successMessage = {
  background: "#dcfce7",
  border: "1px solid #bbf7d0",
  borderRadius: "12px",
  padding: "12px 16px",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "13px",
  color: "#166534",
};

const errorMessage = {
  background: "#fee2e2",
  border: "1px solid #fecaca",
  borderRadius: "12px",
  padding: "12px 16px",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "13px",
  color: "#dc2626",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const label = {
  fontSize: "13px",
  fontWeight: "500",
  color: "#334155",
};

const required = {
  color: "#ef4444",
};

const inputWrapper = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const inputIcon = {
  position: "absolute",
  left: "12px",
  fontSize: "16px",
  pointerEvents: "none",
};

const input = {
  width: "100%",
  padding: "10px 40px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  fontSize: "14px",
  transition: "all 0.2s ease",
  outline: "none",
  fontFamily: "inherit",
  background: "white",
};

const textarea = {
  resize: "vertical",
  fontFamily: "inherit",
};

const buttonGroup = {
  display: "flex",
  gap: "12px",
  marginTop: "8px",
};

const saveBtn = {
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  color: "white",
  fontWeight: "600",
  fontSize: "14px",
  cursor: "pointer",
  transition: "all 0.2s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const cancelBtn = {
  padding: "10px 20px",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  background: "white",
  color: "#64748b",
  fontWeight: "500",
  fontSize: "14px",
  cursor: "pointer",
  transition: "all 0.2s",
};

const spinner = {
  width: "14px",
  height: "14px",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderTopColor: "white",
  borderRadius: "50%",
  animation: "spin 0.6s linear infinite",
};

const infoCard = {
  background: "#f8fafc",
  borderRadius: "16px",
  padding: "24px",
};

const infoTitle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1e293b",
  marginBottom: "16px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const infoIcon = {
  fontSize: "18px",
};

const infoRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #e2e8f0",
};

const infoLabel = {
  fontSize: "13px",
  color: "#64748b",
};

const infoValue = {
  fontSize: "13px",
  color: "#1e293b",
  fontWeight: "500",
};

const activeBadge = {
  background: "#dcfce7",
  color: "#166534",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "500",
};

// Add CSS animations
const globalStyles = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  ${input}:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  ${editBtn}:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
  }

  ${saveBtn}:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  ${cancelBtn}:hover:not(:disabled) {
    background: #f1f5f9;
    transform: translateY(-1px);
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    ${container} {
      padding: 16px;
    }
    
    ${overviewCard} {
      flex-direction: column;
      text-align: center;
    }
    
    ${avatarSection} {
      flex-direction: column;
    }
    
    ${stat} {
      text-align: center;
    }
    
    ${statsSection} {
      width: 100%;
    }
    
    ${cardHeader} {
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
    }
    
    ${editBtn} {
      width: 100%;
    }
    
    ${buttonGroup} {
      flex-direction: column;
    }
    
    ${title} {
      font-size: 24px;
    }
  }

  @media (max-width: 480px) {
    ${formCard}, ${infoCard} {
      padding: 16px;
    }
    
    ${avatar} {
      width: 60px;
      height: 60px;
    }
    
    ${avatarText} {
      font-size: 28px;
    }
    
    ${userName} {
      font-size: 18px;
    }
  }
`;

// Inject global styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = globalStyles;
  document.head.appendChild(styleSheet);
}

export default Profile;
