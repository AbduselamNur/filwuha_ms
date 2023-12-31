import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Notification from './Notification';

function Navbar() {
  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname === path
      ? 'bg-primaryColor rounded-2xl'
      : 'hover:scale-105';
  };
  return (
    <nav className="bg-gray-300 sticky top-0 w-full h-20 shadow-lg border transition-all">
      <div className="mx-auto flex justify-between items-center h-full">
        <Link to="/" className="flex items-center py-3 px-8">
          <h1 className="text-4xl font-bold text-blue-950">FILEWUHA</h1>
        </Link>
        <ul className="flex items-center gap-1 relative" id="menu">
          <li className="mr-2 absolute -left-10 top-1 hover:bg-blue-300 rounded-full">
            <Notification />
          </li>
          <li>
            <Link
              to="/"
              className={`text-blue-950 font-bold py-2 px-6 text-lg ${getActiveClass(
                '/'
              )}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={`text-blue-950 font-bold py-2 px-6 text-lg ${getActiveClass(
                '/services'
              )}`}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`text-blue-950 font-bold py-2 px-6 text-lg ${getActiveClass(
                '/about'
              )}`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`text-blue-950 font-bold py-2 px-6 text-lg ${getActiveClass(
                '/contact'
              )}`}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
