import courses from "../data/courses";
import { useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";
import { useEnrollments } from "../context/EnrollmentContext";

function Courses() {
  const [query, setQuery] = useState("");

  // ✅ comes from context now (single source of truth)
  const { isEnrolled, enroll, enrollLoading } = useEnrollments();

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;

    return courses.filter((c) => {
      return (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    });
  }, [query]);

  // optional: show a tiny loading state while enrollments restore
  if (enrollLoading) {
    return (
      <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto text-gray-600">Loading...</div>
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
              Pick a course and start learning. Your enrollments show up on your
              dashboard.
            </p>
          </div>

          {/* Search */}
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
                key={course.id}
                course={course}
                isEnrolled={isEnrolled(course.id)}
                onEnroll={enroll} // ✅ enroll(courseId)
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;