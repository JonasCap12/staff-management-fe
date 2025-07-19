import { useState, useMemo, useCallback } from 'react';
import { getReportData, getStats, getDepartmentChartData, getDepartmentPieData, getSalaryChartData, getLeaveStat, getTopPerformers } from '../utils/reportUtils';

const months = ['01/2024', '02/2024', '03/2024', '04/2024', '05/2024', '06/2024'];
const departments = ['Phòng Nhân sự', 'Phòng Kỹ thuật', 'Phòng Kinh doanh', 'Phòng Kế toán'];

const useReportData = () => {
  // State cho filters
  const [selectedMonth, setSelectedMonth] = useState('06/2024');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dữ liệu mock
  const rawData = useMemo(() => getReportData(), []);

  // Dữ liệu đã lọc
  const filteredData = useMemo(() => {
    let data = { ...rawData };
    
    if (selectedMonth) {
      data.salaryByMonth = data.salaryByMonth.filter(item => item.month === selectedMonth);
      data.leaveStats = data.leaveStats.filter(item => item.month === selectedMonth);
      data.topPerformers = data.topPerformers.filter(item => item.month === selectedMonth);
      data.turnover = data.turnover.filter(item => item.month === selectedMonth);
    }
    
    if (selectedDepartment) {
      data.employees = data.employees.filter(item => item.department === selectedDepartment);
      data.topPerformers = data.topPerformers.filter(item => item.department === selectedDepartment);
    }
    
    return data;
  }, [rawData, selectedMonth, selectedDepartment]);

  // Tính toán thống kê tổng quan
  const stats = useMemo(() => getStats(filteredData), [filteredData]);

  // Dữ liệu cho các component con
  const departmentChartData = useMemo(() => getDepartmentChartData(filteredData.employees), [filteredData.employees]);
  const departmentPieData = useMemo(() => getDepartmentPieData(filteredData.employees), [filteredData.employees]);
  const salaryChartData = useMemo(() => getSalaryChartData(filteredData.salaryByMonth), [filteredData.salaryByMonth]);
  const leaveStat = useMemo(() => getLeaveStat(filteredData.leaveStats), [filteredData.leaveStats]);
  const topPerformers = useMemo(() => getTopPerformers(filteredData.topPerformers), [filteredData.topPerformers]);
  const turnoverChartData = useMemo(() => filteredData.turnover, [filteredData.turnover]);
  const events = useMemo(() => filteredData.events || [], [filteredData.events]);

  // Handlers cho filters
  const handleMonthChange = useCallback((month) => {
    setSelectedMonth(month);
  }, []);

  const handleDepartmentChange = useCallback((department) => {
    setSelectedDepartment(department);
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedMonth('06/2024');
    setSelectedDepartment('');
  }, []);

  // Export data function
  const exportReportData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const exportData = {
        stats,
        departmentData: departmentChartData,
        salaryData: salaryChartData,
        leaveData: leaveStat,
        topPerformers,
        turnoverData: turnoverChartData,
        events,
        filters: { selectedMonth, selectedDepartment },
        exportDate: new Date().toISOString()
      };

      console.log('Exporting data:', exportData);
      
      // Simulate download
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hr-report-${selectedMonth || 'all'}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [stats, departmentChartData, salaryChartData, leaveStat, topPerformers, turnoverChartData, events, selectedMonth, selectedDepartment]);

  // Refresh data function
  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call to refresh data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Data refreshed successfully');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // Data
    stats,
    departmentChartData,
    departmentPieData,
    salaryChartData,
    topPerformers,
    leaveStat,
    turnoverChartData,
    events,
    
    // Filters
    selectedMonth,
    selectedDepartment,
    departments,
    months,
    
    // State
    loading,
    error,
    
    // Handlers
    handleMonthChange,
    handleDepartmentChange,
    resetFilters,
    exportReportData,
    refreshData
  };
};

export default useReportData; 