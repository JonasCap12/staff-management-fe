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

  const tabs = [
    {
      id: "checkin",
      label: "Chấm công",
      icon: Clock,
    },
    ...(isAdminOrHR
      ? [
          {
            id: "manage",
            label: "Quản lý",
            icon: Users,
          },
          {
            id: "qr-settings",
            label: "Cài đặt QR",
            icon: Settings,
          },
        ]
      : []),
  ];

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

          {/* Tab Navigation - Updated to match DocumentManager style */}
          <div className="mt-6">
            <nav className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 border ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
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
