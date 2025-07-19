import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const DepartmentChart = ({ data, loading }) => (
  <div className="bg-white rounded-xl shadow p-4 h-full">
    <h2 className="text-lg font-semibold mb-2 text-blue-700">Nhân viên theo phòng ban</h2>
    {loading ? (
      <div className="text-center py-8 text-gray-400">Đang tải...</div>
    ) : (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )}
  </div>
);

export default DepartmentChart; 