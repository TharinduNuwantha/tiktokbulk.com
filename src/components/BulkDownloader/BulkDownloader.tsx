'use client';

import React, { useState } from 'react';
import styles from './BulkDownloader.module.css';
import { Layers, Play, Trash2, Plus, Loader2, Download, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DownloadResult {
    id: string;
    title: string;
    url: string;
    status: 'pending' | 'processing' | 'completed' | 'error';
}

export default function BulkDownloader() {
    const [links, setLinks] = useState<string[]>(['']);
    const [results, setResults] = useState<DownloadResult[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);

    const addLink = () => setLinks([...links, '']);
    const updateLink = (index: number, val: string) => {
        const newLinks = [...links];
        newLinks[index] = val;
        setLinks(newLinks);
    };
    const removeLink = (index: number) => {
        setLinks(links.filter((_, i) => i !== index));
    };

    const startBulkDownload = async () => {
        const validLinks = links.filter(l => l.trim() !== '');
        if (validLinks.length === 0) return;

        setIsProcessing(true);
        setProgress(0);
        const initialResults: DownloadResult[] = validLinks.map((url, i) => ({
            id: `link-${i}`,
            title: url.substring(0, 30) + '...',
            url: url,
            status: 'pending'
        }));
        setResults(initialResults);

        for (let i = 0; i < validLinks.length; i++) {
            setResults(prev => prev.map((res, idx) => idx === i ? { ...res, status: 'processing' } : res));

            try {
                const res = await fetch('/api/download', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: validLinks[i] }),
                });
                const data = await res.json();

                if (data.error) throw new Error(data.error);

                setResults(prev => prev.map((res, idx) => idx === i ? {
                    ...res,
                    status: 'completed',
                    title: data.title,
                    url: data.videoUrl
                } : res));
            } catch (err) {
                setResults(prev => prev.map((res, idx) => idx === i ? { ...res, status: 'error' } : res));
            }

            setProgress(Math.round(((i + 1) / validLinks.length) * 100));
        }

        setIsProcessing(false);
    };

    const downloadAll = () => {
        results.forEach(res => {
            if (res.status === 'completed' && res.url) {
                window.open(res.url, '_blank');
            }
        });
    };

    return (
        <section className={styles.bulkSection} id="bulk">
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.iconBox}><Layers size={24} color="#25F4EE" /></div>
                    <h2>Bulk Video Downloader</h2>
                    <p>Process multiple TikTok links at once and save time.</p>
                </div>

                <div className={styles.bulkCard}>
                    <div className={styles.linkList}>
                        {links.map((link, index) => (
                            <motion.div
                                key={index}
                                className={styles.linkInputRow}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <div className={styles.index}>{index + 1}</div>
                                <input
                                    type="text"
                                    placeholder="https://www.tiktok.com/@user/video/..."
                                    value={link}
                                    onChange={(e) => updateLink(index, e.target.value)}
                                    className={styles.input}
                                    disabled={isProcessing}
                                />
                                {!isProcessing && links.length > 1 && (
                                    <button onClick={() => removeLink(index)} className={styles.removeBtn}>
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <div className={styles.actions}>
                        <button onClick={addLink} className={styles.addBtn} disabled={isProcessing}>
                            <Plus size={18} /> Add More
                        </button>
                        <button
                            onClick={startBulkDownload}
                            className={styles.startBtn}
                            disabled={isProcessing || links.filter(l => l).length === 0}
                        >
                            {isProcessing ? <Loader2 size={18} className={styles.spin} /> : <Play size={18} fill="currentColor" />}
                            <span>{isProcessing ? 'Processing...' : 'Start Bulk Download'}</span>
                        </button>
                    </div>

                    {(isProcessing || results.length > 0) && (
                        <div className={styles.progressInfo}>
                            <div className={styles.progressHeader}>
                                <span>{progress === 100 ? 'Process Completed' : `Processing ${results.filter(r => r.status === 'completed').length} / ${results.length} links`}</span>
                                <span>{progress}%</span>
                            </div>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                            </div>

                            <div className={styles.resultsList}>
                                {results.map((res, i) => (
                                    <div key={i} className={styles.resultItem}>
                                        <div className={styles.resTitle}>{res.title}</div>
                                        <div className={styles.resStatus}>
                                            {res.status === 'processing' && <Loader2 size={16} className={styles.spin} />}
                                            {res.status === 'completed' && <CheckCircle size={16} color="#25F4EE" />}
                                            {res.status === 'error' && <span className={styles.errorText}>Failed</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {progress === 100 && (
                                <button onClick={downloadAll} className={styles.downloadAllBtn}>
                                    <Download size={18} /> Download All Completed
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
