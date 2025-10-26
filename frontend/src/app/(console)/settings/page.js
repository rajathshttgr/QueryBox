"use client";
import React, { useState, useEffect } from "react";
import SideMenuBar from "./SideMenuBar.js";
import CreditUsage from "./CreditUsage.js";
import AccountInfo from "./AccountInfo.js";
import PlanUpgrade from "./PlanUpgrade.js";
import SecurityStatus from "./SecurityStatus.js";
import { MonitorSmartphone } from "lucide-react";
import useSendRequest from "@/hooks/useSendRequest";

const Settings = () => {
  const { sendRequest, loading, error } = useSendRequest();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await sendRequest({
          route: "user/profile",
          method: "GET",
          isAuthRoute: false,
        });
        setName(data.name);
        setEmail(data.email);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="hidden md:block h-screen">
        <div className="min-h-screen flex bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors">
          <SideMenuBar name={name} email={email} />

          <main className="flex-1 p-8">
            <header className="mb-6">
              <h1 className="text-2xl font-semibold">Settings</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Manage your account, billing and preferences.
              </p>
            </header>
            <div className="grid grid-cols-12 gap-6">
              <section className="col-span-8 flex flex-col gap-6">
                <CreditUsage />
                <AccountInfo
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                />
              </section>
              <aside className="col-span-4 flex flex-col gap-6">
                <PlanUpgrade />
                <SecurityStatus />
              </aside>
            </div>
          </main>
        </div>
      </div>

      <div className="md:hidden flex flex-col justify-center items-center h-screen p-4 text-center gap-4">
        <MonitorSmartphone size={48} className="text-neutral-400" />
        <p className="text-lg font-medium">
          Currently settings dashboard available for desktop devices only
        </p>
        <p className="text-sm text-neutral-500">Switch to Desktop mode</p>
      </div>
    </>
  );
};

export default Settings;
