import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Download } from 'lucide-react';

const ExportButton = ({ data, fileName = 'export.xlsx', className = '' }) => {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  };

  return (
    <button
      onClick={handleExport}
      className={`bg-blue-600 text-white px-4 py-2 rounded-xl flex border-gray-200 hover:bg-gray-50 transition flex items-center gap-2 ${className}`}
    >
      <Download className="h-4 w-4" />
      Xuất file Excel
    </button>
  );
};

export default ExportButton;
