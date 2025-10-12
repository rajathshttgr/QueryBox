"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, FileSearch, X } from "lucide-react";
import useSendRequest from "@/hooks/useSendRequest";
import useSelectedDocStore from "@/store/useSelectedDocStore";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

const NewChat = () => {
  const router = useRouter();
  const { sendRequest, loading } = useSendRequest();
  const selectedDocId = useSelectedDocStore((state) => state.selectedDocId);
  const setSelectedDocId = useSelectedDocStore(
    (state) => state.setSelectedDocId
  );

  const [query, setQuery] = useState("");
  const [sending, setSending] = useState(false);
  const [docName, setDocName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

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

  useEffect(() => {
    if (selectedDocId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedDocId]);

  const handleSend = async () => {
    if (!selectedDocId) {
      setError("Please select a document first.");
      return;
    }
    if (!query.trim()) {
      setError("Please enter a question.");
      return;
    }

    setError("");
    setSending(true);

    try {
      const chatData = await sendRequest({
        route: "chat/",
        method: "POST",
        isAuthRoute: false,
      });

      const chatId = chatData?.id;
      if (!chatId) throw new Error("Failed to create chat");

      await sendRequest({
        route: `chat/${chatId}`,
        method: "POST",
        isAuthRoute: false,
        body: {
          content: query,
          doc_id: selectedDocId,
        },
      });

      router.push(`/chat/${chatId}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while creating chat.");
    } finally {
      setSending(false);
    }
  };

  const handleDeselect = () => setSelectedDocId(null);

  return (
    <div className="bg-neutral-900 text-white h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">
        Transform your documents into intelligent conversations
      </h1>
      <p className="text-gray-400 text-sm text-center mb-8">
        Ask questions about your uploaded documents and get instant AI-powered
        answers.
      </p>

      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition ${
          docName
            ? "bg-neutral-800 hover:bg-neutral-700"
            : "bg-neutral-800 hover:bg-neutral-700"
        }`}
        onClick={() => router.push("/upload")}
      >
        <FileSearch className="w-5 h-5 text-gray-300" />
        {docName ? (
          <div className="flex items-center gap-2">
            <span className="text-sm truncate max-w-xs" title={docName}>
              {docName}
            </span>
            <X
              tabIndex={0}
              className="w-4 h-4 text-gray-400 hover:text-neutral-200 cursor-pointer"
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
          <span className="text-sm">Select a document</span>
        )}
      </div>

      <div className="w-full md:w-8/12 mt-10 relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={
            docName
              ? `Ask a question about "${docName}"`
              : "Select a document first to ask a question..."
          }
          className="w-full px-5 py-3 text-md rounded-full bg-neutral-800 text-white placeholder-gray-500 focus:outline-none pr-14 shadow-lg border border-neutral-700 transition"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={sending}
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <Button
            text=""
            icon={sending ? <Spinner /> : <ArrowRight className="w-6 h-6" />}
            variant="rocket"
            disabled={!selectedDocId || !query.trim() || sending}
            onClick={handleSend}
            className="m-0 rounded-full"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-400 mt-4 text-sm animate-fadeIn">{error}</p>
      )}
      {sending && (
        <p className="text-gray-400 mt-4 text-sm animate-pulse">
          Starting your chat...
        </p>
      )}
    </div>
  );
};

export default NewChat;
