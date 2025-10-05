"use client";
import React, { useState, useEffect } from "react";
import {
  Plus,
  Upload,
  Edit3,
  PanelRight,
  Database,
  Youtube,
} from "lucide-react";
import useSendRequest from "@/hooks/useSendRequest";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MenuBar = () => {
  const { sendRequest, loading, error } = useSendRequest();
  const [chats, setChats] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await sendRequest({
          route: "chat/history/",
          method: "GET",
          isAuthRoute: false,
        });
        setChats(data || []);
      } catch (err) {
        console.error("Error fetching chat history:", err);
        setChats([]);
      }
    };

    fetchUserData();
  }, [sendRequest]);

  const [activeChatId, setActiveChatId] = useState(null);

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="p-4 text-lg font-bold flex justify-between">
        <p>QueryBox</p>
        <div className="cursor-pointer hover:bg-neutral-700 p-1 rounded-md">
          <PanelRight className="h-5 w-5" />
        </div>
      </div>

      <div className="flex-1 p-3 overflow-auto text-sm text-neutral-50">
        <div className="space-y-1 mb-6">
          <Link href="/chat/">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-neutral-200 hover:text-neutral-800 p-2 rounded-md">
              <Plus size={16} /> New Chat
            </label>
          </Link>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-neutral-200 hover:text-neutral-800 p-2 rounded-md">
            <Upload size={16} /> Upload PDFs
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-neutral-200 hover:text-neutral-800 p-2 rounded-md">
            <Edit3 size={16} /> Add Notes
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-neutral-200 hover:text-neutral-800 p-2 rounded-md">
            <Database size={16} /> Connect Database
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-neutral-200 hover:text-neutral-800 p-2 rounded-md">
            <Youtube size={20} /> Enter Youtube URL
          </label>
        </div>

        <div>
          <p className="text-xs  text-neutral-300 mb-2 p-1">Chats</p>
          <div className="space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-2 rounded-lg cursor-pointer ${
                  activeChatId === chat.id
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
                onClick={() => {
                  setActiveChatId(chat.id);
                  router.push(`/chat/${chat.id}`);
                }}
              >
                {chat.chat_title}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-neutral-700">
        <Link href="/profile" className=" flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-neutral-600"></div>
          <span className="text-sm">Rajath Shettigar</span>
        </Link>
      </div>
    </div>
  );
};

export default MenuBar;
