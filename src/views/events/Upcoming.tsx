'use client';

export default function UpcomingEvents() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-10 sm:py-14 px-4 sm:px-6">
      <section className="mx-auto max-w-4xl rounded-3xl border border-white/70 bg-white p-5 sm:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
        <div className="mb-5 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0c2461]">Upcoming Events</h1>
        </div>
        <p className="mt-6 text-sm sm:text-base text-slate-600">No upcoming events at this time.</p>
      </section>
    </main>
  );
}
