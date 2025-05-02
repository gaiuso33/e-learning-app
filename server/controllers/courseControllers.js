const Course = require("../models/Course");

// Create new course
exports.createCourse = async (req, res) => {
  const { title, description, videoUrl } = req.body;

  try {
    const course = await Course.create({
      title,
      description,
      videoUrl,
      instructor: req.user._id,
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create course", error: err });
  }
};

// Get instructor courses with enrolled students
exports.getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id }).populate("enrolledUsers", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch courses", error: err });
  }
};
