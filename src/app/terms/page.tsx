import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './legal.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | TikTokBulk.com',
    description: 'Read the terms and conditions for using TikTokBulk.com services.',
};

export default function TermsPage() {
    return (
        <main className={styles.main}>
            <Header />
            <div className={styles.container}>
                <section className={styles.content}>
                    <h1>Terms of Service</h1>
                    <p className={styles.date}>Last updated: January 8, 2026</p>

                    <div className={styles.section}>
                        <h2>1. Acceptance of Terms</h2>
                        <p>By accessing and using TikTokBulk.com, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
                    </div>

                    <div className={styles.section}>
                        <h2>2. Use of Service</h2>
                        <p>Our tool is intended for personal, non-commercial use only. You agree not to use this service to download copyrighted material that you do not have the rights to. We are not responsible for any copyright infringement committed by users.</p>
                    </div>

                    <div className={styles.section}>
                        <h2>3. User Responsibilities</h2>
                        <p>You agree not to use the service for any illegal purposes or to interfere with the proper functioning of the website. Any attempt to disrupt our servers or bypass security measures is strictly prohibited.</p>
                    </div>

                    <div className={styles.section}>
                        <h2>4. Disclaimer of Warranties</h2>
                        <p>TikTokBulk is provided "as is" and "as available" without any warranties. We do not guarantee that the service will be uninterrupted, timely, secure, or error-free.</p>
                    </div>

                    <div className={styles.section}>
                        <h2>5. Limitation of Liability</h2>
                        <p>In no event shall TikTokBulk or its developer be liable for any damages arising out of the use or inability to use the service.</p>
                    </div>

                    <div className={styles.section}>
                        <h2>6. Changes to Terms</h2>
                        <p>We reserve the right to modify these terms at any time. Your continued use of the site following any changes signifies your acceptance of the new terms.</p>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
