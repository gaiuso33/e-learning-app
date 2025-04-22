import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-bold text-blue-600">
          E-Learn Hub
        </Link>
        <Link to="/courses" className="text-gray-600 hover:text-blue-600">
          Courses
        </Link>
        {user && (
          <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
            Dashboard
          </Link>
        )}
      </div>
      {user && (
        <Link to="/profile" className="text-white hover:text-gray-300">
          Profile
        </Link>
      )}
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link to="/signin" className="text-gray-600 hover:text-blue-600">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
