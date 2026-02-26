const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

// GET /courses
router.get("/", async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json(courses);
});

// GET /courses/:id
const mongoose = require("mongoose");
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (err) {
    console.error("GET COURSE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;