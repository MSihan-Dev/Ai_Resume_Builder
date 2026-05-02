import { useEffect, useRef, useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const userId = localStorage.getItem("userId");

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const loadChat = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/chat/${userId}`);
        const data = await res.json();
        setMessages(data || []);
      } catch (err) {
        console.log("Failed to load chat");
      }
    };
    loadChat();
    inputRef.current?.focus();
  }, [userId]);

  // Auto scroll to bottom
  useEffect(() => {
    requestAnimationFrame(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [messages, loading, isTyping]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    setIsTyping(true);

    // Create user message
    const userMessage = {
      role: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: new Date(),
    };

    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput("");

    const resumeData = JSON.parse(localStorage.getItem("resume") || "{}");
    const resumeText = `
      Name: ${resumeData?.name || ""}
      Skills: ${resumeData?.skills || ""}
      Experience: ${resumeData?.experience || ""}
      Education: ${resumeData?.education || ""}
    `;

    // Save user message to DB
    try {
      fetch("http://localhost:3000/api/chat/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage }),
      });
    } catch (err) {
      console.log("Failed to save message");
    }

    try {
      // Call AI
      const res = await fetch("http://localhost:8000/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: input,
          history: updated,
          resume: resumeText,
        }),
      });

      const data = await res.json();

      const botMessage = {
        role: "bot",
        text: data.improved || "No response from AI",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        timestamp: new Date(),
      };

      const finalChat = [...updated, botMessage];
      setMessages(finalChat);

      // Save bot message to DB
      await fetch("http://localhost:3000/api/chat/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          message: botMessage,
        }),
      });
    } catch (err) {
      setMessages([
        ...updated,
        {
          role: "bot",
          text: "⚠️ AI server is not responding. Please try again later.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = async () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([]);
      try {
        await fetch(`http://localhost:3000/api/chat/clear/${userId}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.log("Failed to clear chat");
      }
    }
  };

  const getSuggestion = (suggestion) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div style={container}>
      {/* Header */}
      <div style={header}>
        <div style={headerContent}>
          <div style={avatarContainer}>
            <span style={botAvatar}>🤖</span>
            <span style={onlineDot}></span>
          </div>
          <div style={headerInfo}>
            <h2 style={headerTitle}>AI Career Assistant</h2>
            <p style={headerStatus}>
              {isTyping ? "Typing..." : "Online • Ready to help"}
            </p>
          </div>
        </div>
        <div style={headerActions}>
          <button style={iconBtn} onClick={clearChat} title="Clear chat">
            🗑️
          </button>
          <button
            style={iconBtn}
            onClick={() => window.location.reload()}
            title="Refresh"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div style={chatBox}>
        {messages.length === 0 ? (
          <div style={welcomeContainer}>
            <div style={welcomeIcon}>💬</div>
            <h3 style={welcomeTitle}>Welcome to AI Career Assistant!</h3>
            <p style={welcomeText}>
              Ask me anything about your resume, career advice, interview tips,
              or skill improvement.
            </p>
            <div style={suggestions}>
              <button
                style={suggestionBtn}
                onClick={() => getSuggestion("How can I improve my resume?")}
              >
                📝 Improve my resume
              </button>
              <button
                style={suggestionBtn}
                onClick={() => getSuggestion("What skills should I add?")}
              >
                ⚡ Skills to add
              </button>
              <button
                style={suggestionBtn}
                onClick={() => getSuggestion("Interview tips for my role")}
              >
                🎯 Interview tips
              </button>
              <button
                style={suggestionBtn}
                onClick={() => getSuggestion("Career path suggestions")}
              >
                🚀 Career path
              </button>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...messageWrapper,
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.role === "bot" && (
                  <div style={botIcon}>{msg.isError ? "⚠️" : "🤖"}</div>
                )}
                <div
                  style={{
                    ...messageBubble,
                    ...(msg.role === "user"
                      ? userBubble
                      : msg.isError
                        ? errorBubble
                        : botBubble),
                  }}
                >
                  <div style={messageText}>{msg.text}</div>
                  {msg.time && <div style={messageTime}>{msg.time}</div>}
                </div>
                {msg.role === "user" && <div style={userIcon}>👤</div>}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div style={messageWrapper}>
                <div style={botIcon}>🤖</div>
                <div style={{ ...messageBubble, ...typingBubble }}>
                  <div style={typingDots}>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div style={inputContainer}>
        <div style={inputWrapper}>
          <textarea
            ref={inputRef}
            style={inputStyle}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your resume, career advice, or interview tips..."
            rows="1"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            style={{ ...sendBtn, opacity: !input.trim() || loading ? 0.5 : 1 }}
            disabled={!input.trim() || loading}
          >
            {loading ? "⏳" : "📤"}
            <span style={sendBtnText}>Send</span>
          </button>
        </div>
        <div style={inputHint}>
          💡 Press Enter to send • Shift + Enter for new line
        </div>
      </div>

      {/* Resume Context Indicator */}
      <div style={contextBar}>
        <span style={contextIcon}>📄</span>
        <span style={contextText}>
          AI has access to your resume data for personalized suggestions
        </span>
      </div>
    </div>
  );
};

// =====================
// STYLES
// =====================
const container = {
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 100px)",
  background: "#f8fafc",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const header = {
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
  color: "white",
  padding: "20px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
};

const headerContent = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const avatarContainer = {
  position: "relative",
};

