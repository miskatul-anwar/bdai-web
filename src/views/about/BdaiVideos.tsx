"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { PlayCircle } from 'lucide-react';

type VideoItem = {
  url: string;
  videoId: string;
  title?: string;
  postedAt?: string;
  views?: string;
  thumbnail?: string;
};

const videosData: VideoItem[] = [
  {
    url: 'https://www.youtube.com/watch?v=9-a4MVHqZow',
    videoId: '9-a4MVHqZow',
  },
  {
    url: 'https://www.youtube.com/watch?v=J2VZUgkArZY',
    videoId: 'J2VZUgkArZY',
  },
  {
    url: 'https://drive.google.com/drive/folders/1O7XGQ0k81bPCVmXFc-UZp8Bq7r7EajyL',
    videoId: 'bdai-lab-preview',
    title: 'BDAI Lab Video Preview',
    thumbnail: '/bdai-lab-preview.png',
  },
];

const getThumbnail = (video: VideoItem) =>
  video.thumbnail ?? `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;

export default function BdaiVideos() {
  const [videos, setVideos] = useState<VideoItem[]>(videosData);

  useEffect(() => {
    let active = true;

    const loadTitles = async () => {
      const result = await Promise.all(
        videosData.map(async (video) => {
          if (!video.url.includes('youtube.com') && !video.url.includes('youtu.be')) {
            return video;
          }
          try {
            const response = await fetch(
              `https://www.youtube.com/oembed?url=${encodeURIComponent(video.url)}&format=json`
            );

            if (!response.ok) return video;

            const data = (await response.json()) as { title?: string; thumbnail_url?: string };

            return {
              ...video,
              title: data.title ?? video.title,
              thumbnail: data.thumbnail_url ?? video.thumbnail,
            };
          } catch {
            return video;
          }
        })
      );

      if (active) setVideos(result);
    };

    loadTitles();

    return () => {
      active = false;
    };
  }, []);

  const videoCount = useMemo(() => videos.length, [videos.length]);

  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <PlayCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">About</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">BDAI Videos</h1>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <p className="text-sm text-[#0c2461]/70">{videoCount} video{videoCount === 1 ? '' : 's'}</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-6">
          {videos.map((video) => (
            <article
              key={video.videoId}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <a href={video.url} target="_blank" rel="noreferrer" className="block group">
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={getThumbnail(video)}
                    alt={video.title ?? 'Video thumbnail'}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white/90 p-4 shadow-lg">
                      <PlayCircle className="h-10 w-10 text-[#0c2461]" />
                    </div>
                  </div>
                </div>
              </a>

              <div className="p-4 space-y-4">
                <div>
                  <h2 className="text-base font-semibold text-[#0c2461] leading-snug">
                    {video.title ?? 'Loading title...'}
                  </h2>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
