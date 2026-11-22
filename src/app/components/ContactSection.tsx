'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Sprite } from '@/components/ui/PixelSprite';
import { useReveal } from '@/components/useReveal';
import { onQuestSelect } from '@/components/selectQuest';

const contactDetails = [
  { label: 'Phone / WhatsApp', value: '065 108 5200', href: 'https://wa.me/27651085200' },
  { label: 'Email', value: 'info@khuladigitalsolutions.co.za', href: 'mailto:info@khuladigitalsolutions.co.za' },
  { label: 'Website', value: 'www.khuladigitalsolutions.co.za', href: 'https://www.khuladigitalsolutions.co.za' },
  { label: 'Location', value: 'KwaZulu-Natal, South Africa', href: '' },
];

const serviceLabels: Record<string, string> = {
  'study-bundle': 'Business Study Bundle (R200/month)',
  starter: 'Starter Website (R2,500 – R4,000)',
  business: 'Business Website (R5,000 – R10,000)',
  ecommerce: 'E-Commerce Website (R8,000 – R20,000+)',
  management: 'Website Management (R200 – R2,500/month)',
  marketing: 'Digital Marketing Support',
  branding: 'Branding & Design',
  consulting: 'Business Growth Consulting',
};

const fieldClass =
  'w-full bg-[#04100a] border-2 border-arcade-green/50 px-4 py-3 font-terminal text-xl text-arcade-green placeholder:text-arcade-green/40 focus:outline-none focus:border-arcade-green focus:shadow-[0_0_0_2px_rgba(34,197,94,0.35)]';
const labelClass = 'font-terminal text-lg text-foreground block mb-1.5 uppercase';

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loadedBanner, setLoadedBanner] = useState('');

  useEffect(() => {
    return onQuestSelect((service) => {
      setFormData((prev) => ({ ...prev, service }));
      setLoadedBanner(serviceLabels[service] || service);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceLabel = formData.service ? serviceLabels[formData.service] || formData.service : 'Not specified';
    const message = `Hello KHULA DIGITAL SOLUTIONS! 👋\n\nNew Inquiry:\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || 'Not provided'}\n*Service:* ${serviceLabel}\n\n*Message:*\n${formData.message || 'No message provided'}`;
    window.open(`https://wa.me/27651085200?text=${encodeURIComponent(message)}`, '_blank');
    setSubmitted(true);
    setLoadedBanner('');
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-background relative overflow-hidden pixel-grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="animate-on-scroll opacity-100 animate-fade-in mb-14 text-center">
          <span className="font-pixel text-[10px] text-arcade-green block mb-4">Get in touch</span>
          <h2 className="font-pixel uppercase text-foreground" style={{ fontSize: 'clamp(1.2rem, 3.4vw, 2.4rem)', lineHeight: 1.3 }}>
            Contact &amp; <span className="text-primary">enter</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-md mx-auto">
            Ready to grow your business online? Contact us today for a free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Terminal form */}
          <div className="animate-on-scroll opacity-100 animate-fade-in-delay-2 border-2 border-arcade-ink bg-[#c9c5bb] shadow-[6px_6px_0_0_#000]">
            <div className="flex items-center justify-between bg-[#8f8b80] border-b-2 border-arcade-ink px-3 py-2">
              <span className="font-terminal text-xl text-arcade-ink">INITIATE TRANSMISSION / CONTACT US</span>
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="w-4 h-4 bg-[#c9c5bb] border-2 border-arcade-ink" />
                <span className="w-4 h-4 bg-[#c9c5bb] border-2 border-arcade-ink" />
              </span>
            </div>
            <div className="bg-[#06130c] p-6 relative">
              {loadedBanner && !submitted && (
                <div className="mb-4 border border-arcade-green/70 bg-arcade-green/10 px-3 py-2 font-terminal text-lg text-arcade-green" role="status">
                  &gt; QUEST LOADED: {loadedBanner}
                </div>
              )}
              {submitted ? (
                <div className="text-center py-14" role="status">
                  <Sprite name="trophy" className="w-16 h-16 mx-auto mb-4 animate-float" />
                  <h3 className="font-pixel text-sm text-arcade-green mb-3">Quest sent!</h3>
                  <p className="font-terminal text-xl text-foreground">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="c-name" className={labelClass}>Your name *</label>
                      <input id="c-name" type="text" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" placeholder="Sipho Dlamini" className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="c-phone" className={labelClass}>Phone number</label>
                      <input id="c-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" placeholder="071 234 5678" className={fieldClass} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-email" className={labelClass}>Email address *</label>
                    <input id="c-email" type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder="sipho@mybusiness.co.za" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="c-service" className={labelClass}>Quest / service</label>
                    <select id="c-service" name="service" value={formData.service} onChange={handleChange} className={fieldClass}>
                      <option value="">Select a service...</option>
                      {Object.entries(serviceLabels).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="c-message" className={labelClass}>Tell us about your project</label>
                    <textarea id="c-message" name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell us about your business and what you need..." className={`${fieldClass} resize-none`} />
                  </div>
                  <button type="submit" className="btn-arcade w-full" style={{ background: '#FFC933' }}>[ Submit Quest via WhatsApp ]</button>
                </form>
              )}
            </div>
          </div>

          {/* Direct Consultation / Quick WhatsApp */}
          <div className="animate-on-scroll opacity-100 animate-fade-in space-y-6">
            <div className="bg-arcade-surface border-2 border-arcade-coin shadow-[6px_6px_0_0_#000] p-6 text-center">
              <Sprite name="gem" className="w-14 h-14 mx-auto mb-3 animate-float" />
              <p className="font-pixel text-[10px] text-arcade-coin leading-snug uppercase">// Fast Response</p>
              <p className="font-terminal text-2xl text-foreground mt-2">READY TO GROW YOUR BUSINESS?</p>
              <p className="font-sans text-xs text-muted-foreground mt-2 max-w-xs mx-auto leading-relaxed">
                Chat directly with our team on WhatsApp for a custom quote, digital strategy consultation, or quick advice.
              </p>
              <a
                href="https://wa.me/27651085200?text=Hi%20Khula%20Digital%20Solutions!%20I'd%20like%20to%20discuss%20a%20website%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 font-pixel text-[10px] bg-arcade-coin text-arcade-ink font-bold px-5 py-3 hover:bg-white transition-colors border-2 border-arcade-ink shadow-[2px_2px_0_0_#000]"
              >
                [ Chat on WhatsApp ]
              </a>
            </div>

            <ul className="space-y-3">
              {contactDetails.map((d) => {
                const body = (
                  <>
                    <span className="font-terminal text-lg text-arcade-green block">{d.label.toUpperCase()}</span>
                    <span className="font-medium text-foreground">{d.value}</span>
                  </>
                );
                const isExternal = d.href.startsWith('http');
                return (
                  <li key={d.label}>
                    {d.href ? (
                      <a
                        href={d.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="block pixel-card p-4"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="pixel-card p-4">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="pixel-card p-5">
              <span className="font-pixel text-[10px] text-primary block mb-3">Business hours</span>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Monday – Friday</dt><dd className="font-medium">08:00 – 17:00</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Saturday</dt><dd className="font-medium">09:00 – 13:00</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Sunday</dt><dd className="text-muted-foreground">Closed</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
