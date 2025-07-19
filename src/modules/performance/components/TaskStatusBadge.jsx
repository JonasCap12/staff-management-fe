import React from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const TaskStatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "completed":
        return {
          color: "bg-green-100 text-green-800",
          icon: CheckCircle,
          text: "Hoàn thành",
        };
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: Clock,
          text: "Đang thực hiện",
        };
      case "overdue":
        return {
          color: "bg-red-100 text-red-800",
          icon: AlertCircle,
          text: "Quá hạn",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: Clock,
          text: "Không xác định",
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      <Icon className="w-3 h-3" />
      {config.text}
    </span>
  );
};

export default TaskStatusBadge;
