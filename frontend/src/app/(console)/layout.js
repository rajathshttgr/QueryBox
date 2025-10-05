"use client";
import MenuBar from "./menuBar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 flex-shrink-0">
        <MenuBar />
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
