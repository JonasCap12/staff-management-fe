import { useState, useCallback } from 'react';

export const useSalaryData = (initialData = []) => {
  const [employees, setEmployees] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Thêm nhân viên mới
  const addEmployee = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const newEmployee = {
        ...data,
        id: Date.now() + Math.random(), // Đảm bảo id luôn unique
        createdAt: new Date().toISOString()
      };
      setEmployees(prev => [newEmployee, ...prev]); // Thêm lên đầu danh sách
      console.log('Đã thêm:', newEmployee);
      return newEmployee;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cập nhật thông tin nhân viên
  const updateEmployee = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      setEmployees(prev =>
        prev.map(emp =>
          emp.id === data.id ? { ...emp, ...data } : emp
        )
      );
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Xóa nhân viên
  const deleteEmployee = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Import danh sách nhân viên
  const importEmployees = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      const importedEmployees = data.map(emp => ({
        ...emp,
        id: Date.now() + Math.random(), // Tạm tạo ID
        createdAt: new Date().toISOString()
      }));

      setEmployees(prev => [...importedEmployees, ...prev]);
      return importedEmployees;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Xử lý phê duyệt lương
  const processApproval = useCallback(async (id, { approved, notes }) => {
    try {
      setLoading(true);
      setError(null);
      setEmployees(prev =>
        prev.map(emp =>
          emp.id === id
            ? {
                ...emp,
                status: approved ? 'Đã thanh toán' : 'Từ chối',
                notes,
                processedAt: new Date().toISOString()
              }
            : emp
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    employees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    importEmployees,
    processApproval
  };
};
