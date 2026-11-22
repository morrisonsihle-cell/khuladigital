'use client';

import React, { useRef } from 'react';
import { Sprite } from '@/components/ui/PixelSprite';
import { useReveal } from '@/components/useReveal';
import { selectQuestAndScroll, QuestServiceKey } from '@/components/selectQuest';

const packages: {
  name: string;
  tier: string;
  stars: number;
  price: string;
  period: string;
  featured: boolean;
  serviceKey: QuestServiceKey;
  tagline: string;
  features: string[];
}[] = [
  {
    name: 'Starter Website',
    tier: 'Tier 1 · LVL 01',
    stars: 1,
    price: 'R2,500 – R4,000',
    period: 'once-off',
    featured: false,
    serviceKey: 'starter',
    tagline: 'Ideal for small businesses getting started online.',
    features: ['5 Pages Website', 'Mobile Responsive', 'Contact Form', 'WhatsApp Button', 'Google Map', 'Basic SEO Setup', '1 Round of Revisions'],
  },
  {
    name: 'Business Website',
    tier: 'Tier 2 · LVL 02',
    stars: 2,
    price: 'R5,000 – R10,000',
    period: 'once-off',
    featured: true,
    serviceKey: 'business',
    tagline: 'Perfect for growing businesses that want more visibility.',
    features: ['Up to 10 Pages', 'Custom Design', 'Mobile Responsive', 'SEO Setup', 'WhatsApp Integration', 'Blog / News Section', 'Google Map', '2 Rounds of Revisions', 'Basic Training'],
  },
  {
    name: 'E-Commerce Website',
    tier: 'Tier 3 · LVL 03',
    stars: 3,
    price: 'R8,000 – R20,000+',
    period: 'once-off',
    featured: false,
    serviceKey: 'ecommerce',
    tagline: 'For businesses ready to sell products or services online.',
    features: ['Online Store Setup', 'Up to 50 Products', 'Secure Payments', 'Delivery Options', 'Product Management', 'Coupon / Discounts', 'SEO Setup', 'WhatsApp Integration', 'Training & Support'],
  },
  {
    name: 'Website Management',
    tier: 'Side Quest · Shield',
    stars: 0,
    price: 'R200 – R2,500',
    period: 'per month',
    featured: false,
    serviceKey: 'management',
    tagline: 'Keep your website secure, updated and performing at its best.',
    features: ['Content Updates', 'Security Monitoring', 'Backups', 'Plugin & Software Updates', 'Uptime Monitoring', 'Technical Support', 'Monthly Reports'],
  },
];

const bundleFeatures = [
  'Business Growth Courses', 'Digital Marketing Training', 'Financial Literacy Modules', 'Entrepreneurship Guides',
  'Monthly Live Webinars', 'Business Templates & Tools', 'Community Access', 'Certificate of Completion',
];

