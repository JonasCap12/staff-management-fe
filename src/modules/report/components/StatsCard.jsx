import React from 'react';

const StatsCard = ({ icon, title, value, color = 'text-blue-600', bg = 'bg-blue-50' }) => (
  <div className={`flex items-center gap-4 p-4 rounded-xl shadow ${bg} transition-transform duration-200 hover:scale-105`}>
    <div className={`text-3xl ${color}`}>{icon}</div>
    <div>
      <div className="text-sm text-gray-500 font-medium">{title}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  </div>
);

export default StatsCard; 