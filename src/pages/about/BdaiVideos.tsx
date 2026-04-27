import React from 'react';
import { PlayCircle } from 'lucide-react';

export default function BdaiVideos() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <PlayCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">About</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">BDAI Videos</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-[#0c2461]/10 to-[#0c2461]/5 flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-[#0c2461]/30 group-hover:text-[#0c2461]/60 transition-colors" />
              </div>
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-100 rounded-full w-4/5" />
                <div className="h-3 bg-gray-100 rounded-full w-3/5" />
              </div>
            </div>
          ))}
        </div>
        <p className="text-gray-400 italic text-sm mt-8 text-center">
          — Placeholder content. BDAI project videos will appear here.
        </p>
      </div>
    </main>
  );
}
