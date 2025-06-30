import React from 'react';
import { BarChart3, TrendingUp, Calendar, Users, DollarSign, Clock, RefreshCw, Download } from 'lucide-react';
import useReportData from '../hooks/useReportData';

// Import components
import OverviewStats from '../components/OverviewStats';
import ReportFilters from '../components/ReportFilters';
import DepartmentChart from '../components/DepartmentChart';
import DepartmentPieChart from '../components/DepartmentPieChart';
import SalaryLineChart from '../components/SalaryLineChart';
import LeaveStatCard from '../components/LeaveStatCard';
import TopPerformerTable from '../components/TopPerformerTable';
import TurnoverChart from '../components/TurnoverChart';
import EventSummaryTable from '../components/EventSummaryTable';

const ReportDashboard = () => {
  const {
    // Data
    stats,
    departmentChartData,
    departmentPieData,
    salaryChartData,
    topPerformers,
    leaveStat,
    turnoverChartData,
    events,
    
    // Filters
    selectedMonth,
    selectedDepartment,
    departments,
    months,
    
    // State
    loading,
    error,
    
    // Handlers
    handleMonthChange,
    handleDepartmentChange,
    resetFilters,
    exportReportData,
    refreshData
  } = useReportData();

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Có lỗi xảy ra
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                📊 Báo cáo & Thống kê Nhân sự
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Tổng quan nhân sự, lương, hiệu suất, nghỉ phép
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Cập nhật: {new Date().toLocaleString('vi-VN')}</span>
              </div>
              <button
                onClick={refreshData}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Làm mới
              </button>
              <button
                onClick={exportReportData}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Download className="w-4 h-4" />
                Xuất báo cáo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Filters */}
          <ReportFilters
            selectedMonth={selectedMonth}
            selectedDepartment={selectedDepartment}
            departments={departments}
            months={months}
            onMonthChange={handleMonthChange}
            onDepartmentChange={handleDepartmentChange}
            onResetFilters={resetFilters}
            onExport={exportReportData}
            onRefresh={refreshData}
            loading={loading}
          />

          {/* Overview Stats */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Thống kê tổng quan
            </h2>
            <OverviewStats stats={stats} loading={loading} />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Department Chart */}
            <DepartmentChart 
              data={departmentChartData}
              loading={loading}
            />

            {/* Department Pie Chart */}
            <DepartmentPieChart 
              data={departmentPieData}
              loading={loading}
            />
          </div>

          {/* Second Row Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Salary Chart */}
            <SalaryLineChart 
              data={salaryChartData}
              loading={loading}
            />

            {/* Turnover Chart */}
            <TurnoverChart 
              data={turnoverChartData}
              loading={loading}
            />
          </div>

          {/* Third Row Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Leave Stats */}
            <LeaveStatCard 
              leaveStat={leaveStat}
              loading={loading}
            />

            {/* Event Summary */}
            <EventSummaryTable 
              events={events}
              loading={loading}
            />
          </div>

          {/* Top Performers */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Top 5 Nhân viên hiệu suất cao nhất
            </h2>
            <TopPerformerTable 
              performers={topPerformers}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center shadow-2xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Đang tải dữ liệu...</p>
            <p className="text-sm text-gray-500 mt-2">Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDashboard; 