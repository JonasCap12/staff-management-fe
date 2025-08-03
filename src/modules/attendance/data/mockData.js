// data/mockData.js
export const mockAttendanceData = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "Nguyễn Văn A",
    date: new Date().toISOString().split("T")[0], // Sử dụng ngày hiện tại
    checkIn: "08:30",
    checkOut: "17:45",
    status: "present",
    workHours: 8.25,
  },
  {
    id: 2,
    employeeId: "EMP002",
    employeeName: "Trần Thị B",
    date: new Date().toISOString().split("T")[0], // Sử dụng ngày hiện tại
    checkIn: "08:15",
    checkOut: "17:30",
    status: "present",
    workHours: 8.25,
  },
  {
    id: 3,
    employeeId: "EMP003",
    employeeName: "Lê Văn C",
    date: new Date().toISOString().split("T")[0], // Sử dụng ngày hiện tại
    checkIn: "09:15",
    checkOut: "",
    status: "late",
    workHours: 0,
  },
  // Thêm một số dữ liệu cho các ngày khác để test
  {
    id: 4,
    employeeId: "EMP004",
    employeeName: "Phạm Thị D",
    date: "2024-12-05",
    checkIn: "08:45",
    checkOut: "17:30",
    status: "present",
    workHours: 7.75,
  },
  {
    id: 5,
    employeeId: "EMP005",
    employeeName: "Hoàng Văn E",
    date: "2024-12-04",
    checkIn: "",
    checkOut: "",
    status: "absent",
    workHours: 0,
  },
];
