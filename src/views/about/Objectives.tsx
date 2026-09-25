'use client';

import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, Clock } from 'lucide-react';
import { fetchObjectives, BackendObjective } from '@/lib/api';

const RAIHAN_IMAGE = '/team/raihan.jpg';
const ATIKISHRAK_IMAGE = '/team/atikishrak.jpg';
const MISKAT_IMAGE = '/team/miskat.jpg';
const ARYAN_IMAGE = '/team/aryan.jpg';
const KAIS_IMAGE = '/team/kais.jpg';
const NOOR_IMAGE = '/team/noor.jpg';
const NESARUL_IMAGE = '/team/nesarul.jpg';
const TAQI_IMAGE = '/team/taqi.jpg';
const AONG_IMAGE = '/team/aong.jpg';
const MINHAJ_IMAGE = '/team/minhaj.png';
const KAUSIK_ISHIK_IMAGE = '/team/kausik.jpeg';
const RPDN_IMAGE = '/team/rpdn.png';
const ANC_IMAGE = '/team/anc.png';
const MMI_IMAGE = '/team/mmi.png';
const SC_IMAGE = '/team/sc.png';

interface ObjectiveDisplayItem {
  id: string;
  title: string;
  details?: string;
  researcher?: string;
  sector?: string;
  status?: string;
  progress?: number;
  deliverables?: number;
  images: string[];
}

const staticObjectives: ObjectiveDisplayItem[] = [
  { id: 'OB1', title: 'Open Data Quality', researcher: 'Prof. Dr. M. Shahadat Hossain', sector: 'Data Engineering', status: 'in-progress', progress: 50, images: [RPDN_IMAGE, ANC_IMAGE, MMI_IMAGE, SC_IMAGE, ATIKISHRAK_IMAGE, RAIHAN_IMAGE, MISKAT_IMAGE] },
  { id: 'OB2', title: 'SMART Data Ecosystem', researcher: 'Dr. Rudra Pratap Deb Nath', sector: 'Platform Architecture', status: 'in-progress', progress: 50, images: [RPDN_IMAGE, ARYAN_IMAGE, MISKAT_IMAGE] },
  { id: 'OB3', title: 'KG Construction', researcher: 'Prof. Dr. Mohammad Shamsul Arefin', sector: 'Knowledge Graphs', status: 'in-progress', progress: 50, images: [RPDN_IMAGE, ANC_IMAGE, MMI_IMAGE, KAUSIK_ISHIK_IMAGE, ARYAN_IMAGE, KAIS_IMAGE, MINHAJ_IMAGE] },
  { id: 'OB4', title: 'Cross-Sector Analytics', researcher: 'Prof. Dr. Kazi Tanvir Ahmed', sector: 'Analytics & Insights', status: 'in-progress', progress: 50, images: [RPDN_IMAGE, NESARUL_IMAGE, NOOR_IMAGE, KAIS_IMAGE] },
  { id: 'OB5', title: 'KG RAG', researcher: 'Prof. Dr. M. Shahadat Hossain', sector: 'AI & Retrieval', status: 'in-progress', progress: 50, images: [RPDN_IMAGE, ANC_IMAGE, RAIHAN_IMAGE, MISKAT_IMAGE, TAQI_IMAGE, AONG_IMAGE] },
  { id: 'OB6', title: 'Explainability & Fairness', researcher: 'Dr. Rudra Pratap Deb Nath', sector: 'Trustworthy AI', status: 'in-progress', progress: 50, images: [RPDN_IMAGE, ANC_IMAGE, AONG_IMAGE, MINHAJ_IMAGE, KAIS_IMAGE, TAQI_IMAGE] },
  { id: 'OB7', title: 'askBDAI', researcher: 'Prof. Dr. Mohammad Shamsul Arefin', sector: 'Conversational Agents', status: 'in-progress', progress: 50, images: [RPDN_IMAGE, ANC_IMAGE, SC_IMAGE, NESARUL_IMAGE, NOOR_IMAGE, KAIS_IMAGE] },
  { id: 'OB8', title: 'Capacity Building', researcher: 'Prof. Dr. M. Shahadat Hossain', sector: 'Workforce & Training', status: 'in-progress', progress: 50, images: [RPDN_IMAGE, ANC_IMAGE, SC_IMAGE, NESARUL_IMAGE, ATIKISHRAK_IMAGE, RAIHAN_IMAGE, MISKAT_IMAGE, ARYAN_IMAGE, KAIS_IMAGE, NOOR_IMAGE, NESARUL_IMAGE, TAQI_IMAGE, AONG_IMAGE, MINHAJ_IMAGE] },
];

