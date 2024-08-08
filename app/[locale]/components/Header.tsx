
"use client"
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

  import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import LanguageChanger from './LanguageChanger'
interface HeaderProps {
  isLoggedIn: boolean;
  userName?: string; // Optional prop for the user's name
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, userName }) => {
      const { t } = useTranslation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleUserIconClick = () => {
    if (!isLoggedIn) {
      // Redirect to login/sign-up page if not logged in
      setDropdownOpen(!isDropdownOpen);
    
    } else {
      // Toggle dropdown menu if logged in
      setDropdownOpen(!isDropdownOpen);
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
    // After logout, redirect to home page
    window.location.href = '/'; // Redirect to home page after logout
  };
    const handleLogin= () => {
    // Implement logout logic here
    // After logout, redirect to home page
    window.location.href = '/login'; // Redirect to home page after logout
  };
    const handleSignUp = () => {
    // Implement logout logic here
    // After logout, redirect to home page
    window.location.href = '/signup'; // Redirect to home page after logout
  };

  return (
    <header style={{ backgroundColor: "#fff" }} className="flex items-center p-4 bg-white text-gray-800 shadow-md">
      {/* Logo container */}
  

      <div className={`flex-grow ${isLoggedIn ? 'flex justify-start' : 'flex justify-center'}`}>
      
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

      {/* User Icon and Dropdown */}
      <div className="relative flex-shrink-0 ml-auto">
        <button onClick={handleUserIconClick} className="text-gray-800">
          <FontAwesomeIcon icon={faUser} size="lg" />
        </button>
       
        <LanguageChanger/>

   {!isLoggedIn && isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-48">
                <button
              onClick={handleSignUp}
              className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 w-full text-left"
            >
              Sign Up
            </button>
            <br />
          <br />
            <button
              onClick={handleLogin}
              className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 w-full text-left"
            >
              login
            </button>
          </div>
        )}


        {isLoggedIn && isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-48">
            <p className="text-gray-800 font-semibold mb-2">{userName}</p>
            <button
              onClick={handleLogout}
              className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 w-full text-left"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
