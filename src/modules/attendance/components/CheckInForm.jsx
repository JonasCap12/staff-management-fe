// components/CheckInForm.jsx
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const CheckInForm = ({ qrCode }) => {
  const [checkInCode, setCheckInCode] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle employee check-in
  const handleCheckIn = () => {
    if (checkInCode === qrCode) {
      const now = new Date();
      const timeString = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      alert(`Chấm công thành công!\nThời gian: ${timeString}`);
      setCheckInCode("");
    } else {
      alert("Mã QR không hợp lệ!");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Chấm công</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nhập mã QR
          </label>
          <input
            type="text"
            value={checkInCode}
            onChange={(e) => setCheckInCode(e.target.value)}
            placeholder="Nhập mã QR để chấm công"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-mono text-lg"
          />
        </div>

        <button
          onClick={handleCheckIn}
          disabled={!checkInCode.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          <Clock className="inline h-5 w-5 mr-2" />
          Chấm công
        </button>

        {/* Current Time Display */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Thời gian hiện tại</p>
          <p className="text-2xl font-bold text-gray-800">
            {currentTime.toLocaleTimeString("vi-VN")}
          </p>
          <p className="text-sm text-gray-600">
            {currentTime.toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckInForm;
