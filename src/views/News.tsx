'use client';

import React, { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';
import { fetchNews, getCachedNews, BackendNewsArticle } from '@/lib/api';
import { NewsGridLoading } from '@/components/ui/LoadingAnimation';

type NewsItem = {
    id: string | number;
    title: string;
    date: string;
    summary: string;
    tags: string[];
};

const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));

function mapBackendNews(data: BackendNewsArticle[]): NewsItem[] {
    return data
        .filter((d) => (d.status || 'published').toLowerCase() === 'published')
        .map((d) => ({
            id: d.id,
            title: d.title,
            date: d.publish_date,
            summary: d.excerpt || (d.content ? d.content.slice(0, 160) : ''),
            tags: d.tags && d.tags.length > 0 ? d.tags : [d.category.toUpperCase()],
        }));
}

export default function News() {
    const [articles, setArticles] = useState<NewsItem[]>(() => {
        const cached = getCachedNews();
        if (cached && Array.isArray(cached) && cached.length > 0) {
            return mapBackendNews(cached);
        }
        return [];
    });
    const [isLoading, setIsLoading] = useState(() => !getCachedNews());

    useEffect(() => {
        fetchNews({ status: 'published' })
            .then((data) => {
                if (data && Array.isArray(data)) {
                    const mapped = mapBackendNews(data);
                    setArticles(mapped);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const latestNews = [...articles].sort((a, b) => +new Date(b.date) - +new Date(a.date));

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100">
            <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.16),_transparent_30%)]" />
                <div className="relative mx-auto flex max-w-7xl flex-col px-6 py-8 lg:px-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="max-w-3xl">
                            <h1 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                                Latest news regarding our project
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                                Recent announcements, research milestones, tenders, and opportunities related to the BDAI and BIKE initiatives.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
                {/* Modern Loading Animation */}
                {isLoading && articles.length === 0 && (
                    <div className="mb-6">
                        <NewsGridLoading />
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && articles.length === 0 && (
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-sm max-w-2xl mx-auto">
                        <div className="w-12 h-12 rounded-2xl bg-sky-950/80 border border-sky-800/40 text-sky-400 flex items-center justify-center mx-auto mb-4">
                            <Newspaper className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">No News Articles Found</h2>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            There are currently no published news articles or project announcements. Please check back later for updates.
                        </p>
                    </div>
                )}
                <div className="grid gap-6">
                    {latestNews.map((item, index) => (
                        <article
                            key={item.id}
                            className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                        >
                            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                <div className="max-w-4xl">
                                    <div className="mb-3 flex items-center gap-3">
                                        <time className="text-sm font-medium text-slate-500 dark:text-slate-400">{formatDate(item.date)}</time>
                                    </div>
                                    <h3 className="text-xl font-semibold leading-snug text-slate-900 dark:text-white sm:text-2xl">
                                        {item.title}
                                    </h3>
                                    {item.summary ? <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.summary}</p> : null}
                                </div>

                                <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
                                    {item.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
};
