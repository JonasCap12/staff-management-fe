import { Users, Activity, Calendar, DollarSign, UserPlus, FileText } from 'lucide-react';
import { useState } from 'react';

const Dashboard = () => {
  const [stats] = useState({
    totalEmployees: 156,
    activeEmployees: 142,
    onLeave: 8,
    newHires: 6,
    totalSalary: 2840000000,
    pendingRequests: 12
  });

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng nhân viên</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang làm việc</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeEmployees}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang nghỉ phép</p>
              <p className="text-2xl font-bold text-gray-900">{stats.onLeave}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng chi phí lương</p>
              <p className="text-2xl font-bold text-gray-900">{(stats.totalSalary / 1000000).toFixed(0)}M</p>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <UserPlus className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Thêm nhân viên</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Duyệt nghỉ phép</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <DollarSign className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Xuất bảng lương</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Tạo báo cáo</p>
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Yêu cầu chờ duyệt</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Nghỉ phép: Trần Văn A</p>
                <p className="text-sm text-gray-600">3 ngày từ 25/05 - 27/05</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm">Duyệt</button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm">Từ chối</button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Tăng lương: Nguyễn Thị B</p>
                <p className="text-sm text-gray-600">Từ 12M lên 15M</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm">Duyệt</button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm">Từ chối</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;