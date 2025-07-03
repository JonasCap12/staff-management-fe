import FilterBar from '../../../components/common/FilterBar';
import ExportButton from '../../../components/common/ExportButton';

export default function EmployeeFilters({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  departments = [],
  employees = []
}) {
  const formatSalary = (salary) => {
    return (salary / 1000000).toFixed(1) + "M";
  };

  const exportData = employees.map((emp) => ({
    "Mã NV": emp.code,
    "Họ tên": emp.name,
    "Vị trí": emp.position,
    "Phòng ban": emp.department,
    "Trạng thái": emp.status === "active" ? "Hoạt động" : "Nghỉ phép",
    "Lương": formatSalary(emp.salary),
    "Đánh giá": emp.rating,
    "Ngày tham gia": emp.joinDate,
    "Email": emp.email,
    "Số điện thoại": emp.phone,
  }));

  return (
    <FilterBar
      filters={[
        {
          type: 'text',
          key: 'search',
          label: 'Tìm kiếm nhân viên...',
          value: searchTerm,
          onChange: setSearchTerm,
        },
        {
          type: 'select',
          key: 'department',
          label: 'Phòng ban',
          value: departmentFilter,
          onChange: setDepartmentFilter,
          options: [
            { value: '', label: 'Tất cả phòng ban' },
            ...departments.map(dep => ({ value: dep, label: dep }))
          ],
        },
        {
          type: 'select',
          key: 'status',
          label: 'Trạng thái',
          value: statusFilter,
          onChange: setStatusFilter,
          options: [
            { value: '', label: 'Tất cả trạng thái' },
            { value: 'active', label: 'Hoạt động' },
            { value: 'leave', label: 'Nghỉ phép' },
          ],
        },
      ]}
      children={
        <ExportButton
          data={exportData}
          fileName="danh_sach_nhan_vien.xlsx"
          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span className="font-semibold">Xuất Excel</span>
        </ExportButton>
      }
      activeFilters={[
        searchTerm && { key: 'search', label: `Tìm kiếm: "${searchTerm}"` },
        departmentFilter && { key: 'department', label: `Phòng ban: ${departmentFilter}` },
        statusFilter && { key: 'status', label: `Trạng thái: ${statusFilter === 'active' ? 'Hoạt động' : 'Nghỉ phép'}` },
      ].filter(Boolean)}
      onRemoveFilter={key => {
        if (key === 'search') setSearchTerm('');
        if (key === 'department') setDepartmentFilter('');
        if (key === 'status') setStatusFilter('');
      }}
      onResetFilters={() => {
        setSearchTerm('');
        setDepartmentFilter('');
        setStatusFilter('');
      }}
    />
  );
} 