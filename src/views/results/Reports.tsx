'use client';

import React, { useEffect, useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { fetchSiteSettings } from '@/lib/api';

interface ReportItem {
  id?: string;
  title: string;
  wp?: string;
  type?: string;
  date?: string;
  size?: string;
  download_url?: string;
}

const DEFAULT_REPORTS: ReportItem[] = [
  { id: 'rep-1', title: 'Inception Report & Work Plan 2024-2025', wp: 'General', type: 'Annual Report', date: '2024', size: '2.8 MB', download_url: '#' },
  { id: 'rep-2', title: 'Sectoral Data Collection Framework (WP2)', wp: 'WP2', type: 'Deliverable', date: '2024', size: '1.9 MB', download_url: '#' },
  { id: 'rep-3', title: 'Federated Knowledge Graph Specification (WP3)', wp: 'WP3', type: 'Technical Deliverable', date: '2025', size: '3.4 MB', download_url: '#' },
  { id: 'rep-4', title: 'Quarterly Progress Review Q1 2025', wp: 'General', type: 'Mid-term Review', date: '2025', size: '1.2 MB', download_url: '#' },
];

export default function Reports() {
  const [reports, setReports] = useState<ReportItem[]>(DEFAULT_REPORTS);

  useEffect(() => {
    fetchSiteSettings().then((data) => {
      if (data?.reports && data.reports.length > 0) {
        setReports(data.reports as ReportItem[]);
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0c2461]/60">Results</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Reports &amp; Deliverables</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reports.map((report, i) => (
            <div key={report.id || i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0c2461]/10 flex items-center justify-center text-[#0c2461] flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {report.wp && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {report.wp}
                      </span>
                    )}
                    {report.date && (
                      <span className="text-[11px] text-gray-400">{report.date}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-[#0c2461] text-sm mb-1">{report.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {report.type && <span>{report.type}</span>}
                    {report.size && <span>• {report.size}</span>}
                  </div>
                </div>
                {report.download_url && report.download_url !== '#' && (
                  <a
                    href={report.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-[#0c2461]/10 hover:text-[#0c2461] transition-colors"
                    title="Download Report"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
