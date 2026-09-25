'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Building2, Briefcase, ExternalLink, ShieldCheck } from 'lucide-react';
import { fetchVacancies, getCachedVacancies, BackendVacancy } from '@/lib/api';

export default function Vacancies() {
  const [vacancies, setVacancies] = useState<BackendVacancy[]>(() => {
    return getCachedVacancies() || [];
  });
  const [isLoading, setIsLoading] = useState(() => !getCachedVacancies());

  useEffect(() => {
    let isMounted = true;
    fetchVacancies()
      .then((data) => {
        if (isMounted) {
          if (data && Array.isArray(data)) {
            setVacancies(data);
          }
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch vacancies:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.16),_transparent_30%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col px-6 py-10 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 border border-sky-800/40 rounded px-2.5 py-0.5 mb-3">
                Opportunities & Tenders
              </span>
              <h1 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Vacancies & Tender Notices
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                Official e-Tender procurement notices and academic fellowship positions under the HEAT-13211-CU ATF Sub-Project, Department of Computer Science and Engineering, University of Chittagong.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Loading Skeleton */}
        {isLoading && vacancies.length === 0 && (
          <div className="grid gap-6 animate-pulse">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-4">
                  <div className="space-y-2">
                    <div className="h-4 w-28 bg-slate-800 rounded" />
                    <div className="h-6 w-80 bg-slate-700 rounded" />
                  </div>
                  <div className="h-4 w-32 bg-slate-800 rounded" />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="h-4 w-52 bg-slate-800 rounded" />
                  <div className="h-4 w-44 bg-slate-800 rounded" />
                  <div className="h-4 w-40 bg-slate-800 rounded" />
                  <div className="h-4 w-24 bg-slate-800 rounded" />
                </div>
                <div className="h-16 w-full bg-slate-800/60 rounded mb-4" />
                <div className="h-8 w-36 bg-slate-800 rounded-full" />
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Backend Vacancies */}
        {!isLoading && vacancies.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-sm max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-sky-950/80 border border-sky-800/40 text-sky-400 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No Active Vacancies</h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              There are currently no open procurement tenders or research fellowship positions published. Openings will appear here as soon as they are announced by the project authority.
            </p>
            <Link
              href="https://www.eprocure.gov.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-sky-500 transition-colors"
            >
              Check National e-GP Portal <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {vacancies.map((v) => {
              const isOpen = (v.status || '').toLowerCase() === 'open';
              return (
                <article
                  key={v.id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-sky-500/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 border border-sky-800/40 rounded px-2.5 py-0.5">
                          {v.notice_type || 'Notice'}
                        </span>
                        <span
                          className={`inline-block text-[11px] font-bold uppercase tracking-wider rounded px-2.5 py-0.5 border ${
                            isOpen
                              ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40'
                              : 'text-amber-400 bg-amber-950/60 border-amber-800/40'
                          }`}
                        >
                          {v.status || 'Active'}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold text-white leading-snug">{v.title}</h2>
                    </div>
                    <div className="text-sm text-slate-400 shrink-0 flex items-center gap-1.5 bg-slate-900/60 border border-white/5 rounded-xl px-3.5 py-2">
                      <Calendar className="w-4 h-4 text-sky-400" />
                      <span>
                        Deadline: <strong className="text-sky-300">{v.deadline}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-300 mb-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                    {v.department && (
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-semibold">Department</p>
                          <p className="font-medium text-slate-200">{v.department}</p>
                        </div>
                      </div>
                    )}
                    {v.work_package && (
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-semibold">Package</p>
                          <p className="font-medium text-slate-200">{v.work_package}</p>
                        </div>
                      </div>
                    )}
                    {v.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-semibold">Location</p>
                          <p className="font-medium text-slate-200">{v.location}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {v.description && (
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">{v.description}</p>
                  )}

                  {v.requirements && v.requirements.length > 0 && (
                    <div className="mb-5 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Requirements / Instructions:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                        {v.requirements.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Link
                      href="https://www.eprocure.gov.bd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-sky-400 transition-colors shadow-sm"
                    >
                      Open e-GP Portal <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
