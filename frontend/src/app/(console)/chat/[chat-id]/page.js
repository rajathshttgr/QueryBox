"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import useSendRequest from "@/hooks/useSendRequest";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const ChatPage = () => {
  const [chatData, setChatData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  const scrollRef = useRef(null);

  const pathname = usePathname();
  const chatId = pathname?.split("/chat/")[1];
  const { sendRequest } = useSendRequest();

  // Fetch chat data
  const fetchChat = useCallback(async () => {
    if (!chatId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await sendRequest({
        route: `chat/${chatId}`,
        method: "GET",
        isAuthRoute: false,
      });
      setChatData(data);
      setMessages(data.messages || []);
    } catch (err) {
      console.error("Error fetching chat:", err);
      setError("Failed to load chat. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [chatId, sendRequest]);

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSendMessage = useCallback(
    async (message, docId) => {
      if (!chatId) return;
      setSending(true);

      const tempId = `temp-${Date.now()}`;
      const userMsg = {
        id: Date.now().toString(),
        sender: "You",
        content: message,
        chat_id: chatId,
        created_at: new Date().toISOString(),
      };
      const botMsg = {
        id: tempId,
        sender: "QueryBox-Bot",
        content: "Generating response...",
      };

      setMessages((prev) => [...prev, userMsg, botMsg]);

      try {
        const data = await sendRequest({
          route: `chat/${chatId}`,
          method: "POST",
          body: { content: message, doc_id: docId },
          isAuthRoute: false,
        });

        setMessages((prev) =>
          prev.map((m) =>
            m.id === tempId ? { ...m, content: data.content } : m
          )
        );
      } catch (err) {
        console.error(err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === tempId
              ? { ...m, content: "⚠️ Failed to send message." }
              : m
          )
        );
      } finally {
        setSending(false);
      }
    },
    [chatId, sendRequest]
  );

  if (loading) {
    return (
      <div className="bg-neutral-800 h-screen flex items-center justify-center text-gray-400">
        Loading chat...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-neutral-800 h-screen flex flex-col items-center justify-center text-gray-400 gap-4">
        <p>{error}</p>
        <button
          onClick={fetchChat}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-neutral-800 h-screen w-full flex flex-col">
      <ChatHeader created_at={chatData.created_at} />
      <div className="flex-1 overflow-y-auto" ref={scrollRef}>
        <Messages messages={messages} />
      </div>
      <MessageInput
        chatId={chatId}
        onSendMessage={handleSendMessage}
        disabled={sending}
      />
    </div>
  );
};

export default ChatPage;
