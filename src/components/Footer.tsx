import React from 'react';

import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Arc Browser Split Pattern */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Left: Logo + Tagline */}
          <div className="flex flex-col gap-4 max-w-xs">
            <div className="flex items-center gap-3">
              <AppLogo size={32} />
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-widest leading-none">
                  <span className="text-gold-gradient">KHULA DIGITAL </span><span className="text-black text-xs">SOLUTIONS</span>
                </span>
                <span className="text-[8px] uppercase tracking-[0.35em] text-muted-foreground leading-none mt-0.5">
                  (PTY) LTD
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We don&apos;t just build websites,{' '}
              <span className="text-primary font-medium">we help businesses grow.</span>
            </p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Growing Businesses Online
            </p>
          </div>

          {/* Right: Links */}
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#packages" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Packages</a>
            <a href="#process" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Process</a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Khula Digital Solutions (PTY) LTD · KwaZulu-Natal, South Africa
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}