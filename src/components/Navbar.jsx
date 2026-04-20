'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Check auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#7b2ff7" />
                </linearGradient>
              </defs>
              <path d="M8 6h10c7.732 0 14 6.268 14 14s-6.268 14-14 14H8V6z" stroke="url(#logoGrad)" strokeWidth="2.5" fill="none"/>
              <path d="M14 12v16l12-8-12-8z" fill="url(#logoGrad)" opacity="0.8"/>
            </svg>
          </div>
          <span className={styles.logoText}>
            Dek<span className={styles.logoHighlight}>Nek</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className={styles.navLinks}>
          <button onClick={() => scrollToSection('features')} className={styles.navLink}>Features</button>
          <button onClick={() => scrollToSection('about')} className={styles.navLink}>About</button>
          <button onClick={() => scrollToSection('services')} className={styles.navLink}>Services</button>
          <button onClick={() => scrollToSection('contact')} className={styles.navLink}>Contact</button>
        </div>

        {/* Auth Buttons */}
        <div className={styles.authButtons}>
          {user ? (
            <>
              <Link href="/dashboard" className={styles.dashboardBtn}>Dashboard</Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>Log In</Link>
              <Link href="/signup" className="btn-primary">
                <span>Get Started</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        <button onClick={() => scrollToSection('features')} className={styles.mobileLink}>Features</button>
        <button onClick={() => scrollToSection('about')} className={styles.mobileLink}>About</button>
        <button onClick={() => scrollToSection('services')} className={styles.mobileLink}>Services</button>
        <button onClick={() => scrollToSection('contact')} className={styles.mobileLink}>Contact</button>
        <div className={styles.mobileDivider}></div>
        {user ? (
          <>
            <Link href="/dashboard" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className={styles.mobileLink}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Log In</Link>
            <Link href="/signup" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
