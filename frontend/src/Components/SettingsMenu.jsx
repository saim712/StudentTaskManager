import React from 'react';
import { X, Moon, Sun, Trash2, GitPullRequestClosed,GitPullRequestArrow } from 'lucide-react';

export default function SettingsMenu({
  darkMode,
  setDarkMode,
  showMenu,
  setShowMenu,
  todos,
  importanceLevels 
}) {
  const clearAllTodos = () => {
    if (window.confirm("Are you sure you want to clear ALL tasks? This action cannot be undone.")) {
      localStorage.removeItem('todos');
      window.location.reload(); 
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 p-6 shadow-lg z-50 transform transition-transform duration-300 ${
        darkMode ? 'bg-gray-850 text-white' : 'bg-white text-gray-800'
      } ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
        <button
          onClick={() => setShowMenu(false)}
          className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          aria-label="Close settings menu"
        >
          <X size={24} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-lg">Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-200 text-yellow-500 hover:bg-gray-300'
            }`}
            aria-label={darkMode ? "Toggle light mode" : "Toggle dark mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Clear All Tasks */}
        <div className="border-t border-gray-700 pt-6">
          <button
            onClick={clearAllTodos}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <Trash2 size={20} className="mr-2" /> Clear All Tasks
          </button>
        </div>


        <div className={`mt-8 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'} text-center`}>
          <p>StudentTaskManager v1.0.1</p>
          <p className="flex items-center justify-center mt-1">
           
          </p>
        </div>
      </div>
    </div>
  );
}