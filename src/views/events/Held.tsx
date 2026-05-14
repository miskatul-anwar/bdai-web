'use client';

import Image from 'next/image';

const galleryPlaceholders = Array.from({ length: 4 }, (_, index) => `Gallery Image ${index + 1}`);

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
          <h2 className="text-lg sm:text-xl font-semibold text-[#0c2461]">Event Gallery</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {galleryPlaceholders.map((label) => (
              <div
                key={label}
                className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-sm font-medium text-slate-500"
              >
                {label} Placeholder
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
