import { create } from 'zustand';

const adminUser = { id: 1, name: 'Admin User', email: 'admin', role: 'admin' };

function loadRegisteredGardeners() {
  try {
    const raw = localStorage.getItem('gardenerCredentials');
    if (!raw) return [];
    const gardeners = JSON.parse(raw);
    return gardeners.map((g, i) => ({ id: Date.now() + i + 2, name: g.name, email: g.email, role: 'gardener' }));
  } catch (e) {
    return [];
  }
}

const mockTips = [
  {
    id: 1,
    title: 'Water Your Plants Early Morning',
    description: 'Watering plants early in the morning reduces water loss through evaporation and gives plants time to dry before evening.',
    author: 'Jane Smith',
    createdAt: new Date('2025-10-15'),
    photos: []
  },
  {
    id: 2,
    title: 'Use Compost for Better Soil',
    description: 'Adding compost to your soil improves its structure, adds nutrients, and helps retain moisture.',
    author: 'Bob Johnson',
    createdAt: new Date('2025-10-20'),
    photos: []
  }
];

const mockProjects = [
  {
    id: 1,
    name: 'Vegetable Garden',
    description: 'Growing tomatoes, peppers, and herbs in the backyard',
    progress: 65,
  },
  {
    id: 2,
    name: 'Rose Garden',
    description: 'Creating a beautiful rose garden with various colored roses',
    progress: 40,
  }
];

const mockDiscussions = [
  {
    id: 1,
    topic: 'Best soil for tomatoes?',
    author: 'Jane Smith',
    comments: 5,
    createdAt: new Date('2025-10-25'),
    content: 'What type of soil works best for growing tomatoes? I am having trouble with my plants.'
  },
  {
    id: 2,
    topic: 'Dealing with garden pests naturally',
    author: 'Bob Johnson',
    comments: 8,
    createdAt: new Date('2025-10-28'),
    content: 'Looking for organic pest control methods. Any suggestions?'
  }
];

const mockPendingContent = [
  {
    id: 1,
    type: 'tip',
    title: 'Pruning Techniques for Fruit Trees',
    description: 'Learn the best time and methods for pruning fruit trees to maximize yield.',
    author: 'New Gardener',
    photos: []
  }
];

export const useStore = create((set) => ({
  tips: mockTips,
  setTips: (tips) => set({ tips }),
  addTip: (tip) => set((state) => ({ 
    tips: [...state.tips, { ...tip, id: Date.now(), createdAt: new Date() }] 
  })),

  discussions: mockDiscussions,
  setDiscussions: (discussions) => set({ discussions }),
  addDiscussion: (discussion) => set((state) => ({ 
    discussions: [...state.discussions, { ...discussion, id: Date.now(), createdAt: new Date(), comments: 0 }] 
  })),

  projects: mockProjects,
  setProjects: (projects) => set({ projects }),
  addProject: (project) => set((state) => ({ 
    projects: [...state.projects, { ...project, id: Date.now(), progress: 0 }] 
  })),
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter(p => p.id !== id)
  })),

  users: [adminUser, ...loadRegisteredGardeners()],
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => {
    const newUser = { ...user, id: Date.now() };
    if (newUser.role === 'gardener') {
      try {
        const existing = localStorage.getItem('gardenerCredentials');
        const gardeners = existing ? JSON.parse(existing) : [];
        const idx = gardeners.findIndex(g => g.email === newUser.email);
        if (idx >= 0) gardeners[idx] = { name: newUser.name, email: newUser.email, password: newUser.password || gardeners[idx].password };
        else gardeners.push({ name: newUser.name, email: newUser.email, password: newUser.password || '' });
        localStorage.setItem('gardenerCredentials', JSON.stringify(gardeners));
      } catch (e) {
      }
    }
    return { users: [...state.users, newUser] };
  }),
  updateUser: (id, updates) => set((state) => {
    const users = state.users.map(u => u.id === id ? { ...u, ...updates } : u);
    const updated = users.find(u => u.id === id);
    if (updated && updated.role === 'gardener') {
      try {
        const existing = localStorage.getItem('gardenerCredentials');
        const gardeners = existing ? JSON.parse(existing) : [];
        const idx = gardeners.findIndex(g => g.email === updated.email);
        if (idx >= 0) gardeners[idx] = { name: updated.name, email: updated.email, password: updates.password || gardeners[idx].password };
        else gardeners.push({ name: updated.name, email: updated.email, password: updates.password || '' });
        localStorage.setItem('gardenerCredentials', JSON.stringify(gardeners));
      } catch (e) {}
    }
    return { users };
  }),
  deleteUser: (id) => set((state) => {
    const userToDelete = state.users.find(u => u.id === id);
    const users = state.users.filter(u => u.id !== id);
    if (userToDelete && userToDelete.role === 'gardener') {
      try {
        const existing = localStorage.getItem('gardenerCredentials');
        if (existing) {
          const gardeners = JSON.parse(existing).filter(g => g.email !== userToDelete.email);
          localStorage.setItem('gardenerCredentials', JSON.stringify(gardeners));
        }
      } catch (e) {}
    }
    return { users };
  }),

  pendingContent: mockPendingContent,
  setPendingContent: (content) => set({ pendingContent }),
  approveContent: (id) => set((state) => ({
    pendingContent: state.pendingContent.filter(c => c.id !== id)
  })),

  settings: {
    siteName: 'Gardening Community',
    maintenanceMode: false,
    allowRegistration: true,
  },
  updateSettings: (updates) => set((state) => ({
    settings: { ...state.settings, ...updates }
  }))
}));
