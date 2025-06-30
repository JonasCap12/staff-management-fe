export const calculateDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Kiểm tra ngày kết thúc phải sau ngày bắt đầu
  if (end < start) return -1; // Trả về -1 để báo hiệu lỗi

  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
};

export const validateDates = (startDate, endDate, leaveType) => {
  if (!startDate || !endDate) return { isValid: false, message: "" };

  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Kiểm tra ngày bắt đầu không được trong quá khứ (trừ nghỉ ốm, khẩn cấp)
  if (start < today && !["sick", "emergency"].includes(leaveType)) {
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
  if (leaveType === "sick" && days > 7) {
    return {
      isValid: false,
      message:
        "Nghỉ ốm không nên quá 7 ngày liên tục. Vui lòng liên hệ HR nếu cần nghỉ lâu hơn",
    };
  }

  if (leaveType === "annual" && days > 14) {
    return {
      isValid: false,
      message: "Nghỉ phép thường niên không nên quá 14 ngày liên tục",
    };
  }

  return { isValid: true, message: "" };
};

export const getStatusColor = (status) => {
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

export const getStatusText = (status) => {
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
