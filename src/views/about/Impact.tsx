import React from 'react';
import { TrendingUp, Globe2, GraduationCap, Cpu, Landmark, Sprout, CheckCircle2 } from 'lucide-react';

const impactAreas = [
  {
    Icon: Globe2,
    title: 'Socio-Economic Development',
    gradient: 'linear-gradient(135deg, #0c2461 0%, #1e3799 100%)',
    checkColor: '#1e3799',
    items: [
      "Empowers Bangladesh's agriculture, healthcare, tourism, and education sectors with AI-driven insights.",
      'Supports Sustainable Development Goals (SDGs) 2, 4, 9, 10, and 17 by enabling data-driven decision-making.',
      'Provides transparency and solutions to real-life challenges for the public and government stakeholders.',
    ],
  },
  {
    Icon: GraduationCap,
    title: 'Academic & Research Advancement',
    gradient: 'linear-gradient(135deg, #154360 0%, #1a5276 100%)',
    checkColor: '#1a5276',
    items: [
      'Enhances the quality of educational infrastructure, academic programs, and research capacity across universities.',
      'Reduces disparities among institutions by improving access to digital resources and ICT tools.',
      'Builds capacity through publications, workshops, collaborations, and training programs.',
      'Positions Bangladesh strongly within the global AI research community.',
    ],
  },
  {
    Icon: Cpu,
    title: 'Skills & Workforce Development',
    gradient: 'linear-gradient(135deg, #1a5276 0%, #2471a3 100%)',
    checkColor: '#2471a3',
    items: [
      'Offers students hands-on training in Knowledge Graphs, Large Language Models, and AI.',
      'Equips learners with skills for global AI careers and real-world problem-solving.',
      'Provides researchers access to high-performance computing resources and sector-specific knowledge graphs.',
    ],
  },
  {
    Icon: Landmark,
    title: 'Policy & Governance',
    gradient: 'linear-gradient(135deg, #21618c 0%, #2980b9 100%)',
    checkColor: '#2980b9',
    items: [
      'Enables government agencies to adopt data-driven policy insights.',
      'Promotes openness, transparency, and interoperability in national data ecosystems.',
      'Strengthens collaboration with national and international institutions.',
    ],
  },
  {
    Icon: Sprout,
    title: 'Sustainability & Future Growth',
    gradient: 'linear-gradient(135deg, #2e86c1 0%, #3498db 100%)',
    checkColor: '#3498db',
    items: [
      'Ensures long-term sustainability through internal budgets, grants, and industry collaborations.',
      'Expands project scope to new sectors such as bioinformatics, ocean sciences, and energy.',
      'Establishes initiatives for faculty development, PhD mentorship, and expanded access to data and tools.',
    ],
  },
];

export default function Impact() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">About</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Impact</h1>
          </div>
        </div>

        {/* Impact cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {impactAreas.map(({ Icon, title, gradient, checkColor, items }, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col${
                idx === impactAreas.length - 1 && impactAreas.length % 2 !== 0
                  ? ' md:col-span-2 md:max-w-xl md:mx-auto md:w-full'
                  : ''
              }`}
            >
              {/* Gradient top bar */}
              <div className="h-1.5 w-full" style={{ background: gradient }} />

              <div className="p-6 flex flex-col gap-4 flex-1">
                {/* Icon + title */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ background: gradient }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-bold text-[#0c2461] leading-snug">{title}</h2>
                </div>

                {/* Bullet list */}
                <ul className="space-y-2.5">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: checkColor }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
