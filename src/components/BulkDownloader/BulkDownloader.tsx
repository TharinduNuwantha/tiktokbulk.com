'use client';

import React, { useState } from 'react';
import styles from './BulkDownloader.module.css';
import { Layers, Play, Trash2, Plus, Loader2, Download, CheckCircle, FileArchive, FileVideo, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface DownloadResult {
    id: string;
    title: string;
    url: string;
    status: 'pending' | 'processing' | 'completed' | 'error';
    error?: string;
}

export default function BulkDownloader() {
    const [links, setLinks] = useState<string[]>(['']);
    const [results, setResults] = useState<DownloadResult[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadOption, setDownloadOption] = useState<'zip' | 'individual'>('zip');

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

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({ error: 'Server error' }));
                    throw new Error(errData.error || `Error ${res.status}`);
                }

                const data = await res.json();

                setResults(prev => prev.map((res, idx) => idx === i ? {
                    ...res,
                    status: 'completed',
                    title: data.title,
                    url: data.videoUrl
                } : res));
            } catch (err: any) {
                console.error('Bulk error:', err);
                setResults(prev => prev.map((res, idx) => idx === i ? {
                    ...res,
                    status: 'error',
                    error: err.message || 'Private video or connection error'
                } : res));
            }

            setProgress(Math.round(((i + 1) / validLinks.length) * 100));
        }

        setIsProcessing(false);
    };

    const downloadAsZip = async () => {
        const completedResults = results.filter(res => res.status === 'completed' && res.url);
        if (completedResults.length === 0) return;

        setIsDownloading(true);
        const zip = new JSZip();

        try {
            const downloadPromises = completedResults.map(async (res, index) => {
                try {
                    // Using a proxy to bypass CORS
                    const response = await fetch(`/api/proxy?url=${encodeURIComponent(res.url)}`);
                    const blob = await response.blob();
                    const fileName = `${res.title.replace(/[^\w\s]/gi, '').substring(0, 50) || 'video'}_${index}.mp4`;
                    zip.file(fileName, blob);
                } catch (e) {
                    console.error("Failed to fetch video for zip:", res.url, e);
                }
            });

            await Promise.all(downloadPromises);
            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, `tiktok_bulk_downloads_${Date.now()}.zip`);
        } catch (error) {
            console.error("Zip error:", error);
            alert("Failed to create ZIP file. Some videos may have restricted access.");
        } finally {
            setIsDownloading(false);
        }
    };

    const downloadIndividually = async () => {
        const completedResults = results.filter(res => res.status === 'completed' && res.url);
        if (completedResults.length === 0) return;

        setIsDownloading(true);

        for (const res of completedResults) {
            try {
                // Using a proxy to bypass CORS
                const response = await fetch(`/api/proxy?url=${encodeURIComponent(res.url)}`);
                const blob = await response.blob();
                const fileName = `${res.title.replace(/[^\w\s]/gi, '').substring(0, 50) || 'video'}.mp4`;
                saveAs(blob, fileName);
                // Small delay to prevent browser issues
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (e) {
                console.error("Failed to download video:", res.url, e);
                // Fallback to window.open if blob fetch fails
                window.open(res.url, '_blank');
            }
        }

        setIsDownloading(false);
    };

    const handleDownloadAll = () => {
        if (downloadOption === 'zip') {
            downloadAsZip();
        } else {
            downloadIndividually();
        }
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
                                            {res.status === 'error' && (
                                                <div className={styles.errorContainer}>
                                                    <AlertCircle size={16} color="#FF4D4D" />
                                                    <span className={styles.errorText} title={res.error}>Private Video/Error</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.downloadOptions}>
                                <div className={styles.optionSelector}>
                                    <button
                                        className={`${styles.optionBtn} ${downloadOption === 'zip' ? styles.activeOption : ''}`}
                                        onClick={() => setDownloadOption('zip')}
                                    >
                                        <FileArchive size={16} /> ZIP File
                                    </button>
                                    <button
                                        className={`${styles.optionBtn} ${downloadOption === 'individual' ? styles.activeOption : ''}`}
                                        onClick={() => setDownloadOption('individual')}
                                    >
                                        <FileVideo size={16} /> Individual
                                    </button>
                                </div>
                            </div>

                            {progress === 100 && (
                                <button
                                    onClick={handleDownloadAll}
                                    className={styles.downloadAllBtn}
                                    disabled={isDownloading || results.filter(r => r.status === 'completed').length === 0}
                                >
                                    {isDownloading ? (
                                        <Loader2 size={18} className={styles.spin} />
                                    ) : (
                                        <Download size={18} />
                                    )}
                                    <span>
                                        {isDownloading
                                            ? (downloadOption === 'zip' ? 'Preparing ZIP...' : 'Downloading...')
                                            : `Download All (${downloadOption === 'zip' ? '.zip' : 'Videos'})`}
                                    </span>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
