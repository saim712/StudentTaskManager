import { useState, useEffect } from 'react';
import { PlusCircle, X, CheckCircle, Circle, Trash2, Moon, Sun, Search, Settings, List, Book, Brain, Dumbbell, Calendar, Clock, Lightbulb, GraduationCap, HeartPulse, Notebook, CodeSquare, Palette, Star, AlertTriangle, Flag } from 'lucide-react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [importance, setImportance] = useState('normal');
  
  // Simulate progressive loading
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);
  
  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        category: category || 'general',
        date: new Date().toISOString(),
        importance: importance,
      };
      
      setTodos(prevTodos => [newTodo, ...prevTodos]);
      setInputValue('');
      setCategory('');
      setImportance('normal');
    }
  };
  
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const updateImportance = (id, importance) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, importance } : todo
    ));
  };
  
  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'all') return true;
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      if (filter === 'important') return todo.importance === 'important';
      if (filter === 'urgent') return todo.importance === 'urgent';
      return todo.category === filter;
    })
    .filter(todo => 
      todo.text.toLowerCase().includes(search.toLowerCase())
    );
    
  // Student-specific categories
  const studentCategories = [
    { id: 'assignments', name: 'Assignments', icon: <Book size={18} /> },
    { id: 'exams', name: 'Exams & Tests', icon: <Notebook size={18} /> },
    { id: 'study', name: 'Study Sessions', icon: <Brain size={18} /> },
    { id: 'health', name: 'Health & Fitness', icon: <HeartPulse size={18} /> },
    { id: 'skills', name: 'Skill Building', icon: <Lightbulb size={18} /> },
    { id: 'projects', name: 'Projects', icon: <CodeSquare size={18} /> },
    { id: 'creative', name: 'Creative Work', icon: <Palette size={18} /> },
    { id: 'exercise', name: 'Exercise', icon: <Dumbbell size={18} /> }
  ];
  
  // Importance levels with icons and colors
  const importanceLevels = [
    { id: 'low', name: 'Low', icon: <Flag size={18} className="text-gray-400" />, color: 'bg-gray-200 text-gray-600' },
    { id: 'normal', name: 'Normal', icon: <Flag size={18} className="text-blue-400" />, color: 'bg-blue-100 text-blue-600' },
    { id: 'important', name: 'Important', icon: <Star size={18} className="text-yellow-400" />, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'urgent', name: 'Urgent', icon: <AlertTriangle size={18} className="text-red-400" />, color: 'bg-red-100 text-red-600' }
  ];
  
  // Get unique categories from todos
  const uniqueCategories = [...new Set(todos.map(todo => todo.category))];
  const allCategories = [...new Set([...studentCategories.map(c => c.id), ...uniqueCategories])];
  
  const getCategoryIcon = (categoryId) => {
    const category = studentCategories.find(c => c.id === categoryId);
    return category ? category.icon : <Book size={18} />;
  };
  
  const getCategoryName = (categoryId) => {
    const category = studentCategories.find(c => c.id === categoryId);
    return category ? category.name : categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  };
  
  const getImportanceDetails = (importanceId) => {
    return importanceLevels.find(i => i.id === importanceId) || importanceLevels[1]; // Default to normal
  };
  
  // If still loading, show progress indicator
  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
        <GraduationCap size={80} className="mb-8 text-blue-500 animate-bounce" />
        <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Student Task Manager Loading
        </h1>
        <div className="w-80 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out" 
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-500">{loadingProgress}% loaded</p>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-150 text-gray-800'}`}>
      <div className="w-4/5 max-w-6xl mx-auto p-4 md:p-6">
        {/* App Header */}
        <header className="flex justify-between items-center mb-8 animate-fade-in">
          <div className="flex items-center">
            <GraduationCap size={40} className="mr-3 text-blue-500" />
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Student Task Manager</h1>
            {/* <span className="ml-3 px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded-full animate-pulse">PRO</span> */}
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-100 text-gray-700'} hover:opacity-80 transition-all duration-200 transform hover:rotate-12`}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            
            <button 
              onClick={() => setShowMenu(!showMenu)} 
              className={`p-3 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:opacity-80 transition-all duration-200 transform hover:scale-110`}
            >
              <Settings size={24} className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} ${showMenu ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>
        
        {/* Search Bar */}
        <div className={`relative mb-6 animate-slide-down ${darkMode ? 'text-white' : 'text-gray-800'}`} style={{ animationDelay: '0.1s' }}>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={22} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`pl-12 pr-4 py-4 w-full rounded-xl text-lg ${
              darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-200'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow focus:shadow-md`}
          />
        </div>
        
        {/* Category Filter - Now using flex-wrap to handle overflow */}
        <div className="mb-6 animate-slide-down" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-4 py-2 rounded-full text-base font-bold transition-all duration-200 transform hover:scale-105 ${
                filter === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('active')} 
              className={`px-4 py-2 rounded-full text-base font-bold transition-all duration-200 transform hover:scale-105 ${
                filter === 'active' 
                  ? 'bg-blue-500 text-white' 
                  : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Active
            </button>
            <button 
              onClick={() => setFilter('completed')} 
              className={`px-4 py-2 rounded-full text-base font-bold transition-all duration-200 transform hover:scale-105 ${
                filter === 'completed' 
                  ? 'bg-blue-500 text-white' 
                  : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Completed
            </button>
            <button 
              onClick={() => setFilter('important')} 
              className={`px-4 py-2 rounded-full text-base font-bold transition-all duration-200 transform hover:scale-105 flex items-center ${
                filter === 'important' 
                  ? 'bg-blue-500 text-white' 
                  : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <Star size={18} className="mr-1 text-yellow-400" />Important
            </button>
            <button 
              onClick={() => setFilter('urgent')} 
              className={`px-4 py-2 rounded-full text-base font-bold transition-all duration-200 transform hover:scale-105 flex items-center ${
                filter === 'urgent' 
                  ? 'bg-blue-500 text-white' 
                  : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <AlertTriangle size={18} className="mr-1 text-red-400" />Urgent
            </button>
            {studentCategories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setFilter(cat.id)} 
                className={`px-4 py-2 rounded-full text-base font-bold transition-all duration-200 transform hover:scale-105 flex items-center ${
                  filter === cat.id 
                    ? 'bg-blue-500 text-white' 
                    : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                <span className="mr-1">{cat.icon}</span>{cat.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Add Todo Form */}
        <div className={`mb-8 p-5 rounded-xl animate-slide-down ${darkMode ? 'bg-gray-800' : 'bg-white shadow-xl'}`} style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col md:flex-row gap-2">
            <input 
              type="text" 
              placeholder="Add a new task..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className={`flex-grow px-4 py-3 rounded-xl text-lg ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'
              } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
            />
            
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`md:w-48 px-4 py-3 rounded-xl text-base font-medium ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'
              } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
            >
              <option value="">Select Category</option>
              {studentCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            
            <select 
              value={importance}
              onChange={(e) => setImportance(e.target.value)}
              className={`md:w-40 px-4 py-3 rounded-xl text-base font-medium ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'
              } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
            >
              {importanceLevels.map(level => (
                <option key={level.id} value={level.id}>{level.name}</option>
              ))}
            </select>
            
            <button 
              onClick={addTodo}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center justify-center transition-all duration-200 focus:ring-2 focus:ring-blue-300 transform hover:scale-105 hover:shadow-lg font-bold text-lg"
            >
              <PlusCircle size={24} className="mr-1" />
              Add
            </button>
          </div>
        </div>
        
        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'} animate-fade-in`}>
              <List size={64} className="mx-auto mb-6 opacity-60" />
              <p className="text-2xl font-bold">No tasks found</p>
              <p className="text-lg mt-2">Add a new task to get started!</p>
            </div>
          ) : (
            filteredTodos.map((todo, index) => {
              const importanceDetails = getImportanceDetails(todo.importance);
              return (
              <div 
                key={todo.id} 
                className={`group p-4 rounded-xl flex items-center justify-between ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50 shadow-md'
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
                      <div className={`ml-2 px-2 py-1 rounded-full flex items-center text-sm font-bold ${importanceDetails.color}`}>
                        {importanceDetails.icon}
                        <span className="ml-1">{importanceDetails.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center mr-2">
                        <Calendar size={16} className={`mr-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(todo.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className={`flex items-center px-2 py-1 text-sm font-medium rounded-full ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        {getCategoryIcon(todo.category)}
                        <span className="ml-1">{getCategoryName(todo.category)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
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
              </div>
              );
            })
          )}
        </div>
        
        {/* Task Summary */}
        <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} animate-fade-in`} style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-between">
            <p className="text-base font-medium flex items-center">
              <Clock size={18} className="mr-1" />
              {todos.filter(t => !t.completed).length} tasks remaining • {todos.filter(t => t.completed).length} completed
            </p>
            {todos.length > 0 && (
              <div className="w-32 h-3 bg-gray-300 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500"
                  style={{ width: `${(todos.filter(t => t.completed).length / todos.length) * 100}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Settings Menu */}
      <div className={`fixed top-0 right-0 h-full w-72 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Settings</h3>
            <button onClick={() => setShowMenu(false)} className="transform hover:rotate-90 transition-transform duration-300">
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Moon size={20} />
                <span className="font-medium text-lg">Dark Mode</span>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 ${darkMode ? 'bg-blue-500' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? 'translate-x-7' : 'translate-x-0'}`}></div>
              </button>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-5 mt-5">
              <h4 className="font-bold text-lg mb-3">Tasks by Importance</h4>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-3`}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <AlertTriangle size={16} className="mr-1 text-red-500" />
                      <span className="text-base font-medium">Urgent</span>
                    </div>
                    <span className="text-base font-bold">{todos.filter(t => t.importance === 'urgent').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star size={16} className="mr-1 text-yellow-500" />
                      <span className="text-base font-medium">Important</span>
                    </div>
                    <span className="text-base font-bold">{todos.filter(t => t.importance === 'important').length}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
              <p className={`text-base font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Version 2.0.0
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Made for students, by students
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay when menu is open */}
      {showMenu && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-down {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-in {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slide-down 0.5s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
















