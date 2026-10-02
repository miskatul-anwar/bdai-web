'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { fetchEvents, getCachedEvents, BackendEvent } from '@/lib/api';
import { getEventTimestamp } from '@/lib/date-utils';
import { EventsGridLoading } from '@/components/ui/LoadingAnimation';

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
          }
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch held events:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
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

      {/* Loading Animation */}
      {isLoading && events.length === 0 && (
        <div className="mx-auto max-w-4xl">
          <EventsGridLoading />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && events.length === 0 && (
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/70 bg-white p-12 text-center shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0c2461] flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <Calendar className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#0c2461] mb-2">No Events Found</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            There are currently no recorded events in the archive. New events will appear here once published.
          </p>
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
