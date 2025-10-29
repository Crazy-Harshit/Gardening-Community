import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="w-full site-header">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="site-title">Gardening Community</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggle}
            className="theme-toggle text-sm"
            aria-label="Toggle theme"
          >
            <span>{theme === 'dark' ? '🌙 Dark' : '☀️ Light'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
