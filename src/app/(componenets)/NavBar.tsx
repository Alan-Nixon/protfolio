"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useUser } from "../page";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  return (
    <header className="py-6 border-b border-gray-200">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-emerald-700">
          {user.name}
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            Home
          </Link>
          <Link
            href="/projects"
            className="hover:text-emerald-700 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="hover:text-emerald-700 transition-colors"
          >
            Contact
          </Link>
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
          <Link
            href="/"
            className="block py-2 hover:text-emerald-700 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="block py-2 hover:text-emerald-700 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="block py-2 hover:text-emerald-700 transition-colors"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}

export default NavBar;
