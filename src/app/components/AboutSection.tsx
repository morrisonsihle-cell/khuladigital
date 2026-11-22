'use client';

import React, { useRef } from 'react';
import { Sprite } from '@/components/ui/PixelSprite';
import { useReveal } from '@/components/useReveal';

const values = ['Growth', 'Excellence', 'Integrity', 'Innovation', 'Customer Success', 'Community'];

const pillars = [
  { label: 'Vision', text: "To be South Africa's most trusted partner in digital growth for small businesses." },
  {
    label: 'Mission',
    text: 'To make digital transformation affordable, simple, and effective for small businesses, empowering them to compete and thrive in the digital economy.',
  },
  { label: 'Values', text: values.join(' · ') },
];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, 0.1);

  return (
    <section id="about" ref={ref} className="py-24 bg-arcade-cream text-arcade-ink relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="animate-on-scroll opacity-100 animate-fade-in mb-14 flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <span className="font-pixel text-[10px] text-arcade-terracotta block mb-4">// 04 Who we are · The Guild</span>
            <h2 className="font-pixel text-arcade-ink uppercase" style={{ fontSize: 'clamp(1.1rem, 3vw, 2.1rem)', lineHeight: 1.4 }}>
              About <span className="inline-block bg-arcade-ink text-arcade-coin px-2.5 py-0.5 mt-1 sm:mt-0">Khula Digital Solutions</span>
            </h2>
          </div>
          <p className="text-arcade-ink/70 max-w-md leading-relaxed mt-1">
            Khula Digital Solutions is a South African digital solutions company that helps small businesses establish,
            manage, and grow their online presence through websites, digital marketing, and business growth consulting.
          </p>
        </div>

        {/* Guild cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            { sprite: 'programmer', title: 'Developers', role: 'Programmer', text: 'Architects of responsive code and secure architecture.' },
            { sprite: 'artist', title: 'Creatives', role: 'Artist', text: 'Crafters of brand identities, pixel graphics, and clean UI.' },
          ].map((c, i) => (
            <div
              key={c.title}
              className="animate-on-scroll opacity-100 animate-fade-in pixel-card-cream p-6 flex flex-col"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <h3 className="font-pixel text-xs mb-5">{c.title}</h3>
              <Sprite name={c.sprite} className="w-24 h-24 mb-4 animate-float" />
              <p className="text-sm text-arcade-ink/75 leading-relaxed flex-1">{c.text}</p>
              <span className="font-terminal text-lg text-arcade-terracotta mt-3">{c.role}</span>
            </div>
          ))}
          <div className="animate-on-scroll opacity-100 animate-fade-in bg-arcade-coin text-arcade-ink border-2 border-arcade-ink shadow-[4px_4px_0_0_#111319] p-6 md:rotate-3 md:hover:rotate-0 transition-transform duration-200" style={{ animationDelay: '0.24s' }}>
            <h3 className="font-pixel text-xs mb-5">The Alliance</h3>
            <div className="flex gap-1 mb-4" aria-hidden="true">
              <Sprite name="programmer" className="w-14 h-14" />
              <Sprite name="artist" className="w-14 h-14" />
              <Sprite name="programmer" className="w-14 h-14" />
            </div>
            <p className="text-sm font-medium leading-relaxed">
              The community and client partners leveling up across South Africa.
            </p>
          </div>
        </div>

        {/* Vision / Mission / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {pillars.map((p, i) => (
            <div
              key={p.label}
              className="animate-on-scroll opacity-100 animate-fade-in bg-arcade-canvas text-foreground border-2 border-arcade-ink shadow-[4px_4px_0_0_#FFC933] p-6"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <h3 className="font-pixel text-[11px] text-arcade-coin mb-3">{p.label}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        {/* Target market */}
        <div className="animate-on-scroll opacity-100 animate-fade-in pixel-card-cream p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <span className="font-pixel text-[10px] text-arcade-terracotta block mb-3">Target Market</span>
              <h3 className="font-bold text-2xl mb-3">Built for South African Small Businesses</h3>
              <p className="text-sm text-arcade-ink/75 leading-relaxed">
                Barbershops, salons, spaza shops, restaurants, construction companies, electricians, plumbers, funeral
                parlours, car washes, churches, NGOs and local startups.
              </p>
            </div>
            <div className="flex-1">
              <span className="font-pixel text-[10px] text-arcade-terracotta block mb-3">Market Opportunity</span>
              <p className="text-sm text-arcade-ink/75 leading-relaxed">
                Thousands of small businesses in South Africa still operate offline or have a poor online presence. Khula
                Digital Solutions bridges that gap by providing professional, affordable and effective digital solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
