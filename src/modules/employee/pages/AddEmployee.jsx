import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  User,
  Briefcase,
  Building,
  DollarSign,
  Calendar,
  Star,
  Phone,
  Mail,
  MapPin,
  Upload,
  X,
} from "lucide-react";

// Cấu trúc dữ liệu phòng ban với vị trí và lương tương ứng (đặt ngoài component để tránh re-render)
const DEPARTMENT_POSITIONS = {
  IT: {
    "Frontend Developer": 18000000,
    "Backend Developer": 20000000,
    "Full Stack Developer": 22000000,
    "DevOps Engineer": 25000000,
    "Technical Lead": 30000000,
    "IT Manager": 35000000,
    "Senior Developer": 24000000,
    "Junior Developer": 12000000,
    "QA Tester": 13000000,
    "UI/UX Designer": 16000000,
    "System Admin": 22000000,
  },
  HR: {
    "HR Executive": 12000000,
    "HR Specialist": 15000000,
    "Recruitment Specialist": 14000000,
    "HR Manager": 25000000,
    "HR Director": 40000000,
    "Training Coordinator": 16000000,
    Recruiter: 14000000,
  },
  Marketing: {
    "Marketing Executive": 12000000,
    "Digital Marketing Specialist": 15000000,
    "Content Marketing": 14000000,
    "Marketing Manager": 25000000,
    "Marketing Director": 40000000,
    "Content Creator": 13000000,
    "SEO Specialist": 15000000,
  },
  Sales: {
    "Sales Executive": 12000000,
    "Account Manager": 18000000,
    "Sales Manager": 28000000,
    "Business Development": 20000000,
    "Sales Director": 45000000,
  },
  Finance: {
    Accountant: 15000000,
    "Financial Analyst": 18000000,
    "Finance Manager": 30000000,
    Auditor: 20000000,
  },
  Operations: {
    "Operations Manager": 25000000,
    "Project Manager": 22000000,
    "Process Analyst": 18000000,
    "Quality Manager": 24000000,
  },
};

const AddEmployee = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
    rating: 5.0,
    joinDate: new Date().toISOString().split("T")[0],
    email: "",
    phone: "",
    address: "",
    status: "active",
    avatar: null,
  });

  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);

  const departments = Object.keys(DEPARTMENT_POSITIONS);

  const statuses = [
    { value: "active", label: "Hoạt động" },
    { value: "leave", label: "Nghỉ phép" },
    { value: "inactive", label: "Đã nghỉ việc" },
  ];

  // Lấy danh sách vị trí theo phòng ban đã chọn
  const availablePositions = formData.department
    ? Object.keys(DEPARTMENT_POSITIONS[formData.department] || {})
    : [];

  // Cập nhật lương khi chọn vị trí
  useEffect(() => {
    if (formData.department && formData.position) {
      const salary =
        DEPARTMENT_POSITIONS[formData.department]?.[formData.position];
      if (salary) {
        setFormData((prev) => ({
          ...prev,
          salary: salary.toString(),
        }));
      }
    }
  }, [formData.department, formData.position]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      // Khi thay đổi phòng ban, reset vị trí và lương
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        position: "",
        salary: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        setErrors((prev) => ({
          ...prev,
          avatar: "Kích thước file không được vượt quá 2MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
        setFormData((prev) => ({
          ...prev,
          avatar: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    setFormData((prev) => ({
      ...prev,
      avatar: null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Họ tên là bắt buộc";
    if (!formData.position) newErrors.position = "Vị trí là bắt buộc";
    if (!formData.department) newErrors.department = "Phòng ban là bắt buộc";
    if (!formData.salary) {
      newErrors.salary = "Lương là bắt buộc";
    } else if (isNaN(formData.salary) || Number(formData.salary) <= 0) {
      newErrors.salary = "Lương phải là số dương";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    if (!formData.joinDate) newErrors.joinDate = "Ngày tham gia là bắt buộc";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newEmployee = {
        id: Date.now(), // Simple ID generation
        ...formData,
        salary: Number(formData.salary),
        rating: Number(formData.rating),
        // Tạo avatar mặc định nếu không có avatar upload
        avatar:
          avatarPreview ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            formData.name
          )}&background=random`,
      };

      onSave(newEmployee);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatSalary = (salary) => {
    if (!salary) return "";
    return parseInt(salary).toLocaleString("vi-VN");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl transition-all duration-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Thêm Nhân viên Mới
            </h1>
            <p className="text-gray-600 mt-2">
              Điền thông tin chi tiết của nhân viên mới
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Avatar Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <User className="h-5 w-5" />
              Ảnh đại diện
            </h2>

            <div className="flex items-center gap-6">
              <div className="relative">
                {avatarPreview ? (
                  <div className="relative">
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="h-24 w-24 object-cover rounded-2xl border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeAvatar}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="h-24 w-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                    {formData.name ? getInitials(formData.name) : "AA"}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors duration-200 flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {avatarPreview ? "Thay đổi ảnh" : "Tải ảnh lên"}
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG tối đa 2MB (tùy chọn)
                </p>
                {errors.avatar && (
                  <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <User className="h-5 w-5" />
              Thông tin cơ bản
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? "border-red-300 bg-red-50" : "border-gray-200"
                  }`}
                  placeholder="Nhập họ và tên"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                  placeholder="example@company.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.phone
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                  placeholder="0901 234 567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Nhập địa chỉ"
                />
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Thông tin công việc
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phòng ban *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white ${
                    errors.department
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                >
                  <option value="">Chọn phòng ban</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vị trí công việc *
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  disabled={!formData.department}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white ${
                    errors.position
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  } ${
                    !formData.department ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                >
                  <option value="">
                    {formData.department
                      ? "Chọn vị trí"
                      : "Vui lòng chọn phòng ban trước"}
                  </option>
                  {availablePositions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
                {errors.position && (
                  <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức lương (VND) *
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formatSalary(formData.salary)}
                  readOnly
                  className={`w-full px-4 py-3 border rounded-xl bg-gray-50 text-gray-700 ${
                    errors.salary
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                  placeholder="Lương sẽ tự động cập nhật theo vị trí"
                />
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày tham gia *
                </label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.joinDate
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
                {errors.joinDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.joinDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đánh giá ban đầu
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    name="rating"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                  <div className="flex items-center gap-1 min-w-[60px]">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {formData.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Lưu nhân viên
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
