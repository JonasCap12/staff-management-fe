import { useState, useMemo } from 'react';

export function useSalaryFilters(employees = []) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchSearch =
        !searchTerm ||
        emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.code?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDepartment = !selectedDepartment || emp.department === selectedDepartment;
      const matchStatus = !selectedStatus || emp.status === selectedStatus;
      const matchMonth = !selectedMonth || emp.month === selectedMonth;
      return matchSearch && matchDepartment && matchStatus && matchMonth;
    });
  }, [employees, searchTerm, selectedDepartment, selectedStatus, selectedMonth]);

  return {
    filteredEmployees,
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    selectedStatus,
    setSelectedStatus,
    selectedMonth,
    setSelectedMonth,
    loading: false // có thể thêm loading nếu cần
  };
}