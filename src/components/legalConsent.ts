'use client';

export type LegalDocTab = 'privacy' | 'terms';
export type CookieConsentValue = 'accepted' | 'essential';

export const COOKIE_CONSENT_KEY = 'kds_cookie_consent';
const COOKIE_MAX_AGE_SECONDS = 15552000; // 180 days
const LEGAL_MODAL_EVENT = 'khula:open-legal';
const CONSENT_CHANGE_EVENT = 'khula:cookie-consent';

declare global {
  interface Window {
    __kdsAnalyticsAllowed?: boolean;
  }
}

/** Opens the Legal modal directly to the requested document tab. */
export function openLegalModal(tab: LegalDocTab) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<{ tab: LegalDocTab }>(LEGAL_MODAL_EVENT, { detail: { tab } }));
}

export function onOpenLegalModal(handler: (tab: LegalDocTab) => void) {
  if (typeof window === 'undefined') return () => {};
  const listener = (e: Event) => {
    const custom = e as CustomEvent<{ tab: LegalDocTab }>;
    if (custom.detail?.tab) handler(custom.detail.tab);
  };
  window.addEventListener(LEGAL_MODAL_EVENT, listener);
  return () => window.removeEventListener(LEGAL_MODAL_EVENT, listener);
}

/** Reads stored cookie preference from localStorage or browser cookie. */
export function getStoredCookieConsent(): CookieConsentValue | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === 'accepted' || stored === 'essential') return stored;
  } catch {
    // Ignore storage access errors in strict privacy modes
  }

  try {
    const match = document.cookie.match(/(?:^|;\s*)kds_cookie_consent=(accepted|essential)(?:;|$)/);
    if (match?.[1] === 'accepted' || match?.[1] === 'essential') return match[1];
  } catch {
    // Ignore cookie read errors
  }

  return null;
}

/** Persists consent choice cleanly for POPIA compliance and analytics gating. */
export function saveCookieConsent(value: CookieConsentValue) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    // Ignore storage quota / private mode errors
  }

  try {
    document.cookie = `${COOKIE_CONSENT_KEY}=${value}; max-age=${COOKIE_MAX_AGE_SECONDS}; path=/; SameSite=Lax`;
    if (value === 'essential') {
      for (const name of ['_ga', '_gid', '_gat']) {
        document.cookie = `${name}=; max-age=0; path=/; SameSite=Lax`;
      }
    }
  } catch {
    // Ignore cookie write errors
  }

  window.__kdsAnalyticsAllowed = value === 'accepted';
  window.dispatchEvent(new CustomEvent<{ consent: CookieConsentValue }>(CONSENT_CHANGE_EVENT, { detail: { consent: value } }));
}
