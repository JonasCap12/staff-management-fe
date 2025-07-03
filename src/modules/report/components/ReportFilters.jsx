import React from 'react';
import FilterBar from '../../../components/common/FilterBar';

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
  <FilterBar
    filters={[
      {
        type: 'select',
        key: 'month',
        label: 'Tháng',
        value: selectedMonth,
        onChange: onMonthChange,
        options: [
          { value: '', label: 'Chọn tháng' },
          ...(months || []).map(m => ({ value: m, label: m }))
        ],
      },
      {
        type: 'select',
        key: 'department',
        label: 'Phòng ban',
        value: selectedDepartment,
        onChange: onDepartmentChange,
        options: [
          { value: '', label: 'Tất cả phòng ban' },
          ...(departments || []).map(d => ({ value: d, label: d }))
        ],
      },
    ]}
    activeFilters={[
      selectedMonth && { key: 'month', label: `Tháng: ${selectedMonth}` },
      selectedDepartment && { key: 'department', label: `Phòng ban: ${selectedDepartment}` },
    ].filter(Boolean)}
    onRemoveFilter={key => {
      if (key === 'month') onMonthChange('');
      if (key === 'department') onDepartmentChange('');
    }}
    onResetFilters={onResetFilters}
    children={
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
    }
  />
);

export default ReportFilters; 