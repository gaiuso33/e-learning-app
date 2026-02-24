import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const EnrollmentContext = createContext(null);

const KEY = "enrolledCourses";

function readEnrolled() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeEnrolled(ids) {
  localStorage.setItem(KEY, JSON.stringify(ids));
}

export function EnrollmentProvider({ children }) {
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [enrollLoading, setEnrollLoading] = useState(true);

  useEffect(() => {
    setEnrolledIds(readEnrolled());
    setEnrollLoading(false);
  }, []);

  const isEnrolled = (courseId) => enrolledIds.includes(courseId);

  const enroll = (courseId, { silent = false } = {}) => {
    setEnrolledIds((prev) => {
      if (prev.includes(courseId)) {
        if (!silent) toast.info("You’re already enrolled.");
        return prev;
      }
      const updated = [...prev, courseId];
      writeEnrolled(updated);
      if (!silent) toast.success("Enrolled successfully!");
      return updated;
    });
  };

  const unenroll = (courseId, { silent = false } = {}) => {
    setEnrolledIds((prev) => {
      if (!prev.includes(courseId)) return prev;
      const updated = prev.filter((id) => id !== courseId);
      writeEnrolled(updated);
      if (!silent) toast.info("Unenrolled.");
      return updated;
    });
  };

  const clearEnrollments = () => {
    writeEnrolled([]);
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
  if (!ctx) throw new Error("useEnrollments must be used inside EnrollmentProvider");
  return ctx;
}