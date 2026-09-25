'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchVacancies, BackendVacancy } from '@/lib/api';

export default function Vacancies() {
  const [vacancies, setVacancies] = useState<BackendVacancy[]>([]);
  const [isLiveFromBackend, setIsLiveFromBackend] = useState(false);

  useEffect(() => {
    fetchVacancies().then((data) => {
      if (data && data.length > 0) {
        setIsLiveFromBackend(true);
        setVacancies(data);
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.16),_transparent_30%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col px-6 py-10 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Vacancies & Tender Notices
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                e-Tender notices and academic fellowship positions under the HEAT-13211-CU ATF Sub-Project, Department of Computer Science and Engineering, University of Chittagong.
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

      {/* Dynamic Backend Vacancies */}
      {vacancies.length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="grid gap-6">
            {vacancies.map((v) => (
              <article key={v.id} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-4">
                  <div>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 border border-sky-800/40 rounded px-2.5 py-0.5 mb-2">
                      {v.notice_type || 'Notice'}
                    </span>
                    <h2 className="text-xl font-semibold text-white">{v.title}</h2>
                  </div>
                  <div className="text-sm text-slate-400">
                    Deadline: <span className="text-sky-300 font-semibold">{v.deadline}</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300 mb-4">
                  <p><strong>Department:</strong> {v.department}</p>
                  <p><strong>Work Package:</strong> {v.work_package}</p>
                  <p><strong>Location:</strong> {v.location}</p>
                  <p><strong>Status:</strong> <span className="capitalize text-emerald-400">{v.status}</span></p>
                </div>
                {v.description && <p className="text-sm text-slate-300 leading-relaxed mb-4">{v.description}</p>}
                {v.requirements && v.requirements.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Requirements:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                      {v.requirements.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-4">
                  <Link
                    href="https://www.eprocure.gov.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-sky-400"
                  >
                    Open e-GP Portal
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        /* Fallback Static Tender Display */
        <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-2 lg:px-10">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">Position / Notice Details</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              <li><strong>Notice:</strong> e-Tender Notice (OTM Goods)</li>
              <li><strong>Memo:</strong> HEAT/CU/PIN13211/G-03.11/2025-2026</li>
              <li><strong>Date:</strong> 02-06-2026</li>
              <li><strong>Project:</strong> HEAT-13211-CU ATF Sub-Project</li>
              <li><strong>Package:</strong> Supply and installation of AI workstations</li>
              <li><strong>Type of Tender:</strong> NCT, OTM</li>
              <li><strong>Location:</strong> Department of Computer Science and Engineering, University of Chittagong</li>
              <li><strong>Online Tender Notice Publication:</strong> 02-06-2026, 16:00</li>
              <li><strong>Online Tender Closing/Opening:</strong> 17-06-2026, 12:05</li>
              <li>
                <strong>Portal:</strong>{' '}
                <a
                  href="https://www.eprocure.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-300 underline underline-offset-2"
                >
                  National e-GP System Portal (www.eprocure.gov.bd)
                </a>
              </li>
              <li><strong>Contact:</strong> e-GP Help Desk (helpdesk@eprocure.gov.bd)</li>
              <li><strong>Authorized Signatory:</strong> Professor Dr. Rudra Pratap Deb Nath, SPM, HEAT-13211-CU ATF Sub-project</li>
            </ul>
            <p className="mt-5 text-xs leading-5 text-slate-400">
              Only e-Tenders submitted through the National e-GP System Portal will be accepted. Offline/hard-copy submissions will not be considered.
            </p>
            <div className="mt-6">
              <Link
                href="https://www.eprocure.gov.bd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-sky-400"
              >
                Open e-GP Portal
              </Link>
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white p-4">
            <img
              src="/position1.jpeg"
              alt="e-Tender Notice for AI workstations under the HEAT-13211-CU ATF Sub-Project"
              className="w-full rounded-2xl border border-slate-200 object-contain"
            />
          </article>
        </section>
      )}
    </main>
  );
}
