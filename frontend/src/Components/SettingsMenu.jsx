const SettingsMenu = ({ filter, setFilter, darkMode }) => {
    return (
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${filter === 'all' ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${filter === 'completed' ? 'bg-green-500 text-white' : darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${filter === 'incomplete' ? 'bg-yellow-500 text-white' : darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setFilter('incomplete')}
        >
          Incomplete
        </button>
      </div>
    );
  };
  
  export default SettingsMenu;
  