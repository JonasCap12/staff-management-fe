import React, { useState } from "react";
import {
  User,
  BarChart3,
  Award,
  Target,
  Calendar,
  TrendingUp,
  Star,
  RefreshCw,
} from "lucide-react";
import EmployeeTable from "../components/EmployeeTable";
import EvaluationModal from "../components/EvaluationModal";
import FilterBar from "../../../components/common/FilterBar";
import ExportButton from "../../../components/common/ExportButton";
import customSelectStyle from "../../../components/common/CustomSelectStyle";

// ...existing code...
const mockEmployees = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    position: "Senior Developer",
    department: "IT",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    overallRating: 4.5,
    completedTasks: 28,
    pendingTasks: 3,
    overdueTasks: 1,
    attendanceRate: 95,
    lastEvaluation: "2024-06-15",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    position: "Marketing Manager",
    department: "Marketing",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    overallRating: 4.8,
    completedTasks: 35,
    pendingTasks: 2,
    overdueTasks: 0,
    attendanceRate: 98,
    lastEvaluation: "2024-06-10",
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    position: "Sales Executive",
    department: "Sales",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    overallRating: 3.8,
    completedTasks: 22,
    pendingTasks: 5,
    overdueTasks: 2,
    attendanceRate: 88,
    lastEvaluation: "2024-06-20",
  },
];

const mockTasks = {
  1: [
    {
      id: 1,
      title: "Phát triển API mới",
      status: "completed",
      dueDate: "2024-06-15",
      completedDate: "2024-06-14",
      priority: "high",
    },
    {
      id: 2,
      title: "Code review cho team",
      status: "completed",
      dueDate: "2024-06-18",
      completedDate: "2024-06-17",
      priority: "medium",
    },
    {
      id: 3,
      title: "Tối ưu database",
      status: "pending",
      dueDate: "2024-07-05",
      priority: "high",
    },
    {
      id: 4,
      title: "Viết documentation",
      status: "overdue",
      dueDate: "2024-06-25",
      priority: "low",
    },
  ],
  2: [
    {
      id: 5,
      title: "Chiến dịch quảng cáo Q2",
      status: "completed",
      dueDate: "2024-06-20",
      completedDate: "2024-06-18",
      priority: "high",
    },
    {
      id: 6,
      title: "Phân tích metrics",
      status: "completed",
      dueDate: "2024-06-22",
      completedDate: "2024-06-21",
      priority: "medium",
    },
    {
      id: 7,
      title: "Báo cáo hàng tháng",
      status: "pending",
      dueDate: "2024-07-01",
      priority: "high",
    },
  ],
  3: [
    {
      id: 8,
      title: "Gặp khách hàng ABC",
      status: "completed",
      dueDate: "2024-06-16",
      completedDate: "2024-06-16",
      priority: "high",
    },
    {
      id: 9,
      title: "Chuẩn bị proposal",
      status: "pending",
      dueDate: "2024-07-03",
      priority: "medium",
    },
    {
      id: 10,
      title: "Follow up leads",
      status: "overdue",
      dueDate: "2024-06-28",
      priority: "high",
    },
    {
      id: 11,
      title: "Cập nhật CRM",
      status: "overdue",
      dueDate: "2024-06-30",
      priority: "medium",
    },
  ],
};

const evaluationCriteria = [
  { id: "task_completion", name: "Hoàn thành công việc", weight: 30 },
  { id: "quality", name: "Chất lượng công việc", weight: 25 },
  { id: "attendance", name: "Chuyên cần", weight: 20 },
  { id: "teamwork", name: "Làm việc nhóm", weight: 15 },
  { id: "initiative", name: "Sáng kiến", weight: 10 },
];

