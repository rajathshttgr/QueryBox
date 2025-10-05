"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useSendRequest from "@/hooks/useSendRequest";
import Header from "./Header";
import Messages from "./Messages";

const Chats = () => {
  const [newChats, setnewChats] = useState(null);
  const { sendRequest, loading, error } = useSendRequest();
  const pathname = usePathname();
  const chatId = pathname?.split("/chat/")[1];

  useEffect(() => {
    if (!chatId) return;
    const fetchNewChats = async () => {
      try {
        const data = await sendRequest({
          route: `chat/${chatId}`,
          method: "GET",
          isAuthRoute: false,
        });
        setnewChats(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching chats for this:", err);
      }
    };

    fetchNewChats();
  }, [sendRequest, chatId]);

  return (
    <div className="bg-neutral-800 h-screen w-full flex flex-col">
      <Header created_at={newChats?.created_at} />
      <Messages messages={newChats?.messages} />

      <div className="p-4 flex items-center justify-center ">
        <input
          type="text"
          placeholder="Ask a question..."
          className="w-3/5 px-5 py-3 m-2 text-md rounded-full border-none focus:outline-none bg-neutral-700 text-white placeholder-gray-400 shadow-lg"
        />
      </div>
    </div>
  );
};

export default Chats;
