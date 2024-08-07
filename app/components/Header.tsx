import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white text-gray-800 shadow-md">
      {/* Left-aligned space for logout or other items */}
      <div className="flex-shrink-0">
        {isLoggedIn ? (
          <Link href="/" className="text-gray-800 hover:underline">
            Log Out
          </Link>
        ) : null}
      </div>

      {/* Centered logo */}
      <div className="flex-grow flex justify-center">
        <Link href="/" className="text-gray-800 hover:underline">
          <Image src="/Home.png" alt="Logo" height={50} width={125} /> {/* Adjusted dimensions */}
        </Link>
      </div>

      {/* Right-aligned space for additional items if needed */}
      <div className="flex-shrink-0">
        {/* Add other items here if needed */}
      </div>
    </header>
  );
};

export default Header;
