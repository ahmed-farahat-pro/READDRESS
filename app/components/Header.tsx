import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white text-gray-800 shadow-md">
      <div className="flex items-center text-xl font-bold">
        <Image src="/re2.png" alt="Logo" height={30} width={100} className="mr-2" />
       
      </div>
      <nav className="flex gap-4">
        <Link href="/" className="text-gray-800 hover:underline">
          Home
        </Link>
          <Link href="/" className="text-gray-800 hover:underline">
          Log Out
        </Link>
        <Link href="/about" className="text-gray-800 hover:underline">
          About
        </Link>
        <Link href="/contact" className="text-gray-800 hover:underline">
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
