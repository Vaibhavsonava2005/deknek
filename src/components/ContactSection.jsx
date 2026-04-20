'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('contacts').insert([
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
      ]);

      if (error) throw error;

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className={`section ${styles.contact}`} id="contact" ref={sectionRef}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left */}
          <div className={`${styles.leftContent} ${styles.animate}`}>
            <div className="section-badge">✦ Contact</div>
            <h2 className="section-title">
              Let&apos;s build something
              <br />
              <span className="gradient-text">amazing together</span>
            </h2>
            <p className="section-subtitle">
              Ready to transform your digital presence? Get in touch with our team
              and let&apos;s discuss how we can bring your vision to life.
            </p>

            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h4>Email Us</h4>
                  <p>hello@deknek.com</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h4>Visit Us</h4>
                  <p>Global — Remote First</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`${styles.formContainer} ${styles.animate}`} style={{ '--delay': '0.2s' }}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="contact-name" className={styles.label}>Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact-email" className={styles.label}>Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact-message" className={styles.label}>Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={styles.textarea}
                />
              </div>

              <button
                type="submit"
                className={`btn-primary ${styles.submitBtn}`}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className="spinner"></span>
                ) : status === 'success' ? (
                  <span>✓ Message Sent!</span>
                ) : (
                  <span>Send Message</span>
                )}
              </button>

              {status === 'error' && (
                <p className={styles.errorText}>{errorMsg}</p>
              )}
              {status === 'success' && (
                <p className={styles.successText}>Thank you! We&apos;ll get back to you soon.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
