import {
  BarChart3, Users, Clock, Calendar, DollarSign, UserPlus, TrendingUp,
  FileText, PieChart, Settings
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { to: '/dashboard', icon: BarChart3, label: 'Dashboard', color: 'text-blue-500' },
  { to: '/employees', icon: Users, label: 'Quản lý Nhân viên', color: 'text-green-500' },
  { to: '/attendance', icon: Clock, label: 'Chấm công', color: 'text-purple-500' },
  { to: '/leave', icon: Calendar, label: 'Nghỉ phép', color: 'text-orange-500' },
  { to: '/payroll', icon: DollarSign, label: 'Lương & Phụ cấp', color: 'text-red-500' },
  { to: '/recruitment', icon: UserPlus, label: 'Tuyển dụng', color: 'text-indigo-500' },
  { to: '/performance', icon: TrendingUp, label: 'Đánh giá hiệu suất', color: 'text-pink-500' },
  { to: '/documents', icon: FileText, label: 'Tài liệu nhân sự', color: 'text-yellow-500' },
  { to: '/reports', icon: PieChart, label: 'Báo cáo & Thống kê', color: 'text-cyan-500' },
  { to: '/settings', icon: Settings, label: 'Cài đặt hệ thống', color: 'text-gray-500' }
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-md min-h-screen">
      <div className="p-6 text-xl font-bold text-blue-600 tracking-wide">HR System</div>
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.to);

          return (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              className={`group flex items-center w-full px-5 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}
              `}
            >
              <Icon
                className={`mr-3 h-5 w-5 transition-colors duration-200
                  ${isActive ? 'text-blue-600' : `${item.color} group-hover:text-black`}
                `}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
