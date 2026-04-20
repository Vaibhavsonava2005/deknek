'use client';

import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.glowLine}></div>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoSvg}>
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#7b2ff7" />
                  </linearGradient>
                </defs>
                <path d="M8 6h10c7.732 0 14 6.268 14 14s-6.268 14-14 14H8V6z" stroke="url(#footerLogoGrad)" strokeWidth="2.5" fill="none"/>
                <path d="M14 12v16l12-8-12-8z" fill="url(#footerLogoGrad)" opacity="0.8"/>
              </svg>
              <span className={styles.logoText}>Dek<span className={styles.logoHighlight}>Nek</span></span>
            </div>
            <p className={styles.brandDesc}>
              Transforming businesses through innovative digital solutions.
              Building the future, one project at a time.
            </p>
          </div>

          {/* Links */}
          <div className={styles.linkCol}>
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#services">Services</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </div>

          <div className={styles.linkCol}>
            <h4>Resources</h4>
            <a href="#">Documentation</a>
            <a href="#">Blog</a>
            <a href="#">Case Studies</a>
            <a href="#">API Reference</a>
          </div>

          <div className={styles.linkCol}>
            <h4>Connect</h4>
            <a href="#">Twitter</a>
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="#">Discord</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} DekNek. All rights reserved.</p>
          <button onClick={scrollToTop} className={styles.scrollTop} aria-label="Scroll to top">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
