import Link from 'next/link';

export default function Vacancies() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.16),_transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Vacancies
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            e-Tender Notice (OTM Goods) under the HEAT-13211-CU ATF Sub-Project, Department of Computer Science and Engineering, University of Chittagong.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-2 lg:px-10">
        <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Position / Notice Details</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
            <li><strong>Notice:</strong> e-Tender Notice (OTM Goods)</li>
            <li><strong>Memo:</strong> HEAT/CU/PIN13211/G-03.11/2025-2026</li>
            <li><strong>Date:</strong> 02-06-2026</li>
            <li><strong>Project:</strong> HEAT-13211-CU ATF Sub-Project</li>
            <li><strong>Package:</strong> Supply and installation of AI workstations</li>
            <li><strong>Type of Tender:</strong> NCT, OTM</li>
            <li><strong>Location:</strong> Department of Computer Science and Engineering, University of Chittagong</li>
            <li><strong>Online Tender Notice Publication:</strong> 02-06-2026, 16:00</li>
            <li><strong>Online Tender Closing/Opening:</strong> 17-06-2026, 12:05</li>
            <li>
              <strong>Portal:</strong>{' '}
              <a
                href="https://www.eprocure.gov.bd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 underline underline-offset-2"
              >
                National e-GP System Portal (www.eprocure.gov.bd)
              </a>
            </li>
            <li><strong>Contact:</strong> e-GP Help Desk (helpdesk@eprocure.gov.bd)</li>
            <li><strong>Authorized Signatory:</strong> Professor Dr. Rudra Pratap Deb Nath, SPM, HEAT-13211-CU ATF Sub-project</li>
          </ul>
          <p className="mt-5 text-xs leading-5 text-slate-400">
            Only e-Tenders submitted through the National e-GP System Portal will be accepted. Offline/hard-copy submissions will not be considered.
          </p>
          <div className="mt-6">
            <Link
              href="https://www.eprocure.gov.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-sky-400"
            >
              Open e-GP Portal
            </Link>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white p-4">
          <img
            src="/position1.jpeg"
            alt="Position notice image"
            className="w-full rounded-2xl border border-slate-200 object-contain"
          />
        </article>
      </section>
    </main>
  );
}
