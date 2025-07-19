import {
  BarChart3,
  Users,
  Clock,
  Calendar,
  DollarSign,
  UserPlus,
  TrendingUp,
  FileText,
  PieChart,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/auth/context/useAuth";

const menuItems = [
  {
    to: "/dashboard",
    icon: BarChart3,
    label: "Dashboard",
    color: "text-blue-500",
    menuKey: "dashboard",
  },
  {
    to: "/employees",
    icon: Users,
    label: "Quản lý Nhân viên",
    color: "text-green-500",
    menuKey: "employees",
  },
  {
    to: "/attendance",
    icon: Clock,
    label: "Chấm công",
    color: "text-purple-500",
    menuKey: "attendance",
  },
  {
    to: "/leave",
    icon: Calendar,
    label: "Nghỉ phép",
    color: "text-orange-500",
    menuKey: "leave",
  },
  {
    to: "/payroll",
    icon: DollarSign,
    label: "Lương & Phụ cấp",
    color: "text-red-500",
    menuKey: "payroll",
  },
  {
    to: "/recruitment",
    icon: UserPlus,
    label: "Tuyển dụng",
    color: "text-indigo-500",
    menuKey: "recruitment",
  },
  {
    to: "/performance",
    icon: TrendingUp,
    label: "Đánh giá hiệu suất",
    color: "text-pink-500",
    menuKey: "performance",
  },
  {
    to: "/documents",
    icon: FileText,
    label: "Tài liệu nhân sự",
    color: "text-yellow-500",
    menuKey: "documents",
  },
  {
    to: "/reports",
    icon: PieChart,
    label: "Báo cáo & Thống kê",
    color: "text-cyan-500",
    menuKey: "reports",
  },
  {
    to: "/settings",
    icon: Settings,
    label: "Cài đặt hệ thống",
    color: "text-gray-500",
    menuKey: "settings",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, canAccessMenu } = useAuth();

  // Filter menu items based on user permissions
  const accessibleMenuItems = menuItems.filter((item) =>
    canAccessMenu(item.menuKey)
  );

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-md min-h-screen">
      <div className="p-6">
        <div className="text-xl font-bold text-blue-600 tracking-wide">
          HR System
        </div>
        {user && (
          <div className="mt-2 text-xs text-gray-500">
            Xin chào,{" "}
            <span className="font-semibold text-gray-700">{user.name}</span>
          </div>
        )}
      </div>

      <nav className="space-y-1 px-3">
        {accessibleMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.to);

          return (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              className={`group flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-l-4 border-blue-500 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <Icon
                className={`mr-3 h-5 w-5 transition-colors duration-200
                  ${
                    isActive
                      ? "text-blue-600"
                      : `${item.color} group-hover:text-black`
                  }
                `}
              />
              <span className="truncate">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
