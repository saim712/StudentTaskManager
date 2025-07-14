import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ darkMode, search, setSearch }) {
  return (
     <div className={`mt-6 p-4 rounded-xl flex items-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100 shadow-sm'}`}>
      <Search size={20} className={`mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`flex-grow border-none focus:outline-none focus:ring-0 text-lg ${
          darkMode ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-white text-gray-800 placeholder-gray-400'
        }`}
      />
    </div>
  );
}