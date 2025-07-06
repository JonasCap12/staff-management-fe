import React from 'react';
import { 
  Settings, 
  Globe, 
  Clock, 
  Calendar, 
  DollarSign, 
  Save,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { 
  LANGUAGE_OPTIONS, 
  TIMEZONE_OPTIONS, 
  WEEK_START_OPTIONS 
} from '../../../constants/settingOptions';
import { useSystemConfigForm } from '../../../hooks/useSettingsForm';

const SystemConfigForm = () => {
  const {
    formData,
    errors,
    loading,
    saving,
    hasChanges,
    handleInputChange,
    handleSave
  } = useSystemConfigForm();

  const handleManualSave = async () => {
    const success = await handleSave();
    if (success) {
      alert('Cấu hình hệ thống đã được lưu thành công!');
    } else {
      alert('Có lỗi xảy ra khi lưu cấu hình');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Đang tải cấu hình hệ thống...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            Thiết lập hệ thống
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Cấu hình ngôn ngữ, múi giờ và các thiết lập cơ bản
          </p>
        </div>
        
        {/* Save indicator */}
        <div className="flex items-center gap-3">
          {hasChanges && (
            <div className="flex items-center gap-2 text-amber-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Có thay đổi chưa lưu</span>
            </div>
          )}
          
          {saving && (
            <div className="flex items-center gap-2 text-blue-600 text-sm">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Đang lưu...</span>
            </div>
          )}
          
          {!hasChanges && !saving && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã lưu</span>
            </div>
          )}
          
          <button
            onClick={handleManualSave}
            disabled={saving || !hasChanges}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-4 h-4" />
            Lưu thủ công
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Language and Timezone Settings */}
        <div className="space-y-8">
          {/* Language Settings */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Ngôn ngữ và múi giờ
            </h3>
            
            <div className="space-y-6">
              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ngôn ngữ giao diện *
                </label>
                <select
                  value={formData.language || ''}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.language ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Chọn ngôn ngữ</option>
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.flag} {lang.label}
                    </option>
                  ))}
                </select>
                {errors.language && (
                  <p className="mt-2 text-sm text-red-600">{errors.language}</p>
                )}
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Múi giờ mặc định *
                </label>
                <select
                  value={formData.timezone || ''}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.timezone ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Chọn múi giờ</option>
                  {TIMEZONE_OPTIONS.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
                {errors.timezone && (
                  <p className="mt-2 text-sm text-red-600">{errors.timezone}</p>
                )}
              </div>

              {/* Week Start */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ngày bắt đầu tuần
                </label>
                <select
                  value={formData.weekStart || 1}
                  onChange={(e) => handleInputChange('weekStart', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {WEEK_START_OPTIONS.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-gray-500">
                  Ngày này sẽ được sử dụng làm ngày đầu tiên của tuần trong lịch
                </p>
              </div>
            </div>
          </div>

          {/* Working Schedule */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Lịch làm việc
            </h3>
            
            <div className="space-y-6">
              {/* Working Days per Month */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Số ngày công/tháng *
                </label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={formData.workingDaysPerMonth || ''}
                  onChange={(e) => handleInputChange('workingDaysPerMonth', parseInt(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.workingDaysPerMonth ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="22"
                />
                {errors.workingDaysPerMonth && (
                  <p className="mt-2 text-sm text-red-600">{errors.workingDaysPerMonth}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Số ngày làm việc tiêu chuẩn trong một tháng
                </p>
              </div>

              {/* Working Hours per Day */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Số giờ làm/ngày *
                </label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  step="0.5"
                  value={formData.workingHoursPerDay || ''}
                  onChange={(e) => handleInputChange('workingHoursPerDay', parseFloat(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.workingHoursPerDay ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="8"
                />
                {errors.workingHoursPerDay && (
                  <p className="mt-2 text-sm text-red-600">{errors.workingHoursPerDay}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Số giờ làm việc tiêu chuẩn trong một ngày
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Salary and Calculation Settings */}
        <div className="space-y-8">
          {/* Salary Calculation */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Cài đặt tính lương
            </h3>
            
            <div className="space-y-6">
              {/* Salary Calculation Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Phương thức tính lương
                </label>
                <select
                  value={formData.salaryCalculationMethod || 'monthly'}
                  onChange={(e) => handleInputChange('salaryCalculationMethod', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="monthly">Theo tháng</option>
                  <option value="hourly">Theo giờ</option>
                  <option value="daily">Theo ngày</option>
                </select>
                <p className="mt-2 text-xs text-gray-500">
                  Phương thức tính lương cơ bản cho nhân viên
                </p>
              </div>

              {/* Overtime Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Hệ số làm thêm giờ
                </label>
                <input
                  type="number"
                  min="1"
                  max="3"
                  step="0.1"
                  value={formData.overtimeRate || '1.5'}
                  onChange={(e) => handleInputChange('overtimeRate', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1.5"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Hệ số nhân lương cho giờ làm thêm (mặc định: 1.5)
                </p>
              </div>

              {/* Holiday Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Hệ số ngày lễ
                </label>
                <input
                  type="number"
                  min="1"
                  max="3"
                  step="0.1"
                  value={formData.holidayRate || '2.0'}
                  onChange={(e) => handleInputChange('holidayRate', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="2.0"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Hệ số nhân lương cho ngày lễ (mặc định: 2.0)
                </p>
              </div>
            </div>
          </div>

          {/* System Preferences */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              Tùy chọn hệ thống
            </h3>
            
            <div className="space-y-6">
              {/* Auto Save */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Tự động lưu
                  </label>
                  <p className="text-xs text-gray-500">
                    Tự động lưu thay đổi sau 2 giây
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.autoSave !== false}
                    onChange={(e) => handleInputChange('autoSave', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Thông báo email
                  </label>
                  <p className="text-xs text-gray-500">
                    Gửi thông báo qua email khi có thay đổi
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.emailNotifications !== false}
                    onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Debug Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Chế độ debug
                  </label>
                  <p className="text-xs text-gray-500">
                    Hiển thị thông tin debug (chỉ dành cho admin)
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.debugMode === true}
                    onChange={(e) => handleInputChange('debugMode', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-save notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Thông tin cấu hình</h4>
            <ul className="text-sm text-blue-700 mt-1 space-y-1">
              <li>• Thay đổi ngôn ngữ sẽ áp dụng ngay lập tức</li>
              <li>• Cài đặt múi giờ ảnh hưởng đến tất cả báo cáo và lịch</li>
              <li>• Cấu hình lương sẽ được áp dụng cho tính toán mới</li>
              <li>• Thông tin sẽ được tự động lưu sau 2 giây</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfigForm; 