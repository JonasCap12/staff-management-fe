import React from 'react';

const ReportFilters = ({ 
  selectedMonth, 
  selectedDepartment, 
  departments, 
  months, 
  onMonthChange, 
  onDepartmentChange, 
  onResetFilters, 
  onExport, 
  onRefresh, 
  loading 
}) => (
  <div className="bg-white rounded-xl shadow p-4">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex flex-wrap gap-3">
        <select
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedMonth}
          onChange={e => onMonthChange(e.target.value)}
        >
          <option value="">Chọn tháng</option>
          {months?.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedDepartment}
          onChange={e => onDepartmentChange(e.target.value)}
        >
          <option value="">Tất cả phòng ban</option>
          {departments?.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <button
          onClick={onResetFilters}
          className="px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Reset
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
        >
          {loading ? 'Đang tải...' : 'Làm mới'}
        </button>
        <button
          onClick={onExport}
          className="px-3 py-2 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
        >
          Xuất báo cáo
        </button>
      </div>
    </div>
  </div>
);

export default ReportFilters; 