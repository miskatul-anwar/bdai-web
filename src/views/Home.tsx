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
    <main style={{ background: '#f5f4f0', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <style>{`
        @media (max-width: 768px) {
          main { --grid-cols: 1; }
        }
        @media (min-width: 769px) {
          main { --grid-cols: auto; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{
        minHeight: '100vh',
        background: '#0a1628',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid overlay */}
        <div ref={heroGridRef} style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(96,165,250,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96,165,250,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }} />
        {/* Glow orbs */}
        <div style={{
          position: 'absolute', top: '-160px', right: '-160px',
          width: '560px', height: '560px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 68%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', left: '-100px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 68%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '120px 32px' }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
            <div style={{ width: '36px', height: '1px', background: 'rgba(96,165,250,0.55)' }} />
            <span style={{
              fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(96,165,250,0.75)', fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontWeight: 600,
            }}>
              SP No. 13211 · University of Chittagong
            </span>
          </div>

          {/* Main wordmark */}
          <h1 style={{
            fontSize: 'clamp(80px, 15vw, 168px)',
            fontWeight: 700, lineHeight: 0.88,
            letterSpacing: '-0.035em',
            color: '#ffffff', margin: 0,
          }}>
            BD<span style={{ color: '#60a5fa' }}>AI</span>
          </h1>

          {/* Divider */}
          <div style={{
            width: '100%', height: '1px',
            background: 'linear-gradient(90deg, rgba(96,165,250,0.35), transparent)',
            margin: '32px 0',
          }} />

          {/* Tagline + CTAs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '48px',
            alignItems: 'end',
          }}>
            <p style={{
              fontSize: 'clamp(16px, 1.8vw, 19px)',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.8, maxWidth: '540px', margin: 0,
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            }}>
              Combining Knowledge Graphs and Large Language Models to build AI-powered,
              data-driven insights across Bangladesh's key sectors — accelerating the
              nation's path to Digital Bangladesh.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
              <button
                onClick={() => router.push('/results/publications')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '9999px',
                  background: '#60a5fa', color: '#0a1628',
                  border: 'none', cursor: 'pointer',
                  fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                }}>
                Explore Research <ArrowRight size={13} />
              </button>
              <a href="https://web.bike-csecu.com" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '9999px',
                background: 'transparent', color: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(255,255,255,0.12)',
                cursor: 'pointer', textDecoration: 'none',
                fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              }}>
                BIKE Lab <ChevronRight size={13} />
              </a>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
            gap: '1px', marginTop: '80px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px', overflow: 'hidden',
          }}>
            {STATS.map((s, i) => (
              <div key={i} style={{
                padding: '32px 20px', textAlign: 'center',
                background: 'rgba(10,22,40,0.55)',
              }}>
                <div style={{
                  fontSize: 'clamp(30px, 4vw, 44px)',
                  fontWeight: 700, color: '#60a5fa',
                  letterSpacing: '-0.02em',
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: '10px', letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif', marginTop: '8px',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sector ticker ── */}
      <div style={{
        background: '#60a5fa',
        overflow: 'hidden',
        padding: '16px 0',
      }}>
        <div style={{
          display: 'flex', gap: '56px',
          animation: 'ticker 20s linear infinite',
          whiteSpace: 'nowrap', width: 'max-content',
        }}>
          {[...SECTORS, ...SECTORS, ...SECTORS].map(({ icon: Icon, label }, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: '#0a1628',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            }}>
              <Icon size={13} /> {label}
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
      </div>

      {/* ── Mission ── */}
      <section style={{ background: '#f5f4f0', padding: '128px 32px' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <span style={{
            fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#60a5fa', fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontWeight: 700,
            display: 'block', marginBottom: '28px',
          }}>
            Our Mission
          </span>
          <p style={{
            fontSize: 'clamp(20px, 3vw, 34px)',
            lineHeight: 1.5, color: '#0c2461',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontWeight: 400, margin: 0,
          }}>
            "To leverage Knowledge Graphs and Large Language Models to develop AI-powered
            natural language interfaces enabling data-driven insights across Bangladesh's
            socio-economics, agriculture, healthcare, tourism, and education sectors —
            accelerating progress toward the{' '}
            <em style={{ color: '#60a5fa' }}>Sustainable Development Goals.</em>"
          </p>
          <div style={{ marginTop: '40px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['SDG 2', 'SDG 4', 'SDG 9', 'SDG 10', 'SDG 17'].map((sdg) => (
              <span key={sdg} style={{
                padding: '6px 16px', borderRadius: '8px',
                border: '1px solid #0c2461',
                color: '#0c2461',
                fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontWeight: 600,
              }}>
                {sdg}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section style={{ background: '#0c2461', padding: '128px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px' }}>
            <span style={{
              fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(96,165,250,0.65)', fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontWeight: 700,
            }}>
              What We Do
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700,
              color: '#ffffff', marginTop: '12px', letterSpacing: '-0.02em',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            }}>
              Five Research Pillars
            </h2>
          </div>

          {/* Tab nav */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
            {WHAT_WE_DO.map((item, i) => (
              <button key={i} onClick={() => setActiveWhat(i)} style={{
                padding: '10px 22px', borderRadius: '9999px',
                background: activeWhat === i ? '#60a5fa' : 'rgba(255,255,255,0.05)',
                color: activeWhat === i ? '#0a1628' : 'rgba(255,255,255,0.45)',
                border: 'none', cursor: 'pointer',
                fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontWeight: 700,
                transition: 'all 0.2s',
              }}>
                {item.tag}
              </button>
            ))}
          </div>

          {/* Active panel */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            padding: '52px',
            display: 'grid',
            gridTemplateColumns: '60px 1fr',
            gap: '36px',
            alignItems: 'start',
          }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '12px',
              background: 'rgba(96,165,250,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#60a5fa', flexShrink: 0,
            }}>
              {React.createElement(WHAT_WE_DO[activeWhat].icon, { size: 26 })}
            </div>
            <div>
              <h3 style={{
                fontSize: '22px', fontWeight: 700, color: '#ffffff',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif', marginBottom: '16px',
              }}>
                {WHAT_WE_DO[activeWhat].title}
              </h3>
              <p style={{
                fontSize: '17px', color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.8, fontFamily: 'ui-sans-serif, system-ui, sans-serif', margin: 0,
              }}>
                {WHAT_WE_DO[activeWhat].desc}
              </p>
            </div>
          </div>

          {/* All pillars mini row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '4px', marginTop: '8px',
          }}>
            {WHAT_WE_DO.map((item, i) => (
              <div key={i} onClick={() => setActiveWhat(i)} style={{
                padding: '28px 24px', borderRadius: '12px',
                background: activeWhat === i ? 'rgba(96,165,250,0.1)' : 'rgba(255,255,255,0.03)',
                borderLeft: activeWhat === i ? '3px solid #60a5fa' : '3px solid transparent',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
                <div style={{ color: '#60a5fa', marginBottom: '12px' }}>
                  {React.createElement(item.icon, { size: 17 })}
                </div>
                <div style={{
                  fontSize: '13px', fontWeight: 600, color: '#ffffff',
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                }}>
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section style={{ background: '#f5f4f0', padding: '128px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '96px', alignItems: 'start',
          }}>
            {/* Sticky label */}
            <div style={{ position: 'sticky', top: '80px' }}>
              <span style={{
                fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#60a5fa', fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontWeight: 700,
                display: 'block', marginBottom: '16px',
              }}>
                Highlights
              </span>
              <h2 style={{
                fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 700,
                color: '#0c2461', letterSpacing: '-0.02em',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif', lineHeight: 1.2, margin: 0,
              }}>
                What Makes BDAI Distinct
              </h2>
              <div style={{ width: '44px', height: '3px', borderRadius: '9999px', background: '#60a5fa', marginTop: '24px' }} />
            </div>

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {HIGHLIGHTS.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '24px', alignItems: 'flex-start',
                  padding: '32px', borderRadius: '16px',
                  background: '#ffffff',
                  borderLeft: '3px solid transparent',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor = '#60a5fa';
                    (e.currentTarget as HTMLDivElement).style.background = '#eff4ff';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor = 'transparent';
                    (e.currentTarget as HTMLDivElement).style.background = '#ffffff';
                  }}
                >
                  <CheckCircle size={19} style={{ color: '#60a5fa', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{
                      fontWeight: 700, color: '#0c2461', fontSize: '15px',
                      fontFamily: 'ui-sans-serif, system-ui, sans-serif', margin: '0 0 6px',
                    }}>
                      {item.title}
                    </h4>
                    <p style={{
                      fontSize: '14px', color: '#6b7280',
                      lineHeight: 1.7, fontFamily: 'ui-sans-serif, system-ui, sans-serif', margin: 0,
                    }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why We Stand Out ── */}
      <section style={{ background: '#0a1628', padding: '128px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <span style={{
              fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(96,165,250,0.65)', fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontWeight: 700,
            }}>
              Why BDAI
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700,
              color: '#ffffff', marginTop: '12px', letterSpacing: '-0.02em',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            }}>
              Why We Stand Out
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '4px',
          }}>
            {STAND_OUT.map((item, i) => (
              <div key={i} style={{
                padding: '52px 36px', borderRadius: '16px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'background 0.25s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(96,165,250,0.09)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)'}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(96,165,250,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#60a5fa', marginBottom: '28px',
                }}>
                  {React.createElement(item.icon, { size: 21 })}
                </div>
                <h3 style={{
                  fontSize: '18px', fontWeight: 700, color: '#ffffff',
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif', marginBottom: '14px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '14px', color: 'rgba(255,255,255,0.42)',
                  lineHeight: 1.8, fontFamily: 'ui-sans-serif, system-ui, sans-serif', margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#f5f4f0', padding: '128px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            fontSize: 'clamp(48px, 9vw, 96px)',
            fontWeight: 700, lineHeight: 0.88,
            letterSpacing: '-0.04em', color: '#0c2461',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif', marginBottom: '32px',
          }}>
            BD<span style={{ color: '#60a5fa' }}>AI</span>
          </div>
          <p style={{
            fontSize: '18px', color: '#6b7280',
            lineHeight: 1.75, fontFamily: 'ui-sans-serif, system-ui, sans-serif', marginBottom: '48px',
          }}>
            Discover our work packages, the askBDAI tool, SPARQL interface, and publications.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '16px 36px', borderRadius: '9999px',
              background: '#0c2461', color: '#ffffff',
              border: 'none', cursor: 'pointer',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.07em',
              textTransform: 'uppercase',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            }} onClick={() => router.push('/sparql-tool')}>
              Get Started <ArrowRight size={13} />
            </button>
            <a href="mailto:rudra@cu.ac.bd" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '16px 36px', borderRadius: '9999px',
              background: 'transparent', color: '#0c2461',
              border: '1px solid #0c2461', cursor: 'pointer', textDecoration: 'none',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.07em',
              textTransform: 'uppercase',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            }}>
              Contact Us
            </a>
          </div>
          <p style={{
            marginTop: '48px', fontSize: '12px', color: '#9ca3af',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif', letterSpacing: '0.04em',
          }}>
            rudra@cu.ac.bd &nbsp;·&nbsp; bike-csecu.com &nbsp;·&nbsp; University of Chittagong
          </p>
        </div>
      </section>

    </main>
  );
}
