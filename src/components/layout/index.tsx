import React from "react";
import { Outlet } from "react-router";
import { FaHome } from "react-icons/fa";
import { CgPokemon } from "react-icons/cg";
import NavMobile from "../navbar/NavMobile";
import Header from "../header";

const Layout: React.FC = () => {
  const navItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/my-pokemon", label: "My Pokémon", icon: <CgPokemon /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#070910] text-white">
      {/* Header + Navigation (sticky di atas) */}
      <Header navItems={navItems} />

      {/* Main content */}
      <main className="flex-1 p-4 pb-16 md:pb-4">
        <Outlet />
      </main>

      {/* Navigation (Mobile) */}
      <NavMobile navItems={navItems} />
    </div>
  );
};

export default Layout;
