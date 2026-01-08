import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url');

    if (!url) {
        return new NextResponse('URL is required', { status: 400 });
    }

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://www.tiktok.com/'
            }
        });

        if (!response.ok) {
            return new NextResponse('Failed to fetch video content', { status: response.status });
        }

        const blob = await response.blob();
        const headers = new Headers();
        headers.set('Content-Type', response.headers.get('Content-Type') || 'video/mp4');
        headers.set('Content-Length', response.headers.get('Content-Length') || blob.size.toString());

        return new NextResponse(blob, {
            status: 200,
            headers,
        });
    } catch (error: any) {
        console.error('Proxy error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
