import { useState, useEffect, useCallback } from 'react';
import { 
  companyInfoApi, 
  systemConfigApi, 
  emailSettingsApi, 
  dataManagementApi,
  mockSettingsData 
} from '../services/settingsApi';

// Validation functions
const validateCompanyInfo = (data) => {
  const errors = {};
  
  if (!data.name?.trim()) {
    errors.name = 'Tên công ty là bắt buộc';
  }
  
  if (!data.address?.trim()) {
    errors.address = 'Địa chỉ là bắt buộc';
  }
  
  if (!data.taxCode?.trim()) {
    errors.taxCode = 'Mã số thuế là bắt buộc';
  } else if (!/^\d{10,13}$/.test(data.taxCode.replace(/\s/g, ''))) {
    errors.taxCode = 'Mã số thuế không hợp lệ';
  }
  
  if (!data.phone?.trim()) {
    errors.phone = 'Số điện thoại là bắt buộc';
  } else if (!/^[\d\s\-+()]+$/.test(data.phone)) {
    errors.phone = 'Số điện thoại không hợp lệ';
  }
  
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email không hợp lệ';
  }
  
  if (data.website && !/^https?:\/\/.+/.test(data.website)) {
    errors.website = 'Website phải bắt đầu bằng http:// hoặc https://';
  }
  
  return errors;
};

const validateEmailSettings = (data) => {
  const errors = {};
  
  if (!data.smtpHost?.trim()) {
    errors.smtpHost = 'SMTP Host là bắt buộc';
  }
  
  if (!data.smtpPort || data.smtpPort < 1 || data.smtpPort > 65535) {
    errors.smtpPort = 'SMTP Port phải từ 1-65535';
  }
  
  if (!data.smtpUsername?.trim()) {
    errors.smtpUsername = 'SMTP Username là bắt buộc';
  }
  
  if (!data.fromEmail?.trim()) {
    errors.fromEmail = 'Email gửi là bắt buộc';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.fromEmail)) {
    errors.fromEmail = 'Email gửi không hợp lệ';
  }
  
  if (!data.fromName?.trim()) {
    errors.fromName = 'Tên người gửi là bắt buộc';
  }
  
  return errors;
};

const validateSystemConfig = (data) => {
  const errors = {};
  
  if (!data.language) {
    errors.language = 'Ngôn ngữ là bắt buộc';
  }
  
  if (!data.timezone) {
    errors.timezone = 'Múi giờ là bắt buộc';
  }
  
  if (data.workingDaysPerMonth < 1 || data.workingDaysPerMonth > 31) {
    errors.workingDaysPerMonth = 'Số ngày công/tháng phải từ 1-31';
  }
  
  if (data.workingHoursPerDay < 1 || data.workingHoursPerDay > 24) {
    errors.workingHoursPerDay = 'Số giờ làm/ngày phải từ 1-24';
  }
  
  return errors;
};

