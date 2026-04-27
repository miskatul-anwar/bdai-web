import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

export default function Publications() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">Results</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Publications</h1>
          </div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2.5 py-0.5 bg-[#0c2461]/10 text-[#0c2461] text-[10px] font-bold rounded-full uppercase tracking-wider">
                      Journal {i + 1}
                    </span>
                    <span className="text-xs text-gray-400">202{4 + (i % 2)}</span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full w-4/5" />
                  <div className="h-3 bg-gray-100 rounded-full w-3/5" />
                  <div className="h-3 bg-gray-100 rounded-full w-full" />
                </div>
                <button className="flex-shrink-0 p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-[#0c2461]/10 hover:text-[#0c2461] transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-gray-400 italic text-sm mt-8 text-center">
          — Placeholder content. Research publications will appear here.
        </p>
      </div>
    </main>
  );
}
