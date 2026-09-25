"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { PlayCircle, Calendar } from 'lucide-react';
import { fetchVideos } from '@/lib/api';

type VideoItem = {
  url: string;
  videoId: string;
  title?: string;
  description?: string;
  postedAt?: string;
  views?: string;
  thumbnail?: string;
  order?: number;
};

const initialVideosData: VideoItem[] = [
  {
    url: 'https://www.youtube.com/watch?v=9-a4MVHqZow',
    videoId: '9-a4MVHqZow',
    title: 'Sustainable Economic Transformation and Labor Market Information (SETLBI) Dashboard',
    description: 'Overview of the SETLBI AI decision support platform developed under BDAI project.',
    postedAt: 'March 2026',
    order: 1,
  },
  {
    url: 'https://www.youtube.com/watch?v=J2VZUgkArZY',
    videoId: 'J2VZUgkArZY',
    title: 'BDAI Research Demo & Interactive Showcase',
    description: 'System walkthrough demonstrating machine learning models and knowledge graph integrations.',
    postedAt: 'February 2026',
    order: 2,
  },
  {
    url: 'https://drive.google.com/drive/folders/1O7XGQ0k81bPCVmXFc-UZp8Bq7r7EajyL',
    videoId: 'bdai-lab-preview',
    title: 'BDAI Lab Video Preview',
    description: 'Visual preview of the Big Data and Artificial Intelligence research laboratory facilities.',
    thumbnail: '/bdai-lab-preview.png',
    postedAt: 'January 2026',
    order: 3,
  },
];

const extractYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const getThumbnail = (video: VideoItem) => {
  if (video.thumbnail) return video.thumbnail;
  const ytId = extractYoutubeId(video.url) || video.videoId;
  return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
};

export default function BdaiVideos() {
  const [videos, setVideos] = useState<VideoItem[]>(initialVideosData);

  useEffect(() => {
    let active = true;

    const loadVideos = async () => {
      let currentList = initialVideosData;

      try {
        const dbVideos = await fetchVideos();
        if (dbVideos && Array.isArray(dbVideos) && dbVideos.length > 0) {
          currentList = dbVideos.map((v) => {
            const ytId = extractYoutubeId(v.url);
            return {
              url: v.url,
              videoId: ytId || v.id,
              title: v.title,
              description: v.description || undefined,
              postedAt: v.posted_at || undefined,
              thumbnail: v.thumbnail || undefined,
              order: v.order ?? 0,
            };
          });
        }
      } catch (err) {
        console.warn('Could not fetch videos from database, using cached fallback', err);
      }

      // Enrich missing titles from YouTube oEmbed if needed
      const enriched = await Promise.all(
        currentList.map(async (video) => {
          if (video.title && video.thumbnail) return video;
          if (!video.url.includes('youtube.com') && !video.url.includes('youtu.be')) {
            return video;
          }
          try {
            const res = await fetch(
              `https://www.youtube.com/oembed?url=${encodeURIComponent(video.url)}&format=json`
            );
            if (!res.ok) return video;
            const data = (await res.json()) as { title?: string; thumbnail_url?: string };
            return {
              ...video,
              title: video.title || data.title,
              thumbnail: video.thumbnail || data.thumbnail_url,
            };
          } catch {
            return video;
          }
        })
      );

      if (active) {
        setVideos(enriched.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      }
    };

    loadVideos();

    return () => {
      active = false;
    };
  }, []);

  const videoCount = useMemo(() => videos.length, [videos.length]);

  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white shadow-sm">
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
              key={video.videoId + (video.url || '')}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <a href={video.url} target="_blank" rel="noreferrer" className="block group">
                  <div className="relative aspect-video bg-black overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getThumbnail(video)}
                      alt={video.title ?? 'Video thumbnail'}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/600x400/0c2461/white?text=BDAI+Video';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-white/90 p-4 shadow-lg group-hover:scale-110 transition-transform">
                        <PlayCircle className="h-9 w-9 text-[#0c2461]" />
                      </div>
                    </div>
                  </div>
                </a>

                <div className="p-5">
                  {video.postedAt && (
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-2 font-medium">
                      <Calendar className="w-3 h-3 text-[#0c2461]/60" />
                      <span>{video.postedAt}</span>
                    </div>
                  )}

                  <h2 className="text-base font-bold text-[#0c2461] leading-snug line-clamp-2">
                    {video.title ?? 'Loading video...'}
                  </h2>

                  {video.description && (
                    <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                      {video.description}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
