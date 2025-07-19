import React from "react";
import { Search } from "lucide-react";

/**
 * Generic, scalable filter component for any page.
 * Props:
 * - filters: [{
 *     type: 'text' | 'select' | 'custom',
 *     key: string,
 *     label: string,
 *     value: any,
 *     onChange: (val) => void,
 *     options?: [{ value, label }],
 *     render?: (props) => ReactNode (for custom)
 *   }]
 * - children: (optional) for extra filter actions/buttonsa
 * - activeFilters: [{
 *     key: string,
 *     label: string
 *   }]
 * - onRemoveFilter: (key) => void
 * - onResetFilters: () => void
 */
export default function FilterBar({
  filters,
  children,
  activeFilters = [],
  onRemoveFilter,
  onResetFilters,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {filters.map((filter) => {
          if (filter.type === "text") {
            return (
              <div className="relative flex-1" key={filter.key}>
                {/* Thêm icon tìm kiếm */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4  text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder={filter.label}
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            );
          }
          if (filter.type === "select") {
            return (
              <select
                key={filter.key}
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className="border border-gray-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[150px]"
                style={filter.style} // Thêm dòng này để nhận style custom từ filter
              >
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            );
          }
          if (filter.type === "custom" && filter.render) {
            return (
              <React.Fragment key={filter.key}>
                {filter.render(filter)}
              </React.Fragment>
            );
          }
          return null;
        })}
        {children && <div className="flex items-center">{children}</div>}
      </div>
      {/* Hiển thị chip filter đang áp dụng */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {activeFilters.map((chip, idx) => (
            <span
              key={chip.key || idx}
              className="inline-flex items-center px-3 py-1.5 rounded-full border shadow-sm text-sm font-medium bg-blue-50 border-blue-200 text-blue-700"
            >
              {chip.label}
              {onRemoveFilter && (
                <button
                  className="ml-2 rounded-full hover:bg-white/60 p-0.5 transition"
                  onClick={() => onRemoveFilter(chip.key)}
                  tabIndex={-1}
                  type="button"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </span>
          ))}
          {onResetFilters && (
            <button
              className="ml-2 px-3 py-1.5 rounded-full border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 text-sm font-medium"
              onClick={onResetFilters}
              type="button"
            >
              Xóa tất cả
            </button>
          )}
        </div>
      )}
    </div>
  );
}
