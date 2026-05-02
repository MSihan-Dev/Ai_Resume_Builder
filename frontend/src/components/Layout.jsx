import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div style={wrapper}>
      {/* MOBILE HAMBURGER BUTTON */}
      {isMobile && (
        <button
          style={hamburgerBtn}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span style={hamburgerIcon}>{isMobileMenuOpen ? "✕" : "☰"}</span>
        </button>
      )}

      {/* OVERLAY FOR MOBILE */}
      {isMobile && isMobileMenuOpen && (
        <div style={overlay} onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          ...sidebar,
          transform:
            isMobile && !isMobileMenuOpen
              ? "translateX(-100%)"
              : "translateX(0)",
        }}
      >
        <div style={sidebarHeader}>
          <h2 style={logo}>
            <span style={logoIcon}>🚀</span>
            <span style={logoText}>AI Resume</span>
          </h2>
          {isMobile && (
            <button style={closeBtn} onClick={() => setIsMobileMenuOpen(false)}>
              ✕
            </button>
          )}
        </div>

        {/* PROFILE SECTION IN SIDEBAR */}
        <div
          onClick={() => handleNavigation("/profile")}
          style={profileSection}
        >
          <div style={profileAvatar}>👤</div>
          <div style={profileInfo}>
            <div style={profileName}>{user?.name || "User"}</div>
            <div style={profileEmail}>
              {user?.email || "john.doe@example.com"}
            </div>
          </div>
        </div>

        <div style={navItems}>
          <SidebarItem
            icon="📊"
            label="Dashboard"
            active={isActive("/dashboard")}
            onClick={() => handleNavigation("/dashboard")}
          />

          <SidebarItem
            icon="📄"
            label="Builder"
            active={isActive("/builder")}
            onClick={() => handleNavigation("/builder")}
          />

          <SidebarItem
            icon="🤖"
            label="Chatbot"
            active={isActive("/chatbot")}
            onClick={() => handleNavigation("/chatbot")}
          />

          <SidebarItem
            icon="📊"
            label="Analytics"
            active={isActive("/analytics")}
            onClick={() => handleNavigation("/analytics")}
          />
        </div>

        <hr style={divider} />

        <button
          style={logoutBtn}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateX(5px)";
            e.target.style.background =
              "linear-gradient(135deg, #dc2626, #b91c1c)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateX(0)";
            e.target.style.background =
              "linear-gradient(135deg, #ef4444, #dc2626)";
          }}
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={main}>
        <div style={contentWrapper}>{children}</div>
      </div>
    </div>
  );
};

// =====================
// SIDEBAR ITEM COMPONENT
// =====================
const SidebarItem = ({ icon, label, onClick, active }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...item,
        background: active
          ? "linear-gradient(135deg, #3b82f6, #2563eb)"
          : isHovered
            ? "rgba(59, 130, 246, 0.1)"
            : "transparent",
        borderLeft: active ? "3px solid #3b82f6" : "3px solid transparent",
      }}
    >
      <span style={itemIcon}>{icon}</span>
      <span style={itemLabel}>{label}</span>
      {active && <span style={activeIndicator} />}
    </div>
  );
};

// =====================
// COMPACT STYLES
// =====================
const wrapper = {
  display: "flex",
  height: "100vh",
  width: "100vw",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  background: "#f8fafc",
  overflow: "hidden",
  position: "fixed",
  top: 0,
  left: 0,
};

const sidebar = {
  width: "260px",
  background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
  color: "white",
  padding: "20px 16px",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "fixed",
  height: "100vh",
  zIndex: 1000,
  boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
  overflowY: "auto",
  overflowX: "hidden",
};

const sidebarHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  paddingBottom: "16px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
};

const logo = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "18px",
  fontWeight: "700",
  margin: 0,
};

const logoIcon = {
  fontSize: "24px",
};

const logoText = {
  background: "linear-gradient(135deg, #60a5fa, #3b82f6)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const profileSection = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  marginBottom: "24px",
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  cursor: "pointer",
};

const profileAvatar = {
  width: "40px",
  height: "40px",
  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
};

const profileInfo = {
  flex: 1,
  overflow: "hidden",
};

const profileName = {
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "2px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const profileEmail = {
  fontSize: "11px",
  opacity: 0.7,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const navItems = {
  flex: 1,
};

const item = {
  padding: "10px 12px",
  borderRadius: "10px",
  cursor: "pointer",
  marginBottom: "6px",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  position: "relative",
};

const itemIcon = {
  fontSize: "18px",
  width: "22px",
};

const itemLabel = {
  fontSize: "14px",
  fontWeight: "500",
  flex: 1,
};

const activeIndicator = {
  position: "absolute",
  right: "12px",
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: "#3b82f6",
  boxShadow: "0 0 8px #3b82f6",
};

const main = {
  flex: 1,
  marginLeft: "260px",
  padding: "24px 32px",
  background: "#f8fafc",
  overflowY: "auto",
  height: "100vh",
  width: "calc(100% - 260px)",
};

const contentWrapper = {
  animation: "fadeIn 0.3s ease",
};

const divider = {
  margin: "16px 0",
  border: "none",
  height: "1px",
  background:
    "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
};

const logoutBtn = {
  width: "100%",
  padding: "10px",
  background: "linear-gradient(135deg, #ef4444, #dc2626)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "13px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  transition: "all 0.2s ease",
  marginTop: "auto",
  marginBottom: "26px",
};

const hamburgerBtn = {
  position: "fixed",
  top: "16px",
  left: "16px",
  zIndex: 1001,
  background: "#0f172a",
  border: "none",
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const hamburgerIcon = {
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
  animation: "fadeIn 0.3s ease",
};

const closeBtn = {
  background: "rgba(255, 255, 255, 0.1)",
  border: "none",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
  width: "30px",
  height: "30px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s",
};

// Add this to your global CSS or index.css
const globalStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Custom scrollbar for sidebar and main content */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #e2e8f0;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #94a3b8;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #64748b;
  }

  /* Sidebar custom scrollbar */
  ${sidebar}::-webkit-scrollbar {
    width: 4px;
  }

  ${sidebar}::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  ${sidebar}::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    ${main} {
      margin-left: 0;
      padding: 16px;
      width: 100%;
    }
    
    ${sidebar} {
      transform: translateX(-100%);
    }
    
    ${profileName} {
      font-size: 13px;
    }
    
    ${profileEmail} {
      font-size: 10px;
    }
  }

  @media (max-width: 480px) {
    ${main} {
      padding: 12px;
    }
    
    ${profileAvatar} {
      width: 35px;
      height: 35px;
      font-size: 18px;
    }
  }

  /* Prevent body scroll when sidebar is open on mobile */
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
`;

// Inject global styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = globalStyles;
  document.head.appendChild(styleSheet);
}

export default Layout;