export default function PackagesSection() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="packages" ref={ref} className="py-24 bg-arcade-cream text-arcade-ink relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="animate-on-scroll opacity-100 animate-fade-in mb-14 text-center">
          <span className="font-pixel text-[10px] text-arcade-terracotta block mb-4">// 02 Transparent pricing</span>
          <h2 className="font-pixel uppercase" style={{ fontSize: 'clamp(1.2rem, 3.4vw, 2.4rem)', lineHeight: 1.3 }}>
            Select your <span className="inline-block bg-arcade-ink text-arcade-coin px-2.5 py-0.5">level</span>
          </h2>
          <p className="text-arcade-ink/70 mt-5 max-w-md mx-auto">
            Affordable packages built for South African small businesses. No hidden fees.
          </p>
        </div>

        {/* Featured bundle */}
        <div className="animate-on-scroll opacity-100 animate-fade-in mb-14 bg-arcade-canvas text-foreground border-2 border-arcade-ink shadow-[6px_6px_0_0_#FFC933]">
          <div className="bg-arcade-coin text-arcade-ink font-pixel text-[10px] text-center py-3 flex items-center justify-center gap-2">
            <Sprite name="star" className="w-4 h-4" /> Best value · featured package deal <Sprite name="star" className="w-4 h-4" />
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-8 lg:p-10">
              <h3 className="font-pixel text-base text-foreground mb-2">Business Study Bundle</h3>
              <p className="font-terminal text-xl text-arcade-green mb-5">MONTHLY SUBSCRIPTION</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-lg">
                Everything you need to grow your business knowledge and digital presence — bundled into one affordable
                monthly plan. Perfect for entrepreneurs and small business owners ready to level up.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bundleFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground/85">
                    <span className="text-arcade-green font-terminal text-lg" aria-hidden="true">✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-80 p-8 lg:p-10 bg-arcade-surface border-t-2 lg:border-t-0 lg:border-l-2 border-border flex flex-col items-center justify-center text-center gap-5">
              <div>
                <p className="font-terminal text-lg text-muted-foreground">STARTING FROM</p>
                <p className="font-pixel text-3xl text-primary my-2">R200</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
              <ul className="font-terminal text-lg text-arcade-cyan space-y-1">
                <li>▸ Cancel anytime</li>
                <li>▸ No lock-in contract</li>
              </ul>
              <button
                type="button"
                onClick={() => selectQuestAndScroll('study-bundle')}
                className="btn-arcade w-full"
              >
                [ Insert Coin ]
              </button>
              <p className="text-[11px] text-muted-foreground">Limited spots available each month</p>
            </div>
          </div>
        </div>

        {/* Tier cabinets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              className={`animate-on-scroll opacity-100 animate-fade-in relative flex flex-col border-2 border-arcade-ink ${
                pkg.featured
                  ? 'bg-arcade-canvas text-foreground shadow-[6px_6px_0_0_#FFC933] lg:-translate-y-3 border-arcade-coin'
                  : 'bg-white text-arcade-ink shadow-[4px_4px_0_0_#111319]'
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {pkg.featured && (
                <div className="bg-arcade-coin text-arcade-ink font-bold font-pixel text-[9px] text-center py-2 flex items-center justify-center gap-1.5">
                  <Sprite name="star" className="w-3.5 h-3.5" /> Most popular // gold star
                </div>
              )}
              <div className="p-6 pb-4">
                <div className="flex gap-1 h-5 mb-3" aria-hidden="true">
                  {Array.from({ length: pkg.stars }).map((_, k) => <Sprite key={k} name="star" className="w-5 h-5" />)}
                  {pkg.stars === 0 && <Sprite name="shield" className="w-5 h-5" />}
                </div>
                <p className={`font-terminal text-lg ${pkg.featured ? 'text-arcade-green' : 'text-arcade-terracotta'}`}>{pkg.tier}</p>
                <h3 className="font-pixel text-[13px] leading-snug mt-1 mb-4">{pkg.name}</h3>
                <p className={`font-pixel text-sm ${pkg.featured ? 'text-arcade-coin' : 'text-arcade-ink font-bold'}`}>{pkg.price}</p>
                <span className={`font-terminal text-lg ${pkg.featured ? 'text-muted-foreground' : 'text-arcade-ink/60'}`}>{pkg.period}</span>
                <p className={`text-xs mt-3 leading-relaxed ${pkg.featured ? 'text-muted-foreground' : 'text-arcade-ink/65'}`}>{pkg.tagline}</p>
              </div>
              <div className={`h-0.5 mx-6 ${pkg.featured ? 'bg-border' : 'bg-arcade-ink/15'}`} />
              <ul className="p-6 flex-1 space-y-2.5">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="text-arcade-green font-terminal text-lg leading-none mt-0.5" aria-hidden="true">✓</span>{f}
                  </li>
                ))}
              </ul>
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => selectQuestAndScroll(pkg.serviceKey)}
                  className="btn-arcade w-full"
                >
                  [ Insert Coin ]
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
