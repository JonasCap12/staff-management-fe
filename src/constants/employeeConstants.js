// Employee departments
export const DEPARTMENTS = ['IT', 'HR', 'Marketing', 'Sales', 'Finance', 'Operations'];

// Employee positions
export const POSITIONS = [
  'Developer', 
  'Senior Developer', 
  'Team Lead', 
  'Manager',
  'HR Specialist', 
  'Marketing Specialist', 
  'Sales Executive',
  'Accountant', 
  'Designer', 
  'Analyst'
];

// Employee status options
export const EMPLOYEE_STATUS = [
  { value: 'active', label: 'Hoạt động' },
  { value: 'leave', label: 'Nghỉ phép' },
  { value: 'inactive', label: 'Đã nghỉ việc' }
];

// Account roles
export const ACCOUNT_ROLES = [
  { value: 'employee', label: 'Nhân viên' },
  { value: 'teamlead', label: 'Team Lead' },
  { value: 'hr', label: 'HR' }
];

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED_NAME: 'Họ tên là bắt buộc',
  REQUIRED_POSITION: 'Vị trí là bắt buộc',
  REQUIRED_DEPARTMENT: 'Phòng ban là bắt buộc',
  REQUIRED_SALARY: 'Lương là bắt buộc',
  INVALID_SALARY: 'Lương phải là số dương',
  REQUIRED_JOIN_DATE: 'Ngày tham gia là bắt buộc',
  REQUIRED_EMAIL: 'Email là bắt buộc',
  INVALID_EMAIL: 'Email không hợp lệ',
  REQUIRED_PHONE: 'Số điện thoại là bắt buộc',
  INVALID_PHONE: 'Số điện thoại không hợp lệ',
  REQUIRED_PASSWORD: 'Mật khẩu là bắt buộc',
  INVALID_PASSWORD: 'Mật khẩu phải có ít nhất 6 ký tự',
  REQUIRED_CONFIRM_PASSWORD: 'Xác nhận mật khẩu là bắt buộc',
  PASSWORD_MISMATCH: 'Mật khẩu xác nhận không khớp'
};

// Modal titles
export const MODAL_TITLES = {
  VIEW: 'Xem chi tiết nhân viên',
  EDIT: 'Chỉnh sửa nhân viên',
  ADD: 'Thêm mới nhân viên'
};

// Default form values
export const DEFAULT_FORM_DATA = {
  name: '',
  position: '',
  department: '',
  salary: '',
  joinDate: new Date().toISOString().split('T')[0],
  rating: 5,
  email: '',
  phone: '',
  status: 'active'
};

export const DEFAULT_ACCOUNT_DATA = {
  email: '',
  password: '',
  confirmPassword: '',
  role: 'employee'
}; 