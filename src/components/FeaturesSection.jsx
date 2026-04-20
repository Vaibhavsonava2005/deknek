'use client';

import { useEffect, useRef } from 'react';
import styles from './FeaturesSection.module.css';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Scalable Architecture',
    description: 'Built on robust infrastructure that scales seamlessly from startup to enterprise, handling millions of requests with ease.',
    color: '#00d4ff',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12" />
        <path d="M12 6v6l4 2" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    title: 'Real-Time Analytics',
    description: 'Monitor performance metrics, user behavior, and business KPIs in real-time with our advanced analytics dashboard.',
    color: '#7b2ff7',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
    title: 'Enterprise Security',
    description: 'Bank-grade encryption, SOC 2 compliance, and zero-trust architecture to protect your most sensitive data.',
    color: '#ff2d95',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Lightning Performance',
    description: 'Sub-100ms response times with edge computing, CDN optimization, and intelligent caching strategies.',
    color: '#00f5a0',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    title: 'AI-Powered Insights',
    description: 'Leverage machine learning models to uncover patterns, predict trends, and automate decision-making processes.',
    color: '#00d4ff',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Team Collaboration',
    description: 'Seamless workflows with role-based access, real-time editing, and integrated communication tools.',
    color: '#7b2ff7',
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = sectionRef.current?.querySelectorAll(`.${styles.card}`);
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.features}`} id="features" ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <div className="section-badge">✦ Features</div>
          <h2 className="section-title">
            Everything you need to
            <br />
            <span className="gradient-text">build at scale</span>
          </h2>
          <p className="section-subtitle">
            Powerful tools and features designed to accelerate your development workflow and deliver exceptional results.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${styles.card} glass-card`}
              style={{ '--delay': `${index * 0.1}s`, '--accent': feature.color }}
            >
              <div className={styles.cardIcon} style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
              <div className={styles.cardGlow}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
