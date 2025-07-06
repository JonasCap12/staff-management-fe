# Module Settings - Quản lý Cài đặt Hệ thống

## Tổng quan

Module Settings cung cấp giao diện quản lý toàn diện cho việc cấu hình hệ thống quản lý nhân sự, bao gồm thông tin công ty, phân quyền, thiết lập hệ thống, cài đặt email và quản lý dữ liệu.

## Cấu trúc thư mục

```
src/modules/setting/
├── components/
│   ├── CompanyInfoForm.jsx      # Form thông tin công ty
│   ├── RolePermissionMatrix.jsx # Matrix phân quyền
│   ├── SystemConfigForm.jsx     # Form cấu hình hệ thống
│   ├── EmailSettingsForm.jsx    # Form cài đặt email
│   └── DataManagementCard.jsx   # Quản lý dữ liệu
├── constants/
│   └── settingOptions.js        # Constants và options
├── hooks/
│   └── useSettingsForm.js       # Custom hooks quản lý form
├── pages/
│   └── SettingsPage.jsx         # Trang chính
├── services/
│   └── settingsApi.js           # API services
└── README.md                    # Tài liệu này
```

## Tính năng chính

### 1. Thông tin công ty
- **Quản lý thông tin cơ bản**: Tên công ty, địa chỉ, mã số thuế, số điện thoại
- **Upload logo**: Hỗ trợ các định dạng JPG, PNG, GIF (tối đa 5MB)
- **Validation**: Kiểm tra tính hợp lệ của dữ liệu đầu vào
- **Auto-save**: Tự động lưu sau 2 giây khi có thay đổi

### 2. Phân quyền và vai trò
- **Quản lý vai trò**: Tạo, sửa, xóa các vai trò (Admin, HR, Manager, Employee, Viewer)
- **Matrix phân quyền**: Giao diện checkbox trực quan cho từng chức năng
- **Permissions chi tiết**: Phân quyền theo module và chức năng cụ thể
- **Default permissions**: Quyền mặc định cho từng vai trò

### 3. Thiết lập hệ thống
- **Ngôn ngữ**: Hỗ trợ Tiếng Việt và English
- **Múi giờ**: Cấu hình múi giờ mặc định
- **Lịch làm việc**: Số ngày công/tháng, giờ làm/ngày
- **Tính lương**: Phương thức tính lương, hệ số làm thêm giờ, ngày lễ
- **Tùy chọn hệ thống**: Auto-save, thông báo email, debug mode

### 4. Cài đặt email
- **SMTP Configuration**: Host, port, username, password
- **Security**: SSL/TLS encryption
- **Test email**: Kiểm tra cấu hình email
- **Notifications**: Bật/tắt các loại thông báo email

### 5. Quản lý dữ liệu
- **Thống kê dữ liệu**: Hiển thị số liệu tổng quan
- **Export dữ liệu**: Xuất CSV cho từng loại dữ liệu
- **Backup/Restore**: Sao lưu và khôi phục dữ liệu
- **Reset demo**: Xóa dữ liệu demo (chỉ admin)

## Phân quyền

### Vai trò có thể truy cập:
- **Admin**: Tất cả tính năng
- **HR**: Thông tin công ty, thiết lập hệ thống, cài đặt email
- **Manager**: Chỉ xem (không có quyền chỉnh sửa)
- **Employee**: Không có quyền truy cập
- **Viewer**: Không có quyền truy cập

### Quyền chi tiết:
- `view_settings`: Xem trang cài đặt
- `edit_settings`: Chỉnh sửa cài đặt cơ bản
- `manage_roles`: Quản lý vai trò và phân quyền
- `system_config`: Cấu hình hệ thống

## API Endpoints

### Company Information
- `GET /api/settings/company` - Lấy thông tin công ty
- `PUT /api/settings/company` - Cập nhật thông tin công ty
- `POST /api/settings/company/logo` - Upload logo

