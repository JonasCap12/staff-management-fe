import React from 'react';
import { 
  Mail, 
  Server, 
  User, 
  Lock, 
  Send, 
  Save,
  AlertCircle,
  CheckCircle2,
  TestTube,
  Bell,
  BellOff
} from 'lucide-react';
import { EMAIL_NOTIFICATION_TYPES } from '../../../constants/settingOptions';
import { useEmailSettingsForm } from '../../../hooks/useSettingsForm';

const EmailSettingsForm = () => {
  const {
    formData,
    errors,
    saving,
    testing,
    hasChanges,
    handleInputChange,
    handleNotificationChange,
    handleSave,
    handleTestEmail
  } = useEmailSettingsForm();

  const handleManualSave = async () => {
    const success = await handleSave();
    if (success) {
      alert('Cài đặt email đã được lưu thành công!');
    } else {
      alert('Có lỗi xảy ra khi lưu cài đặt email');
    }
  };

  const handleTestEmailConfig = async () => {
    const success = await handleTestEmail();
    if (success) {
      alert('Email test đã được gửi thành công! Vui lòng kiểm tra hộp thư.');
    } else {
      alert('Có lỗi xảy ra khi gửi email test. Vui lòng kiểm tra cấu hình.');
    }
  };



  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Cài đặt email hệ thống
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Cấu hình SMTP và thông báo email tự động
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
            onClick={handleTestEmailConfig}
            disabled={testing || !formData.smtpHost}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {testing ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <TestTube className="w-4 h-4" />
            )}
            Test Email
          </button>
          
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
        {/* SMTP Configuration */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-600" />
              Cấu hình SMTP
            </h3>
            
            <div className="space-y-6">
              {/* SMTP Host */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  SMTP Host *
                </label>
                <input
                  type="text"
                  value={formData.smtpHost || ''}
                  onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.smtpHost ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="smtp.gmail.com"
                />
                {errors.smtpHost && (
                  <p className="mt-2 text-sm text-red-600">{errors.smtpHost}</p>
                )}
              </div>

              {/* SMTP Port */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  SMTP Port *
                </label>
                <input
                  type="number"
                  min="1"
                  max="65535"
                  value={formData.smtpPort || ''}
                  onChange={(e) => handleInputChange('smtpPort', parseInt(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.smtpPort ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="587"
                />
                {errors.smtpPort && (
                  <p className="mt-2 text-sm text-red-600">{errors.smtpPort}</p>
                )}
              </div>

              {/* SMTP Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  SMTP Username *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.smtpUsername || ''}
                    onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.smtpUsername ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your-email@gmail.com"
                  />
                </div>
                {errors.smtpUsername && (
                  <p className="mt-2 text-sm text-red-600">{errors.smtpUsername}</p>
                )}
              </div>

              {/* SMTP Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  SMTP Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={formData.smtpPassword || ''}
                    onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Để trống nếu không thay đổi mật khẩu
                </p>
              </div>

              {/* Security */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Sử dụng SSL/TLS
                  </label>
                  <p className="text-xs text-gray-500">
                    Kết nối bảo mật cho SMTP
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.useSSL !== false}
                    onChange={(e) => handleInputChange('useSSL', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="space-y-8">
          {/* From Settings */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-600" />
              Thông tin người gửi
            </h3>
            
            <div className="space-y-6">
              {/* From Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Email gửi mặc định *
                </label>
                <input
                  type="email"
                  value={formData.fromEmail || ''}
                  onChange={(e) => handleInputChange('fromEmail', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.fromEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="noreply@company.com"
                />
                {errors.fromEmail && (
                  <p className="mt-2 text-sm text-red-600">{errors.fromEmail}</p>
                )}
              </div>

              {/* From Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tên người gửi *
                </label>
                <input
                  type="text"
                  value={formData.fromName || ''}
                  onChange={(e) => handleInputChange('fromName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.fromName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ABC Company"
                />
                {errors.fromName && (
                  <p className="mt-2 text-sm text-red-600">{errors.fromName}</p>
                )}
              </div>

              {/* Reply To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Email trả lời
                </label>
                <input
                  type="email"
                  value={formData.replyTo || ''}
                  onChange={(e) => handleInputChange('replyTo', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="support@company.com"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Email nhận trả lời từ người dùng
                </p>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Cài đặt thông báo
            </h3>
            
            <div className="space-y-3">
              {EMAIL_NOTIFICATION_TYPES.map((notification) => (
                <div key={notification.id} className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {notification.label}
                    </label>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifications?.[notification.id] !== false}
                      onChange={(e) => handleNotificationChange(notification.id, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SMTP Configuration Help */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Server className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Hướng dẫn cấu hình SMTP</h4>
            <div className="text-sm text-blue-700 mt-1 space-y-1">
              <p><strong>Gmail:</strong> smtp.gmail.com:587 (SSL), smtp.gmail.com:465 (TLS)</p>
              <p><strong>Outlook:</strong> smtp-mail.outlook.com:587</p>
              <p><strong>Yahoo:</strong> smtp.mail.yahoo.com:587</p>
              <p className="text-xs mt-2">
                Lưu ý: Với Gmail, bạn cần bật "Ứng dụng kém bảo mật" hoặc sử dụng App Password
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-save notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-green-900">Tự động lưu</h4>
            <p className="text-sm text-green-700 mt-1">
              Cài đặt email sẽ được tự động lưu sau 2 giây khi bạn thay đổi. 
              Sử dụng nút "Test Email" để kiểm tra cấu hình trước khi sử dụng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSettingsForm; 