import React from "react";

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
 */
export default function FilterBar({ filters, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {filters.map((filter) => {
          if (filter.type === 'text') {
            return (
              <div className="relative flex-1" key={filter.key}>
                <input
                  type="text"
                  placeholder={filter.label}
                  value={filter.value}
                  onChange={e => filter.onChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            );
          }
          if (filter.type === 'select') {
            return (
              <select
                key={filter.key}
                value={filter.value}
                onChange={e => filter.onChange(e.target.value)}
                className="border border-gray-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[150px]"
              >
                {filter.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            );
          }
          if (filter.type === 'custom' && filter.render) {
            return <React.Fragment key={filter.key}>{filter.render(filter)}</React.Fragment>;
          }
          return null;
        })}
        {children && <div className="flex items-center">{children}</div>}
      </div>
    </div>
  );
}
