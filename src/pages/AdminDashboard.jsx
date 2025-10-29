import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../store/useStore';
import UserManagement from '../components/admin/UserManagement';
import ContentModeration from '../components/admin/ContentModeration';
import SystemSettings from '../components/admin/SystemSettings';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const { pendingContent } = useStore();

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 dashboard-sidebar text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full text-left p-3 rounded transition-colors ${
                activeTab === 'users' ? 'bg-primary-green-2' : 'hover:bg-primary-green-2/50'
              }`}
            >
              👥 User Management
            </button>
            <button
              onClick={() => setActiveTab('moderation')}
              className={`w-full text-left p-3 rounded transition-colors ${
                activeTab === 'moderation' ? 'bg-primary-green-2' : 'hover:bg-primary-green-2/50'
              }`}
            >
              📋 Content Moderation
              {pendingContent.length > 0 && (
                <span className="ml-2 bg-accent-coral text-white text-xs px-2 py-1 rounded-full">
                  {pendingContent.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left p-3 rounded transition-colors ${
                activeTab === 'settings' ? 'bg-primary-green-2' : 'hover:bg-primary-green-2/50'
              }`}
            >
              ⚙️ System Settings
            </button>
            <button
              onClick={logout}
              className="w-full text-left p-3 rounded hover:bg-accent-coral transition-colors mt-4"
            >
              🚪 Logout
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-card shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-foreground">
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'moderation' && 'Content Moderation'}
              {activeTab === 'settings' && 'System Settings'}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-muted">Welcome, {user.name}</span>
            </div>
          </div>
        </header>

        <div className="p-6">
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'moderation' && <ContentModeration />}
          {activeTab === 'settings' && <SystemSettings />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
