import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../modules/auth/context/AuthContext";
import { useAuth } from "../modules/auth/context/useAuth";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../layouts/AuthLayout";
import Dashboard from "../modules/dashboard/pages/Dashboard";
import EmployeeManagement from "../modules/employee/pages/EmployeeManagement";
import ModulePlaceholder from "../components/common/ModulePlaceholder";
import AttendanceSystem from "../modules/attendance/pages/AttendanceSystem";
import LeaveManagement from "../modules/leave/pages/LeaveManagement";
import SalaryManagement from "../modules/salary/pages/SalaryManagement";
import ReportManagement from "../modules/report/pages/ReportManagement";
import RecruitmentPage from "../modules/recruitment/pages/RecruitmentPage";
import PerformanceEvaluationPage from "../modules/performance/pages/PerformanceEvaluationPage";
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

function AppRoutesInner() {
  const { user, isAuthenticated, login } = useAuth();

  return (
    <Routes>
      {/* Route login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage onLogin={login} />
          )
        }
      />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <MainLayout user={user} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<EmployeeManagement />} />
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
            <SalaryManagement title="Lương & Phụ cấp" icon={DollarSign} />
          }
        />
        <Route
          path="recruitment"
          element={<RecruitmentPage title="Tuyển dụng" icon={UserPlus} />}
        />
        <Route
          path="performance"
          element={
            <PerformanceEvaluationPage
              title="Đánh giá Hiệu suất"
              icon={TrendingUp}
            />
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
            <ReportManagement title="Báo cáo & Thống kê" icon={PieChart} />
          }
        />
        <Route
          path="settings"
          element={
            <ModulePlaceholder title="Cài đặt Hệ thống" icon={Settings} />
          }
        />
      </Route>

      {/* Fallback route */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}

export default function AppRoutes() {
  return (
    <AuthProvider>
      <AppRoutesInner />
    </AuthProvider>
  );
}
