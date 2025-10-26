import React from "react";

const AccountInfo = ({ name, setName, email, setEmail }) => {
  return (
    <div>
      {" "}
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
          <button className="px-4 py-2 bg-neutral-200 text-neutral-800 rounded-md">
            Save changes
          </button>
          <button className="px-4 py-2 border rounded-md border-neutral-200 dark:border-neutral-800">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
