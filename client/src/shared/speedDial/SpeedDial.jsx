import React, { useState } from "react";
import "./SpeedDial.css";

export const SpeedDial = ({ handleNavigateBack }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div data-dial-init className="fixed end-6 bottom-6 group">
      <div
        id="speed-dial-menu-default"
        className={`flex flex-col items-center ${
          isOpen ? "block" : "hidden"
        } mb-4 space-y-2`}
      >
        {/* Navigate Back Button */}
        <div className="relative group">
          <button
            onClick={() => {
              handleNavigateBack();
              toggleMenu();
            }}
            type="button"
            className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 19a1 1 0 0 1-.71-.29l-6.5-6.5a1 1 0 0 1 0-1.42l6.5-6.5a1 1 0 1 1 1.42 1.42L10.92 12l5.29 5.29a1 1 0 0 1-.71 1.71Z" />
            </svg>
            <span className="sr-only">Navigate Back</span>
          </button>
          <div
            className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              top: "50%",
              right: "100%",
              transform: "translateY(-50%)",
            }}
          >
            Back
          </div>
        </div>
        <div className="relative group">
          <button
            type="button"
            className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.108 3.405a1 1 0 0 0 .95.69h3.584c.969 0 1.371 1.24.588 1.81l-2.9 2.107a1 1 0 0 0-.364 1.118l1.108 3.405c.3.921-.755 1.688-1.539 1.118l-2.9-2.107a1 1 0 0 0-1.176 0l-2.9 2.107c-.784.57-1.838-.197-1.539-1.118l1.108-3.405a1 1 0 0 0-.364-1.118L2.819 8.832c-.783-.57-.38-1.81.588-1.81h3.584a1 1 0 0 0 .95-.69l1.108-3.405z" />
            </svg>
            <span className="sr-only">Explore Services</span>
          </button>
          <div
            className="absolute z-10 flex flex-col items-center px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              top: "50%",
              right: "100%",
              transform: "translateY(-50%)",
            }}
          >
            <div className="flex">
              <span>Explore</span>
              <span>&nbsp;Services</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bounce">
        <button
          onClick={toggleMenu}
          type="button"
          data-dial-toggle="speed-dial-menu-default"
          aria-controls="speed-dial-menu-default"
          aria-expanded={isOpen}
          className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:rotate-45"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
          <span className="sr-only">Open actions menu</span>
        </button>
      </div>
    </div>
  );
};
