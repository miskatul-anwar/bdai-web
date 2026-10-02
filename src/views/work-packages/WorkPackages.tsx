'use client';

import React, { useEffect, useState } from 'react';
import { Package, CheckSquare, Layers, Target, Image as ImageIcon, Maximize2, X, Calendar, ChevronLeft, ChevronRight, CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { fetchSiteSettings } from '@/lib/api';
import { WorkPackagesLoading } from '@/components/ui/LoadingAnimation';

export interface Task {
  id: string;
  label: string;
  completed?: boolean;
}

export interface WPStateImage {
  id?: string;
  url: string;
  caption: string;
  date?: string;
}

interface WPPageProps {
  number: number;
  title: string;
  objective: string;
  tasks: Task[];
  highlights: string[];
  initialImages?: WPStateImage[];
}

function WPPage({ number, title, objective, tasks, highlights, initialImages = [] }: WPPageProps) {
  const [data, setData] = useState({
    title,
    objective,
    tasks,
    highlights,
    images: initialImages,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchSiteSettings().then((settings) => {
      if (isMounted) {
        if (settings?.work_packages && settings.work_packages.length > 0) {
          const match = settings.work_packages.find(
            (wp: any) =>
              wp.id?.toLowerCase() === `wp${number}`.toLowerCase() ||
              wp.number === number ||
              wp.title?.toLowerCase().includes(`wp${number}`.toLowerCase())
          );
          if (match) {
            const hasExplicitImages = Array.isArray((match as any).current_state_images);
            const rawImages = hasExplicitImages
              ? (match as any).current_state_images
              : (Array.isArray((match as any).state_images)
                  ? (match as any).state_images
                  : (Array.isArray((match as any).images) ? (match as any).images : initialImages));
            const validImages = Array.isArray(rawImages)
              ? rawImages.filter((img: any) => img && (img.url || img.src))
              : [];

            const parsedTasks: Task[] = Array.isArray(match.tasks) && match.tasks.length > 0
              ? match.tasks.map((t: any, idx: number) => {
                  if (typeof t === 'string') {
                    return { id: `T${number}.${idx + 1}`, label: t, completed: false };
                  }
                  return {
                    id: t.id || `T${number}.${idx + 1}`,
                    label: t.label || t.title || '',
                    completed: Boolean(t.completed),
                  };
                })
              : tasks.map((t) => ({ ...t, completed: Boolean(t.completed) }));

            setData({
              title: match.title || title,
              objective: match.objective || objective,
              highlights: Array.isArray(match.highlights) && match.highlights.length > 0 ? match.highlights : highlights,
              tasks: parsedTasks,
              images: validImages,
            });
          }
        }
        setIsLoading(false);
      }
    }).catch(() => {
      if (isMounted) setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, [number, title, objective, tasks, highlights, initialImages]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight' && data.images.length > 1) {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % data.images.length : null));
      }
      if (e.key === 'ArrowLeft' && data.images.length > 1) {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + data.images.length) % data.images.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, data.images.length]);

  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white shrink-0 shadow-sm">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">Work Packages</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">WP{number}: {data.title}</h1>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && <WorkPackagesLoading />}

        {!isLoading && (
          <>
            {/* Objective & Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-[#0c2461]" />
              <h2 className="font-bold text-[#0c2461]">Objective</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{data.objective}</p>
          </div>
          <div className="bg-[#0c2461] rounded-2xl p-6 text-white shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 opacity-70" />
              <h3 className="font-bold text-sm uppercase tracking-wider opacity-70">Highlights</h3>
            </div>
            <ul className="space-y-2">
              {data.highlights.map((h, i) => (
                <li key={i} className="text-xs leading-relaxed opacity-90 flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#60a5fa] flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Current State & Progress Gallery Section */}
        {data.images && data.images.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0c2461] flex items-center justify-center shrink-0">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-[#0c2461]">Current State &amp; Progress</h2>
                  <p className="text-xs text-gray-500">Live photographic updates and implementation milestones for WP{number}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0c2461] font-semibold text-xs self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                {data.images.length} {data.images.length === 1 ? 'Snapshot' : 'Snapshots'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.images.map((item, idx) => {
                const imgUrl = item.url || (item as any).src;
                return (
                  <div
                    key={item.id || idx}
                    onClick={() => setActiveLightboxIndex(idx)}
                    className="group relative bg-slate-50 border border-slate-200/80 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-200">
                      <img
                        src={imgUrl}
                        alt={item.caption || `WP${number} progress`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5" />
                          View Fullscreen
                        </span>
                      </div>
                      {item.date && (
                        <div className="absolute top-2.5 right-2.5 bg-slate-900/75 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                          <Calendar className="w-3 h-3 text-blue-300" />
                          {item.date}
                        </div>
                      )}
                    </div>
                    {item.caption && (
                      <div className="p-3.5 bg-white flex-1 border-t border-slate-100">
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {item.caption}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tasks Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-[#0c2461]" />
              <h2 className="font-bold text-base text-[#0c2461]">Tasks &amp; Milestones</h2>
            </div>
            {data.tasks && data.tasks.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0c2461] font-semibold text-xs self-start sm:self-auto border border-blue-100/60">
                {data.tasks.filter((t) => t.completed).length} of {data.tasks.length} Completed
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            {data.tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                  task.completed
                    ? 'bg-emerald-50/50 border-emerald-200/70 text-emerald-950 font-medium'
                    : 'bg-slate-50/70 border-slate-200/80 text-slate-700'
                }`}
              >
                <span className="mt-0.5 shrink-0">
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400" />
                  )}
                </span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-[#0c2461]/10 text-[#0c2461] font-mono font-bold text-xs flex-shrink-0 whitespace-nowrap">
                  {task.id}
                </span>
                <p
                  className={`text-sm leading-relaxed flex-1 ${
                    task.completed ? 'line-through text-slate-400 decoration-slate-300' : 'text-slate-700'
                  }`}
                >
                  {task.label}
                </p>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                    task.completed
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                  }`}
                >
                  {task.completed ? 'Done' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        </div>
        </>
      )}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && data.images[activeLightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/70 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-400">WP{number} Snapshot</span>
                <span className="text-xs text-slate-400">
                  ({activeLightboxIndex + 1} of {data.images.length})
                </span>
              </div>
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Image */}
            <div className="relative bg-black flex items-center justify-center min-h-[300px] max-h-[70vh] overflow-hidden">
              <img
                src={data.images[activeLightboxIndex].url || (data.images[activeLightboxIndex] as any).src}
                alt={data.images[activeLightboxIndex].caption || 'Progress snapshot'}
                className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
              />

              {/* Prev / Next controls */}
              {data.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + data.images.length) % data.images.length : null))}
                    className="absolute left-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % data.images.length : null))}
                    className="absolute right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 text-white space-y-1">
              {data.images[activeLightboxIndex].date && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400">
                  <Calendar className="w-3 h-3" />
                  {data.images[activeLightboxIndex].date}
                </span>
              )}
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                {data.images[activeLightboxIndex].caption || 'Current implementation state snapshot'}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


export function WP1() {
  return (
    <WPPage
      number={1}
      title="Infrastructure Development"
      objective="Establish a fully equipped physical and digital research lab environment with the necessary hardware, network, and workspace facilities to support all project activities."
      highlights={[
        'Physical lab fit-out including server hardware and researcher workstations',
        'Secure LAN, internet connectivity, and firewall/security configuration',
        'UPS power protection, backup systems, and IT maintenance procedures',
      ]}
      tasks={[
        { id: 'T1.1', label: 'Design and fit out lab interior space (partitioning, lighting, electrical points).', completed: true },
        { id: 'T1.2', label: 'Procure and install servers and storage hardware.', completed: true },
        { id: 'T1.3', label: 'Set up local area network (LAN), internet connectivity, and firewall/security.', completed: true },
        { id: 'T1.4', label: 'Procure and configure researcher workstations and peripherals.', completed: false },
        { id: 'T1.5', label: 'Install furnishings and ergonomic workspace equipment.', completed: false },
        { id: 'T1.6', label: 'Set up backup, power protection (UPS), and IT maintenance procedures.', completed: false },
      ]}
      initialImages={[]}
    />
  );
}


export function WP2() {
  return (
    <WPPage
      number={2}
      title="Sectoral Data Collection"
      objective="Collect, harmonise, and prepare domain-specific datasets across all six sectors (SOCIO-ECO, EDU, ENV, TOUR, HEALTH, AGRI) to feed into the knowledge graph construction pipeline."
      highlights={[
        'Covers six sectors: SOCIO-ECO, EDU, ENV, TOUR, HEALTH, and AGRI',
        'RDF serialisation and SPARQL-ready dataset preparation',
        'Data sharing agreements and access governance per sector',
      ]}
      tasks={[
        { id: 'T2.1', label: 'Identify and inventory data sources per sector.', completed: true },
        { id: 'T2.2', label: 'Establish data sharing agreements and access permissions.', completed: true },
        { id: 'T2.3', label: 'Acquire and pre-process sectoral datasets.', completed: false },
        { id: 'T2.4', label: 'Convert and serialise data to RDF and other target formats.', completed: false },
        { id: 'T2.5', label: 'Validate and document datasets for completeness and accuracy.', completed: false },
      ]}
    />
  );
}

export function WP3() {
  return (
    <WPPage
      number={3}
      title="Knowledge Graph Construction"
      objective="Construct, populate, and federate six domain-specific knowledge graphs and integrate them through a shared federation layer with a common meta-model and Digital Twin linkages."
      highlights={[
        'Six domain-specific knowledge graphs with custom ontologies',
        'Federated SPARQL query engine for cross-domain queries',
        'Digital Twin linkages via simulation and data models',
      ]}
      tasks={[
        { id: 'T3.1', label: 'Develop or adopt domain ontologies per sector (SOCIO-ECO KG, EDU KG, ENV KG, TOUR KG, HEALTH KG, AGRI KG).', completed: true },
        { id: 'T3.2', label: 'Populate individual domain KGs with data from WP2.', completed: true },
        { id: 'T3.3', label: 'Design and implement the Federation Layer meta-model for cross-domain alignment.', completed: false },
        { id: 'T3.4', label: 'Build federated SPARQL query engine across all domain KGs.', completed: false },
        { id: 'T3.5', label: 'Develop simulation, system, and data models and Digital Twin linkages.', completed: false },
      ]}
    />
  );
}

export function WP4() {
  return (
    <WPPage
      number={4}
      title="Cross Sectoral Analysis over Knowledge Graphs"
      objective="Enable descriptive, diagnostic, predictive, and prescriptive analytical capabilities by executing cross-domain queries and what-if scenario analyses over the federated knowledge graphs built in WP3"
      highlights={[
        'Cross-sectoral analytics across all six domain knowledge graphs',
        'Federated SPARQL and graph-based pipelines for multi-domain analysis',
        'Interactive dashboards with cross-domain KPIs, visualizations, and decision support',
      ]}
      tasks={[
        { id: 'T4.1', label: 'Design cross-sectoral analytical query framework spanning all six domain KGs.', completed: true },
        { id: 'T4.2', label: 'Implement federated SPARQL and graph-based analytical pipelines.', completed: true },
        { id: 'T4.3', label: 'Integrate LLMs for natural language query interpretation and answer generation.', completed: false },
        { id: 'T4.4', label: 'Build interactive analytical dashboards with cross-domain key performance indicators and visualizations.', completed: false },
        { id: 'T4.5', label: 'Validate analytical outputs against ground truth data across sectors.', completed: false },
      ]}
    />
  );
}

export function WP5() {
  return (
    <WPPage
      number={5}
      title="askBDAI: AI-Powered User-Friendly Natural Language Interface"
      objective="Develop askBDAI, a natural language interface that allows non-technical users to query the federated knowledge graph platform using everyday language, powered by LLMs, NLI, and AI reasoning over KGs"
      highlights={[
        'Conversational natural language interface for querying the federated knowledge graph platform',
        'LLM-assisted translation from user intent to SPARQL and graph queries',
        'KG-grounded reasoning with feedback-driven refinement for improved response quality',
      ]}
      tasks={[
        { id: 'T5.1', label: 'Design conversational NLI architecture integrating LLMs with the federated KG backend.', completed: true },
        { id: 'T5.2', label: 'Develop natural language to SPARQL/graph query translation module.', completed: false },
        { id: 'T5.3', label: 'Build context-aware answer generation using KG-grounded LLM reasoning.', completed: false },
        { id: 'T5.4', label: 'Iteratively refine NLI based on user feedback and evaluation results.', completed: false },
      ]}
    />
  );
}