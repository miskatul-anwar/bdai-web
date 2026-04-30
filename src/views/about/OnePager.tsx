import React from 'react';
import { FileText } from 'lucide-react';

export default function OnePager() {
  const imageUrl = '/Picture1.png';

  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">About</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Project at a Glance</h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gray-50 p-4 md:p-6 flex items-center justify-center">
            <img
              src={imageUrl}
              alt="Project at a Glance"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl border border-gray-100"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