export default function Objectives() {
  const [objectivesList, setObjectivesList] = useState<ObjectiveDisplayItem[]>(staticObjectives);

  useEffect(() => {
    fetchObjectives().then((data) => {
      if (data && Array.isArray(data) && data.length > 0) {
        const enriched: ObjectiveDisplayItem[] = data.map((d: BackendObjective) => {
          const match = staticObjectives.find((so) => so.id.toUpperCase() === d.id.toUpperCase());
          return {
            id: d.id,
            title: d.title,
            details: d.details,
            researcher: d.researcher || match?.researcher,
            sector: d.sector || match?.sector,
            status: d.status || match?.status || 'in-progress',
            progress: d.progress ?? match?.progress ?? 50,
            deliverables: d.deliverables,
            images: match ? match.images : [RPDN_IMAGE, MISKAT_IMAGE],
          };
        });

        // Sort numerically if ID is OB1, OB2, etc.
        enriched.sort((a, b) => {
          const numA = parseInt(a.id.replace(/\D/g, '')) || 0;
          const numB = parseInt(b.id.replace(/\D/g, '')) || 0;
          return numA - numB;
        });

        setObjectivesList(enriched);
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white shadow-sm">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">About</p>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Research Objectives</h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0c2461]/5 border-b border-[#0c2461]/10">
                <tr>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#0c2461]/60">Code</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#0c2461]/60">Objective & Scope</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#0c2461]/60">Lead Researcher & Team</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#0c2461]/60 text-right">Milestone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {objectivesList.map((obj) => {
                  const isCompleted = obj.status === 'completed';
                  return (
                    <tr key={obj.id} className="hover:bg-[#0c2461]/[0.02] transition-colors">
                      <td className="py-4 px-6 align-top">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#0c2461]/10 text-[#0c2461] font-black text-xs font-mono">
                          {obj.id}
                        </span>
                      </td>

                      <td className="py-4 px-6 align-top">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#0c2461] text-sm md:text-base leading-snug">
                              {obj.title}
                            </span>
                            {obj.sector && (
                              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 shrink-0">
                                {obj.sector}
                              </span>
                            )}
                          </div>
                          {obj.details && (
                            <p className="text-xs text-gray-500 leading-relaxed max-w-lg">
                              {obj.details}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-6 align-top">
                        <div className="space-y-2">
                          {obj.researcher && (
                            <p className="text-xs font-semibold text-gray-800">
                              {obj.researcher}
                            </p>
                          )}
                          {obj.images && obj.images.length > 0 && (
                            <div className="flex items-center">
                              {obj.images.map((src, i) => (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  key={i}
                                  src={src}
                                  alt={`${obj.title} team member ${i + 1}`}
                                  className={`inline-block w-6 h-6 rounded-full border-2 border-white object-cover ${i !== 0 ? '-ml-2' : ''}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-6 align-top text-right">
                        <div className="inline-flex flex-col items-end gap-1">
                          <span className="text-xs font-bold font-mono text-[#0c2461]">
                            {obj.progress ?? 0}%
                          </span>
                          <div className="w-20 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isCompleted ? 'bg-emerald-600' : 'bg-[#0c2461]'}`}
                              style={{ width: `${obj.progress ?? 0}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-gray-400 capitalize flex items-center gap-1 mt-0.5">
                            {isCompleted ? (
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            ) : (
                              <Clock className="w-2.5 h-2.5 text-blue-600" />
                            )}
                            {obj.status || 'in-progress'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
