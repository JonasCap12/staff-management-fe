// components/QRCodeDisplay.jsx
import { QrCode } from "lucide-react";

const QRCodeDisplay = ({ qrCode }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Mã QR Hôm nay
          </h2>
          <p className="text-gray-600">Quét mã để chấm công</p>
        </div>

        {/* QR Code Visual */}
        <div className="mb-6 flex justify-center">
          <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-dashed border-blue-200">
            <QrCode className="h-32 w-32 text-blue-600 mx-auto" />
            <div className="mt-4 text-center">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
                <code className="text-lg font-mono font-bold text-blue-600">
                  {qrCode}
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
          <p className="text-sm text-gray-700">
            <strong>Hướng dẫn:</strong> Sử dụng mã này để chấm công hôm nay. Mã
            sẽ được đổi mới mỗi ngày.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
