'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const reasons = [
  'We understand South African small businesses.',
  'Affordable solutions with premium quality.',
  "We don't just build websites, we help you grow.",
  'Ongoing support and training.',
  'Local, reliable and always within your reach.',
];

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
    );
    sectionRef?.current?.querySelectorAll('.animate-on-scroll')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="why-us" ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      <div className="blob-gold absolute w-[500px] h-[500px] bottom-0 left-0 opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Asymmetric 60/40 split */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left — 3 cols */}
          <div className="lg:col-span-3 animate-on-scroll opacity-100 animate-fade-in">
            <span className="section-label block mb-4">Why Khula Digital Solutions</span>
            <h2 className="font-display text-section-heading font-bold text-foreground leading-tight mb-8">
              Why Choose <span className="text-gold-shimmer italic">Us?</span>
            </h2>

            <ul className="space-y-5 mb-12">
              {reasons?.map((reason, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 group"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="gold-line-hover mt-2.5 flex-shrink-0" />
                  <p className="text-foreground/80 text-sm md:text-base leading-relaxed group-hover:text-foreground transition-colors">
                    {reason}
                  </p>
                </li>
              ))}
            </ul>

            <a href="#contact" className="btn-gold inline-block px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest">
              Work With Us
            </a>
          </div>

          {/* Right — 2 cols: Stats block */}
          <div className="lg:col-span-2 animate-on-scroll opacity-100 animate-fade-in-delay-2 flex flex-col gap-4">

            {/* Quote card */}
            <div className="border border-primary/20 rounded-2xl p-6 bg-primary/5 relative overflow-hidden">
              <div className="absolute top-3 right-4 font-display text-6xl text-primary/10 leading-none select-none">&ldquo;</div>
              <p className="font-display text-lg italic text-foreground/90 leading-relaxed relative z-10">
                We don&apos;t just build websites, we help businesses grow.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-primary/20" />
                <span className="text-[10px] uppercase tracking-widest text-primary">Khula Digital Solutions</span>
              </div>
            </div>

            {/* SA Map callout */}
            <div className="border border-border rounded-2xl p-6 bg-card flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="MapPinIcon" size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">KwaZulu-Natal, South Africa</div>
                <div className="text-xs text-muted-foreground mt-0.5">Serving businesses nationwide</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}