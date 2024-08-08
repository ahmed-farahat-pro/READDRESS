"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import LanguageChanger from './LanguageChanger';

interface HeaderProps {
  isLoggedIn: boolean;
  userName?: string; // Optional prop for the user's name
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, userName }) => {
  const { t } = useTranslation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleUserIconClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    window.location.href = '/'; // Redirect to home page after logout
  };

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

  const handleSignUp = () => {
    // Redirect to sign-up page
    window.location.href = '/signup';
  };

  return (
    <header style={{ backgroundColor: "#fff" }} className="flex items-center p-4 bg-white text-gray-800 shadow-md">
      {/* Left side: LanguageChanger */}
      <div style={{ flex: '0 0 40%' }} className="flex items-center">
        <LanguageChanger />
      </div>

      {/* Center: Logo */}
      <div style={{ flex: '0 0 20%' }} className="flex items-center justify-center">
        <Link href="/">
 
            <Image
              src="/Home.png"
              alt="Logo"
              height={60}
              width={120}
              layout="intrinsic"
              style={{ borderRadius: "10px" }}
            />
   
        </Link>
      </div>

      {/* Right side: User Icon */}
      <div style={{ flex: '0 0 40%' }} className="flex items-center justify-end">
        <button onClick={handleUserIconClick} className="text-gray-800">
          <FontAwesomeIcon icon={faUser} size="lg" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-48">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={handleSignUp}
                  className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 w-full text-left mb-2"
                >
                  {t('Sign Up')}
                </button>
                <button
                  onClick={handleLogin}
                  className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 w-full text-left"
                >
                  {t("Log In")}
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-800 font-semibold mb-2">{userName}</p>
                <button
                  onClick={handleLogout}
                  className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 w-full text-left"
                >
                  {t('Log Out')}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
