import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white text-gray-800 shadow-md">
      <Link href="/" className="text-gray-800 hover:underline">
        <div className="flex items-center text-xl font-bold">
          <Image src="/re2.png" alt="Logo" height={30} width={100} className="mr-2" />
        </div>
      </Link>
      
      <nav className="flex gap-4">
        {isLoggedIn ? (
          <Link href="/logout" className="text-gray-800 hover:underline">
            Log Out
          </Link>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
