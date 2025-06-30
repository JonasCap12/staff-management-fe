import {
  Eye,
  Check,
  X,
  Mail,
  Phone,
  Building,
  MapPin,
  Users,
} from "lucide-react";

const CandidateList = ({
  candidates,
  renderStars,
  getExperienceColor,
  getStatusColor,
  getStatusText,
  onShowDetail,
  onShowAssign,
  onReject,
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {candidates.map((candidate) => (
      <div
        key={candidate.id}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {candidate.name}
              </h3>
              <p className="text-gray-600 font-medium">{candidate.position}</p>
              <div className="flex items-center mt-2">
                {renderStars(candidate.rating)}
                <span
                  className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${getExperienceColor(
                    candidate.experience
                  )}`}
                >
                  {candidate.experience}
                </span>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                candidate.status
              )}`}
            >
              {getStatusText(candidate.status)}
            </span>
          </div>
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-3 text-gray-400" />
              {candidate.email}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              {candidate.phone}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Building className="w-4 h-4 mr-3 text-gray-400" />
              {candidate.education}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-3 text-gray-400" />
              {candidate.location} • {candidate.expectedSalary}
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Kỹ năng:</p>
            <div className="flex flex-wrap gap-1">
              {candidate.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {candidate.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{candidate.skills.length - 3} khác
                </span>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg">
            Ứng tuyển: {candidate.appliedDate}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onShowDetail(candidate)}
              className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Eye className="w-4 h-4 mr-1" />
              Chi tiết
            </button>
            {candidate.status === "pending" && (
              <>
                <button
                  onClick={() => onShowAssign(candidate)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Chọn PV
                </button>
                <button
                  onClick={() => onReject(candidate.id)}
                  className="flex items-center justify-center px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default CandidateList;
