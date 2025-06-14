export function calculateNetSalary(emp) {
  const totalAllowances = Object.values(emp.allowances).reduce((sum, val) => sum + val, 0);
  const totalDeductions = Object.values(emp.deductions).reduce((sum, val) => sum + val, 0);
  const overtimePay = (emp.baseSalary / 22 / 8) * emp.overtimeHours * 1.5;
  return emp.baseSalary + totalAllowances + overtimePay - totalDeductions;
}