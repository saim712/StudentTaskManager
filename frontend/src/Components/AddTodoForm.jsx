import { PlusCircle } from 'lucide-react';

const AddTodoForm = ({ darkMode, inputValue, setInputValue, category, setCategory, importance, setImportance, studentCategories, importanceLevels, addTodo }) => {
  return (
    <div className={`mb-8 p-5 rounded-xl animate-slide-down ${darkMode ? 'bg-gray-800' : 'bg-white shadow-xl'}`} style={{ animationDelay: '0.3s' }}>
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          className={`flex-grow px-4 py-3 rounded-xl text-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`md:w-48 px-4 py-3 rounded-xl text-base font-medium ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
        >
          <option value="">Select Category</option>
          {studentCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        <select
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
          className={`md:w-40 px-4 py-3 rounded-xl text-base font-medium ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
        >
          {importanceLevels.map(level => <option key={level.id} value={level.id}>{level.name}</option>)}
        </select>
        <button onClick={addTodo} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center justify-center transition-all duration-200 focus:ring-2 focus:ring-blue-300 transform hover:scale-105 hover:shadow-lg font-bold text-lg">
          <PlusCircle size={24} className="mr-1" />
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTodoForm;
