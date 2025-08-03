import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  Shield, 
  Globe, 
  Mail, 
  Database,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../auth/context/useAuth';
import CompanyInfoForm from '../components/CompanyInfoForm';
import RolePermissionMatrix from '../components/RolePermissionMatrix';
import SystemConfigForm from '../components/SystemConfigForm';
import EmailSettingsForm from '../components/EmailSettingsForm';
import DataManagementCard from '../components/DataManagementCard';

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('company');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Check if user has permission to access settings
  const canAccessSettings = user?.role === 'admin' || user?.role === 'hr';
  const canManageRoles = user?.role === 'admin';
  const canManageData = user?.role === 'admin';

  const tabs = [
    {
      id: 'company',
      label: 'Thông tin công ty',
      icon: Building2,
      component: CompanyInfoForm,
      accessible: canAccessSettings
    },
    {
      id: 'permissions',
      label: 'Phân quyền',
      icon: Shield,
      component: RolePermissionMatrix,
      accessible: canManageRoles
    },
    {
      id: 'system',
      label: 'Thiết lập hệ thống',
      icon: Globe,
      component: SystemConfigForm,
      accessible: canAccessSettings
    },
    {
      id: 'email',
      label: 'Cài đặt email',
      icon: Mail,
      component: EmailSettingsForm,
      accessible: canAccessSettings
    },
    {
      id: 'data',
      label: 'Quản lý dữ liệu',
      icon: Database,
      component: DataManagementCard,
      accessible: canManageData
    }
  ];

  const accessibleTabs = tabs.filter(tab => tab.accessible);

  // Handle tab change with unsaved changes warning
  const handleTabChange = (tabId) => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        'Bạn có thay đổi chưa lưu. Bạn có chắc chắn muốn chuyển tab?'
      );
      if (!confirmed) return;
    }
    setActiveTab(tabId);
    setHasUnsavedChanges(false);
  };

  // If user doesn't have permission, show access denied
  if (!canAccessSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Không có quyền truy cập
            </h1>
            <p className="text-gray-600 mb-4">
              Bạn không có quyền truy cập vào trang Cài đặt. 
              Vui lòng liên hệ quản trị viên để được cấp quyền.
            </p>
            <div className="text-sm text-gray-500">
              Vai trò hiện tại: <span className="font-medium">{user?.role || 'Không xác định'}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ActiveComponent = accessibleTabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                <Settings className="w-8 h-8 text-blue-600" />
                Cài đặt hệ thống
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Quản lý cấu hình và thiết lập hệ thống
              </p>
            </div>
            
            {/* User info */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Người dùng: {user?.name || 'Không xác định'}</span>
              <span>•</span>
              <span>Vai trò: {user?.role || 'Không xác định'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 top-24">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Danh mục</h2>
              </div>
              
              <nav className="p-2">
                <ul className="space-y-1">
                  {accessibleTabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <li key={tab.id}>
                        <button
                          onClick={() => handleTabChange(tab.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                            activeTab === tab.id
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span className="text-sm font-medium">{tab.label}</span>
                          {activeTab === tab.id && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Quick Actions */}
              <div className="p-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Thao tác nhanh</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => window.open('/api/docs', '_blank')}
                    className="w-full text-left text-sm text-blue-600 hover:text-blue-700 py-1"
                  >
                    📖 Xem tài liệu API
                  </button>
                  <button
                    onClick={() => window.open('/system/logs', '_blank')}
                    className="w-full text-left text-sm text-blue-600 hover:text-blue-700 py-1"
                  >
                    📋 Xem log hệ thống
                  </button>
                  <button
                    onClick={() => window.open('/system/health', '_blank')}
                    className="w-full text-left text-sm text-blue-600 hover:text-blue-700 py-1"
                  >
                    💚 Kiểm tra sức khỏe hệ thống
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <span>Cài đặt</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">
                {accessibleTabs.find(tab => tab.id === activeTab)?.label}
              </span>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {ActiveComponent && <ActiveComponent />}
            </div>

            {/* Footer Info */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>Phiên bản: 1.0.0</span>
                  <span>•</span>
                  <span>Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Hệ thống hoạt động bình thường</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">Có thay đổi chưa lưu</span>
        </div>
      )}
    </div>
  );
};

export default SettingsPage; 