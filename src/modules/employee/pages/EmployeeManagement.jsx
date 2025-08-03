import React, { useState } from "react";
import { useAuth } from "../../auth/context/useAuth";
import EmployeeFilters from "../components/EmployeeFilters";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeModal from "../components/EmployeeModal";
import EmployeeStats from "../../../components/layout/EmployeeStats";
import { useSalaryData } from "../../../hooks/useSalaryData";
import { Calendar, RefreshCw, Download, Plus, Users } from "lucide-react";

export default function EmployeeManagement() {
  const { user } = useAuth();
  const userRole = user?.role || "employee";

  const [employees, setEmployees] = useState([
    {
      id: "1",
      name: "Nguyễn Văn A",
      code: "EMP001",
      email: "a.nguyen@company.com",
      phone: "0912345678",
      department: "IT",
      position: "Lập trình viên",
      salary: 15000000,
      rating: 4.5,
      status: "active",
      joinDate: "2022-01-15",
    },
    {
      id: "2",
      name: "Trần Thị B",
      code: "EMP002",
      email: "b.tran@company.com",
      phone: "0987654321",
      department: "HR",
      position: "Nhân sự",
      salary: 12000000,
      rating: 4.0,
      status: "active",
      joinDate: "2021-11-01",
    },
    {
      id: "3",
      name: "Lê Văn C",
      code: "EMP003",
      email: "c.le@company.com",
      phone: "0909123456",
      department: "Marketing",
      position: "Chuyên viên Marketing",
      salary: 13000000,
      rating: 3.8,
      status: "leave",
      joinDate: "2020-05-20",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Hook để đồng bộ lương
  const { addEmployee: addSalaryEmployee } = useSalaryData([]);

  // Filtered employees
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (departmentFilter ? emp.department === departmentFilter : true) &&
      (statusFilter ? emp.status === statusFilter : true)
  );

  // Refresh data function
  const refreshData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Reset filters
      setSearchTerm("");
      setDepartmentFilter("");
      setStatusFilter("");
      console.log("Data refreshed");
    } catch (error) {
      console.error("Error refreshing data:", error);
      alert("Có lỗi xảy ra khi làm mới dữ liệu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thêm mới nhân viên
  const handleAdd = () => {
    setModalMode("add");
    setSelectedEmployee(null);
    setShowModal(true);
  };

  // Xử lý sửa nhân viên
  const handleEdit = (employee) => {
    setModalMode("edit");
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Xử lý xem chi tiết nhân viên
  const handleView = (employee) => {
    setModalMode("view");
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Xử lý lưu nhân viên
  const handleSave = async (employee) => {
    setLoading(true);
    try {
      if (modalMode === "add") {
        // Add new employee
        setEmployees((prev) => [...prev, employee]);
        // Đồng bộ sang bảng lương
        await addSalaryEmployee({
          name: employee.name,
          code: employee.code,
          department: employee.department,
          position: employee.position,
          baseSalary: employee.salary,
          status: employee.status,
          allowances: {},
          deductions: {},
          month: "",
        });
        // Reset filters
        setSearchTerm("");
        setDepartmentFilter("");
        setStatusFilter("");
      } else {
        // Update existing employee
        setEmployees((prev) =>
          prev.map((e) => (e.id === employee.id ? employee : e))
        );
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Có lỗi xảy ra khi lưu nhân viên. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xóa nhân viên
  const handleDelete = async (employeeId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      setLoading(true);
      try {
        setEmployees((prev) => prev.filter((e) => e.id !== employeeId));
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Có lỗi xảy ra khi xóa nhân viên. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
              <Users className="w-8 h-8 text-blue-600" />
              Quản lý Nhân viên
            </h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Theo dõi và quản lý thông tin nhân viên của bạn
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Cập nhật: {new Date().toLocaleString("vi-VN")}</span>
            </div>
            <button
              onClick={refreshData}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Làm mới
            </button>

            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Thêm nhân viên
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 space-y-6">
        {/* Employee Stats */}
        <EmployeeStats employees={employees} />

        {/* Bộ lọc nhân viên */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <EmployeeFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            departments={[...new Set(employees.map((e) => e.department))]}
            employees={filteredEmployees}
          />
        </div>

        {/* Bảng nhân viên */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <EmployeeTable
            data={filteredEmployees}
            loading={loading}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Modal nhân viên */}
        {showModal && (
          <EmployeeModal
            employee={selectedEmployee}
            mode={modalMode}
            onSave={handleSave}
            onClose={() => setShowModal(false)}
            userRole={userRole}
          />
        )}
      </div>
    </div>
  );
}
