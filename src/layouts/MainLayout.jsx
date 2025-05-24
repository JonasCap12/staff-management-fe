import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3, Users, Clock, Calendar, DollarSign, UserPlus, TrendingUp, FileText, PieChart, Settings, Shield, Bell
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { to: '/dashboard', icon: BarChart3, label: 'Dashboard', color: 'text-blue-600' },
  { to: '/employees', icon: Users, label: 'Quản lý Nhân viên', color: 'text-green-600' },
  { to: '/attendance', icon: Clock, label: 'Chấm công', color: 'text-purple-600' },
  { to: '/leave', icon: Calendar, label: 'Nghỉ phép', color: 'text-orange-600' },
  { to: '/payroll', icon: DollarSign, label: 'Lương & Phụ cấp', color: 'text-red-600' },
  { to: '/recruitment', icon: UserPlus, label: 'Tuyển dụng', color: 'text-indigo-600' },
  { to: '/performance', icon: TrendingUp, label: 'Đánh giá hiệu suất', color: 'text-pink-600' },
  { to: '/documents', icon: FileText, label: 'Tài liệu nhân sự', color: 'text-yellow-600' },
  { to: '/reports', icon: PieChart, label: 'Báo cáo & Thống kê', color: 'text-cyan-600' },
  { to: '/settings', icon: Settings, label: 'Cài đặt hệ thống', color: 'text-gray-600' }
];

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">HR Management System</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Thông báo</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Yêu cầu nghỉ phép mới</p>
                        <p className="text-xs text-gray-600">Trần Văn A yêu cầu nghỉ 3 ngày</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Nhân viên mới</p>
                        <p className="text-xs text-gray-600">Nguyễn Thị C đã được thêm vào hệ thống</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">AD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-600">System Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.to);
              return (
                <button
                  key={item.to}
                  onClick={() => navigate(item.to)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : item.color}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;