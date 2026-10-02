'use client';

import React from 'react';
import { Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';

/* ─── Glowing Orbital Spinner ────────────────────────── */
export function ModernSpinner({
  size = 'md',
  color = 'blue',
  label,
}: {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'white' | 'navy';
  label?: string;
}) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
  };

  const ringColors = {
    blue: 'border-blue-400/30 border-t-blue-500',
    white: 'border-white/30 border-t-white',
    navy: 'border-[#0c2461]/25 border-t-[#0c2461]',
  };

  return (
    <div className="inline-flex flex-col items-center justify-center gap-3">
      <div className="relative flex items-center justify-center">
        {/* Glow ambient circle */}
        <div
          className={`absolute rounded-full filter blur-md ${
            color === 'blue'
              ? 'bg-blue-400/25'
              : color === 'white'
              ? 'bg-white/20'
              : 'bg-[#0c2461]/20'
          } ${size === 'lg' ? 'w-14 h-14' : 'w-10 h-10'}`}
        />
        {/* Outer Ring */}
        <div
          className={`rounded-full border-2 ${sizeMap[size]} ${ringColors[color]} animate-spin`}
          style={{ animationDuration: '0.85s' }}
        />
      </div>
      {label && (
        <span
          className={`text-xs font-medium tracking-wide ${
            color === 'white'
              ? 'text-slate-300'
              : color === 'blue'
              ? 'text-blue-400'
              : 'text-slate-600'
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
}

/* ─── Pulse Status Pill ──────────────────────────────── */
export function PulseStatusBadge({ text = 'Updating live data...' }: { text?: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-medium">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
      </span>
      <span>{text}</span>
    </div>
  );
}

/* ─── 1. Home: Hero Stats Skeleton ───────────────────── */
export function HeroStatsLoading() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 mt-8 border border-slate-800 rounded-lg overflow-hidden animate-shimmer-dark bg-slate-900/40">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="py-4 px-3 flex flex-col items-center justify-center border-r border-slate-800 last:border-r-0"
        >
          <div className="h-7 w-16 bg-slate-800/80 rounded-md mb-2 animate-pulse" />
          <div className="h-2.5 w-14 bg-slate-800/50 rounded-sm animate-pulse" />
        </div>
      ))}
    </div>
  );
}

/* ─── 2. Home: Sector Ticker Skeleton ────────────────── */
export function TickerLoading() {
  return (
    <div className="bg-blue-600/90 overflow-hidden py-2.5 px-4 flex items-center justify-center gap-8">
      <div className="flex items-center gap-6 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/40" />
            <div className="h-3 w-24 bg-white/30 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── 3. Home: Partner Organizations Ticker Skeleton ─── */
export function OrgLogosLoading() {
  return (
    <div className="w-full overflow-hidden border-y border-slate-200 bg-white/70 py-7 px-6 md:px-10 animate-shimmer">
      <div className="flex items-center justify-center gap-5 flex-wrap sm:flex-nowrap">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="w-[190px] shrink-0 bg-white border border-slate-200/80 rounded-xl p-5 flex flex-col items-center text-center shadow-xs"
          >
            <div className="w-[77px] h-[77px] mb-3 rounded-lg bg-slate-100 flex items-center justify-center animate-pulse" />
            <div className="h-3.5 w-24 bg-slate-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── 4. Team: Member Grid Skeleton ──────────────────── */
export function TeamGridLoading() {
  return (
    <div className="space-y-8">
      {[1, 2].map((group) => (
        <div
          key={group}
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-shimmer"
        >
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
            <div className="h-5 w-36 bg-slate-200 rounded animate-pulse" />
            <div className="h-3.5 w-16 bg-slate-100 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-32 h-32 rounded-full bg-slate-200/90 shadow-inner flex items-center justify-center animate-pulse" />
                <div className="h-4 w-20 bg-slate-200 rounded mt-1 animate-pulse" />
                <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-40 bg-slate-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── 5. News: Dark Themed News Cards Skeleton ───────── */
export function NewsGridLoading() {
  return (
    <div className="grid gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm animate-shimmer-dark space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-5 w-24 bg-sky-950/80 border border-sky-800/40 rounded-full animate-pulse" />
            <div className="h-4 w-28 bg-slate-800 rounded animate-pulse" />
          </div>
          <div className="h-6 w-5/6 bg-slate-700/80 rounded-md animate-pulse" />
          <div className="h-4 w-full bg-slate-800/60 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-slate-800/50 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

/* ─── 6. Events: Light Event Card Skeletons ───────────── */
export function EventsGridLoading() {
  return (
    <div className="space-y-8">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="rounded-3xl border border-white/70 bg-white p-6 sm:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)] animate-shimmer"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="h-5 w-20 bg-[#0c2461]/10 rounded-full animate-pulse" />
            <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="h-7 w-4/5 bg-slate-200 rounded-md mb-4 animate-pulse" />
          <div className="h-4 w-3/5 bg-slate-100 rounded mb-6 animate-pulse" />
          {/* Banner Skeleton */}
          <div className="w-full h-56 sm:h-72 rounded-2xl bg-slate-100 flex items-center justify-center mb-6 animate-pulse">
            <ImageIcon className="w-10 h-10 text-slate-300" />
          </div>
          {/* Gallery Skeletons */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map((g) => (
              <div key={g} className="aspect-square rounded-xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── 7. Vacancies: Tender & Fellowship Skeleton ─────── */
export function VacanciesLoading() {
  return (
    <div className="grid gap-6">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm animate-shimmer-dark space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-sky-950/80 border border-sky-800/40 rounded-full animate-pulse" />
              <div className="h-6 w-72 bg-slate-700 rounded animate-pulse" />
            </div>
            <div className="h-4 w-28 bg-slate-800 rounded animate-pulse" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="h-4 w-48 bg-slate-800/70 rounded animate-pulse" />
            <div className="h-4 w-40 bg-slate-800/70 rounded animate-pulse" />
          </div>
          <div className="h-12 w-full bg-slate-800/40 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

/* ─── 8. Tools: Showcase Tool Skeleton ───────────────── */
export function ToolsLoading() {
  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 sm:p-12 shadow-sm animate-shimmer space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-6 w-28 bg-[#0c2461]/10 rounded-full animate-pulse" />
      </div>
      <div className="h-9 w-64 bg-slate-200 rounded-md animate-pulse" />
      <div className="h-4 w-96 bg-slate-200/80 rounded animate-pulse" />
      <div className="h-24 w-full bg-slate-100 rounded-xl animate-pulse" />
      <div className="flex gap-3">
        <div className="h-9 w-28 bg-slate-200 rounded-xl animate-pulse" />
        <div className="h-9 w-28 bg-slate-200 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

/* ─── 9. Videos: Showcase Video Skeletons ─────────────── */
export function VideosLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-shimmer flex flex-col"
        >
          {/* 16:9 Thumbnail skeleton */}
          <div className="aspect-video w-full bg-slate-200 flex items-center justify-center animate-pulse">
            <div className="w-12 h-12 rounded-full bg-slate-300/60 flex items-center justify-center" />
          </div>
          <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
            <div>
              <div className="h-4 w-20 bg-slate-100 rounded mb-2 animate-pulse" />
              <div className="h-5 w-4/5 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="h-3.5 w-full bg-slate-100 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── 10. Objectives: Milestone Goals Skeleton ───────── */
export function ObjectivesLoading() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-shimmer space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-200 animate-pulse" />
              <div>
                <div className="h-4 w-28 bg-slate-200 rounded mb-1 animate-pulse" />
                <div className="h-3 w-40 bg-slate-100 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-4 w-12 bg-slate-200 rounded animate-pulse" />
          </div>
          {/* Progress bar skeleton */}
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full w-1/2 bg-slate-200 animate-pulse" />
          </div>
          <div className="h-10 w-full bg-slate-50 rounded-xl animate-pulse" />
        </div>
      ))}
    </div>
  );
}

/* ─── 11. Consortium: Partners Skeleton ──────────────── */
export function PartnersLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-shimmer flex gap-5 items-start"
        >
          <div className="w-20 h-20 rounded-xl bg-slate-100 shrink-0 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-36 bg-slate-200 rounded animate-pulse" />
            <div className="h-3.5 w-full bg-slate-100 rounded animate-pulse" />
            <div className="h-3.5 w-4/5 bg-slate-100 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── 12. Publications: Paper List Skeleton ──────────── */
export function PublicationsLoading() {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-shimmer space-y-3"
        >
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 bg-slate-200 rounded-full animate-pulse" />
            <div className="h-3 w-10 bg-slate-100 rounded animate-pulse" />
          </div>
          <div className="h-5 w-4/5 bg-slate-200 rounded animate-pulse" />
          <div className="h-3.5 w-3/5 bg-slate-100 rounded animate-pulse" />
          <div className="h-3 w-40 bg-slate-100 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

/* ─── 13. Reports: Deliverables Skeleton ─────────────── */
export function ReportsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-shimmer flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 shrink-0 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
            <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
            <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── 14. Work Packages: Scope & Snapshot Gallery Skeleton */
export function WorkPackagesLoading() {
  return (
    <div className="space-y-8 animate-shimmer">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
          <div className="h-12 w-full bg-slate-100 rounded-xl animate-pulse" />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
          <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
          <div className="h-4 w-28 bg-slate-100 rounded animate-pulse" />
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="h-5 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video rounded-xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
