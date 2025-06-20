import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { calculateDays, validateDates } from "./leaveUtils";

const LeaveForm = ({ onSubmit, onClose, leaveTypes, commonReasons }) => {
  const [newRequest, setNewRequest] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    customReason: "",
  });

  const handleSubmitRequest = () => {
    if (
      !newRequest.leaveType ||
      !newRequest.startDate ||
      !newRequest.endDate ||
      (!newRequest.reason && newRequest.leaveType !== "other") ||
      ((newRequest.leaveType === "other" || newRequest.reason === "Khác") &&
        !newRequest.customReason)
    ) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    // Validate ngày tháng
    const dateValidation = validateDates(
      newRequest.startDate,
      newRequest.endDate,
      newRequest.leaveType
    );
    if (!dateValidation.isValid) {
      alert(dateValidation.message);
      return;
    }

    const days = calculateDays(newRequest.startDate, newRequest.endDate);
    if (days === -1) {
      alert("Ngày kết thúc phải sau hoặc bằng ngày bắt đầu");
      return;
    }

    const finalReason =
      newRequest.leaveType === "other" || newRequest.reason === "Khác"
        ? newRequest.customReason
        : newRequest.reason;

    const requestData = {
      leaveType: newRequest.leaveType,
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      days: days,
      reason: finalReason,
    };

    onSubmit(requestData);
    setNewRequest({
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      customReason: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-gradient-to-br from-slate-50 to-white rounded-3xl w-[90%] max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-in slide-in-from-bottom-4 zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-6 border-b border-black/5 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">
            Tạo Đơn Nghỉ Phép
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Leave Type */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2 text-sm">
              Loại nghỉ phép *
            </label>
            <select
              value={newRequest.leaveType}
              onChange={(e) =>
                setNewRequest({
                  ...newRequest,
                  leaveType: e.target.value,
                  reason: "",
                })
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white appearance-none cursor-pointer"
              required
            >
              <option value="">Chọn loại nghỉ phép</option>
              {leaveTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2 text-sm">
              Ngày bắt đầu *
            </label>
            <input
              type="date"
              value={newRequest.startDate}
              onChange={(e) =>
                setNewRequest({ ...newRequest, startDate: e.target.value })
              }
              min={
                ["sick", "emergency"].includes(newRequest.leaveType)
                  ? ""
                  : new Date().toISOString().split("T")[0]
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white"
              required
            />
            {newRequest.leaveType &&
              !["sick", "emergency"].includes(newRequest.leaveType) && (
                <p className="text-gray-500 text-xs mt-1">
                  Không được chọn ngày trong quá khứ
                </p>
              )}
          </div>

          {/* End Date */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2 text-sm">
              Ngày kết thúc *
            </label>
            <input
              type="date"
              value={newRequest.endDate}
              onChange={(e) =>
                setNewRequest({ ...newRequest, endDate: e.target.value })
              }
              min={
                newRequest.startDate || new Date().toISOString().split("T")[0]
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white"
              required
            />
            <p className="text-gray-500 text-xs mt-1">
              Phải sau hoặc bằng ngày bắt đầu
            </p>
          </div>

          {/* Days Calculation */}
          {newRequest.startDate && newRequest.endDate && (
            <div
              className={`p-3 rounded-lg border ${
                calculateDays(newRequest.startDate, newRequest.endDate) === -1
                  ? "bg-red-50 border-red-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              {calculateDays(newRequest.startDate, newRequest.endDate) ===
              -1 ? (
                <p className="text-red-600 text-sm font-semibold">
                  ⚠️ Lỗi: Ngày kết thúc phải sau hoặc bằng ngày bắt đầu
                </p>
              ) : (
                <>
                  <p className="text-green-600 text-sm font-semibold">
                    Số ngày nghỉ:{" "}
                    <span className="font-bold">
                      {calculateDays(newRequest.startDate, newRequest.endDate)}{" "}
                      ngày
                    </span>
                  </p>
                  {(() => {
                    const validation = validateDates(
                      newRequest.startDate,
                      newRequest.endDate,
                      newRequest.leaveType
                    );
                    if (!validation.isValid && validation.message) {
                      return (
                        <p className="text-amber-600 text-sm mt-1">
                          ⚠️ {validation.message}
                        </p>
                      );
                    }
                    return null;
                  })()}
                </>
              )}
            </div>
          )}

          {/* Reason Selection */}
          {newRequest.leaveType && newRequest.leaveType !== "other" && (
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm">
                Lý do *
              </label>
              <select
                value={newRequest.reason}
                onChange={(e) =>
                  setNewRequest({ ...newRequest, reason: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white"
                required
              >
                <option value="">Chọn lý do</option>
                {(commonReasons[newRequest.leaveType] || []).map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Custom Reason */}
          {(newRequest.leaveType === "other" ||
            newRequest.reason === "Khác") && (
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm">
                Lý do cụ thể *
              </label>
              <textarea
                value={newRequest.customReason}
                onChange={(e) =>
                  setNewRequest({
                    ...newRequest,
                    customReason: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white resize-none min-h-[80px]"
                rows="3"
                placeholder="Vui lòng mô tả lý do cụ thể..."
                required
              />
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 bg-gray-50 text-gray-700 rounded-xl font-semibold text-base hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSubmitRequest}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-base hover:from-blue-700 hover:to-blue-800 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              Gửi Đơn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveForm;
