'use client';

import React, { useEffect, useState } from 'react';

export default function FloatingWhatsApp() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/27651085200"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Khula Digital Solutions on WhatsApp"
      className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2.5 px-4 py-3 rounded-full border-2 shadow-[4px_4px_0_0_#000] transition-all duration-300 hover:scale-105 active:translate-y-0.5 whitespace-nowrap ${
        scrolled
          ? 'bg-[#0A0B0E] text-arcade-coin border-arcade-coin hover:bg-[#14171F]'
          : 'bg-arcade-coin text-arcade-ink border-arcade-ink hover:bg-[#FFE600]'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="22"
        height="22"
        fill="currentColor"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.476 2.027 7.785L0 32l8.418-2.004A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.77-1.848l-.485-.287-5.001 1.19 1.22-4.87-.317-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.87c-.398-.2-2.355-1.162-2.72-1.295-.366-.133-.632-.2-.898.2-.266.398-1.03 1.295-1.263 1.561-.232.266-.465.3-.863.1-.398-.2-1.682-.62-3.204-1.977-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.175-.812.18-.178.398-.465.598-.698.2-.232.266-.398.398-.664.133-.266.067-.498-.033-.698-.1-.2-.898-2.163-1.23-2.96-.324-.778-.653-.673-.898-.685l-.765-.013c-.266 0-.698.1-1.063.498-.366.398-1.396 1.363-1.396 3.326s1.43 3.858 1.629 4.124c.2.266 2.814 4.296 6.82 6.025.953.412 1.697.658 2.277.842.957.305 1.828.262 2.516.159.767-.114 2.355-.963 2.688-1.893.333-.93.333-1.727.233-1.893-.1-.166-.366-.266-.764-.465z" />
      </svg>
      <span className="font-pixel text-[9px] sm:text-[10px] leading-none">
        Khula Digital Solutions
      </span>
    </a>
  );
}
