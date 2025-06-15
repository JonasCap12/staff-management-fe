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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isView && "Xem chi tiết lương"}
            {isEdit && "Chỉnh sửa lương"}
            {isAdd && "Thêm mới lương"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Tên nhân viên</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={isView}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Mã NV</label>
              <input
                type="text"
                name="code"
                value={form.code}
                onChange={handleChange}
                disabled={isView}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phòng ban</label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                disabled={isView}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Chức vụ</label>
              <input
                type="text"
                name="position"
                value={form.position}
                onChange={handleChange}
                disabled={isView}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Lương cơ bản</label>
              <input
                type="number"
                name="baseSalary"
                value={form.baseSalary}
                onChange={handleChange}
                disabled={isView}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Tháng</label>
              <input
                type="month"
                name="month"
                value={form.month}
                onChange={handleChange}
                disabled={isView}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Trạng thái</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                disabled={isView}
                className="w-full border rounded px-2 py-1"
              >
                <option value="Đã thanh toán">Đã thanh toán</option>
                <option value="Chưa thanh toán">Chưa thanh toán</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Đóng
            </button>
            {!isView && (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Lưu
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}