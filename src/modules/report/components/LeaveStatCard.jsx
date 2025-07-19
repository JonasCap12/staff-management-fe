import React from 'react';

const LeaveStatCard = ({ leaveStat, loading }) => (
  <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center h-full">
    <div className="text-blue-500 text-4xl mb-2">🌴</div>
    <div className="text-gray-500 text-sm">Nghỉ phép tháng này</div>
    <div className="text-2xl font-bold text-blue-700 mt-1">
      {loading ? <span className="animate-pulse">...</span> : leaveStat?.daysUsed || 0} ngày
    </div>
    <div className="text-xs text-gray-400 mt-1">Tổng: {leaveStat?.total || 12} ngày/năm</div>
  </div>
);

export default LeaveStatCard; 