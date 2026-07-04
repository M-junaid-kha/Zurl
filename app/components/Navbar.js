"use client";
import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const navLinks = [
  { href: "/", label: "URL Shortner" },
  { href: "/qrcode", label: "QR code" },
  { href: "/privicy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" },
];

const linkClass =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16233F]/25 rounded relative font-medium text-[#10131A] transition-all duration-300 ease-in-out hover:text-[#16233F] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#F5B700] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-0">
      <div className="max-w-5xl mx-auto mt-4 flex items-center justify-between gap-4 h-16 px-4 sm:px-6 bg-white/70 backdrop-blur-md border border-[#E7E7E3] rounded-2xl shadow-[0_1px_2px_rgba(16,19,26,0.04),0_8px_24px_-16px_rgba(16,19,26,0.15)]">
        <Link
          href="/"
          className={
            display.className +
            " text-xl sm:text-2xl font-bold text-[#10131A] tracking-tight focus:outline-none"
          }
        >
          zurl<span className="text-[#F5B700]">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} className={linkClass} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth */}
        <div className="hidden md:block">
          <Show when="signed-out">
            <div className="flex gap-3 items-center">
              <SignInButton>
                <button className="text-[#10131A] font-medium text-sm h-10 px-4 rounded-xl cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#F7F7F5]">
                  Log in
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="bg-[#16233F] flex items-center gap-2 text-white rounded-xl font-medium text-sm h-10 px-4 cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#1E3057] active:scale-95">
                  <FaUserAlt className="text-xs" /> Sign up
                </button>
              </SignUpButton>
            </div>
          </Show>
          <Show when="signed-in">
            <div className="flex gap-4 items-center">
              <Link className={linkClass} href="/dashboard">
                Dashboard
              </Link>
              <UserButton />
            </div>
          </Show>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-xl text-[#10131A] hover:bg-[#F7F7F5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16233F]/25"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden max-w-5xl mx-auto overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 bg-white/90 backdrop-blur-md border border-[#E7E7E3] rounded-2xl shadow-[0_8px_24px_-16px_rgba(16,19,26,0.15)] p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-[#10131A] font-medium text-base py-2.5 px-2 rounded-lg transition-colors hover:bg-[#F7F7F5] hover:text-[#16233F]"
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-[#E7E7E3] mt-2 pt-3">
            <Show when="signed-out">
              <div className="flex flex-col gap-2">
                <SignInButton>
                  <button className="w-full text-[#10131A] font-medium text-sm h-11 rounded-xl cursor-pointer transition-colors hover:bg-[#F7F7F5]">
                    Log in
                  </button>
                </SignInButton>

                <SignUpButton>
                  <button className="w-full bg-[#16233F] flex items-center justify-center gap-2 text-white rounded-xl font-medium text-sm h-11 cursor-pointer transition-colors hover:bg-[#1E3057] active:scale-95">
                    <FaUserAlt className="text-xs" /> Sign up
                  </button>
                </SignUpButton>
              </div>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center justify-between px-2">
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-[#10131A] font-medium text-base"
                >
                  Dashboard
                </Link>
                <UserButton />
              </div>
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;