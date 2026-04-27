import React from 'react';
import { ArrowRight, Brain, Database, Globe, Network } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#ecf0f1]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center bg-gradient-to-br from-[#0c2461] to-[#1a3a8a]">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest border border-white/20">
            Bangladesh AI Initiative
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            BD<span className="text-[#60a5fa]">AI</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Leveraging Bangladesh Sectoral Knowledge Graphs and Large Language Models
            for Artificial Intelligence-Driven Insights.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0c2461] font-semibold rounded-full hover:bg-[#ecf0f1] transition-colors shadow-lg">
              Explore Research <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '5+', label: 'Sectors Covered' },
            { value: '10+', label: 'Researchers' },
            { value: '5', label: 'AI Tools' },
            { value: '2025+', label: 'Vision' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-bold text-[#0c2461]">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0c2461]">Research Pillars</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Placeholder — The core pillars of our AI-driven research programme in Bangladesh.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Network, title: 'SMART Data Ecosystems', desc: 'Placeholder description for SMART data ecosystems.' },
              { icon: Database, title: 'Cross-Sectoral KGs', desc: 'Placeholder description for Knowledge Graphs.' },
              { icon: Brain, title: 'KG-VLLM Validation', desc: 'Placeholder description for LLM validation.' },
              { icon: Globe, title: 'Intelligent Interfaces', desc: 'Placeholder description for AI interfaces.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#0c2461]/10 flex items-center justify-center text-[#0c2461] mb-4 group-hover:bg-[#0c2461] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0c2461] mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#0c2461] text-white text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Explore?</h2>
          <p className="text-white/70">
            Placeholder — Discover our work packages, publications, and the SPARQL tool.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#0c2461] font-semibold rounded-full hover:bg-[#ecf0f1] transition-colors shadow-lg">
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </main>
  );
}
