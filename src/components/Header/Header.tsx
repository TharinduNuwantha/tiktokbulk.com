'use client';

import React from 'react';
import styles from './Header.module.css';
import { Download } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.iconBox}>
                        <Download size={24} color="#FE2C55" />
                    </div>
                    <span className={styles.logoText}>TikTok<span className="title-gradient">Bulk.com</span></span>
                </Link>
                <nav className={styles.nav}>
                    <Link href="/#single" className={styles.navLink}>Single Download</Link>
                    <Link href="/#bulk" className={styles.navLink}>Bulk Tools</Link>
                    <Link href="/contact" className={styles.navLink}>Contact</Link>
                </nav>
            </div>
        </header>
    );
}
