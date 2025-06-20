import { FileText } from "lucide-react";
import LeaveRequestItem from "./LeaveRequestItem";

const LeaveRequestList = ({
  requests,
  activeTab,
  canApprove,
  onApproveReject,
  leaveTypes,
}) => {
  // Lọc và sắp xếp đơn xin nghỉ phép
  const getFilteredAndSortedRequests = () => {
    let filteredRequests = requests.filter((req) =>
      activeTab === "pending-approval" ? req.status === "pending" : true
    );

    // Sắp xếp theo thứ tự ưu tiên dựa trên tab hiện tại
    return filteredRequests.sort((a, b) => {
      if (activeTab === "pending-approval") {
        // Tab "Đơn Chờ Duyệt": Chỉ sắp xếp theo ngày nộp đơn (mới nhất lên đầu)
        const dateA = new Date(a.appliedDate.split("/").reverse().join("-"));
        const dateB = new Date(b.appliedDate.split("/").reverse().join("-"));
        return dateB - dateA;
      } else {
        // Tab "Tất cả đơn": Ưu tiên đơn pending lên đầu
        // 1. Đơn pending lên đầu
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;

        // 2. Trong cùng trạng thái, sắp xếp theo ngày nộp đơn (mới nhất lên đầu)
        const dateA = new Date(a.appliedDate.split("/").reverse().join("-"));
        const dateB = new Date(b.appliedDate.split("/").reverse().join("-"));
        return dateB - dateA;
      }
    });
  };

  const sortedRequests = getFilteredAndSortedRequests();

  // Đếm số đơn pending để hiển thị badge
  const pendingCount = requests.filter(
    (req) => req.status === "pending"
  ).length;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {activeTab === "pending-approval"
              ? "Đơn Chờ Duyệt"
              : "Danh Sách Đơn Nghỉ Phép"}
          </h2>

          {/* Badge hiển thị số đơn chờ duyệt */}
          {activeTab !== "pending-approval" && pendingCount > 0 && (
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1 animate-pulse"></span>
                {pendingCount} đơn chờ duyệt
              </span>
            </div>
          )}
        </div>

        {/* Thông tin sắp xếp */}
        <p className="text-sm text-gray-500 mt-1">
          {activeTab === "pending-approval"
            ? "Sắp xếp theo ngày nộp đơn (mới nhất lên đầu)"
            : "Đơn chờ duyệt được ưu tiên hiển thị đầu tiên"}
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {sortedRequests.map((request) => (
          <div key={request.id} className="relative">
            {/* Highlight cho đơn pending */}
            {request.status === "pending" &&
              activeTab !== "pending-approval" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"></div>
              )}
            <LeaveRequestItem
              request={request}
              canApprove={canApprove}
              onApproveReject={onApproveReject}
              leaveTypes={leaveTypes}
            />
          </div>
        ))}

        {sortedRequests.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>
              {activeTab === "pending-approval"
                ? "Không có đơn chờ duyệt nào"
                : "Không có đơn nghỉ phép nào"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestList;
