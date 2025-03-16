"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useUser } from "../(utils)/customHooks";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();

  const navLinks = [
    {
      url: "/",
      name: "Home",
    },
    {
      url: "/services",
      name: "Services",
    },
    {
      url: "/documentation",
      name: "Documentations",
    },
    {
      url: "/projects",
      name: "Projects",
    },
    {
      url: "/contact",
      name: "Contact",
    },
  ];

  return (
    <header className="py-6 border-b border-gray-200">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-emerald-700">
          {user.name}
        </Link>
        <div className="hidden md:flex space-x-4">
          {navLinks.map(({ url, name }, index) => {
            return (
              <Link
                href={url}
                key={index}
                className="hover:text-emerald-700 transition-colors"
              >
                {name}
              </Link>
            );
          })}
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden mt-4 container mx-auto px-4">
          {navLinks.map(({ url, name }, index) => {
            return (
              <Link
                href={url}
                key={index}
                className="block py-2 hover:text-emerald-700 transition-colors"
              >
                {name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

export default NavBar;
