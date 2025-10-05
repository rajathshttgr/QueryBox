import React from "react";

const Messages = ({ messages }) => {
  if (!messages) {
    return <p>Loading..</p>;
  }
  return (
    <div className="flex-1 overflow-auto text-sm pr-44 py-4 space-y-6 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-evenly"
          }`}
        >
          <div
            className={`max-w-xl px-4 py-3 rounded-2xl leading-relaxed shadow-md ${
              msg.sender === "user"
                ? "bg-neutral-700 text-white rounded-br-none"
                : "bg-neutral-900 text-neutral-100 rounded-br-none h-44"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
