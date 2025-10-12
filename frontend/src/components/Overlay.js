import React, { useEffect } from "react";

const Overlay = ({ onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className=" p-6 rounded shadow-lg z-60"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Overlay;
