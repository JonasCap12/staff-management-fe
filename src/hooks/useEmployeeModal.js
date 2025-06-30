import { useState, useEffect } from 'react';
import { 
  DEPARTMENTS, 
  POSITIONS, 
  VALIDATION_MESSAGES, 
  MODAL_TITLES, 
  DEFAULT_FORM_DATA, 
  DEFAULT_ACCOUNT_DATA 
} from '../constants/employeeConstants';

export function useEmployeeModal(employee, mode) {
  // Form states
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [accountData, setAccountData] = useState(DEFAULT_ACCOUNT_DATA);

  // UI states
  const [errors, setErrors] = useState({});
  const [accountErrors, setAccountErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  // Computed values
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isAdd = mode === "add";

  // Reset form when modal opens/closes or employee changes
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        position: employee.position || '',
        department: employee.department || '',
        salary: employee.salary || '',
        joinDate: employee.joinDate || new Date().toISOString().split('T')[0],
        rating: employee.rating || 5,
        email: employee.email || '',
        phone: employee.phone || '',
        status: employee.status || 'active'
      });
    } else {
      setFormData(DEFAULT_FORM_DATA);
    }
    setErrors({});
    setAccountErrors({});
    setShowAccountModal(false);
  }, [employee]);

  // Input handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAccountInputChange = (field, value) => {
    setAccountData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (accountErrors[field]) {
      setAccountErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validation functions
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = VALIDATION_MESSAGES.REQUIRED_NAME;
    }

    if (!formData.position) {
      newErrors.position = VALIDATION_MESSAGES.REQUIRED_POSITION;
    }

    if (!formData.department) {
      newErrors.department = VALIDATION_MESSAGES.REQUIRED_DEPARTMENT;
    }

    if (!formData.salary) {
      newErrors.salary = VALIDATION_MESSAGES.REQUIRED_SALARY;
    } else if (isNaN(formData.salary) || formData.salary <= 0) {
      newErrors.salary = VALIDATION_MESSAGES.INVALID_SALARY;
    }

    if (!formData.joinDate) {
      newErrors.joinDate = VALIDATION_MESSAGES.REQUIRED_JOIN_DATE;
    }

    if (!formData.email.trim()) {
      newErrors.email = VALIDATION_MESSAGES.REQUIRED_EMAIL;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = VALIDATION_MESSAGES.INVALID_EMAIL;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = VALIDATION_MESSAGES.REQUIRED_PHONE;
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = VALIDATION_MESSAGES.INVALID_PHONE;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAccountForm = () => {
    const newErrors = {};
    
    if (!accountData.email.trim()) {
      newErrors.email = VALIDATION_MESSAGES.REQUIRED_EMAIL;
    } else if (!/\S+@\S+\.\S+/.test(accountData.email)) {
      newErrors.email = VALIDATION_MESSAGES.INVALID_EMAIL;
    }

    if (!accountData.password) {
      newErrors.password = VALIDATION_MESSAGES.REQUIRED_PASSWORD;
    } else if (accountData.password.length < 6) {
      newErrors.password = VALIDATION_MESSAGES.INVALID_PASSWORD;
    }

    if (!accountData.confirmPassword) {
      newErrors.confirmPassword = VALIDATION_MESSAGES.REQUIRED_CONFIRM_PASSWORD;
    } else if (accountData.password !== accountData.confirmPassword) {
      newErrors.confirmPassword = VALIDATION_MESSAGES.PASSWORD_MISMATCH;
    }

    setAccountErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper functions
  const formatSalary = (salary) => {
    if (!salary) return '';
    return new Intl.NumberFormat('vi-VN').format(salary);
  };

  const getModalTitle = () => {
    if (isView) return MODAL_TITLES.VIEW;
    if (isEdit) return MODAL_TITLES.EDIT;
    if (isAdd) return MODAL_TITLES.ADD;
  };

  return {
    // States
    formData,
    accountData,
    errors,
    accountErrors,
    isLoading,
    showAccountModal,
    departments: DEPARTMENTS,
    positions: POSITIONS,
    
    // Computed values
    isView,
    isEdit,
    isAdd,
    
    // Handlers
    handleInputChange,
    handleAccountInputChange,
    setShowAccountModal,
    setIsLoading,
    setErrors,
    setAccountErrors,
    
    // Functions
    validateForm,
    validateAccountForm,
    formatSalary,
    getModalTitle
  };
} 