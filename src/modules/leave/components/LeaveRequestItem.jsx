import { User, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react";

const LeaveRequestItem = ({
  request,
  canApprove,
  onApproveReject,
  leaveTypes,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "approved":
        return "text-green-600 bg-green-100 border-green-200";
      case "rejected":
        return "text-red-600 bg-red-100 border-red-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
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
        return <Clock className="w-4 h-4" />;
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Kiểm tra xem đơn có phải mới nộp không (trong vòng 24h)
  const isNewRequest = () => {
    const appliedDate = new Date(
      request.appliedDate.split("/").reverse().join("-")
    );
    const now = new Date();
    const diffHours = (now - appliedDate) / (1000 * 60 * 60);
    return diffHours <= 24 && request.status === "pending";
  };

  const handleApprove = () => {
    const comments = prompt("Ghi chú (tùy chọn):");
    onApproveReject(request.id, "approved", comments || "");
  };

  const handleReject = () => {
    const comments = prompt("Lý do từ chối:");
    if (comments) {
      onApproveReject(request.id, "rejected", comments);
    }
  };

  return (
    <div
      className={`p-6 transition-all duration-200 ${
        request.status === "pending"
          ? "hover:bg-yellow-50 bg-yellow-25"
          : "hover:bg-gray-50"
      }`}
    >
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

            <div className="flex items-center space-x-2">
              <div
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  request.status
                )} ${request.status === "pending" ? "animate-pulse" : ""}`}
              >
                {getStatusIcon(request.status)}
                <span className="ml-1">{getStatusText(request.status)}</span>
              </div>

              {/* Badge cho đơn mới */}
              {isNewRequest() && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1"></span>
                  Mới
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
            <div>
              <p className="text-sm text-gray-500">Loại nghỉ</p>
              <p className="font-medium">
                {leaveTypes.find((type) => type.value === request.leaveType)
                  ?.label || request.leaveType}
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
              <p
                className={`font-medium ${
                  isNewRequest() ? "text-red-600" : ""
                }`}
              >
                {request.appliedDate}
                {isNewRequest() && (
                  <span className="ml-1 text-xs text-red-500">(hôm nay)</span>
                )}
              </p>
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
                  <p className="text-sm text-gray-500 mb-1">Ghi chú</p>
                  <p className="text-gray-900 italic">"{request.comments}"</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Approval Actions */}
        {canApprove && request.status === "pending" && (
          <div className="ml-4 flex space-x-2">
            <button
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm flex items-center space-x-1 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Duyệt</span>
            </button>
            <button
              onClick={handleReject}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm flex items-center space-x-1 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <XCircle className="w-4 h-4" />
              <span>Từ chối</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestItem;
