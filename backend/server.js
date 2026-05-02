console.log("SERVER STARTED");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// 🔓 CORS FIRST (CRITICAL)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// 🔥 Handle preflight
app.options("*", cors());

// 🛡️ Security
app.use(helmet());
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Body parser
app.use(express.json());

// 📦 Routes
app.use("/api/auth", require("./routes/authRoutes"));
console.log("AUTH ROUTES LOADED");

app.use("/api/resumes", require("./routes/resumeRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));

// 🌐 Server
const PORT = process.env.PORT || 3000;
console.log("SERVER FILE RUNNING");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
