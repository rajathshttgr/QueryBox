import React from "react";

const PlanUpgrade = () => {
  return (
    <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5">
      <h4 className="text-sm text-neutral-500 dark:text-neutral-400">Plan</h4>
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
  );
};

export default PlanUpgrade;
