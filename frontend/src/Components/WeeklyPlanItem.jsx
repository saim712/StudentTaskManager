import React, { useState } from 'react';
import { CheckCircle, Circle, Trash2, Edit, Save, X, CalendarDays, Clock, BookOpen, PenTool } from 'lucide-react';
import CategoryIcon from './CategoryIcon'; 

export default function WeeklyPlanItem({
  item,
  darkMode,
  togglePlanItemComplete,
  removePlanItem,
  updatePlanItem,
  getCategoryIcon,
  getCategoryName,
  studentCategories 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(item.description);
  const [editedTime, setEditedTime] = useState(item.time || '');
  const [editedNotes, setEditedNotes] = useState(item.notes || '');
  const [editedCategory, setEditedCategory] = useState(item.category || '');

  const handleSave = () => {
    updatePlanItem(item.id, {
      description: editedDescription,
      time: editedTime,
      notes: editedNotes,
      category: editedCategory
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedDescription(item.description);
    setEditedTime(item.time || '');
    setEditedNotes(item.notes || '');
    setEditedCategory(item.category || '');
    setIsEditing(false);
  };

  return (
    <div
       className={`group p-4 rounded-xl flex items-center justify-between transition-all duration-300 ${
      
        darkMode ? 'bg-gray-750 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
      } ${item.completed ? (darkMode ? 'opacity-70' : 'opacity-80') : ''}
      ${item.completed ? (darkMode ? 'border-l-4 border-green-600' : 'border-l-4 border-green-500') : ''}
      `}
    >
      <div className="flex items-center space-x-3 flex-grow">
        <button
          onClick={() => togglePlanItemComplete(item.id)}
          className="focus:outline-none transform transition-transform duration-200 hover:scale-110"
          aria-label={item.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {item.completed ? (
            <CheckCircle size={28} className="text-green-500" />
          ) : (
            <Circle size={28} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
          )}
        </button>

        <div className="flex-grow">
          {isEditing ? (
            <div className="space-y-2">
              <div className="flex items-center">
                <BookOpen size={18} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className={`flex-grow p-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`} /* Changed bg-white to bg-gray-50 */
                />
              </div>
              <div className="flex items-center">
                <Clock size={18} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="time"
                  value={editedTime}
                  onChange={(e) => setEditedTime(e.target.value)}
                   className={`flex-grow p-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}/* Changed bg-white to bg-gray-50 */
                />
              </div>
              <div className="flex items-center">
                {getCategoryIcon(editedCategory || 'general')}
                <select
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                 className={`flex-grow p-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
                >
                  <option value="">Select Category</option>
                  <option value="general">General</option>
                  {studentCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-start">
                <PenTool size={18} className={`mt-2 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <textarea
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  rows="2"
                  placeholder="Notes..."
                  className={`flex-grow p-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
                />
              </div>
            </div>
          ) : (
            <div>
              <p className={`text-lg font-medium ${item.completed ? 'line-through text-gray-500' : ''} transition-all duration-300`}>
                {item.description}
              </p>
              <div className={`flex items-center mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {item.time && (
                  <span className="flex items-center mr-2">
                    <Clock size={16} className="mr-1" /> {item.time}
                  </span>
                )}
                <CategoryIcon darkMode={darkMode} category={item.category} getCategoryIcon={getCategoryIcon} getCategoryName={getCategoryName} />
              </div>
              {item.notes && (
                <p className={`text-sm italic mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  {item.notes}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center ml-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className={`p-2 rounded-full ${darkMode ? 'text-green-400 hover:bg-gray-700' : 'text-green-600 hover:bg-gray-200'}`}
              aria-label="Save changes"
            >
              <Save size={22} />
            </button>
            <button
              onClick={handleCancelEdit}
              className={`p-2 rounded-full ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-200'}`}
              aria-label="Cancel edit"
            >
              <X size={22} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className={`p-2 rounded-full ${darkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-600 hover:bg-gray-200'}`}
            aria-label="Edit plan item"
          >
            <Edit size={22} />
          </button>
        )}
        <button
          onClick={() => removePlanItem(item.id)}
          className={`p-2 rounded-full ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-200'}`}
          aria-label="Delete plan item"
        >
          <Trash2 size={22} />
        </button>
      </div>
    </div>
  );
}