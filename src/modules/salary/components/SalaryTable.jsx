import { Eye, Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatCurrency';
import { calculateNetSalary } from '../../../utils/salaryCalc';

export default function SalaryTable({ data = [], onView, onEdit, onDelete, loading = false }) {
  const employees = Array.isArray(data) ? data : [];

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center text-gray-500">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (!employees.length) {
    return (
      <div className="min-h-[300px] flex items-center justify-center text-gray-400">
        Không có dữ liệu lương.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nhân Viên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lương Cơ Bản</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phụ Cấp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khấu Trừ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lương Net</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map(employee => {
              const totalAllowances = Object.values(employee.allowances || {}).reduce((sum, val) => sum + (Number(val) || 0), 0);
              const totalDeductions = Object.values(employee.deductions || {}).reduce((sum, val) => sum + (Number(val) || 0), 0);
              const netSalary = calculateNetSalary(employee)?.netSalary || 0;
              return (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.code} • {employee.position}</div>
                      <div className="text-sm text-gray-500">{employee.department}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(employee.baseSalary)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    +{formatCurrency(totalAllowances)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                    -{formatCurrency(totalDeductions)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {formatCurrency(netSalary)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      employee.status === 'Đã thanh toán' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button onClick={() => onView(employee)} className="text-blue-600 hover:text-blue-900 p-1">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => onEdit(employee)} className="text-green-600 hover:text-green-900 p-1">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => onDelete(employee.id)} className="text-red-600 hover:text-red-900 p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}