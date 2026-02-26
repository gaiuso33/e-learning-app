import { Link } from "react-router-dom";

export default function CourseCard({ course, isEnrolled, onEnroll }) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
      <p className="text-gray-600 mb-4">{course.description}</p>

      <div className="flex items-center gap-4">
        <Link
          to={`/courses/${course._id}`}
          className="text-blue-600 hover:underline"
        >
          View Course
        </Link>

        {isEnrolled ? (
          <button
            disabled
            className="bg-green-600 text-white px-4 py-2 rounded opacity-90 cursor-not-allowed"
          >
            Enrolled ✅
          </button>
        ) : (
          <button
            onClick={() => onEnroll(course._id)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Enroll
          </button>
        )}
      </div>
    </div>
  );
}