// Custom hook for company info form
export const useCompanyInfoForm = () => {
  const [formData, setFormData] = useState(mockSettingsData.companyInfo);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadCompanyInfo = async () => {
      setLoading(true);
      try {
        const data = await companyInfoApi.getCompanyInfo();
        setFormData(data);
      } catch (error) {
        console.error('Failed to load company info:', error);
        // Use mock data as fallback
        setFormData(mockSettingsData.companyInfo);
      } finally {
        setLoading(false);
      }
    };

    loadCompanyInfo();
  }, []);

  // Auto-save with debounce
  useEffect(() => {
    if (!hasChanges) return;

    const timeoutId = setTimeout(async () => {
      await handleSave();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formData, hasChanges]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const handleSave = async () => {
    const validationErrors = validateCompanyInfo(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setSaving(true);
    try {
      await companyInfoApi.updateCompanyInfo(formData);
      setHasChanges(false);
      setErrors({});
      return true;
    } catch (error) {
      console.error('Failed to save company info:', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (file) => {
    setSaving(true);
    try {
      const result = await companyInfoApi.uploadLogo(file);
      setFormData(prev => ({ ...prev, logo: result.logoUrl }));
      setHasChanges(false);
      return true;
    } catch (error) {
      console.error('Failed to upload logo:', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    saving,
    hasChanges,
    handleInputChange,
    handleSave,
    handleLogoUpload
  };
};

// Custom hook for system config form
export const useSystemConfigForm = () => {
  const [formData, setFormData] = useState(mockSettingsData.systemConfig);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadSystemConfig = async () => {
      setLoading(true);
      try {
        const data = await systemConfigApi.getSystemConfig();
        setFormData(data);
      } catch (error) {
        console.error('Failed to load system config:', error);
        setFormData(mockSettingsData.systemConfig);
      } finally {
        setLoading(false);
      }
    };

    loadSystemConfig();
  }, []);

  // Auto-save with debounce
  useEffect(() => {
    if (!hasChanges) return;

    const timeoutId = setTimeout(async () => {
      await handleSave();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formData, hasChanges]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const handleSave = async () => {
    const validationErrors = validateSystemConfig(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setSaving(true);
    try {
      await systemConfigApi.updateSystemConfig(formData);
      setHasChanges(false);
      setErrors({});
      return true;
    } catch (error) {
      console.error('Failed to save system config:', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    saving,
    hasChanges,
    handleInputChange,
    handleSave
  };
};

// Custom hook for email settings form
export const useEmailSettingsForm = () => {
  const [formData, setFormData] = useState(mockSettingsData.emailSettings);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadEmailSettings = async () => {
      setLoading(true);
      try {
        const data = await emailSettingsApi.getEmailSettings();
        setFormData(data);
      } catch (error) {
        console.error('Failed to load email settings:', error);
        setFormData(mockSettingsData.emailSettings);
      } finally {
        setLoading(false);
      }
    };

    loadEmailSettings();
  }, []);

  // Auto-save with debounce
  useEffect(() => {
    if (!hasChanges) return;

    const timeoutId = setTimeout(async () => {
      await handleSave();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formData, hasChanges]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const handleNotificationChange = useCallback((type, enabled) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: enabled
      }
    }));
    setHasChanges(true);
  }, []);

  const handleSave = async () => {
    const validationErrors = validateEmailSettings(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setSaving(true);
    try {
      await emailSettingsApi.updateEmailSettings(formData);
      setHasChanges(false);
      setErrors({});
      return true;
    } catch (error) {
      console.error('Failed to save email settings:', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async () => {
    const validationErrors = validateEmailSettings(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setTesting(true);
    try {
      await emailSettingsApi.testEmailConfig(formData);
      return true;
    } catch (error) {
      console.error('Failed to test email config:', error);
      return false;
    } finally {
      setTesting(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    saving,
    testing,
    hasChanges,
    handleInputChange,
    handleNotificationChange,
    handleSave,
    handleTestEmail
  };
};

// Custom hook for data management
export const useDataManagement = () => {
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [dataStats, setDataStats] = useState(mockSettingsData.dataStats);

  // Load data statistics
  useEffect(() => {
    const loadDataStats = async () => {
      setLoading(true);
      try {
        const stats = await dataManagementApi.getDataStats();
        setDataStats(stats);
      } catch (error) {
        console.error('Failed to load data stats:', error);
        setDataStats(mockSettingsData.dataStats);
      } finally {
        setLoading(false);
      }
    };

    loadDataStats();
  }, []);

  const handleExportData = async (dataType, filters = {}) => {
    setExporting(true);
    try {
      const blob = await dataManagementApi.exportData(dataType, filters);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${dataType}_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Failed to export data:', error);
      return false;
    } finally {
      setExporting(false);
    }
  };

  const handleResetDemoData = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn reset dữ liệu demo? Hành động này không thể hoàn tác.')) {
      return false;
    }

    setResetting(true);
    try {
      await dataManagementApi.resetDemoData();
      return true;
    } catch (error) {
      console.error('Failed to reset demo data:', error);
      return false;
    } finally {
      setResetting(false);
    }
  };

  return {
    dataStats,
    loading,
    exporting,
    resetting,
    handleExportData,
    handleResetDemoData
  };
}; 