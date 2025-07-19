// Language options
export const LANGUAGE_OPTIONS = [
  { value: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { value: 'en', label: 'English', flag: '🇺🇸' }
];

// Timezone options
export const TIMEZONE_OPTIONS = [
  { value: 'Asia/Ho_Chi_Minh', label: 'Việt Nam (GMT+7)' },
  { value: 'UTC', label: 'UTC (GMT+0)' },
  { value: 'America/New_York', label: 'New York (GMT-5)' },
  { value: 'Europe/London', label: 'London (GMT+0)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (GMT+9)' }
];

// Week start options
export const WEEK_START_OPTIONS = [
  { value: 0, label: 'Chủ nhật' },
  { value: 1, label: 'Thứ 2' },
  { value: 2, label: 'Thứ 3' },
  { value: 3, label: 'Thứ 4' },
  { value: 4, label: 'Thứ 5' },
  { value: 5, label: 'Thứ 6' },
  { value: 6, label: 'Thứ 7' }
];

// Role options
export const ROLE_OPTIONS = [
  { value: 'admin', label: 'Quản trị viên', color: 'red' },
  { value: 'hr', label: 'Nhân sự', color: 'blue' },
  { value: 'manager', label: 'Quản lý', color: 'green' },
  { value: 'employee', label: 'Nhân viên', color: 'gray' },
  { value: 'viewer', label: 'Người xem', color: 'yellow' }
];

// Permission modules
export const PERMISSION_MODULES = [
  {
    id: 'dashboard',
    label: 'Bảng điều khiển',
    permissions: [
      { id: 'view_dashboard', label: 'Xem bảng điều khiển' },
      { id: 'export_dashboard', label: 'Xuất báo cáo' }
    ]
  },
  {
    id: 'employee',
    label: 'Quản lý nhân viên',
    permissions: [
      { id: 'view_employee', label: 'Xem nhân viên' },
      { id: 'create_employee', label: 'Thêm nhân viên' },
      { id: 'edit_employee', label: 'Sửa nhân viên' },
      { id: 'delete_employee', label: 'Xóa nhân viên' },
      { id: 'export_employee', label: 'Xuất dữ liệu' }
    ]
  },
  {
    id: 'attendance',
    label: 'Chấm công',
    permissions: [
      { id: 'view_attendance', label: 'Xem chấm công' },
      { id: 'manage_attendance', label: 'Quản lý chấm công' },
      { id: 'approve_attendance', label: 'Duyệt chấm công' },
      { id: 'export_attendance', label: 'Xuất báo cáo' }
    ]
  },
  {
    id: 'salary',
    label: 'Lương thưởng',
    permissions: [
      { id: 'view_salary', label: 'Xem lương' },
      { id: 'manage_salary', label: 'Quản lý lương' },
      { id: 'approve_salary', label: 'Duyệt lương' },
      { id: 'export_salary', label: 'Xuất bảng lương' }
    ]
  },
  {
    id: 'leave',
    label: 'Nghỉ phép',
    permissions: [
      { id: 'view_leave', label: 'Xem nghỉ phép' },
      { id: 'approve_leave', label: 'Duyệt nghỉ phép' },
      { id: 'manage_leave', label: 'Quản lý nghỉ phép' }
    ]
  },
  {
    id: 'performance',
    label: 'Đánh giá hiệu suất',
    permissions: [
      { id: 'view_performance', label: 'Xem đánh giá' },
      { id: 'create_performance', label: 'Tạo đánh giá' },
      { id: 'edit_performance', label: 'Sửa đánh giá' },
      { id: 'approve_performance', label: 'Duyệt đánh giá' }
    ]
  },
  {
    id: 'recruitment',
    label: 'Tuyển dụng',
    permissions: [
      { id: 'view_recruitment', label: 'Xem tuyển dụng' },
      { id: 'create_job', label: 'Tạo tin tuyển dụng' },
      { id: 'manage_candidates', label: 'Quản lý ứng viên' },
      { id: 'schedule_interview', label: 'Lên lịch phỏng vấn' }
    ]
  },
  {
    id: 'reports',
    label: 'Báo cáo',
    permissions: [
      { id: 'view_reports', label: 'Xem báo cáo' },
      { id: 'create_reports', label: 'Tạo báo cáo' },
      { id: 'export_reports', label: 'Xuất báo cáo' }
    ]
  },
  {
    id: 'settings',
    label: 'Cài đặt hệ thống',
    permissions: [
      { id: 'view_settings', label: 'Xem cài đặt' },
      { id: 'edit_settings', label: 'Sửa cài đặt' },
      { id: 'manage_roles', label: 'Quản lý vai trò' },
      { id: 'system_config', label: 'Cấu hình hệ thống' }
    ]
  }
];

// Default role permissions
export const DEFAULT_ROLE_PERMISSIONS = {
  admin: PERMISSION_MODULES.flatMap(module => 
    module.permissions.map(permission => permission.id)
  ),
  hr: [
    'view_dashboard', 'export_dashboard',
    'view_employee', 'create_employee', 'edit_employee', 'export_employee',
    'view_attendance', 'manage_attendance', 'approve_attendance', 'export_attendance',
    'view_salary', 'manage_salary', 'approve_salary', 'export_salary',
    'view_leave', 'approve_leave', 'manage_leave',
    'view_performance', 'create_performance', 'edit_performance', 'approve_performance',
    'view_recruitment', 'create_job', 'manage_candidates', 'schedule_interview',
    'view_reports', 'create_reports', 'export_reports',
    'view_settings', 'edit_settings'
  ],
  manager: [
    'view_dashboard', 'export_dashboard',
    'view_employee', 'export_employee',
    'view_attendance', 'approve_attendance',
    'view_salary', 'export_salary',
    'view_leave', 'approve_leave',
    'view_performance', 'create_performance', 'edit_performance',
    'view_recruitment', 'manage_candidates', 'schedule_interview',
    'view_reports', 'export_reports'
  ],
  employee: [
    'view_dashboard',
    'view_attendance',
    'view_leave',
    'view_performance'
  ],
  viewer: [
    'view_dashboard',
    'view_employee',
    'view_attendance',
    'view_reports'
  ]
};

// Email notification types
export const EMAIL_NOTIFICATION_TYPES = [
  { id: 'welcome_email', label: 'Email chào mừng nhân viên mới' },
  { id: 'attendance_reminder', label: 'Nhắc nhở chấm công' },
  { id: 'leave_approval', label: 'Thông báo duyệt nghỉ phép' },
  { id: 'salary_notification', label: 'Thông báo lương' },
  { id: 'performance_review', label: 'Nhắc nhở đánh giá hiệu suất' },
  { id: 'system_alert', label: 'Cảnh báo hệ thống' }
];

// Data export options
export const DATA_EXPORT_OPTIONS = [
  { id: 'employees', label: 'Danh sách nhân viên', icon: 'users' },
  { id: 'attendance', label: 'Dữ liệu chấm công', icon: 'clock' },
  { id: 'salary', label: 'Bảng lương', icon: 'dollar-sign' },
  { id: 'leave', label: 'Nghỉ phép', icon: 'calendar' },
  { id: 'performance', label: 'Đánh giá hiệu suất', icon: 'star' },
  { id: 'documents', label: 'Tài liệu', icon: 'file-text' }
]; 