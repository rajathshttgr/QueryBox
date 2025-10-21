import React from "react";

const LoadingV2 = ({ message = "" }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 space-y-4 animate-pulse">
      <div className="flex items-center space-x-3">
        <div className="h-4 w-4 bg-red-500 rounded-full animate-bounce"></div>
        <div className="h-4 w-4 bg-red-400 rounded-full animate-bounce delay-150"></div>
        <div className="h-4 w-4 bg-red-300 rounded-full animate-bounce delay-300"></div>
      </div>
      <p className="text-lg sm:text-xl font-medium text-neutral-600 dark:text-neutral-300 text-center px-4">
        {message}
      </p>
    </div>
  );
};

export default LoadingV2;
