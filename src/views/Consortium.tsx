'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Users, ExternalLink } from 'lucide-react';
import { fetchSiteSettings, fetchPartners, getCachedPartners } from '@/lib/api';

const DEFAULT_PARTNERS = [
  {
    name: 'BIKE LAB',
    logo: '/Bike.png',
    description: "BIKE LAB is a research and development lab based at the University of Chittagong, Bangladesh. It focuses on cutting-edge research in computer science and engineering, particularly in areas like machine learning, data science, and software engineering. The lab collaborates with various academic and industry partners to drive innovation and contribute to the global research community."
  },
  {
    name: 'University of Chittagong',
    logo: 'https://cu.ac.bd/wp-content/uploads/2024/03/university-of-chittagong-seeklogo.com-removebg-preview-removebg-preview-1-222x300.png',
    description: "The University of Chittagong (CU), established in 1966, is a prominent public, multi-faculty research university located in Chattogram. Known for having the largest university campus in the country—spanning over 2,000 acres of hilly, scenic landscape—it is a major hub for higher learning. CU offers a wide array of undergraduate and postgraduate programs and has a rich history of contributing significantly to the nation's academic research, culture, and intellectual development."
  },
  {
    name: 'HEAT Bangladesh',
    logo: 'https://heat.ugc.gov.bd/heat-gov-images/logos/logo.svg',
    description: "The Higher Education Acceleration and Transformation (HEAT) project is a strategic initiative implemented by the University Grants Commission (UGC) of Bangladesh, primarily supported by the World Bank. Its core mission is to enhance the overall quality and global relevance of higher education in Bangladesh. The project focuses on improving graduate employability, fostering academic networking, empowering women in higher education, and building institutional resilience to navigate future challenges effectively."
  },
  {
    name: 'Ministry of Education, Bangladesh',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/120px-Government_Seal_of_Bangladesh.svg.png',
    description: "The Ministry of Education (MoE) of Bangladesh is the central government authority responsible for formulating and implementing educational policies, programs, and initiatives across the country. It oversees all levels of education, from primary to higher education, and works to ensure access, equity, and quality in the education system. The MoE collaborates with various stakeholders, including public and private educational institutions, international organizations, and development partners like the World Bank, to drive educational reforms and improve learning outcomes for students nationwide."
  },
  {
    name: 'UGC Bangladesh',
    logo: 'https://heat.ugc.gov.bd/heat-gov-images/logos/right-logo2.svg',
    description: "Established in 1973, the University Grants Commission (UGC) of Bangladesh is the apex regulatory and statutory body for higher education in the country. It is responsible for overseeing and maintaining the academic standards of both public and private universities. The UGC manages the distribution of government funds to public universities, assesses their financial needs, and advises the government on the establishment of new institutions and the formulation of progressive educational policies."
  },
  {
    name: 'World Bank',
    logo: 'https://heat.ugc.gov.bd/heat-gov-images/logos/right-logo3.svg',
    description: "The World Bank is a premier international financial institution that provides loans, grants, and technical assistance to the governments of low- and middle-income countries. Its overarching global mission is to eradicate extreme poverty and promote shared prosperity in a sustainable manner. In countries like Bangladesh, the World Bank is a critical development partner, funding major infrastructure, education, health, and climate resilience projects."
  },
];

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
    async function loadPartners() {
      try {
        const directPartners = await fetchPartners();
        if (directPartners && directPartners.length > 0) {
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
        if (data?.partners && data.partners.length > 0) {
          setPartners(
            data.partners.map((p) => ({
              name: p.name,
              logo: p.logo,
              description: p.desc || (p as any).description || '',
              url: p.url || (p as any).website,
              role: p.role || p.type,
            }))
          );
        } else if (partners.length === 0) {
          setPartners(DEFAULT_PARTNERS);
        }
      } catch {
        if (partners.length === 0) setPartners(DEFAULT_PARTNERS);
      } finally {
        setIsLoading(false);
      }
    }

    loadPartners();
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
        {isLoading && partners.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-200" />
                  <div className="space-y-2">
                    <div className="h-5 w-40 bg-slate-200 rounded" />
                    <div className="h-3 w-24 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-slate-100 rounded" />
                  <div className="h-3 w-5/6 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
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
