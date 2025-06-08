import { useState, useEffect } from "react";
import {
  Clock,
  QrCode,
  Users,
  Calendar,
  Settings,
  Check,
  X,
  RefreshCw,
  Eye,
  Download,
  Filter,
} from "lucide-react";
import { useAuth } from "../../auth/context/useAuth";

const AttendanceSystem = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("checkin");
  const [qrCode, setQrCode] = useState("QR2024120501");
  const [checkInCode, setCheckInCode] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date()); // Thêm state cho thời gian hiện tại
  const [attendanceRecords] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      employeeName: "Nguyễn Văn A",
      date: new Date().toISOString().split("T")[0], // Sử dụng ngày hiện tại
      checkIn: "08:30",
      checkOut: "17:45",
      status: "present",
      workHours: 8.25,
    },
    {
      id: 2,
      employeeId: "EMP002",
      employeeName: "Trần Thị B",
      date: new Date().toISOString().split("T")[0], // Sử dụng ngày hiện tại
      checkIn: "08:15",
      checkOut: "17:30",
      status: "present",
      workHours: 8.25,
    },
    {
      id: 3,
      employeeId: "EMP003",
      employeeName: "Lê Văn C",
      date: new Date().toISOString().split("T")[0], // Sử dụng ngày hiện tại
      checkIn: "09:15",
      checkOut: "",
      status: "late",
      workHours: 0,
    },
    // Thêm một số dữ liệu cho các ngày khác để test
    {
      id: 4,
      employeeId: "EMP004",
      employeeName: "Phạm Thị D",
      date: "2024-12-05",
      checkIn: "08:45",
      checkOut: "17:30",
      status: "present",
      workHours: 7.75,
    },
    {
      id: 5,
      employeeId: "EMP005",
      employeeName: "Hoàng Văn E",
      date: "2024-12-04",
      checkIn: "",
      checkOut: "",
      status: "absent",
      workHours: 0,
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filterStatus, setFilterStatus] = useState("all");

  // Thêm useEffect để cập nhật thời gian thực
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Cập nhật mỗi giây

    // Cleanup function để clear interval khi component unmount
    return () => clearInterval(timer);
  }, []);

  // Generate new QR code
  const generateNewQRCode = () => {
    const newCode = `QR${new Date().getFullYear()}${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${String(
      Math.floor(Math.random() * 100)
    ).padStart(2, "0")}`;
    setQrCode(newCode);
  };

  // Handle employee check-in
  const handleCheckIn = () => {
    if (checkInCode === qrCode) {
      const now = new Date();
      const timeString = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      alert(`Chấm công thành công!\nThời gian: ${timeString}`);
      setCheckInCode("");
    } else {
      alert("Mã QR không hợp lệ!");
    }
  };

  // Filter records based on selected criteria
  const filteredRecords = attendanceRecords.filter((record) => {
    const dateMatch = record.date === selectedDate;
    const statusMatch =
      filterStatus === "all" || record.status === filterStatus;
    return dateMatch && statusMatch;
  });

  // Check if user is admin or HR
  const isAdminOrHR = user?.role === "admin" || user?.role === "hr";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Hệ thống Chấm công
              </h1>
              <p className="text-gray-600">
                Quản lý thời gian làm việc hiệu quả
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab("checkin")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "checkin"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Clock className="inline h-4 w-4 mr-2" />
              Chấm công
            </button>
            {isAdminOrHR && (
              <>
                <button
                  onClick={() => setActiveTab("manage")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === "manage"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Users className="inline h-4 w-4 mr-2" />
                  Quản lý
                </button>
                <button
                  onClick={() => setActiveTab("qr-settings")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === "qr-settings"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Settings className="inline h-4 w-4 mr-2" />
                  Cài đặt QR
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "checkin" && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* QR Code Display */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Mã QR Hôm nay
                  </h2>
                  <p className="text-gray-600">Quét mã để chấm công</p>
                </div>

                {/* QR Code Visual */}
                <div className="mb-6 flex justify-center">
                  <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-dashed border-blue-200">
                    <QrCode className="h-32 w-32 text-blue-600 mx-auto" />
                    <div className="mt-4 text-center">
                      <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
                        <code className="text-lg font-mono font-bold text-blue-600">
                          {qrCode}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Hướng dẫn:</strong> Sử dụng mã này để chấm công hôm
                    nay. Mã sẽ được đổi mới mỗi ngày.
                  </p>
                </div>
              </div>
            </div>

            {/* Check-in Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Chấm công
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nhập mã QR
                  </label>
                  <input
                    type="text"
                    value={checkInCode}
                    onChange={(e) => setCheckInCode(e.target.value)}
                    placeholder="Nhập mã QR để chấm công"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-mono text-lg"
                  />
                </div>

                <button
                  onClick={handleCheckIn}
                  disabled={!checkInCode.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                >
                  <Clock className="inline h-5 w-5 mr-2" />
                  Chấm công
                </button>

                {/* Current Time Display - Sử dụng currentTime state thay vì new Date() */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">
                    Thời gian hiện tại
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {currentTime.toLocaleTimeString("vi-VN")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentTime.toLocaleDateString("vi-VN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin/HR Management Tab */}
        {activeTab === "manage" && isAdminOrHR && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tất cả</option>
                    <option value="present">Có mặt</option>
                    <option value="late">Đi muộn</option>
                    <option value="absent">Vắng mặt</option>
                  </select>
                </div>

                <button className="mt-7 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="inline h-4 w-4 mr-2" />
                  Xuất file Excel
                </button>
              </div>
            </div>

            {/* Attendance Records */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">
                  Bảng chấm công
                </h2>
                <p className="text-gray-600">
                  Ngày: {new Date(selectedDate).toLocaleDateString("vi-VN")}
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Mã NV
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Tên nhân viên
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Giờ vào
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Giờ ra
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Số giờ
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Trạng thái
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {record.employeeId}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {record.employeeName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {record.checkIn || "-"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {record.checkOut || "-"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {record.workHours}h
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                record.status === "present"
                                  ? "bg-green-100 text-green-800"
                                  : record.status === "late"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {record.status === "present"
                                ? "Có mặt"
                                : record.status === "late"
                                ? "Đi muộn"
                                : "Vắng mặt"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-blue-600 hover:text-blue-800 mr-3">
                              <Eye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center space-y-3">
                            <Users className="h-12 w-12 text-gray-400" />
                            <div>
                              <p className="text-gray-500 font-medium">
                                Không có dữ liệu chấm công
                              </p>
                              <p className="text-sm text-gray-400">
                                Thử thay đổi ngày hoặc bộ lọc trạng thái
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* QR Settings Tab */}
        {activeTab === "qr-settings" && isAdminOrHR && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Cài đặt mã QR
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Mã QR hiện tại
                  </h3>
                  <div className="flex items-center justify-between">
                    <code className="text-2xl font-mono font-bold text-blue-600 bg-white px-4 py-2 rounded-lg">
                      {qrCode}
                    </code>
                    <button
                      onClick={generateNewQRCode}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                    >
                      <RefreshCw className="inline h-4 w-4 mr-2" />
                      Tạo mã mới
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-green-800">
                        Tự động đổi mã
                      </h4>
                    </div>
                    <p className="text-sm text-green-700">
                      Hệ thống sẽ tự động tạo mã QR mới mỗi ngày lúc 0:00
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <Clock className="h-5 w-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-blue-800">
                        Thời gian hiệu lực
                      </h4>
                    </div>
                    <p className="text-sm text-blue-700">
                      Mỗi mã QR có hiệu lực trong 24 giờ
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Lịch sử mã QR
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <code className="font-mono text-gray-800">
                          QR2024120401
                        </code>
                        <p className="text-xs text-gray-600">04/12/2024</p>
                      </div>
                      <span className="text-xs text-gray-500">Đã hết hạn</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <code className="font-mono text-gray-800">
                          QR2024120301
                        </code>
                        <p className="text-xs text-gray-600">03/12/2024</p>
                      </div>
                      <span className="text-xs text-gray-500">Đã hết hạn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceSystem;
