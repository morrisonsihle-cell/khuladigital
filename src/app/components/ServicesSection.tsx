'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const services = [
  {
    icon: 'ComputerDesktopIcon',
    title: 'Website Design & Development',
    desc: 'Modern, responsive and user-friendly websites that represent your brand and convert visitors into customers.',
    span: 'md:col-span-2',
    accent: true,
  },
  {
    icon: 'ShoppingCartIcon',
    title: 'E-Commerce Solutions',
    desc: 'Online stores with secure payment gateways, product management and easy checkout experience.',
    span: 'md:col-span-1',
    accent: false,
  },
  {
    icon: 'WrenchScrewdriverIcon',
    title: 'Website Management',
    desc: 'Ongoing updates, security monitoring, backups, and technical support so your website is always running smoothly.',
    span: 'md:col-span-1',
    accent: false,
  },
  {
    icon: 'ChartBarIcon',
    title: 'Business Growth Consulting',
    desc: 'We analyse your business, identify opportunities and create digital strategies that attract more customers and increase revenue.',
    span: 'md:col-span-2',
    accent: false,
  },
  {
    icon: 'MegaphoneIcon',
    title: 'Digital Marketing Support',
    desc: 'SEO, Google Business Profile setup, social media strategy, content creation and online advertising.',
    span: 'md:col-span-1',
    accent: false,
  },
  {
    icon: 'PaintBrushIcon',
    title: 'Branding & Design',
    desc: 'Logos, business profiles, social media branding, email signatures and marketing materials.',
    span: 'md:col-span-1',
    accent: false,
  },
];

// BENTO GRID AUDIT:
// Array has 6 cards: [WebsiteDesign cs-2, Ecommerce cs-1, WebsiteMgmt cs-1, BusinessGrowth cs-2, DigitalMarketing cs-1, Branding cs-1]
// Row 1: [col-1: WebsiteDesign cs-2] [col-3: Ecommerce cs-1] [col-4: WebsiteMgmt cs-1]  → 4 cols filled ✓
// Row 2: [col-1: BusinessGrowth cs-2] [col-3: DigitalMarketing cs-1] [col-4: Branding cs-1]  → 4 cols filled ✓
// Placed 6/6 cards ✓

export default function ServicesSection() {
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
    <section id="services" ref={sectionRef} className="py-20 bg-secondary/30 relative overflow-hidden">
      <div className="blob-amber absolute w-[500px] h-[500px] bottom-0 left-0 opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="animate-on-scroll opacity-100 animate-fade-in mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="section-label block mb-3">What We Offer</span>
            <h2 className="font-display text-section-heading font-bold text-foreground leading-tight">
              Our <span className="text-gold-shimmer italic">Services</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-sm text-right hidden md:block">
            Six core service areas designed to take your business from offline to thriving online.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {services.map((service, i) => (
            // STEP 4: Card placement comments
            // Row 1 col-1: WebsiteDesign cs-2 | Row 1 col-3: Ecommerce cs-1 | Row 1 col-4: WebsiteMgmt cs-1
            // Row 2 col-1: BusinessGrowth cs-2 | Row 2 col-3: DigitalMarketing cs-1 | Row 2 col-4: Branding cs-1
            <div
              key={service.title}
              className={`animate-on-scroll opacity-100 animate-fade-in card-hover border border-border rounded-2xl p-8 group relative overflow-hidden ${service.span} ${
                service.accent
                  ? 'bg-card' :'bg-card'
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at top left, rgba(201,162,39,0.06), transparent 60%)' }} />

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                service.accent ? 'bg-primary/20' : 'bg-primary/10'
              }`}>
                <Icon name={service.icon as any} size={22} className="text-primary" />
              </div>

              <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.desc}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out bg-gold-gradient" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}