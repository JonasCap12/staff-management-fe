import { Filter, Download, X, Users } from 'lucide-react';
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

  const hasActiveFilters = searchTerm || departmentFilter || statusFilter;

  return (
    <div className="space-y-6">
      {/* Main Filters Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Tìm kiếm nhân viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
              />
            </div>

            {/* Department Filter */}
            <div className="relative min-w-[200px]">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer"
              >
                <option value="">Tất cả phòng ban</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative min-w-[180px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="leave">Nghỉ phép</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div className="flex items-center gap-3">
            <ExportButton
              data={exportData}
              fileName="danh_sach_nhan_vien.xlsx"
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Download className="h-5 w-5" />
              <span className="font-semibold">Xuất Excel</span>
            </ExportButton>
          </div>
        </div>
      </div>

      {/* Results Summary & Clear Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-6">
          {/* Results Count */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <span className="text-sm text-gray-600">Hiển thị</span>
              <span className="ml-1 text-lg font-bold text-gray-900">{employees.length}</span>
              <span className="ml-1 text-sm text-gray-600">nhân viên</span>
            </div>
          </div>

          {/* Active Filters Indicator */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <Filter className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Đã lọc</span>
            </div>
          )}
        </div>
        
        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={() => {
              setSearchTerm('');
              setDepartmentFilter('');
              setStatusFilter('');
            }}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
          >
            <X className="h-4 w-4" />
            <span>Xóa bộ lọc</span>
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 border border-blue-200 rounded-full">
              <span className="text-sm text-blue-700">Tìm kiếm: "{searchTerm}"</span>
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-500 hover:text-blue-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {departmentFilter && (
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 border border-purple-200 rounded-full">
              <span className="text-sm text-purple-700">Phòng ban: {departmentFilter}</span>
              <button
                onClick={() => setDepartmentFilter('')}
                className="text-purple-500 hover:text-purple-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {statusFilter && (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 border border-green-200 rounded-full">
              <span className="text-sm text-green-700">
                Trạng thái: {statusFilter === 'active' ? 'Hoạt động' : 'Nghỉ phép'}
              </span>
              <button
                onClick={() => setStatusFilter('')}
                className="text-green-500 hover:text-green-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 