### Roles & Permissions
- `GET /api/settings/roles` - Lấy danh sách vai trò
- `POST /api/settings/roles` - Tạo vai trò mới
- `PUT /api/settings/roles/:id` - Cập nhật vai trò
- `DELETE /api/settings/roles/:id` - Xóa vai trò
- `GET /api/settings/roles/:id/permissions` - Lấy quyền của vai trò
- `PUT /api/settings/roles/:id/permissions` - Cập nhật quyền

### System Configuration
- `GET /api/settings/system` - Lấy cấu hình hệ thống
- `PUT /api/settings/system` - Cập nhật cấu hình hệ thống

### Email Settings
- `GET /api/settings/email` - Lấy cài đặt email
- `PUT /api/settings/email` - Cập nhật cài đặt email
- `POST /api/settings/email/test` - Test cấu hình email

### Data Management
- `POST /api/settings/data/export` - Xuất dữ liệu
- `GET /api/settings/data/stats` - Thống kê dữ liệu
- `POST /api/settings/data/reset-demo` - Reset dữ liệu demo

## Custom Hooks

### useCompanyInfoForm()
Quản lý form thông tin công ty với validation và auto-save.

```javascript
const {
  formData,
  errors,
  loading,
  saving,
  hasChanges,
  handleInputChange,
  handleSave,
  handleLogoUpload
} = useCompanyInfoForm();
```

### useSystemConfigForm()
Quản lý form cấu hình hệ thống.

```javascript
const {
  formData,
  errors,
  loading,
  saving,
  hasChanges,
  handleInputChange,
  handleSave
} = useSystemConfigForm();
```

### useEmailSettingsForm()
Quản lý form cài đặt email với test functionality.

```javascript
const {
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
} = useEmailSettingsForm();
```

### useDataManagement()
Quản lý xuất dữ liệu và reset demo.

```javascript
const {
  dataStats,
  loading,
  exporting,
  resetting,
  handleExportData,
  handleResetDemoData
} = useDataManagement();
```

## Validation Rules

### Company Information
- **Tên công ty**: Bắt buộc
- **Địa chỉ**: Bắt buộc
- **Mã số thuế**: Bắt buộc, định dạng 10-13 số
- **Số điện thoại**: Bắt buộc, định dạng hợp lệ
- **Email**: Tùy chọn, định dạng email hợp lệ
- **Website**: Tùy chọn, phải bắt đầu bằng http:// hoặc https://

### Email Settings
- **SMTP Host**: Bắt buộc
- **SMTP Port**: Bắt buộc, từ 1-65535
- **SMTP Username**: Bắt buộc
- **From Email**: Bắt buộc, định dạng email hợp lệ
- **From Name**: Bắt buộc

### System Configuration
- **Ngôn ngữ**: Bắt buộc
- **Múi giờ**: Bắt buộc
- **Số ngày công/tháng**: Từ 1-31
- **Số giờ làm/ngày**: Từ 1-24

## Responsive Design

Module được thiết kế responsive với các breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Performance Features

- **Auto-save với debounce**: Tự động lưu sau 2 giây không thay đổi
- **Lazy loading**: Components chỉ load khi cần thiết
- **Optimized re-renders**: Sử dụng React.memo và useCallback
- **Error boundaries**: Xử lý lỗi gracefully

## Security Features

- **Permission-based access**: Kiểm tra quyền trước khi hiển thị
- **Input validation**: Validate tất cả input từ user
- **CSRF protection**: Sử dụng tokens cho các request quan trọng
- **XSS prevention**: Sanitize dữ liệu trước khi hiển thị

## Troubleshooting

### Common Issues

1. **Logo không upload được**
   - Kiểm tra kích thước file (tối đa 5MB)
   - Kiểm tra định dạng file (JPG, PNG, GIF)
   - Kiểm tra quyền ghi thư mục

2. **Email test không gửi được**
   - Kiểm tra cấu hình SMTP
   - Kiểm tra firewall/antivirus
   - Kiểm tra credentials

3. **Permissions không lưu**
   - Kiểm tra quyền admin
   - Kiểm tra network connection
   - Kiểm tra browser console

### Debug Mode
Bật debug mode trong System Configuration để xem thông tin chi tiết.

## License

MIT License - xem file LICENSE để biết thêm chi tiết. 