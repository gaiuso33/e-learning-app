import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ManageEnrollments = () => {
  const [courses, setCourses] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/instructor/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch enrollments", err);
      }
    };

    fetchEnrollments();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Course Enrollments</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Students Enrolled</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td className="border px-4 py-2">{course.title}</td>
              <td className="border px-4 py-2">{course.enrolledUsers.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEnrollments;
