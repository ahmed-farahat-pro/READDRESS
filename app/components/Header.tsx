import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  return (
    <header className="flex items-center p-4 bg-white text-gray-800 shadow-md">
      {/* Logo container */}
      <div className={`flex-grow ${isLoggedIn ? 'flex justify-start' : 'flex justify-center'}`}>
        <Link href="/">
     
            <Image 
              src="/Home.png" 
              alt="Logo" 
              height={80} 
              width={200} 
              layout="intrinsic"
            />
       
        </Link>
      </div>

      {/* Conditional rendering of the "Log Out" link */}
      {isLoggedIn && (
        <div className="flex-shrink-0 ml-auto">
          <Link href="/" className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
            Log Out
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
