import { useState, useEffect } from 'react';
import {
  Book, Brain, Dumbbell, Calendar, Clock, Lightbulb, Notebook,
  CodeSquare, Palette, Star, AlertTriangle, Flag, HeartPulse,
  LayoutGrid, ListChecks 
} from 'lucide-react';

// Import components
import Header from '../Components/Header';
import LoadingScreen from '../Components/LoadingScreen';
import SearchBar from '../Components/SearchBar';
import CategoryFilter from '../Components/CategoryFilter';
import TaskForm from '../Components/TaskForm';
import TaskList from '../Components/TaskList';
import TaskStats from '../Components/TaskStats';
import SettingsMenu from '../Components/SettingsMenu';
import WeeklyPlanCreator from '../Components/WeeklyPlanCreator'; 
import WeeklyPlanViewer from '../Components/WeeklyPlanViewer';   
import Footer from '../Components/Footer'; 


// Helper function to get initial todos from localStorage
const getInitialTodos = () => {
  try {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
  } catch (error) {
    console.error("Failed to parse todos from localStorage:", error);
    localStorage.removeItem('todos');
  }
  return [];
};

// NEW: Helper function to get initial weekly plan from localStorage
const getInitialWeeklyPlan = () => {
  try {
    const savedPlan = localStorage.getItem('weeklyPlan');
    if (savedPlan) {
      return JSON.parse(savedPlan);
    }
  } catch (error) {
    console.error("Failed to parse weekly plan from localStorage:", error);
    localStorage.removeItem('weeklyPlan');
  }
  return [];
};


export default function TodoApp() {
 
  const [todos, setTodos] = useState(getInitialTodos);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [importance, setImportance] = useState('normal');


  const [weeklyPlan, setWeeklyPlan] = useState(getInitialWeeklyPlan);

  const [currentView, setCurrentView] = useState('tasks'); 


  // Student-specific categories (existing)
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

  // Importance levels with icons and colors (existing)
  const importanceLevels = [
    { id: 'low', name: 'Low', icon: <Flag size={18} className="text-gray-400" />, color: 'text-gray-400' },
    { id: 'normal', name: 'Normal', icon: <Flag size={18} className="text-blue-400" />, color: 'text-blue-400' },
    { id: 'important', name: 'Important', icon: <Star size={18} className="text-yellow-400" />, color: 'text-yellow-400' },
    { id: 'urgent', name: 'Urgent', icon: <AlertTriangle size={18} className="text-red-400" />, color: 'text-red-400' }
  ];

  // Simulate progressive loading (existing)
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

  // Save todos to localStorage whenever they change (existing)
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }, [todos]);

  //  NEW: Save weeklyPlan to localStorage whenever it changes 
  useEffect(() => {
    try {
      localStorage.setItem('weeklyPlan', JSON.stringify(weeklyPlan));
    } catch (error) {
      console.error("Failed to save weekly plan to localStorage:", error);
    }
  }, [weeklyPlan]);


  // Toggle dark mode (existing)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);


  // Helper functions
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



  //  NEW: Helper functions for weekly plan 
  const addPlanItem = (day, time, description, category, notes) => {
    const newPlanItem = {
      id: Date.now(),
      day,
      time,
      description,
      completed: false,
      category: category || 'general',
      notes
    };
    setWeeklyPlan(prevPlan => [...prevPlan, newPlanItem]);
  };

  const togglePlanItemComplete = (id) => {
    setWeeklyPlan(prevPlan =>
      prevPlan.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removePlanItem = (id) => {
    setWeeklyPlan(prevPlan => prevPlan.filter(item => item.id !== id));
  };

  const updatePlanItem = (id, updatedFields) => {
    setWeeklyPlan(prevPlan =>
      prevPlan.map(item =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    );
  };


  
// Filter todos based on current filter and search
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


  // If still loading, show loading screen (existing)
  if (loading) {
    return <LoadingScreen darkMode={darkMode} loadingProgress={loadingProgress} />;
  }

  return (
    // <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-150 text-gray-800'}`}>
     <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="w-4/5 max-w-6xl mx-auto p-4 md:p-6">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />

        {/*  NEW: View Toggler  */}
        <div className="flex justify-center mt-6 mb-8 space-x-4">
          <button
            onClick={() => setCurrentView('tasks')}
            className={`px-6 py-3 rounded-xl flex items-center font-bold text-lg transition-colors duration-200 ${
              currentView === 'tasks'
                ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
            }`}
          >
            <ListChecks size={20} className="mr-2" /> My Tasks
          </button>
          <button
            onClick={() => setCurrentView('weekly-plan')}
            className={`px-6 py-3 rounded-xl flex items-center font-bold text-lg transition-colors duration-200 ${
              currentView === 'weekly-plan'
                ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
            }`}
          >
            <LayoutGrid size={20} className="mr-2" /> Weekly Plan
          </button>
        </div>


        {/*  Conditional Rendering based on currentView  */}
        {currentView === 'tasks' ? (
          <>
            <SearchBar
              darkMode={darkMode}
              search={search}
              setSearch={setSearch}
            />

            <CategoryFilter
              darkMode={darkMode}
              filter={filter}
              setFilter={setFilter}
              studentCategories={studentCategories}
            />

            <TaskForm
              darkMode={darkMode}
              inputValue={inputValue}
              setInputValue={setInputValue}
              category={category}
              setCategory={setCategory}
              importance={importance}
              setImportance={setImportance}
              addTodo={addTodo}
              studentCategories={studentCategories}
              importanceLevels={importanceLevels}
            />

            <TaskList
              darkMode={darkMode}
              filteredTodos={filteredTodos}
              toggleComplete={toggleComplete}
              removeTodo={removeTodo}
              updateImportance={updateImportance}
              getImportanceDetails={getImportanceDetails}
              getCategoryIcon={getCategoryIcon}
              getCategoryName={getCategoryName}
              importanceLevels={importanceLevels}
            />

            <TaskStats darkMode={darkMode} todos={todos} />
          </>
        ) : (
          <>
            <WeeklyPlanCreator
              darkMode={darkMode}
              addPlanItem={addPlanItem}
              studentCategories={studentCategories} // Reusing categories
              getCategoryIcon={getCategoryIcon}
              getCategoryName={getCategoryName}
            />
            <WeeklyPlanViewer
              darkMode={darkMode}
              weeklyPlan={weeklyPlan}
              togglePlanItemComplete={togglePlanItemComplete}
              removePlanItem={removePlanItem}
              updatePlanItem={updatePlanItem}
              getCategoryIcon={getCategoryIcon}
              getCategoryName={getCategoryName}
            />
          </>
        )}

      </div>

      <SettingsMenu
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        todos={todos}
        importanceLevels={importanceLevels}
      />

      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
       <Footer darkMode={darkMode} /> 
    </div>
  );
}