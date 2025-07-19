import React from "react";
import { useDocument } from "../context/DocumentContext";
import FilterBar from "../../../components/common/FilterBar";
import customSelectStyle from "../../../components/common/CustomSelectStyle";

const typeOptions = [
  "Tất cả tài liệu",
  "Chính sách",
  "Mẫu đơn",
  "Hướng dẫn",
  "Quy định",
];

const creatorOptions = ["Tất cả người tạo", "Nguyễn Văn A", "Trần Thị B"];

const DocumentFilters = () => {
  const { filters, setFilters } = useDocument();

  return (
    <FilterBar
      filters={[
        {
          type: "text",
          key: "search",
          label: "Tìm kiếm tên tài liệu",
          value: filters.search || "",
          onChange: (val) =>
            setFilters((f) => ({ ...f, search: val || undefined })),
        },
        {
          type: "select",
          key: "type",
          label: "Loại tài liệu",
          value: filters.type || "Tất cả tài liệu",
          onChange: (val) =>
            setFilters((f) => ({
              ...f,
              type: val === "Tất cả tài liệu" ? undefined : val,
            })),
          options: typeOptions.map((opt) => ({
            value: opt,
            label: opt,
          })),
          style: customSelectStyle,
        },
        {
          type: "select",
          key: "creator",
          label: "Người tạo",
          value: filters.creator || "Tất cả người tạo",
          onChange: (val) =>
            setFilters((f) => ({
              ...f,
              creator: val === "Tất cả người tạo" ? undefined : val,
            })),
          options: creatorOptions.map((opt) => ({
            value: opt,
            label: opt,
          })),
          style: customSelectStyle,
        },
        {
          type: "custom",
          key: "createdAt",
          render: () => (
            <input
              type="date"
              className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
              value={filters.createdAt || ""}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  createdAt: e.target.value || undefined,
                }))
              }
            />
          ),
        },
      ]}
      activeFilters={[
        filters.search && {
          key: "search",
          label: `Tìm kiếm: "${filters.search}"`,
        },
        filters.type && { key: "type", label: `Loại: ${filters.type}` },
        filters.creator && {
          key: "creator",
          label: `Người tạo: ${filters.creator}`,
        },
        filters.createdAt && {
          key: "createdAt",
          label: `Ngày tạo: ${filters.createdAt}`,
        },
      ].filter(Boolean)}
      onRemoveFilter={(key) => {
        setFilters((f) => ({ ...f, [key]: undefined }));
      }}
      onResetFilters={() => {
        setFilters({});
      }}
    />
  );
};

export default DocumentFilters;
