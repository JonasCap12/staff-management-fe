import React from 'react';
import { 
  X, 
  User, 
  AlertCircle, 
  CheckCircle, 
  Loader
} from 'lucide-react';
import { useEmployeeModal } from '../../../hooks/useEmployeeModal';
import { PersonalInfoSection, WorkInfoSection, RatingSection } from './EmployeeFormSections';
import AccountCreationModal from './AccountCreationModal';

export default function EmployeeModal({ employee, mode, onSave, onClose, userRole = 'employee' }) {
  const {
    // States
    formData,
    accountData,
    errors,
    accountErrors,
    isLoading,
    showAccountModal,
    departments,
    positions,
    
    // Computed values
    isView,
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
  } = useEmployeeModal(employee, mode);

  const isAdminOrHR = userRole === 'admin' || userRole === 'hr';

  // Form submission handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isView) return;

    if (!validateForm()) {
      return;
    }

    if (isAdd && isAdminOrHR) {
      setShowAccountModal(true);
      return;
    }

    await saveEmployee();
  };

  const saveEmployee = async () => {
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const employeeData = {
        ...formData,
        salary: parseInt(formData.salary),
        rating: parseFloat(formData.rating),
        id: employee?.id || Date.now().toString(), // Generate ID for new employees
        createdAt: new Date().toISOString()
      };

      // Call the onSave callback (this will be handled by parent component)
      await onSave(employeeData);
      
      // Close modal on success
      onClose();
    } catch {
      setErrors({
        submit: 'Có lỗi xảy ra khi lưu nhân viên. Vui lòng thử lại.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    if (!validateAccountForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock account creation response
      const mockAccountResult = {
        userId: Date.now().toString(),
        email: accountData.email,
        role: accountData.role
      };

      const employeeData = {
        ...formData,
        salary: parseInt(formData.salary),
        rating: parseFloat(formData.rating),
        id: Date.now().toString(),
        userId: mockAccountResult.userId,
        createdAt: new Date().toISOString()
      };

      // Call the onSave callback
      await onSave(employeeData);
      setShowAccountModal(false);
      
      // Close modal on success
      onClose();
    } catch {
      setAccountErrors({
        submit: 'Có lỗi xảy ra khi tạo tài khoản. Vui lòng thử lại.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Account Creation Modal
  if (showAccountModal) {
    return (
      <AccountCreationModal
        formData={formData}
        accountData={accountData}
        accountErrors={accountErrors}
        isLoading={isLoading}
        userRole={userRole}
        onAccountInputChange={handleAccountInputChange}
        onCreateAccount={handleCreateAccount}
        onClose={() => setShowAccountModal(false)}
      />
    );
  }

  // Main Employee Modal
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header - Fixed at top */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200 px-6 py-4 rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {getModalTitle()}
                </h2>
                <p className="text-gray-600 text-sm">
                  {isView ? 'Xem thông tin chi tiết nhân viên' : 'Quản lý thông tin nhân viên'}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <PersonalInfoSection
              formData={formData}
              errors={errors}
              isView={isView}
              handleInputChange={handleInputChange}
            />

            <WorkInfoSection
              formData={formData}
              errors={errors}
              isView={isView}
              handleInputChange={handleInputChange}
              departments={departments}
              positions={positions}
              formatSalary={formatSalary}
            />

            <RatingSection
              formData={formData}
              isView={isView}
              handleInputChange={handleInputChange}
            />

            {/* Error Message */}
            {errors.submit && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{errors.submit}</span>
              </div>
            )}

            {/* Action Buttons */}
            {!isView && (
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  <X className="h-4 w-4" />
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      {isAdd ? 'Thêm nhân viên' : 'Cập nhật'}
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
} 