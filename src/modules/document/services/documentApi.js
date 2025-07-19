// documentApi.js
// Service xử lý API tài liệu nhân sự (mockup demo)

const mockDocuments = [
  {
    id: 1,
    name: "Quy định nghỉ phép.pdf",
    type: "Quy định",
    creator: "Nguyễn Văn A",
    createdAt: "2024-06-01",
    url: "/docs/quydinhnghiphep.pdf",
    department: "Phòng Nhân sự",
    fileType: "pdf",
  },
  {
    id: 2,
    name: "Mẫu đơn xin nghỉ.docx",
    type: "Mẫu đơn",
    creator: "Trần Thị B",
    createdAt: "2024-05-20",
    url: "/docs/maudon.docx",
    department: "Phòng HCQT",
    fileType: "docx",
  },
];

export const fetchDocuments = async (filters = {}) => {
  // Lọc theo filters (type, creator, createdAt)
  return new Promise((resolve) => {
    setTimeout(() => {
      let docs = [...mockDocuments];
      if (filters.type) docs = docs.filter((d) => d.type === filters.type);
      if (filters.creator) docs = docs.filter((d) => d.creator === filters.creator);
      if (filters.createdAt) docs = docs.filter((d) => d.createdAt === filters.createdAt);
      resolve(docs);
    }, 300);
  });
};

export const uploadDocument = async (file, meta) => {
  // Giả lập upload
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id: Date.now(), ...meta, name: file.name });
    }, 500);
  });
};

export const deleteDocument = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 300);
  });
};

export const updateDocument = async (_id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, ...data }), 300);
  });
};

export const downloadDocument = async (url) => {
  // Giả lập download
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, url }), 300);
  });
};

export const assignDocument = async (id, department) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, department }), 300);
  });
};
