import { useState } from 'react';

export function useSalaryData(initialData) {
  const [employees, setEmployees] = useState(initialData);
  const addEmployee = (emp) => setEmployees(prev => [...prev, emp]);
  const updateEmployee = (emp) => setEmployees(prev => prev.map(e => e.id === emp.id ? emp : e));
  const deleteEmployee = (id) => setEmployees(prev => prev.filter(e => e.id !== id));
  return { employees, setEmployees, addEmployee, updateEmployee, deleteEmployee };
}