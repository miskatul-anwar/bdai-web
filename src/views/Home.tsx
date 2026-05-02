'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight, ChevronRight,
  TrendingUp as TrendingUpIcon, Leaf, HeartPulse, GraduationCap, Plane, Apple, Factory, Scale, Flag
} from 'lucide-react';




/* ─── Data ─────────────────────────────────────────── */

const SECTORS = [
  { icon: TrendingUpIcon, label: 'Socio-Economics' },
  { icon: Leaf, label: 'Agriculture' },
  { icon: HeartPulse, label: 'Healthcare' },
  { icon: GraduationCap, label: 'Education' },
  { icon: Plane, label: 'Tourism' },
];

const STATS = [
  { value: '5+', label: 'Sectors' },
  { value: '1', label: 'Publications' },
  { value: '5+', label: 'AI Tools' },
  { value: '20+', label: 'Researchers' },
];

const ORGANIZATIONS = [
  {
    name: 'HEAT Bangladesh',
    logo: 'https://heat.ugc.gov.bd/heat-gov-images/logos/logo.svg',
  },
  {
    name: 'Ministry of Education, Bangladesh',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/120px-Government_Seal_of_Bangladesh.svg.png',
  },
  {
    name: 'UGC Bangladesh',
    logo: 'https://heat.ugc.gov.bd/heat-gov-images/logos/right-logo2.svg',
  },
  {
    name: 'World Bank',
    logo: 'https://heat.ugc.gov.bd/heat-gov-images/logos/right-logo3.svg',
  },
  {
    name: 'University of Chittagong',
    logo: 'https://cu.ac.bd/wp-content/uploads/2024/03/university-of-chittagong-seeklogo.com-removebg-preview-removebg-preview-1-222x300.png',
  },
  {
    name: 'BIKE LAB',
    logo: '/Bike.png',
  },
];

const SDGS = [
  { code: 'SDG 2', label: 'Zero Hunger', href: 'https://sdgs.un.org/goals/goal2', icon: Apple },
  { code: 'SDG 4', label: 'Quality Education', href: 'https://sdgs.un.org/goals/goal4', icon: GraduationCap },
  { code: 'SDG 9', label: 'Industry, Innovation and Infrastructure', href: 'https://sdgs.un.org/goals/goal9', icon: Factory },
  { code: 'SDG 10', label: 'Reduced Inequalities', href: 'https://sdgs.un.org/goals/goal10', icon: Scale },
  { code: 'SDG 17', label: 'Partnerships for the Goals', href: 'https://sdgs.un.org/goals/goal17', icon: Flag },
];

/* ─── Component ─────────────────────────────────────── */

