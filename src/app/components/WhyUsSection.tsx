'use client';

import React, { useRef } from 'react';
import { Sprite } from '@/components/ui/PixelSprite';
import { useReveal } from '@/components/useReveal';

const reasons = [
  'We understand South African small businesses.',
  'Affordable solutions with premium quality.',
  "We don't just build websites, we help you grow.",
  'Ongoing support and training.',
  'Local, reliable and always within your reach.',
];

export default function WhyUsSection() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="why-us" ref={ref} className="py-24 bg-arcade-cream text-arcade-ink relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3 animate-on-scroll opacity-100 animate-fade-in">
          <span className="font-pixel text-[10px] text-arcade-terracotta block mb-4">Why Khula Digital Solutions</span>
          <h2 className="font-pixel uppercase mb-8" style={{ fontSize: 'clamp(1.2rem, 3.4vw, 2.4rem)', lineHeight: 1.3 }}>
            Why choose <span className="inline-block bg-arcade-ink text-arcade-coin px-2.5 py-0.5">us?</span>
          </h2>
          <ul className="space-y-4 mb-10">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-3">
                <Sprite name="heart" className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="text-base leading-relaxed">{r}</p>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-arcade">[ Work With Us ]</a>
        </div>

        <div className="lg:col-span-2 animate-on-scroll opacity-100 animate-fade-in-delay-2 flex flex-col gap-5">
          <figure className="bg-arcade-canvas text-foreground border-2 border-arcade-ink shadow-[4px_4px_0_0_#FFC933] p-6">
            <blockquote className="font-bold text-lg leading-relaxed">
              &ldquo;We don&apos;t just build websites, we help businesses grow.&rdquo;
            </blockquote>
            <figcaption className="font-terminal text-lg text-arcade-coin mt-3">— Khula Digital Solutions</figcaption>
          </figure>
          <div className="pixel-card-cream p-6 flex items-center gap-4">
            <Sprite name="map" className="w-12 h-12 flex-shrink-0" />
            <div>
              <div className="font-bold">KwaZulu-Natal, South Africa</div>
              <div className="text-sm text-arcade-ink/65">Serving businesses nationwide</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
