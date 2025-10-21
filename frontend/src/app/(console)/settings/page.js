"use client";
import React, { useState } from "react";

const Settings = () => {
  const [name, setName] = useState("Rajath Shettigar");
  const [email, setEmail] = useState("useremail@gmail.com");

  return (
    <>
      <div className="hidden md:block h-screen">
        <div className="min-h-screen flex bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors">
          <aside className="w-72 p-6 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-500 text-white flex items-center justify-center font-semibold">
                  {name[0]}
                </div>
                <div>
                  <div className="font-medium">{name}</div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {email}
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
                <button className="w-full mt-3 px-3 py-2 rounded-md border border-red-300 text-red-600 dark:text-red-400 dark:border-red-700">
                  Logout
                </button>
              </div>
            </div>
          </aside>

          <main className="flex-1 p-8">
            <header className="mb-6">
              <h1 className="text-2xl font-semibold">Settings</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Manage your account, billing and preferences.
              </p>
            </header>

            <div className="grid grid-cols-12 gap-6">
              <section className="col-span-8 flex flex-col gap-6">
                <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-medium">Credits Usage</h2>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Monitor how your credits are being consumed.
                      </p>
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      Last 30 days
                    </div>
                  </div>

                  <div
                    aria-label="credits-usage-placeholder"
                    className="mt-4 h-52 rounded-md border-2 border-dashed border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 flex items-center justify-center text-neutral-400"
                  >
                    Credit Usage Chart Placeholder
                  </div>

                  <div className="mt-4 flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-red-500 rounded-sm inline-block" />
                      <span>Used</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-neutral-300 dark:bg-neutral-700 rounded-sm inline-block" />
                      <span>Remaining</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5">
                  <h3 className="text-lg font-medium mb-3">Account</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex flex-col text-sm">
                      <span className="text-neutral-600 dark:text-neutral-300 mb-1">
                        Full name
                      </span>
                      <input
                        className="px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </label>

                    <label className="flex flex-col text-sm">
                      <span className="text-neutral-600 dark:text-neutral-300 mb-1">
                        Email
                      </span>
                      <input
                        className="px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md">
                      Save changes
                    </button>
                    <button className="px-4 py-2 border rounded-md border-neutral-200 dark:border-neutral-800">
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="hidden bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5">
                  <h3 className="text-lg font-medium mb-3">Preferences</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email notifications</div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        Receive updates and tips.
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-neutral-200 rounded-full peer-checked:bg-red-600 transition" />
                    </label>
                  </div>
                </div>
              </section>

              <aside className="col-span-4 flex flex-col gap-6">
                <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5">
                  <h4 className="text-sm text-neutral-500 dark:text-neutral-400">
                    Plan
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="font-medium">Pro</div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        Up to 100k credits / mo
                      </div>
                    </div>
                    <button className="px-3 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-sm">
                      Manage
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5">
                  <h4 className="text-sm text-neutral-500 dark:text-neutral-400">
                    Security
                  </h4>
                  <div className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                    Last sign-in:{" "}
                    <span className="text-neutral-700 dark:text-neutral-200">
                      2 days ago
                    </span>
                  </div>
                  <div className="mt-4">
                    <button className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800">
                      Change password
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
      <div className="md:hidden flex"></div>
    </>
  );
};

export default Settings;
