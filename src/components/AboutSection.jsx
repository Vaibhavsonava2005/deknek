'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './AboutSection.module.css';

function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const timeline = [
  { year: '2020', title: 'Founded', description: 'DekNek was born with a vision to transform digital experiences.' },
  { year: '2021', title: 'First 50 Clients', description: 'Rapid growth serving startups and enterprises across industries.' },
  { year: '2022', title: 'AI Integration', description: 'Pioneered AI-powered solutions for business automation.' },
  { year: '2023', title: 'Global Expansion', description: 'Expanded operations to 12 countries with 50+ team members.' },
  { year: '2024', title: 'Industry Leader', description: 'Recognized as a top digital solutions provider worldwide.' },
];

export default function AboutSection() {
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

    const elements = sectionRef.current?.querySelectorAll(`.${styles.animate}`);
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.about}`} id="about" ref={sectionRef}>
      <div className="container">
        {/* Top Grid */}
        <div className={styles.topGrid}>
          <div className={`${styles.leftContent} ${styles.animate}`}>
            <div className="section-badge">✦ About</div>
            <h2 className="section-title">
              Crafting digital
              <br />
              <span className="gradient-text">excellence since 2020</span>
            </h2>
            <p className="section-subtitle">
              We are a team of passionate engineers, designers, and strategists
              dedicated to building technology that matters. Our solutions combine
              innovation with reliability to deliver transformative results.
            </p>
            <div className={styles.values}>
              <div className={styles.value}>
                <div className={styles.valueIcon}>🎯</div>
                <div>
                  <h4>Mission-Driven</h4>
                  <p>Every project aligned with measurable outcomes</p>
                </div>
              </div>
              <div className={styles.value}>
                <div className={styles.valueIcon}>⚡</div>
                <div>
                  <h4>Innovation First</h4>
                  <p>Cutting-edge solutions that push boundaries</p>
                </div>
              </div>
              <div className={styles.value}>
                <div className={styles.valueIcon}>🤝</div>
                <div>
                  <h4>Partnership</h4>
                  <p>True collaboration with every client we serve</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className={`${styles.statsGrid} ${styles.animate}`}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                <AnimatedCounter end={150} suffix="+" />
              </div>
              <div className={styles.statLabel}>Projects Completed</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                <AnimatedCounter end={98} suffix="%" />
              </div>
              <div className={styles.statLabel}>Client Retention</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <div className={styles.statLabel}>Team Members</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                <AnimatedCounter end={12} />
              </div>
              <div className={styles.statLabel}>Countries Served</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          <h3 className={`${styles.timelineTitle} ${styles.animate}`}>Our Journey</h3>
          <div className={styles.timelineTrack}>
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`${styles.timelineItem} ${styles.animate}`}
                style={{ '--delay': `${index * 0.15}s` }}
              >
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
