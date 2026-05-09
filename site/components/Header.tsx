"use client";

import Link from "next/link";
import { useState } from "react";

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.89a8.28 8.28 0 0 0 4.76 1.5V6.94a4.84 4.84 0 0 1-1-.25z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/take-america-back", label: "Take America Back", highlight: true },
  { href: "/defend", label: "License Defense" },
  { href: "/state", label: "By State" },
  { href: "/topics", label: "Topics" },
  { href: "/how-to", label: "How-To" },
  { href: "/about", label: "About" },
  { href: "/podcast", label: "Podcast" },
  { href: "/products", label: "Products" },
  { href: "/tip", label: "Tip" },
  { href: "/donate", label: "❤ Donate", donate: true },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#1a1a1a] text-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Top bar: social icons + tagline */}
        <div className="flex items-center justify-between py-3 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/the_ethics_reporter/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/61580604840026" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://x.com/EthicsThe79114" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="X (Twitter)">
              <XIcon />
            </a>
            <a href="https://www.tiktok.com/@ethics_reporter234" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="TikTok">
              <TikTokIcon />
            </a>
            <a href="https://www.youtube.com/@theethicsReporter" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
              <YouTubeIcon />
            </a>
          </div>
          <div className="hidden sm:block text-sm text-gray-400">
            Independent Legal Ethics Journalism
          </div>
        </div>

        {/* Title + hamburger row */}
        <div className="flex items-center justify-between py-5">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight font-sans">
              THE ETHICS REPORTER
            </h1>
            <div className="h-1 w-20 bg-[#8B0000] mt-2" />
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center justify-center flex-wrap gap-x-5 gap-y-2 pb-4 text-sm font-sans font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.donate
                  ? "bg-[#8B0000] hover:bg-[#6b0000] text-white font-bold px-3 py-1 rounded transition-colors"
                  : link.highlight
                  ? "text-white font-bold border-b-2 border-[#8B0000] pb-0.5 hover:text-red-300 transition-colors"
                  : "text-gray-300 hover:text-white transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile nav dropdown */}
        {menuOpen && (
          <nav className="md:hidden border-t border-gray-700 py-4 flex flex-col gap-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={
                  link.donate
                    ? "block px-2 py-3 text-base font-bold text-red-400 border-b border-gray-800"
                    : link.highlight
                    ? "block px-2 py-3 text-base font-bold text-red-400 border-b border-gray-800"
                    : "block px-2 py-3 text-base text-gray-300 hover:text-white border-b border-gray-800 transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
