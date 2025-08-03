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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/auth/context/useAuth";
import { useState } from "react";

const menuItems = [
  {
    to: "/dashboard",
    icon: BarChart3,
    label: "Dashboard",
    menuKey: "dashboard",
  },
  {
    to: "/employees",
    icon: Users,
    label: "Quản lý Nhân viên",
    menuKey: "employees",
  },
  {
    to: "/attendance",
    icon: Clock,
    label: "Chấm công",
    menuKey: "attendance",
  },
  {
    to: "/leave",
    icon: Calendar,
    label: "Nghỉ phép",
    menuKey: "leave",
  },
  {
    to: "/payroll",
    icon: DollarSign,
    label: "Lương & Phụ cấp",
    menuKey: "payroll",
  },
  {
    to: "/recruitment",
    icon: UserPlus,
    label: "Tuyển dụng",
    menuKey: "recruitment",
  },
  {
    to: "/performance",
    icon: TrendingUp,
    label: "Đánh giá hiệu suất",
    menuKey: "performance",
  },
  {
    to: "/documents",
    icon: FileText,
    label: "Tài liệu nhân sự",
    menuKey: "documents",
  },
  {
    to: "/reports",
    icon: PieChart,
    label: "Báo cáo & Thống kê",
    menuKey: "reports",
  },
  {
    to: "/settings",
    icon: Settings,
    label: "Cài đặt hệ thống",
    menuKey: "settings",
  },
];

const Sidebar = ({ isMobileMenuOpen, onCloseMobileMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, canAccessMenu } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Filter menu items based on user permissions
  const accessibleMenuItems = menuItems.filter((item) =>
    canAccessMenu(item.menuKey)
  );

  const handleMenuClick = (path) => {
    navigate(path);
    // Close mobile menu after navigation
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`fixed lg:static left-0 top-0 lg:top-0 z-30 bg-white border-r border-gray-200 h-screen lg:h-auto lg:min-h-0 flex-shrink-0 transform transition-all duration-300 ease-in-out ${
      isMobileMenuOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
    } ${isCollapsed ? "lg:w-16" : "lg:w-64"}`}>
      
      {/* Toggle Button - Desktop only */}
      <div className="hidden lg:block absolute -right-3 top-6 z-50">
        <button
          onClick={toggleCollapse}
          className="bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto flex-shrink-0 pt-16 lg:pt-0">
        <div className={`space-y-1 ${isCollapsed ? "p-2" : "p-4"}`}>
          {accessibleMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <button
                key={item.to}
                onClick={() => handleMenuClick(item.to)}
                className={`group flex items-center w-full text-sm font-medium rounded-lg transition-all duration-200 min-w-0 ${
                  isCollapsed 
                    ? "justify-center px-2 py-3" 
                    : "px-3 py-2"
                } ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                title={isCollapsed ? item.label : ""}
              >
                <div className="relative flex items-center justify-center">
                  <Icon
                    className={`flex-shrink-0 ${
                      isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
                    } h-5 w-5`}
                  />
                  {isCollapsed && isActive && (
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                  )}
                </div>
                {!isCollapsed && (
                  <span className="flex-1 text-left truncate transition-opacity duration-200 ml-3">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className={`border-t border-gray-200 flex-shrink-0 ${isCollapsed ? "p-2" : "p-4"}`}>
        <div className="text-xs text-gray-500 text-center">
          {!isCollapsed ? (
            <>
              <p className="font-medium truncate">HR Management System</p>
              <p>Version 2.0</p>
            </>
          ) : (
            <div className="flex justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">HR</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
