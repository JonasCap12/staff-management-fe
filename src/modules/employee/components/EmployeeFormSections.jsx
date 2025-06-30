import React from 'react';
import { User, Briefcase, Star, AlertCircle } from 'lucide-react';
import { EMPLOYEE_STATUS } from '../../../constants/employeeConstants';

// Personal Information Section
export function PersonalInfoSection({ formData, errors, isView, handleInputChange }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <User className="h-5 w-5 text-blue-600" />
        Thông tin cá nhân
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Họ tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={isView}
            className={`
              w-full px-4 py-3 border border-gray-300 rounded-xl transition-all duration-200
              ${isView 
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
              }
              ${errors.name ? 'border-red-300 bg-red-50' : ''}
            `}
            placeholder="Nhập họ tên"
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={isView}
            className={`
              w-full px-4 py-3 border border-gray-300 rounded-xl transition-all duration-200
              ${isView 
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
              }
              ${errors.email ? 'border-red-300 bg-red-50' : ''}
            `}
            placeholder="example@company.com"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={isView}
            className={`
              w-full px-4 py-3 border border-gray-300 rounded-xl transition-all duration-200
              ${isView 
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
              }
              ${errors.phone ? 'border-red-300 bg-red-50' : ''}
            `}
            placeholder="0123456789"
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ngày tham gia <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.joinDate}
            onChange={(e) => handleInputChange('joinDate', e.target.value)}
            disabled={isView}
            className={`
              w-full px-4 py-3 border border-gray-300 rounded-xl transition-all duration-200
              ${isView 
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
              }
              ${errors.joinDate ? 'border-red-300 bg-red-50' : ''}
            `}
            required
          />
          {errors.joinDate && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.joinDate}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Work Information Section
export function WorkInfoSection({ 
  formData, 
  errors, 
  isView, 
  handleInputChange, 
  departments, 
  positions, 
  formatSalary 
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-blue-600" />
        Thông tin công việc
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phòng ban <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            disabled={isView}
            className={`
              w-full px-4 py-3 border border-gray-300 rounded-xl bg-white transition-all duration-200 appearance-none cursor-pointer
              ${isView 
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
              }
              ${errors.department ? 'border-red-300 bg-red-50' : ''}
            `}
            required
          >
            <option value="">Chọn phòng ban</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.department}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vị trí <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            disabled={isView}
            className={`
              w-full px-4 py-3 border border-gray-300 rounded-xl bg-white transition-all duration-200 appearance-none cursor-pointer
              ${isView 
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
              }
              ${errors.position ? 'border-red-300 bg-red-50' : ''}
            `}
            required
          >
            <option value="">Chọn vị trí</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
          {errors.position && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.position}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lương (VNĐ) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.salary}
            onChange={(e) => handleInputChange('salary', e.target.value)}
            disabled={isView}
            className={`
              w-full px-4 py-3 border border-gray-300 rounded-xl transition-all duration-200
              ${isView 
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
              }
              ${errors.salary ? 'border-red-300 bg-red-50' : ''}
            `}
            placeholder="15000000"
            min="0"
            required
          />
          {formData.salary && (
            <p className="text-sm text-gray-500 mt-1">
              {formatSalary(formData.salary)} VNĐ
            </p>
          )}
          {errors.salary && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.salary}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trạng thái
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            disabled={isView}
            className={`
              w-full px-4 py-3 border border-gray-300 rounded-xl bg-white transition-all duration-200 appearance-none cursor-pointer
              ${isView 
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
              }
            `}
          >
            {EMPLOYEE_STATUS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// Rating Section
export function RatingSection({ formData, isView, handleInputChange }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Star className="h-5 w-5 text-yellow-500" />
        Đánh giá hiệu suất
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Đánh giá ban đầu
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => handleInputChange('rating', e.target.value)}
              disabled={isView}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex items-center gap-2 min-w-[80px]">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-bold text-gray-900">
                {formData.rating}
              </span>
              <span className="text-sm text-gray-500">/5</span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Kém</span>
            <span>Trung bình</span>
            <span>Xuất sắc</span>
          </div>
        </div>
      </div>
    </div>
  );
} 