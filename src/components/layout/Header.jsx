import { Shield, Bell, User, Search, Settings, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../modules/auth/context/useAuth";

const Header = ({ isMobileMenuOpen, onToggleMobileMenu, onCloseMobileMenu }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowProfile(false);
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  return (
    <header className={`sticky top-0 z-[60] bg-white border-b border-gray-200 shadow-sm transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-600 z-40"></div>

      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 relative z-40">
        {/* Left side - Logo and brand */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          {/* Mobile menu button */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden touch-target p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors btn-hover-effect"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 sm:p-2 rounded-xl">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HR Management
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">
                Enterprise System
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HR
              </h1>
            </div>
          </div>
        </div>

        {/* Right side - Actions and profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Desktop search - hidden on mobile */}
          <div className="hidden md:block relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Tìm kiếm..."
              className="pl-10 pr-4 py-2 w-64 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <button className="touch-target p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors btn-hover-effect">
            <Settings className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative touch-target p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors btn-hover-effect"
              aria-label="Toggle notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce z-[9999]">
                3
            </span>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[999] animate-scaleIn">
                <div className="p-4 sm:p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                    Thông báo mới
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Bạn có 3 thông báo chưa đọc
                  </p>
                </div>
                <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 max-h-80 overflow-y-auto">
                  <div className="flex items-start space-x-3 sm:space-x-4 p-2 sm:p-3 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer touch-padding btn-hover-effect">
                    <div className="h-3 w-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 animate-bounce"></div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
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
                  <div className="flex items-start space-x-3 sm:space-x-4 p-2 sm:p-3 hover:bg-green-50 rounded-xl transition-colors cursor-pointer touch-padding btn-hover-effect">
                    <div className="h-3 w-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        Nhân viên mới
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Nguyễn Thị B đã được thêm vào hệ thống
                      </p>
                      <p className="text-xs text-green-600 mt-1 font-medium">
                        15 phút trước
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4 p-2 sm:p-3 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer touch-padding btn-hover-effect">
                    <div className="h-3 w-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        Cập nhật hệ thống
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Hệ thống sẽ được cập nhật vào 22:00 tối nay
                      </p>
                      <p className="text-xs text-orange-600 mt-1 font-medium">
                        1 giờ trước
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4 border-t border-gray-100">
                  <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                    Xem tất cả thông báo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 touch-target p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors btn-hover-effect"
              aria-label="Toggle profile menu"
            >
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                {user?.name}
              </span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[999] animate-scaleIn">
                <div className="p-4 sm:p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.permissions?.name}</p>
                      <p className="text-xs text-gray-500">{user?.username}@company.com</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4 space-y-2">
                  <button className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-blue-50 rounded-xl transition-colors touch-padding btn-hover-effect">
                    <span>👤</span>
                    <span>Hồ sơ cá nhân</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-blue-50 rounded-xl transition-colors touch-padding btn-hover-effect">
                    <span>⚙️</span>
                    <span>Cài đặt</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-blue-50 rounded-xl transition-colors touch-padding btn-hover-effect">
                    <span>❓</span>
                    <span>Trợ giúp</span>
                  </button>
                </div>
                <div className="p-3 sm:p-4 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium touch-padding btn-hover-effect"
                  >
                    <span>🚪</span>
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
