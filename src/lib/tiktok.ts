export interface TikTokVideoInfo {
    id: string;
    title: string;
    thumbnail: string;
    author: string;
    videoUrl: string;
    musicUrl?: string;
}

export async function getVideoInfo(url: string): Promise<TikTokVideoInfo> {
    const targetUrl = url.trim();

    // Provider 1: TikWM (Very stable and high success rate)
    try {
        const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(targetUrl)}`, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data.code === 0 && data.data) {
                const item = data.data;
                return {
                    id: item.id || Date.now().toString(),
                    title: item.title || 'TikTok Video',
                    thumbnail: item.cover || '',
                    author: item.author?.nickname || 'Creator',
                    videoUrl: item.play || item.wmplay || '',
                    musicUrl: item.music || ''
                };
            }
        }
    } catch (e) {
        console.error('TikWM Provider failed:', e);
    }

    // Provider 2: TiklyDown (Fallback)
    try {
        const response = await fetch(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(targetUrl)}`);
        if (response.ok) {
            const data = await response.json();
            if (data.status === true && data.result) {
                const result = data.result;
                return {
                    id: result.id || Date.now().toString(),
                    title: result.desc || result.title || 'TikTok Video',
                    thumbnail: result.video?.cover || '',
                    author: result.author?.nickname || 'Creator',
                    videoUrl: result.video?.noWatermark || result.video?.watermark || '',
                    musicUrl: result.music?.play_url || ''
                };
            }
        }
    } catch (e) {
        console.error('TiklyDown Provider failed:', e);
    }

    // Provider 3: Dandi API (Last resort)
    try {
        const response = await fetch(`https://api.dandi.me/tiktok/v1?url=${encodeURIComponent(targetUrl)}`);
        if (response.ok) {
            const data = await response.json();
            if (data.video) {
                return {
                    id: data.id || Date.now().toString(),
                    title: data.description || 'TikTok Video',
                    thumbnail: data.thumbnail || '',
                    author: data.author || 'Creator',
                    videoUrl: data.video,
                    musicUrl: data.audio
                };
            }
        }
    } catch (e) {
        console.error('Dandi Provider failed:', e);
    }

    throw new Error('All download providers failed to fetch this video. It may be private, age-restricted, or TikTok is blocking our requests. Please try again later.');
}
