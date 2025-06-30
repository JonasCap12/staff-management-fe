import React from 'react';
import { Star, TrendingUp, Award } from 'lucide-react';

const TopPerformerTable = ({ performers, loading }) => (
  <div className="bg-white rounded-xl shadow p-4 h-full">
    <h2 className="text-lg font-semibold mb-2 text-green-700">Top 5 Nhân viên xuất sắc</h2>
    {loading ? (
      <div className="text-center py-8 text-gray-400">Đang tải...</div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-green-50">
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Tên</th>
              <th className="px-3 py-2 text-left">Phòng ban</th>
              <th className="px-3 py-2 text-left">Điểm hiệu suất</th>
            </tr>
          </thead>
          <tbody>
            {performers?.map((p, idx) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="px-3 py-2 font-bold text-green-600">{idx + 1}</td>
                <td className="px-3 py-2">{p.name}</td>
                <td className="px-3 py-2">{p.department}</td>
                <td className="px-3 py-2">{p.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default TopPerformerTable; 