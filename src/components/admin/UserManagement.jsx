import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useForm } from 'react-hook-form';

const UserManagement = () => {
  const { users, addUser, updateUser, deleteUser } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  const persistGardenerCredential = (user) => {
    if (user.role !== 'gardener' || !user.email) return;
    const existing = localStorage.getItem('gardenerCredentials');
    const gardeners = existing ? JSON.parse(existing) : [];

    
    const idx = gardeners.findIndex(g => g.email === user.email);
    if (idx >= 0) {
      gardeners[idx] = { ...gardeners[idx], name: user.name, password: user.password || gardeners[idx].password };
    } else {
      gardeners.push({ name: user.name, email: user.email, password: user.password || '' });
    }

    localStorage.setItem('gardenerCredentials', JSON.stringify(gardeners));
  };

  const removeGardenerCredential = (email) => {
    if (!email) return;
    const existing = localStorage.getItem('gardenerCredentials');
    if (!existing) return;
    const gardeners = JSON.parse(existing).filter(g => g.email !== email);
    localStorage.setItem('gardenerCredentials', JSON.stringify(gardeners));
  };

  const onSubmit = (data) => {
    
    const payload = { ...data };

    if (editingUser) {
      updateUser(editingUser.id, payload);
  alert('User updated successfully!');
  if (payload.role === 'gardener') persistGardenerCredential({ ...payload, email: payload.email });
  if (editingUser.role === 'gardener' && payload.role !== 'gardener') removeGardenerCredential(editingUser.email);
    } else {
      addUser(payload);
      alert('User created successfully!');
      if (payload.role === 'gardener') persistGardenerCredential(payload);
    }

    setIsModalOpen(false);
    reset();
    setEditingUser(null);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('role', user.role);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const u = users.find(x => x.id === id);
      deleteUser(id);
      if (u && u.role === 'gardener') {
        removeGardenerCredential(u.email);
      }
      alert('User deleted successfully!');
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground">User Accounts</h2>
        <button
          onClick={() => {
            setEditingUser(null);
            reset({ name: '', email: '', role: 'gardener' });
            setIsModalOpen(true);
          }}
          className="btn btn-primary btn-accent-green px-4 py-2 rounded"
        >
          Add New User
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-primary-green/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-foreground">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-muted">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin' ? 'bg-accent-coral/20 text-accent-coral' : 'bg-primary-light/20 text-primary-green'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2 text-sm">
                  <button
                    onClick={() => handleEdit(user)}
                    className="btn-primary btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-card p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground">Name</label>
                  <input
                    {...register('name', { required: true })}
                    className="form-input mt-1"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    {...register('email', { required: true })}
                    className="form-input mt-1"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Password</label>
                  <input
                    type="password"
                    {...register('password')}
                    className="form-input mt-1"
                    placeholder="Set a password (for gardeners)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Role</label>
                  <select
                    {...register('role', { required: true })}
                    className="form-select mt-1"
                  >
                    <option value="gardener">Gardener</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    reset();
                    setEditingUser(null);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary btn-accent-green"
                >
                  {editingUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
