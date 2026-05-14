'use client';

import Image from 'next/image';

const galleryPlaceholders = Array.from({ length: 6 }, (_, index) => `Gallery Image ${index + 1}`);

export default function HeldEvents() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-10 sm:py-14 px-4 sm:px-6">
      <section className="mx-auto max-w-4xl rounded-3xl border border-white/70 bg-white p-5 sm:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0c2461]">Held Events</h1>
        <p className="mt-3 text-sm sm:text-base font-medium text-slate-700">2.00PM · 14th May 2026</p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <Image
            src="/events/1.png"
            alt="Held event announcement"
            width={702}
            height={587}
            className="h-auto w-full object-contain"
            priority
          />
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-[#0c2461]">Event Gallery</h2>
            <p className="text-xs sm:text-sm font-medium text-slate-500">{galleryPlaceholders.length} snapshots</p>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPlaceholders.map((label) => (
              <div
                key={label}
                role="img"
                aria-label={`${label} placeholder for the 14th May 2026 event gallery`}
                className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-[#edf3ff] p-4 shadow-[0_8px_24px_rgba(15,23,42,0.07)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="w-fit rounded-full border border-[#0c2461]/15 bg-white/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0c2461]">
                  Placeholder
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[#0c2461]">{label}</p>
                  <p className="text-xs font-medium text-slate-500">Event memories coming soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
