import { Link } from "react-router-dom";

export default function CourseCard({ course, isEnrolled, onEnroll }) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="aspect-video bg-gray-100">
        <img
          src={course.preview}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold">{course.title}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {course.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <Link
            to={`/courses/${course.id}`}
            className="text-blue-600 hover:underline"
          >
            View Course
          </Link>

          {isEnrolled ? (
            <button
              disabled
              className="bg-green-600 text-white px-3 py-1 rounded cursor-not-allowed"
            >
              Enrolled
            </button>
          ) : (
            <button
              onClick={() => onEnroll(course.id)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Enroll
            </button>
          )}
        </div>
      </div>
    </div>
  );
}