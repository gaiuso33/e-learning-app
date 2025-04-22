import { useAuth } from '../context/AuthContext';
import courses from '../data/courses';

function Dashboard() {
  const { user } = useAuth();
  const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];

  const enrolledCourseDetails = courses.filter((course) =>
    enrolledCourses.includes(course.id)
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.email}!</h1>

      {enrolledCourseDetails.length === 0 ? (
        <p className="text-gray-600">You have not enrolled in any courses yet. Visit the <span className="text-blue-500 underline"><a href="/courses">Courses page</a></span> to start learning!</p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Your Enrolled Courses:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourseDetails.map((course) => (
              <div
                key={course.id}
                className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <a
                  href={`/courses/${course.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Go to Course
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
