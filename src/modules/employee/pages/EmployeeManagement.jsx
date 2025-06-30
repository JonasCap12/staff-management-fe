import React, { useState } from 'react';
import { useAuth } from '../../auth/context/useAuth';
import EmployeeFilters from '../components/EmployeeFilters';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeModal from '../components/EmployeeModal';
import EmployeeStats from '../../../components/layout/EmployeeStats';
import { useSalaryData } from '../../../hooks/useSalaryData';

export default function EmployeeManagement() {
  const { user } = useAuth();
  const userRole = user?.role || 'employee';

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
      joinDate: "2022-01-15"
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
      joinDate: "2021-11-01"
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
      joinDate: "2020-05-20"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
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

  // Xử lý thêm mới nhân viên
  const handleAdd = () => {
    setModalMode('add');
    setSelectedEmployee(null);
    setShowModal(true);
  };

  // Xử lý sửa nhân viên
  const handleEdit = (employee) => {
    setModalMode('edit');
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Xử lý xem chi tiết nhân viên
  const handleView = (employee) => {
    setModalMode('view');
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Xử lý lưu nhân viên
  const handleSave = async (employee) => {
    setLoading(true);
    try {
      if (modalMode === 'add') {
        // Add new employee
        setEmployees(prev => [...prev, employee]);
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
          month: '',
        });
        // Reset filters
        setSearchTerm('');
        setDepartmentFilter('');
        setStatusFilter('');
      } else {
        // Update existing employee
        setEmployees(prev => prev.map(e => e.id === employee.id ? employee : e));
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Có lỗi xảy ra khi lưu nhân viên. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xóa nhân viên
  const handleDelete = async (employeeId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      setLoading(true);
      try {
        setEmployees(prev => prev.filter(e => e.id !== employeeId));
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Có lỗi xảy ra khi xóa nhân viên. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Quản lý Nhân viên
            </h1>
            <p className="text-gray-600 mt-2">Theo dõi và quản lý thông tin nhân viên của bạn</p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow flex items-center gap-2 transition"
          >
            + Thêm nhân viên
          </button>
        </div>
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
            departments={[...new Set(employees.map(e => e.department))]}
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