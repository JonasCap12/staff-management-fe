import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../modules/dashboard/pages/Dashboard';
import EmployeeList from '../modules/employee/pages/EmployeeList';
import ModulePlaceholder from '../components/common/ModulePlaceholder';
import { Clock, Calendar, DollarSign, UserPlus, TrendingUp, FileText, PieChart, Settings } from 'lucide-react';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="attendance" element={<ModulePlaceholder title="Quản lý Chấm công" icon={Clock} />} />
        <Route path="leave" element={<ModulePlaceholder title="Quản lý Nghỉ phép" icon={Calendar} />} />
        <Route path="payroll" element={<ModulePlaceholder title="Lương & Phụ cấp" icon={DollarSign} />} />
        <Route path="recruitment" element={<ModulePlaceholder title="Tuyển dụng" icon={UserPlus} />} />
        <Route path="performance" element={<ModulePlaceholder title="Đánh giá Hiệu suất" icon={TrendingUp} />} />
        <Route path="documents" element={<ModulePlaceholder title="Tài liệu Nhân sự" icon={FileText} />} />
        <Route path="reports" element={<ModulePlaceholder title="Báo cáo & Thống kê" icon={PieChart} />} />
        <Route path="settings" element={<ModulePlaceholder title="Cài đặt Hệ thống" icon={Settings} />} />
      </Route>
    </Routes>
  );
}