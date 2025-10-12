import React from "react";

const Button = ({
  text = "Button",
  onClick,
  disabled = false,
  loading = false,
  width = "",
  className = "",
  style = {},
  type = "button",
  variant = "primary",
  icon = null,
  ariaLabel = "",
}) => {
  const baseStyles =
    "px-4 py-2 rounded transition-all duration-200 focus:outline-none";

  const variants = {
    primary:
      "w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-2 rounded-md hover:opacity-90 cursor-pointer transition-all duration-200",
    secondary: "w-full bg-neutral-200 my-1 text-neutral-800",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
    ghost:
      "font-medium p-2 px-5 rounded-md bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200",
    special:
      "font-medium p-4 px-5 rounded-full bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200 text-lg",
    rocket: `rounded-full w-8 h-8  flex justify-center items-center ${
      disabled
        ? "bg-neutral-700 text-neutral-500 hover:bg-neutral-600"
        : "bg-neutral-200 text-neutral-700 "
    }`,
  };

  const appliedVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel || text}
      className={`${baseStyles} ${appliedVariant} ${className}`}
      style={{ width, ...style }}
    >
      <div className="flex items-center justify-center space-x-2">
        {loading ? <span>Loading...</span> : <span>{text}</span>}
        {icon && <span>{icon}</span>}
      </div>
    </button>
  );
};

export default Button;
