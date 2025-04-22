import { useParams, useNavigate } from 'react-router-dom';
import courses from '../data/courses';
import { useEffect, useState } from 'react';

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(false);

  const course = courses.find((c) => c.id === parseInt(id));

  useEffect(() => {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    if (enrolledCourses.includes(course?.id)) {
      setEnrolled(true);
    }
  }, [course?.id]);

  const handleEnroll = () => {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    if (!enrolledCourses.includes(course.id)) {
      enrolledCourses.push(course.id);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
      setEnrolled(true);
      navigate('/dashboard'); // 🔥 redirect to dashboard
    }
  };


  if (!course) {
    return <div className="p-8">Course not found.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-6">{course.description}</p>
      <div className="aspect-video mb-6">
        <iframe
          src={course.videoUrl}
          title={course.title}
          frameBorder="0"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>

      {enrolled ? (
        <button
          disabled
          className="bg-green-500 text-white px-6 py-2 rounded cursor-not-allowed"
        >
          Enrolled ✅
        </button>
      ) : (
        <button
          onClick={handleEnroll}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Enroll Now
        </button>
      )}
    </div>
  );
}

export default CourseDetail;
