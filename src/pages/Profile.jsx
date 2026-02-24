import { useAuth } from "../context/AuthContext";
import { useEnrollments } from "../context/EnrollmentContext";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useAuth();
  const { enrolledIds, enrollLoading } = useEnrollments();

  if (!user || enrollLoading) {
    return <div className="p-8">Loading...</div>;
  }

  const enrolledCount = enrolledIds.length;
  const displayName = user.fullName || user.email;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1 bg-white border rounded-xl p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
                {displayName.charAt(0).toUpperCase()}
              </div>

              <h2 className="mt-3 text-lg font-semibold text-gray-900">
                {displayName}
              </h2>

              <p className="text-sm text-gray-600 mt-1">{user.email}</p>

              <span className="mt-2 text-xs bg-gray-100 px-3 py-1 rounded-full">
                Student
              </span>
            </div>
          </div>

          {/* Info + Stats */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Account Info
              </h3>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Full Name: </span>
                  {user.fullName || "Not set"}
                </p>
                <p>
                  <span className="font-medium">Email: </span>
                  {user.email}
                </p>
                <p>
                  <span className="font-medium">Role: </span>
                  Student
                </p>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Learning Stats
              </h3>

              <div className="flex items-center justify-between">
                <p className="text-gray-700">Enrolled Courses</p>
                <span className="text-xl font-bold text-blue-600">
                  {enrolledCount}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Go to Dashboard
              </Link>

              <Link
                to="/courses"
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;