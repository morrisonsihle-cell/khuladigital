import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Win an E-Commerce Website Worth R8,000 | Khula Digital Solutions',
  description:
    '5 South African businesses stand a chance to win a professional E-Commerce Website worth R8,000 from Khula Digital Solutions. Enter the competition today.',
  keywords: [
    'Win an E-Commerce Website South Africa',
    'Website competition South Africa',
    'Win a website',
    'E-Commerce website giveaway',
    'South African business competition',
    'Free business website',
    'Website for small business South Africa',
    'Khula Digital Solutions',
  ],
  openGraph: {
    title: 'Win an E-Commerce Website Worth R8,000 | Khula Digital Solutions',
    description:
      '5 South African businesses stand a chance to win a professional E-Commerce Website worth R8,000. Enter now.',
    url: 'https://khuladigitalsolutions.co.za/competition',
    siteName: 'Khula Digital Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Win an E-Commerce Website Worth R8,000 | Khula Digital Solutions',
    description:
      '5 South African businesses stand a chance to win a professional E-Commerce Website worth R8,000. Enter now.',
  },
  alternates: {
    canonical: 'https://khuladigitalsolutions.co.za/competition',
  },
};

export default function CompetitionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
