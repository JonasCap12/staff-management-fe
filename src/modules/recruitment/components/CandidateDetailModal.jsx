import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  FileText,
  UserPlus,
  Send,
} from "lucide-react";

const CandidateDetailModal = ({
  show,
  onClose,
  selectedCandidate,
  getExperienceColor,
  renderStars,
  getStatusColor,
  getStatusText,
  onAssign,
  onReject,
  onSendMail,
}) => {
  if (!show || !selectedCandidate) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {selectedCandidate.name}
            </h3>
            <p className="text-gray-600 text-lg">
              {selectedCandidate.position}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Thông tin liên hệ
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{selectedCandidate.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{selectedCandidate.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{selectedCandidate.location}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Học vấn & Kinh nghiệm
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Trường:</span>{" "}
                  {selectedCandidate.education}
                </p>
                <p>
                  <span className="font-medium">Kinh nghiệm:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${getExperienceColor(
                      selectedCandidate.experience
                    )}`}
                  >
                    {selectedCandidate.experience}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Mức lương mong muốn:</span>{" "}
                  {selectedCandidate.expectedSalary}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Đánh giá</h4>
              <div className="flex items-center">
                {renderStars(selectedCandidate.rating)}
                <span className="ml-2 text-sm text-gray-600">
                  {selectedCandidate.rating}/5 sao
                </span>
              </div>
            </div>
          </div>
          {/* Kỹ năng và trạng thái */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Kỹ năng</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCandidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">
                Trạng thái ứng tuyển
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Trạng thái hiện tại:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      selectedCandidate.status
                    )}`}
                  >
                    {getStatusText(selectedCandidate.status)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ngày ứng tuyển:</span>
                  <span className="text-sm text-gray-600">
                    {selectedCandidate.appliedDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Tài liệu
              </h4>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                <FileText className="w-4 h-4 mr-2" />
                Tải CV: {selectedCandidate.cv}
              </button>
            </div>
          </div>
        </div>
        {/* Nút hành động */}
        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
          {selectedCandidate.status === "pending" && (
            <>
              <button
                onClick={onAssign}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <UserPlus className="w-4 h-4 mr-2 inline" />
                Phân Công Phỏng Vấn
              </button>
              <button
                onClick={() => onReject(selectedCandidate.id)}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <X className="w-4 h-4 mr-2 inline" />
                Từ Chối
              </button>
            </>
          )}
          <button
            onClick={onSendMail}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Send className="w-4 h-4 mr-2 inline" />
            Gửi Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailModal;
