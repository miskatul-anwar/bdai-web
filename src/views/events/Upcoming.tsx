'use client';

import Image from 'next/image';

export default function UpcomingEvents() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-10 sm:py-14 px-4 sm:px-6">
      <section className="mx-auto max-w-4xl rounded-3xl border border-white/70 bg-white p-5 sm:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
        <div className="mb-5 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0c2461]">Upcoming Events</h1>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <Image
            src="/events/seminar2.jpg"
            alt="Upcoming seminar announcement"
            width={702}
            height={587}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
        <p className="mt-6 text-sm sm:text-base font-medium text-slate-700">2.00PM · 19th May 2026</p>
        <h2 className="mt-3 text-lg sm:text-xl font-semibold text-[#0c2461]">RAG-Driven Business Intelligence Platform Integration: Enterprise Data for Real-Time Insight, Predictive, and Prescriptive Decision Analytics</h2>
      </section>
    </main>
  );
}
