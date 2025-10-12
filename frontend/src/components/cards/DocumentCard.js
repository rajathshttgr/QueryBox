import React from "react";
import { Download, File } from "lucide-react";

const DocumentCard = ({ details, selected = false }) => {
  const getStatusColor = () => {
    switch (details?.status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-300/80 text-white";
      case "parsing":
        return "bg-blue-400/80 text-white";
      case "embedding":
        return "bg-purple-400/80 text-white";
      case "completed":
        return "bg-green-400/80 text-white";
      case "failed":
        return "bg-red-400/80 text-white";
      default:
        return "bg-gray-500/80 text-white";
    }
  };

  const renderIcon = () => {
    const type = details?.doc_name?.split(".").pop();
    return <File className="w-7 h-7 text-gray-400" />;
  };

  const handleFileDownload = () => {
    if (!details?.doc_url) return;
    window.open(details.doc_url, "_blank");
  };

  return (
    <div
      className={`
        flex flex-col bg-neutral-800/70 border rounded-lg p-4 m-2 
        shadow-sm hover:shadow-lg transition-all duration-300
        ${
          selected
            ? "border-neutral-300 sm:border-neutral-700"
            : "border-neutral-700"
        }
      `}
    >
      <div
        className="
          flex flex-col sm:flex-row 
          sm:items-center sm:justify-between 
          gap-4
        "
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="h-14 w-14 bg-neutral-700 rounded-xl flex items-center justify-center flex-shrink-0">
            {renderIcon()}
          </div>

          <div className="flex flex-col text-sm overflow-hidden">
            <p className="text-white font-medium truncate max-w-[240px] sm:max-w-[300px]">
              {details?.doc_name}
            </p>
            <p className="text-gray-400 text-xs truncate pt-1">
              ID: <span className="text-gray-500">{details?.id}</span>
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center justify-between sm:justify-end gap-4">
          <div
            className={`px-2 w-20 text-center py-1 text-[11px] font-semibold rounded-md ${getStatusColor()}`}
          >
            {details?.status?.toUpperCase()}
          </div>

          <button
            className="p-2 hover:bg-neutral-700 rounded-full transition-all"
            onClick={handleFileDownload}
          >
            <Download className="w-5 h-5 text-gray-300" />
          </button>

          <div className="relative">
            <div
              className={`w-5 h-5 rounded-full border-2 ${
                selected ? "border-white" : "border-gray-500"
              } flex items-center justify-center transition-all`}
            >
              {selected && (
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
