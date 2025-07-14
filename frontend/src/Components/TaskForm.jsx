import React from 'react';
import { PlusCircle } from 'lucide-react';

export default function TaskForm({
  darkMode,
  inputValue,
  setInputValue,
  category,
  setCategory,
  importance,
  setImportance,
  addTodo,
  studentCategories,
  importanceLevels
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <form onSubmit={handleSubmit} className={`mt-6 p-4 rounded-xl flex flex-col md:flex-row items-stretch md:items-center gap-3 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`flex-grow p-3 rounded-lg border focus:outline-none focus:ring-2 ${
          darkMode
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
            : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-blue-400'
        }`}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`p-3 rounded-lg border focus:outline-none focus:ring-2 ${
          darkMode
            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
            : 'bg-gray-50 border-gray-200 text-gray-800 focus:ring-blue-400'
        }`}
      >
        <option value="">Select Category</option>
        <option value="general">General</option>
        {studentCategories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <select
        value={importance}
        onChange={(e) => setImportance(e.target.value)}
        className={`p-3 rounded-lg border focus:outline-none focus:ring-2 ${
          darkMode
            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
            : 'bg-gray-50 border-gray-200 text-gray-800 focus:ring-blue-400' 
        }`}
      >
        {importanceLevels.map((level) => (
          <option key={level.id} value={level.id}>{level.name}</option>
        ))}
      </select>

      <button
        type="submit"
        className={`p-3 rounded-lg flex items-center justify-center font-semibold transition-colors duration-200 ${
          darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        <PlusCircle size={20} className="mr-2" /> Add Task
      </button>
    </form>
  );
}