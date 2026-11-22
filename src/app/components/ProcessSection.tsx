'use client';

import React, { useRef } from 'react';
import { Sprite } from '@/components/ui/PixelSprite';
import { useReveal } from '@/components/useReveal';

const steps = [
  { number: '01', sprite: 'save', title: 'Consultation', desc: 'We learn about your business, goals and challenges.', shade: '#1C202B' },
  { number: '02', sprite: 'eye', title: 'Analysis', desc: 'We research your market and identify opportunities.', shade: '#171A24' },
  { number: '03', sprite: 'map', title: 'Strategy & Plan', desc: 'We create a tailored digital plan and solution.', shade: '#13151D' },
  { number: '04', sprite: 'rocket', title: 'Build & Launch', desc: 'We design, develop and launch your website.', shade: '#0F1117' },
  { number: '05', sprite: 'trophy', title: 'Grow & Optimise', desc: 'We manage, optimise and help your business grow.', shade: '#0B0C12' },
];

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="process" ref={ref} className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="animate-on-scroll opacity-100 animate-fade-in mb-12">
          <span className="font-pixel text-[10px] text-arcade-green block mb-4">// 03 Arcade workflow</span>
          <h2 className="font-pixel uppercase text-foreground" style={{ fontSize: 'clamp(1.2rem, 3.4vw, 2.4rem)', lineHeight: 1.3 }}>
            The process: <span className="text-arcade-coin">5 stages</span>
          </h2>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border-2 border-arcade-coin shadow-[6px_6px_0_0_#000]">
          {steps.map((s, i) => (
            <li
              key={s.number}
              className="animate-on-scroll opacity-100 animate-fade-in flex flex-col justify-between min-h-[260px] p-5 border-b-2 lg:border-b-0 lg:border-r-2 last:border-0 border-arcade-ink"
              style={{ background: s.shade, animationDelay: `${i * 0.1}s` }}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-terminal text-xl text-arcade-coin">{s.number}</span>
                    <h3 className="font-pixel text-[11px] uppercase text-foreground mt-1 leading-snug">{s.title}</h3>
                  </div>
                  <Sprite name={s.sprite} className="w-9 h-9 flex-shrink-0" />
                </div>
                <p className="text-sm text-foreground/80 mt-3 leading-relaxed">{s.desc}</p>
              </div>
              <span className="stage-number mt-6 text-arcade-coin" style={{ opacity: 1 - i * 0.17 }} aria-hidden="true">
                {s.number}
              </span>
            </li>
          ))}
        </ol>

        <div className="animate-on-scroll opacity-100 animate-fade-in mt-14 pixel-card p-8 md:p-12 text-center">
          <h3 className="font-pixel text-sm md:text-lg text-foreground mb-4 leading-snug">Ready to start your digital journey?</h3>
          <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
            Book a free consultation and let&apos;s build your online presence together.
          </p>
          <a href="#contact" className="btn-arcade">[ Book Free Consultation ]</a>
        </div>
      </div>
    </section>
  );
}
