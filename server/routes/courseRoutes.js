const express = require("express");
const router = express.Router();
const {
  createCourse,
  getInstructorCourses,
} = require("../controllers/courseController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", protect, authorizeRoles("instructor"), createCourse);
router.get("/instructor/courses", protect, authorizeRoles("instructor"), getInstructorCourses);

module.exports = router;
