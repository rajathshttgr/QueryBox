"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MenuBar from "./menuBar";
import { Menu } from "lucide-react";

const Layout = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) return null;

  return (
    <div className="flex min-h-screen relative">
      <div
        className={`fixed md:static z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } w-64 flex-shrink-0`}
      >
        <MenuBar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 overflow-auto">
        <div className="md:hidden absolute left-4 top-4 ">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-neutral-50 bg-neutral-800 rounded-md"
          >
            <Menu size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
