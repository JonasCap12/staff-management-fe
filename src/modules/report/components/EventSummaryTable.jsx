import React from 'react';

const EventSummaryTable = ({ events, loading }) => (
  <div className="bg-white rounded-xl shadow p-4 h-full">
    <h2 className="text-lg font-semibold mb-2 text-indigo-700">Sự kiện nhân sự</h2>
    {loading ? (
      <div className="text-center py-8 text-gray-400">Đang tải...</div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-indigo-50">
              <th className="px-3 py-2 text-left">Ngày</th>
              <th className="px-3 py-2 text-left">Sự kiện</th>
              <th className="px-3 py-2 text-left">Nhân viên</th>
            </tr>
          </thead>
          <tbody>
            {events?.map((e, idx) => (
              <tr key={idx} className="border-b last:border-0">
                <td className="px-3 py-2">{e.date}</td>
                <td className="px-3 py-2">{e.type}</td>
                <td className="px-3 py-2">{e.employee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default EventSummaryTable; 