'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const values = ['Growth', 'Excellence', 'Integrity', 'Innovation', 'Customer Success', 'Community'];

const pillars = [
  {
    icon: 'EyeIcon',
    label: 'Vision',
    text: "To be South Africa\'s most trusted partner in digital growth for small businesses.",
  },
  {
    icon: 'RocketLaunchIcon',
    label: 'Mission',
    text: 'To make digital transformation affordable, simple, and effective for small businesses, empowering them to compete and thrive in the digital economy.',
  },
  {
    icon: 'SparklesIcon',
    label: 'Values',
    text: values.join(' · '),
  },
];

const revealWords = [
  'Every', 'South', 'African', 'small', 'business', 'deserves', 'a', 'powerful',
  'online', 'presence', '—', 'affordable,', 'professional,', 'and', 'built', 'to', 'grow.',
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

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
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    const section = sectionRef.current;
    if (section) {
      section.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const wordSection = section.querySelector<HTMLElement>('#word-reveal');
      if (!wordSection) return;
      const rect = wordSection.getBoundingClientRect();
      const winH = window.innerHeight;
      const startReveal = winH * 0.9;
      const endReveal = winH * 0.2;
      let progress = (startReveal - rect.top) / (startReveal - endReveal);
      progress = Math.max(0, Math.min(1, progress));
      const activeCount = Math.floor(progress * wordRefs.current.length);
      wordRefs.current.forEach((w, i) => {
        if (!w) return;
        if (i < activeCount) w.classList.add('active');
        else w.classList.remove('active');
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Subtle blob */}
      <div className="blob-gold absolute w-[400px] h-[400px] top-0 right-0 opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="animate-on-scroll opacity-100 animate-fade-in mb-16 flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <span className="section-label block mb-3">Business Profile</span>
            <h2 className="font-display text-section-heading font-bold text-foreground leading-tight">
              Who We <span className="text-gold-shimmer italic">Are</span>
            </h2>
          </div>
          <p className="text-foreground/60 max-w-md leading-relaxed text-sm md:text-base mt-2">
            Khula Digital is a South African digital solutions company that helps small businesses
            establish, manage, and grow their online presence through websites, digital marketing,
            and business growth consulting.
          </p>
        </div>

        {/* Vision / Mission / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.label}
              className="animate-on-scroll opacity-100 card-hover border border-border rounded-2xl p-8 bg-card relative overflow-hidden group"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Gold corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at top right, rgba(201,162,39,0.15), transparent 70%)' }} />
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Icon name={pillar.icon as any} size={20} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3 tracking-wide">
                {pillar.label}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pillar.text}
              </p>
              {/* Gold bottom line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        {/* Scroll-driven word reveal */}
        <div id="word-reveal" className="py-16 border-y border-border">
          <h2 className="font-display text-3xl md:text-5xl leading-tight text-center text-foreground max-w-4xl mx-auto">
            {revealWords.map((word, i) => (
              <React.Fragment key={i}>
                <span
                  ref={(el) => { wordRefs.current[i] = el; }}
                  className="reveal-word"
                >
                  {word}
                </span>
                {i < revealWords.length - 1 && ' '}
              </React.Fragment>
            ))}
          </h2>
        </div>

        {/* Target market callout */}
        <div className="mt-16 animate-on-scroll opacity-100 animate-fade-in">
          <div className="bg-secondary/50 border border-border rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <span className="section-label block mb-3">Target Market</span>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Built for South African Small Businesses
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Barbershops, salons, spaza shops, restaurants, construction companies, electricians,
                  plumbers, funeral parlours, car washes, churches, NGOs and local startups.
                </p>
              </div>
              <div className="flex-1">
                <span className="section-label block mb-3">Market Opportunity</span>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Thousands of small businesses in South Africa still operate offline or have a poor
                  online presence. Khula Digital bridges that gap by providing professional, affordable
                  and effective digital solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}