'use client';

import React, { useState } from 'react';
import styles from './Hero.module.css';
import { Link2, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [videoData, setVideoData] = useState<any>(null);
    const [error, setError] = useState('');

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError('');
        // setVideoData(null); // Keep old data until new one is ready or just clear it

        try {
            const res = await fetch('/api/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const data = await res.json();
            if (!res.ok || data.error) throw new Error(data.error || 'Failed to fetch video');

            setVideoData(data);
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const downloadFile = async (fileUrl: string, fileName: string) => {
        try {
            // Create a link and click it - simpler for external URLs that might not support CORS
            // For real blob download, we need the file served with CORS headers or proxy it
            const a = document.createElement('a');
            a.href = fileUrl;
            a.download = fileName;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (err) {
            window.open(fileUrl, '_blank');
        }
    };

    return (
        <section className={styles.hero} id="single">
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.content}
                >
                    <span className={styles.badge}>🚀 Fastest TikTok Downloader</span>
                    <h1 className={styles.title}>
                        Download TikTok <br />
                        <span className="title-gradient">Without Watermark</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Best online tool to save TikTok videos in Full HD. Fast, free, and unlimited.
                        Simply paste the link and hit download.
                    </p>

                    <form onSubmit={handleDownload} className={styles.inputWrapper}>
                        <div className={styles.inputContainer}>
                            <Link2 className={styles.inputIcon} size={20} />
                            <input
                                type="text"
                                placeholder="Paste TikTok video link here..."
                                className={styles.input}
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <button className={styles.submitBtn} disabled={loading} type="submit">
                                {loading ? <Loader2 className={styles.spin} size={20} /> : <ArrowRight size={20} />}
                                <span>{loading ? 'Processing...' : 'Download'}</span>
                            </button>
                        </div>
                        {error && <p className={styles.errorMsg}>{error}</p>}
                    </form>

                    <div className={styles.trust}>
                        <div className={styles.trustItem}><CheckCircle2 size={16} /> HD Quality</div>
                        <div className={styles.trustItem}><CheckCircle2 size={16} /> Watermark Free</div>
                        <div className={styles.trustItem}><CheckCircle2 size={16} /> Unlimited Space</div>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {videoData && (
                        <motion.div
                            key={videoData.id}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className={styles.resultCard}
                        >
                            <img src={videoData.thumbnail} alt="preview" className={styles.preview} />
                            <div className={styles.resultInfo}>
                                <h3 className={styles.videoTitle}>{videoData.title}</h3>
                                <p className={styles.author}>by @{videoData.author}</p>
                                <div className={styles.downloadOptions}>
                                    <button
                                        onClick={() => downloadFile(videoData.videoUrl, `tikflow_${videoData.id}.mp4`)}
                                        className={styles.downloadAction}
                                    >
                                        Download MP4 (No Watermark)
                                    </button>
                                    {videoData.musicUrl && (
                                        <button
                                            onClick={() => downloadFile(videoData.musicUrl, `tikflow_audio_${videoData.id}.mp3`)}
                                            className={styles.downloadActionSecondary}
                                        >
                                            Download Music (MP3)
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
