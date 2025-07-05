// pages/AttendanceSystem.jsx
import { useState } from "react";
import { Clock, Users, Settings, User, Calendar } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                  Hệ thống Chấm công
                </h1>
              </div>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Quản lý thời gian làm việc hiệu quả
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="mb-8">
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
    </div>
  );
};

export default AttendanceSystem;
