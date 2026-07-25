'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    number: '01',
    icon: 'ChatBubbleLeftRightIcon',
    title: 'Consultation',
    desc: 'We learn about your business, goals and challenges.',
  },
  {
    number: '02',
    icon: 'MagnifyingGlassIcon',
    title: 'Analysis',
    desc: 'We research your market and identify opportunities.',
  },
  {
    number: '03',
    icon: 'DocumentTextIcon',
    title: 'Strategy & Plan',
    desc: 'We create a tailored digital plan and solution.',
  },
  {
    number: '04',
    icon: 'ComputerDesktopIcon',
    title: 'Build & Launch',
    desc: 'We design, develop and launch your website.',
  },
  {
    number: '05',
    icon: 'ArrowTrendingUpIcon',
    title: 'Grow & Optimise',
    desc: 'We manage, optimise and help your business grow.',
  },
];

export default function ProcessSection() {
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
    sectionRef.current?.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-20 bg-secondary/30 relative overflow-hidden">
      <div className="blob-amber absolute w-[400px] h-[400px] top-0 right-0 opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="animate-on-scroll opacity-100 animate-fade-in mb-16">
          <span className="section-label block mb-3">How It Works</span>
          <h2 className="font-display text-section-heading font-bold text-foreground leading-tight">
            Our <span className="text-gold-shimmer italic">Process</span>
          </h2>
        </div>

        {/* Steps — horizontal flow on desktop, stacked on mobile */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-0 right-0 h-px bg-border z-0 mx-16" />
          <div
            className="hidden lg:block absolute top-14 left-0 h-px z-0 mx-16"
            style={{
              background: 'linear-gradient(to right, #C9A227, #D4AF37, transparent)',
              width: '60%',
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="animate-on-scroll opacity-100 animate-fade-in group"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="flex flex-col items-center text-center lg:items-center">
                  {/* Icon circle */}
                  <div className={`relative w-28 h-28 rounded-full border-2 flex items-center justify-center mb-6 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(201,162,39,0.3)] ${
                    i === 0
                      ? 'border-primary bg-primary/10' :'border-border bg-card group-hover:border-primary/50'
                  }`}>
                    <Icon name={step.icon as any} size={28} className={`transition-colors duration-300 ${
                      i === 0 ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                    }`} />
                    {/* Step number badge */}
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-foreground mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed max-w-[140px]">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow between steps (mobile/tablet) */}
                {i < steps.length - 1 && (
                  <div className="flex justify-center mt-4 lg:hidden">
                    <Icon name="ArrowDownIcon" size={16} className="text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA callout */}
        <div className="animate-on-scroll opacity-100 animate-fade-in mt-16 bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to start your digital journey?
          </h3>
          <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
            Book a free consultation and let&apos;s build your online presence together.
          </p>
          <a href="#contact" className="btn-gold inline-block px-10 py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest">
            Book Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}