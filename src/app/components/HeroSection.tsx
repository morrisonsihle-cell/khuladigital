'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const TYPING_PHRASES = [
  'KHULA DIGITAL SOLUTIONS',
];

function TypingHeadline() {
  const [displayed, setDisplayed] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const text = TYPING_PHRASES[0];
    if (charIndex < text.length) {
      let timeout = setTimeout(() => {
        setDisplayed(text.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [charIndex]);

  const mainText = 'KHULA DIGITAL';
  const solutionsText = ' SOLUTIONS';

  const displayedMain = displayed.slice(0, mainText.length);
  const displayedSolutions = displayed.length > mainText.length
    ? displayed.slice(mainText.length)
    : '';

  return (
    <span>
      <span className={done ? 'animate-blink-text' : ''}>{displayedMain}</span>
      {displayedSolutions && (
        <span className="text-2xl md:text-3xl font-bold text-black align-middle ml-2">
          {displayedSolutions}
        </span>
      )}
      {!done && (
        <span className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle animate-pulse" />
      )}
    </span>
  );
}

const TAGLINE_PHRASES = [
  'Growing Businesses Online',
  'Building Your Digital Future',
  'Empowering South African Brands',
  'Crafting Powerful Websites',
];

function TypingAnimation() {
  const [displayed, setDisplayed] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TAGLINE_PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 60);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 35);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setPhraseIndex((p) => (p + 1) % TAGLINE_PHRASES.length);
    }

    setDisplayed(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  return (
    <span className="inline-block min-h-[1.5em]">
      {displayed}
      <span className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle animate-pulse" />
    </span>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const mx = (clientX / innerWidth - 0.5) * 2;
      const my = (clientY / innerHeight - 0.5) * 2;
      const blob1 = el.querySelector<HTMLElement>('.hero-blob-1');
      const blob2 = el.querySelector<HTMLElement>('.hero-blob-2');
      if (blob1) {
        blob1.style.transform = `translate(${mx * 30}px, ${my * 20}px) scale(1)`;
      }
      if (blob2) {
        blob2.style.transform = `translate(${mx * -20}px, ${my * -15}px) scale(1)`;
      }
    };
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh' }}>

      {/* Background photo */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/assets/images/1780590458133-1780591757398.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(4px)',
          transform: 'scale(1.05)',
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-0" style={{ background: 'rgba(0,0,0,0.72)' }} />

      {/* Grid overlay lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center">
        <div className="w-full max-w-7xl flex justify-between px-4">
          {[0, 1, 2, 3, 4].map((i) =>
          <div key={i} className="grid-overlay-line" />
          )}
        </div>
      </div>

      {/* Atmospheric blobs — very subtle */}
      <div
        className="hero-blob-1 blob-gold animate-blob-1 absolute w-[600px] h-[600px] top-[-100px] left-[-100px] z-0 opacity-40"
        style={{ transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
      
      <div
        className="hero-blob-2 blob-amber animate-blob-2 absolute w-[500px] h-[500px] bottom-[-80px] right-[-80px] z-0 opacity-30"
        style={{ transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
      
      <div className="blob-gold animate-blob-3 absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-20" />

      {/* Background texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px'
      }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-24 pb-16">
        {/* Eyebrow */}
        <div className="opacity-100 animate-on-scroll animate-fade-in mb-6 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-primary/50" />
          <span className="section-label">Est. 2024 · KwaZulu-Natal, South Africa</span>
          <div className="h-px w-12 bg-primary/50" />
        </div>

        {/* Main headline — typing effect on KHULA Digital */}
        <div className="opacity-100 animate-on-scroll animate-fade-in-delay-1 mb-10">
          <h1 className="font-display font-black leading-none tracking-tight text-hero-display text-gold-gradient">
            <TypingHeadline />
          </h1>
        </div>

        {/* Tagline with typing animation */}
        <div className="opacity-100 animate-on-scroll animate-fade-in-delay-3 mb-4">
          <p className="text-xs md:text-sm uppercase tracking-[0.5em] text-muted-foreground font-medium">
            <TypingAnimation />
          </p>
        </div>

        {/* Sub-tagline */}
        <div className="opacity-100 animate-on-scroll animate-fade-in-delay-3 mb-12">
          <p className="text-base md:text-lg text-foreground/70 max-w-xl mx-auto font-light leading-relaxed">
            We don&apos;t just build websites,{' '}
            <span className="text-primary font-medium">we help businesses grow.</span>
          </p>
        </div>

        {/* CTAs */}
        <div className="opacity-100 animate-on-scroll animate-fade-in-delay-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#packages" className="btn-gold px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest">
            View Packages
          </a>
          <a href="#about" className="btn-outline-gold px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest">
            Our Story
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-100 animate-on-scroll animate-fade-in-delay-4">
        <div className="w-px h-16 mx-auto" style={{ background: 'linear-gradient(to bottom, #C9A227, transparent)' }} />
      </div>

      {/* Side decorative image (desktop only) — right side */}
      <div className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2 w-40 h-56 opacity-100 animate-on-scroll animate-fade-in-delay-1 z-10">
        <div className="w-full h-full border border-border/50 p-1.5 image-zoom">
          <AppImage
            src="https://images.unsplash.com/photo-1520545221203-f6ca6a8e3252"
            alt="Team of professionals working on laptops in modern office environment, dim lighting"
            width={160}
            height={224}
            className="w-full h-full object-cover opacity-70" />
        </div>
        <span className="absolute -bottom-6 right-0 text-[8px] uppercase tracking-[0.4em] text-muted-foreground text-right">
          Built in SA
        </span>
      </div>
    </section>
  );
}
