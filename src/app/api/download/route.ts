import { NextRequest, NextResponse } from 'next/server';
import { getVideoInfo } from '@/lib/tiktok';

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        const videoData = await getVideoInfo(url);

        return NextResponse.json(videoData);
    } catch (error: any) {
        console.error('Download error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to process video' },
            { status: 500 }
        );
    }
}
