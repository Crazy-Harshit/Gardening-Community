import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TipSharing from '../components/gardener/TipSharing';
import Discussions from '../components/gardener/Discussions';
import ProjectManagement from '../components/gardener/ProjectManagement';

const GardenerDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('tips');

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      <aside className="w-64 bg-green-700 dark:bg-green-900 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Gardener Portal</h2>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('tips')}
              className={`w-full text-left p-3 rounded ${
                activeTab === 'tips' ? 'bg-green-600' : 'hover:bg-green-600'
              }`}
            >
              💡 Share Tips
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`w-full text-left p-3 rounded ${
                activeTab === 'discussions' ? 'bg-green-600' : 'hover:bg-green-600'
              }`}
            >
              💬 Discussions
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left p-3 rounded ${
                activeTab === 'projects' ? 'bg-green-600' : 'hover:bg-green-600'
              }`}
            >
              🌱 My Projects
            </button>
            <button
              onClick={logout}
              className="w-full text-left p-3 rounded hover:bg-red-600 mt-4"
            >
              🚪 Logout
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {activeTab === 'tips' && 'Share Gardening Tips'}
              {activeTab === 'discussions' && 'Community Discussions'}
              {activeTab === 'projects' && 'My Gardening Projects'}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-300">Welcome, {user.name}</span>
            </div>
          </div>
        </header>

        <div className="p-6">
          {activeTab === 'tips' && <TipSharing />}
          {activeTab === 'discussions' && <Discussions />}
          {activeTab === 'projects' && <ProjectManagement />}
        </div>
      </main>
    </div>
  );
};

export default GardenerDashboard;
