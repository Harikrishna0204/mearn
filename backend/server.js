const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

// ✅ Connect DB safely
connectDB();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "*",   // allow all (for now)
}));
app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/subscriptions", require("./routes/subscriptionRoutes"));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// ✅ Handle unknown routes (important)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});