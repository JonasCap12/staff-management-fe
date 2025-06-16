import React, { useState } from 'react';
import { useSalaryData } from '../../../hooks/useSalaryData';
import { useSalaryFilters } from '../../../hooks/useSalaryFilters';
import SalaryFilters from '../components/SalaryFilters';
import SalaryTable from '../components/SalaryTable';
import SalaryModal from '../components/SalaryModal';
import EmployeeStats from '../../../components/layout/EmployeeStats';

export default function SalaryManagement() {
  const { employees, addEmployee, updateEmployee, deleteEmployee, loading } = useSalaryData([]);
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
  const handleSave = async (employee) => {
    if (modalMode === 'add') {
      await addEmployee(employee);
      // Reset filter về mặc định sau khi thêm mới
      if (filterHook.setSearchTerm) filterHook.setSearchTerm('');
      if (filterHook.setSelectedDepartment) filterHook.setSelectedDepartment('');
      if (filterHook.setSelectedStatus) filterHook.setSelectedStatus('');
      if (filterHook.setSelectedMonth) filterHook.setSelectedMonth('');
    } else {
      await updateEmployee(employee);
    }
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
            employees={filterHook.filteredEmployees}
          />
        </div>
        {/* Bảng lương */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <SalaryTable
            data={filterHook.filteredEmployees}
            loading={loading}
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