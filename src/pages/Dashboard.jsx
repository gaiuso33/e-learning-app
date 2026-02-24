import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEnrollments } from "../context/EnrollmentContext";
import courses from "../data/courses";

function Dashboard() {
  const { user } = useAuth();
  const { enrolledIds, enrollLoading } = useEnrollments();

  const enrolledCourseDetails = courses.filter((course) =>
    enrolledIds.includes(course.id)
  );

  const displayName = user?.fullName || user?.email || "Student";

  if (enrollLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {displayName}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here’s your learning progress and enrolled courses.
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex justify-center items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Browse Courses
          </Link>
        </div>

        {enrolledCourseDetails.length === 0 ? (
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              No enrolled courses yet
            </h2>
            <p className="text-gray-600 mt-2">
              Start learning by enrolling in your first course.
            </p>

            <Link
              to="/courses"
              className="inline-flex mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Go to Courses
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Enrolled Courses
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourseDetails.map((course) => (
                <div
                  key={course.id}
                  className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={course.preview}
                      alt={`${course.title} preview`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {course.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-full">
                        Enrolled
                      </span>

                      <Link
                        to={`/courses/${course.id}`}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        Continue →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;