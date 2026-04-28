import React from 'react';
import { Target } from 'lucide-react';

const objectives = [
  { id: 'OB1', title: 'Open Data Quality', researcher: 'Masters-1' },
  { id: 'OB2', title: 'SMART Data Ecosystem', researcher: 'Research Associate-1' },
  { id: 'OB3', title: 'KG Construction', researcher: 'PhD-1 + Research Assistant-1' },
  { id: 'OB4', title: 'Cross-Sector Analytics', researcher: 'PhD-2 + Masters-2' },
  { id: 'OB5', title: 'KG RAG', researcher: 'Masters-3' },
  { id: 'OB6', title: 'Explainability & Fairness', researcher: 'PhD-3 + PostDoc-1' },
  { id: 'OB7', title: 'askBDAI', researcher: 'Masters-4 + Research Assistant-2' },
  { id: 'OB8', title: 'Capacity Building', researcher: 'Research Team' },
];

export default function Objectives() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">About</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Objectives</h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0c2461]/5 border-b border-[#0c2461]/10">
                <tr>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#0c2461]/60">No.</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#0c2461]/60">Objective</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#0c2461]/60">Researcher</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {objectives.map((obj) => (
                  <tr key={obj.id} className="hover:bg-[#0c2461]/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#0c2461]/10 text-[#0c2461] font-black text-xs">
                        {obj.id}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-[#0c2461]">{obj.title}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{obj.researcher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-gray-400 italic text-sm mt-6 text-center">
          — Placeholder content. Detailed objective descriptions will appear here.
        </p>
      </div>
    </main>
  );
}
