import React from "react";
import { Users, TrendingUp, Clock, Star } from "lucide-react";

const EmployeeStats = ({ employees }) => {
  const stats = [
    {
      label: "Tổng nhân viên",
      value: employees.length,
      icon: Users,
      color: "blue",
      change: "+12%",
    },
    {
      label: "Đang hoạt động",
      value: employees.filter((e) => e.status === "active").length,
      icon: TrendingUp,
      color: "green",
      change: "+8%",
    },
    {
      label: "Nghỉ phép",
      value: employees.filter((e) => e.status === "leave").length,
      icon: Clock,
      color: "yellow",
      change: "-2%",
    },
    {
      label: "Đánh giá TB",
      value:
        employees.length > 0
          ? (
              employees.reduce((sum, e) => sum + (e.rating || 0), 0) /
              employees.length
            ).toFixed(1)
          : "-",
      icon: Star,
      color: "purple",
      change: "+0.2",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p
                className={`text-sm mt-2 ${
                  stat.change.startsWith("+")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {stat.change} từ tháng trước
              </p>
            </div>
            <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
              <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeStats;
