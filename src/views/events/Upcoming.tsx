'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Sparkles, Clock } from 'lucide-react';
import { fetchEvents, getCachedEvents, BackendEvent } from '@/lib/api';
import { getEventTimestamp } from '@/lib/date-utils';

export default function UpcomingEvents() {
  const [events, setEvents] = useState<BackendEvent[]>(() => {
    const cached = getCachedEvents('upcoming');
    if (cached && cached.length > 0) return cached;
    return [];
  });
  const [isLoading, setIsLoading] = useState(() => !getCachedEvents('upcoming'));

  useEffect(() => {
    let isMounted = true;
    fetchEvents({ status: 'upcoming' })
      .then((data) => {
        if (isMounted) {
          if (data && Array.isArray(data)) {
            const sorted = [...data].sort((a, b) => getEventTimestamp(b) - getEventTimestamp(a));
            setEvents(sorted);
          }
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch upcoming events:', err);
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
            Announcements & Schedule
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0c2461]">
          Upcoming Events
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Upcoming workshops, research presentations, and conferences organized under the BDAI project.
        </p>
      </div>

      {/* Loading Skeleton */}
      {isLoading && events.length === 0 && (
        <div className="mx-auto max-w-4xl space-y-6 animate-pulse">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/70 bg-white p-5 sm:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
            >
              <div className="h-4 w-32 bg-slate-200 rounded mb-4" />
              <div className="h-6 w-3/4 bg-slate-200 rounded mb-4" />
              <div className="h-4 w-1/2 bg-slate-100 rounded mb-4" />
              <div className="h-48 w-full bg-slate-100 rounded-2xl" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && events.length === 0 && (
        <section className="mx-auto max-w-4xl rounded-3xl border border-white/70 bg-white p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,23,42,0.08)] text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0c2461] flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <Clock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#0c2461] mb-2">No Upcoming Events</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            There are currently no upcoming events scheduled at this time. Please check back soon for future workshops, seminars, and academic fellowship notices.
          </p>
        </section>
      )}

      {/* Dynamic Upcoming Events List */}
      {!isLoading && events.length > 0 && (
        <div className="mx-auto max-w-4xl space-y-8">
          {events.map((event) => (
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
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {event.category}
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

              {event.banner && (
                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <Image
                    src={event.banner}
                    alt={event.title}
                    width={702}
                    height={587}
                    className="h-auto w-full object-contain"
                  />
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
