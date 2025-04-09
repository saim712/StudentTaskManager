import { List } from 'lucide-react';
import TodoItem from './TodoItem';

const TodoList = ({ filteredTodos, darkMode, toggleComplete, removeTodo, updateImportance, getImportanceDetails, getCategoryName, getCategoryIcon, importanceLevels }) => {
  return (
    <div className="space-y-3">
      {filteredTodos.length === 0 ? (
        <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'} animate-fade-in`}>
          <List size={64} className="mx-auto mb-6 opacity-60" />
          <p className="text-2xl font-bold">No tasks found</p>
          <p className="text-lg mt-2">Add a new task to get started!</p>
        </div>
      ) : (
        filteredTodos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            darkMode={darkMode}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
            updateImportance={updateImportance}
            getImportanceDetails={getImportanceDetails}
            getCategoryName={getCategoryName}
            getCategoryIcon={getCategoryIcon}
            importanceLevels={importanceLevels}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
