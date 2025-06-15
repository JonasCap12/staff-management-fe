// components/AttendanceTable.jsx
import { Eye, Users } from "lucide-react";

const AttendanceTable = ({ selectedDate, filteredRecords }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Bảng chấm công</h2>
        <p className="text-gray-600">
          Ngày: {new Date(selectedDate).toLocaleDateString("vi-VN")}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Mã NV
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Tên nhân viên
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Giờ vào
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Giờ ra
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Số giờ
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Trạng thái
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {record.employeeId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {record.employeeName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {record.checkIn || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {record.checkOut || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {record.workHours}h
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        record.status === "present"
                          ? "bg-green-100 text-green-800"
                          : record.status === "late"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {record.status === "present"
                        ? "Có mặt"
                        : record.status === "late"
                        ? "Đi muộn"
                        : "Vắng mặt"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <Users className="h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-gray-500 font-medium">
                        Không có dữ liệu chấm công
                      </p>
                      <p className="text-sm text-gray-400">
                        Thử thay đổi ngày hoặc bộ lọc trạng thái
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
