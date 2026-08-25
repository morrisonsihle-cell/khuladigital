'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
  { label: '🏆 Competition', href: '/competition' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border' :'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <AppLogo size={72} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks?.map((link) => (
              link?.href?.startsWith('/') ? (
                <Link
                  key={link?.label}
                  href={link?.href}
                  className="text-xs font-medium uppercase tracking-widest text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  {link?.label}
                </Link>
              ) : (
                <a
                  key={link?.label}
                  href={link?.href}
                  className="text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link?.label}
                </a>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="btn-gold px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </nav>
      </header>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
          {navLinks?.map((link, i) => (
            link?.href?.startsWith('/') ? (
              <Link
                key={link?.label}
                href={link?.href}
                onClick={handleNavClick}
                className="font-display text-3xl font-light text-primary hover:text-primary/80 transition-colors duration-200"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {link?.label}
              </Link>
            ) : (
              <a
                key={link?.label}
                href={link?.href}
                onClick={handleNavClick}
                className="font-display text-3xl font-light text-foreground hover:text-primary transition-colors duration-200"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {link?.label}
              </a>
            )
          ))}
          <a
            href="#contact"
            onClick={handleNavClick}
            className="btn-gold mt-4 px-10 py-3 rounded-full text-sm font-semibold uppercase tracking-widest"
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
}