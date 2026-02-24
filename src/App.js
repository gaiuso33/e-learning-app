import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Profile from "./pages/Profile";
import { EnrollmentProvider } from "./context/EnrollmentContext";

// ✅ add these two imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <EnrollmentProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* ✅ mount once at the bottom */}
        <ToastContainer position="top-right" autoClose={2500} />
        </EnrollmentProvider>
      </AuthProvider>
    </Router>

  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import Dashboard from "./pages/Dashboard";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import Navbar from "./components/Navbar";
// import Courses from "./pages/Courses";
// import CourseDetail from "./pages/CourseDetail";
// import Profile from "./pages/Profile";

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/signin" element={<SignIn />} />
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/courses"
//             element={
//               <ProtectedRoute>
//                 <Courses />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/courses/:id"
//             element={
//               <ProtectedRoute>
//                 <CourseDetail />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;
