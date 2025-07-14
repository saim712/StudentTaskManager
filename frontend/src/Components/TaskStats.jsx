import React from 'react';
import { CheckCircle, Circle, List } from 'lucide-react';

export default function TaskStats({ darkMode, todos }) {
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
     <div className={`mt-6 p-4 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100 shadow-sm'}`}> {/* Changed bg-white to bg-gray-100 */}
      <div className={`p-4 rounded-lg flex items-center justify-center flex-col ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}> {/* Changed bg-gray-100 to bg-gray-50 */}
        <List size={32} className={`mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <p className="text-xl font-bold">{totalTasks}</p>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Tasks</p>
      </div>
    <div className={`p-4 rounded-lg flex items-center justify-center flex-col ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}> {/* Changed bg-gray-100 to bg-gray-50 */}
        <CheckCircle size={32} className={`mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
        <p className="text-xl font-bold">{completedTasks}</p>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
      </div>
      <div className={`p-4 rounded-lg flex items-center justify-center flex-col ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}> {/* Changed bg-gray-100 to bg-gray-50 */}
        <Circle size={32} className={`mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
        <p className="text-xl font-bold">{activeTasks}</p>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active</p>
      </div>
    </div>
  );
}