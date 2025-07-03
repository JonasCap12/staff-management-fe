import React from "react";
import { useDocument } from "../context/DocumentContext";

const DocumentTable = () => {
  const {
    documents,
    setSelectedDocument,
    setModals,
    userRole,
    handleDelete,
  } = useDocument();

  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Tên tài liệu</th>
          <th className="p-2 text-left">Loại</th>
          <th className="p-2 text-left">Người tạo</th>
          <th className="p-2 text-left">Ngày tạo</th>
          <th className="p-2 text-left">Phòng ban</th>
          <th className="p-2 text-center">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {documents.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center py-6 text-gray-500">
              Không có tài liệu nào.
            </td>
          </tr>
        ) : (
          documents.map((doc) => (
            <tr key={doc.id} className="border-b hover:bg-gray-50">
              <td className="p-2 cursor-pointer text-blue-700 hover:underline" onClick={() => { setSelectedDocument(doc); setModals(m => ({ ...m, preview: true })); }}>{doc.name}</td>
              <td className="p-2">{doc.type}</td>
              <td className="p-2">{doc.creator}</td>
              <td className="p-2">{doc.createdAt}</td>
              <td className="p-2">{doc.department}</td>
              <td className="p-2 text-center">
                <button className="text-blue-600 hover:underline mr-2" onClick={() => window.open(doc.url, "_blank")}>Tải xuống</button>
                <button className="text-green-600 hover:underline mr-2" onClick={() => { setSelectedDocument(doc); setModals(m => ({ ...m, preview: true })); }}>Xem</button>
                {userRole === "admin" && (
                  <>
                    <button className="text-yellow-600 hover:underline mr-2" onClick={() => { setSelectedDocument(doc); /* mở modal edit */ }}>Sửa</button>
                    <button className="text-red-600 hover:underline mr-2" onClick={() => handleDelete(doc.id)}>Xoá</button>
                    <button className="text-indigo-600 hover:underline" onClick={() => { setSelectedDocument(doc); setModals(m => ({ ...m, assign: true })); }}>Gán</button>
                  </>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DocumentTable; 