import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <span className={styles.logo}>TikTok<span>Bulk</span></span>
                        <p>The ultimate tool for high-quality TikTok video downloads without watermarks.</p>
                    </div>
                    <div className={styles.linksGroup}>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                        <Link href="/contact">Contact Us</Link>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>© 2026 TikTokBulk Downloader. Built by Tharindu Nuwantha. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