const PerformanceEvaluationPage = ({
  title = "Đánh giá hiệu suất",
  icon: Icon = Award,
}) => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [loading, setLoading] = useState(false);

  const departments = [...new Set(employees.map((emp) => emp.department))];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "" || employee.department === filterDepartment;
    const matchesRating =
      filterRating === "" ||
      (filterRating === "high" && employee.overallRating >= 4.5) ||
      (filterRating === "medium" &&
        employee.overallRating >= 3.5 &&
        employee.overallRating < 4.5) ||
      (filterRating === "low" && employee.overallRating < 3.5);

    return matchesSearch && matchesDepartment && matchesRating;
  });

  // Hàm làm mới dữ liệu
  const refreshData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset về dữ liệu gốc hoặc fetch từ API
      setEmployees(mockEmployees);
      setSearchTerm("");
      setFilterDepartment("");
      setFilterRating("");

      // Có thể thêm logic gọi API thực tế ở đây
      // const response = await fetch('/api/employees');
      // const data = await response.json();
      // setEmployees(data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Chuẩn bị dữ liệu export
  const exportData = employees.map((emp) => ({
    "Tên nhân viên": emp.name,
    "Chức vụ": emp.position,
    "Phòng ban": emp.department,
    "Điểm đánh giá": emp.overallRating,
    "Công việc hoàn thành": emp.completedTasks,
    "Công việc đang làm": emp.pendingTasks,
    "Công việc quá hạn": emp.overdueTasks,
    "Tỷ lệ chuyên cần (%)": emp.attendanceRate,
    "Lần đánh giá cuối": emp.lastEvaluation,
  }));

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

  // Tính toán thống kê
  const totalEmployees = employees.length;
  const averageRating =
    employees.length > 0
      ? (
          employees.reduce((sum, emp) => sum + emp.overallRating, 0) /
          employees.length
        ).toFixed(1)
      : "0.0";
  const highPerformers = employees.filter(
    (emp) => emp.overallRating >= 4.5
  ).length;
  const needsImprovement = employees.filter(
    (emp) => emp.overallRating < 3.5
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                <Icon className="w-6 h-6 md:w-8 md:h-8 inline-block mr-2 text-blue-600" />
                {title}
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Đánh giá và theo dõi hiệu suất làm việc của nhân viên
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
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Tổng nhân viên
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {totalEmployees}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">
                    Hoạt động
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Điểm TB</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {averageRating}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-600 font-medium">
                    Trên 5.0
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Hiệu suất cao
                </p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {highPerformers}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-blue-600 font-medium">
                    ≥ 4.5 điểm
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Cần cải thiện
                </p>
                <p className="text-3xl font-bold text-orange-600 mt-1">
                  {needsImprovement}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Target className="w-4 h-4 text-orange-500" />
                  <span className="text-xs text-orange-600 font-medium">
                    ≤ 3.5 điểm
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterBar
            filters={[
              {
                type: "text",
                key: "search",
                label: "Tìm kiếm theo tên hoặc chức vụ...",
                value: searchTerm,
                onChange: setSearchTerm,
              },
              {
                type: "select",
                key: "department",
                label: "Phòng ban",
                value: filterDepartment,
                onChange: setFilterDepartment,
                options: [
                  { value: "", label: "Tất cả phòng ban" },
                  ...departments.map((dept) => ({ value: dept, label: dept })),
                ],
                style: customSelectStyle,
              },
              {
                type: "select",
                key: "rating",
                label: "Mức đánh giá",
                value: filterRating,
                onChange: setFilterRating,
                options: [
                  { value: "", label: "Tất cả mức đánh giá" },
                  { value: "high", label: "Cao (≥ 4.5)" },
                  { value: "medium", label: "Trung bình (3.5 - 4.5)" },
                  { value: "low", label: "Thấp (< 3.5)" },
                ],
                style: customSelectStyle,
              },
            ]}
            children={
              <ExportButton
                data={exportData}
                fileName="bao_cao_hieu_suat.xlsx"
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="font-semibold">Xuất báo cáo</span>
              </ExportButton>
            }
            activeFilters={[
              searchTerm && {
                key: "search",
                label: `Tìm kiếm: "${searchTerm}"`,
              },
              filterDepartment && {
                key: "department",
                label: `Phòng ban: ${filterDepartment}`,
              },
              filterRating && {
                key: "rating",
                label: `Mức đánh giá: ${
                  filterRating === "high"
                    ? "Cao (≥ 4.5)"
                    : filterRating === "medium"
                    ? "Trung bình (3.5 - 4.5)"
                    : "Thấp (< 3.5)"
                }`,
              },
            ].filter(Boolean)}
            onRemoveFilter={(key) => {
              if (key === "search") setSearchTerm("");
              if (key === "department") setFilterDepartment("");
              if (key === "rating") setFilterRating("");
            }}
            onResetFilters={() => {
              setSearchTerm("");
              setFilterDepartment("");
              setFilterRating("");
            }}
          />
        </div>

        {/* Employee Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
          <EmployeeTable
            employees={filteredEmployees}
            onEvaluate={handleEvaluate}
          />
        </div>

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
    </div>
  );
};

export default PerformanceEvaluationPage;
