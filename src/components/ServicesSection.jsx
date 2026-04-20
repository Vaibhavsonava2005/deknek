'use client';

import { useEffect, useRef } from 'react';
import styles from './ServicesSection.module.css';

const services = [
  {
    number: '01',
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks, optimized for performance and user experience.',
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    gradient: 'linear-gradient(135deg, #00d4ff, #0088cc)',
  },
  {
    number: '02',
    title: 'Mobile Applications',
    description: 'Native and cross-platform mobile apps that deliver seamless experiences across all devices.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    gradient: 'linear-gradient(135deg, #7b2ff7, #5a1dbf)',
  },
  {
    number: '03',
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions powered by cutting-edge AI models for automation and predictive analytics.',
    tags: ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
    gradient: 'linear-gradient(135deg, #ff2d95, #cc1177)',
  },
  {
    number: '04',
    title: 'Cloud Infrastructure',
    description: 'Scalable cloud architecture with DevOps automation for reliable, high-performance deployments.',
    tags: ['AWS', 'GCP', 'Docker', 'Kubernetes'],
    gradient: 'linear-gradient(135deg, #00f5a0, #00c880)',
  },
  {
    number: '05',
    title: 'UI/UX Design',
    description: 'User-centric design that combines aesthetics with functionality to create memorable digital experiences.',
    tags: ['Figma', 'Prototyping', 'Design Systems', 'Motion'],
    gradient: 'linear-gradient(135deg, #ff8c00, #ff6600)',
  },
  {
    number: '06',
    title: 'Consulting & Strategy',
    description: 'Expert guidance on digital transformation, technology strategy, and architecture decisions.',
    tags: ['Roadmapping', 'Architecture', 'Audits', 'Training'],
    gradient: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
  },
];

export default function ServicesSection() {
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
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll(`.${styles.card}`);
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.services}`} id="services" ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <div className="section-badge">✦ Services</div>
          <h2 className="section-title">
            What we
            <br />
            <span className="gradient-text-secondary">do best</span>
          </h2>
          <p className="section-subtitle">
            End-to-end digital solutions tailored to your business needs, delivered with precision and passion.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <div
              key={index}
              className={styles.card}
              style={{ '--delay': `${index * 0.1}s`, '--card-gradient': service.gradient }}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardNumber}>{service.number}</span>
                <div className={styles.cardArrow}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              <div className={styles.cardTags}>
                {service.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.cardBorderGlow}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
