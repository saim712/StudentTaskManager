import { CheckCircle, Circle, Trash2, Calendar } from 'lucide-react';
import ImportanceBadge from './ImportanceBadge';
import CategoryIcon from './CategoryIcon';

export default function TaskItem({
  todo,
  index,
  darkMode,
  toggleComplete,
  removeTodo,
  updateImportance,
  getImportanceDetails,
  getCategoryIcon,
  getCategoryName,
  importanceLevels 
}) {
  
  const importanceDetails = getImportanceDetails(todo.importance);

  return (
    <div
      className={`group p-4 rounded-xl flex items-center justify-between ${
        darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-100 hover:bg-gray-200 shadow-sm'
      } transition-all duration-300 transform hover:scale-[1.01] animate-slide-in ${
        todo.importance === 'urgent' ? 'border-l-8 border-red-500' :
        todo.importance === 'important' ? 'border-l-8 border-yellow-500' : ''
      }`}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="flex items-center space-x-3">
        <button
          onClick={() => toggleComplete(todo.id)}
          className="focus:outline-none transform transition-transform duration-200 hover:scale-110"
        >
          {todo.completed ? (
            <CheckCircle size={28} className="text-green-500" />
          ) : (
            <Circle size={28} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
          )}
        </button>

        <div>
          <div className="flex items-center">
            <p className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : ''} transition-all duration-300`}>
              {todo.text}
            </p>
          
            <ImportanceBadge importance={todo.importance} getImportanceDetails={getImportanceDetails} />
          </div>
          <div className="flex items-center mt-1">
            <div className="flex items-center mr-2">
              <Calendar size={16} className={`mr-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {new Date(todo.date).toLocaleDateString()}
              </span>
            </div>
            <CategoryIcon
              darkMode={darkMode}
              category={todo.category}
              getCategoryIcon={getCategoryIcon}
              getCategoryName={getCategoryName}
            />
          </div>
        </div>
      </div>

      <TaskActions
        darkMode={darkMode}
        todo={todo}
        updateImportance={updateImportance}
        removeTodo={removeTodo}
        importanceLevels={importanceLevels} 
      />
    </div>
  );
}

function TaskActions({ darkMode, todo, updateImportance, removeTodo, importanceLevels }) {
  return (
    <div className="flex items-center">
      <div className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <select
          value={todo.importance}
          onChange={(e) => updateImportance(todo.id, e.target.value)}
          className={`text-sm font-medium rounded-lg px-2 py-1 ${
            
            darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
          }`}
        >
        
          {importanceLevels.map(level => (
            <option key={level.id} value={level.id}>{level.name}</option>
          ))}
        </select>
      </div>
      <button
        onClick={() => removeTodo(todo.id)}
        className={`text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform hover:scale-110`}
      >
        <Trash2 size={22} />
      </button>
    </div>
  );
}