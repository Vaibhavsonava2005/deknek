'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

// Dynamic import Hero3D with SSR disabled (Three.js needs browser)
const Hero3D = dynamic(() => import('@/components/Hero3D'), {
  ssr: false,
  loading: () => (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0f',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(255,255,255,0.1)',
        borderTopColor: '#00d4ff',
        borderRadius: '50%',
        animation: 'spin-slow 1s linear infinite',
      }} />
    </section>
  ),
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero3D />
        <div className="section-divider" />
        <FeaturesSection />
        <div className="section-divider" />
        <AboutSection />
        <ServicesSection />
        <div className="section-divider" />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
