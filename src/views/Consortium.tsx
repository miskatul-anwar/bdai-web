'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Users, ExternalLink } from 'lucide-react';
import { fetchSiteSettings, fetchPartners, getCachedPartners } from '@/lib/api';
import { PartnersLoading } from '@/components/ui/LoadingAnimation';

export default function Consortium() {
  const [partners, setPartners] = useState<any[]>(() => {
    const cached = getCachedPartners();
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return cached.map((p) => ({
        name: p.name,
        logo: p.logo,
        description: p.description || p.desc || '',
        url: p.website || p.url,
        role: p.role || p.type,
      }));
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(() => !getCachedPartners());

  useEffect(() => {
    let isMounted = true;
    async function loadPartners() {
      try {
        const directPartners = await fetchPartners();
        if (isMounted && directPartners && directPartners.length > 0) {
          setPartners(
            directPartners.map((p) => ({
              name: p.name,
              logo: p.logo,
              description: p.description || p.desc || '',
              url: p.website || p.url,
              role: p.role || p.type,
            }))
          );
          setIsLoading(false);
          return;
        }

        const data = await fetchSiteSettings();
        if (isMounted && data?.partners && data.partners.length > 0) {
          setPartners(
            data.partners.map((p) => ({
              name: p.name,
              logo: p.logo,
              description: p.desc || (p as any).description || '',
              url: p.url || (p as any).website,
              role: p.role || p.type,
            }))
          );
        }
      } catch (err) {
        console.warn('Could not load partners', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPartners();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header Section */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Partners &amp; Consortium</h1>
            <p className="text-sm text-gray-500">Partner institutions &amp; collaborators</p>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && partners.length === 0 && <PartnersLoading />}

        {/* Empty State */}
        {!isLoading && partners.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <p className="text-slate-600 font-medium">No partner organizations currently published.</p>
          </div>
        )}

        {/* Grid Layout: Adjusted for text-heavy cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#0c2461]">
                      {partner.name}
                    </h2>
                    {(partner as any).role && (
                      <p className="text-xs text-gray-400">{(partner as any).role}</p>
                    )}
                  </div>
                </div>

                {(partner as any).url && (partner as any).url !== '#' && (
                  <a
                    href={(partner as any).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-gray-400 hover:text-[#0c2461] hover:bg-slate-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {partner.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
