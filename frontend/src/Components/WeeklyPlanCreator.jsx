import React, { useState } from 'react';
import { PlusCircle, CalendarDays, Clock, BookOpen, PenTool } from 'lucide-react';

export default function WeeklyPlanCreator({ darkMode, addPlanItem, studentCategories, getCategoryIcon, getCategoryName }) {
  const [day, setDay] = useState('Monday');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() === '') {
      alert('Plan description cannot be empty!');
      return;
    }
    addPlanItem(day, time, description, category, notes);
    // Reset form
    setDay('Monday');
    setTime('');
    setDescription('');
    setCategory('');
    setNotes('');
  };

  return (
     <form onSubmit={handleSubmit} className={`mt-6 p-4 rounded-xl flex flex-col gap-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100 shadow-md'}`}> {/* Changed bg-white to bg-gray-100 */}
      <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Create Weekly Plan Item</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Day Select */}
        <div>
          <label htmlFor="plan-day" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Day</label>
          <div className="flex items-center">
            <CalendarDays size={18} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <select
              id="plan-day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className={`flex-grow p-3 rounded-lg border focus:outline-none focus:ring-2 ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-200 text-gray-800 focus:ring-blue-400' // Changed bg-gray-100 to bg-gray-50
              }`}
            >
              {daysOfWeek.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Time Input (Optional) */}
        <div>
          <label htmlFor="plan-time" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time (Optional)</label>
          <div className="flex items-center">
            <Clock size={18} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              id="plan-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              // ...
            className={`flex-grow p-3 rounded-lg border focus:outline-none focus:ring-2 ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-200 text-gray-800 focus:ring-blue-400' // Changed bg-gray-100 to bg-gray-50
              }`}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="plan-description" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Plan Description (Required)</label>
        <div className="flex items-center">
          <BookOpen size={18} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            id="plan-description"
            type="text"
            placeholder="e.g., Prepare for Chemistry Midterm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`flex-grow p-3 rounded-lg border focus:outline-none focus:ring-2 ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-blue-400' // Changed bg-gray-100 to bg-gray-50
            }`}
            required
          />
        </div>
      </div>

      {/* Category Select */}
      <div>
        <label htmlFor="plan-category" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category (Optional)</label>
        <div className="flex items-center">
          {getCategoryIcon(category || 'general')} 
          <select
            id="plan-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`flex-grow p-3 rounded-lg border focus:outline-none focus:ring-2 ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-200 text-gray-800 focus:ring-blue-400' // Changed bg-gray-100 to bg-gray-50
            }`}
          >
            <option value="">Select Category</option>
            <option value="general">General</option>
            {studentCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes (Optional) */}
      <div>
        <label htmlFor="plan-notes" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Notes (Optional)</label>
        <div className="flex items-center">
          <PenTool size={18} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <textarea
            id="plan-notes"
            placeholder="Add any specific details or notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
           className={`flex-grow p-3 rounded-lg border focus:outline-none focus:ring-2 ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-blue-400' 
            }`}
          />
        </div>
      </div>

      <button
        type="submit"
        className={`p-3 rounded-lg flex items-center justify-center font-semibold transition-colors duration-200 ${
          darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        <PlusCircle size={20} className="mr-2" /> Add Plan Item
      </button>
    </form>
  );
}