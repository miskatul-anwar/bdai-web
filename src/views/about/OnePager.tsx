import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function OnePager() {
  const pdfUrl = '/BDAI_Project_Overview.pdf';

  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">About</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">One Pager</h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="aspect-video md:aspect-auto md:h-[600px] bg-gray-50 flex items-center justify-center">
            <iframe
              src={pdfUrl}
              className="w-full h-full rounded-2xl"
              title="BDAI Project Overview"
            />
          </div>
          <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-between">
            <p className="text-gray-600 text-sm">BDAI Project Overview Document</p>
            <a
              href={pdfUrl}
              download="BDAI_Project_Overview.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0c2461] text-white text-sm font-semibold rounded-full hover:bg-[#1a3a8a] transition-colors"
            >
              <Download className="w-4 h-4" /> Download PDF
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
