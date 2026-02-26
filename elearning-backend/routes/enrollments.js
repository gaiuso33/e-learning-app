const express = require("express");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const router = express.Router();

// POST /enrollments/:courseId
router.post("/:courseId", auth, async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const enrollment = await Enrollment.create({
      user: req.userId,
      course: courseId,
    });
    const populated = await enrollment.populate("course");
    res.status(201).json(populated);
  } catch (err) {
    console.error("ENROLL ERROR:", err);

    if (err.code === 11000) {
      return res.status(409).json({ message: "Already enrolled" });
    }

    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /enrollments/:courseId (unenroll)
router.delete("/:courseId", auth, async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const deleted = await Enrollment.findOneAndDelete({
      user: req.userId,
      course: courseId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    return res.json({ ok: true, message: "Unenrolled" });
  } catch (err) {
    console.error("UNENROLL ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET /enrollments (my courses)
router.get("/", auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.userId })
      .populate("course");

    const courses = enrollments.map((e) => e.course);

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
