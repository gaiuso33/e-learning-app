import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useAuth();

  // ✅ wait until we know whether user exists
  if (authLoading) {
    return (
      <div className="p-6 text-gray-600">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return children;
}

// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// function ProtectedRoute({ children }) {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/signin" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;
