// utils/salaryCalc.js

/**
 * Cấu hình các thông số lương, bảo hiểm, thuế
 */
export const SALARY_CONFIG = {
  WORKING_DAYS_PER_MONTH: 22,
  WORKING_HOURS_PER_DAY: 8,
  OVERTIME_RATE: 1.5, // Ngày thường
  OVERTIME_RATE_WEEKEND: 2,
  OVERTIME_RATE_HOLIDAY: 3,
  PERSONAL_DEDUCTION: 11000000,
  DEPENDENT_DEDUCTION: 4400000,
  INSURANCE_RATES: {
    SOCIAL: 0.08, // 8% lương đóng BH
    HEALTH: 0.015, // 1.5%
    UNEMPLOYMENT: 0.01 // 1%
  },
  MAX_INSURANCE_SALARY: 29800000, // 20 lần lương tối thiểu vùng 1 (2025)
  TAX_BRACKETS: [
    { threshold: 5000000, rate: 0.05 },
    { threshold: 10000000, rate: 0.1 },
    { threshold: 18000000, rate: 0.15 },
    { threshold: 32000000, rate: 0.2 },
    { threshold: 52000000, rate: 0.25 },
    { threshold: 80000000, rate: 0.3 },
    { threshold: Infinity, rate: 0.35 }
  ]
};

// Tổng phụ cấp
export function calculateTotalAllowances(allowances = {}) {
  return Object.values(allowances).reduce((sum, val) => sum + (Number(val) || 0), 0);
}

// Tổng khấu trừ
export function calculateTotalDeductions(deductions = {}) {
  return Object.values(deductions).reduce((sum, val) => sum + (Number(val) || 0), 0);
}

// Lương làm thêm giờ
export function calculateOvertime({ baseSalary = 0, overtimeHours = 0, type = 'normal' }) {
  const hourlyRate = baseSalary / SALARY_CONFIG.WORKING_DAYS_PER_MONTH / SALARY_CONFIG.WORKING_HOURS_PER_DAY;
  let rate = SALARY_CONFIG.OVERTIME_RATE;
  if (type === 'weekend') rate = SALARY_CONFIG.OVERTIME_RATE_WEEKEND;
  if (type === 'holiday') rate = SALARY_CONFIG.OVERTIME_RATE_HOLIDAY;
  return hourlyRate * overtimeHours * rate;
}

// Bảo hiểm bắt buộc (chỉ phần NLĐ đóng)
export function calculateInsurance(baseSalary = 0) {
  const salaryForInsurance = Math.min(baseSalary, SALARY_CONFIG.MAX_INSURANCE_SALARY);
  return {
    social: salaryForInsurance * SALARY_CONFIG.INSURANCE_RATES.SOCIAL,
    health: salaryForInsurance * SALARY_CONFIG.INSURANCE_RATES.HEALTH,
    unemployment: salaryForInsurance * SALARY_CONFIG.INSURANCE_RATES.UNEMPLOYMENT
  };
}

// Tổng bảo hiểm NLĐ đóng
export function calculateTotalInsurance(baseSalary = 0) {
  const ins = calculateInsurance(baseSalary);
  return ins.social + ins.health + ins.unemployment;
}

// Thuế TNCN (theo biểu lũy tiến)
export function calculateIncomeTax({ grossSalary = 0, baseSalary = 0, dependents = 0 }) {
  // Trừ bảo hiểm bắt buộc
  const insurance = calculateTotalInsurance(baseSalary);
  // Giảm trừ bản thân + người phụ thuộc
  const totalDeduct = SALARY_CONFIG.PERSONAL_DEDUCTION + dependents * SALARY_CONFIG.DEPENDENT_DEDUCTION;
  let taxable = grossSalary - insurance - totalDeduct;
  if (taxable <= 0) return 0;
  let tax = 0;
  let prev = 0;
  for (const bracket of SALARY_CONFIG.TAX_BRACKETS) {
    const amount = Math.min(taxable, bracket.threshold - prev);
    if (amount > 0) tax += amount * bracket.rate;
    taxable -= amount;
    prev = bracket.threshold;
    if (taxable <= 0) break;
  }
  return Math.round(tax);
}

// Lương thực nhận (Net)
export function calculateNetSalary(emp, options = {}) {
  const WORKING_DAYS_PER_MONTH = options.workingDays || SALARY_CONFIG.WORKING_DAYS_PER_MONTH;
  const WORKING_HOURS_PER_DAY = options.workingHours || SALARY_CONFIG.WORKING_HOURS_PER_DAY;
  // 1. Tổng phụ cấp
  const totalAllowances = calculateTotalAllowances(emp.allowances);
  // 2. Tổng khấu trừ khác
  const totalDeductions = calculateTotalDeductions(emp.deductions);
  // 3. Lương OT
  const overtimePay = calculateOvertime({ baseSalary: emp.baseSalary, overtimeHours: emp.overtimeHours });
  // 4. Lương thực tế theo ngày công
  const actualWorkPay = (emp.baseSalary / WORKING_DAYS_PER_MONTH) * (emp.workDays || WORKING_DAYS_PER_MONTH);
  // 5. Tổng thu nhập gross
  const grossSalary = actualWorkPay + totalAllowances + overtimePay;
  // 6. Bảo hiểm bắt buộc
  const insurance = calculateTotalInsurance(emp.baseSalary);
  // 7. Thuế TNCN
  const incomeTax = calculateIncomeTax({ grossSalary, baseSalary: emp.baseSalary, dependents: emp.dependents || 0 });
  // 8. Lương thực nhận
  const netSalary = grossSalary - insurance - incomeTax - totalDeductions;
  return {
    baseSalary: emp.baseSalary,
    actualWorkPay: Math.round(actualWorkPay),
    totalAllowances: Math.round(totalAllowances),
    overtimePay: Math.round(overtimePay),
    grossSalary: Math.round(grossSalary),
    insurance: Math.round(insurance),
    incomeTax: Math.round(incomeTax),
    totalDeductions: Math.round(totalDeductions),
    netSalary: Math.round(netSalary)
  };
}

// Tổng chi phí doanh nghiệp (bao gồm phần công ty đóng bảo hiểm)
export function calculateTotalCompanyCost(emp) {
  const actualWorkPay = (emp.baseSalary / SALARY_CONFIG.WORKING_DAYS_PER_MONTH) * (emp.workDays || SALARY_CONFIG.WORKING_DAYS_PER_MONTH);
  const overtimePay = calculateOvertime({ baseSalary: emp.baseSalary, overtimeHours: emp.overtimeHours });
  const totalAllowances = calculateTotalAllowances(emp.allowances);
  // Phần bảo hiểm công ty đóng
  const salaryForInsurance = Math.min(emp.baseSalary, SALARY_CONFIG.MAX_INSURANCE_SALARY);
  const employerInsurance =
    salaryForInsurance * 0.175 + // BHXH 17.5%
    salaryForInsurance * 0.03 +  // BHYT 3%
    salaryForInsurance * 0.01;   // BHTN 1%
  return Math.round(actualWorkPay + overtimePay + totalAllowances + employerInsurance);
}