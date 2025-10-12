"use client";
import React, { useState, useRef } from "react";
import useSendRequest from "@/hooks/useSendRequest";

const DragAndDrop = ({ onUploadSuccess }) => {
  const { sendRequest, loading, error } = useSendRequest();
  const [file, setFile] = useState(null);
  const [previewName, setPreviewName] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewName(selectedFile.name);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreviewName(droppedFile.name);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      await sendRequest({
        route: "docs/upload",
        method: "POST",
        body: formData,
        isAuthRoute: false,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFile(null);
      setPreviewName(null);

      onUploadSuccess?.();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };
  return (
    <div
      className={`flex flex-col h-80 items-center justify-center mx-10 mb-6 border-2 border-dashed rounded-2xl py-10 cursor-pointer transition-all
        ${
          dragActive
            ? "border-blue-500 bg-neutral-700/60"
            : "border-neutral-700 bg-neutral-800/50"
        }
      `}
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx,.txt"
      />

      <div className="flex flex-col items-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-gray-400 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v4h16v-4"
          />
        </svg>

        <h2 className="text-white font-medium text-lg mb-1">
          {previewName ? previewName : "Upload your document"}
        </h2>
        <p className="text-gray-400 text-sm mb-3">
          {previewName
            ? "Click upload to send file"
            : "Click or drag & drop to select a file"}
        </p>
        <p className="text-gray-500 text-xs">
          Supports PDF, DOCX, or Text files up to 10 MB
        </p>

        {previewName && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFileUpload();
            }}
            disabled={loading}
            className="mt-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-medium px-4 py-2 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;
