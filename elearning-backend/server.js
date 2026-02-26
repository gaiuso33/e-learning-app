const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const authRoute = require("./routes/auth");
const coursesRoute = require("./routes/courses");
const enrollmentRoute = require("./routes/enrollments");


app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/courses", coursesRoute);
app.use("/enrollments", enrollmentRoute);
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    dbState: mongoose.connection.readyState, // 0=disconnected, 1=connected
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
