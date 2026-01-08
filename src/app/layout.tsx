import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'TikTokBulk.com | No Watermark TikTok Video Downloader & Bulk Tools',
    description: 'The fastest TikTok video downloader. Download single videos or bulk process multiple TikTok links without watermarks for free. Safe, fast, and no registration needed.',
    keywords: 'tiktok downloader, tiktok video download, no watermark tiktok, bulk tiktok downloader, tiktok mp4 download, tiktokbulk, download tiktok online',
    authors: [{ name: 'Tharindu Nuwantha' }],
    metadataBase: new URL('https://tiktokbulk.com'),
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: 'TikTokBulk.com | Professional TikTok Video Downloader',
        description: 'Fast, free, and bulk TikTok video downloads without watermarks.',
        type: 'website',
        url: 'https://tiktokbulk.com',
        siteName: 'TikTokBulk',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'TikTokBulk.com | TikTok Video Downloader',
        description: 'Download TikTok videos in bulk without watermarks.',
        creator: '@Tharindu_Nu',
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