const botAvatar = {
  fontSize: "32px",
  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  borderRadius: "50%",
  padding: "8px",
  display: "inline-block",
};

const onlineDot = {
  position: "absolute",
  bottom: "4px",
  right: "4px",
  width: "10px",
  height: "10px",
  background: "#22c55e",
  borderRadius: "50%",
  border: "2px solid #0f172a",
};

const headerInfo = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const headerTitle = {
  margin: 0,
  fontSize: "18px",
  fontWeight: "600",
};

const headerStatus = {
  margin: 0,
  fontSize: "12px",
  opacity: 0.8,
};

const headerActions = {
  display: "flex",
  gap: "8px",
};

const iconBtn = {
  background: "rgba(255, 255, 255, 0.1)",
  border: "none",
  borderRadius: "8px",
  padding: "8px",
  cursor: "pointer",
  fontSize: "18px",
  transition: "all 0.2s",
  color: "white",
};

const chatBox = {
  flex: 1,
  padding: "20px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  background: "#f8fafc",
};

const welcomeContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  textAlign: "center",
  padding: "40px",
};

const welcomeIcon = {
  fontSize: "64px",
  marginBottom: "20px",
};

const welcomeTitle = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#1e293b",
  marginBottom: "12px",
};

const welcomeText = {
  fontSize: "14px",
  color: "#64748b",
  marginBottom: "32px",
  maxWidth: "500px",
};

const suggestions = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const suggestionBtn = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "20px",
  padding: "10px 16px",
  cursor: "pointer",
  fontSize: "13px",
  color: "#1e293b",
  transition: "all 0.2s",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
};

const messageWrapper = {
  display: "flex",
  gap: "10px",
  alignItems: "flex-start",
  animation: "fadeIn 0.3s ease",
};

const messageBubble = {
  maxWidth: "70%",
  padding: "12px 16px",
  borderRadius: "12px",
  position: "relative",
};

const userBubble = {
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  color: "white",
  borderBottomRightRadius: "4px",
};

const botBubble = {
  background: "white",
  color: "#1e293b",
  borderBottomLeftRadius: "4px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  border: "1px solid #e2e8f0",
};

const errorBubble = {
  background: "#fee2e2",
  color: "#dc2626",
  borderBottomLeftRadius: "4px",
  border: "1px solid #fecaca",
};

const typingBubble = {
  background: "white",
  padding: "16px 20px",
};

const typingDots = {
  display: "flex",
  gap: "4px",
  fontSize: "20px",
};

const messageText = {
  fontSize: "14px",
  lineHeight: "1.5",
  wordBreak: "break-word",
};

const messageTime = {
  fontSize: "10px",
  marginTop: "6px",
  opacity: 0.7,
  textAlign: "right",
};

const botIcon = {
  width: "32px",
  height: "32px",
  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  flexShrink: 0,
};

const userIcon = {
  width: "32px",
  height: "32px",
  background: "linear-gradient(135deg, #10b981, #059669)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  flexShrink: 0,
};

const inputContainer = {
  padding: "20px",
  background: "white",
  borderTop: "1px solid #e2e8f0",
};

const inputWrapper = {
  display: "flex",
  gap: "12px",
  alignItems: "flex-end",
};

const inputStyle = {
  flex: 1,
  padding: "12px 16px",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  fontSize: "14px",
  fontFamily: "inherit",
  resize: "none",
  outline: "none",
  transition: "all 0.2s",
  maxHeight: "100px",
};

const sendBtn = {
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  border: "none",
  borderRadius: "12px",
  padding: "12px 20px",
  cursor: "pointer",
  color: "white",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.2s",
};

const sendBtnText = {
  display: "inline",
};

const inputHint = {
  fontSize: "11px",
  color: "#94a3b8",
  marginTop: "8px",
  textAlign: "center",
};

const contextBar = {
  background: "#f1f5f9",
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  justifyContent: "center",
  borderTop: "1px solid #e2e8f0",
  fontSize: "11px",
  color: "#64748b",
};

const contextIcon = {
  fontSize: "14px",
};

const contextText = {
  fontSize: "11px",
};

// Add CSS animations
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

  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-10px);
    }
  }

  ${typingDots} span {
    animation: typing 1.4s infinite;
  }
  
  ${typingDots} span:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  ${typingDots} span:nth-child(3) {
    animation-delay: 0.4s;
  }

  ${suggestionBtn}:hover {
    background: #f1f5f9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  ${iconBtn}:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  ${sendBtn}:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  ${inputStyle}:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
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

  /* Responsive styles */
  @media (max-width: 768px) {
    ${container} {
      height: calc(100vh - 80px);
      border-radius: 12px;
    }
    
    ${messageBubble} {
      max-width: 85%;
    }
    
    ${suggestions} {
      flex-direction: column;
      align-items: stretch;
    }
    
    ${suggestionBtn} {
      width: 100%;
    }
    
    ${sendBtnText} {
      display: none;
    }
    
    ${sendBtn} {
      padding: 12px;
    }
    
    ${headerTitle} {
      font-size: 16px;
    }
    
    ${botAvatar} {
      font-size: 24px;
      padding: 6px;
    }
    
    ${welcomeTitle} {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    ${chatBox} {
      padding: 12px;
    }
    
    ${messageBubble} {
      max-width: 90%;
      padding: 10px 12px;
    }
    
    ${welcomeIcon} {
      font-size: 48px;
    }
    
    ${header} {
      padding: 16px;
    }
    
    ${inputContainer} {
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

export default Chatbot;
