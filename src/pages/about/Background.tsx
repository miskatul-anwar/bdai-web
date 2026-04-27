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

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
          <div className="h-4 bg-gray-100 rounded-full w-3/4" />
          <div className="h-4 bg-gray-100 rounded-full w-full" />
          <div className="h-4 bg-gray-100 rounded-full w-5/6" />
          <div className="h-4 bg-gray-100 rounded-full w-2/3" />
          <div className="h-4 bg-gray-100 rounded-full w-full" />
          <p className="text-gray-400 italic text-sm pt-4">
            — Placeholder content. Background information about the BDAI project will appear here.
          </p>
        </div>
      </div>
    </main>
  );
}
