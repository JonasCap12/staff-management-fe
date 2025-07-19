import { useState } from "react";
import { Shield, User, Lock, Eye, EyeOff } from "lucide-react";

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const demoAccounts = [
    {
      username: "admin",
      password: "admin123",
      role: "admin",
      name: "Administrator",
    },
    { username: "hr", password: "hr123", role: "hr", name: "HR Manager" },
    { username: "lead", password: "lead123", role: "lead", name: "Team Lead" },
    {
      username: "ketoan",
      password: "kt123",
      role: "accounting",
      name: "Kế toán",
    },
    {
      username: "nhanvien",
      password: "nv123",
      role: "employee",
      name: "Nhân viên",
    },
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      const user = demoAccounts.find(
        (acc) =>
          acc.username === formData.username &&
          acc.password === formData.password
      );
      if (user) {
        onLogin(user);
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không chính xác");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const quickLogin = (account) => {
    setFormData({ username: account.username, password: account.password });
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: "bg-red-100 text-red-700 border-red-200",
      hr: "bg-blue-100 text-blue-700 border-blue-200",
      lead: "bg-green-100 text-green-700 border-green-200",
      accounting: "bg-yellow-100 text-yellow-700 border-yellow-200",
      employee: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return colors[role] || colors.employee;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Main Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
              HR Management
            </h1>
            <p className="text-gray-600 text-base">
              Đăng nhập để truy cập hệ thống
            </p>
          </div>

          <div className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Tên đăng nhập
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  style={{ paddingLeft: "3rem" }}
                  className="block w-full pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder-gray-400"
                  placeholder="Nhập tên đăng nhập"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
                  className="block w-full py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder-gray-400"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 hover:bg-transparent focus:outline-none"
                  style={{
                    background: "none",
                    border: "none",
                    padding: "0 1rem",
                  }}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-sm text-red-700 text-center font-medium">
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Tài khoản demo</h3>
            <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          </div>

          <div className="space-y-3">
            {demoAccounts.map((account) => (
              <button
                key={account.username}
                onClick={() => quickLogin(account)}
                className="w-full group p-4 border border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ background: "transparent" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
                        <User className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-base">
                          {account.name}
                        </p>
                        <p className="text-sm text-gray-500 font-mono">
                          {account.username} • {account.password}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4">
                    <span
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${getRoleBadgeColor(
                        account.role
                      )} uppercase tracking-wide`}
                    >
                      {account.role === "accounting"
                        ? "KẾ TOÁN"
                        : account.role === "employee"
                        ? "NHÂN VIÊN"
                        : account.role.toUpperCase()}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              💡 Nhấp vào tài khoản để tự động điền thông tin đăng nhập
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
