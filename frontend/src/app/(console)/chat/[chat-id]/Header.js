import React from "react";

const Header = ({ created_at }) => {
  if (!created_at) {
    return (
      <div className="p-4 text-md font-bold flex justify-center text-neutral-400">
        <p>Loading...</p>
      </div>
    );
  }

  const date = new Date(created_at);

  const formattedDate = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const displayDate = formattedDate.replace(",", " ·");

  return (
    <div className="p-4 text-md font-bold flex justify-center text-neutral-300 border-b border-neutral-700">
      <p>{displayDate}</p>
    </div>
  );
};

export default Header;
