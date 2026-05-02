import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // If already logged in → go dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Password strength checker
  useEffect(() => {
    let strength = 0;
    if (form.password.length >= 6) strength += 1;
    if (form.password.length >= 10) strength += 1;
    if (/[A-Z]/.test(form.password)) strength += 1;
    if (/[0-9]/.test(form.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(form.password)) strength += 1;
    setPasswordStrength(strength);
  }, [form.password]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms and Conditions");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // Redirect to login after successful registration
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Very Weak";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    if (passwordStrength >= 4) return "Strong";
    return "";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "#ef4444";
    if (passwordStrength === 1) return "#f59e0b";
    if (passwordStrength === 2) return "#f59e0b";
    if (passwordStrength === 3) return "#10b981";
    if (passwordStrength >= 4) return "#10b981";
    return "#e2e8f0";
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

        <h2 style={title}>Create Account 🎉</h2>
        <p style={subtitle}>
          Join us and start building your professional resume
        </p>

        {error && (
          <div style={errorContainer}>
            <span style={errorIcon}>⚠️</span>
            <span style={errorStyle}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroup}>
            <label style={label}>Full Name</label>
            <div style={inputWrapper}>
              <span style={inputIcon}>👤</span>
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                style={input}
                required
                disabled={loading}
              />
            </div>
          </div>

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
                placeholder="Create a password"
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

            {form.password && (
              <div style={passwordStrengthContainer}>
                <div style={passwordStrengthBar}>
                  <div
                    style={{
                      ...passwordStrengthFill,
                      width: `${(passwordStrength / 5) * 100}%`,
                      background: getPasswordStrengthColor(),
                    }}
                  ></div>
                </div>
                <div
                  style={passwordStrengthText}
                  style={{ color: getPasswordStrengthColor() }}
                >
                  {getPasswordStrengthText()}
                </div>
              </div>
            )}
          </div>

          <div style={inputGroup}>
            <label style={label}>Confirm Password</label>
            <div style={inputWrapper}>
              <span style={inputIcon}>🔒</span>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                style={input}
                required
                disabled={loading}
              />
              <button
                type="button"
                style={passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <label style={checkboxLabel}>
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              style={checkbox}
              disabled={loading}
            />
            <span style={checkboxText}>
              I agree to the{" "}
              <Link to="/terms" style={termsLink}>
                Terms and Conditions
              </Link>
            </span>
          </label>

          <button type="submit" style={btn} disabled={loading}>
            {loading ? (
              <>
                <span style={spinner}></span>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div style={divider}>
          <span style={dividerLine}></span>
          <span style={dividerText}>Or sign up with</span>
          <span style={dividerLine}></span>
        </div>

        <div style={socialButtons}>
          <button
            style={socialBtn}
            onClick={() => console.log("Google signup")}
          >
            <span>G</span> Google
          </button>
          <button
            style={socialBtn}
            onClick={() => console.log("LinkedIn signup")}
          >
            <span>in</span> LinkedIn
          </button>
        </div>

        <p style={loginPrompt}>
          Already have an account?{" "}
          <Link to="/login" style={link}>
            Sign In
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
  maxWidth: "480px",
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

const passwordStrengthContainer = {
  marginTop: "6px",
};

const passwordStrengthBar = {
  height: "4px",
  background: "#e2e8f0",
  borderRadius: "2px",
  overflow: "hidden",
  marginBottom: "4px",
};

const passwordStrengthFill = {
  height: "100%",
  transition: "width 0.3s ease",
};

const passwordStrengthText = {
  fontSize: "11px",
  fontWeight: "500",
};

const checkboxLabel = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  marginTop: "4px",
};

const checkbox = {
  width: "16px",
  height: "16px",
  cursor: "pointer",
};

const checkboxText = {
  fontSize: "12px",
  color: "#64748b",
};

const termsLink = {
  color: "#667eea",
  textDecoration: "none",
  fontWeight: "500",
};

const btn = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #10b981, #059669)",
  color: "white",
  fontWeight: "600",
  fontSize: "14px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  marginTop: "8px",
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

const loginPrompt = {
  textAlign: "center",
  fontSize: "13px",
  color: "#64748b",
  marginTop: "0",
};

const link = {
  color: "#10b981",
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
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }

  ${btn}:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
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

  ${link}:hover,
  ${termsLink}:hover {
    color: #059669;
    text-decoration: underline;
  }

  ${passwordToggle}:hover {
    opacity: 0.7;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    ${card} {
      padding: 32px 24px;
      max-width: 95%;
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
    
    ${checkboxLabel} {
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

export default Register;
