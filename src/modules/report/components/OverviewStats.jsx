import React from 'react';
import StatsCard from './StatsCard';

const OverviewStats = ({ stats, loading }) => {
  const { totalEmployees, salary, leave, joined } = stats || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatsCard
        icon="👥"
        title="Tổng nhân viên"
        value={loading ? "..." : totalEmployees || 0}
        color="text-blue-600"
        bg="bg-blue-50"
      />
      <StatsCard
        icon="💰"
        title="Tổng lương tháng"
        value={loading ? "..." : `${(salary || 0).toLocaleString()} VND`}
        color="text-green-600"
        bg="bg-green-50"
      />
      <StatsCard
        icon="🌴"
        title="Ngày nghỉ đã dùng"
        value={loading ? "..." : leave || 0}
        color="text-amber-600"
        bg="bg-amber-50"
      />
      <StatsCard
        icon="🆕"
        title="Nhân viên mới"
        value={loading ? "..." : joined || 0}
        color="text-purple-600"
        bg="bg-purple-50"
      />
    </div>
  );
};

export default OverviewStats; 