'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, ExternalLink, FileText } from 'lucide-react';
import { fetchSiteSettings } from '@/lib/api';

interface PublicationItem {
  id?: string;
  title: string;
  authors: string;
  venue?: string;
  year?: string;
  date?: string;
  doi_url?: string;
  pdf_url?: string;
  url?: string;
}

const DEFAULT_PUBLICATIONS: PublicationItem[] = [
  {
    id: 'pub-1',
    title: 'Advancing Cyberbullying Detection in Low-resource Languages: A Transformer-stacking Framework for Bengali',
    authors: 'Md Nesarul Hoque, Rudra Pratap Deb Nath, Abu Nowshed Chy, Debasish Ghose, Md Hanif Seddiqui',
    venue: 'Frontiers in Artificial Intelligence — Frontiers',
    year: '2024',
    doi_url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=TkQGAWoAAAAJ&sortby=pubdate&citation_for_view=TkQGAWoAAAAJ:WbkHhVStYXYC',
    pdf_url: '',
  },
];

export default function Publications() {
  const [publications, setPublications] = useState<PublicationItem[]>(DEFAULT_PUBLICATIONS);

  useEffect(() => {
    fetchSiteSettings().then((data) => {
      if (data?.publications && data.publications.length > 0) {
        setPublications(data.publications as PublicationItem[]);
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">Results</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Publications</h1>
          </div>
        </div>

        <div className="space-y-4">
          {publications.map((pub, idx) => {
            const articleUrl = pub.doi_url || pub.url;
            return (
              <div key={pub.id || idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2.5 py-0.5 bg-[#0c2461]/10 text-[#0c2461] text-[10px] font-bold rounded-full uppercase tracking-wider">
                        Paper #{idx + 1}
                      </span>
                      {pub.year && <span className="text-xs text-gray-400">{pub.year}</span>}
                    </div>
                    <h2 className="text-sm font-semibold text-gray-800">
                      {pub.title}
                    </h2>
                    <div className="text-xs text-gray-600">
                      {pub.authors}
                    </div>
                    {pub.venue && (
                      <div className="text-xs text-gray-400 mt-1">
                        {pub.venue}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {pub.pdf_url && pub.pdf_url !== '#' && (
                      <a
                        href={pub.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-[#0c2461]/10 hover:text-[#0c2461] transition-colors"
                        title="Download PDF"
                      >
                        <FileText className="w-4 h-4" />
                      </a>
                    )}
                    {articleUrl && articleUrl !== '#' && (
                      <a
                        href={articleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-[#0c2461]/10 hover:text-[#0c2461] transition-colors"
                        title="View Article Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
