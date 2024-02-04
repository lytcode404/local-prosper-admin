import { auth } from "@/db/firebase";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = ({ photoUrl, isSidebarOpen, setIsSidebarOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  const toggleSideMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotificationsMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isNotificationsMenuOpen);
  };

  return (
    <header className="bg-white fixed z-10 w-full mx-auto py-4 shadow-md">
      <div className="flex items-center justify-between h-full px-6 mx-auto  text-gray-700">
        <Link href={`/`} className="text-xl font-bold">
          LocalProsper Admin
        </Link>

        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 ">
          <div className="relative w-full max-w-xl  mr-6 h-12 p-1">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              className="w-full h-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-white border-2 rounded-md  focus:placeholder-gray-500"
              type="text"
              placeholder="Search for Businesses"
              aria-label="Search"
            />
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Sidebar door --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              aria-label="Toggle color mode"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <Image
                  src={`/opened-door.png`}
                  alt=""
                  height={44}
                  width={44}
                  className="h-5 w-5"
                />
              ) : (
                <Image
                  src={`/closed-door.png`}
                  alt=""
                  height={24}
                  width={24}
                  className="h-5 w-5"
                />
              )}
            </button>
          </li>
          {/* <!-- Notifications menu --> */}
          <li className="relative">
            <Link
              href={`/notifications`}
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
              </svg>
              {/* <!-- Notification badge --> */}
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark2border-gray-800"
              ></span>
            </Link>
          </li>
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <Link
              href={`/profile`}
              className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
              aria-label="Account"
              aria-haspopup="true"
            >
              {photoUrl ? (
                <Image
                  className="object-cover w-5 h-5 rounded-full"
                  src={photoUrl}
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden="true"
                />
              ) : (
                <Image
                  className="object-cover w-5 h-5 rounded-full"
                  src={`/user.png`}
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden="true"
                />
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
