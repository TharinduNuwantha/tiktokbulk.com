import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './legal.module.css';

export default function PrivacyPage() {
    return (
        <main className={styles.main}>
            <Header />
            <div className={styles.container}>
                <section className={styles.content}>
                    <h1>Privacy Policy</h1>
                    <p className={styles.date}>Last updated: January 8, 2026</p>

                    <div className={styles.section}>
                        <h2>1. Information We Collect</h2>
                        <p>TikTokBulk is designed to respect your privacy. We do not require account registration, and we do not collect personal information such as your name, email address, or phone number when you use our core downloading services.</p>
                    </div>

                    <div className={styles.section}>
                        <h2>2. Usage Data</h2>
                        <p>We may collect non-personal information about how you interact with our site, such as your IP address, browser type, and the pages you visit. This data is used solely for improving our service and ensuring site stability.</p>
                    </div>

                    <div className={styles.section}>
                        <h2>3. Cookies</h2>
                        <p>We use essential cookies to maintain your preferences and provide a smooth user experience. You can choose to disable cookies in your browser settings, though some features of the site may not function properly.</p>
                    </div>

                    <div className={styles.section}>
                        <h2>4. Third-Party Services</h2>
                        <p>Our service interacts with TikTok's public APIs to fetch video data. We do not share your URLs or download history with any third parties except as required by law.</p>
                    </div>

                    <div className={styles.section}>
                        <h2>5. Security</h2>
                        <p>We implement industry-standard security measures to protect against unauthorized access to the data we maintain. However, no method of transmission over the internet is 100% secure.</p>
                    </div>

                    <div className={styles.section}>
                        <h2>6. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us through our contact page.</p>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
