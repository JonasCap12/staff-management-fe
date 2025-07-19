import React, { useState } from "react";
import FilterBar from '../../../components/common/FilterBar';
import { Search, ChevronDown, Building2, FileText, X, Filter } from "lucide-react";

/**
 * @param {Object} props
 * @param {string} search
 * @param {function} onSearchChange
 * @param {Array} typeOptions
 * @param {string} type
 * @param {function} onTypeChange
 * @param {Array} departmentOptions
 * @param {string} department
 * @param {function} onDepartmentChange
 * @param {string} dateFrom
 * @param {string} dateTo
 * @param {function} onDateFromChange
 * @param {function} onDateToChange
 * @param {function} onFilter
 * @param {function} onReset
 * @param {function} onRemoveChip
 */
const DocumentFilterBar = ({
  search = "",
  onSearchChange,
  typeOptions = [],
  type = "",
  onTypeChange,
  departmentOptions = [],
  department = "",
  onDepartmentChange,
  dateFrom = "",
  dateTo = "",
  onDateFromChange,
  onDateToChange,
  onFilter,
  onReset,
  onRemoveChip,
}) => {
  // Animation reset state
  const [resetAnim, setResetAnim] = useState(false);

  const handleReset = () => {
    setResetAnim(true);
    onReset && onReset();
    setTimeout(() => setResetAnim(false), 400);
  };

  const filters = [
    {
      type: 'text',
      key: 'search',
      label: 'Tìm kiếm tài liệu...',
      value: search,
      onChange: onSearchChange,
    },
    {
      type: 'select',
      key: 'type',
      label: 'Loại',
      value: type,
      onChange: onTypeChange,
      options: [
        { value: '', label: 'Tất cả loại' },
        ...typeOptions
      ],
    },
    {
      type: 'custom',
      key: 'dateFrom',
      render: () => (
        <input
          type="date"
          value={dateFrom}
          onChange={e => onDateFromChange && onDateFromChange(e.target.value)}
          className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md text-base min-w-[120px]"
        />
      ),
    },
    {
      type: 'custom',
      key: 'dateTo',
      render: () => (
        <input
          type="date"
          value={dateTo}
          onChange={e => onDateToChange && onDateToChange(e.target.value)}
          className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md text-base min-w-[120px]"
        />
      ),
    },
    {
      type: 'select',
      key: 'department',
      label: 'Phòng ban',
      value: department,
      onChange: onDepartmentChange,
      options: [
        { value: '', label: 'Tất cả phòng ban' },
        ...departmentOptions
      ],
    },
  ];

  const activeFilters = [
    search && { key: 'search', label: `Tìm: "${search}"` },
    type && { key: 'type', label: typeOptions.find(t => t.value === type)?.label || type },
    department && { key: 'department', label: departmentOptions.find(d => d.value === department)?.label || department },
    dateFrom && { key: 'dateFrom', label: `Từ: ${dateFrom}` },
    dateTo && { key: 'dateTo', label: `Đến: ${dateTo}` },
  ].filter(Boolean);

  return (
    <FilterBar
      filters={filters}
      activeFilters={activeFilters}
      onRemoveFilter={onRemoveChip}
      onResetFilters={handleReset}
      children={
        <div className="flex flex-col gap-2 mt-4 md:mt-0 min-w-[140px]">
          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-base"
            onClick={onFilter}
            type="button"
          >
            <Filter className="w-5 h-5" />
            Lọc
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-all duration-200 font-medium border border-gray-200 bg-white text-base ${resetAnim ? 'ring-2 ring-indigo-200' : ''}`}
            onClick={handleReset}
            type="button"
          >
            <X className="w-5 h-5" />
            Xoá bộ lọc
          </button>
        </div>
      }
    />
  );
};

export default DocumentFilterBar; 