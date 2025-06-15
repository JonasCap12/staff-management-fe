// pages/AttendanceSystem.jsx
import { useState } from "react";
import { Clock, Users, Settings } from "lucide-react";
import { useAuth } from "../../auth/context/useAuth";
import CheckInTab from "../components/CheckInTab";
import ManageTab from "../components/ManageTab";
import QRSettingsTab from "../components/QRSettingsTab";

const AttendanceSystem = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("checkin");

  // ✅ Tạo qrCode và setter ở đây
  const [qrCode, setQrCode] = useState("QR2024120501");

  // ✅ Hàm tạo QR mới (có thể tái sử dụng)
  const generateNewQRCode = () => {
    const newCode = `QR${new Date().getFullYear()}${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${String(
      Math.floor(Math.random() * 100)
    ).padStart(2, "0")}`;
    setQrCode(newCode);
  };

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

          {/* Tabs */}
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

        {/* Nội dung tab */}
        {activeTab === "checkin" && <CheckInTab qrCode={qrCode} />}
        {activeTab === "manage" && isAdminOrHR && <ManageTab />}
        {activeTab === "qr-settings" && isAdminOrHR && (
          <QRSettingsTab
            qrCode={qrCode}
            generateNewQRCode={generateNewQRCode}
          />
        )}
      </div>
    </div>
  );
};

export default AttendanceSystem;
