import React, { useState } from "react";
import { DocumentProvider, useDocument } from "../context/DocumentContext";
import DocumentFilters from "../components/DocumentFilters";
import DocumentTable from "../components/DocumentTable";
import EmployeeProfilesManager from "../components/EmployeeProfilesManager";
import { FileText, Users, FolderOpen, Database, Settings } from "lucide-react";

const DocumentManagerContent = () => {
  const { setModals, userRole } = useDocument();
  const [activeTab, setActiveTab] = useState("documents");

  const tabs = [
    {
      id: "documents",
      label: "Tài liệu chung",
      icon: FileText,
    },
    {
      id: "employee-profiles",
      label: "Hồ sơ nhân viên",
      icon: Users,
    },
    {
      id: "templates",
      label: "Mẫu đơn",
      icon: FolderOpen,
    },
    {
      id: "archive",
      label: "Lưu trữ",
      icon: Database,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "employee-profiles":
        return <EmployeeProfilesManager />;
      case "templates":
        return (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Mẫu đơn & Biểu mẫu
            </h3>
            <p className="text-gray-500">
              Quản lý các mẫu đơn và biểu mẫu chuẩn của công ty
            </p>
          </div>
        );
      case "archive":
        return (
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Khu vực lưu trữ
            </h3>
            <p className="text-gray-500">
              Tài liệu đã được lưu trữ và không còn sử dụng thường xuyên
            </p>
          </div>
        );
      default:
        return (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <DocumentFilters />
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <DocumentTable />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header đơn giản */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                <FileText className="w-6 h-6 md:w-8 md:h-8 inline-block mr-2 text-blue-600" />
                Quản lý Tài liệu Nhân sự
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Lưu trữ, tìm kiếm và quản lý tài liệu nội bộ công ty
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow flex items-center gap-2 transition"
                  onClick={() => setModals((m) => ({ ...m, upload: true }))}
                >
                  + Tải lên tài liệu
                </button>
                {userRole === "admin" && (
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow flex items-center gap-2 transition"
                    onClick={() => setModals((m) => ({ ...m, settings: true }))}
                  >
                    <Settings className="w-4 h-4" />
                    Cài đặt
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
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
      <div className="max-w-7xl mx-auto p-6">
        {/* Tab description */}
        <div className="mb-6">
          <div className="">
            <p className="text-blue-800 font-medium">
              {tabs.find((tab) => tab.id === activeTab)?.description}
            </p>
          </div>
        </div>

        {/* Tab content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

const DocumentManager = () => (
  <DocumentProvider>
    <DocumentManagerContent />
  </DocumentProvider>
);

export default DocumentManager;
