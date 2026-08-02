'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const contactDetails = [
  {
    icon: 'PhoneIcon',
    label: 'Phone / WhatsApp',
    value: '065 108 5200',
    href: 'https://wa.me/27651085200',
  },
  {
    icon: 'EnvelopeIcon',
    label: 'Email',
    value: 'info@khuladigitalsolutions.co.za',
    href: 'mailto:info@khuladigitalsolutions.co.za',
  },
  {
    icon: 'GlobeAltIcon',
    label: 'Website',
    value: 'www.khuladigitalsolutions.co.za',
    href: 'https://www.khuladigitalsolutions.co.za',
  },
  {
    icon: 'MapPinIcon',
    label: 'Location',
    value: 'KwaZulu-Natal, South Africa',
    href: '#',
  },
];

function useTypingEffect(text: string, speed = 80) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');
    setDone(false);

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        indexRef.current += 1;
        setDisplayed(text.slice(0, indexRef.current));
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const { displayed: typedTalk, done: talkDone } = useTypingEffect("Let's Talk", 90);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    const serviceLabel = formData.service ? serviceLabels[formData.service] || formData.service : 'Not specified';
    const message = `Hello KHULA DIGITAL SOLUTIONS! 👋\n\nNew Inquiry:\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || 'Not provided'}\n*Service:* ${serviceLabel}\n\n*Message:*\n${formData.message || 'No message provided'}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/27651085200?text=${encoded}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-secondary/30 relative overflow-hidden">
      <div className="blob-gold absolute w-[400px] h-[400px] top-0 right-0 opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="animate-on-scroll opacity-100 animate-fade-in mb-16 text-center">
          <span className="section-label block mb-3">Get In Touch</span>
          <h2 className="font-display text-section-heading font-bold text-foreground leading-tight">
            <span className="text-gold-shimmer italic">
              {typedTalk}
            </span>
            {!talkDone && (
              <span className="inline-block w-[3px] h-[0.75em] bg-primary ml-1 align-middle animate-pulse" />
            )}
          </h2>
          <p className="text-muted-foreground text-sm mt-4 max-w-md mx-auto">
            Ready to grow your business online? Contact us today for a free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact info */}
          <div className="animate-on-scroll opacity-100 animate-fade-in">
            <div className="space-y-6 mb-10">
              {contactDetails.map((detail) => (
                <a
                  key={detail.label}
                  href={detail.href}
                  className="flex items-center gap-5 group p-4 rounded-xl border border-transparent hover:border-border hover:bg-card transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon name={detail.icon as any} size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      {detail.label}
                    </div>
                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {detail.value}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="gold-line-hover" />
                  </div>
                </a>
              ))}
            </div>

            {/* Hours */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <span className="section-label block mb-4">Business Hours</span>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday – Friday</span>
                  <span className="text-foreground font-medium">08:00 – 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="text-foreground font-medium">09:00 – 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="animate-on-scroll opacity-100 animate-fade-in-delay-2">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                Send an Inquiry
              </h3>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircleIcon" size={28} variant="solid" className="text-primary" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-foreground mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground text-sm">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Sipho Dlamini"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="071 234 5678"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="sipho@mybusiness.co.za"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                      Service Interested In
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select a service...</option>
                      <option value="study-bundle">Business Study Bundle (R200/month)</option>
                      <option value="starter">Starter Website (R2,500 – R4,000)</option>
                      <option value="business">Business Website (R5,000 – R10,000)</option>
                      <option value="ecommerce">E-Commerce Website (R8,000 – R20,000+)</option>
                      <option value="management">Website Management (R200 – R2,500/month)</option>
                      <option value="marketing">Digital Marketing Support</option>
                      <option value="branding">Branding & Design</option>
                      <option value="consulting">Business Growth Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your business and what you need..."
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full py-4 rounded-xl text-sm font-semibold uppercase tracking-widest"
                  >
                    Send via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}