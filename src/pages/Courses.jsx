import { useEffect, useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";
import { useEnrollments } from "../context/EnrollmentContext";
import { apiFetch } from "../utils/api";

function Courses() {
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState("");

  const { isEnrolled, enroll, enrollLoading } = useEnrollments();

  useEffect(() => {
    (async () => {
      try {
        setCoursesError("");
        const data = await apiFetch("/courses"); // ✅ from backend
        setCourses(Array.isArray(data) ? data : []);
      } catch (e) {
        setCoursesError(e.message);
      } finally {
        setCoursesLoading(false);
      }
    })();
  }, []);

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;

    return courses.filter((c) => {
      return (
        c.title?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
      );
    });
  }, [query, courses]);

  if (coursesLoading || enrollLoading) {
    return (
      <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto text-gray-600">Loading...</div>
      </div>
    );
  }

  if (coursesError) {
    return (
      <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white border rounded-xl p-6">
          <p className="text-red-600 font-medium">Failed to load courses</p>
          <p className="text-gray-700 mt-2">{coursesError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
            <p className="text-gray-600 mt-1">
              Pick a course and start learning. Your enrollments show up on your dashboard.
            </p>
          </div>

          <div className="w-full md:w-80">
            <label className="text-sm text-gray-600">Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-1 w-full border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="React, Tailwind, Node..."
            />
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-white border rounded-xl p-6 text-gray-700">
            No courses match “{query}”.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course._id}                 // ✅ Mongo id
                course={course}
                isEnrolled={isEnrolled(course._id)}
                onEnroll={enroll} // ✅ enroll with Mongo id
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;