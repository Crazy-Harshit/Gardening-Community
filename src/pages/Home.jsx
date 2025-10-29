import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700 dark:text-green-300 mb-2">
            🌱 Gardening Community Platform
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Share tips, discuss gardening topics, and manage your projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/dashboard"
            className="group p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">👨‍💼</div>
              <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-2">
                Admin Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Manage users, moderate content, and configure system settings
              </p>
            </div>
          </Link>

          <Link
            to="/gardener/dashboard"
            className="group p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">🌿</div>
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
                Gardener Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Share tips, join discussions, and manage your gardening projects
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
