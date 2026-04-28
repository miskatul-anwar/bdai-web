import React from 'react';
import { Users } from 'lucide-react';

export default function Team() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Team</h1>
            <p className="text-sm text-gray-500">Research team &amp; members</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="font-bold text-[#0c2461] mb-6">Research Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0c2461]/20 to-[#0c2461]/5 flex items-center justify-center text-[#0c2461]/40">
                  <Users className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 w-full">
                  <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                  <div className="h-2 bg-gray-100 rounded-full w-3/4 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-gray-400 italic text-sm mt-6 text-center">
          — Placeholder content. Team profiles will appear here.
        </p>
      </div>
    </main>
  );
}
