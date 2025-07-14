import TaskItem from './TaskItem';
import { List } from 'lucide-react'; 
export default function TaskList({
  darkMode,
  filteredTodos,
  toggleComplete,
  removeTodo,
  updateImportance,
  getImportanceDetails,
  getCategoryIcon,
  getCategoryName,
  importanceLevels 
}) {
  return (
    <div className="space-y-3">
      {filteredTodos.length === 0 ? (
        <EmptyState darkMode={darkMode} />
      ) : (
        filteredTodos.map((todo, index) => (
          <TaskItem
            key={todo.id}
            todo={todo}
            index={index}
            darkMode={darkMode}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
            updateImportance={updateImportance}
            getImportanceDetails={getImportanceDetails}
            getCategoryIcon={getCategoryIcon}
            getCategoryName={getCategoryName}
            importanceLevels={importanceLevels} 
          />
        ))
      )}
    </div>
  );
}

function EmptyState({ darkMode }) {
  return (
    <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'} animate-fade-in`}>
      <List size={64} className="mx-auto mb-6 opacity-60" /> 
      <p className="text-2xl font-bold">No tasks found</p>
      <p className="text-lg mt-2">Add a new task to get started!</p>
    </div>
  );
}