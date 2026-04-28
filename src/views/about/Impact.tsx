import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function Impact() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">About</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Impact</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {['Agriculture', 'Healthcare', 'Education', 'Socio-economics'].map((sector, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0c2461] mb-3">{sector}</h3>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded-full w-full" />
                <div className="h-3 bg-gray-100 rounded-full w-4/5" />
                <div className="h-3 bg-gray-100 rounded-full w-3/5" />
              </div>
            </div>
          ))}
        </div>
        <p className="text-gray-400 italic text-sm text-center">
          — Placeholder content. Impact metrics and outcomes will appear here.
        </p>
      </div>
    </main>
  );
}
