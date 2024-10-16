import React from "react";

export const Skeleton = ({
  width = "100%",
  height = "100vh",
  borderRadius = "",
}) => {
  return (
    <div
      role="status"
      className="flex items-center justify-center bg-gray-300 rounded-lg animate-pulse dark:bg-gray-800"
      style={{ width, height, borderRadius }}
    >
      <svg
        className="w-screen h-10 text-gray-200 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 20"
      >
        <rect
          x="1"
          y="1"
          width="14"
          height="18"
          rx="2"
          ry="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="8" cy="10" r="3" fill="currentColor" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
