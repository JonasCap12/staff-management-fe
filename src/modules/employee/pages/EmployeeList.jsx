import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react";
import ExportButton from "../../../components/common/ExportButton";
import EmployeeStats from "../../../components/layout/EmployeeStats";
import FilterBar from "../../../components/common/FilterBar";

// Import component AddEmployee (bạn cần tạo file riêng cho component này)
import AddEmployee from "./AddEmployee"; // Đường dẫn tùy theo cấu trúc project của bạn

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Nguyễn Văn An",
      position: "Senior Developer",
      department: "IT",
      status: "active",
      salary: 15000000,
      avatar: null,
      rating: 4.8,
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      position: "HR Specialist",
      department: "HR",
      status: "active",
      salary: 12000000,
      avatar: null,
      rating: 4.6,
      joinDate: "2023-03-20",
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      position: "Marketing Manager",
      department: "Marketing",
      status: "leave",
      salary: 18000000,
      avatar: null,
      rating: 4.9,
      joinDate: "2022-11-10",
    },
    {
      id: 4,
      name: "Phạm Thị Dung",
      position: "UI/UX Designer",
      department: "IT",
      status: "active",
      salary: 14000000,
      avatar: null,
      rating: 4.7,
      joinDate: "2023-05-08",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewMode, setViewMode] = useState("table");

  // THÊM STATE MỚI ĐỂ ĐIỀU KHIỂN HIỂN THỊ FORM THÊM NHÂN VIÊN
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (departmentFilter ? emp.department === departmentFilter : true) &&
      (statusFilter ? emp.status === statusFilter : true)
  );

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatSalary = (salary) => {
    return (salary / 1000000).toFixed(1) + "M";
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : "bg-amber-100 text-amber-700 border-amber-200";
  };

  const getDepartmentColor = (dept) => {
    const colors = {
      IT: "bg-blue-100 text-blue-700",
      HR: "bg-pink-100 text-pink-700",
      Marketing: "bg-purple-100 text-purple-700",
    };
    return colors[dept] || "bg-gray-100 text-gray-700";
  };

  // HÀM XỬ LÝ KHI LUU NHÂN VIÊN MỚI
  const handleSaveEmployee = (newEmployee) => {
    setEmployees((prev) => [...prev, newEmployee]);
    setShowAddForm(false);
    // Có thể thêm thông báo thành công ở đây
    alert("Thêm nhân viên thành công!");
  };

  // NẾU ĐANG Ở CHẾ ĐỘ THÊM NHÂN VIÊN, HIỂN THỊ FORM THÊM
  if (showAddForm) {
    return (
      <AddEmployee
        onBack={() => setShowAddForm(false)}
        onSave={handleSaveEmployee}
      />
    );
  }

  // NẾU KHÔNG, HIỂN THỊ DANH SÁCH NHÂN VIÊN BÌNH THƯỜNG
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Quản lý Nhân viên
            </h1>
            <p className="text-gray-600 mt-2">
              Theo dõi và quản lý thông tin nhân viên của bạn
            </p>
          </div>
          <div className="flex gap-3">
            {/* NÚT XUẤT FILE EXCEL */}
            <ExportButton
              data={filteredEmployees.map((emp) => ({
                "Họ tên": emp.name,
                "Vị trí": emp.position,
                "Phòng ban": emp.department,
                "Trạng thái":
                  emp.status === "active" ? "Hoạt động" : "Nghỉ phép",
                Lương: emp.salary,
                "Đánh giá": emp.rating,
                "Ngày tham gia": emp.joinDate,
              }))}
              fileName="danh_sach_nhan_vien.xlsx"
            />
            {/* NÚT THÊM NHÂN VIÊN */}
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Thêm nhân viên</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <EmployeeStats employees={employees} />

        {/* Search and Filters */}
        <FilterBar
          filters={[
            {
              type: "text",
              key: "search",
              label: "Tìm kiếm nhân viên...",
              value: searchTerm,
              onChange: setSearchTerm,
            },

            {
              type: "custom",
              key: "viewMode",
              render: () => (
                <div className="inline-flex">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200
                      ${viewMode === "grid"
                        ? "bg-blue-600 text-white shadow-lg scale-105"
                        : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 hover:scale-105"
                      }
                    `}
                  >
                    <span>Card</span>
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ml-2
                      ${viewMode === "table"
                        ? "bg-blue-600 text-white shadow-lg scale-105"
                        : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 hover:scale-105"
                      }
                    `}
                  >
                    <span>Table</span>
                  </button>
                </div>
              ),
            }
          ]}
        />

        {/* Employee List */}
        {viewMode === "grid" ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                      {getInitials(employee.name)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {employee.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {employee.position}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(
                      employee.status
                    )}`}
                  >
                    {employee.status === "active" ? "Hoạt động" : "Nghỉ phép"}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Phòng ban</span>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${getDepartmentColor(
                        employee.department
                      )}`}
                    >
                      {employee.department}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lương</span>
                    <span className="font-semibold text-gray-900">
                      {formatSalary(employee.salary)} VND
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Đánh giá</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {employee.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Tham gia: {employee.joinDate}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Table View
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Nhân viên
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Vị trí
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Phòng ban
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Lương
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Đánh giá
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                            {getInitials(employee.name)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {employee.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              Tham gia: {employee.joinDate}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {employee.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${getDepartmentColor(
                            employee.department
                          )}`}
                        >
                          {employee.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatSalary(employee.salary)} VND
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {employee.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(
                            employee.status
                          )}`}
                        >
                          {employee.status === "active"
                            ? "Hoạt động"
                            : "Nghỉ phép"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Không tìm thấy nhân viên phù hợp
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
