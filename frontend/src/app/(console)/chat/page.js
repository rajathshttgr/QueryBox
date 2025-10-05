"use client";
import React from "react";
import Button from "@/components/Button";
import useSendRequest from "@/hooks/useSendRequest";
import { SendHorizontal } from "lucide-react";

const Chat = () => {
  const { sendRequest, loading, error } = useSendRequest();
  const handleNewChat = async () => {
    try {
      const data = sendRequest({
        route: "chat/",
        method: "POST",
        isAuthRoute: false,
      });
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="bg-neutral-800 h-screen flex flex-col justify-center items-center">
      <h1>Transform your documents into intelligent conversations.</h1>
      <div className="w-3/5 mt-8 relative">
        <input
          type="text"
          placeholder="Ask a question..."
          className="w-full px-5 py-3 text-lg rounded-full border-none focus:outline-none bg-neutral-700 text-white placeholder-gray-400 shadow-lg pr-16"
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <Button
            disabled={false}
            text=""
            icon={<SendHorizontal />}
            variant="rocket"
            className="m-0"
            onClick={handleNewChat}
          />
        </div>
      </div>
      <p>{error ? error : ""}</p>
    </div>
  );
};

export default Chat;
