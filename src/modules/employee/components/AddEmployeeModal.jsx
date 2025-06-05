import { useState, useEffect } from 'react';
import { X, User, Mail, Lock, Building, Briefcase, DollarSign, Calendar, Star, Eye, EyeOff, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const AddEmployeeModal = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  role = 'admin' // 'admin' hoặc 'teamlead'
}) => {
  const [formData, setFormData] = useState({
    // Thông tin cá nhân
    name: '',
    position: '',
    department: '',
    salary: '',
    joinDate: '',
    rating: 5,
    // Thông tin tài khoản (chỉ cho admin)
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Account Info (admin only), 2: Employee Info

  const departments = ['IT', 'HR', 'Marketing', 'Sales', 'Finance', 'Operations'];
  const positions = [
    'Developer', 'Senior Developer', 'Team Lead', 'Manager',
    'HR Specialist', 'Marketing Specialist', 'Sales Executive',
    'Accountant', 'Designer', 'Analyst'
  ];

  // Reset form khi modal mở/đóng
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        position: '',
        department: '',
        salary: '',
        joinDate: new Date().toISOString().split('T')[0],
        rating: 5,
        email: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
      setStep(role === 'admin' ? 1 : 2);
    }
  }, [isOpen, role]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error khi user nhập
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Họ tên là bắt buộc';
    }

    if (!formData.position) {
      newErrors.position = 'Vị trí là bắt buộc';
    }

    if (!formData.department) {
      newErrors.department = 'Phòng ban là bắt buộc';
    }

    if (!formData.salary) {
      newErrors.salary = 'Lương là bắt buộc';
    } else if (isNaN(formData.salary) || formData.salary <= 0) {
      newErrors.salary = 'Lương phải là số dương';
    }

    if (!formData.joinDate) {
      newErrors.joinDate = 'Ngày tham gia là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBackStep = () => {
    setStep(1);
  };

  // API call tạo tài khoản
  const createAccount = async () => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: 'employee'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create account');
      }

      const data = await response.json();
      return data.userId;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  };

  // API call tạo thông tin nhân viên
  const createEmployee = async (userId = null) => {
    try {
      const employeeData = {
        name: formData.name.trim(),
        position: formData.position,
        department: formData.department,
        salary: parseInt(formData.salary),
        joinDate: formData.joinDate,
        rating: formData.rating,
        status: 'active'
      };

      if (userId) {
        employeeData.userId = userId;
      }

      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error('Failed to create employee');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);

    try {
      let userId = null;

      // Nếu là admin, tạo tài khoản trước
      if (role === 'admin') {
        userId = await createAccount();
      }

      // Tạo thông tin nhân viên
      const employeeData = await createEmployee(userId);

      // Thành công
      onSuccess?.(employeeData);
      onClose();
    } catch (error) {
      setErrors({
        submit: 'Có lỗi xảy ra khi tạo nhân viên. Vui lòng thử lại.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Thêm nhân viên mới
                </h3>
                <p className="text-blue-100 text-sm">
                  {role === 'admin' ? 'Tạo tài khoản và thông tin nhân viên' : 'Tạo thông tin nhân viên'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Bar (chỉ hiện với admin) */}
          {role === 'admin' && (
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Bước {step} / 2
                </span>
                <span className="text-sm text-gray-500">
                  {step === 1 ? 'Thông tin tài khoản' : 'Thông tin cá nhân'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 2) * 100}%` }}
                />
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6">
            {/* Step 1: Account Info (Admin only) */}
            {role === 'admin' && step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Tạo tài khoản đăng nhập</h4>
                  <p className="text-gray-600">Nhập thông tin để tạo tài khoản cho nhân viên</p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email đăng nhập *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="nhansuvien@company.com"
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Nhập mật khẩu"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xác nhận mật khẩu *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Nhập lại mật khẩu"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                {/* Next Button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2"
                  >
                    Tiếp theo
                    <CheckCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Employee Info */}
            {(role === 'teamlead' || step === 2) && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Thông tin nhân viên</h4>
                  <p className="text-gray-600">Điền thông tin cá nhân và công việc</p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Nguyễn Văn An"
                    />
                  </div>
                  {errors.name && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Position & Department */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vị trí *
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        value={formData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200 ${
                          errors.position ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Chọn vị trí</option>
                        {positions.map(pos => (
                          <option key={pos} value={pos}>{pos}</option>
                        ))}
                      </select>
                    </div>
                    {errors.position && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        {errors.position}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phòng ban *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200 ${
                          errors.department ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Chọn phòng ban</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    {errors.department && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        {errors.department}
                      </div>
                    )}
                  </div>
                </div>

                {/* Salary & Join Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lương (VND) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        value={formData.salary}
                        onChange={(e) => handleInputChange('salary', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.salary ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="15000000"
                        min="0"
                      />
                    </div>
                    {errors.salary && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        {errors.salary}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày tham gia *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        value={formData.joinDate}
                        onChange={(e) => handleInputChange('joinDate', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.joinDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.joinDate && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        {errors.joinDate}
                      </div>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đánh giá ban đầu
                  </label>
                  <div className="flex items-center gap-4">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => handleInputChange('rating', e.target.value)}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700 min-w-[2rem]">
                      {formData.rating}
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                {errors.submit && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="h-5 w-5" />
                    {errors.submit}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between pt-4">
                  {role === 'admin' && (
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="text-gray-600 hover:text-gray-800 px-4 py-2 transition-colors duration-200"
                    >
                      ← Quay lại
                    </button>
                  )}
                  
                  <div className="flex gap-3 ml-auto">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="h-4 w-4 animate-spin" />
                          Đang tạo...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Tạo nhân viên
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;