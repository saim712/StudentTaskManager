const TaskSummary = ({ todos, darkMode }) => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
  
    return (
      <div className={`text-center my-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Total Tasks: <span className="font-bold">{total}</span> | Completed: <span className="font-bold">{completed}</span>
      </div>
    );
  };
  
  export default TaskSummary;
  