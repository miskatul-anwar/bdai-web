import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function Reports() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">Results</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Reports</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {['Annual Report 2024', 'Mid-term Review', 'Technical Deliverable D1.1', 'Technical Deliverable D2.1', 'Workshop Proceedings', 'Policy Brief'].map((report, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0c2461]/10 flex items-center justify-center text-[#0c2461] flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0c2461] text-sm mb-1">{report}</h3>
                  <div className="h-2.5 bg-gray-100 rounded-full w-3/4 mb-1" />
                  <div className="h-2.5 bg-gray-100 rounded-full w-1/2" />
                </div>
                <button className="flex-shrink-0 p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-[#0c2461]/10 hover:text-[#0c2461] transition-colors opacity-0 group-hover:opacity-100">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-gray-400 italic text-sm mt-8 text-center">
          — Placeholder content. Project reports and deliverables will appear here.
        </p>
      </div>
    </main>
  );
}
