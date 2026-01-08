import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import BulkDownloader from '@/components/BulkDownloader/BulkDownloader';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';
import { Shield, Zap, Globe, Smartphone } from 'lucide-react';

export default function Home() {
    return (
        <main className={styles.main}>
            <Header />
            <Hero />

            {/* Features Section */}
            <section className={styles.features}>
                <div className={styles.container}>
                    <div className={styles.featureGrid}>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon} style={{ background: 'rgba(254, 44, 85, 0.1)' }}>
                                <Zap color="#FE2C55" />
                            </div>
                            <h3>Fast Processing</h3>
                            <p>Download your favorite TikTok videos in seconds with our optimized servers.</p>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon} style={{ background: 'rgba(37, 244, 238, 0.1)' }}>
                                <Shield color="#25F4EE" />
                            </div>
                            <h3>Watermark Free</h3>
                            <p>Get clean videos without the annoying TikTok watermark for better viewing.</p>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon} style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                                <Smartphone color="#fff" />
                            </div>
                            <h3>Mobile Friendly</h3>
                            <p>Works perfectly on Android and iPhone devices. No installation required.</p>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon} style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                                <Globe color="#fff" />
                            </div>
                            <h3>Zero Limits</h3>
                            <p>Download as many videos as you want. Bulk tools included for power users.</p>
                        </div>
                    </div>
                </div>
            </section>

            <BulkDownloader />

            {/* How to Download Section - SEO Optimized */}
            <section className={styles.guide}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>How to Download TikTok Videos without Watermark</h2>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <span className={styles.stepNum}>01</span>
                            <h4>Copy the Link</h4>
                            <p>Open TikTok app or website, find your video and copy the URL.</p>
                        </div>
                        <div className={styles.step}>
                            <span className={styles.stepNum}>02</span>
                            <h4>Paste URL</h4>
                            <p>Paste the link into the TikTokBulk search box above.</p>
                        </div>
                        <div className={styles.step}>
                            <span className={styles.stepNum}>03</span>
                            <h4>Download</h4>
                            <p>Click download and choose your preferred format (HD or MP3).</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section - SEO Optimized */}
            <section className={styles.faq}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                        <div className={styles.faqItem}>
                            <h4>Is it safe to use TikTokBulk?</h4>
                            <p>Yes, TikTokBulk is completely secure and doesn't store your personal data or downloaded videos.</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h4>Does it work on iPhone?</h4>
                            <p>Absolutely! You can use TikTokBulk on iOS via Safari or any other browser.</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h4>Can I bulk download?</h4>
                            <p>Yes, we have a dedicated section for bulk downloads where you can process multiple links at once.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
