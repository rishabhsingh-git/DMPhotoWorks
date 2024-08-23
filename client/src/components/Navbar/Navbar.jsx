import React, { useState } from 'react';
import DMLogo from "../../assets/DMLogo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative z-50">
      <nav className="flex flex-col md:flex-row items-center justify-center p-4">
        {/* Logo */}
        <div className="relative mb-4 md:mb-0 flex items-center justify-center">
          <img
            src={DMLogo}
            alt="My Logo"
            className={`w-23 h-25 md:w-38 md:h-38 lg:w-80 lg:h-80 ${isMenuOpen ? 'md:hidden' : 'md:block'}`}
            style={{ height: 'auto' }}
          />
        </div>

        {/* Hamburger Menu Icon */}
        <button
          className="block md:hidden px-4 py-2 text-black hover:bg-blue-50 rounded"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Navlinks */}
        <ul className={`flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 list-none p-0 ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
          <li>
            <a
              className="block p-4 text-black"
              href="portfolio"
              style={{
                fontFamily: 'ui-monospace',
                fontWeight: 300,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '1.8em',
                letterSpacing: '.05em',
                textRendering: 'optimizeLegibility'
              }}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              className="block p-4 text-black"
              href="video"
              style={{
                fontFamily: 'ui-monospace',
                fontWeight: 300,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '1.8em',
                letterSpacing: '.05em',
                textRendering: 'optimizeLegibility'
              }}
            >
              Video
            </a>
          </li>
          <li>
            <a
              className="block p-4 text-black"
              href="about&contact"
              style={{
                fontFamily: 'ui-monospace',
                fontWeight: 300,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '1.8em',
                letterSpacing: '.05em',
                textRendering: 'optimizeLegibility'
              }}
            >
              About & Contact
            </a>
          </li>
          <li>
            <a
              className="block p-4 text-lg text-black"
              href="admin"
              style={{
                fontFamily: 'ui-monospace',
                fontWeight: 300,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '1.8em',
                letterSpacing: '.05em',
                textRendering: 'optimizeLegibility'
              }}
            >
              Admin
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
