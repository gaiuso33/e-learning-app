require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("./models/Course");

const courses = [
  {
    title: "React for Beginners",
    description: "Learn the basics of React including components, props, and state.",
    preview: "https://img.youtube.com/vi/Ke90Tje7VS0/0.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
  },
  {
    title: "Tailwind CSS Crash Course",
    description: "Master styling quickly using Tailwind utility-first classes.",
    preview: "https://img.youtube.com/vi/dFgzHOX84xQ/0.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dFgzHOX84xQ",
  },
  {
    title: "JavaScript Fundamentals",
    description: "Deep dive into JavaScript concepts needed for frontend devs.",
    preview: "https://img.youtube.com/vi/hdI2bqOjy3c/0.jpg",
    videoUrl: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
  },
  {
    title: "Node.js and Express",
    description: "Build backend applications using Node.js and Express.",
    preview: "https://img.youtube.com/vi/Oe421EPjeBE/0.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
  },
  {
    title: "Python for Data Science",
    description: "Learn Python programming with a focus on data science applications.",
    preview: "https://img.youtube.com/vi/Jv8nY1g2X6A/0.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Jv8nY1g2X6A",
  },
  {
    title: "Django Web Framework",
    description: "Build web applications using the Django framework in Python.",
    preview: "https://img.youtube.com/vi/rHux0_7Bik0/0.jpg",
    videoUrl: "https://www.youtube.com/watch?v=rHux0_7Bik0",
  },
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected for seeding");

    // optional: clear old courses
    await Course.deleteMany({});
    await Course.insertMany(courses);

    console.log("✅ Seeded courses:", courses.length);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

run();
