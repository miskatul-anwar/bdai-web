import React from 'react';
import { Package } from 'lucide-react';

interface WPPageProps {
  number: number;
  title: string;
  description: string;
  tasks: string[];
}

function WPPage({ number, title, description, tasks }: WPPageProps) {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">Work Packages</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">WP{number}: {title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-[#0c2461] mb-4">Overview</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{description}</p>
            <div className="space-y-2">
              <div className="h-3 bg-gray-100 rounded-full w-full" />
              <div className="h-3 bg-gray-100 rounded-full w-5/6" />
              <div className="h-3 bg-gray-100 rounded-full w-4/5" />
            </div>
          </div>
          <div className="bg-[#0c2461] rounded-2xl p-6 text-white">
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider opacity-70">Status</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs opacity-60 mb-1">Progress</p>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#60a5fa] rounded-full w-0" />
                </div>
              </div>
              <div className="pt-2">
                <p className="text-xs opacity-60 mb-1">Timeline</p>
                <p className="text-sm font-semibold">— Placeholder</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-[#0c2461] mb-4">Key Tasks</h2>
          <div className="space-y-3">
            {tasks.map((task, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#0c2461]/10 text-[#0c2461] font-bold text-xs flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed">{task}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-gray-400 italic text-sm mt-6 text-center">
          — Placeholder content. Detailed WP{number} information will appear here.
        </p>
      </div>
    </main>
  );
}

export function WP1() {
  return (
    <WPPage
      number={1}
      title="Data Collection & Quality"
      description="Placeholder — This work package focuses on open data quality measurement frameworks and SMART data ecosystems tailored to Bangladesh."
      tasks={[
        'Placeholder task: Define data quality metrics for open datasets.',
        'Placeholder task: Build SMART data ecosystem infrastructure.',
        'Placeholder task: Integrate multi-sector data sources.',
        'Placeholder task: Validate quality framework outputs.',
      ]}
    />
  );
}

export function WP2() {
  return (
    <WPPage
      number={2}
      title="Knowledge Graph Construction"
      description="Placeholder — This work package covers construction and optimization of sectoral Knowledge Graphs for Agriculture, Healthcare, Education, Tourism, and Socio-economics."
      tasks={[
        'Placeholder task: Design ontologies for each sector.',
        'Placeholder task: Populate KGs from curated datasets.',
        'Placeholder task: Enable cross-sector intra/inter analytics.',
        'Placeholder task: Benchmark KG performance metrics.',
      ]}
    />
  );
}

export function WP3() {
  return (
    <WPPage
      number={3}
      title="AI Tools & Explainability"
      description="Placeholder — This work package develops KG-RAG pipelines, explainability frameworks, and the askBDAI Q&A system."
      tasks={[
        'Placeholder task: Implement KG Retrieval Augmented Generation.',
        'Placeholder task: Ensure LLM explainability and fairness via KGs.',
        'Placeholder task: Build the askBDAI conversational interface.',
        'Placeholder task: Evaluate bias and validity of AI outputs.',
      ]}
    />
  );
}
