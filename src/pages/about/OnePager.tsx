import React from 'react';
import { FileText } from 'lucide-react';

export default function OnePager() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">About</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">One Pager</h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Simulated document */}
          <div className="bg-[#0c2461] p-8 text-center text-white">
            <h2 className="text-xl font-bold mb-1">BDAI Project</h2>
            <p className="text-white/60 text-sm">Executive Summary</p>
          </div>
          <div className="p-8 space-y-6">
            {['Overview', 'Objectives', 'Methodology', 'Expected Outcomes'].map((section, i) => (
              <div key={i}>
                <h3 className="font-bold text-[#0c2461] mb-3 text-sm uppercase tracking-wider">{section}</h3>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-100 rounded-full w-full" />
                  <div className="h-3 bg-gray-100 rounded-full w-5/6" />
                  <div className="h-3 bg-gray-100 rounded-full w-4/5" />
                </div>
              </div>
            ))}
          </div>
          <div className="px-8 pb-8">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0c2461] text-white text-sm font-semibold rounded-full hover:bg-[#1a3a8a] transition-colors">
              <FileText className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>
        <p className="text-gray-400 italic text-sm mt-6 text-center">
          — Placeholder content. The project one-pager document will appear here.
        </p>
      </div>
    </main>
  );
}
