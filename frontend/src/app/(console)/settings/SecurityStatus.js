import React from "react";

const SecurityStatus = () => {
  return (
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
  );
};

export default SecurityStatus;
