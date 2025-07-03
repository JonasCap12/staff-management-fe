import React, { useState, useEffect } from "react";
import { Award } from "lucide-react";
import StarRating from "./StarRating";
import TaskStatusBadge from "./TaskStatusBadge";

const EvaluationModal = ({
  employee,
  isOpen,
  onClose,
  onSave,
  mockTasks,
  evaluationCriteria,
}) => {
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState("");
  const [overallRating, setOverallRating] = useState(0);

  useEffect(() => {
    if (employee && isOpen) {
      const initialRatings = {};
      evaluationCriteria.forEach((criteria) => {
        initialRatings[criteria.id] = employee.overallRating || 0;
      });
      setRatings(initialRatings);
      const avgRating =
        Object.values(initialRatings).reduce((sum, rating) => sum + rating, 0) /
        evaluationCriteria.length;
      setOverallRating(Math.round(avgRating * 10) / 10);
    }
  }, [employee, isOpen, evaluationCriteria]);

  const handleRatingChange = (criteriaId, rating) => {
    const updatedRatings = { ...ratings, [criteriaId]: rating };
    setRatings(updatedRatings);
    let totalScore = 0;
    let totalWeight = 0;
    evaluationCriteria.forEach((criteria) => {
      totalScore += (updatedRatings[criteria.id] || 0) * criteria.weight;
      totalWeight += criteria.weight;
    });
    const weightedAverage = totalScore / totalWeight;
    setOverallRating(Math.round(weightedAverage * 10) / 10);
  };

  const handleSave = () => {
    const evaluationData = {
      employeeId: employee.id,
      ratings,
      comments,
      overallRating,
      evaluationDate: new Date().toISOString().split("T")[0],
    };
    onSave(evaluationData);
    onClose();
  };

  if (!isOpen || !employee) return null;

  const tasks = mockTasks[employee.id] || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            Đánh giá hiệu suất - {employee.name}
          </h2>
        </div>
        <div className="p-6 space-y-6">
          {/* Employee Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Thông tin nhân viên</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Chức vụ:</span>{" "}
                  {employee.position}
                </p>
                <p>
                  <span className="font-medium">Phòng ban:</span>{" "}
                  {employee.department}
                </p>
                <p>
                  <span className="font-medium">Tỷ lệ chuyên cần:</span>{" "}
                  {employee.attendanceRate}%
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Thống kê công việc</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Hoàn thành:</span>{" "}
                  {employee.completedTasks} công việc
                </p>
                <p>
                  <span className="font-medium">Đang thực hiện:</span>{" "}
                  {employee.pendingTasks} công việc
                </p>
                <p>
                  <span className="font-medium">Quá hạn:</span>{" "}
                  {employee.overdueTasks} công việc
                </p>
              </div>
            </div>
          </div>
          {/* Task Details */}
          <div>
            <h3 className="font-semibold mb-3">Chi tiết công việc</h3>
            <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-auto">
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-white p-3 rounded border">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{task.title}</h4>
                      <TaskStatusBadge status={task.status} />
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        Hạn:{" "}
                        {new Date(task.dueDate).toLocaleDateString("vi-VN")}
                      </p>
                      {task.completedDate && (
                        <p>
                          Hoàn thành:{" "}
                          {new Date(task.completedDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      )}
                      <p>
                        Ưu tiên:{" "}
                        <span
                          className={`font-medium ${
                            task.priority === "high"
                              ? "text-red-600"
                              : task.priority === "medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {task.priority === "high"
                            ? "Cao"
                            : task.priority === "medium"
                            ? "Trung bình"
                            : "Thấp"}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Evaluation Criteria */}
          <div>
            <h3 className="font-semibold mb-4">Tiêu chí đánh giá</h3>
            <div className="space-y-4">
              {evaluationCriteria.map((criteria) => (
                <div
                  key={criteria.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{criteria.name}</h4>
                    <p className="text-sm text-gray-600">
                      Trọng số: {criteria.weight}%
                    </p>
                  </div>
                  <StarRating
                    rating={ratings[criteria.id] || 0}
                    onRatingChange={(rating) =>
                      handleRatingChange(criteria.id, rating)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Overall Rating */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Điểm tổng kết</h3>
            <div className="flex items-center gap-4">
              <StarRating rating={overallRating} readonly />
              <span className="text-2xl font-bold text-blue-600">
                {overallRating}/5
              </span>
            </div>
          </div>
          {/* Comments */}
          <div>
            <h3 className="font-semibold mb-2">Nhận xét</h3>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Nhập nhận xét về hiệu suất làm việc của nhân viên..."
              className="w-full p-3 border rounded-lg resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        {/* Actions */}
        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Lưu đánh giá
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationModal;
