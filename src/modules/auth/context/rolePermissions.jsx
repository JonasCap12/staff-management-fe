// rolePermissions.js - Fixed version
export const rolePermissions = {
  admin: {
    name: "Administrator",
    permissions: ["*"], // All permissions
    menuItems: [
      "dashboard",
      "employees",
      "attendance",
      "leave",
      "payroll",
      "recruitment",
      "performance",
      "documents",
      "reports",
      "settings",
    ],
  },
  hr: {
    name: "HR Manager",
    permissions: [
      "employees",
      "attendance",
      "leave.admin", // Thay đổi từ "leave" thành "leave.admin"
      "recruitment",
      "performance",
      "documents",
      "reports",
    ],
    menuItems: [
      "dashboard",
      "employees",
      "attendance",
      "leave",
      "recruitment",
      "performance",
      "documents",
      "reports",
    ],
  },
  lead: {
    name: "Team Lead",
    permissions: [
      "employees.view",
      "attendance",
      "leave.approve",
      "performance",
    ],
    menuItems: ["dashboard", "employees", "attendance", "leave", "performance"],
  },
  accounting: {
    name: "Kế toán",
    permissions: [
      "dashboard",
      "attendance",
      "leave.own", // Thay đổi từ "leave" thành "leave.own"
      "payroll",
      "reports.financial",
    ],
    menuItems: ["dashboard", "attendance", "leave", "payroll", "reports"],
  },
  employee: {
    name: "Nhân viên",
    permissions: ["attendance.own", "leave.own", "profile.own"],
    menuItems: ["dashboard", "attendance", "leave"],
  },
};
