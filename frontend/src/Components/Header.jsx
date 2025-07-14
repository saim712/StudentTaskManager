import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';

export default function Header({ darkMode, setDarkMode, showMenu, setShowMenu }) {
  return (
    <div className="flex items-center justify-between py-6 border-b border-gray-700">
      <h1 className="text-4xl font-extrabold tracking-tight">
        TaskMaster
      </h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-colors duration-200 ${
            darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-200 text-yellow-500 hover:bg-gray-300'
          }`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`p-2 rounded-full transition-colors duration-200 ${
            darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label="Open settings menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </div>
  );
}