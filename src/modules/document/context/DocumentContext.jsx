import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchDocuments,
  uploadDocument,
  deleteDocument,
  updateDocument,
  assignDocument,
} from "../services/documentApi";

const DocumentContext = createContext();

export const useDocument = () => useContext(DocumentContext);

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [modals, setModals] = useState({ upload: false, preview: false, assign: false });
  const [userRole] = useState("admin"); // mock role
  const [loading, setLoading] = useState(false);

  const loadDocuments = async (filters = {}) => {
    setLoading(true);
    const docs = await fetchDocuments(filters);
    setDocuments(docs);
    setLoading(false);
  };

  useEffect(() => {
    loadDocuments(filters);
    // eslint-disable-next-line
  }, [filters]);

  const handleUpload = async (file, meta) => {
    setLoading(true);
    await uploadDocument(file, meta);
    await loadDocuments(filters);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteDocument(id);
    await loadDocuments(filters);
    setLoading(false);
  };

  const handleUpdate = async (id, data) => {
    setLoading(true);
    await updateDocument(id, data);
    await loadDocuments(filters);
    setLoading(false);
  };

  const handleAssign = async (id, department) => {
    setLoading(true);
    await assignDocument(id, department);
    await loadDocuments(filters);
    setLoading(false);
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        filters,
        setFilters,
        selectedDocument,
        setSelectedDocument,
        modals,
        setModals,
        userRole,
        loading,
        loadDocuments,
        handleUpload,
        handleDelete,
        handleUpdate,
        handleAssign,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}; 