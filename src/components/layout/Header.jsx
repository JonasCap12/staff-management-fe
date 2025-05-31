import { Shield, Bell, User, Search, Settings } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../modules/auth/context/useAuth";

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowProfile(false);
  };

  return (
    <header className="bg-white shadow-xl border-b-2 border-blue-100 relative z-50">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-600 z-40"></div>

      <div className="flex items-center justify-between px-8 py-4 relative z-40">
        {/* Left side - Logo and brand */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HR Management
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">
                Enterprise System
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Actions and profile */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
            <Settings className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce z-[9999]">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[999] animate-fadeIn">
                <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                  <h3 className="font-bold text-gray-900 text-lg">
                    Thông báo mới
                  </h3>
                  <p className="text-sm text-gray-600">
                    Bạn có 3 thông báo chưa đọc
                  </p>
                </div>
                <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
                  <div className="flex items-start space-x-4 p-3 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer">
                    <div className="h-3 w-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 animate-bounce"></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        Yêu cầu nghỉ phép mới
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Trần Văn A yêu cầu nghỉ phép 3 ngày từ 15/12 - 17/12
                      </p>
                      <p className="text-xs text-blue-600 mt-1 font-medium">
                        5 phút trước
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-3 hover:bg-green-50 rounded-xl transition-colors cursor-pointer">
                    <div className="h-3 w-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        Nhân viên mới
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Nguyễn Thị C đã được thêm vào phòng IT
                      </p>
                      <p className="text-xs text-green-600 mt-1 font-medium">
                        1 giờ trước
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-3 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer">
                    <div className="h-3 w-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        Báo cáo tháng
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Báo cáo nhân sự tháng 12 đã sẵn sàng
                      </p>
                      <p className="text-xs text-orange-600 mt-1 font-medium">
                        2 giờ trước
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                  <button className="w-full text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    Xem tất cả thông báo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="relative">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-gray-900">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-600 font-medium">
                  {user?.permissions?.name || "Employee"}
                </p>
              </div>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[999] animate-fadeIn">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-600">
                        {user?.username}@company.com
                      </p>
                      <span
                        className={`inline-block px-2 py-1 mt-1 rounded-full text-xs font-medium ${
                          user?.role === "admin"
                            ? "bg-red-100 text-red-800"
                            : user?.role === "hr"
                            ? "bg-blue-100 text-blue-800"
                            : user?.role === "lead"
                            ? "bg-green-100 text-green-800"
                            : user?.role === "accounting"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user?.permissions?.name}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                    Hồ sơ cá nhân
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                    Cài đặt tài khoản
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                    Hỗ trợ & Trợ giúp
                  </button>
                  <hr className="border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-4 z-30">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Tìm kiếm..."
            className="pl-10 pr-4 py-2 w-full text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
