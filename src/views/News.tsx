'use client';

import React, { useState, useEffect } from 'react';
import { fetchNews } from '@/lib/api';

type NewsItem = {
    id: string | number;
    title: string;
    date: string;
    summary: string;
    tags: string[];
};

const newsData: NewsItem[] = [
    {
        id: 20,
        title: "Professor Dr. Debasish Ghose from Kristiania University College, Norway visited our lab for collaboration purpose. He delivers an intensive quality paper writing workshop.",
        date: "2026-07-29",
        summary: "Professor Dr. Debasish Ghose from Kristiania University College, Norway visited our lab for research collaboration and conducted an intensive quality paper writing workshop.",
        tags: ["Workshop", "Collaboration", "BDAI", "Research", "BIKE Lab"],
    },
    {
        id: 19,
        title: "e-Tenders are invited on the National e-GP System Portal (https://www.eprocure.gov.bd) for the procurement of the following goods under the HEAT-13211-CU ATF Sub-Project by the Department of Computer Science and Engineering, University of Chittagong, Chattogram",
        date: "2026-06-02",
        summary: "The project has published an e-Tender notice for supply and installation of AI workstations under the HEAT-13211-CU ATF sub-project.",
        tags: ["e-Tender", "HEAT", "Procurement", "CSE CU"],
    },
    {
        id: 1,
        title: "Md. Mosaddek Khan, Associate Professor of CSE, DU, presented: RAG-Driven Business Intelligence Platform Integration: Enterprise Data for Real-Time Insight, Predictive, and Prescriptive Decision Analytics",
        date: "2026-05-19",
        summary: "",
        tags: ["Seminar", "BDAI", "Business Intelligence"],
    },
    {
        id: 2,
        title: "Md Nesarul Hoque successfully presented his PhD Open Seminar-II",
        date: "2026-05-14",
        summary: "",
        tags: ["Seminar", "Cyberbullying", "Security"],
    },
    {
        id: 18,
        title: "Professor Dr. Rudra Pratap Deb Nath Presented the Progress of the BDAI Sub-Project to the World Bank, UGC, and HEAT Delegates",
        date: "2026-05-02",
        summary: "",
        tags: ["Presentation", "BDAI", "World Bank", "UGC", "HEAT"],
    },
    {
        id: 3,
        title: "Two OTM (Goods) e-Tenders under the BDAI project just published in the e-GP system",
        date: "2026-02-10",
        summary: "",
        tags: ["Tender", "BDAI", "e-GP"],
    },
    {
        id: 4,
        title:
            "Director of BIKE Lab, Dr. Rudra Pratap Deb Nath Promoted to Professor at Department of CSE, University of Chittagong",
        date: "2026-01-18",
        summary: "",
        tags: ["Director", "Promotion", "Professor", "Achievement"],
    },
    {
        id: 5,
        title: "An OTM (Works) e-Tender under the BDAI project",
        date: "2025-12-31",
        summary: "",
        tags: ["e-Tender", "BDAI", "Works", "World Bank", "GoB"],
    },
     {
        id: 6,
        title: "Md. Nesarul Hoque will be presenting in his First PhD Open Seminar on 31st December 2025. Please join.",
        date: "2025-12-30",
        summary: "",
        tags: ["PhD Seminar", "BDAI", "BIKE"],
    },
    {
        id: 7,
        title: "An RFQ tender for BDAI project",
        date: "2025-12-22",
        summary: "",
        tags: ["RFQ", "BDAI", "World Bank", "HEAT", "e-Tender"],
    },
    {
        id: 8,
        title: "PhD and MPhil positions are available under the BDAI project (HEAT)",
        date: "2025-12-15",
        summary: "",
        tags: ["PhD", "MPhil", "Vacancy", "Job", "Fellowship", "HEAT"],
    },
    {
        id: 9,
        title: "Paper Accepted in Frontiers in Artificial Intelligence (Q1, IF: 4.7)",
        date: "2025-11-17",
        summary: "",
        tags: ["AI", "Paper Accepted", "NLP", "Q1"],
    },
    {
        id: 10,
        title: "The national leading newspaper Prothom Alo featured BIKE director Dr. Rudra Pratap Deb Nath",
        date: "2025-11-13",
        summary: "",
        tags: ["Outreach", "Media", "Newspaper"],
    },
    {
        id: 11,
        title: "Our project proposal submitted to GARE accepted in the first round",
        date: "2025-11-12",
        summary: "",
        tags: ["Research Grant", "BANBEIS", "Ministry of Education", "GoB"],
    },
    {
        id: 12,
        title: "Notice for interview as per circular no. HEAT-13211-CU/App(1))",
        date: "2025-11-04",
        summary: "",
        tags: ["Job", "Interview", "Administrative"],
    },
    {
        id: 13,
        title: "We are hiring under the sub project BDAI, a part of HEAT project (funded by the World Bank)",
        date: "2025-10-13",
        summary: "",
        tags: ["Hiring", "Job", "Recruitment", "BDAI", "HEAT"],
    },
    {
        id: 14,
        title: "Five thesis students (undergraduate researchers) joined the BIKE Lab. Welcome.",
        date: "2025-09-04",
        summary: "",
        tags: ["Researcher", "Thesis", "Undergraduate"],
    },
    {
        id: 15,
        title:
            "Our Bike member Tonmoy Chandro Das has joined as Assistant Database Programmer at ICT Cell, University of Chittagong. Congratulations!!!",
        date: "2025-08-27",
        summary: "",
        tags: ["Job", "University of Chittagong"],
    },
    {
        id: 16,
        title: "Our 'BDAI' project has won a research grant under the HEAT project",
        date: "2025-08-25",
        summary: "",
        tags: ["World Bank", "Research Grant", "UGC", "Bangladesh Government", "LLM"],
    },
    {
        id: 17,
        title: "Our ATF proposal 'BDAI' under the HEAT project has been selected for Budget Rationalization",
        date: "2025-08-01",
        summary: "",
        tags: ["Research Grant", "HEAT", "World Bank", "UGC"],
    },
];

const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));

export default function News() {
    const [articles, setArticles] = useState<NewsItem[]>(newsData);
    const [isLiveFromBackend, setIsLiveFromBackend] = useState(false);

    useEffect(() => {
        fetchNews().then((data) => {
            if (data && data.length > 0) {
                setIsLiveFromBackend(true);
                const mapped: NewsItem[] = data.map((d) => ({
                    id: d.id,
                    title: d.title,
                    date: d.publish_date,
                    summary: d.excerpt || (d.content ? d.content.slice(0, 160) : ''),
                    tags: d.tags && d.tags.length > 0 ? d.tags : [d.category.toUpperCase()],
                }));

                // Combine backend articles with static items not present in backend
                const existingTitles = new Set(mapped.map((m) => m.title.toLowerCase().trim()));
                const nonDuplicates = newsData.filter(
                    (item) => !existingTitles.has(item.title.toLowerCase().trim())
                );
                setArticles([...mapped, ...nonDuplicates]);
            }
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
                        {isLiveFromBackend && (
                            <div className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Live Backend API
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
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
