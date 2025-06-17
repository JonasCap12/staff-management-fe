import { useState } from "react";
import { useAuth } from "../../auth/context/useAuth";
import { Plus } from "lucide-react";
import LeaveForm from "../components/LeaveForm";
import LeaveRequestList from "../components/LeaveRequestList";
import { leaveTypes, commonReasons } from "../data/leaveConstants";

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

  const handleSubmitRequest = (requestData) => {
    const request = {
      id: leaveRequests.length + 1,
      employeeId: user?.id || "EMP999",
      employeeName: user?.name || "Current User",
      department: user?.department || "Unknown",
      ...requestData,
      status: "pending",
      appliedDate: new Date().toISOString().split("T")[0],
      approvedBy: null,
      approvedDate: null,
      comments: "",
    };

    setLeaveRequests([...leaveRequests, request]);
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
            {hasPermission("*") || hasPermission("leave.admin")
              ? "Tất Cả Đơn"
              : hasPermission("leave.approve")
              ? "Đơn Team"
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
        <LeaveForm
          onSubmit={handleSubmitRequest}
          onClose={() => setShowRequestForm(false)}
          leaveTypes={leaveTypes}
          commonReasons={commonReasons}
        />
      )}

      {/* Leave Requests List */}
      <LeaveRequestList
        requests={getFilteredRequests()}
        activeTab={activeTab}
        canApprove={canApprove}
        onApproveReject={handleApproveReject}
        leaveTypes={leaveTypes}
      />
    </div>
  );
};

export default LeaveManagement;
