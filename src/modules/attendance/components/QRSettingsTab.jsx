// components/QRSettingsTab.jsx
import { RefreshCw, Check, Clock } from "lucide-react";

const QRSettingsTab = ({ qrCode, generateNewQRCode }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Cài đặt mã QR</h2>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Mã QR hiện tại
            </h3>
            <div className="flex items-center justify-between">
              <code className="text-2xl font-mono font-bold text-blue-600 bg-white px-4 py-2 rounded-lg">
                {qrCode}
              </code>
              <button
                onClick={generateNewQRCode}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                <RefreshCw className="inline h-4 w-4 mr-2" />
                Tạo mã mới
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <Check className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-green-800">Tự động đổi mã</h4>
              </div>
              <p className="text-sm text-green-700">
                Hệ thống sẽ tự động tạo mã QR mới mỗi ngày lúc 0:00
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-blue-800">
                  Thời gian hiệu lực
                </h4>
              </div>
              <p className="text-sm text-blue-700">
                Mỗi mã QR có hiệu lực trong 24 giờ
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Lịch sử mã QR
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <code className="font-mono text-gray-800">QR2024120401</code>
                  <p className="text-xs text-gray-600">04/12/2024</p>
                </div>
                <span className="text-xs text-gray-500">Đã hết hạn</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <code className="font-mono text-gray-800">QR2024120301</code>
                  <p className="text-xs text-gray-600">03/12/2024</p>
                </div>
                <span className="text-xs text-gray-500">Đã hết hạn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRSettingsTab;
