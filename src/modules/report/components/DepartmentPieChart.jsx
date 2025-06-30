import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#EF4444', '#8B5CF6'];

const DepartmentPieChart = ({ data, loading }) => (
  <div className="bg-white rounded-xl shadow p-4 h-full">
    <h2 className="text-lg font-semibold mb-2 text-blue-700">Tỷ lệ nhân viên theo phòng ban</h2>
    {loading ? (
      <div className="text-center py-8 text-gray-400">Đang tải...</div>
    ) : (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="department"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#3B82F6"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    )}
  </div>
);

export default DepartmentPieChart; 