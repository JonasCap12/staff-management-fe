// Mock data tổng hợp cho báo cáo nhân sự
export const getReportData = () => ({
  employees: [
    { id: 1, name: 'Nguyễn Văn A', department: 'Phòng Nhân sự', position: 'HR Manager', salary: 25000000 },
    { id: 2, name: 'Trần Thị B', department: 'Phòng Kỹ thuật', position: 'Senior Developer', salary: 30000000 },
    { id: 3, name: 'Lê Văn C', department: 'Phòng Kinh doanh', position: 'Sales Manager', salary: 28000000 },
    { id: 4, name: 'Phạm Thị D', department: 'Phòng Kế toán', position: 'Accountant', salary: 20000000 },
    { id: 5, name: 'Ngô Văn E', department: 'Phòng Kỹ thuật', position: 'Developer', salary: 25000000 },
    { id: 6, name: 'Đỗ Thị F', department: 'Phòng Kinh doanh', position: 'Sales Executive', salary: 18000000 },
    { id: 7, name: 'Phan Văn G', department: 'Phòng Nhân sự', position: 'HR Assistant', salary: 15000000 },
    { id: 8, name: 'Vũ Thị H', department: 'Phòng Kế toán', position: 'Accountant', salary: 20000000 },
    { id: 9, name: 'Bùi Văn I', department: 'Phòng Kỹ thuật', position: 'QA Engineer', salary: 22000000 },
    { id: 10, name: 'Đặng Thị K', department: 'Phòng Kinh doanh', position: 'Marketing Specialist', salary: 20000000 },
  ],
  salaryByMonth: [
    { month: '01/2024', totalSalary: 120000000, employeeCount: 8 },
    { month: '02/2024', totalSalary: 130000000, employeeCount: 9 },
    { month: '03/2024', totalSalary: 110000000, employeeCount: 8 },
    { month: '04/2024', totalSalary: 140000000, employeeCount: 9 },
    { month: '05/2024', totalSalary: 135000000, employeeCount: 9 },
    { month: '06/2024', totalSalary: 150000000, employeeCount: 10 },
  ],
  leaveStats: [
    { month: '06/2024', daysUsed: 3, total: 12, pending: 2 },
    { month: '05/2024', daysUsed: 2, total: 12, pending: 1 },
    { month: '04/2024', daysUsed: 4, total: 12, pending: 0 },
  ],
  topPerformers: [
    { id: 1, name: 'Nguyễn Văn A', department: 'Phòng Nhân sự', score: 98, month: '06/2024', projects: 5 },
    { id: 2, name: 'Trần Thị B', department: 'Phòng Kỹ thuật', score: 95, month: '06/2024', projects: 8 },
    { id: 3, name: 'Lê Văn C', department: 'Phòng Kinh doanh', score: 93, month: '06/2024', projects: 12 },
    { id: 4, name: 'Phạm Thị D', department: 'Phòng Kế toán', score: 92, month: '06/2024', projects: 3 },
    { id: 5, name: 'Ngô Văn E', department: 'Phòng Kỹ thuật', score: 91, month: '06/2024', projects: 6 },
    { id: 6, name: 'Đỗ Thị F', department: 'Phòng Kinh doanh', score: 90, month: '05/2024', projects: 10 },
    { id: 7, name: 'Phan Văn G', department: 'Phòng Nhân sự', score: 89, month: '05/2024', projects: 4 },
  ],
  turnover: [
    { month: '06/2024', joined: 2, left: 1, netChange: 1 },
    { month: '05/2024', joined: 1, left: 0, netChange: 1 },
    { month: '04/2024', joined: 0, left: 2, netChange: -2 },
    { month: '03/2024', joined: 1, left: 1, netChange: 0 },
    { month: '02/2024', joined: 2, left: 0, netChange: 2 },
    { month: '01/2024', joined: 1, left: 1, netChange: 0 },
  ],
  events: [
    { date: '2024-06-01', type: 'Tăng lương', employee: 'Nguyễn Văn A', amount: '10%' },
    { date: '2024-06-03', type: 'Nghỉ việc', employee: 'Đỗ Thị F', reason: 'Chuyển công ty' },
    { date: '2024-06-05', type: 'Thăng chức', employee: 'Trần Thị B', newPosition: 'Tech Lead' },
    { date: '2024-06-10', type: 'Thưởng', employee: 'Lê Văn C', amount: '5,000,000 VND' },
    { date: '2024-06-15', type: 'Nhân viên mới', employee: 'Hoàng Văn L', position: 'Junior Developer' },
    { date: '2024-06-20', type: 'Tăng lương', employee: 'Phạm Thị D', amount: '8%' },
  ]
});

// Tính toán thống kê tổng quan
export const getStats = (data) => {
  const totalEmployees = data.employees?.length || 0;
  const currentMonth = data.salaryByMonth?.[data.salaryByMonth.length - 1]?.month;
  const salary = data.salaryByMonth?.find(item => item.month === currentMonth)?.totalSalary || 0;
  const leave = data.leaveStats?.find(item => item.month === currentMonth)?.daysUsed || 0;
  const joined = data.turnover?.find(item => item.month === currentMonth)?.joined || 0;
  
  return {
    totalEmployees,
    salary,
    leave,
    joined,
    averageSalary: totalEmployees > 0 ? Math.round(salary / totalEmployees) : 0
  };
};

// Xử lý dữ liệu cho biểu đồ cột phòng ban
export const getDepartmentChartData = (employees) => {
  if (!employees) return [];
  const result = {};
  employees.forEach(e => {
    result[e.department] = (result[e.department] || 0) + 1;
  });
  return Object.entries(result).map(([department, count]) => ({ department, count }));
};

// Xử lý dữ liệu cho biểu đồ tròn phòng ban
export const getDepartmentPieData = (employees) => {
  if (!employees) return [];
  const total = employees.length;
  const result = {};
  employees.forEach(e => {
    result[e.department] = (result[e.department] || 0) + 1;
  });
  return Object.entries(result).map(([department, count]) => ({ 
    department, 
    count,
    percentage: ((count / total) * 100).toFixed(1)
  }));
};

// Xử lý dữ liệu cho biểu đồ đường lương
export const getSalaryChartData = (salaryByMonth) => {
  if (!salaryByMonth) return [];
  return salaryByMonth.map(item => ({
    month: item.month,
    totalSalary: item.totalSalary,
    employeeCount: item.employeeCount
  }));
};

// Xử lý dữ liệu nghỉ phép
export const getLeaveStat = (leaveStats) => {
  if (!leaveStats || leaveStats.length === 0) return { daysUsed: 0, total: 12, pending: 0 };
  return leaveStats[0];
};

// Xử lý dữ liệu top performers
export const getTopPerformers = (topPerformers) => {
  if (!topPerformers) return [];
  return topPerformers.slice(0, 5);
};

// Format số tiền
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format số lớn
export const formatLargeNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + ' Tỷ';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + ' Triệu';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}; 