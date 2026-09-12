'use client';

import Image from 'next/image';

const heldEvents = [
  {
    date: '29th July 2026',
    title: 'Professor Dr. Debasish Ghose from Kristiania University College, Norway visited our lab for collaboration purpose. He delivers an intensive quality paper writing workshop.',
    banner: '/events/workshop_banner.jpeg',
    gallery: [
      { src: '/events/workshop_1.jpeg', alt: 'Workshop participants gathered with Prof. Dr. Debasish Ghose' },
      { src: '/events/workshop_2.jpeg', alt: 'Collaborators and researchers in the department hallway' },
      { src: '/events/workshop_3.jpeg', alt: 'Prof. Dr. Debasish Ghose, Prof. Dr. Rudra Pratap Deb Nath, and Dr. Abu Nowshed Chy at SPMT office' },
      { src: '/events/workshop_4.jpeg', alt: 'Faculty and visiting professor outside SPMT office' },
      { src: '/events/workshop_5.jpeg', alt: 'Collaboration meeting at SPMT office' },
      { src: '/events/workshop_6.jpeg', alt: 'Research discussion at SPMT office' },
      { src: '/events/workshop_7.jpeg', alt: 'Faculty collaboration outside BIKE Lab SPMT office' },
      { src: '/events/workshop_8.jpeg', alt: 'Group photo in the BDAI lab' },
    ],
  },
  {
    date: '2.00PM · 19th May 2026',
    title: 'RAG-Driven Business Intelligence Platform Integration: Enterprise Data for Real-Time Insight, Predictive, and Prescriptive Decision Analytics',
    banner: '/events/seminar2.jpg',
    gallery: [
      { src: '/events/seminar2_1.jpeg', alt: 'RAG-Driven BI seminar gallery image 1' },
      { src: '/events/seminar2_2.jpeg', alt: 'RAG-Driven BI seminar gallery image 2' },
      { src: '/events/seminar2_3.jpeg', alt: 'RAG-Driven BI seminar gallery image 3' },
      { src: '/events/seminar2_4.jpeg', alt: 'RAG-Driven BI seminar gallery image 4' },
      { src: '/events/seminar2_5.jpeg', alt: 'RAG-Driven BI seminar gallery image 5' },
      { src: '/events/seminar2_6.jpeg', alt: 'RAG-Driven BI seminar gallery image 6' },
    ],
  },
  {
    date: '2.00PM · 14th May 2026',
    title: 'Identificatin of the Digital Footprints of Cyberbullying and the personality traits of the perpretators to protect the malicious activity',
    banner: '/events/1.png',
    gallery: [
      { src: '/events/phd1.png', alt: 'Event gallery image 1' },
      { src: '/events/phd2.png', alt: 'Event gallery image 2' },
      { src: '/events/phd3.png', alt: 'Event gallery image 3' },
      { src: '/events/phd4.png', alt: 'Event gallery image 4' },
      { src: '/events/phd5.png', alt: 'Event gallery image 5' },
      { src: '/events/phd6.png', alt: 'Event gallery image 6' },
    ],
  },
];

export default function HeldEvents() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-10 sm:py-14 px-4 sm:px-6">
      {heldEvents.map((event, index) => (
        <section key={index} className="mx-auto max-w-4xl rounded-3xl border border-white/70 bg-white p-5 sm:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0c2461]">
            {index === 0 ? 'Held Events' : ''}
          </h1>
          <p className="mt-3 text-sm sm:text-base font-medium text-slate-700">{event.date}</p>
          <h2 className="mt-3 text-lg sm:text-xl font-semibold text-[#0c2461]">{event.title}</h2>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <Image
              src={event.banner}
              alt="Event announcement"
              width={702}
              height={587}
              className="h-auto w-full object-contain"
              priority
            />
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg sm:text-xl font-semibold text-[#0c2461]">Event Gallery</h2>
              <p className="text-xs sm:text-sm font-medium text-slate-500">{event.gallery.length} snapshots</p>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {event.gallery.map((image) => (
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
      ))}
    </main>
  );
}
