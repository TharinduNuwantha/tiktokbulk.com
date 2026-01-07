export interface TikTokVideoInfo {
    id: string;
    title: string;
    thumbnail: string;
    author: string;
    videoUrl: string;
    musicUrl?: string;
}

export async function getVideoInfo(url: string): Promise<TikTokVideoInfo> {
    // 1. Handle short URLs
    let targetUrl = url;
    if (url.includes('vm.tiktok.com') || url.includes('vt.tiktok.com')) {
        const response = await fetch(url, { redirect: 'follow' });
        targetUrl = response.url;
    }

    // 2. Extract Video ID
    const idMatch = targetUrl.match(/\/video\/(\d+)/);
    if (!idMatch) {
        throw new Error('Invalid TikTok URL');
    }
    const videoId = idMatch[1];

    // 3. Fetch from TikTok API
    // Note: In a real production app, you might need a proxy or a rotating user-agent
    const apiUrl = `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${videoId}`;

    const apiRes = await fetch(apiUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        }
    });

    const data = await apiRes.json();
    const aweme = data.aweme_list?.find((item: any) => item.aweme_id === videoId);

    if (!aweme) {
        throw new Error('Video not found or is private');
    }

    // The 'play_addr' contains the video URLs. 
    // 'url_list' usually has multiple CDNs. The first one is often the direct stream.
    const videoUrl = aweme.video.play_addr.url_list[0];
    const musicUrl = aweme.music?.play_url?.url_list[0];
    const thumbnail = aweme.video.cover.url_list[0];
    const title = aweme.desc || 'TikTok Video';
    const author = aweme.author.nickname;

    return {
        id: videoId,
        title,
        thumbnail,
        author,
        videoUrl,
        musicUrl
    };
}
