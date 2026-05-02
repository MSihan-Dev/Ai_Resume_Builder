console.log("SERVER STARTED");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// 📦 ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/resume", require("./routes/resumeRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

console.log("AUTH ROUTES LOADED");

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

console.log("MONGO_URI =", process.env.MONGO_URI);
