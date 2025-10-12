"use client";
import React, { useEffect, useState } from "react";
import { FileSearch, X } from "lucide-react";
import { useRouter } from "next/navigation";
import useSendRequest from "@/hooks/useSendRequest";
import useSelectedDocStore from "@/store/useSelectedDocStore";

const ChatHeader = ({ created_at }) => {
  const router = useRouter();
  const { sendRequest } = useSendRequest();
  const selectedDocId = useSelectedDocStore((state) => state.selectedDocId);
  const setSelectedDocId = useSelectedDocStore(
    (state) => state.setSelectedDocId
  );

  const [docName, setDocName] = useState("");

  useEffect(() => {
    const fetchDoc = async () => {
      if (!selectedDocId) {
        setDocName("");
        return;
      }
      try {
        const data = await sendRequest({
          route: `docs/${selectedDocId}`,
          method: "GET",
          isAuthRoute: false,
        });
        setDocName(data?.doc_name || "");
      } catch (err) {
        console.error("Failed to fetch document:", err);
        setDocName("");
      }
    };
    fetchDoc();
  }, [selectedDocId, sendRequest]);

  const handleDeselect = () => setSelectedDocId(null);

  const formattedDate = created_at
    ? new Date(created_at)
        .toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace(",", " ·")
    : "";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-2 bg-neutral-800 border-b border-neutral-700 text-neutral-300 gap-3">
      <div
        className={`flex items-center gap-2 px-3 py-[10px] rounded-full cursor-pointer transition bg-neutral-900 hover:bg-neutral-700 max-w-full`}
        onClick={() => router.push("/upload")}
      >
        <FileSearch className="w-5 h-5 text-gray-300 flex-shrink-0" />
        {docName ? (
          <div className="flex items-center gap-2">
            <span className="text-sm truncate max-w-xs" title={docName}>
              {docName}
            </span>
            <X
              tabIndex={0}
              className="w-4 h-4 text-gray-400 hover:text-neutral-100 cursor-pointer flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                handleDeselect();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleDeselect();
              }}
            />
          </div>
        ) : (
          <span className="text-sm text-gray-400">Select a document</span>
        )}
      </div>

      {formattedDate && (
        <div className="hidden md:flex text-sm text-neutral-400 flex-shrink-0">
          {formattedDate}
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
