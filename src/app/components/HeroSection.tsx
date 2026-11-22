'use client';

import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

const CODE_LINES = [
  '> init khula_digital_solutions',
  '> loading websites...',
  '> seo_boost = true',
  '> deploy --live',
  '> leads += 150%',
  '> level_up()',
  '> status: ONLINE',
  '> growth: +150%',
];

function Coin({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 8" className={className} shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#111319" d="M2 0h4v1h1v1h1v4H7v1H6v1H2V7H1V6H0V2h1V1h1z" />
      <path fill="#FFC933" d="M2 1h4v1h1v4H6v1H2V6H1V2h1z" />
      <path fill="#FFF3B0" d="M2 2h1v3H2z" />
      <path fill="#EA580C" d="M4 2h1v4H4z" />
    </svg>
  );
}

function Heart({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 9 8" className={className} shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#111319" d="M1 0h3v1h1V0h3v1h1v3H8v1H7v1H6v1H5v1H4V7H3V6H2V5H1V4H0V1h1z" />
      <path fill="#FF3B3B" d="M1 1h2v1h3V1h2v2H7v1H6v1H5v1H4V5H3V4H2V3H1z" />
      <path fill="#FFB3B3" d="M1 1h1v1H1z" />
    </svg>
  );
}

/** Isometric-style retro terminal built from pixel blocks (arcade orange casing, CRT screen). */
function RetroTerminal() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none" role="img" aria-label="Retro yellow and black computer terminal showing plus 150 percent growth">
      {/* Orbiting sprites */}
      <Coin className="absolute -top-2 left-6 w-8 h-8 animate-float" />
      <Heart className="absolute top-10 -right-2 w-9 h-8 animate-float" />
      <Coin className="absolute bottom-16 -left-4 w-7 h-7 animate-float" />
      <Heart className="absolute -bottom-2 right-10 w-7 h-6 animate-float" />

      {/* Monitor casing */}
      <div className="relative bg-arcade-coin border-[3px] border-arcade-ink shadow-[8px_8px_0_0_#000] p-4 pb-6">
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#FFE600]" aria-hidden="true" />
        {/* CRT screen */}
        <div className="relative bg-[#06130c] border-[3px] border-arcade-ink overflow-hidden h-56">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,0) 2px, rgba(0,0,0,0.25) 3px)' }} aria-hidden="true" />
          <div className="p-3 font-terminal text-lg leading-6 text-arcade-green overflow-hidden h-full">
            <div className="animate-scroll-code">
              {[...CODE_LINES, ...CODE_LINES].map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-3 right-3 bg-arcade-ink border-2 border-arcade-green px-2 py-1 font-pixel text-[10px] text-arcade-green">
            +150% GROWTH
          </div>
        </div>
        {/* Controls */}
        <div className="flex items-center justify-between mt-4 px-1">
          <div className="flex items-center gap-2">
            <AppLogo size={26} className="flex-shrink-0" />
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-3 h-3 bg-arcade-ink" />
              <span className="w-3 h-3 bg-arcade-green" />
              <span className="w-3 h-3 bg-arcade-coin" />
            </div>
          </div>
          <div className="h-2 w-24 bg-arcade-ink/70" aria-hidden="true" />
        </div>
      </div>
      {/* Stand + keyboard */}
      <div className="mx-auto w-24 h-4 bg-[#282E3D] border-x-[3px] border-arcade-ink" aria-hidden="true" />
      <div className="mx-auto w-[88%] h-9 bg-[#1E222D] border-[3px] border-arcade-ink shadow-[6px_6px_0_0_#000] grid grid-cols-12 gap-[3px] p-1.5" aria-hidden="true">
        {Array.from({ length: 36 }).map((_, i) => (
          <span key={i} className="bg-[#3A4152]" />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 pixel-grid-bg"
      style={{ minHeight: '100svh' }}
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] max-w-[140vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,201,51,0.26) 0%, rgba(234,179,8,0.08) 45%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Copy */}
        <div className="animate-fade-in opacity-100">
          <p className="font-terminal text-xl text-arcade-green mb-5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-arcade-green animate-blink-dot" aria-hidden="true" />
            PLAYER 1 READY · KWAZULU-NATAL, SA
          </p>
          <h1 id="hero-heading" className="font-pixel uppercase text-foreground" style={{ fontSize: 'clamp(1.35rem, 4.4vw, 3rem)', lineHeight: 1.3 }}>
            <span className="text-arcade-coin block mb-3" style={{ fontSize: '0.46em', lineHeight: 1.4 }}>Khula Digital Solutions</span>
            Level up your digital game
          </h1>
          <p className="mt-6 text-base md:text-lg text-foreground/75 max-w-xl leading-relaxed">
            Khula Digital Solutions crafts custom websites, e-commerce engines, and high-performance branding designed to scale South African businesses.
          </p>

          <div className="mt-9 flex flex-wrap gap-4 items-center">
            <a href="#contact" className="btn-arcade whitespace-nowrap">[ Insert Coin / Get a Quote ]</a>
            <a href="#services" className="btn-arcade-ghost whitespace-nowrap">[ Explore Quest Log ]</a>
          </div>

          <div className="mt-8 inline-flex items-center gap-3 border-2 border-arcade-green/60 bg-arcade-surface px-4 py-2" style={{ borderRadius: '9999px' }}>
            <span className="font-pixel text-[10px] text-arcade-green">▲ +150%</span>
            <span className="font-terminal text-lg text-foreground">CLIENT REVENUE BOOST</span>
          </div>
        </div>

        {/* Centerpiece */}
        <div className="animate-fade-in-delay-2 opacity-100">
          <RetroTerminal />
        </div>
      </div>
    </section>
  );
}
