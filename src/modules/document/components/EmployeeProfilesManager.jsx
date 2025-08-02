import React, { useState } from "react";
import {
  Users,
  FileText,
  Calendar,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
} from "lucide-react";

const EmployeeProfilesManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showProfileDetail, setShowProfileDetail] = useState(false);

  // Mock data - thay thế bằng dữ liệu thật từ API
  const employees = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      position: "Nhân viên IT",
      department: "Công nghệ thông tin",
      joinDate: "2023-01-15",
      email: "nguyenvana@company.com",
      phone: "0123456789",
      status: "Đang làm việc",
      avatar: "https://via.placeholder.com/100",
      documents: [
        {
          id: 1,
          name: "Hợp đồng lao động",
          type: "Hợp đồng",
          uploadDate: "2023-01-15",
          status: "Có hiệu lực",
        },
        {
          id: 2,
          name: "Bảng lương tháng 12/2024",
          type: "Bảng lương",
          uploadDate: "2024-12-01",
          status: "Đã duyệt",
        },
        {
          id: 3,
          name: "Đơn xin nghỉ phép",
          type: "Đơn từ",
          uploadDate: "2024-12-10",
          status: "Chờ duyệt",
        },
        {
          id: 4,
          name: "Chứng chỉ IT",
          type: "Chứng chỉ",
          uploadDate: "2023-06-20",
          status: "Có hiệu lực",
        },
      ],
    },
    {
      id: 2,
      name: "Trần Thị B",
      position: "Kế toán trưởng",
      department: "Kế toán",
      joinDate: "2022-03-20",
      email: "tranthib@company.com",
      phone: "0987654321",
      status: "Đang làm việc",
      avatar: "https://via.placeholder.com/100",
      documents: [
        {
          id: 5,
          name: "Hợp đồng lao động",
          type: "Hợp đồng",
          uploadDate: "2022-03-20",
          status: "Có hiệu lực",
        },
        {
          id: 6,
          name: "Bảng lương tháng 12/2024",
          type: "Bảng lương",
          uploadDate: "2024-12-01",
          status: "Đã duyệt",
        },
        {
          id: 7,
          name: "Chứng chỉ kế toán",
          type: "Chứng chỉ",
          uploadDate: "2022-01-15",
          status: "Có hiệu lực",
        },
      ],
    },
    {
      id: 3,
      name: "Lê Văn C",
      position: "Nhân viên marketing",
      department: "Marketing",
      joinDate: "2023-08-10",
      email: "levanc@company.com",
      phone: "0369258147",
      status: "Đang làm việc",
      avatar: "https://via.placeholder.com/100",
      documents: [
        {
          id: 8,
          name: "Hợp đồng lao động",
          type: "Hợp đồng",
          uploadDate: "2023-08-10",
          status: "Có hiệu lực",
        },
        {
          id: 9,
          name: "Báo cáo dự án Q4",
          type: "Báo cáo",
          uploadDate: "2024-12-15",
          status: "Chờ duyệt",
        },
      ],
    },
  ];

  const departments = [
    "Tất cả phòng ban",
    "Công nghệ thông tin",
    "Kế toán",
    "Marketing",
    "Nhân sự",
  ];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      !selectedDepartment ||
      selectedDepartment === "Tất cả phòng ban" ||
      emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Có hiệu lực":
        return "bg-green-100 text-green-800";
      case "Đã duyệt":
        return "bg-blue-100 text-blue-800";
      case "Chờ duyệt":
        return "bg-yellow-100 text-yellow-800";
      case "Hết hạn":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const EmployeeCard = ({ employee }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start gap-4">
        <img
          src={employee.avatar}
          alt={employee.name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {employee.name}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                employee.status === "Đang làm việc"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {employee.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">{employee.position}</p>
          <p className="text-sm text-blue-600 mb-1">{employee.department}</p>
          <p className="text-sm text-gray-500">
            Ngày vào làm: {employee.joinDate}
          </p>

          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm text-gray-600">
              {employee.documents.length} tài liệu
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setSelectedEmployee(employee);
                  setShowProfileDetail(true);
                }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Xem hồ sơ"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Chỉnh sửa"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileDetailModal = () => {
    if (!selectedEmployee || !showProfileDetail) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedEmployee.name}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {selectedEmployee.position}
                  </p>
                  <p className="text-blue-600">{selectedEmployee.department}</p>
                </div>
              </div>
              <button
                onClick={() => setShowProfileDetail(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Trash2 className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Thông tin cá nhân */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin cá nhân
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedEmployee.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Số điện thoại
                  </label>
                  <p className="text-gray-900">{selectedEmployee.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Ngày vào làm
                  </label>
                  <p className="text-gray-900">{selectedEmployee.joinDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Trạng thái
                  </label>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      selectedEmployee.status === "Đang làm việc"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedEmployee.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Tài liệu hồ sơ */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Tài liệu hồ sơ
                </h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                  <Plus className="w-4 h-4" />
                  Thêm tài liệu
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Tên tài liệu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Loại
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Ngày tải lên
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedEmployee.documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">
                              {doc.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">
                            {doc.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.uploadDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              doc.status
                            )}`}
                          >
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Bộ lọc và tìm kiếm */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm nhân viên theo tên hoặc vị trí..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="md:w-64">
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Thêm nhân viên
          </button>
        </div>
      </div>

      {/* Danh sách nhân viên */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Không tìm thấy nhân viên
          </h3>
          <p className="text-gray-500">
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
          </p>
        </div>
      )}

      {/* Modal chi tiết hồ sơ */}
      <ProfileDetailModal />
    </div>
  );
};

export default EmployeeProfilesManager;
