import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/courses",
        { title, description, videoUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Course created successfully!");
      setTitle("");
      setDescription("");
      setVideoUrl("");
    } catch (err) {
      console.error("Course creation failed", err);
      alert("Failed to create course.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create a New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
          required
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Upload Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
