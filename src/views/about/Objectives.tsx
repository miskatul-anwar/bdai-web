import React from 'react';
// Link not used anymore; researchers displayed as images
import { Target } from 'lucide-react';

const objectives = [
  { id: 'OB1', title: 'Open Data Quality', images: ['/team/raihan.jpg', '/team/atikishrak.jpg'] },
  { id: 'OB2', title: 'SMART Data Ecosystem', images: ['/team/miskat.jpg'] },
  { id: 'OB3', title: 'KG Construction', images: ['/team/aryan.jpg', '/team/kais.jpg'] },
  { id: 'OB4', title: 'Cross-Sector Analytics', images: ['/team/noor.jpg', '/team/nesarul.jpg'] },
  { id: 'OB5', title: 'KG RAG', images: ['/team/raihan.jpg', '/team/miskat.jpg', '/team/taqi.jpg', '/team/aong.jpg'] },
  { id: 'OB6', title: 'Explainability & Fairness', images: ['/team/aong.jpg', '/team/minhaj.png', '/team/kais.jpg'] },
  { id: 'OB7', title: 'askBDAI', images: ['/team/noor.jpg'] },
  { id: 'OB8', title: 'Capacity Building', images: ['/team/raihan.jpg', '/team/miskat.jpg', '/team/atikishrak.jpg', '/team/aryan.jpg', '/team/kais.jpg', '/team/noor.jpg', '/team/nesarul.jpg', '/team/taqi.jpg', '/team/aong.jpg', '/team/minhaj.png'] },
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
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {obj.images && obj.images.length > 0 ? (
                        <div className="flex items-center">
                          {obj.images.map((src, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              key={i}
                              src={src}
                              alt={`${obj.title} member ${i + 1}`}
                              className={`inline-block w-7 h-7 rounded-full border-2 border-white ${i !== 0 ? '-ml-2' : ''}`}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
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
