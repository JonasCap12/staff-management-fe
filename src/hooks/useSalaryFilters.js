import { useState, useMemo } from 'react';

export function useSalaryFilters(employees) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('2024-06');

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      return (
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.code.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (selectedDepartment === '' || emp.department === selectedDepartment) &&
      (selectedStatus === '' || emp.status === selectedStatus) &&
      emp.month === selectedMonth;
    });
  }, [employees, searchTerm, selectedDepartment, selectedStatus, selectedMonth]);

  return {
    searchTerm, setSearchTerm,
    selectedDepartment, setSelectedDepartment,
    selectedStatus, setSelectedStatus,
    selectedMonth, setSelectedMonth,
    filteredEmployees
  };
}