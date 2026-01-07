'use client';

import React from 'react';
import styles from './Header.module.css';
import { Download } from 'lucide-react';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <div className={styles.iconBox}>
                        <Download size={24} color="#FE2C55" />
                    </div>
                    <span className={styles.logoText}>TikTok<span className="title-gradient">Bulk.com</span></span>
                </div>
                <nav className={styles.nav}>
                    <a href="#single" className={styles.navLink}>Single Download</a>
                    <a href="#bulk" className={styles.navLink}>Bulk Tools</a>
                    <button className={styles.cta}>New Features</button>
                </nav>
            </div>
        </header>
    );
}
