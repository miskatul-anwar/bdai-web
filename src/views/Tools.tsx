'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Layers3,
  PlayCircle,
  Sparkles,
  FileText,
  FolderGit2,
  ExternalLink,
  Globe,
  ImageIcon,
} from 'lucide-react';
import { fetchTools, BackendTool } from '@/lib/api';

const DEFAULT_TOOLS: BackendTool[] = [
  {
    id: 'setlbi',
    title: 'SETLBI',
    subtitle: 'An Integrated Platform for Semantic Business Intelligence',
    description:
      'A tool that combines Semantic Web and Business Intelligence technologies to define, process, integrate, and query semantic data.',
    abstract:
      'With the growing popularity of Semantic Web technologies, more and more organizations natively manage data using Semantic Web standards, in particular RDF. This development gives rise to new requirements for Business Intelligence tools to enable analyses in the style of On-Line Analytical Processing (OLAP) over RDF data. SETLBI brings together the Semantic Web and Business Intelligence technologies across target definition, source to target mappings, source extraction, data transformation, and target population.',
    authors:
      'Rudra Pratap Deb Nath, Katja Hose, Torben Bach Pedersen, Oscar Romero, and Amrit Bhattacharjee',
    features: [
      'Semantic integration',
      'RDF + OLAP workflows',
      'End-to-end data pipeline',
    ],
    paper_url: 'https://extbi.cs.aau.dk/SETLBI/SETLBI.pdf',
    source_url: 'https://github.com/bi-setl/SETL',
    platform_url: 'https://extbi.cs.aau.dk/SETLBI/index.php',
    video_url: 'https://www.youtube.com/embed/9-a4MVHqZow',
    badge: 'Tool Showcase',
    display_order: 1,
  },
];

function getEmbedUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.includes('youtube.com/embed/')) return url;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
  );
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

export default function SparqlTool() {
  const [tools, setTools] = useState<BackendTool[]>(DEFAULT_TOOLS);

  useEffect(() => {
    let isMounted = true;
    fetchTools().then((data) => {
      if (isMounted && data && Array.isArray(data) && data.length > 0) {
        setTools(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const openLink = (url?: string | null) => {
    if (!url) return;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fbff_0%,_#ecf0f1_42%,_#e7ebf2_100%)] py-10 sm:py-14 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-7xl space-y-12">
        {tools.map((tool) => {
          const embedVideo = getEmbedUrl(tool.video_url);

          return (
            <section
              key={tool.id}
              className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_20px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(12,36,97,0.12),rgba(59,130,246,0.06),transparent_55%)] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 xl:grid-cols-5 gap-6">
                {/* Left Column: Details & Actions */}
                <div className="xl:col-span-3 p-6 sm:p-8 md:p-10 lg:p-12">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#0c2461]/10 bg-[#0c2461]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#0c2461]">
                    <Sparkles className="h-3.5 w-3.5" />
                    {tool.badge || 'Tool Showcase'}
                  </div>

                  <div className="mt-5 max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0c2461]">
                      {tool.title}
                      {tool.subtitle && (
                        <span className="block text-lg sm:text-xl md:text-2xl font-semibold text-slate-600 mt-2">
                          {tool.subtitle}
                        </span>
                      )}
                    </h1>

                    <p className="mt-5 text-sm sm:text-base md:text-lg leading-7 text-slate-600 max-w-2xl">
                      {tool.description}
                    </p>

                    <div className="mt-4 text-sm text-slate-600 max-w-2xl">
                      {tool.abstract && (
                        <>
                          <h2 className="text-sm font-semibold text-[#0c2461]">Abstract</h2>
                          <p className="mt-2 leading-relaxed">{tool.abstract}</p>
                        </>
                      )}

                      {/* Action Links */}
                      {(tool.paper_url || tool.source_url || tool.platform_url) && (
                        <div className="mt-8 flex flex-wrap gap-4">
                          {tool.paper_url && (
                            <button
                              type="button"
                              onClick={() => openLink(tool.paper_url)}
                              className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-[#0c2461]/30 hover:bg-[#0c2461] hover:text-white hover:shadow-md active:scale-95 cursor-pointer"
                            >
                              Research paper
                              <FileText className="h-4 w-4 text-slate-600 transition-colors duration-200 group-hover:text-white" />
                            </button>
                          )}

                          {tool.source_url && (
                            <button
                              type="button"
                              onClick={() => openLink(tool.source_url)}
                              className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-[#0c2461]/30 hover:bg-[#0c2461] hover:text-white hover:shadow-md active:scale-95 cursor-pointer"
                            >
                              Source code
                              <FolderGit2 className="h-4 w-4 text-slate-600 transition-colors duration-200 group-hover:text-white" />
                            </button>
                          )}

                          {tool.platform_url && (
                            <button
                              type="button"
                              onClick={() => openLink(tool.platform_url)}
                              className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#0c2461] bg-[#0c2461] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#13307a] hover:shadow-md active:scale-95 cursor-pointer"
                            >
                              Launch Platform
                              <ExternalLink className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Feature Pills */}
                      {tool.features && tool.features.length > 0 && (
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {tool.features.map((label, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0c2461]/8 text-[#0c2461] shrink-0">
                                <Layers3 className="h-4 w-4" />
                              </div>
                              <span className="text-sm text-slate-600">{label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Video Demo / Preview & Authors */}
                <div className="xl:col-span-2 border-t xl:border-t-0 xl:border-l border-white/60 bg-slate-950/5 p-6 sm:p-8 md:p-10 relative z-10">
                  <div className="rounded-[1.5rem] border border-white/80 bg-white shadow-xl overflow-hidden h-full flex flex-col justify-between">
                    <div>
                      <div className="p-5 sm:p-6 border-b border-slate-100">
                        <div className="flex items-center gap-2 text-[#0c2461] font-semibold text-sm uppercase tracking-[0.18em]">
                          {embedVideo ? (
                            <>
                              <PlayCircle className="h-4 w-4" />
                              Demo Video
                            </>
                          ) : (
                            <>
                              <Globe className="h-4 w-4" />
                              Platform Preview
                            </>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-slate-500">
                          {embedVideo
                            ? 'A quick look at the platform in action.'
                            : 'Interactive platform & research framework.'}
                        </p>
                      </div>

                      {/* Video or Image Preview */}
                      {embedVideo ? (
                        <div className="relative aspect-video bg-slate-100">
                          <iframe
                            className="absolute inset-0 h-full w-full"
                            src={embedVideo}
                            title={`${tool.title} demo video`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                      ) : tool.image_url ? (
                        <div className="relative aspect-video bg-slate-100 overflow-hidden">
                          <img
                            src={tool.image_url}
                            alt={tool.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-slate-50 flex items-center justify-center text-slate-400">
                          <ImageIcon className="w-8 h-8 opacity-40" />
                        </div>
                      )}
                    </div>

                    <div className="p-5 sm:p-6 space-y-5">
                      {tool.authors && (
                        <div>
                          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#0c2461]">
                            Authors
                          </h2>
                          <p className="mt-3 text-sm leading-7 text-slate-600">
                            {tool.authors}
                          </p>
                        </div>
                      )}

                      {/* Explore the Platform Link */}
                      {tool.platform_url && (
                        <button
                          type="button"
                          onClick={() => openLink(tool.platform_url)}
                          className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0c2461] transition-all duration-200 hover:text-[#13307a] hover:gap-3 cursor-pointer bg-transparent border-none p-0"
                        >
                          Explore the platform
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
