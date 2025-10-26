"use client";
import React, { useState, useEffect, useCallback } from "react";
import DocumentCard from "@/components/cards/DocumentCard";
import DragAndDrop from "./dragAndDrop";
import useSendRequest from "@/hooks/useSendRequest";
import useSelectedDocStore from "@/store/useSelectedDocStore";

const Upload = () => {
  const { sendRequest } = useSendRequest();
  const [docsList, setDocsList] = useState([]);

  const { selectedDocId, toggleSelect, setSelectedDocId } =
    useSelectedDocStore();

  const fetchDocsList = useCallback(async () => {
    try {
      const data = await sendRequest({
        route: "docs/",
        method: "GET",
        isAuthRoute: false,
      });

      const docs = data || [];

      const sortedDocs = docs.sort(
        (a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at)
      );
      setDocsList(sortedDocs);
      if (sortedDocs.length > 0) {
        setSelectedDocId(sortedDocs[0].id);
      }
    } catch (err) {
      console.error("Error fetching docs list:", err);
      setDocsList([]);
    }
  }, [sendRequest, setSelectedDocId]);

  useEffect(() => {
    fetchDocsList();
  }, [fetchDocsList]);

  return (
    <div className="bg-neutral-900 py-10 h-screen overflow-y-auto">
      <DragAndDrop onUploadSuccess={fetchDocsList} />

      <div className="flex flex-col px-10 mx-auto flex-1 ">
        {docsList.map((doc) => (
          <div key={doc.id} onClick={() => toggleSelect(doc.id)}>
            <DocumentCard
              details={doc}
              status={doc.status}
              selected={selectedDocId === doc.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
