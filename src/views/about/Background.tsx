import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Background() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">About</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Background</h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5 text-gray-700 leading-relaxed">
          <p>
            Bangladesh Data for AI (BDAI) is an ambitious initiative led by the Department of Computer Science and
            Engineering at the University of Chittagong. The project harnesses{' '}
            <strong className="text-[#0c2461]">Knowledge Graphs</strong> and{' '}
            <strong className="text-[#0c2461]">Large Language Models (LLMs)</strong> to create AI-powered tools that
            deliver actionable insights across key sectors such as{' '}
            <strong className="text-[#0c2461]">agriculture, healthcare, education, tourism, and socio-economics</strong>.
          </p>

          <p>
            By building the country&apos;s first{' '}
            <strong className="text-[#0c2461]">open data quality framework</strong> and a{' '}
            <strong className="text-[#0c2461]">SMART data ecosystem</strong> (Sustainable, Meaningful, Accessible,
            Reusable, Traceable), BDAI aims to revolutionize data management and support Bangladesh&apos;s vision of a{' '}
            <strong className="text-[#0c2461]">knowledge-driven digital nation</strong>.
          </p>

          <p>
            The project directly contributes to several{' '}
            <strong className="text-[#0c2461]">Sustainable Development Goals (SDGs 2, 4, 9, 10, and 17)</strong> by
            promoting transparency, enabling data-driven policymaking, and equipping students, researchers, and
            institutions with advanced AI capabilities.
          </p>

          <p>
            Ultimately, BDAI seeks to position Bangladesh as a strong player in the global AI research community while
            addressing pressing national challenges with innovative, AI-powered solutions.
          </p>
        </div>
      </div>
    </main>
  );
}
