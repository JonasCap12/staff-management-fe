import React, { useState } from "react";
import {
  User,
  BarChart3,
  Award,
  Target,
  Search,
  Download,
  FileText,
} from "lucide-react";
import EmployeeTable from "../components/EmployeeTable";
import EvaluationModal from "../components/EvaluationModal";

// Mock data và các hằng số giữ nguyên như cũ, copy từ file gốc
// ... mockEmployees, mockTasks, evaluationCriteria ...

const mockEmployees = [
  /* ...copy từ file gốc... */
];
const mockTasks = {
  /* ...copy từ file gốc... */
};
const evaluationCriteria = [
  /* ...copy từ file gốc... */
];

const PerformanceEvaluationPage = ({
  title = "Đánh giá hiệu suất",
  icon: Icon = Award,
}) => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");

  const departments = [...new Set(employees.map((emp) => emp.department))];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleEvaluate = (employee) => {
    setSelectedEmployee(employee);
    setIsEvaluationModalOpen(true);
  };

  const handleSaveEvaluation = (evaluationData) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === evaluationData.employeeId
          ? {
              ...emp,
              overallRating: evaluationData.overallRating,
              lastEvaluation: evaluationData.evaluationDate,
            }
          : emp
      )
    );
    setIsEvaluationModalOpen(false);
    // Gửi dữ liệu lên backend nếu cần
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        <p className="text-gray-600">
          Đánh giá và theo dõi hiệu suất làm việc của nhân viên
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tổng nhân viên</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.length}
              </p>
            </div>
            <User className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Điểm TB</p>
              <p className="text-2xl font-bold text-green-600">
                {(
                  employees.reduce((sum, emp) => sum + emp.overallRating, 0) /
                  employees.length
                ).toFixed(1)}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Hiệu suất cao</p>
              <p className="text-2xl font-bold text-blue-600">
                {employees.filter((emp) => emp.overallRating >= 4.5).length}
              </p>
            </div>
            <Award className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Cần cải thiện</p>
              <p className="text-2xl font-bold text-orange-600">
                {employees.filter((emp) => emp.overallRating < 3.5).length}
              </p>
            </div>
            <Target className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm nhân viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả phòng ban</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <EmployeeTable
        employees={filteredEmployees}
        onEvaluate={handleEvaluate}
      />

      {/* Evaluation Modal */}
      <EvaluationModal
        employee={selectedEmployee}
        isOpen={isEvaluationModalOpen}
        onClose={() => setIsEvaluationModalOpen(false)}
        onSave={handleSaveEvaluation}
        mockTasks={mockTasks}
        evaluationCriteria={evaluationCriteria}
      />
    </div>
  );
};

export default PerformanceEvaluationPage;
