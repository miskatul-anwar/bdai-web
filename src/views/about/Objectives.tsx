import React from 'react';
// Link not used anymore; researchers displayed as images
import { Target } from 'lucide-react';

const RAIHAN_IMAGE = '/team/raihan.jpg';
const ATIKISHRAK_IMAGE = '/team/atikishrak.jpg';
const MISKAT_IMAGE = '/team/miskat.jpg';
const ARYAN_IMAGE = '/team/aryan.jpg';
const KAIS_IMAGE = '/team/kais.jpg';
const NOOR_IMAGE = '/team/noor.jpg';
const NESARUL_IMAGE = '/team/nesarul.jpg';
const TAQI_IMAGE = '/team/taqi.jpg';
const AONG_IMAGE = '/team/aong.jpg';
const MINHAJ_IMAGE = '/team/minhaj.png';
const KAUSIK_ISHIK_IMAGE = '/team/kausik.jpeg';
const RPDN_IMAGE = '/team/rpdn.png';
const ANC_IMAGE = '/team/anc.png';
const MMI_IMAGE = '/team/mmi.png';
const SC_IMAGE = '/team/sc.png';

const objectives = [
  { id: 'OB1', title: 'Open Data Quality', images: [RPDN_IMAGE, ANC_IMAGE, MMI_IMAGE, SC_IMAGE, ATIKISHRAK_IMAGE, RAIHAN_IMAGE, MISKAT_IMAGE] },
  { id: 'OB2', title: 'SMART Data Ecosystem', images: [RPDN_IMAGE, ARYAN_IMAGE, MISKAT_IMAGE] },
  { id: 'OB3', title: 'KG Construction', images: [RPDN_IMAGE, ANC_IMAGE, MMI_IMAGE, KAUSIK_ISHIK_IMAGE, ARYAN_IMAGE, KAIS_IMAGE, MINHAJ_IMAGE] },
  { id: 'OB4', title: 'Cross-Sector Analytics', images: [RPDN_IMAGE, NESARUL_IMAGE, NOOR_IMAGE, KAIS_IMAGE] },
  { id: 'OB5', title: 'KG RAG', images: [RPDN_IMAGE, ANC_IMAGE, RAIHAN_IMAGE, MISKAT_IMAGE, TAQI_IMAGE, AONG_IMAGE] },
  { id: 'OB6', title: 'Explainability & Fairness', images: [RPDN_IMAGE, ANC_IMAGE, AONG_IMAGE, MINHAJ_IMAGE, KAIS_IMAGE, TAQI_IMAGE] },
  { id: 'OB7', title: 'askBDAI', images: [RPDN_IMAGE, ANC_IMAGE, SC_IMAGE, NESARUL_IMAGE, NOOR_IMAGE, KAIS_IMAGE] },
  { id: 'OB8', title: 'Capacity Building', images: [RPDN_IMAGE, ANC_IMAGE, SC_IMAGE, NESARUL_IMAGE, ATIKISHRAK_IMAGE, RAIHAN_IMAGE, MISKAT_IMAGE, ARYAN_IMAGE, KAIS_IMAGE, NOOR_IMAGE, NESARUL_IMAGE, TAQI_IMAGE, AONG_IMAGE, MINHAJ_IMAGE] },
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
      </div>
    </main>
  );
}
