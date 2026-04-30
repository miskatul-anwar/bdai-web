'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight, Database, Globe, Network,
  CheckCircle, Target, Sparkles, TrendingUp,
  BookOpen, Leaf, GraduationCap, HeartPulse, Plane,
  ShieldCheck, Brain, ChevronRight
} from 'lucide-react';

const SECTORS = [
  { icon: TrendingUp, label: 'Socio-Economics' },
  { icon: Leaf, label: 'Agriculture' },
  { icon: HeartPulse, label: 'Healthcare' },
  { icon: GraduationCap, label: 'Education' },
  { icon: Plane, label: 'Tourism' },
];

const WHAT_WE_DO = [
  {
    icon: Network,
    tag: 'SMART',
    title: 'SMART Data Ecosystems',
    desc: 'Sustainable, Meaningful, Accessible, Reusable, and Traceable data pipelines built specifically for Bangladesh.',
  },
  {
    icon: Database,
    tag: 'KG',
    title: 'Sector-Specific Knowledge Graphs',
    desc: 'FAIR-compliant knowledge graphs across socio-economics, agriculture, healthcare, tourism, and education.',
  },
  {
    icon: Brain,
    tag: 'LLM',
    title: 'AI-Powered Natural Language Tools',
    desc: 'Interfaces that let anyone explore complex sectoral data through plain language queries.',
  },
  {
    icon: ShieldCheck,
    tag: 'TRUST',
    title: 'Fairness & Transparency',
    desc: 'Rigorous validation of AI systems for bias, explainability, and trustworthiness through KG-LLM synergy.',
  },
  {
    icon: BookOpen,
    tag: 'CAP',
    title: 'Capacity Building',
    desc: 'Training students, researchers, and policymakers through workshops, collaborations, and publications.',
  },
];

const HIGHLIGHTS = [
  { title: 'Open Data Quality Framework', text: 'First-ever Open Data Quality Measurement Framework for Bangladesh.' },
  { title: 'Advanced KG-RAG', text: 'Innovative use of Knowledge Graphs with LLMs for retrieval-augmented generation.' },
  { title: 'askBDAI', text: 'AI-powered Q&A system exploiting graph patterns for real-world problem solving.' },
  { title: 'SDG Alignment', text: 'Strong alignment with SDGs 2, 4, 9, 10, and 17 for national and global impact.' },
  { title: 'Global AI Position', text: 'Positioning Bangladesh as a serious player in the international AI research community.' },
  { title: 'FAIR Knowledge Graphs', text: 'Sector-specific, FAIR-compliant KGs unique to Bangladesh — first of their kind.' },
];

const STAND_OUT = [
  {
    icon: Sparkles,
    title: 'Originality & Novelty',
    desc: 'Introducing FAIR-compliant knowledge graphs and SMART ecosystems that are genuinely novel for Bangladesh.',
  },
  {
    icon: Target,
    title: 'Impactful Reach',
    desc: 'Empowering government, academia, industry, and the public with actionable, data-driven insights.',
  },
  {
    icon: TrendingUp,
    title: 'Future-Ready',
    desc: 'Expanding into bioinformatics, ocean sciences, and energy — designed to outlast the project itself.',
  },
  {
    icon: Globe,
    title: 'Global Collaboration',
    desc: 'Building international partnerships and contributing to global AI research communities.',
  },
];

const STATS = [
  { value: '5+', label: 'Sectors' },
  { value: '1', label: 'Publications' },
  { value: '5+', label: 'AI Tools' },
  { value: '10+', label: 'Researchers' },
];

