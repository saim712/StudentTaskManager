import React from 'react';

export default function CategoryIcon({ darkMode, category, getCategoryIcon, getCategoryName }) {
  const icon = getCategoryIcon(category);
  const name = getCategoryName(category);

  return (
    <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-2`}>
      {icon}
      <span className="ml-1">{name}</span>
    </div>
  );
}