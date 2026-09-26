'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { fetchEvents, getCachedEvents, BackendEvent } from '@/lib/api';
import { getEventTimestamp } from '@/lib/date-utils';

const initialHeldEvents: BackendEvent[] = [
  {
    id: 'event_workshop_debasish',
    date: '29th July 2026',
    date_iso: '2026-07-29',
    title: 'Professor Dr. Debasish Ghose from Kristiania University College, Norway visited our lab for collaboration purpose. He delivers an intensive quality paper writing workshop.',
    status: 'held',
    category: 'Workshop',
    location: 'BDAI Lab & SPMT Office, Department of CSE, University of Chittagong',
    description: 'Professor Dr. Debasish Ghose from Kristiania University College, Norway visited our lab for research collaboration and delivered an intensive quality paper writing workshop for researchers and faculty members.',
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
    order: 1,
  },
  {
    id: 'event_seminar_rag_bi',
    date: '2.00PM · 19th May 2026',
    date_iso: '2026-05-19T14:00',
    title: 'RAG-Driven Business Intelligence Platform Integration: Enterprise Data for Real-Time Insight, Predictive, and Prescriptive Decision Analytics',
    status: 'held',
    category: 'Seminar',
    location: 'Department of Computer Science and Engineering, University of Chittagong',
    description: 'Seminar on enterprise integration of retrieval-augmented generation and semantic knowledge graphs for real-time analytics and predictive decision systems.',
    banner: '/events/seminar2.jpg',
    gallery: [
      { src: '/events/seminar2_1.jpeg', alt: 'RAG-Driven BI seminar gallery image 1' },
      { src: '/events/seminar2_2.jpeg', alt: 'RAG-Driven BI seminar gallery image 2' },
      { src: '/events/seminar2_3.jpeg', alt: 'RAG-Driven BI seminar gallery image 3' },
      { src: '/events/seminar2_4.jpeg', alt: 'RAG-Driven BI seminar gallery image 4' },
      { src: '/events/seminar2_5.jpeg', alt: 'RAG-Driven BI seminar gallery image 5' },
      { src: '/events/seminar2_6.jpeg', alt: 'RAG-Driven BI seminar gallery image 6' },
    ],
    order: 2,
  },
  {
    id: 'event_phd_cyberbullying',
    date: '2.00PM · 14th May 2026',
    date_iso: '2026-05-14T14:00',
    title: 'Identificatin of the Digital Footprints of Cyberbullying and the personality traits of the perpretators to protect the malicious activity',
    status: 'held',
    category: 'PhD Seminar',
    location: 'Department of Computer Science and Engineering, University of Chittagong',
    description: 'PhD Open Seminar on machine learning models and digital footprint analysis for cyberbullying detection and perpetrator personality classification in Bengali social text.',
    banner: '/events/1.png',
    gallery: [
      { src: '/events/phd1.png', alt: 'Event gallery image 1' },
      { src: '/events/phd2.png', alt: 'Event gallery image 2' },
      { src: '/events/phd3.png', alt: 'Event gallery image 3' },
      { src: '/events/phd4.png', alt: 'Event gallery image 4' },
      { src: '/events/phd5.png', alt: 'Event gallery image 5' },
      { src: '/events/phd6.png', alt: 'Event gallery image 6' },
    ],
    order: 3,
  },
];

export default function HeldEvents() {
  const [events, setEvents] = useState<BackendEvent[]>(() => {
    const cached = getCachedEvents('held');
    if (cached && cached.length > 0) return cached;
    return [];
  });
  const [isLoading, setIsLoading] = useState(() => !getCachedEvents('held'));
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchEvents({ status: 'held' })
      .then((data) => {
        if (isMounted) {
          if (data && Array.isArray(data)) {
            const visible = data.filter((e) => e.is_visible !== false);
            const sorted = [...visible].sort((a, b) => getEventTimestamp(b) - getEventTimestamp(a));
            setEvents(sorted);
          } else if (events.length === 0) {
            setEvents(initialHeldEvents);
          }
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch held events:', err);
        if (isMounted) {
          if (events.length === 0) setEvents(initialHeldEvents);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#ecf0f1] py-10 sm:py-14 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0c2461] bg-[#0c2461]/10 px-3 py-1 rounded-full">
            Events Archive
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0c2461]">
          Held Events
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Workshops, seminars, and academic delegations hosted by the BDAI project and BIKE Lab at the University of Chittagong.
        </p>
      </div>

      {/* Loading Skeleton */}
      {isLoading && events.length === 0 && (
        <div className="mx-auto max-w-4xl space-y-8 animate-pulse">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/70 bg-white p-5 sm:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
            >
              <div className="h-4 w-36 bg-slate-200 rounded mb-4" />
              <div className="h-7 w-3/4 bg-slate-200 rounded mb-6" />
              <div className="h-72 w-full bg-slate-100 rounded-2xl mb-8" />
              <div className="h-5 w-40 bg-slate-200 rounded mb-4" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((g) => (
                  <div key={g} className="aspect-[4/3] bg-slate-100 rounded-2xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic Events List */}
      <div className="mx-auto max-w-4xl space-y-8">
        {events.map((event) => {
          const gallery = event.gallery || [];
          return (
            <section
              key={event.id}
              className="rounded-3xl border border-white/70 bg-white p-5 sm:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Calendar className="w-4 h-4 text-[#0c2461]" />
                  <span>{event.date}</span>
                </div>
                {event.category && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    {event.category}
                  </span>
                )}
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-[#0c2461] leading-snug">
                {event.title}
              </h2>

              {event.location && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{event.location}</span>
                </div>
              )}

              {event.description && (
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {event.description}
                </p>
              )}

              {/* Event Banner */}
              {event.banner && (
                <div
                  onClick={() => setLightboxImg({ src: event.banner, alt: event.title })}
                  className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer group relative"
                >
                  <Image
                    src={event.banner}
                    alt={event.title}
                    width={702}
                    height={587}
                    className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                    priority
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 backdrop-blur-xs text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5" /> View Announcement
                    </span>
                  </div>
                </div>
              )}

              {/* Event Gallery */}
              {gallery.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#0c2461]" />
                      <h3 className="text-lg font-bold text-[#0c2461]">Event Gallery</h3>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-500">
                      {gallery.length} snapshots
                    </p>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {gallery.map((image, gIdx) => (
                      <div
                        key={image.src || gIdx}
                        onClick={() => setLightboxImg(image)}
                        className="group relative flex aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 shadow-[0_8px_24px_rgba(15,23,42,0.07)] transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer bg-slate-50"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt || `Event photo ${gIdx + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                          <p className="text-[11px] text-white font-medium line-clamp-2 leading-tight">
                            {image.alt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-10 right-0 p-1.5 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full max-h-[80vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black/40">
              <img
                src={lightboxImg.src}
                alt={lightboxImg.alt}
                className="max-h-[80vh] max-w-full object-contain rounded-xl"
              />
            </div>
            {lightboxImg.alt && (
              <p className="mt-3 text-center text-xs sm:text-sm text-white/90 bg-black/60 px-4 py-2 rounded-xl backdrop-blur-xs max-w-2xl">
                {lightboxImg.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
