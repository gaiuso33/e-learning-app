const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Course", courseSchema);
