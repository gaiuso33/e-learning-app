import courses from '../data/courses';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Courses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    setEnrolledCourses(stored);
  }, []);

  const handleEnroll = (id) => {
    const updated = [...enrolledCourses, id];
    setEnrolledCourses(updated);
    localStorage.setItem('enrolledCourses', JSON.stringify(updated));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="border rounded p-4 shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="mb-4">{course.description}</p>

            <div className="flex items-center gap-4">
              <Link
                to={`/course/${course.id}`}
                className="text-blue-600 hover:underline"
              >
                View Course
              </Link>

              {enrolledCourses.includes(course.id) ? (
                <button
                  disabled
                  className="bg-green-500 text-white px-4 py-2 rounded cursor-not-allowed"
                >
                  Enrolled
                </button>
              ) : (
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Enroll
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
