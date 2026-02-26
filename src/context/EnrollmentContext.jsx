import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "../utils/api";

const EnrollmentContext = createContext(null);

export function EnrollmentProvider({ children }) {
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [enrollLoading, setEnrollLoading] = useState(true);

  // Load enrollments from backend when token exists
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Not logged in => no enrollments
    if (!token) {
      setEnrolledIds([]);
      setEnrollLoading(false);
      return;
    }

    (async () => {
      try {
        // GET /enrollments returns full course objects (because of populate)
        const courses = await apiFetch("/enrollments");
        const ids = Array.isArray(courses) ? courses.map((c) => c._id) : [];
        setEnrolledIds(ids);
      } catch (e) {
        // token might be invalid, or server down
        console.error("Failed to load enrollments:", e);
        setEnrolledIds([]);
      } finally {
        setEnrollLoading(false);
      }
    })();
  }, []);

  const isEnrolled = (courseId) => enrolledIds.includes(courseId);

  const enroll = async (courseId, { silent = false } = {}) => {
    try {
      // optimistic guard
      if (enrolledIds.includes(courseId)) {
        if (!silent) toast.info("You’re already enrolled.");
        return;
      }

      await apiFetch(`/enrollments/${courseId}`, { method: "POST" });

      setEnrolledIds((prev) => {
        if (prev.includes(courseId)) return prev;
        return [...prev, courseId];
      });

      if (!silent) toast.success("Enrolled successfully!");
    } catch (e) {
      if (!silent) toast.error(e.message);
    }
  };

  // Optional: only works if you add DELETE route on backend
  const unenroll = async (courseId, { silent = false } = {}) => {
    try {
      await apiFetch(`/enrollments/${courseId}`, { method: "DELETE" });
      setEnrolledIds((prev) => prev.filter((id) => id !== courseId));
      if (!silent) toast.info("Unenrolled.");
    } catch (e) {
      if (!silent) toast.error(e.message);
    }
  };

  const clearEnrollments = () => {
    setEnrolledIds([]);
  };

  const value = useMemo(
    () => ({
      enrolledIds,
      enrollLoading,
      isEnrolled,
      enroll,
      unenroll,
      clearEnrollments,
    }),
    [enrolledIds, enrollLoading]
  );

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollments() {
  const ctx = useContext(EnrollmentContext);
  if (!ctx)
    throw new Error("useEnrollments must be used inside EnrollmentProvider");
  return ctx;
}