import React from 'react';
import { CalendarDays, ClipboardList } from 'lucide-react';
import WeeklyPlanItem from './WeeklyPlanItem';

export default function WeeklyPlanViewer({
  darkMode,
  weeklyPlan,
  togglePlanItemComplete,
  removePlanItem,
  updatePlanItem,
  getCategoryIcon,
  getCategoryName,
  studentCategories 
}) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  const groupedPlan = daysOfWeek.reduce((acc, day) => {
    acc[day] = weeklyPlan.filter(item => item.day === day).sort((a, b) => {
    
        if (a.time && b.time) return a.time.localeCompare(b.time);
        return a.description.localeCompare(b.description);
    });
    return acc;
  }, {});

  return (
    <div className="mt-8">
      <h2 className={`text-3xl font-bold mb-6 flex items-center ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
        <ClipboardList size={28} className="mr-3" /> Your Weekly Plan
      </h2>

      {weeklyPlan.length === 0 ? (
        <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'} animate-fade-in`}>
          <CalendarDays size={64} className="mx-auto mb-6 opacity-60" />
          <p className="text-2xl font-bold">No plan items found for this week</p>
          <p className="text-lg mt-2">Start by adding a new plan item!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {daysOfWeek.map(day => (
            <div key={day} className={`p-5 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100 shadow-md'}`}> {/* Changed bg-white to bg-gray-100 */}
              <h3 className={`text-xl font-bold mb-4 flex items-center ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                <CalendarDays size={20} className="mr-2" /> {day}
              </h3>
              {groupedPlan[day].length === 0 ? (
                <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No activities planned for {day}.
                </p>
              ) : (
                <div className="space-y-3">
                  {groupedPlan[day].map(item => (
                    <WeeklyPlanItem
                      key={item.id}
                      item={item}
                      darkMode={darkMode}
                      togglePlanItemComplete={togglePlanItemComplete}
                      removePlanItem={removePlanItem}
                      updatePlanItem={updatePlanItem}
                      getCategoryIcon={getCategoryIcon}
                      getCategoryName={getCategoryName}
                      studentCategories={studentCategories} 
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}