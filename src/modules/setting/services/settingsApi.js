import axios from '../../../services/axios';

// Base URL for settings API
const SETTINGS_BASE_URL = '/api/settings';

// Company Information API
export const companyInfoApi = {
  // Get company information
  getCompanyInfo: async () => {
    try {
      const response = await axios.get(`${SETTINGS_BASE_URL}/company`);
      return response.data;
    } catch (error) {
      console.error('Error fetching company info:', error);
      throw new Error('Không thể tải thông tin công ty');
    }
  },

  // Update company information
  updateCompanyInfo: async (data) => {
    try {
      const response = await axios.put(`${SETTINGS_BASE_URL}/company`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating company info:', error);
      throw new Error('Không thể cập nhật thông tin công ty');
    }
  },

  // Upload company logo
  uploadLogo: async (file) => {
    try {
      const formData = new FormData();
      formData.append('logo', file);
      
      const response = await axios.post(`${SETTINGS_BASE_URL}/company/logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw new Error('Không thể tải lên logo');
    }
  }
};

// Role and Permission API
export const rolePermissionApi = {
  // Get all roles
  getRoles: async () => {
    try {
      const response = await axios.get(`${SETTINGS_BASE_URL}/roles`);
      return response.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw new Error('Không thể tải danh sách vai trò');
    }
  },

  // Create new role
  createRole: async (roleData) => {
    try {
      const response = await axios.post(`${SETTINGS_BASE_URL}/roles`, roleData);
      return response.data;
    } catch (error) {
      console.error('Error creating role:', error);
      throw new Error('Không thể tạo vai trò mới');
    }
  },

  // Update role
  updateRole: async (roleId, roleData) => {
    try {
      const response = await axios.put(`${SETTINGS_BASE_URL}/roles/${roleId}`, roleData);
      return response.data;
    } catch (error) {
      console.error('Error updating role:', error);
      throw new Error('Không thể cập nhật vai trò');
    }
  },

  // Delete role
  deleteRole: async (roleId) => {
    try {
      const response = await axios.delete(`${SETTINGS_BASE_URL}/roles/${roleId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting role:', error);
      throw new Error('Không thể xóa vai trò');
    }
  },

  // Get role permissions
  getRolePermissions: async (roleId) => {
    try {
      const response = await axios.get(`${SETTINGS_BASE_URL}/roles/${roleId}/permissions`);
      return response.data;
    } catch (error) {
      console.error('Error fetching role permissions:', error);
      throw new Error('Không thể tải quyền của vai trò');
    }
  },

  // Update role permissions
  updateRolePermissions: async (roleId, permissions) => {
    try {
      const response = await axios.put(`${SETTINGS_BASE_URL}/roles/${roleId}/permissions`, {
        permissions
      });
      return response.data;
    } catch (error) {
      console.error('Error updating role permissions:', error);
      throw new Error('Không thể cập nhật quyền của vai trò');
    }
  }
};

// System Configuration API
export const systemConfigApi = {
  // Get system configuration
  getSystemConfig: async () => {
    try {
      const response = await axios.get(`${SETTINGS_BASE_URL}/system`);
      return response.data;
    } catch (error) {
      console.error('Error fetching system config:', error);
      throw new Error('Không thể tải cấu hình hệ thống');
    }
  },

  // Update system configuration
  updateSystemConfig: async (config) => {
    try {
      const response = await axios.put(`${SETTINGS_BASE_URL}/system`, config);
      return response.data;
    } catch (error) {
      console.error('Error updating system config:', error);
      throw new Error('Không thể cập nhật cấu hình hệ thống');
    }
  }
};

// Email Settings API
export const emailSettingsApi = {
  // Get email settings
  getEmailSettings: async () => {
    try {
      const response = await axios.get(`${SETTINGS_BASE_URL}/email`);
      return response.data;
    } catch (error) {
      console.error('Error fetching email settings:', error);
      throw new Error('Không thể tải cài đặt email');
    }
  },

  // Update email settings
  updateEmailSettings: async (settings) => {
    try {
      const response = await axios.put(`${SETTINGS_BASE_URL}/email`, settings);
      return response.data;
    } catch (error) {
      console.error('Error updating email settings:', error);
      throw new Error('Không thể cập nhật cài đặt email');
    }
  },

  // Test email configuration
  testEmailConfig: async (config) => {
    try {
      const response = await axios.post(`${SETTINGS_BASE_URL}/email/test`, config);
      return response.data;
    } catch (error) {
      console.error('Error testing email config:', error);
      throw new Error('Không thể kiểm tra cấu hình email');
    }
  }
};

// Data Management API
export const dataManagementApi = {
  // Export data
  exportData: async (dataType, filters = {}) => {
    try {
      const response = await axios.post(`${SETTINGS_BASE_URL}/data/export`, {
        dataType,
        filters
      }, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting data:', error);
      throw new Error('Không thể xuất dữ liệu');
    }
  },

  // Get export history
  getExportHistory: async () => {
    try {
      const response = await axios.get(`${SETTINGS_BASE_URL}/data/export/history`);
      return response.data;
    } catch (error) {
      console.error('Error fetching export history:', error);
      throw new Error('Không thể tải lịch sử xuất dữ liệu');
    }
  },

  // Reset demo data
  resetDemoData: async () => {
    try {
      const response = await axios.post(`${SETTINGS_BASE_URL}/data/reset-demo`);
      return response.data;
    } catch (error) {
      console.error('Error resetting demo data:', error);
      throw new Error('Không thể reset dữ liệu demo');
    }
  },

  // Get data statistics
  getDataStats: async () => {
    try {
      const response = await axios.get(`${SETTINGS_BASE_URL}/data/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data stats:', error);
      throw new Error('Không thể tải thống kê dữ liệu');
    }
  }
};

// Backup and Restore API
export const backupApi = {
  // Create backup
  createBackup: async () => {
    try {
      const response = await axios.post(`${SETTINGS_BASE_URL}/backup/create`);
      return response.data;
    } catch (error) {
      console.error('Error creating backup:', error);
      throw new Error('Không thể tạo backup');
    }
  },

  // Get backup list
  getBackupList: async () => {
    try {
      const response = await axios.get(`${SETTINGS_BASE_URL}/backup/list`);
      return response.data;
    } catch (error) {
      console.error('Error fetching backup list:', error);
      throw new Error('Không thể tải danh sách backup');
    }
  },

  // Download backup
  downloadBackup: async (backupId) => {
    try {
      const response = await axios.get(`${SETTINGS_BASE_URL}/backup/${backupId}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error downloading backup:', error);
      throw new Error('Không thể tải xuống backup');
    }
  },

  // Restore from backup
  restoreBackup: async (backupId) => {
    try {
      const response = await axios.post(`${SETTINGS_BASE_URL}/backup/${backupId}/restore`);
      return response.data;
    } catch (error) {
      console.error('Error restoring backup:', error);
      throw new Error('Không thể khôi phục từ backup');
    }
  }
};

// Mock data for development
export const mockSettingsData = {
  companyInfo: {
    name: 'Công ty TNHH ABC',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    taxCode: '0123456789',
    phone: '028-1234-5678',
    email: 'info@abc.com',
    website: 'https://abc.com',
    logo: null
  },
  systemConfig: {
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    weekStart: 1,
    workingDaysPerMonth: 22,
    workingHoursPerDay: 8,
    salaryCalculationMethod: 'monthly'
  },
  emailSettings: {
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: 'noreply@abc.com',
    smtpPassword: '',
    fromEmail: 'noreply@abc.com',
    fromName: 'ABC Company',
    notifications: {
      welcome_email: true,
      attendance_reminder: true,
      leave_approval: true,
      salary_notification: true,
      performance_review: true,
      system_alert: true
    }
  },
  dataStats: {
    totalEmployees: 150,
    totalAttendance: 3240,
    totalSalary: 4500000000,
    totalLeave: 89,
    totalDocuments: 45
  }
}; 