"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useSendRequest from "@/hooks/useSendRequest";

const SideMenuBar = ({ name, email }) => {
  const { sendRequest, loading, error } = useSendRequest();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await sendRequest({
        route: "auth/logout",
        method: "POST",
        isAuthRoute: false,
      });

      localStorage.removeItem("access_token");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <div>
      {" "}
      <aside className="w-72 p-6 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 h-screen">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-neutral-500 text-white flex items-center justify-center font-semibold">
              {name[0]}
            </div>
            <div>
              <div className="font-medium">{name}</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                {email.length > 24 ? email.slice(0, 24) + "..." : email}
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-2 pt-2">
            <button className="text-left px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900">
              Account
            </button>
            <button className="text-left px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900">
              Billing
            </button>
            <button className="text-left px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900">
              Preferences
            </button>
            <button className="text-left px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900">
              API & Keys
            </button>
          </nav>

          <div className="mt-auto">
            <button
              className="w-full mt-3 px-3 py-2 rounded-md border hover:bg-neutral-900 border-red-300 text-red-600 dark:text-red-400 dark:border-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideMenuBar;
