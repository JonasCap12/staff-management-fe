import React from "react";
import { Calendar, Clock, MapPin, User } from "lucide-react";

const AssignCandidateModal = ({
  show,
  onClose,
  selectedCandidate,
  interviews,
  assignCandidateToInterview,
}) => {
  if (!show || !selectedCandidate) return null;
  const filtered = interviews.filter(
    (interview) =>
      interview.position === selectedCandidate.position &&
      interview.candidateIds.length < interview.maxCandidates
  );
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">
          Chọn Buổi Phỏng Vấn cho {selectedCandidate.name}
        </h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <User className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <p className="font-semibold text-blue-900">
                {selectedCandidate.name}
              </p>
              <p className="text-blue-700">
                Ứng tuyển vị trí: {selectedCandidate.position}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {filtered.map((interview) => (
            <div
              key={interview.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {interview.position}
                  </h4>
                  <p className="text-gray-600">{interview.department}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  {interview.candidateIds.length}/{interview.maxCandidates} chỗ
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {interview.date} lúc {interview.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {interview.location}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {interview.lead}
                </div>
              </div>
              <button
                onClick={() =>
                  assignCandidateToInterview(selectedCandidate.id, interview.id)
                }
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Chọn Buổi Phỏng Vấn Này
              </button>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">Không có buổi phỏng vấn phù hợp</p>
            <p className="text-sm">
              Chưa có buổi phỏng vấn nào cho vị trí {selectedCandidate.position}{" "}
              hoặc tất cả đã đầy
            </p>
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignCandidateModal;
