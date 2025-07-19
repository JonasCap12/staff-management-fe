import React, { useState } from "react";
import { Calendar, RefreshCw, Download, DollarSign } from "lucide-react";
import { useSalaryData } from "../../../hooks/useSalaryData";
import { useSalaryFilters } from "../../../hooks/useSalaryFilters";
import SalaryFilters from "../components/SalaryFilters";
import SalaryTable from "../components/SalaryTable";
import SalaryModal from "../components/SalaryModal";
import EmployeeStats from "../../../components/layout/EmployeeStats";

export default function SalaryManagement() {
  const { employees, addEmployee, updateEmployee, deleteEmployee, loading } =
    useSalaryData([]);
  const filterHook = useSalaryFilters(employees);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Xử lý sửa nhân viên lương
  const handleEdit = (employee) => {
    setModalMode("edit");
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Xử lý xem chi tiết nhân viên lương
  const handleView = (employee) => {
    setModalMode("view");
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Xử lý lưu nhân viên lương
  const handleSave = async (employee) => {
    if (modalMode === "add") {
      await addEmployee(employee);
      // Reset filter về mặc định sau khi thêm mới
      if (filterHook.setSearchTerm) filterHook.setSearchTerm("");
      if (filterHook.setSelectedDepartment)
        filterHook.setSelectedDepartment("");
      if (filterHook.setSelectedStatus) filterHook.setSelectedStatus("");
      if (filterHook.setSelectedMonth) filterHook.setSelectedMonth("");
    } else {
      await updateEmployee(employee);
    }
    setShowModal(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                <DollarSign className="w-6 h-6 md:w-8 md:h-8 inline-block mr-2 text-blue-600" />
                Quản lý Lương nhân viên
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Theo dõi, thống kê và quản lý bảng lương nhân viên
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Cập nhật: {new Date().toLocaleString("vi-VN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Employee Stats */}
        <EmployeeStats employees={employees} />
        {/* Bộ lọc lương */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <SalaryFilters
            {...filterHook}
            departments={[...new Set(employees.map((e) => e.department))]}
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
