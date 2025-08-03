import React from "react";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">HR Management</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Hệ thống quản lý nhân sự toàn diện, giúp doanh nghiệp tối ưu hóa 
              quy trình nhân sự và nâng cao hiệu quả làm việc.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Liên hệ
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">hr@company.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  123 Đường ABC, Quận 1, TP.HCM
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Liên kết nhanh
            </h4>
            <div className="space-y-2">
              <a href="/dashboard" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Dashboard
              </a>
              <a href="/employees" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Quản lý nhân viên
              </a>
              <a href="/reports" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Báo cáo
              </a>
              <a href="/settings" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Cài đặt
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-600">
              © 2024 HR Management System. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Điều khoản sử dụng
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Hỗ trợ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
