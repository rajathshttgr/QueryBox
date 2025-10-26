import React from "react";

const CreditUsage = () => {
  return (
    <div>
      {" "}
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
            <span className="w-3 h-3 bg-neutral-200 rounded-sm inline-block" />
            <span>Used</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-neutral-300 dark:bg-neutral-700 rounded-sm inline-block" />
            <span>Remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditUsage;
