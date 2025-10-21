"use client";
import React, { useEffect, useRef } from "react";
import { Clipboard, Check, ThumbsUp } from "lucide-react";

const TypingDots = () => (
  <div className="flex gap-1 mt-1">
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
  </div>
);

const Messages = ({ messages }) => {
  const [copiedMsgId, setCopiedMsgId] = React.useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleCopy = async (msgId, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMsgId(msgId);
      setTimeout(() => setCopiedMsgId(null), 2000);
    } catch (error) {
      console.error("Clipboard copy failed:", error);
    }
  };

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-auto text-sm md:px-52 px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900"
    >
      {messages.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          No messages yet. Start the conversation 👋
        </div>
      )}

      {messages.map((msg) => (
        <div key={msg.id} className="flex w-full">
          {msg.sender !== "QueryBox-Bot" ? (
            <div className="ml-auto bg-neutral-700 text-white p-3 rounded-2xl max-w-lg break-words whitespace-pre-wrap shadow">
              {msg.content}
            </div>
          ) : (
            <div className="flex items-start gap-2 w-full">
              <div className="bg-neutral-500 rounded-full h-10 w-10 flex-shrink-0 flex justify-center items-center text-lg font-bold">
                Q
              </div>
              <div className="relative bg-neutral-800 text-white p-3 rounded-2xl max-w-lg break-words whitespace-pre-wrap shadow flex flex-col">
                {msg.content === "Generating response..." ? (
                  <TypingDots />
                ) : (
                  <div>{msg.content}</div>
                )}
                {msg.content !== "Generating response..." && (
                  <div className="flex">
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="self-start mt-2 text-gray-400 hover:text-white transition"
                      title="Copy response"
                    >
                      {copiedMsgId === msg.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Clipboard className="w-4 h-4" />
                      )}
                    </button>
                    <button>
                      <ThumbsUp className="w-4 h-4 text-gray-400 hover:text-white transition m-2" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;
