import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-4 text-gray-700">You do not have permission to view this page.</p>
      <Link to="/dashboard" className="mt-4 inline-block text-blue-500 underline">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;
