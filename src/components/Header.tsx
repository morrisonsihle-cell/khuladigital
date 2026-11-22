'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

const navLinks = [
  { label: '// 01 Services', href: '#services' },
  { label: '// 02 Packages', href: '#packages' },
  { label: '// 03 Workflow', href: '#process' },
  { label: '// 04 About', href: '#about' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [crt, setCrt] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle('crt-scanlines', crt);
    return () => document.documentElement.classList.remove('crt-scanlines');
  }, [crt]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-6">
        <nav
          aria-label="Main"
          className={`max-w-7xl mx-auto h-16 pl-3 pr-3 flex items-center justify-between gap-3 border-2 transition-colors duration-300 ${
            scrolled
              ? 'bg-[#0A0B0E] border-arcade-coin shadow-[4px_4px_0_0_#000]'
              : 'bg-background/80 backdrop-blur-sm border-border'
          }`}
          style={{ borderRadius: '9999px' }}
        >
          {/* Brand + server status */}
          <Link href="/" className="flex items-center gap-3 min-w-0" aria-label="Khula Digital Solutions home">
            <AppLogo size={42} className="flex-shrink-0" />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-pixel text-[8.5px] xl:text-[9px] text-foreground whitespace-nowrap">
                KHULA <span className="text-arcade-coin">DIGITAL SOLUTIONS</span>
              </span>
              <span className="flex items-center gap-1.5 mt-1.5 font-terminal text-sm text-arcade-green whitespace-nowrap">
                <span className="w-2 h-2 bg-arcade-green animate-blink-dot" aria-hidden="true" />
                SERVER: ONLINE
              </span>
            </span>
          </Link>

          {/* Arcade menu */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            {navLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-pixel text-[9px] uppercase text-arcade-coin hover:text-white transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-pixel text-[9px] uppercase text-muted-foreground hover:text-arcade-coin transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Status + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={crt}
              onClick={() => setCrt((v) => !v)}
              className="font-terminal text-base text-muted-foreground hover:text-arcade-cyan transition-colors whitespace-nowrap"
            >
              [CRT: {crt ? 'ON' : 'OFF'}]
            </button>
            <span className="hidden 2xl:flex items-center gap-2 font-terminal text-base text-foreground whitespace-nowrap" aria-hidden="true">
              HP <span className="hp-bar">{Array.from({ length: 8 }).map((_, i) => <span key={i} />)}</span> LVL 99
            </span>
            <a href="#contact" className="btn-arcade whitespace-nowrap !text-[10px] !px-4 !py-2.5" style={{ borderRadius: '9999px' }}>
              [ Start Project ]
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-2 z-50"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 bg-background/95 pixel-grid-bg" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-7 px-6">
          {navLinks.map((link) =>
            link.href.startsWith('/') ? (
              <Link key={link.label} href={link.href} onClick={close} className="font-pixel text-sm text-arcade-coin" tabIndex={menuOpen ? 0 : -1}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} onClick={close} className="font-pixel text-sm text-foreground hover:text-primary" tabIndex={menuOpen ? 0 : -1}>
                {link.label}
              </a>
            )
          )}
          <button
            type="button"
            role="switch"
            aria-checked={crt}
            onClick={() => setCrt((v) => !v)}
            className="font-terminal text-xl text-arcade-cyan"
            tabIndex={menuOpen ? 0 : -1}
          >
            [CRT: {crt ? 'ON' : 'OFF'}]
          </button>
          <a href="#contact" onClick={close} className="btn-arcade mt-2" tabIndex={menuOpen ? 0 : -1}>
            [ Start Project ]
          </a>
        </div>
      </div>
    </>
  );
}
