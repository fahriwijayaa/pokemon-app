import React from "react";
import { Link, useLocation } from "react-router-dom";

export interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface NavbarProps {
  navItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  const location = useLocation();
  return (
    <nav className="hidden md:flex justify-center gap-6 w-full border-t border-gray-800 py-2">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
            location.pathname === item.path
              ? "bg-yellow-400 text-black font-semibold"
              : "hover:bg-gray-700"
          }`}
        >
          <span className="text-2xl">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
