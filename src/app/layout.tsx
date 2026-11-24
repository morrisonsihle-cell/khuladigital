import React from 'react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import LegalModals from '@/components/LegalModals';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import '../styles/tailwind.css';

// Retro 8-Bit design system fonts bundled locally so builds never fail on external font fetches
// Display / brand headings: chunky 8-bit bitmap pixel font
const pressStart = localFont({
  src: './fonts/press-start-2p.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-pixel',
  display: 'swap',
});

// Body & paragraphs: clean, modern geometric sans-serif (variable weight 300–700)
const spaceGrotesk = localFont({
  src: './fonts/space-grotesk.woff2',
  weight: '300 700',
  style: 'normal',
  variable: '--font-body',
  display: 'swap',
});

// Terminal / HUD readouts
const vt323 = localFont({
  src: './fonts/vt323.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-terminal',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111319',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://khuladigitalsolutions.co.za'),
  title: 'Khula Digital Solutions — Level Up Your Digital Game',
  description:
    'Khula Digital Solutions crafts custom websites, e-commerce engines, and high-performance branding designed to scale South African businesses.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/assets/images/khula-logo.jpg' }],
  },
  openGraph: {
    title: 'Khula Digital Solutions — Level Up Your Digital Game',
    description:
      'Custom websites, e-commerce stores, website management and digital marketing for South African small businesses.',
    url: 'https://khuladigitalsolutions.co.za',
    siteName: 'Khula Digital Solutions',
    images: [{ url: '/assets/images/khula-logo.jpg', width: 1024, height: 1024 }],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${spaceGrotesk.variable} ${vt323.variable}`}
      suppressHydrationWarning
    >
      <body className={spaceGrotesk.className}>
        {children}
        <CookieConsentBanner />
        <LegalModals />
      </body>
    </html>
  );
}
