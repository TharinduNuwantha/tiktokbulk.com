import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './contact.module.css';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className={styles.main}>
            <Header />
            <div className={styles.container}>
                <div className={styles.contactWrapper}>
                    <div className={styles.profileSection}>
                        <div className={styles.imageContainer}>
                            <img
                                src="https://avatars.githubusercontent.com/u/105153249?v=4"
                                alt="Tharindu Nuwantha"
                                className={styles.profileImage}
                            />
                            <div className={styles.imageGlow}></div>
                        </div>
                        <div className={styles.profileInfo}>
                            <h1>Tharindu <span>Nuwantha</span></h1>
                            <p className={styles.title}>Full Stack Developer | IT Undergraduate</p>
                            <p className={styles.location}><MapPin size={16} /> Mirigama, Sri Lanka</p>
                        </div>
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.contactCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.iconBox}><Mail size={24} /></div>
                                <h3>Email</h3>
                            </div>
                            <p>tharindunuwantha77@gmail.com</p>
                            <a href="mailto:tharindunuwantha77@gmail.com" className={styles.actionBtn}>Send Mail</a>
                        </div>

                        <div className={styles.contactCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.iconBox}><Phone size={24} /></div>
                                <h3>Phone</h3>
                            </div>
                            <p>+94 71 589 3934</p>
                            <a href="tel:+94715893934" className={styles.actionBtn}>Call Now</a>
                        </div>

                        <div className={styles.contactCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.iconBox}><Github size={24} /></div>
                                <h3>GitHub</h3>
                            </div>
                            <p>github.com/TharinduNuwantha</p>
                            <a href="https://github.com/TharinduNuwantha" target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                                View Profile <ExternalLink size={14} />
                            </a>
                        </div>

                        <div className={styles.contactCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.iconBox}><Linkedin size={24} /></div>
                                <h3>LinkedIn</h3>
                            </div>
                            <p>linkedin.com/in/tharindu-nuwantha</p>
                            <a href="https://www.linkedin.com/in/tharindu-nuwantha/" target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                                Let's Connect <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    <div className={styles.messageBox}>
                        <h2>Get in Touch</h2>
                        <p>Have a question or feedback about TikTokBulk? Or maybe you want to collaborate on a project? Feel free to reach out via any of the channels above. I'll get back to you as soon as possible.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
