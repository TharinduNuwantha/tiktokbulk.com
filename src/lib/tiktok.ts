export interface TikTokVideoInfo {
    id: string;
    title: string;
    thumbnail: string;
    author: string;
    videoUrl: string;
    musicUrl?: string;
}

export async function getVideoInfo(url: string): Promise<TikTokVideoInfo> {
    // 1. Normalize and handle short URLs
    let targetUrl = url.trim();
    if (targetUrl.includes('vm.tiktok.com') || targetUrl.includes('vt.tiktok.com')) {
        try {
            const response = await fetch(targetUrl, {
                method: 'HEAD',
                redirect: 'follow'
            });
            targetUrl = response.url;
        } catch (e) {
            // Keep original and try to parse
        }
    }

    // 2. Extract Video ID
    const idMatch = targetUrl.match(/\/video\/(\d+)/) || targetUrl.match(/v=(\d+)/) || targetUrl.match(/\/v\/(\d+)/);
    if (!idMatch) {
        throw new Error('Could not find video ID. Please check the URL.');
    }
    const videoId = idMatch[1];

    // 3. Fetch from TikTok API with robust headers
    // Using a more reliable endpoint and adding common headers to avoid blocks
    const apiUrl = `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${videoId}`;

    try {
        const apiRes = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            },
            next: { revalidate: 0 } // Disable caching for fresh results
        });

        const text = await apiRes.text();

        if (!text) {
            throw new Error('Received empty response from TikTok. Please try again later.');
        }

        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            throw new Error('TikTok API returned invalid response. It may be restricted in your region.');
        }

        const aweme = data.aweme_list?.find((item: any) => item.aweme_id === videoId);

        if (!aweme) {
            throw new Error('Video not found. It might be private or deleted.');
        }

        // The 'play_addr' contains the video URLs. 
        // We look for 'url_list' which has the direct stream.
        const videoUrl = aweme.video?.play_addr?.url_list[0];
        const musicUrl = aweme.music?.play_url?.url_list[0];
        const thumbnail = aweme.video?.cover?.url_list[0];
        const title = aweme.desc || 'TikTok Video';
        const author = aweme.author?.nickname || 'Creator';

        if (!videoUrl) {
            throw new Error('Watermark-free video source not found for this video.');
        }

        return {
            id: videoId,
            title,
            thumbnail,
            author,
            videoUrl,
            musicUrl
        };
    } catch (error: any) {
        console.error('TikTok Lib Error:', error);
        throw error;
    }
}
