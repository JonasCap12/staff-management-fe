import React, { useState, useEffect } from "react";

export default function SalaryModal({ employee, mode, onSave, onClose }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    department: "",
    position: "",
    baseSalary: 0,
    allowances: {},
    deductions: {},
    status: "Chưa thanh toán",
    month: "",
  });

  useEffect(() => {
    if (employee) setForm(employee);
    else setForm({
      name: "",
      code: "",
      department: "",
      position: "",
      baseSalary: 0,
      allowances: {},
      deductions: {},
      status: "Chưa thanh toán",
      month: "",
    });
  }, [employee]);

  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isAdd = mode === "add";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const getModalTitle = () => {
    if (isView) return "Xem chi tiết lương";
    if (isEdit) return "Chỉnh sửa lương";
    if (isAdd) return "Thêm mới lương";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {getModalTitle()}
            </h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tên nhân viên */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên nhân viên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={isView}
                  className={`
                    w-full px-3 py-2 border border-gray-300 rounded-md
                    ${isView 
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
                      : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }
                  `}
                  placeholder="Nhập tên nhân viên"
                  required
                />
              </div>

              {/* Mã NV */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mã nhân viên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  disabled={isView}
                  className={`
                    w-full px-3 py-2 border border-gray-300 rounded-md
                    ${isView 
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
                      : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }
                  `}
                  placeholder="Nhập mã nhân viên"
                  required
                />
              </div>

              {/* Phòng ban */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phòng ban
                </label>
                <input
                  type="text"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  disabled={isView}
                  className={`
                    w-full px-3 py-2 border border-gray-300 rounded-md
                    ${isView 
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
                      : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }
                  `}
                  placeholder="Nhập phòng ban"
                />
              </div>

              {/* Chức vụ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chức vụ
                </label>
                <input
                  type="text"
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  disabled={isView}
                  className={`
                    w-full px-3 py-2 border border-gray-300 rounded-md
                    ${isView 
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
                      : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }
                  `}
                  placeholder="Nhập chức vụ"
                />
              </div>

              {/* Lương cơ bản */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lương cơ bản (VNĐ)
                </label>
                <input
                  type="number"
                  name="baseSalary"
                  value={form.baseSalary}
                  onChange={handleChange}
                  disabled={isView}
                  className={`
                    w-full px-3 py-2 border border-gray-300 rounded-md
                    ${isView 
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
                      : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }
                  `}
                  placeholder="0"
                />
              </div>

              {/* Tháng */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tháng lương
                </label>
                <input
                  type="month"
                  name="month"
                  value={form.month}
                  onChange={handleChange}
                  disabled={isView}
                  className={`
                    w-full px-3 py-2 border border-gray-300 rounded-md
                    ${isView 
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
                      : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }
                  `}
                />
              </div>

              {/* Trạng thái */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trạng thái thanh toán
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  disabled={isView}
                  className={`
                    w-full px-3 py-2 border border-gray-300 rounded-md
                    ${isView 
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
                      : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }
                  `}
                >
                  <option value="Đã thanh toán">Đã thanh toán</option>
                  <option value="Chưa thanh toán">Chưa thanh toán</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
              >
                Đóng
              </button>
              {!isView && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  {isEdit ? 'Cập nhật' : 'Thêm mới'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}