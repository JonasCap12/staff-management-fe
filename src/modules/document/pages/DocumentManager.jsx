import React from "react";
import { DocumentProvider, useDocument } from "../context/DocumentContext";
import DocumentFilters from "../components/DocumentFilters";
import DocumentTable from "../components/DocumentTable";
import { FileText, Calendar } from "lucide-react"; // Thêm import icons

const DocumentManagerContent = () => {
  const { setModals, userRole } = useDocument();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header cải tiến */}
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
                    onClick={() => setModals((m) => ({ ...m, assign: true }))}
                  >
                    Gán phòng ban
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Bộ lọc tài liệu */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <DocumentFilters />
        </div>
        {/* Bảng tài liệu */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <DocumentTable />
        </div>
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
