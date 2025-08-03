import React, { useState } from "react";
import {
  User,
  BarChart3,
  Award,
  Target,
  Search,
  Calendar,
  TrendingUp,
  Star,
  Filter,
  RefreshCw,
  Download,
} from "lucide-react";
import EmployeeTable from "../components/EmployeeTable";
import EvaluationModal from "../components/EvaluationModal";

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
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [loading, setLoading] = useState(false);

  const departments = [...new Set(employees.map((emp) => emp.department))];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
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
      setFilterDepartment("all");

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

  // Hàm xuất báo cáo Excel
  const exportReportData = () => {
    try {
      // Tạo dữ liệu cho Excel
      const excelData = employees.map((emp) => ({
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

      // Tạo CSV content
      const headers = Object.keys(excelData[0]).join(",");
      const csvContent = excelData
        .map((row) =>
          Object.values(row)
            .map((value) => (typeof value === "string" ? `"${value}"` : value))
            .join(",")
        )
        .join("\n");

      const fullCsvContent = headers + "\n" + csvContent;

      // Tạo và download file
      const blob = new Blob(["\ufeff" + fullCsvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `bao-cao-hieu-suat-${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Có lỗi xảy ra khi xuất báo cáo!");
    }
  };

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
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
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
              <button
                onClick={exportReportData}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Download className="w-4 h-4" />
                Xuất báo cáo
              </button>
            </div>
          </div>
        </div>
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
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm nhân viên theo tên hoặc chức vụ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 min-w-[180px]"
              >
                <option value="all">Tất cả phòng ban</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
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