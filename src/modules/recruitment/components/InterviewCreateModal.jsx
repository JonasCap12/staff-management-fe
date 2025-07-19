import React from "react";

const InterviewCreateModal = ({
  show,
  onClose,
  onCreate,
  newInterview,
  setNewInterview,
  positions,
  departments,
  leads,
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">
          Tạo Buổi Phỏng Vấn Mới
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Ngày phỏng vấn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày phỏng vấn *
            </label>
            <input
              type="date"
              value={newInterview.date}
              onChange={(e) =>
                setNewInterview({ ...newInterview, date: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          {/* Giờ phỏng vấn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giờ phỏng vấn *
            </label>
            <input
              type="time"
              value={newInterview.time}
              onChange={(e) =>
                setNewInterview({ ...newInterview, time: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          {/* Vị trí */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vị trí *
            </label>
            <select
              value={newInterview.position}
              onChange={(e) =>
                setNewInterview({ ...newInterview, position: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              required
            >
              <option value="">Chọn vị trí</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>
          {/* Phòng ban */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phòng ban *
            </label>
            <select
              value={newInterview.department}
              onChange={(e) =>
                setNewInterview({ ...newInterview, department: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              required
            >
              <option value="">Chọn phòng ban</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          {/* Lead */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Người phỏng vấn *
            </label>
            <select
              value={newInterview.lead}
              onChange={(e) =>
                setNewInterview({ ...newInterview, lead: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              required
            >
              <option value="">Chọn người phỏng vấn</option>
              {leads.map((lead) => (
                <option key={lead} value={lead}>
                  {lead}
                </option>
              ))}
            </select>
          </div>
          {/* Địa điểm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa điểm *
            </label>
            <input
              type="text"
              value={newInterview.location}
              onChange={(e) =>
                setNewInterview({ ...newInterview, location: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập địa điểm phỏng vấn"
              required
            />
          </div>
          {/* Số lượng ứng viên tối đa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số lượng ứng viên tối đa *
            </label>
            <input
              type="number"
              min={1}
              value={newInterview.maxCandidates}
              onChange={(e) =>
                setNewInterview({
                  ...newInterview,
                  maxCandidates: Number(e.target.value),
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả buổi phỏng vấn
          </label>
          <textarea
            value={newInterview.description}
            onChange={(e) =>
              setNewInterview({ ...newInterview, description: e.target.value })
            }
            placeholder="Mô tả nội dung và yêu cầu của buổi phỏng vấn..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Hủy
          </button>
          <button
            onClick={onCreate}
            disabled={
              !newInterview.date ||
              !newInterview.time ||
              !newInterview.position ||
              !newInterview.lead ||
              !newInterview.department ||
              !newInterview.location ||
              !newInterview.maxCandidates
            }
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Tạo Buổi Phỏng Vấn
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCreateModal;
