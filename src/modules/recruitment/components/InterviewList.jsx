import React from "react";
import { Calendar, Users, MapPin, User, Clock, Eye } from "lucide-react";

const InterviewList = ({
  interviews,
  candidates,
  renderStars,
  getExperienceColor,
  onShowDetail,
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {interviews.map((interview) => {
      const assignedCandidates = interview.candidateIds
        .map((id) => candidates.find((c) => c.id === id))
        .filter(Boolean);

      return (
        <div
          key={interview.id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-bold">{interview.position}</h3>
                <p className="text-blue-100">{interview.department}</p>
              </div>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {assignedCandidates.length}/{interview.maxCandidates}
              </span>
            </div>
            <div className="space-y-2 text-sm text-blue-100">
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
                Lead: {interview.lead}
              </div>
            </div>
          </div>
          <div className="p-6">
            {interview.description && (
              <p className="text-gray-600 text-sm mb-4 bg-gray-50 p-3 rounded-lg">
                {interview.description}
              </p>
            )}
            {assignedCandidates.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Ứng viên tham gia:
                </h4>
                {assignedCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="bg-green-50 border border-green-200 p-3 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-green-900">
                          {candidate.name}
                        </p>
                        <p className="text-sm text-green-700">
                          {candidate.email}
                        </p>
                        <div className="flex items-center mt-1">
                          {renderStars(candidate.rating)}
                          <span
                            className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(
                              candidate.experience
                            )}`}
                          >
                            {candidate.experience}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onShowDetail(candidate)}
                        className="text-green-600 hover:text-green-800 p-1"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Chưa có ứng viên nào được phân công</p>
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>
);

export default InterviewList;
