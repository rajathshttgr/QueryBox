"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Upload,
  Edit3,
  Database,
  Youtube,
  Trash2,
  SquarePen,
  X,
  Check,
  Settings,
} from "lucide-react";
import useSendRequest from "@/hooks/useSendRequest";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const MenuBar = ({ closeSidebar }) => {
  const { sendRequest } = useSendRequest();
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [userProfile, setUserProfile] = useState("Example User");
  const router = useRouter();
  const pathname = usePathname();
  const debounceTimer = useRef(null);

  const fetchUserData = async () => {
    try {
      const data = await sendRequest({
        route: "chat/history/",
        method: "GET",
        isAuthRoute: false,
      });
      setChats(data || []);

      const chatIdFromUrl = pathname?.split("/chat/")[1]?.split("/")[0] || null;
      if (chatIdFromUrl && data.some((c) => c.id === chatIdFromUrl)) {
        setActiveChatId(chatIdFromUrl);
      }
    } catch (err) {
      console.error("Error fetching chat history:", err);
      setChats([]);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const data = await sendRequest({
        route: "user/profile",
        method: "GET",
        isAuthRoute: false,
      });
      setUserProfile(data?.name);
    } catch (err) {
      console.error("Error fetching User Profile:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserProfile();
  }, [pathname]);

  const deleteChat = async (chatid) => {
    try {
      await sendRequest({
        route: `chat/${chatid}`,
        method: "DELETE",
        isAuthRoute: false,
      });
      await fetchUserData();
      if (activeChatId === chatid) router.push("/chat/");
    } catch (err) {
      console.error("Error deleting chat:", err);
      alert("Failed to delete chat.");
    }
  };

  const renameChat = async (chatid, newName) => {
    if (!newName.trim()) return;
    try {
      await sendRequest({
        route: `chat/${chatid}`,
        method: "PUT",
        body: { chat_title: newName },
        isAuthRoute: false,
      });
      await fetchUserData();
    } catch (err) {
      console.error("Error updating chat title:", err);
    }
  };

  const handleRenameFinish = (chatid) => {
    if (editTitle.trim()) renameChat(chatid, editTitle);
    setEditingChatId(null);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-neutral-900 border-r border-r-neutral-800 text-neutral-100 relative">
      <div className="p-4 text-md font-bold flex justify-between items-center border-b border-neutral-800">
        <p>QueryBox</p>
        <button
          onClick={closeSidebar}
          className="md:hidden hover:bg-neutral-800 p-1 rounded-md"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 p-3 overflow-auto text-sm">
        <div className="space-y-1 mb-6">
          {[
            { href: "/chat/", icon: <Plus size={16} />, text: "New Chat" },
            {
              href: "/upload/",
              icon: <Upload size={16} />,
              text: "Upload PDFs",
            },
            { href: "/notes/", icon: <Edit3 size={16} />, text: "Add Notes" },
            {
              href: "/database/",
              icon: <Database size={16} />,
              text: "Connect Database",
            },
            {
              href: "/webscrap/",
              icon: <Youtube size={16} />,
              text: "Youtube URL",
            },
          ].map((item) => (
            <Link
              key={item.text}
              href={item.href}
              onClick={() => {
                setActiveChatId(null);
                if (closeSidebar) closeSidebar();
              }}
            >
              <label className="flex items-center gap-2 cursor-pointer hover:bg-neutral-200 hover:text-neutral-800 p-2 rounded-md transition">
                {item.icon} {item.text}
              </label>
            </Link>
          ))}
        </div>

        <div>
          <p className="text-xs text-neutral-400 mb-2 p-1">Chats</p>
          <div className="space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex justify-between items-center p-2 rounded-lg cursor-pointer group ${
                  activeChatId === chat.id
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-800"
                }`}
                onClick={() => {
                  if (editingChatId) return;
                  setActiveChatId(chat.id);
                  router.push(`/chat/${chat.id}`);
                  if (closeSidebar) closeSidebar();
                }}
              >
                {editingChatId === chat.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    autoFocus
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditTitle(val);
                      clearTimeout(debounceTimer.current);
                      debounceTimer.current = setTimeout(() => {
                        renameChat(chat.id, val);
                      }, 1000);
                    }}
                    onBlur={() => handleRenameFinish(chat.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRenameFinish(chat.id);
                      if (e.key === "Escape") setEditingChatId(null);
                    }}
                    className="flex-1 bg-transparent text-white rounded outline-none"
                  />
                ) : (
                  <p className="truncate flex-1">{chat.chat_title}</p>
                )}

                <div className="flex opacity-0 group-hover:opacity-100 transition ml-2">
                  {editingChatId !== chat.id ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingChatId(chat.id);
                          setEditTitle(chat.chat_title);
                        }}
                        className="text-neutral-50 hover:text-neutral-200 font-bold mr-2"
                      >
                        <SquarePen className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                        className="text-red-400 hover:text-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRenameFinish(chat.id);
                      }}
                      className="text-neutral-50 hover:text-neutral-100"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-neutral-800 flex justify-between items-center ">
        <div
          onClick={() => {
            router.push("/profile/");
            if (closeSidebar) closeSidebar();
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-neutral-600 flex justify-center items-center">
            {userProfile[0]}
          </div>
          <span className="text-sm">{userProfile}</span>
        </div>
        <div
          onClick={() => {
            router.push("/settings/");
            if (closeSidebar) closeSidebar();
          }}
          className="p-1 hover:bg-neutral-700 rounded-full"
        >
          <Settings className="h-4 w-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
