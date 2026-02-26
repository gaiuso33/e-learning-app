import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useEnrollments } from "../context/EnrollmentContext";
import { apiFetch } from "../utils/api";

function CourseDetail() {
  const { id } = useParams(); // this is Mongo _id now
  const navigate = useNavigate();

  const { isEnrolled, enroll, unenroll, enrollLoading } = useEnrollments();

  const [course, setCourse] = useState(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [courseError, setCourseError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setCourseError("");
        const data = await apiFetch(`/courses/${id}`);
        setCourse(data);
      } catch (e) {
        setCourse(null);
        setCourseError(e.message);
      } finally {
        setCourseLoading(false);
      }
    })();
  }, [id]);

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="max-w-4xl mx-auto bg-white border rounded-xl p-6">
          <p className="text-gray-800 font-medium">
            {courseError || "Course not found."}
          </p>
          <Link
            to="/courses"
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const enrolled = isEnrolled(course._id);

  const handleEnroll = async () => {
    await enroll(course._id);
    navigate("/dashboard");
  };

  const handleUnenroll = async () => {
  await unenroll(course._id);
};

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/courses"
          className="inline-block mb-5 text-blue-600 hover:underline"
        >
          ← Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-xl p-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {course.title}
              </h1>
              <p className="text-gray-600 mt-2">{course.description}</p>

              <div className="mt-6 aspect-video rounded-lg overflow-hidden bg-black">
                <ReactPlayer
                  url={course.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            </div>

            {/* Lessons (fake for now) */}
            <div className="bg-white border rounded-xl p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Lessons</h2>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li className="p-3 rounded-lg bg-gray-50 border">
                  1) Introduction
                </li>
                <li className="p-3 rounded-lg bg-gray-50 border">
                  2) Core Concepts
                </li>
                <li className="p-3 rounded-lg bg-gray-50 border">
                  3) Project Walkthrough
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                (We’ll make this dynamic later.)
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-xl overflow-hidden">
              <div className="aspect-video bg-gray-100">
                <img
                  src={course.preview}
                  alt={`${course.title} preview`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span
                    className={`text-sm font-medium ${
                      enrolled ? "text-green-700" : "text-gray-800"
                    }`}
                  >
                    {enrolled ? "Enrolled" : "Not enrolled"}
                  </span>
                </div>

                {enrolled ? (
  <button
    onClick={handleUnenroll}
    disabled={enrollLoading}
    className={`mt-4 w-full px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 ${
      enrollLoading ? "opacity-70 cursor-wait" : ""
    }`}
  >
    {enrollLoading ? "Loading..." : "Unenroll"}
  </button>
) : (
  <button
    onClick={handleEnroll}
    disabled={enrollLoading}
    className={`mt-4 w-full px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 ${
      enrollLoading ? "opacity-70 cursor-wait" : ""
    }`}
  >
    {enrollLoading ? "Loading..." : "Enroll Now"}
  </button>
)}

                <button
                  onClick={() => navigate("/dashboard")}
                  className="mt-3 w-full px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>

            <div className="mt-6 bg-white border rounded-xl p-5">
              <h3 className="font-semibold text-gray-900">What you’ll learn</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc pl-5">
                <li>Practical concepts and examples</li>
                <li>Hands-on learning with a project mindset</li>
                <li>Confidence to apply skills immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;