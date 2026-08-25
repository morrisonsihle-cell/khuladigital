'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

// ─── Analytics helper ───────────────────────────────────────────────────────
function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, params);
  }
}

// ─── Countdown ───────────────────────────────────────────────────────────────
const CLOSE_DATE = new Date('2026-09-25T23:59:00+02:00');

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, closed: false });

  useEffect(() => {
    function calc() {
      const diff = CLOSE_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, closed: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        closed: false,
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

// ─── CountdownUnit ────────────────────────────────────────────────────────────
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center"
        style={{
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 20px rgba(0,0,0,0.4)',
        }}
      >
        <span className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-gold-gradient tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
    </div>
  );
}

// ─── Prize Feature Card ───────────────────────────────────────────────────────
function PrizeCard({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl"
      style={{
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span className="text-2xl flex-shrink-0">{emoji}</span>
      <div>
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

// ─── Step ────────────────────────────────────────────────────────────────────
function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div
        className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center font-display font-bold text-sm"
        style={{
          background: 'linear-gradient(135deg, #8B6914, #C9A227, #D4AF37)',
          color: '#080808',
        }}
      >
        {num}
      </div>
      <div className="pt-1.5">
        <div className="text-sm font-bold uppercase tracking-widest text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

// ─── Field Label ─────────────────────────────────────────────────────────────
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2 font-medium">
      {children}
    </label>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CompetitionPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const countdown = useCountdown();
  const [formStarted, setFormStarted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tcsOpen, setTcsOpen] = useState(false);

  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    whatsapp: '',
    email: '',
    industry: '',
    existingWebsite: '',
    socialMedia: '',
    challenge: '',
    isAdult: false,
    agreeTC: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const scrollToForm = useCallback(() => {
    trackEvent('competition_enter_click');
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    if (!formStarted) {
      setFormStarted(true);
      trackEvent('competition_form_start');
    }
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!form.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!form.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.industry) newErrors.industry = 'Please select your industry';
    if (!form.challenge.trim()) newErrors.challenge = 'Please describe your biggest digital challenge';
    if (!form.isAdult) newErrors.isAdult = 'You must confirm you are 18 or older';
    if (!form.agreeTC) newErrors.agreeTC = 'You must agree to the Terms & Conditions';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    trackEvent('competition_form_submit');
    const msg = `🎉 KHULA DIGITAL SOLUTIONS WEBSITE COMPETITION ENTRY

Business Name: ${form.businessName}

Owner / Representative: ${form.ownerName}

WhatsApp: ${form.whatsapp}

Email: ${form.email}

Industry: ${form.industry}

Existing Website: ${form.existingWebsite || 'None'}

Social Media: ${form.socialMedia || 'None'}

Biggest Digital Challenge: ${form.challenge}

I confirm that I am 18 years or older and agree to the Competition Terms & Conditions.`;

    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/27651085200?text=${encoded}`;
    trackEvent('competition_whatsapp_click');
    window.open(waUrl, '_blank');
    setShowConfirmation(true);
  };

  const openWhatsApp = () => {
    trackEvent('competition_whatsapp_click');
    window.open('https://wa.me/27651085200', '_blank');
  };

  // ─── Confirmation Screen ──────────────────────────────────────────────────
  if (showConfirmation) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center"
        style={{ background: '#080808' }}
      >
        <div className="blob-gold absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-md w-full">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
            style={{
              background: 'linear-gradient(135deg, #8B6914, #C9A227, #D4AF37)',
              boxShadow: '0 0 30px rgba(201,162,39,0.25)',
            }}
          >
            🎉
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">YOUR ENTRY IS READY!</h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Your competition entry has been prepared in WhatsApp.{' '}
            <span className="text-foreground font-medium">Send the message to 065 108 5200</span> to complete your submission.
          </p>
          <button
            onClick={openWhatsApp}
            className="btn-gold w-full py-4 rounded-2xl text-sm font-bold uppercase tracking-widest mb-4"
          >
            📲 OPEN WHATSAPP
          </button>
          <Link
            href="/"
            className="block text-center text-xs text-muted-foreground hover:text-foreground transition-colors py-3"
          >
            ← Return to Khula Digital Solutions
          </Link>
        </div>
      </div>
    );
  }

  // ─── Main Page ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#080808' }}>

      {/* ── Minimal Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <Link href="/" className="flex items-center gap-2">
          <AppLogo size={32} />
          <span className="hidden sm:block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Khula Digital Solutions</span>
        </Link>
        <button
          onClick={scrollToForm}
          className="btn-gold px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest"
          aria-label="Enter competition"
        >
          🚀 ENTER NOW
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center px-5 pt-24 pb-10 text-center overflow-hidden" style={{ minHeight: '100svh' }}>
        {/* Background blobs — very subtle */}
        <div className="blob-gold absolute w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 opacity-10 pointer-events-none" />
        <div className="blob-amber absolute w-[300px] h-[300px] bottom-0 right-0 opacity-10 pointer-events-none" />
        {/* Grid lines — white, very subtle */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-[10px] uppercase tracking-[0.25em] font-medium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#C9A227' }}>
            🏆 Competition Open · Closes 25 Sep 2026
          </div>

          {/* Main headline */}
          <h1 className="font-display font-bold leading-none mb-4" style={{ fontSize: 'clamp(2.4rem, 10vw, 6rem)' }}>
            <span className="text-foreground block">5 BUSINESSES.</span>
            <span className="text-foreground block">5 WEBSITES.</span>
            <span className="text-gold-gradient block" style={{ fontSize: 'clamp(1.3rem, 5vw, 3.5rem)' }}>R40,000 TOTAL VALUE.</span>
          </h1>

          {/* Sub-headline */}
          <div className="mt-3 mb-6">
            <span
              className="inline-block font-display font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl"
              style={{
                fontSize: 'clamp(0.85rem, 2.8vw, 1.5rem)',
                background: 'linear-gradient(135deg, #8B6914, #C9A227, #D4AF37)',
                color: '#080808',
                boxShadow: '0 0 20px rgba(201,162,39,0.2)',
              }}
            >
              WIN AN E-COMMERCE WEBSITE WORTH R8,000!
            </span>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto mb-8">
            Khula Digital Solutions is giving <span className="text-foreground font-medium">5 local businesses</span> the opportunity to take their business online with a professional E-Commerce Website.
          </p>

          {/* CTAs — stacked on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={scrollToForm}
              className="btn-gold px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest w-full sm:w-auto"
              style={{ boxShadow: '0 0 20px rgba(201,162,39,0.2)' }}
            >
              🚀 ENTER NOW
            </button>
            <a
              href="#prize"
              className="btn-outline-gold px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest w-full sm:w-auto text-center"
            >
              SEE WHAT YOU CAN WIN
            </a>
          </div>

          {/* Mock device — hidden on small mobile, shown from sm up */}
          <div className="hidden sm:block mt-12 relative mx-auto max-w-lg">
            <div
              className="rounded-2xl overflow-hidden mx-auto"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 0 40px rgba(0,0,0,0.5)',
                padding: '1.25rem',
              }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <div className="flex-1 ml-2 h-5 rounded-md flex items-center px-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="text-[9px] text-muted-foreground">yourbusiness.co.za</span>
                </div>
              </div>
              {/* Mock website */}
              <div className="rounded-xl overflow-hidden" style={{ background: '#0d0d0d' }}>
                <div className="h-8 flex items-center px-4 gap-3" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-16 h-2 rounded-full bg-gold-gradient opacity-60" />
                  <div className="flex gap-2 ml-auto">
                    {[1,2,3].map(i => <div key={i} className="w-8 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />)}
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="h-20 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="p-3 space-y-1.5">
                      <div className="w-24 h-2 rounded-full bg-gold-gradient opacity-50" />
                      <div className="w-32 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                      <div className="w-16 h-5 rounded-lg mt-2 bg-gold-gradient opacity-70" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-14 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="p-2 space-y-1">
                          <div className="w-full h-6 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
                          <div className="w-3/4 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COUNTDOWN ── */}
      <section className="py-12 px-5 relative" style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label block mb-4">Competition Closes In</span>
          {countdown.closed ? (
            <div
              className="inline-block font-display font-bold text-3xl sm:text-4xl uppercase tracking-widest px-8 py-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#C9A227' }}
            >
              ENTRIES CLOSED
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <CountdownUnit value={countdown.days} label="Days" />
              <span className="font-display text-2xl sm:text-3xl text-gold-gradient font-bold mb-5">:</span>
              <CountdownUnit value={countdown.hours} label="Hours" />
              <span className="font-display text-2xl sm:text-3xl text-gold-gradient font-bold mb-5">:</span>
              <CountdownUnit value={countdown.minutes} label="Mins" />
              <span className="font-display text-2xl sm:text-3xl text-gold-gradient font-bold mb-5">:</span>
              <CountdownUnit value={countdown.seconds} label="Secs" />
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-5 tracking-widest uppercase">
            Closes 25 Sep 2026 at 11:59 PM · Winners announced 30 Sep 2026
          </p>
        </div>
      </section>

      {/* ── PRIZE ── */}
      <section id="prize" className="py-14 px-5 relative overflow-hidden">
        <div className="blob-gold absolute w-[400px] h-[400px] top-0 right-0 opacity-8 pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-label block mb-3">The Prize</span>
            <h2 className="font-display font-bold text-foreground" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}>
              WHAT YOU COULD WIN
            </h2>
            <div className="mt-4 inline-block">
              <span
                className="font-display font-bold text-xl sm:text-3xl px-5 py-2 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #8B6914, #C9A227, #D4AF37)', color: '#080808' }}
              >
                R8,000 WEBSITE PACKAGE
              </span>
            </div>
            <p className="text-muted-foreground text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              Each of the <span className="text-foreground font-medium">5 selected winners</span> receives a professional E-Commerce Website package valued at R8,000.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <PrizeCard emoji="🛒" title="E-Commerce Website" desc="Fully functional online store built for your business" />
            <PrizeCard emoji="📦" title="Up to 50 Products" desc="List and manage your full product catalogue" />
            <PrizeCard emoji="💳" title="Payment Integration" desc="Accept payments securely online" />
            <PrizeCard emoji="🚚" title="Delivery Options" desc="Flexible shipping and delivery configuration" />
            <PrizeCard emoji="📲" title="WhatsApp Integration" desc="Connect with customers directly via WhatsApp" />
            <PrizeCard emoji="📈" title="SEO Setup" desc="Optimised to be found on Google" />
            <PrizeCard emoji="🎓" title="Training & Support" desc="We train you to manage your own website" />
            <PrizeCard emoji="🌐" title="Hosting Included" desc="Website hosting included within the prize" />
          </div>

          {/* Key message */}
          <div
            className="text-center py-5 px-5 rounded-2xl"
            style={{
              background: '#111111',
              border: '1px solid rgba(201,162,39,0.3)',
            }}
          >
            <p className="font-display font-bold text-lg sm:text-2xl text-gold-gradient uppercase tracking-widest">
              WINNERS PAY ONLY FOR THEIR DOMAIN.
            </p>
            <p className="text-xs text-muted-foreground mt-2">No website development costs. No hosting fees. Just your domain.</p>
          </div>
        </div>
      </section>

      {/* ── HOW TO ENTER ── */}
      <section className="py-14 px-5" style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-label block mb-3">Simple Process</span>
            <h2 className="font-display font-bold text-foreground" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
              HOW TO ENTER
            </h2>
          </div>
          <div className="space-y-5">
            <Step num="1" title="WATCH" desc="Discover the competition through Khula Digital Solutions on TikTok." />
            <div className="w-px h-3 bg-gradient-to-b from-primary/40 to-transparent ml-5" />
            <Step num="2" title="VISIT" desc="Visit the official competition page at khuladigitalsolutions.co.za/competition" />
            <div className="w-px h-3 bg-gradient-to-b from-primary/40 to-transparent ml-5" />
            <Step num="3" title="COMPLETE" desc="Complete the business entry form with your details and biggest digital challenge." />
            <div className="w-px h-3 bg-gradient-to-b from-primary/40 to-transparent ml-5" />
            <Step num="4" title="SUBMIT" desc="Submit your entry through WhatsApp to complete your application." />
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={scrollToForm}
              className="btn-gold px-10 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest w-full sm:w-auto"
            >
              🚀 ENTER NOW
            </button>
          </div>
        </div>
      </section>

      {/* ── ENTRY FORM ── */}
      {/* Extra bottom padding so sticky CTA doesn't overlap last field */}
      <section id="entry-form" ref={formRef} className="py-14 px-4 pb-32 md:pb-14 relative overflow-hidden">
        <div className="blob-gold absolute w-[400px] h-[400px] bottom-0 left-0 opacity-8 pointer-events-none" />
        <div className="max-w-lg mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="section-label block mb-3">Apply Now</span>
            <h2 className="font-display font-bold text-foreground" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
              ENTER THE COMPETITION
            </h2>
            <p className="text-muted-foreground text-sm mt-3 max-w-md mx-auto">
              Tell us about your business and your biggest digital challenge.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl p-5 sm:p-7 space-y-5"
            style={{
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 0 40px rgba(0,0,0,0.4)',
            }}
          >
            {/* Business Name */}
            <div>
              <FieldLabel>Business Name *</FieldLabel>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="e.g. Sipho's Fashion Store"
                className="w-full rounded-xl px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                style={{ background: '#080808', border: `1px solid ${errors.businessName ? '#ef4444' : 'rgba(255,255,255,0.1)'}` }}
              />
              {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName}</p>}
            </div>

            {/* Owner Name */}
            <div>
              <FieldLabel>Owner / Representative Name *</FieldLabel>
              <input
                type="text"
                name="ownerName"
                value={form.ownerName}
                onChange={handleChange}
                placeholder="e.g. Sipho Dlamini"
                className="w-full rounded-xl px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                style={{ background: '#080808', border: `1px solid ${errors.ownerName ? '#ef4444' : 'rgba(255,255,255,0.1)'}` }}
              />
              {errors.ownerName && <p className="text-red-400 text-xs mt-1">{errors.ownerName}</p>}
            </div>

            {/* WhatsApp */}
            <div>
              <FieldLabel>WhatsApp Number *</FieldLabel>
              <input
                type="tel"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="e.g. 071 234 5678"
                className="w-full rounded-xl px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                style={{ background: '#080808', border: `1px solid ${errors.whatsapp ? '#ef4444' : 'rgba(255,255,255,0.1)'}` }}
              />
              {errors.whatsapp && <p className="text-red-400 text-xs mt-1">{errors.whatsapp}</p>}
            </div>

            {/* Email */}
            <div>
              <FieldLabel>Email Address *</FieldLabel>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="sipho@mybusiness.co.za"
                className="w-full rounded-xl px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                style={{ background: '#080808', border: `1px solid ${errors.email ? '#ef4444' : 'rgba(255,255,255,0.1)'}` }}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Industry */}
            <div>
              <FieldLabel>Business Industry *</FieldLabel>
              <select
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-4 text-base text-foreground focus:outline-none transition-colors appearance-none"
                style={{ background: '#080808', border: `1px solid ${errors.industry ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, color: form.industry ? 'var(--foreground)' : 'var(--muted-foreground)' }}
              >
                <option value="" disabled>Select your industry</option>
                <option value="Beauty & Hair">Beauty &amp; Hair</option>
                <option value="Fashion & Clothing">Fashion &amp; Clothing</option>
                <option value="Food & Restaurant">Food &amp; Restaurant</option>
                <option value="Retail">Retail</option>
                <option value="Construction">Construction</option>
                <option value="Professional Services">Professional Services</option>
                <option value="Health & Wellness">Health &amp; Wellness</option>
                <option value="Automotive">Automotive</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
              {errors.industry && <p className="text-red-400 text-xs mt-1">{errors.industry}</p>}
            </div>

            {/* Existing Website */}
            <div>
              <FieldLabel>Existing Website <span className="text-muted-foreground/50 normal-case">(optional)</span></FieldLabel>
              <input
                type="url"
                name="existingWebsite"
                value={form.existingWebsite}
                onChange={handleChange}
                placeholder="e.g. www.mybusiness.co.za"
                className="w-full rounded-xl px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            {/* Social Media */}
            <div>
              <FieldLabel>Social Media Pages <span className="text-muted-foreground/50 normal-case">(optional)</span></FieldLabel>
              <input
                type="text"
                name="socialMedia"
                value={form.socialMedia}
                onChange={handleChange}
                placeholder="e.g. @mybusiness on Instagram, TikTok"
                className="w-full rounded-xl px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            {/* Biggest Challenge */}
            <div>
              <FieldLabel>Biggest Digital Challenge *</FieldLabel>
              <textarea
                name="challenge"
                value={form.challenge}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us what's holding your business back online..."
                className="w-full rounded-xl px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors resize-none"
                style={{ background: '#080808', border: `1px solid ${errors.challenge ? '#ef4444' : 'rgba(255,255,255,0.1)'}` }}
              />
              {errors.challenge && <p className="text-red-400 text-xs mt-1">{errors.challenge}</p>}
            </div>

            {/* Checkboxes */}
            <div className="space-y-4 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    name="isAdult"
                    checked={form.isAdult}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center transition-all"
                    style={{
                      background: form.isAdult ? 'linear-gradient(135deg, #8B6914, #C9A227)' : '#080808',
                      border: `2px solid ${errors.isAdult ? '#ef4444' : form.isAdult ? '#C9A227' : 'rgba(255,255,255,0.2)'}`,
                    }}
                  >
                    {form.isAdult && <svg width="12" height="9" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#080808" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground leading-relaxed">
                  I confirm that I am <span className="text-foreground font-medium">18 years or older</span> and eligible to enter this competition.
                </span>
              </label>
              {errors.isAdult && <p className="text-red-400 text-xs -mt-2 ml-9">{errors.isAdult}</p>}

              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    name="agreeTC"
                    checked={form.agreeTC}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center transition-all"
                    style={{
                      background: form.agreeTC ? 'linear-gradient(135deg, #8B6914, #C9A227)' : '#080808',
                      border: `2px solid ${errors.agreeTC ? '#ef4444' : form.agreeTC ? '#C9A227' : 'rgba(255,255,255,0.2)'}`,
                    }}
                  >
                    {form.agreeTC && <svg width="12" height="9" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#080808" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground leading-relaxed">
                  I have read and agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setTcsOpen(true)}
                    className="text-primary underline underline-offset-2 hover:text-accent transition-colors"
                  >
                    Competition Terms &amp; Conditions
                  </button>
                  .
                </span>
              </label>
              {errors.agreeTC && <p className="text-red-400 text-xs -mt-2 ml-9">{errors.agreeTC}</p>}
            </div>

            <button
              type="submit"
              className="btn-gold w-full py-5 rounded-2xl text-sm font-bold uppercase tracking-widest mt-2"
            >
              📲 SUBMIT ENTRY VIA WHATSAPP
            </button>

            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Your entry will open in WhatsApp. Send the pre-filled message to complete your submission.
            </p>
          </form>
        </div>
      </section>

      {/* ── WHY KHULA ── */}
      <section className="py-14 px-5" style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label block mb-3">About Us</span>
          <h2 className="font-display font-bold text-foreground mb-8" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
            WHY KHULA DIGITAL SOLUTIONS?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8">
            {[
              { icon: '✓', title: 'Professional Digital Solutions', desc: 'We build websites and digital tools that actually work for your business.' },
              { icon: '✓', title: 'Mobile-First Websites', desc: 'Every website we build is designed for mobile users first.' },
              { icon: '✓', title: 'Business-Focused Design', desc: 'We design with your customers and conversions in mind.' },
              { icon: '✓', title: 'Digital Growth & Automation', desc: 'We help you grow and automate your business online.' },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-4 rounded-xl"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="text-xl font-bold text-gold-gradient flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-foreground mb-1">{item.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#C9A227' }}>
            HELPING BUSINESSES GROW DIGITALLY
          </p>
        </div>
      </section>

      {/* ── T&Cs ACCORDION ── */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setTcsOpen(!tcsOpen)}
            className="w-full flex items-center justify-between p-5 rounded-2xl text-left transition-all"
            style={{
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            aria-expanded={tcsOpen}
          >
            <span className="text-sm font-bold uppercase tracking-widest text-foreground">Competition Terms &amp; Conditions</span>
            <span
              className="text-primary transition-transform duration-300 text-lg font-bold flex-shrink-0 ml-3"
              style={{ transform: tcsOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              +
            </span>
          </button>
          {tcsOpen && (
            <div
              className="mt-2 p-5 rounded-2xl text-xs text-muted-foreground leading-relaxed space-y-3"
              style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p>• Competition runs from 25 August 2026 to 25 September 2026.</p>
              <p>• Entries close at 11:59 PM on 25 September 2026.</p>
              <p>• Five eligible businesses will be selected as winners.</p>
              <p>• Each winner receives website design and development services valued at R8,000.</p>
              <p>• The winner pays only for their domain registration.</p>
              <p>• Hosting is included within the prize scope.</p>
              <p>• Prize is based on Khula Digital Solutions' standard E-Commerce Website package.</p>
              <p>• Features outside the agreed prize scope may require additional costs.</p>
              <p>• Winners must provide required business information, product information, images and content needed for development.</p>
              <p>• Winners will be contacted using the details supplied during entry.</p>
              <p>• If a selected winner does not respond within 7 days, Khula Digital Solutions may select an alternative winner.</p>
              <p>• The prize cannot be exchanged for cash or transferred.</p>
              <p>• This competition is not affiliated with, sponsored by, endorsed by or administered by TikTok, Instagram, Facebook or Meta.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#080808' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <AppLogo size={44} />
          </div>
          <p className="font-display font-bold text-sm tracking-widest mb-1">
            <span className="text-gold-gradient">KHULA DIGITAL </span>
            <span className="text-foreground/60 text-xs">SOLUTIONS</span>
          </p>
          <p className="text-xs text-muted-foreground mb-4">Digital Solutions for Growing Businesses.</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground mb-6">
            <a href="https://khuladigitalsolutions.co.za/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">khuladigitalsolutions.co.za</a>
            <a href="https://wa.me/27651085200" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">065 108 5200</a>
            <a href="https://www.tiktok.com/@khuladigitalsolutions" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">TikTok</a>
            <a href="https://www.instagram.com/khuladigitalsolutions" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61593476080822" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Facebook</a>
          </div>
          <p className="text-[10px] text-muted-foreground">
            © 2026 Khula Digital Solutions (PTY) LTD · KwaZulu-Natal, South Africa
          </p>
          <p className="text-[9px] text-muted-foreground/50 mt-1">
            This competition is not affiliated with, sponsored by, endorsed by or administered by TikTok, Instagram, Facebook or Meta.
          </p>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-safe-bottom" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)', background: 'linear-gradient(to top, rgba(8,8,8,0.98) 70%, transparent)', paddingTop: '12px' }}>
        <button
          onClick={scrollToForm}
          className="btn-gold w-full py-4 rounded-2xl text-sm font-bold uppercase tracking-widest"
        >
          🚀 ENTER NOW — WIN R8,000 WEBSITE
        </button>
      </div>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href="https://wa.me/27651085200"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Us"
        onClick={() => trackEvent('competition_whatsapp_click')}
        className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
        style={{ backgroundColor: '#25D366' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="white">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.476 2.027 7.785L0 32l8.418-2.004A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.77-1.848l-.485-.287-5.001 1.19 1.22-4.87-.317-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.87c-.398-.2-2.355-1.162-2.72-1.295-.366-.133-.632-.2-.898.2-.266.398-1.03 1.295-1.263 1.561-.232.266-.465.3-.863.1-.398-.2-1.682-.62-3.204-1.977-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.175-.812.18-.178.398-.465.598-.698.2-.232.266-.398.398-.664.133-.266.067-.498-.033-.698-.1-.2-.898-2.163-1.23-2.96-.324-.778-.653-.673-.898-.685l-.765-.013c-.266 0-.698.1-1.063.498-.366.398-1.396 1.363-1.396 3.326s1.43 3.858 1.629 4.124c.2.266 2.814 4.296 6.82 6.025.953.412 1.697.658 2.277.842.957.305 1.828.262 2.516.159.767-.114 2.355-.963 2.688-1.893.333-.93.333-1.727.233-1.893-.1-.166-.366-.266-.764-.465z" />
        </svg>
        <span className="text-white text-xs font-bold hidden sm:block">WhatsApp Us</span>
      </a>
    </div>
  );
}
