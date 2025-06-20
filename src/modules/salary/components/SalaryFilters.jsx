import FilterBar from '../../../components/common/FilterBar';
import ExportButton from '../../../components/common/ExportButton';
import { Download } from 'lucide-react';
import { calculateNetSalary } from '../../../utils/salaryCalc';
import React from 'react';

export default function SalaryFilters({
  searchTerm, setSearchTerm,
  selectedDepartment, setSelectedDepartment,
  selectedStatus, setSelectedStatus,
  selectedMonth, setSelectedMonth,
  departments = [],
  employees = []
}) {
  const safeEmployees = Array.isArray(employees) ? employees : [];
  // Chuẩn hóa data xuất file excel đúng thứ tự cột
  const exportData = safeEmployees.map(emp => ({
    'Nhân Viên': `${emp.name} (${emp.code})`,
    'Lương Cơ Bản': emp.baseSalary,
    'Phụ Cấp': Object.values(emp.allowances || {}).reduce((a, b) => a + b, 0),
    'Khấu Trừ': Object.values(emp.deductions || {}).reduce((a, b) => a + b, 0),
    'Lương Net': calculateNetSalary(emp)?.netSalary || 0,
    'Trạng Thái': emp.status
  }));

  return (
    <FilterBar
      filters={[
        {
          type: 'text',
          key: 'search',
          label: 'Tìm kiếm theo tên, mã NV...',
          value: searchTerm,
          onChange: setSearchTerm,
        },
        {
          type: 'select',
          key: 'department',
          label: 'Phòng ban',
          value: selectedDepartment,
          onChange: setSelectedDepartment,
          options: [
            { value: '', label: 'Tất cả phòng ban' },
            ...departments.map(dep => ({ value: dep, label: dep }))
          ],
        },
        {
          type: 'select',
          key: 'status',
          label: 'Trạng thái',
          value: selectedStatus,
          onChange: setSelectedStatus,
          options: [
            { value: '', label: 'Tất cả trạng thái' },
            { value: 'Đã thanh toán', label: 'Đã thanh toán' },
            { value: 'Chưa thanh toán', label: 'Chưa thanh toán' },
          ],
        },
        {
          type: 'custom',
          key: 'month',
          render: () => (
            <input
              type="month"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="border border-gray-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[150px]"
            />
          ),
        },
      ]}
      // Có thể truyền thêm children nếu muốn thêm nút xuất file, v.v.
      children={
        <ExportButton
          icon={<Download className="w-4 h-4 mr-1" />}
          data={exportData}
          fileName={`bang_luong_${selectedMonth || ''}.xlsx`}
        />
      }
    />
  );
}