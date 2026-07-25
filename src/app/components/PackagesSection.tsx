'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const packages = [
  {
    name: 'Starter Website',
    price: 'R2,500 – R4,000',
    period: 'once-off',
    icon: 'RocketLaunchIcon',
    highlight: false,
    tagline: 'Ideal for small businesses getting started online.',
    features: [
      '5 Pages Website',
      'Mobile Responsive',
      'Contact Form',
      'WhatsApp Button',
      'Google Map',
      'Basic SEO Setup',
      '1 Round of Revisions',
    ],
  },
  {
    name: 'Business Website',
    price: 'R5,000 – R10,000',
    period: 'once-off',
    icon: 'BuildingOffice2Icon',
    highlight: false,
    tagline: 'Perfect for growing businesses that want more visibility.',
    features: [
      'Up to 10 Pages',
      'Custom Design',
      'Mobile Responsive',
      'SEO Setup',
      'WhatsApp Integration',
      'Blog / News Section',
      'Google Map',
      '2 Rounds of Revisions',
      'Basic Training',
    ],
  },
  {
    name: 'E-Commerce Website',
    price: 'R8,000 – R20,000+',
    period: 'once-off',
    icon: 'ShoppingBagIcon',
    highlight: false,
    tagline: 'For businesses ready to sell products or services online.',
    features: [
      'Online Store Setup',
      'Up to 50 Products',
      'Secure Payments',
      'Delivery Options',
      'Product Management',
      'Coupon / Discounts',
      'SEO Setup',
      'WhatsApp Integration',
      'Training & Support',
    ],
  },
  {
    name: 'Website Management',
    price: 'R200 – R2,500',
    period: 'once-off',
    icon: 'WrenchScrewdriverIcon',
    highlight: false,
    tagline: 'Keep your website secure, updated and performing at its best.',
    features: [
      'Content Updates',
      'Security Monitoring',
      'Backups',
      'Plugin & Software Updates',
      'Uptime Monitoring',
      'Technical Support',
      'Monthly Reports',
    ],
  },
];

export default function PackagesSection() {
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
    <section id="packages" ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      <div className="blob-gold absolute w-[600px] h-[400px] top-0 right-0 opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="animate-on-scroll opacity-100 animate-fade-in mb-16 text-center">
          <span className="section-label block mb-3">Transparent Pricing</span>
          <h2 className="font-display text-section-heading font-bold text-foreground leading-tight">
            Service <span className="text-gold-shimmer italic">Packages</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-4 max-w-md mx-auto">
            Affordable packages built for South African small businesses. No hidden fees.
          </p>
        </div>

        {/* ★ MAIN DEAL — Business Study Bundle ★ */}
        <div className="animate-on-scroll opacity-100 animate-fade-in mb-12">
          <div className="relative rounded-3xl overflow-hidden border-2 border-primary shadow-[0_0_60px_rgba(201,162,39,0.3)] bg-card">
            {/* Top badge */}
            <div className="bg-gold-gradient text-primary-foreground text-[10px] font-bold uppercase tracking-widest text-center py-2.5">
              🌟 Best Value — Featured Package Deal
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Left: Info */}
              <div className="flex-1 p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Icon name="AcademicCapIcon" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground leading-tight">
                      Business Study Bundle
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mt-0.5">
                      Monthly Subscription
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-lg">
                  Everything you need to grow your business knowledge and digital presence — bundled into one affordable monthly plan. Perfect for entrepreneurs and small business owners ready to level up.
                </p>

                {/* Features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Business Growth Courses',
                    'Digital Marketing Training',
                    'Financial Literacy Modules',
                    'Entrepreneurship Guides',
                    'Monthly Live Webinars',
                    'Business Templates & Tools',
                    'Community Access',
                    'Certificate of Completion',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Pricing CTA */}
              <div className="lg:w-72 p-8 lg:p-10 bg-primary/5 border-t lg:border-t-0 lg:border-l border-primary/20 flex flex-col items-center justify-center text-center gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Starting from</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-display text-5xl font-bold text-gold-gradient">R200</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">per month</p>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex items-center justify-center gap-2 text-xs text-primary font-medium">
                    <Icon name="ShieldCheckIcon" size={14} className="text-primary" />
                    Cancel anytime
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-primary font-medium">
                    <Icon name="StarIcon" size={14} className="text-primary" />
                    No lock-in contract
                  </div>
                </div>

                <a
                  href="#contact"
                  className="btn-gold w-full py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-center"
                >
                  Get This Deal
                </a>

                <p className="text-[10px] text-muted-foreground">
                  Limited spots available each month
                </p>
              </div>
            </div>

            {/* Hover bottom line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient" />
          </div>
        </div>

        {/* Packages grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              className={`animate-on-scroll opacity-100 animate-fade-in card-hover rounded-2xl overflow-hidden flex flex-col relative group border border-border`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Header */}
              <div className="p-6 pb-4 bg-card">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                  <Icon name={pkg.icon as any} size={20} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground leading-tight mb-1">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="font-display text-xl font-bold text-gold-gradient">
                    {pkg.price}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {pkg.period}
                </span>
                <p className="text-muted-foreground text-xs mt-3 leading-relaxed">
                  {pkg.tagline}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-border mx-6" />

              {/* Features */}
              <div className="p-6 flex-1 bg-card">
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-foreground/80">
                      <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-6 pt-0 bg-card">
                <a
                  href="#contact"
                  className="block text-center py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-200 btn-outline-gold"
                >
                  Get Started
                </a>
              </div>

              {/* Hover bottom line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        {/* Promotional Banner */}
        <div className="animate-on-scroll opacity-100 animate-fade-in mt-10">
          <div className="relative rounded-2xl overflow-hidden border border-primary/40 bg-primary/5 px-6 py-5 flex flex-col sm:flex-row items-center gap-4 shadow-[0_0_30px_rgba(201,162,39,0.12)]">
            {/* Glow accent */}
            <div className="absolute inset-0 bg-gold-gradient opacity-5 pointer-events-none" />
            {/* Icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
              <Icon name="GiftIcon" size={24} className="text-primary" />
            </div>
            {/* Text */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">🎉 Limited Time Offer</p>
              <p className="text-foreground font-display font-bold text-base sm:text-lg leading-snug">
                Get <span className="text-gold-shimmer">FREE Website Management</span> for the first{' '}
                <span className="text-gold-shimmer">9 months</span> when you take the{' '}
                <span className="text-gold-shimmer">Starter Website Package!</span>
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Save up to R22,500 in management fees — offer available for a limited time only.
              </p>
            </div>
            {/* CTA */}
            <a
              href="#contact"
              className="flex-shrink-0 btn-gold py-3 px-6 rounded-xl text-sm font-semibold uppercase tracking-wider whitespace-nowrap"
            >
              Claim Offer
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}