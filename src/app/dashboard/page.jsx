'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      setUser(user);

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className="spinner" style={{ width: 40, height: 40 }}></div>
      </div>
    );
  }

  const displayName = profile?.full_name || user?.user_metadata?.full_name || 'User';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={styles.dashboardPage}>
      {/* Sidebar / Top Bar */}
      <nav className={styles.topBar}>
        <Link href="/" className={styles.logo}>
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoSvg}>
            <defs>
              <linearGradient id="dashLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#7b2ff7" />
              </linearGradient>
            </defs>
            <path d="M8 6h10c7.732 0 14 6.268 14 14s-6.268 14-14 14H8V6z" stroke="url(#dashLogoGrad)" strokeWidth="2.5" fill="none"/>
            <path d="M14 12v16l12-8-12-8z" fill="url(#dashLogoGrad)" opacity="0.8"/>
          </svg>
          <span className={styles.logoText}>Dek<span className={styles.logoHighlight}>Nek</span></span>
        </Link>

        <div className={styles.topBarRight}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <div className={styles.avatar}>
            <span>{initials}</span>
          </div>
          <div className={styles.welcomeText}>
            <h1>Welcome back, <span className="gradient-text">{displayName}</span></h1>
            <p>Here&apos;s your dashboard overview</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(0, 212, 255, 0.08)', color: '#00d4ff' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h3>Active Projects</h3>
              <p className={styles.statValue}>3</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(123, 47, 247, 0.08)', color: '#7b2ff7' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <div>
              <h3>Performance</h3>
              <p className={styles.statValue}>98%</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(0, 245, 160, 0.08)', color: '#00f5a0' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div>
              <h3>Uptime</h3>
              <p className={styles.statValue}>99.9%</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(255, 45, 149, 0.08)', color: '#ff2d95' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h3>Team</h3>
              <p className={styles.statValue}>12</p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className={styles.profileSection}>
          <h2>Your Profile</h2>
          <div className={styles.profileCard}>
            <div className={styles.profileRow}>
              <span className={styles.profileLabel}>Email</span>
              <span className={styles.profileValue}>{user?.email}</span>
            </div>
            <div className={styles.profileRow}>
              <span className={styles.profileLabel}>Name</span>
              <span className={styles.profileValue}>{displayName}</span>
            </div>
            <div className={styles.profileRow}>
              <span className={styles.profileLabel}>Member Since</span>
              <span className={styles.profileValue}>
                {new Date(user?.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className={styles.profileRow}>
              <span className={styles.profileLabel}>Account Status</span>
              <span className={styles.statusBadge}>Active</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
