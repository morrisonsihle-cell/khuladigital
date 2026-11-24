'use client';

import React, { useEffect, useState } from 'react';
import {
  CookieConsentValue,
  getStoredCookieConsent,
  openLegalModal,
  saveCookieConsent,
} from '@/components/legalConsent';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const existing = getStoredCookieConsent();
    if (existing !== null) {
      window.__kdsAnalyticsAllowed = existing === 'accepted';
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(true);
      window.requestAnimationFrame(() => setEntered(true));
    }, 800);

    return () => window.clearTimeout(timer);
  }, []);

  const handleChoice = (choice: CookieConsentValue) => {
    saveCookieConsent(choice);
    setEntered(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie consent"
      role="region"
      className={`fixed bottom-20 left-4 right-4 md:bottom-5 md:left-5 md:right-auto md:max-w-[390px] z-[55] transition-all duration-300 ease-out ${
        entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="bg-[#0A0B0E]/95 backdrop-blur-md border-2 border-arcade-coin shadow-[6px_6px_0_0_#000] p-4 sm:p-5">
        <p className="font-pixel text-[10px] text-arcade-coin mb-2.5 tracking-wide">
          // COOKIE_CONSENT
        </p>

        <p className="text-xs sm:text-sm text-[#F8F7F2]/90 leading-relaxed mb-4">
          We use cookies to optimize site performance and deliver a better web experience. View our{' '}
          <button
            type="button"
            onClick={() => openLegalModal('privacy')}
            className="text-arcade-coin font-semibold underline underline-offset-4 hover:text-[#FFE600] cursor-pointer transition-colors"
          >
            Privacy Policy
          </button>{' '}
          for details.
        </p>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="font-pixel text-[9px] uppercase bg-arcade-coin text-arcade-ink font-bold border-2 border-arcade-ink px-3.5 py-2.5 shadow-[3px_3px_0_0_#000] hover:bg-[#FFE600] active:translate-y-0.5 transition-all cursor-pointer"
          >
            [ ACCEPT COOKIES ]
          </button>
          <button
            type="button"
            onClick={() => handleChoice('essential')}
            className="font-pixel text-[9px] uppercase bg-transparent text-foreground border-2 border-arcade-coin/70 px-3.5 py-2.5 hover:border-arcade-coin hover:text-arcade-coin active:translate-y-0.5 transition-all cursor-pointer"
          >
            [ ESSENTIAL ONLY ]
          </button>
        </div>
      </div>
    </aside>
  );
}
