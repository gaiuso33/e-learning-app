import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to E-Learn Hub 🚀</h1>
      <p className="text-xl mb-8 text-center max-w-xl">
        Learn new skills online anytime, anywhere. Join thousands of learners on the journey to success!
      </p>
      <Link to="/courses">
        <button className="bg-white text-blue-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200">
          Browse Courses
        </button>
      </Link>

      {/* Features section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 px-6">
        <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Learn Anywhere</h2>
          <p>Study on your phone, tablet, or laptop at your own pace.</p>
        </div>
        <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Expert Instructors</h2>
          <p>Learn from industry leaders and experienced teachers.</p>
        </div>
        <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Lifetime Access</h2>
          <p>Access your enrolled courses forever, with no limits.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
