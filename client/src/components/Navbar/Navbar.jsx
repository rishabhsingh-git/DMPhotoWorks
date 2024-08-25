import React, { useState } from "react";
import DMLogo from "../../assets/DMLogo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative z-50">
      <nav className="flex flex-col md:flex-row items-center justify-between p-4">
        <div className="flex items-center justify-between w-full">
          <img
            src={DMLogo}
            alt="My Logo"
            className="w-24 h-16 md:w-34 md:h-16 lg:w-40 lg:h-24"
            style={{ height: "auto" }}
          />

          <button
            className="block md:hidden px-4 py-2 hover:bg-blue-50 rounded"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        <ul
          className={`flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 list-none p-0 ${
            isMenuOpen ? "block" : "hidden"
          } md:flex`}
        >
          {["Home", "Portfolio", "Video", "About & Contact", "Admin"].map(
            (text, index) => (
              <button
                key={index}
                type="button"
                className="text-white bg-gray-800 rounded-full"
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  lineHeight: "1.6em",
                  whiteSpace: "nowrap",
                }}
              >
                <a
                  href={
                    text === "Home"
                      ? "/"
                      : text
                          .toLowerCase()
                          .replace(/ & /g, "")
                          .replace(/\s/g, "")
                  }
                  target={text === "Admin" ? "_self" : "_self"}
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "ui-monospace",
                    fontWeight: 300,
                    fontStyle: "normal",
                    letterSpacing: ".05em",
                    textRendering: "optimizeLegibility",
                  }}
                >
                  {text}
                </a>
              </button>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
