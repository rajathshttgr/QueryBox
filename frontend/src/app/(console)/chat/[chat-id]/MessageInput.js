"use client";
import React, { useState } from "react";
import useSendRequest from "@/hooks/useSendRequest";
import useSelectedDocStore from "@/store/useSelectedDocStore";
import { ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

const MessageInput = ({ onSendMessage }) => {
  const { loading } = useSendRequest();
  const selectedDocId = useSelectedDocStore((state) => state.selectedDocId);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedDocId) return;
    onSendMessage(input, selectedDocId);
    setInput("");
  };

  const isDisabled = !input.trim() || !selectedDocId || loading;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex items-center justify-center bg-neutral-800 sticky bottom-0 z-20"
    >
      <div className="w-full md:w-8/12 relative">
        <input
          type="text"
          placeholder={
            selectedDocId
              ? "Type your message..."
              : "Select a document first..."
          }
          className="w-full px-5 py-3 text-md rounded-full bg-neutral-800 text-white placeholder-gray-500 focus:outline-none pr-14 shadow-lg border border-neutral-700 transition"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <Button
            type="submit"
            text=""
            icon={loading ? <Spinner /> : <ArrowRight className="w-6 h-6" />}
            variant="rocket"
            disabled={isDisabled}
            className="m-0 rounded-full"
          />
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
