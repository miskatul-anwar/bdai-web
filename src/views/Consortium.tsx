import React from 'react';
import { Users, Globe } from 'lucide-react';

const partners = [
  { name: 'University of Chittagong', country: 'Bangladesh', role: 'Lead Institution' },
  { name: 'Bangladesh Govt', country: 'Bangladesh', role: 'International Partner' },
  { name: 'World Bank', country: 'Bangladesh', role: 'International Partner' },
  { name: 'UGC Bangladesh', country: 'Bangladesh', role: 'International Partner' },
  { name: 'HEAT Bangladesh', country: 'Bangladesh', role: 'Funding Partner' },
];

export default function Consortium() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Consortium</h1>
            <p className="text-sm text-gray-500">Partner institutions &amp; collaborators</p>
          </div>
        </div>

        {/* Partner cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {partners.map((partner, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#0c2461]/10 flex items-center justify-center text-[#0c2461] mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#0c2461] mb-1">{partner.name}</h3>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">{partner.country}</p>
              <span className="inline-block px-3 py-1 bg-[#0c2461]/10 text-[#0c2461] text-xs font-semibold rounded-full">
                {partner.role}
              </span>
            </div>
          ))}
        </div>

        <p className="text-gray-400 italic text-sm mt-6 text-center">
          — Placeholder content. Consortium details will appear here.
        </p>
      </div>
    </main>
  );
}
