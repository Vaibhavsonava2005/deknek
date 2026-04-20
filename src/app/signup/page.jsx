'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from '../login/auth.module.css';

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const getPasswordStrength = () => {
    if (!password) return { level: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 1, label: 'Weak', color: '#ff2d95' };
    if (score === 2) return { level: 2, label: 'Fair', color: '#ff8c00' };
    if (score === 3) return { level: 3, label: 'Good', color: '#00d4ff' };
    return { level: 4, label: 'Strong', color: '#00f5a0' };
  };

  const strength = getPasswordStrength();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      // Create profile entry
      if (data.user) {
        await supabase.from('profiles').insert([
          {
            id: data.user.id,
            full_name: fullName,
          },
        ]);
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.authPage}>
        <div className={styles.bgOrbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
          <div className={styles.orb3}></div>
        </div>
        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            <div className={styles.successCard}>
              <div className={styles.successIcon}>✓</div>
              <h2>Account Created!</h2>
              <p>Please check your email to verify your account, then sign in.</p>
              <Link href="/login" className={styles.submitBtn} style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}>
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authPage}>
      {/* Animated background */}
      <div className={styles.bgOrbs}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
      </div>

      <div className={styles.authContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logoLink}>
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoSvg}>
            <defs>
              <linearGradient id="signupLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#7b2ff7" />
              </linearGradient>
            </defs>
            <path d="M8 6h10c7.732 0 14 6.268 14 14s-6.268 14-14 14H8V6z" stroke="url(#signupLogoGrad)" strokeWidth="2.5" fill="none"/>
            <path d="M14 12v16l12-8-12-8z" fill="url(#signupLogoGrad)" opacity="0.8"/>
          </svg>
          <span className={styles.logoText}>Dek<span className={styles.logoHighlight}>Nek</span></span>
        </Link>

        <div className={styles.authCard}>
          <div className={styles.cardHeader}>
            <h1>Create account</h1>
            <p>Start your journey with DekNek</p>
          </div>

          <form onSubmit={handleSignup} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="signup-name">Full name</label>
              <input
                id="signup-name"
                type="text"
                required
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
              />
              {password && (
                <div className={styles.strengthBar}>
                  <div className={styles.strengthTrack}>
                    <div
                      className={styles.strengthFill}
                      style={{
                        width: `${(strength.level / 4) * 100}%`,
                        background: strength.color,
                      }}
                    />
                  </div>
                  <span style={{ color: strength.color }}>{strength.label}</span>
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="signup-confirm">Confirm password</label>
              <input
                id="signup-confirm"
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <span className={styles.btnLoading}>
                  <span className="spinner"></span>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className={styles.cardFooter}>
            <p>Already have an account? <Link href="/login" className={styles.link}>Sign in</Link></p>
          </div>
        </div>

        <Link href="/" className={styles.backLink}>
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
