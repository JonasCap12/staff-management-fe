// components/ManageTab.jsx
import { useState } from "react";
import AttendanceFilters from "./AttendanceFilters";
import AttendanceTable from "./AttendanceTable";
import { mockAttendanceData } from "../data/mockData";

const ManageTab = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter records based on selected criteria
  const filteredRecords = mockAttendanceData.filter((record) => {
    const dateMatch = record.date === selectedDate;
    const statusMatch =
      filterStatus === "all" || record.status === filterStatus;
    return dateMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      <AttendanceFilters
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filteredRecords={filteredRecords}
      />
      <AttendanceTable
        selectedDate={selectedDate}
        filteredRecords={filteredRecords}
      />
    </div>
  );
};

export default ManageTab;
