import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Auto redirect if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Load saved email if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setForm((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      // Save auth
      login(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", form.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      {/* Background decoration */}
      <div style={bgDecoration}>
        <div style={bgCircle1}></div>
        <div style={bgCircle2}></div>
        <div style={bgCircle3}></div>
      </div>

      <div style={card}>
        {/* Logo/Brand */}
        <div style={brand}>
          <span style={brandIcon}>🚀</span>
          <span style={brandText}>AI Resume</span>
        </div>

        <h2 style={title}>Welcome Back! 👋</h2>
        <p style={subtitle}>
          Sign in to continue building your professional resume
        </p>

        {error && (
          <div style={errorContainer}>
            <span style={errorIcon}>⚠️</span>
            <span style={errorStyle}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroup}>
            <label style={label}>Email Address</label>
            <div style={inputWrapper}>
              <span style={inputIcon}>📧</span>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                style={input}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div style={inputGroup}>
            <label style={label}>Password</label>
            <div style={inputWrapper}>
              <span style={inputIcon}>🔒</span>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                style={input}
                required
                disabled={loading}
              />
              <button
                type="button"
                style={passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div style={options}>
            <label style={checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={checkbox}
              />
              <span style={checkboxText}>Remember me</span>
            </label>
            <Link to="/forgot-password" style={forgotLink}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" style={btn} disabled={loading}>
            {loading ? (
              <>
                <span style={spinner}></span>
                Logging in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div style={divider}>
          <span style={dividerLine}></span>
          <span style={dividerText}>Or continue with</span>
          <span style={dividerLine}></span>
        </div>

        <div style={socialButtons}>
          <button style={socialBtn} onClick={() => console.log("Google login")}>
            <span>G</span> Google
          </button>
          <button
            style={socialBtn}
            onClick={() => console.log("LinkedIn login")}
          >
            <span>in</span> LinkedIn
          </button>
        </div>

        <p style={registerPrompt}>
          Don't have an account?{" "}
          <Link to="/register" style={link}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

// =====================
// STYLES
// =====================
const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  position: "relative",
  overflow: "hidden",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  padding: "20px",
};

const bgDecoration = {
  position: "absolute",
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const bgCircle1 = {
  position: "absolute",
  top: "-10%",
  right: "-5%",
  width: "300px",
  height: "300px",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "50%",
  animation: "float 20s infinite ease-in-out",
};

const bgCircle2 = {
  position: "absolute",
  bottom: "-10%",
  left: "-5%",
  width: "250px",
  height: "250px",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "50%",
  animation: "float 15s infinite ease-in-out reverse",
};

const bgCircle3 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "400px",
  height: "400px",
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "50%",
  transform: "translate(-50%, -50%)",
  animation: "pulse 10s infinite ease-in-out",
};

const card = {
  background: "white",
  padding: "40px",
  borderRadius: "24px",
  width: "100%",
  maxWidth: "440px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
  position: "relative",
  zIndex: 1,
  animation: "slideUp 0.5s ease",
};

const brand = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  marginBottom: "24px",
};

const brandIcon = {
  fontSize: "32px",
};

const brandText = {
  fontSize: "24px",
  fontWeight: "700",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const title = {
  textAlign: "center",
  fontSize: "28px",
  fontWeight: "700",
  color: "#1e293b",
  marginBottom: "8px",
};

const subtitle = {
  textAlign: "center",
  fontSize: "14px",
  color: "#64748b",
  marginBottom: "28px",
};

const errorContainer = {
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

const errorIcon = {
  fontSize: "16px",
};

const errorStyle = {
  flex: 1,
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const inputGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const label = {
  fontSize: "13px",
  fontWeight: "500",
  color: "#334155",
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
  padding: "12px 40px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  fontSize: "14px",
  transition: "all 0.2s ease",
  outline: "none",
  fontFamily: "inherit",
};

const passwordToggle = {
  position: "absolute",
  right: "12px",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
  padding: "4px",
};

const options = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "13px",
};

const checkboxLabel = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
};

const checkbox = {
  width: "16px",
  height: "16px",
  cursor: "pointer",
};

const checkboxText = {
  color: "#64748b",
};

const forgotLink = {
  color: "#3b82f6",
  textDecoration: "none",
  fontSize: "13px",
  transition: "color 0.2s",
};

const btn = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  fontWeight: "600",
  fontSize: "14px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const spinner = {
  width: "16px",
  height: "16px",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderTopColor: "white",
  borderRadius: "50%",
  animation: "spin 0.6s linear infinite",
};

const divider = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  margin: "24px 0",
};

const dividerLine = {
  flex: 1,
  height: "1px",
  background: "#e2e8f0",
};

const dividerText = {
  fontSize: "12px",
  color: "#94a3b8",
};

const socialButtons = {
  display: "flex",
  gap: "12px",
  marginBottom: "24px",
};

const socialBtn = {
  flex: 1,
  padding: "10px",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  background: "white",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  transition: "all 0.2s ease",
  color: "#334155",
};

const registerPrompt = {
  textAlign: "center",
  fontSize: "13px",
  color: "#64748b",
  marginTop: "0",
};

const link = {
  color: "#667eea",
  textDecoration: "none",
  fontWeight: "600",
  transition: "color 0.2s",
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

  @keyframes float {
    0%, 100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(20px, 20px);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.05;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
      opacity: 0.1;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  ${input}:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  ${btn}:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }

  ${btn}:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  ${socialBtn}:hover {
    background: #f8fafc;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  ${forgotLink}:hover,
  ${link}:hover {
    color: #764ba2;
    text-decoration: underline;
  }

  ${passwordToggle}:hover {
    opacity: 0.7;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    ${card} {
      padding: 32px 24px;
      max-width: 90%;
    }
    
    ${title} {
      font-size: 24px;
    }
    
    ${brandIcon} {
      font-size: 28px;
    }
    
    ${brandText} {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    ${card} {
      padding: 24px 20px;
    }
    
    ${socialButtons} {
      flex-direction: column;
    }
    
    ${options} {
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
    }
    
    ${input} {
      padding: 10px 36px;
    }
  }
`;

// Inject global styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = globalStyles;
  document.head.appendChild(styleSheet);
}

export default Login;