export default function Home() {
  const heroGridRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      if (heroGridRef.current) {
        heroGridRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>

      {/* ── Compact Hero ───────────────────────────────── */}
      <section className="relative min-h-[36vh] bg-[#07101f] flex items-center overflow-hidden">

        {/* Subtle grid */}
        <div
          ref={heroGridRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient glow — top right only (scaled down to match reduced height) */}
        <div
          className="absolute top-0 right-0 w-[270px] h-[270px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(59,130,246,0.12) 0%, transparent 65%)' }}
        />

        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 py-9 md:py-12">

          {/* Wordmark */}
          <h1 className="text-[clamp(48px,10vw,120px)] font-bold leading-[0.9] tracking-tight text-white m-0">
            BD<span className="text-blue-400">AI</span>
          </h1>

          {/* Divider */}
          <div
            className="w-full h-px my-4"
            style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.3), transparent)' }}
          />

          {/* Tagline + CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[clamp(13px,1.4vw,16px)] text-slate-400 leading-[1.6] max-w-lg m-0">
              Leveraging <span className="text-blue-400 font-bold">B</span>angla<span className="text-blue-400 font-bold">D</span>esh Sectoral Knowledge Graphs and Large Language Modes for <span className="text-blue-400 font-bold">A</span>rtificial <span className="text-blue-400 font-bold">I</span>ntelligence Driven Instights.
            </p>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => router.push('/tools')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white border-none cursor-pointer text-[11px] font-semibold tracking-[0.04em] uppercase transition-opacity hover:opacity-85"
              >
                Explore Tools <ArrowRight size={13} />
              </button>
              <a
                href="https://web.bike-csecu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-slate-400 border border-slate-700 cursor-pointer no-underline text-[11px] font-medium tracking-[0.04em] uppercase transition-colors hover:border-slate-500 hover:text-slate-200"
              >
                BIKE <ChevronRight size={13} />
              </a>
            </div>
          </div>

          {/* Stats (compact) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 mt-8 border border-slate-800 rounded-lg overflow-hidden text-sm">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="py-3 px-3 text-center bg-slate-900/50 border-r border-slate-800 last:border-r-0"
              >
                <div className="text-[clamp(20px,3vw,32px)] font-bold text-blue-400 tracking-tight leading-none">
                  {s.value}
                </div>
                <div className="text-[10px] tracking-[0.12em] uppercase text-slate-500 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compact Sector Ticker ────────────────────── */}
      <div className="bg-blue-500 overflow-hidden py-2">
        <div
          className="flex gap-8 whitespace-nowrap w-max"
          style={{ animation: 'ticker 18s linear infinite' }}
        >
          {[...SECTORS, ...SECTORS, ...SECTORS].map(({ icon: Icon, label }, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase text-white/90"
            >
              <Icon size={12} /> {label}
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
      </div>

      {/* ── Partner Organizations ──────────────────── */}
      <section className="w-full bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="w-full">

          <div className="mb-10 px-6 md:px-10">
            <h2 className="text-center text-[clamp(22px,3.5vw,36px)] font-bold text-slate-900 tracking-tight m-0">
              Partner Organizations
            </h2>
          </div>

          <div className="w-full overflow-hidden border-y border-slate-200 bg-white/70 py-7 px-6 md:px-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <div
              className="flex items-stretch gap-5 w-max"
              style={{ animation: 'orgTicker 20.8s linear infinite reverse', transform: 'translateX(-50%)' }}
            >
              {[...ORGANIZATIONS, ...ORGANIZATIONS].map((org, i) => (
                <div
                  key={i}
                  className="w-[190px] shrink-0 bg-white border border-slate-200 rounded-xl p-4 md:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-[77px] h-[77px] mb-3 flex items-center justify-center">
                    <img
                      src={org.logo}
                      alt={`${org.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <p className="text-[12px] font-semibold text-slate-700 leading-snug m-0">
                    {org.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <style>{`@keyframes orgTicker{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
        </div>
      </section>
      {/* ── SDGs ─────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-[clamp(22px,3.5vw,36px)] font-bold text-slate-900 tracking-tight m-0">
            Sustainable Development Goals
          </h2>
          <p className="text-center text-slate-500 mt-3 mb-10 max-w-2xl mx-auto">
            Explore the SDGs aligned with our research and initiatives.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {SDGS.map((sdg) => (
              <a
                key={sdg.code}
                href={sdg.href}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[190px] inline-flex flex-col items-start gap-1 rounded-xl border border-slate-200 bg-white px-5 py-4 text-left no-underline shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-blue-300"
              >
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-blue-500">{sdg.code}</span>
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-800 leading-snug">
                  <sdg.icon size={16} className="shrink-0 text-blue-500" />
                  <span>{sdg.label}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="bg-[#07101f] py-20 px-6 text-center">
        <div className="max-w-md mx-auto">
          <p className="text-[16px] text-slate-400 leading-[1.75] mb-10">
            Explore our work packages, the askBDAI tool, SPARQL interface, and publications.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => router.push('/tools')}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-500 text-white border-none cursor-pointer text-[12px] font-semibold tracking-[0.06em] uppercase transition-opacity hover:opacity-85"
            >
              Get Started <ArrowRight size={13} />
            </button>
            <a
              href="mailto:rudra@cu.ac.bd"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-slate-300 border border-slate-700 cursor-pointer no-underline text-[12px] font-medium tracking-[0.06em] uppercase transition-colors hover:border-slate-500 hover:text-white"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