export default function Home() {
  const [activeWhat, setActiveWhat] = useState(0);
  const heroGridRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (heroGridRef.current) {
        heroGridRef.current.style.transform = `translateY(${window.scrollY * 0.2}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-[#ecf0f1]">
      {/* ── Hero ── */}
      <section className="relative min-h-screen bg-[#0a1628] flex items-center overflow-hidden">
        {/* Parallax grid overlay */}
        <div
          ref={heroGridRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(96,165,250,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96,165,250,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
        {/* Glow orbs */}
        <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 68%)' }} />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 68%)' }} />

        <div className="relative w-full max-w-6xl mx-auto px-6 py-28 md:py-36">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-9 h-px bg-blue-400/50" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400/75">
              SP No. 13211 · University of Chittagong
            </span>
          </div>

          {/* Main wordmark */}
          <h1 className="text-[clamp(72px,15vw,168px)] font-bold leading-[0.88] tracking-tight text-white m-0">
            BD<span className="text-blue-400">AI</span>
          </h1>

          {/* Divider */}
          <div className="w-full h-px my-8"
            style={{ background: 'linear-gradient(90deg, rgba(96,165,250,0.35), transparent)' }} />

          {/* Tagline + CTAs */}
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
            <p className="text-[clamp(15px,1.8vw,19px)] text-white/50 leading-[1.8] max-w-xl m-0">
              Combining Knowledge Graphs and Large Language Models to build AI-powered,
              data-driven insights across Bangladesh's key sectors — accelerating the
              nation's path to Digital Bangladesh.
            </p>
            <div className="flex flex-row flex-wrap gap-3 md:flex-col md:flex-nowrap md:flex-shrink-0">
              <button
                onClick={() => router.push('/results/publications')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-400 text-[#0a1628] border-none cursor-pointer text-[11px] font-bold tracking-[0.06em] uppercase transition-opacity hover:opacity-90"
              >
                Explore Research <ArrowRight size={13} />
              </button>
              <a
                href="https://web.bike-csecu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent text-white/55 border border-white/12 cursor-pointer no-underline text-[11px] font-semibold tracking-[0.06em] uppercase transition-colors hover:border-white/30 hover:text-white/80"
              >
                BIKE Lab <ChevronRight size={13} />
              </a>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 mt-16 rounded-2xl overflow-hidden border border-white/[0.06]"
            style={{ background: 'rgba(255,255,255,0.06)', gap: '1px' }}>
            {STATS.map((s, i) => (
              <div key={i} className="py-7 px-4 text-center" style={{ background: 'rgba(10,22,40,0.55)' }}>
                <div className="text-[clamp(28px,4vw,44px)] font-bold text-blue-400 tracking-tight">
                  {s.value}
                </div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-white/30 mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sector ticker ── */}
      <div className="bg-blue-400 overflow-hidden py-4">
        <div
          className="flex gap-14 whitespace-nowrap w-max"
          style={{ animation: 'ticker 20s linear infinite' }}
        >
          {[...SECTORS, ...SECTORS, ...SECTORS].map(({ icon: Icon, label }, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.14em] uppercase text-[#0a1628]"
            >
              <Icon size={13} /> {label}
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
      </div>

      {/* ── Mission ── */}
      <section className="bg-[#ecf0f1] py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400 block mb-6">
            Our Mission
          </p>
          <p className="text-[clamp(18px,2.8vw,32px)] leading-[1.55] text-[#0c2461] font-normal m-0">
            "To leverage Knowledge Graphs and Large Language Models to develop AI-powered
            natural language interfaces enabling data-driven insights across Bangladesh's
            socio-economics, agriculture, healthcare, tourism, and education sectors —
            accelerating progress toward the{' '}
            <em className="text-blue-400 not-italic">Sustainable Development Goals.</em>"
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['SDG 2', 'SDG 4', 'SDG 9', 'SDG 10', 'SDG 17'].map((sdg) => (
              <span
                key={sdg}
                className="px-4 py-1.5 rounded-lg border border-[#0c2461] text-[#0c2461] text-[11px] tracking-[0.1em] uppercase font-semibold"
              >
                {sdg}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className="bg-[#0c2461] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400/65">
              What We Do
            </p>
            <h2 className="text-[clamp(26px,4vw,44px)] font-bold text-white mt-3 tracking-tight">
              Five Research Pillars
            </h2>
          </div>

          {/* Tab nav */}
          <div className="flex flex-wrap gap-2 mb-2">
            {WHAT_WE_DO.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveWhat(i)}
                className={`px-5 py-2 rounded-full border-none cursor-pointer text-[11px] tracking-[0.1em] uppercase font-bold transition-all ${
                  activeWhat === i
                    ? 'bg-blue-400 text-[#0a1628]'
                    : 'bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/70'
                }`}
              >
                {item.tag}
              </button>
            ))}
          </div>

          {/* Active panel */}
          <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-7 sm:p-12 flex flex-col sm:flex-row gap-7 sm:gap-9 items-start">
            <div className="w-14 h-14 rounded-xl bg-blue-400/10 flex items-center justify-center text-blue-400 flex-shrink-0">
              {React.createElement(WHAT_WE_DO[activeWhat].icon, { size: 26 })}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                {WHAT_WE_DO[activeWhat].title}
              </h3>
              <p className="text-[17px] text-white/50 leading-[1.8] m-0">
                {WHAT_WE_DO[activeWhat].desc}
              </p>
            </div>
          </div>

          {/* All pillars mini row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1 mt-2">
            {WHAT_WE_DO.map((item, i) => (
              <div
                key={i}
                onClick={() => setActiveWhat(i)}
                className={`px-5 py-6 rounded-xl cursor-pointer transition-all border-l-[3px] ${
                  activeWhat === i
                    ? 'bg-blue-400/10 border-l-blue-400'
                    : 'bg-white/[0.03] border-l-transparent hover:bg-white/[0.06]'
                }`}
              >
                <div className="text-blue-400 mb-3">
                  {React.createElement(item.icon, { size: 17 })}
                </div>
                <div className="text-[13px] font-semibold text-white">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="bg-[#ecf0f1] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header — stacked on mobile, side-by-side on lg */}
          <div className="flex flex-col gap-6 mb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400 mb-2">
                Highlights
              </p>
              <h2 className="text-[clamp(22px,2.5vw,34px)] font-bold text-[#0c2461] tracking-tight leading-snug m-0">
                What Makes BDAI Distinct
              </h2>
            </div>
            <div className="w-11 h-[3px] rounded-full bg-blue-400 flex-shrink-0" />
          </div>

          {/* Items */}
          <div className="flex flex-col gap-2">
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={i}
                className="flex gap-5 items-start px-6 py-7 rounded-2xl bg-white border-l-[3px] border-l-transparent transition-all hover:border-l-blue-400 hover:bg-[#eff4ff] group"
              >
                <CheckCircle size={19} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#0c2461] text-[15px] m-0 mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-[1.7] m-0">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why We Stand Out ── */}
      <section className="bg-[#0a1628] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.2em] uppercase text-blue-400/65 font-bold">
              Why BDAI
            </p>
            <h2 className="text-[clamp(26px,4vw,44px)] font-bold text-white mt-3 tracking-tight">
              Why We Stand Out
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {STAND_OUT.map((item, i) => (
              <div
                key={i}
                className="p-10 rounded-2xl bg-white/[0.04] border border-white/[0.06] transition-colors hover:bg-blue-400/[0.09]"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center text-blue-400 mb-7">
                  {React.createElement(item.icon, { size: 21 })}
                </div>
                <h3 className="text-[17px] font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-white/40 leading-[1.8] m-0">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#ecf0f1] py-24 px-6 text-center">
        <div className="max-w-lg mx-auto">
          <div className="text-[clamp(52px,10vw,96px)] font-bold leading-[0.88] tracking-tight text-[#0c2461] mb-8">
            BD<span className="text-blue-400">AI</span>
          </div>
          <p className="text-[17px] text-gray-500 leading-[1.75] mb-12">
            Discover our work packages, the askBDAI tool, SPARQL interface, and publications.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0c2461] text-white border-none cursor-pointer text-[12px] font-bold tracking-[0.07em] uppercase transition-colors hover:bg-[#1a3a8a]"
              onClick={() => router.push('/sparql-tool')}
            >
              Get Started <ArrowRight size={13} />
            </button>
            <a
              href="mailto:rudra@cu.ac.bd"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-transparent text-[#0c2461] border border-[#0c2461] cursor-pointer no-underline text-[12px] font-bold tracking-[0.07em] uppercase transition-colors hover:bg-[#0c2461]/5"
            >
              Contact Us
            </a>
          </div>
          <p className="mt-12 text-[12px] text-gray-400 tracking-[0.04em]">
            rudra@cu.ac.bd &nbsp;·&nbsp; bike-csecu.com &nbsp;·&nbsp; University of Chittagong
          </p>
        </div>
      </section>
    </main>
  );
}
