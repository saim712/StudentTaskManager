import React from 'react';
import { Filter } from 'lucide-react';

export default function CategoryFilter({ darkMode, filter, setFilter, studentCategories }) {
  const filters = [
    { id: 'all', name: 'All' },
    { id: 'active', name: 'Active' },
    { id: 'completed', name: 'Completed' },
    { id: 'important', name: 'Important' },
    { id: 'urgent', name: 'Urgent' },
    ...studentCategories.map(cat => ({ id: cat.id, name: cat.name }))
  ];

  return (
   
    <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100 shadow-sm'}`}>
      <h3 className={`text-lg font-semibold mb-3 flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        <Filter size={20} className="mr-2" /> Filter Tasks
      </h3>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              filter === f.id
                ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>
    </div>
  );
}