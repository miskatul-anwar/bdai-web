'use client';

import Image from 'next/image';

const galleryImages = [
  { src: '/events/phd1.png', alt: 'Event gallery image 1' },
  { src: '/events/phd2.png', alt: 'Event gallery image 2' },
  { src: '/events/phd3.png', alt: 'Event gallery image 3' },
  { src: '/events/phd4.png', alt: 'Event gallery image 4' },
  { src: '/events/phd5.png', alt: 'Event gallery image 5' },
  { src: '/events/phd6.png', alt: 'Event gallery image 6' },
];

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
            <p className="text-xs sm:text-sm font-medium text-slate-500">{galleryImages.length} snapshots</p>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className="group relative flex aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 shadow-[0_8px_24px_rgba(15,23,42,0.07)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
