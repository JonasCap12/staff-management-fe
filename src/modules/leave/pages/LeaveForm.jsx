import React, { useState } from "react";
import { useAuth } from "../../auth/context/useAuth";
import {
  Calendar,
  Clock,
  User,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  X,
} from "lucide-react";

const LeaveManagement = () => {
  const { user, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState("my-requests");
  const [showRequestForm, setShowRequestForm] = useState(false);

  // Mock data for leave requests
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      employeeName: "Nguyễn Văn A",
      department: "IT",
      leaveType: "annual",
      startDate: "2025-06-10",
      endDate: "2025-06-12",
      days: 3,
      reason: "Nghỉ phép thường niên",
      status: "pending",
      appliedDate: "2025-06-05",
      approvedBy: null,
      approvedDate: null,
      comments: "",
    },
    {
      id: 2,
      employeeId: "EMP002",
      employeeName: "Trần Thị B",
      department: "HR",
      leaveType: "sick",
      startDate: "2025-06-08",
      endDate: "2025-06-08",
      days: 1,
      reason: "Bị cảm sốt, cần nghỉ để điều trị",
      status: "approved",
      appliedDate: "2025-06-07",
      approvedBy: "HR Manager",
      approvedDate: "2025-06-07",
      comments: "Đã phê duyệt, chúc mau khỏi bệnh",
    },
    {
      id: 3,
      employeeId: "EMP003",
      employeeName: "Lê Văn C",
      department: "Sales",
      leaveType: "personal",
      startDate: "2025-06-15",
      endDate: "2025-06-17",
      days: 3,
      reason: "Có việc gia đình cần giải quyết gấp",
      status: "rejected",
      appliedDate: "2025-06-04",
      approvedBy: "Team Lead",
      approvedDate: "2025-06-05",
      comments:
        "Thời gian này đang bận dự án quan trọng, vui lòng chọn thời gian khác",
    },
  ]);

  const [newRequest, setNewRequest] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    customReason: "",
  });

  const leaveTypes = [
    { value: "annual", label: "Nghỉ phép thường niên" },
    { value: "sick", label: "Nghỉ ốm" },
    { value: "personal", label: "Nghỉ việc riêng" },
    { value: "maternity", label: "Nghỉ thai sản" },
    { value: "paternity", label: "Nghỉ chăm con" },
    { value: "emergency", label: "Nghỉ khẩn cấp" },
    { value: "other", label: "Khác" },
  ];

  const commonReasons = {
    annual: [
      "Nghỉ phép thường niên",
      "Du lịch cùng gia đình",
      "Nghỉ ngơi thư giãn",
      "Về quê thăm gia đình",
      "Khác",
    ],
    sick: [
      "Bị cảm sốt",
      "Đau bụng, tiêu chảy",
      "Đau đầu, chóng mặt",
      "Đau răng",
      "Bị thương, tai nạn nhẹ",
      "Khác",
    ],
    personal: [
      "Việc gia đình khẩn cấp",
      "Giải quyết giấy tờ quan trọng",
      "Tham gia đám cưới/lễ gia đình",
      "Chăm sóc người thân ốm",
      "Khác",
    ],
    maternity: [
      "Nghỉ sinh con",
      "Nghỉ trước sinh (thai sản)",
      "Nghỉ sau sinh (hậu sản)",
      "Khác",
    ],
    paternity: ["Nghỉ chăm con sơ sinh", "Chăm vợ sinh con", "Khác"],
    emergency: [
      "Cấp cứu y tế",
      "Tai nạn nghiêm trọng",
      "Tang lễ người thân",
      "Thiên tai, hỏa hoạn",
      "Khác",
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "approved":
        return "text-green-600 bg-green-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ duyệt";
      case "approved":
        return "Đã duyệt";
      case "rejected":
        return "Từ chối";
      default:
        return "Không xác định";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Kiểm tra ngày kết thúc phải sau ngày bắt đầu
    if (end < start) return -1; // Trả về -1 để báo hiệu lỗi

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const validateDates = (startDate, endDate) => {
    if (!startDate || !endDate) return { isValid: false, message: "" };

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Kiểm tra ngày bắt đầu không được trong quá khứ (trừ nghỉ ốm, khẩn cấp)
    if (
      start < today &&
      !["sick", "emergency"].includes(newRequest.leaveType)
    ) {
      return {
        isValid: false,
        message:
          "Ngày bắt đầu không được trong quá khứ (trừ nghỉ ốm và khẩn cấp)",
      };
    }

    // Kiểm tra ngày kết thúc phải sau hoặc bằng ngày bắt đầu
    if (end < start) {
      return {
        isValid: false,
        message: "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu",
      };
    }

    // Kiểm tra khoảng thời gian hợp lý cho từng loại nghỉ
    const days = calculateDays(startDate, endDate);
    if (newRequest.leaveType === "sick" && days > 7) {
      return {
        isValid: false,
        message:
          "Nghỉ ốm không nên quá 7 ngày liên tục. Vui lòng liên hệ HR nếu cần nghỉ lâu hơn",
      };
    }

    if (newRequest.leaveType === "annual" && days > 14) {
      return {
        isValid: false,
        message: "Nghỉ phép thường niên không nên quá 14 ngày liên tục",
      };
    }

    return { isValid: true, message: "" };
  };

  const handleSubmitRequest = () => {
    if (
      !newRequest.leaveType ||
      !newRequest.startDate ||
      !newRequest.endDate ||
      (!newRequest.reason && newRequest.leaveType !== "other") ||
      ((newRequest.leaveType === "other" || newRequest.reason === "Khác") &&
        !newRequest.customReason)
    ) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    // Validate ngày tháng
    const dateValidation = validateDates(
      newRequest.startDate,
      newRequest.endDate
    );
    if (!dateValidation.isValid) {
      alert(dateValidation.message);
      return;
    }

    const days = calculateDays(newRequest.startDate, newRequest.endDate);
    if (days === -1) {
      alert("Ngày kết thúc phải sau hoặc bằng ngày bắt đầu");
      return;
    }
    const finalReason =
      newRequest.leaveType === "other" || newRequest.reason === "Khác"
        ? newRequest.customReason
        : newRequest.reason;

    const request = {
      id: leaveRequests.length + 1,
      employeeId: user?.id || "EMP999",
      employeeName: user?.name || "Current User",
      department: user?.department || "Unknown",
      leaveType: newRequest.leaveType,
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      reason: finalReason,
      status: "pending",
      appliedDate: new Date().toISOString().split("T")[0],
      approvedBy: null,
      approvedDate: null,
      comments: "",
    };

    setLeaveRequests([...leaveRequests, request]);
    setNewRequest({
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      customReason: "",
    });
    setShowRequestForm(false);
  };

  const handleApproveReject = (requestId, action, comments = "") => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: action,
              approvedBy: user?.name || "Current User",
              approvedDate: new Date().toISOString().split("T")[0],
              comments: comments,
            }
          : request
      )
    );
  };

  // Trong hàm getFilteredRequests(), thay đổi logic như sau:

  const getFilteredRequests = () => {
    // Chỉ Admin và HR mới có thể xem tất cả đơn
    if (hasPermission("*") || hasPermission("leave.admin")) {
      return leaveRequests;
    }
    // Team Lead có thể xem đơn của team (cùng department)
    else if (hasPermission("leave.approve")) {
      return leaveRequests.filter((req) => req.department === user?.department);
    }
    // Tất cả role khác (bao gồm accounting) chỉ xem được đơn của mình
    else {
      return leaveRequests.filter((req) => req.employeeId === user?.id);
    }
  };

  // Trong Tab Navigation, cập nhật text hiển thị:
  <button
    onClick={() => setActiveTab("my-requests")}
    className={`py-2 px-1 border-b-2 font-medium text-sm ${
      activeTab === "my-requests"
        ? "border-blue-500 text-blue-600"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
  >
    {hasPermission("*") || hasPermission("leave.admin")
      ? "Tất Cả Đơn"
      : hasPermission("leave.approve")
      ? "Đơn Team"
      : "Đơn Của Tôi"}
  </button>;

  const canApprove =
    hasPermission("*") ||
    hasPermission("leave.admin") ||
    hasPermission("leave.approve");
  const canCreateRequest =
    hasPermission("leave.own") ||
    hasPermission("leave.admin") ||
    hasPermission("*");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(2px);
        }

        .modal-content {
          background: linear-gradient(135deg, #f8faff 0%, #ffffff 100%);
          border-radius: 20px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-header {
          padding: 24px 24px 16px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .modal-body {
          padding: 20px 24px 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
          font-size: 0.9rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.2s;
          background: white;
          box-sizing: border-box;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .btn {
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          justify-content: center;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #6b7280;
          border: 1px solid #d1d5db;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
          color: #374151;
        }

        .days-info {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .days-info.error {
          background: #fef2f2;
          border: 1px solid #fca5a5;
        }

        .days-info.normal {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
        }

        .validation-warning {
          color: #f59e0b;
          font-size: 0.875rem;
          margin-top: 4px;
        }

        .validation-error {
          color: #ef4444;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .validation-success {
          color: #10b981;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .helper-text {
          color: #6b7280;
          font-size: 0.75rem;
          margin-top: 4px;
        }
      `}</style>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Quản Lý Nghỉ Phép
        </h1>
        <p className="text-gray-600">
          Quản lý đơn xin nghỉ phép và theo dõi trạng thái
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("my-requests")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "my-requests"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {hasPermission("*") || hasPermission("leave")
              ? "Tất Cả Đơn"
              : "Đơn Của Tôi"}
          </button>
          {canApprove && (
            <button
              onClick={() => setActiveTab("pending-approval")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "pending-approval"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Chờ Duyệt
              <span className="ml-2 bg-red-100 text-red-600 py-1 px-2 rounded-full text-xs">
                {
                  getFilteredRequests().filter(
                    (req) => req.status === "pending"
                  ).length
                }
              </span>
            </button>
          )}
        </nav>
      </div>

      {/* New Request Button */}
      {canCreateRequest && (
        <div className="mb-6">
          <button
            onClick={() => setShowRequestForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo Đơn Nghỉ Phép</span>
          </button>
        </div>
      )}

      {/* New Request Form Modal */}
      {showRequestForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowRequestForm(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Tạo Đơn Nghỉ Phép</h3>
              <button
                onClick={() => setShowRequestForm(false)}
                className="modal-close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Loại nghỉ phép *</label>
                <select
                  value={newRequest.leaveType}
                  onChange={(e) =>
                    setNewRequest({
                      ...newRequest,
                      leaveType: e.target.value,
                      reason: "",
                    })
                  }
                  className="form-select"
                  required
                >
                  <option value="">Chọn loại nghỉ phép</option>
                  {leaveTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Ngày bắt đầu *</label>
                <input
                  type="date"
                  value={newRequest.startDate}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, startDate: e.target.value })
                  }
                  min={
                    ["sick", "emergency"].includes(newRequest.leaveType)
                      ? ""
                      : new Date().toISOString().split("T")[0]
                  }
                  className="form-input"
                  required
                />
                {newRequest.leaveType &&
                  !["sick", "emergency"].includes(newRequest.leaveType) && (
                    <p className="helper-text">
                      Không được chọn ngày trong quá khứ
                    </p>
                  )}
              </div>

              <div className="form-group">
                <label className="form-label">Ngày kết thúc *</label>
                <input
                  type="date"
                  value={newRequest.endDate}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, endDate: e.target.value })
                  }
                  min={
                    newRequest.startDate ||
                    new Date().toISOString().split("T")[0]
                  }
                  className="form-input"
                  required
                />
                <p className="helper-text">Phải sau hoặc bằng ngày bắt đầu</p>
              </div>

              {newRequest.startDate && newRequest.endDate && (
                <div
                  className={`days-info ${
                    calculateDays(newRequest.startDate, newRequest.endDate) ===
                    -1
                      ? "error"
                      : "normal"
                  }`}
                >
                  {calculateDays(newRequest.startDate, newRequest.endDate) ===
                  -1 ? (
                    <p className="validation-error">
                      ⚠️ Lỗi: Ngày kết thúc phải sau hoặc bằng ngày bắt đầu
                    </p>
                  ) : (
                    <>
                      <p className="validation-success">
                        Số ngày nghỉ:{" "}
                        <span className="font-semibold">
                          {calculateDays(
                            newRequest.startDate,
                            newRequest.endDate
                          )}{" "}
                          ngày
                        </span>
                      </p>
                      {(() => {
                        const validation = validateDates(
                          newRequest.startDate,
                          newRequest.endDate
                        );
                        if (!validation.isValid && validation.message) {
                          return (
                            <p className="validation-warning">
                              ⚠️ {validation.message}
                            </p>
                          );
                        }
                        return null;
                      })()}
                    </>
                  )}
                </div>
              )}

              {newRequest.leaveType && newRequest.leaveType !== "other" && (
                <div className="form-group">
                  <label className="form-label">Lý do *</label>
                  <select
                    value={newRequest.reason}
                    onChange={(e) =>
                      setNewRequest({ ...newRequest, reason: e.target.value })
                    }
                    className="form-select"
                    required
                  >
                    <option value="">Chọn lý do</option>
                    {(commonReasons[newRequest.leaveType] || []).map(
                      (reason) => (
                        <option key={reason} value={reason}>
                          {reason}
                        </option>
                      )
                    )}
                  </select>
                </div>
              )}

              {(newRequest.leaveType === "other" ||
                newRequest.reason === "Khác") && (
                <div className="form-group">
                  <label className="form-label">Lý do cụ thể *</label>
                  <textarea
                    value={newRequest.customReason}
                    onChange={(e) =>
                      setNewRequest({
                        ...newRequest,
                        customReason: e.target.value,
                      })
                    }
                    className="form-textarea"
                    rows="3"
                    placeholder="Vui lòng mô tả lý do cụ thể..."
                    required
                  />
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="btn btn-secondary"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSubmitRequest}
                  className="btn btn-primary"
                >
                  <Plus size={16} />
                  Gửi Đơn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leave Requests List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            {activeTab === "pending-approval"
              ? "Đơn Chờ Duyệt"
              : "Danh Sách Đơn Nghỉ Phép"}
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {getFilteredRequests()
            .filter((req) =>
              activeTab === "pending-approval" ? req.status === "pending" : true
            )
            .map((request) => (
              <div key={request.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {request.employeeName}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({request.employeeId})
                        </span>
                      </div>
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {getStatusIcon(request.status)}
                        <span className="ml-1">
                          {getStatusText(request.status)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Loại nghỉ</p>
                        <p className="font-medium">
                          {leaveTypes.find(
                            (type) => type.value === request.leaveType
                          )?.label || request.leaveType}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Thời gian</p>
                        <p className="font-medium">
                          {request.startDate} đến {request.endDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Số ngày</p>
                        <p className="font-medium">{request.days} ngày</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Ngày nộp</p>
                        <p className="font-medium">{request.appliedDate}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-1">Lý do</p>
                      <p className="text-gray-900">{request.reason}</p>
                    </div>

                    {request.status !== "pending" && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-500 mb-1">
                          {request.status === "approved"
                            ? "Phê duyệt bởi"
                            : "Từ chối bởi"}
                        </p>
                        <p className="text-gray-900">
                          {request.approvedBy} - {request.approvedDate}
                        </p>
                        {request.comments && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500 mb-1">
                              Ghi chú
                            </p>
                            <p className="text-gray-900 italic">
                              "{request.comments}"
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Approval Actions */}
                  {canApprove && request.status === "pending" && (
                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={() => {
                          const comments = prompt("Ghi chú (tùy chọn):");
                          handleApproveReject(
                            request.id,
                            "approved",
                            comments || ""
                          );
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Duyệt</span>
                      </button>
                      <button
                        onClick={() => {
                          const comments = prompt("Lý do từ chối:");
                          if (comments) {
                            handleApproveReject(
                              request.id,
                              "rejected",
                              comments
                            );
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Từ chối</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

          {getFilteredRequests().filter((req) =>
            activeTab === "pending-approval" ? req.status === "pending" : true
          ).length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p>Không có đơn nghỉ phép nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
