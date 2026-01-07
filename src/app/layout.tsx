import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'TikFlow | Best Free TikTok Video Downloader',
    description: 'Download TikTok videos without watermark for free. Bulk download TikTok links at high speed. No registration required.',
    keywords: 'tiktok downloader, tiktok video download, no watermark tiktok, bulk tiktok downloader, tikflow',
    openGraph: {
        title: 'TikFlow | Best Free TikTok Video Downloader',
        description: 'Download TikTok videos without watermark for free.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-gradient">
                {children}
            </body>
        </html>
    );
}
