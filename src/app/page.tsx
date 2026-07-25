import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import AboutSection from '@/app/components/AboutSection';
import ServicesSection from '@/app/components/ServicesSection';
import PackagesSection from '@/app/components/PackagesSection';
import ProcessSection from '@/app/components/ProcessSection';
import WhyUsSection from '@/app/components/WhyUsSection';
import ContactSection from '@/app/components/ContactSection';

export default function HomePage() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PackagesSection />
      <ProcessSection />
      <WhyUsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}