import React, { useState } from 'react';
import { useSalaryData } from '../../../hooks/useSalaryData';
import { useSalaryFilters } from '../../../hooks/useSalaryFilters';
import SalaryFilters from '../components/SalaryFilters';
import SalaryTable from '../components/SalaryTable';
import SalaryModal from '../components/SalaryModal';
import EmployeeStats from '../../../components/layout/EmployeeStats';

const initialData = [
  {
    id: 1,
    code: 'NV001',
    name: 'Nguyễn Văn An',
    position: 'Developer',
    department: 'IT',
    baseSalary: 15000000,
    allowances: {
      transport: 500000,
      lunch: 750000,
      phone: 200000,
      performance: 2000000,
    },
    deductions: {
      insurance: 1500000,
      tax: 2100000,
      advance: 0,
    },
    workDays: 22,
    overtimeHours: 15,
    month: '2024-06',
    status: 'Đã thanh toán',
  },
  {
    id: 2,
    code: 'NV002',
    name: 'Trần Thị Bình',
    position: 'Designer',
    department: 'Marketing',
    baseSalary: 12000000,
    allowances: {
      transport: 500000,
      lunch: 750000,
      phone: 200000,
      performance: 1500000,
    },
    deductions: {
      insurance: 1200000,
      tax: 1680000,
      advance: 500000,
    },
    workDays: 21,
    overtimeHours: 8,
    month: '2024-06',
    status: 'Chưa thanh toán',
  },
  {
    id: 3,
    code: 'NV003',
    name: 'Lê Minh Cường',
    position: 'Manager',
    department: 'Sales',
    baseSalary: 20000000,
    allowances: {
      transport: 800000,
      lunch: 750000,
      phone: 300000,
      performance: 3000000,
    },
    deductions: {
      insurance: 2000000,
      tax: 3200000,
      advance: 1000000,
    },
    workDays: 22,
    overtimeHours: 20,
    month: '2024-06',
    status: 'Đã thanh toán',
  },
  {
    id: 4,
    code: 'NV004',
    name: 'Phạm Thị Duyên',
    position: 'Tester',
    department: 'QA',
    baseSalary: 11000000,
    allowances: {
      transport: 400000,
      lunch: 750000,
      phone: 150000,
      performance: 1000000,
    },
    deductions: {
      insurance: 1100000,
      tax: 1200000,
      advance: 0,
    },
    workDays: 20,
    overtimeHours: 5,
    month: '2024-06',
    status: 'Chưa thanh toán',
  },
  {
    id: 5,
    code: 'NV005',
    name: 'Hoàng Văn Đạt',
    position: 'DevOps Engineer',
    department: 'IT',
    baseSalary: 18000000,
    allowances: {
      transport: 600000,
      lunch: 750000,
      phone: 250000,
      performance: 2500000,
    },
    deductions: {
      insurance: 1800000,
      tax: 2700000,
      advance: 0,
    },
    workDays: 22,
    overtimeHours: 12,
    month: '2024-06',
    status: 'Đã thanh toán',
  },
  {
    id: 6,
    code: 'NV006',
    name: 'Ngô Thị Hạnh',
    position: 'HR Executive',
    department: 'HR',
    baseSalary: 13000000,
    allowances: {
      transport: 500000,
      lunch: 750000,
      phone: 200000,
      performance: 1500000,
    },
    deductions: {
      insurance: 1300000,
      tax: 1600000,
      advance: 200000,
    },
    workDays: 21,
    overtimeHours: 4,
    month: '2024-06',
    status: 'Đã thanh toán',
  },
  {
    id: 7,
    code: 'NV007',
    name: 'Trịnh Minh Khoa',
    position: 'Product Manager',
    department: 'Product',
    baseSalary: 22000000,
    allowances: {
      transport: 700000,
      lunch: 750000,
      phone: 300000,
      performance: 4000000,
    },
    deductions: {
      insurance: 2000000,
      tax: 4000000,
      advance: 0,
    },
    workDays: 22,
    overtimeHours: 10,
    month: '2024-06',
    status: 'Đã thanh toán',
  },
  {
    id: 8,
    code: 'NV008',
    name: 'Đinh Thị Như',
    position: 'Content Writer',
    department: 'Marketing',
    baseSalary: 10000000,
    allowances: {
      transport: 300000,
      lunch: 750000,
      phone: 150000,
      performance: 800000,
    },
    deductions: {
      insurance: 1000000,
      tax: 900000,
      advance: 0,
    },
    workDays: 20,
    overtimeHours: 2,
    month: '2024-06',
    status: 'Chưa thanh toán',
  },
  {
    id: 9,
    code: 'NV009',
    name: 'Lý Văn Hùng',
    position: 'Sales Executive',
    department: 'Sales',
    baseSalary: 14000000,
    allowances: {
      transport: 600000,
      lunch: 750000,
      phone: 200000,
      performance: 1200000,
    },
    deductions: {
      insurance: 1400000,
      tax: 1800000,
      advance: 300000,
    },
    workDays: 22,
    overtimeHours: 6,
    month: '2024-06',
    status: 'Đã thanh toán',
  },
  {
    id: 10,
    code: 'NV010',
    name: 'Vũ Thị Quỳnh',
    position: 'UI/UX Designer',
    department: 'Product',
    baseSalary: 16000000,
    allowances: {
      transport: 500000,
      lunch: 750000,
      phone: 200000,
      performance: 2000000,
    },
    deductions: {
      insurance: 1600000,
      tax: 2000000,
      advance: 0,
    },
    workDays: 22,
    overtimeHours: 10,
    month: '2024-06',
    status: 'Chưa thanh toán',
  }
];

export default function SalaryManagement() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useSalaryData(initialData);
  const filterHook = useSalaryFilters(employees);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Xử lý thêm mới nhân viên lương
  const handleAdd = () => {
    setModalMode('add');
    setSelectedEmployee(null);
    setShowModal(true);
  };

  // Xử lý sửa nhân viên lương
  const handleEdit = (employee) => {
    setModalMode('edit');
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Xử lý xem chi tiết nhân viên lương
  const handleView = (employee) => {
    setModalMode('view');
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Xử lý lưu nhân viên lương
  const handleSave = (employee) => {
    if (modalMode === 'add') addEmployee(employee);
    else updateEmployee(employee);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">Quản lý Lương nhân viên</h1>
            <p className="text-gray-600 mt-2">Theo dõi, thống kê và quản lý bảng lương nhân viên</p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow flex items-center gap-2 transition"
          >
            + Thêm lương nhân viên
          </button>
        </div>
        {/* Employee Stats */}
        <EmployeeStats employees={employees} />
        {/* Bộ lọc lương */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <SalaryFilters
            {...filterHook}
            departments={[...new Set(employees.map(e => e.department))]}
            employees={filterHook.filteredEmployees} // truyền employees đã lọc vào props SalaryFilters
          />
        </div>
        {/* Bảng lương */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <SalaryTable
            employees={filterHook.filteredEmployees}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={deleteEmployee}
          />
        </div>
        {/* Modal lương */}
        {showModal && (
          <SalaryModal
            employee={selectedEmployee}
            mode={modalMode}
            onSave={handleSave}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}