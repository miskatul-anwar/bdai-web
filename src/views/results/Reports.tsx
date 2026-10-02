'use client';

import React, { useEffect, useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { fetchSiteSettings, getCachedData, SiteSettings } from '@/lib/api';
import { ReportsLoading } from '@/components/ui/LoadingAnimation';

interface ReportItem {
  id?: string;
  title: string;
  wp?: string;
  type?: string;
  date?: string;
  size?: string;
  download_url?: string;
}

export default function Reports() {
  const [reports, setReports] = useState<ReportItem[]>(() => {
    const cached = getCachedData<SiteSettings>('/settings')?.reports;
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return cached as ReportItem[];
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(() => {
    const cached = getCachedData<SiteSettings>('/settings')?.reports;
    return !(cached && Array.isArray(cached) && cached.length > 0);
  });

  useEffect(() => {
    let isMounted = true;
    fetchSiteSettings().then((data) => {
      if (isMounted) {
        if (data?.reports && Array.isArray(data.reports)) {
          setReports(data.reports as ReportItem[]);
        }
        setIsLoading(false);
      }
    }).catch(() => {
      if (isMounted) setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
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

        {/* Loading Skeleton */}
        {isLoading && reports.length === 0 && <ReportsLoading />}

        {/* Empty State */}
        {!isLoading && reports.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <p className="text-slate-600 font-medium">No reports currently published.</p>
          </div>
        )}

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
