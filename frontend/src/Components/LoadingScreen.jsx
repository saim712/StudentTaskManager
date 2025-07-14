import React from 'react';

export default function LoadingScreen({ darkMode, loadingProgress }) {
  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <h2 className="text-4xl font-bold mb-4 animate-pulse">Loading TaskMaster...</h2>
      <div className="w-64 h-2 rounded-full bg-gray-300 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-200 ease-out"
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm">{loadingProgress}%</p>
    </div>
  );
}