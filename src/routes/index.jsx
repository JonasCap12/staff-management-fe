import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../modules/auth/context/AuthContext";
import { useAuth } from "../modules/auth/context/useAuth";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../layouts/AuthLayout";
import Dashboard from "../modules/dashboard/pages/Dashboard";
import EmployeeList from "../modules/employee/pages/EmployeeList";
import ModulePlaceholder from "../components/common/ModulePlaceholder";
import AttendanceSystem from "../modules/attendance/pages/AttendanceSystem";
import LeaveManagement from "../modules/leave/pages/LeaveForm";
import {
  Clock,
  Calendar,
  DollarSign,
  UserPlus,
  TrendingUp,
  FileText,
  PieChart,
  Settings,
} from "lucide-react";

// Component con để sử dụng useAuth hook
function AppRoutesInner() {
  const { user, isAuthenticated, login } = useAuth();

  return (
    <Routes>
      {/* Route login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            // Nếu đã login thì chuyển về dashboard
            <Navigate to="/" replace />
          ) : (
            // Nếu chưa login thì hiện trang Login, truyền hàm login
            <LoginPage onLogin={login} />
          )
        }
      />

      {/* Các route chính phải login mới vào được */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <MainLayout user={user} />
          ) : (
            // Nếu chưa login thì chuyển về login
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route
          path="attendance"
          element={<AttendanceSystem title="Quản lý Chấm công" icon={Clock} />}
        />
        <Route
          path="leave"
          element={
            <LeaveManagement title="Quản lý Nghỉ phép" icon={Calendar} />
          }
        />
        <Route
          path="payroll"
          element={
            <ModulePlaceholder title="Lương & Phụ cấp" icon={DollarSign} />
          }
        />
        <Route
          path="recruitment"
          element={<ModulePlaceholder title="Tuyển dụng" icon={UserPlus} />}
        />
        <Route
          path="performance"
          element={
            <ModulePlaceholder title="Đánh giá Hiệu suất" icon={TrendingUp} />
          }
        />
        <Route
          path="documents"
          element={
            <ModulePlaceholder title="Tài liệu Nhân sự" icon={FileText} />
          }
        />
        <Route
          path="reports"
          element={
            <ModulePlaceholder title="Báo cáo & Thống kê" icon={PieChart} />
          }
        />
        <Route
          path="settings"
          element={
            <ModulePlaceholder title="Cài đặt Hệ thống" icon={Settings} />
          }
        />
      </Route>

      {/* Nếu truy cập URL không hợp lệ */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}

// Component chính với AuthProvider wrapper
export default function AppRoutes() {
  return (
    <AuthProvider>
      <AppRoutesInner />
    </AuthProvider>
  );
}
