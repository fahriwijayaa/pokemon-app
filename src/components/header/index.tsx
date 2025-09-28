import React from "react";
import Navbar, { type NavItem } from "../navbar/Navbar";
import Logo from "../../assets/pokemon.png";

interface HeaderProps {
  navItems: NavItem[];
}

const Header: React.FC<HeaderProps> = ({ navItems }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0d1117] border-b border-gray-800">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="py-3 px-4 flex justify-center">
          <img src={Logo} alt="Pokemon Logo" className="h-10" />
        </div>

        {/* Navigation (Tablet ke atas, selalu tampil) */}
        <Navbar navItems={navItems} />
      </div>
    </header>
  );
};

export default Header;
