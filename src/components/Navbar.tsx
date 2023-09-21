import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* Icons imports */
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="absolute z-30 w-full px-4 py-4">
      {/* Mobile navbar */}
      <div className="flex justify-between sm:hidden">
        <Link href="/" className="z-30">
          <Image
            src="/images/logo.webp"
            alt="Hero background image"
            width={144}
            height={128}
            priority
          />
        </Link>

        <button onClick={handleOpen} className="z-30 text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav
          className={`fixed -right-full top-0 flex h-full w-full ${
            isOpen ? "-translate-x-full" : ""
          } flex-col items-center justify-around gap-x-4 bg-slate-900 pt-16 transition-transform duration-200 ease-in-out`}
        >
          <Link
            href="/characters"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-medium"
          >
            Characters
          </Link>
          <Link
            href="/locations"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-medium"
          >
            Locations
          </Link>
          <Link
            href="/episodes"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-medium"
          >
            Episodes
          </Link>
        </nav>
      </div>

      {/* Desktop navbar */}
      <div className="mx-auto hidden max-w-5xl items-center justify-between sm:flex">
        <Link href="/">
          <Image
            src="/images/logo.webp"
            alt="Hero background image"
            width={128}
            height={128}
          />
        </Link>

        <nav className="flex gap-x-4">
          <Link
            href="/characters"
            className="font-medium transition-colors duration-200 ease-in-out hover:text-cyan-400"
          >
            Characters
          </Link>
          <Link
            href="/locations"
            className="font-medium transition-colors duration-200 ease-in-out hover:text-cyan-400"
          >
            Locations
          </Link>
          <Link
            href="/episodes"
            className="font-medium transition-colors duration-200 ease-in-out hover:text-cyan-400"
          >
            Episodes
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
