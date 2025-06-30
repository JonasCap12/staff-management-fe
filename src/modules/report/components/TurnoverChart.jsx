import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const TurnoverChart = ({ data, loading }) => (
  <div className="bg-white rounded-xl shadow p-4 h-full">
    <h2 className="text-lg font-semibold mb-2 text-indigo-700">Biến động nhân sự theo tháng</h2>
    {loading ? (
      <div className="text-center py-8 text-gray-400">Đang tải...</div>
    ) : (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="joined" fill="#10B981" name="Vào" />
          <Bar dataKey="left" fill="#EF4444" name="Ra" />
        </BarChart>
      </ResponsiveContainer>
    )}
  </div>
);

export default TurnoverChart; 