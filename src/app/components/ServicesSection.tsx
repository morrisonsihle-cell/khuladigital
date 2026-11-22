'use client';

import React, { useRef } from 'react';
import { Sprite } from '@/components/ui/PixelSprite';
import { useReveal } from '@/components/useReveal';
import { selectQuestAndScroll, QuestServiceKey } from '@/components/selectQuest';

const quests: {
  lvl: string;
  sprite: string;
  title: string;
  hp: number;
  reward: string;
  coins: number;
  serviceKey: QuestServiceKey;
  desc: string;
}[] = [
  {
    lvl: '01',
    sprite: 'sword',
    title: 'Website Design & Development',
    hp: 4,
    reward: 'Unique Web Identity',
    coins: 30,
    serviceKey: 'starter',
    desc: 'Modern, responsive and user-friendly websites that represent your brand and convert visitors into customers.',
  },
  {
    lvl: '02',
    sprite: 'coins',
    title: 'E-Commerce Solutions',
    hp: 4,
    reward: '24/7 Digital Merchant',
    coins: 80,
    serviceKey: 'ecommerce',
    desc: 'Online stores with secure payment gateways, product management and easy checkout experience.',
  },
  {
    lvl: '03',
    sprite: 'shield',
    title: 'Website Management',
    hp: 3,
    reward: 'Security & Peace of Mind',
    coins: 10,
    serviceKey: 'management',
    desc: 'Ongoing updates, security monitoring, backups, and technical support so your website is always running smoothly.',
  },
  {
    lvl: '04',
    sprite: 'chart',
    title: 'Business Growth Consulting',
    hp: 3,
    reward: 'Revenue Multiplier',
    coins: 50,
    serviceKey: 'consulting',
    desc: 'We analyse your business, identify opportunities and create digital strategies that attract more customers and increase revenue.',
  },
  {
    lvl: '05',
    sprite: 'megaphone',
    title: 'Digital Marketing Support',
    hp: 2,
    reward: 'Local SEO & Traffic Boost',
    coins: 40,
    serviceKey: 'marketing',
    desc: 'SEO, Google Business Profile setup, social media strategy, content creation and online advertising.',
  },
  {
    lvl: '06',
    sprite: 'quill',
    title: 'Branding & Design',
    hp: 2,
    reward: 'Legendary Brand Crest',
    coins: 25,
    serviceKey: 'branding',
    desc: 'Logos, business profiles, social media branding, email signatures and marketing materials.',
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="services" ref={ref} className="py-24 bg-background relative overflow-hidden pixel-grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="animate-on-scroll opacity-100 animate-fade-in mb-14 text-center">
          <span className="font-pixel text-[10px] text-arcade-green block mb-4">SELECT YOUR OBJECTIVE // 6 ACTIVE QUESTS</span>
          <h2 className="font-pixel uppercase text-foreground" style={{ fontSize: 'clamp(1.2rem, 3.4vw, 2.4rem)', lineHeight: 1.3 }}>
            Choose your <span className="text-arcade-coin">quest</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-lg mx-auto">
            Six core service areas designed to take your business from offline to thriving online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((q, i) => (
            <article
              key={q.title}
              className="animate-on-scroll opacity-100 animate-fade-in pixel-card p-6 flex flex-col"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <header className="flex items-center justify-between mb-5">
                <span className="hp-bar" role="img" aria-label={`Difficulty ${q.hp} of 5`}>
                  {Array.from({ length: 5 }).map((_, k) => <span key={k} className={k < q.hp ? '' : 'off'} />)}
                </span>
                <span className="font-pixel text-[10px] text-arcade-coin">LVL {q.lvl}</span>
              </header>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 flex-shrink-0 border-2 border-arcade-coin bg-arcade-canvas p-2">
                  <Sprite name={q.sprite} className="w-full h-full" />
                </div>
                <h3 className="font-bold text-lg leading-tight text-foreground">{q.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{q.desc}</p>

              <div className="mt-5 flex items-center justify-between font-terminal text-lg">
                <span className="text-arcade-coin">● {q.coins} COINS</span>
                <span className="text-arcade-green">REWARD: {q.reward}</span>
              </div>

              <button
                type="button"
                onClick={() => selectQuestAndScroll(q.serviceKey)}
                className="btn-arcade mt-5 w-full"
              >
                [ Select Quest ]
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
