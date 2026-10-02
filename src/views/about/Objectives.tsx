'use client';

import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, Clock, Circle, ListTodo } from 'lucide-react';
import { fetchObjectives, getCachedObjectives, BackendObjective, ObjectiveTask } from '@/lib/api';

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
  tasks?: ObjectiveTask[];
}

const OBJECTIVE_IMAGES_MAP: Record<string, string[]> = {
  OB1: [RPDN_IMAGE, ANC_IMAGE, MMI_IMAGE, SC_IMAGE, ATIKISHRAK_IMAGE, RAIHAN_IMAGE, MISKAT_IMAGE],
  OB2: [RPDN_IMAGE, ARYAN_IMAGE, MISKAT_IMAGE],
  OB3: [RPDN_IMAGE, ANC_IMAGE, MMI_IMAGE, KAUSIK_ISHIK_IMAGE, ARYAN_IMAGE, KAIS_IMAGE, MINHAJ_IMAGE],
  OB4: [RPDN_IMAGE, NESARUL_IMAGE, NOOR_IMAGE, KAIS_IMAGE],
  OB5: [RPDN_IMAGE, ANC_IMAGE, RAIHAN_IMAGE, MISKAT_IMAGE, TAQI_IMAGE, AONG_IMAGE],
  OB6: [RPDN_IMAGE, ANC_IMAGE, AONG_IMAGE, MINHAJ_IMAGE, KAIS_IMAGE, TAQI_IMAGE],
  OB7: [RPDN_IMAGE, ANC_IMAGE, SC_IMAGE, NESARUL_IMAGE, NOOR_IMAGE, KAIS_IMAGE],
  OB8: [RPDN_IMAGE, ANC_IMAGE, SC_IMAGE, NESARUL_IMAGE, ATIKISHRAK_IMAGE, RAIHAN_IMAGE, MISKAT_IMAGE, ARYAN_IMAGE, KAIS_IMAGE, NOOR_IMAGE, NESARUL_IMAGE, TAQI_IMAGE, AONG_IMAGE, MINHAJ_IMAGE],
};

function enrichObjectives(data: BackendObjective[]): ObjectiveDisplayItem[] {
  const enriched: ObjectiveDisplayItem[] = data.map((d: BackendObjective) => {
    const key = d.id.toUpperCase();
    const imgs = OBJECTIVE_IMAGES_MAP[key] || [RPDN_IMAGE, MISKAT_IMAGE];
    return {
      id: d.id,
      title: d.title,
      details: d.details,
      researcher: d.researcher,
      sector: d.sector,
      status: d.status || 'in-progress',
      progress: d.progress ?? 50,
      deliverables: d.deliverables,
      images: imgs,
      tasks: d.tasks || [],
    };
  });

  enriched.sort((a, b) => {
    const numA = parseInt(a.id.replace(/\D/g, '')) || 0;
    const numB = parseInt(b.id.replace(/\D/g, '')) || 0;
    return numA - numB;
  });

  return enriched;
}

export default function Objectives() {
  const [objectivesList, setObjectivesList] = useState<ObjectiveDisplayItem[]>(() => {
    const cached = getCachedObjectives();
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return enrichObjectives(cached);
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(() => !getCachedObjectives());

  useEffect(() => {
    let isMounted = true;
    fetchObjectives().then((data) => {
      if (isMounted) {
        if (data && Array.isArray(data)) {
          setObjectivesList(enrichObjectives(data));
        }
        setIsLoading(false);
      }
    }).catch(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
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
                {isLoading && objectivesList.length === 0 && (
                  <>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="animate-shimmer">
                        <td className="py-4 px-6">
                          <div className="w-10 h-10 rounded-xl bg-slate-200 animate-pulse" />
                        </td>
                        <td className="py-4 px-6 space-y-2">
                          <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
                          <div className="h-3 w-72 bg-slate-100 rounded animate-pulse" />
                        </td>
                        <td className="py-4 px-6 space-y-2">
                          <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                          <div className="h-5 w-24 bg-slate-100 rounded animate-pulse" />
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="h-4 w-12 bg-slate-200 rounded ml-auto mb-1 animate-pulse" />
                          <div className="h-2 w-20 bg-slate-100 rounded ml-auto animate-pulse" />
                        </td>
                      </tr>
                    ))}
                  </>
                )}
                {!isLoading && objectivesList.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-16 text-center text-slate-500 font-medium">
                      No research objectives currently published.
                    </td>
                  </tr>
                )}
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

                          {/* Key Actionable Tasks & Milestones */}
                          {obj.tasks && obj.tasks.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-slate-100">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0c2461]/80 flex items-center gap-1.5">
                                  <ListTodo className="w-3.5 h-3.5 text-blue-600" />
                                  Key Tasks & Milestones
                                </span>
                                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                                  {obj.tasks.filter((t) => t.completed).length}/{obj.tasks.length} Completed
                                </span>
                              </div>
                              <ul className="space-y-1.5">
                                {obj.tasks.map((task) => (
                                  <li
                                    key={task.id}
                                    className={`flex items-start gap-2 text-xs py-1.5 px-2.5 rounded-lg border transition-colors ${
                                      task.completed
                                        ? 'bg-emerald-50/50 border-emerald-200/60 text-emerald-950 font-medium'
                                        : 'bg-slate-50/80 border-slate-200/70 text-slate-700'
                                    }`}
                                  >
                                    <span className="mt-0.5 shrink-0">
                                      {task.completed ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                      ) : (
                                        <Circle className="w-3.5 h-3.5 text-slate-400" />
                                      )}
                                    </span>
                                    <span
                                      className={`flex-1 leading-snug ${
                                        task.completed ? 'line-through text-slate-400 decoration-slate-300' : 'text-slate-800'
                                      }`}
                                    >
                                      {task.title}
                                    </span>
                                    <span
                                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                                        task.completed
                                          ? 'bg-emerald-100 text-emerald-700'
                                          : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                                      }`}
                                    >
                                      {task.completed ? 'Done' : 'Pending'}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
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
                          {obj.tasks && obj.tasks.length > 0 && (
                            <span className="text-[9px] font-medium text-slate-400 mt-0.5">
                              {obj.tasks.filter((t) => t.completed).length} of {obj.tasks.length} tasks
                            </span>
                          )}
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
