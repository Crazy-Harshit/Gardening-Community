import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const AuthContext = createContext(null);

const CREDENTIALS = {
  admin: {
    email: 'admin',
    password: 'admin123@',
    role: 'admin',
    name: 'Admin User'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const addUserToStore = useStore((s) => s.addUser);
  useEffect(() => {
    const storedUser = localStorage.getItem('gardenUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (parsedUser.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (parsedUser.role === 'gardener') {
          navigate('/gardener/dashboard');
        }
      } catch (error) {
        localStorage.removeItem('gardenUser');
      }
    }
    setLoading(false);
  }, [navigate]);

  const login = (email, password, rememberMe = false, userType = 'admin') => {
    if (userType === 'admin') {
      if (email === CREDENTIALS.admin.email && password === CREDENTIALS.admin.password) {
        const userData = {
          email: CREDENTIALS.admin.email,
          role: CREDENTIALS.admin.role,
          name: CREDENTIALS.admin.name
        };

        setUser(userData);
        if (rememberMe) {
          localStorage.setItem('gardenUser', JSON.stringify(userData));
        }

        navigate('/admin/dashboard');
        return { success: true };
      }
      return { success: false, error: 'Invalid admin credentials' };
    }

    if (userType === 'gardener') {
      const gardenerData = localStorage.getItem('gardenerCredentials');
      if (gardenerData) {
        const gardeners = JSON.parse(gardenerData);
        const gardener = gardeners.find(g => g.email === email && g.password === password);

        if (gardener) {
          const userData = {
            email: gardener.email,
            role: 'gardener',
            name: gardener.name
          };

          setUser(userData);
          if (rememberMe) {
            localStorage.setItem('gardenUser', JSON.stringify(userData));
          }

          navigate('/gardener/dashboard');
          return { success: true };
        }
      }
      return { success: false, error: 'Invalid gardener credentials' };
    }

    return { success: false, error: 'Invalid user type' };
  };

  const register = (name, email, password) => {
    const existingData = localStorage.getItem('gardenerCredentials');
    const gardeners = existingData ? JSON.parse(existingData) : [];

    if (gardeners.some(g => g.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    gardeners.push({ name, email, password });
    localStorage.setItem('gardenerCredentials', JSON.stringify(gardeners));
    
    try {
      addUserToStore({ name, email, role: 'gardener', password });
    } catch (e) {
    }
    return { success: true, message: 'Registration successful! Please login.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gardenUser');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { useAuth };
