// components/AttendanceFilters.jsx
import ExportButton from "../../../components/common/ExportButton";

const AttendanceFilters = ({
  selectedDate,
  setSelectedDate,
  filterStatus,
  setFilterStatus,
  filteredRecords,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ngày
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trạng thái
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả</option>
            <option value="present">Có mặt</option>
            <option value="late">Đi muộn</option>
            <option value="absent">Vắng mặt</option>
          </select>
        </div>

        {/* Export Excel Button */}
        <div className="mt-7">
          <ExportButton
            data={filteredRecords.map((record) => ({
              "Mã NV": record.employeeId,
              "Tên nhân viên": record.employeeName,
              Ngày: record.date,
              "Giờ vào": record.checkIn || "-",
              "Giờ ra": record.checkOut || "-",
              "Số giờ": record.workHours,
              "Trạng thái":
                record.status === "present"
                  ? "Có mặt"
                  : record.status === "late"
                  ? "Đi muộn"
                  : "Vắng mặt",
            }))}
            fileName={`bang_cham_cong_${selectedDate}.xlsx`}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceFilters;
