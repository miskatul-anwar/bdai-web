import React from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';

const partners = [
  {
    name: 'HEAT Bangladesh',
    logo: 'https://heat.ugc.gov.bd/heat-gov-images/logos/logo.svg',
  },
  {
    name: 'Bangladesh Govt.',
    logo: 'https://bangladesh.gov.bd/site-assets/images/logo.png',
  },
  {
    name: 'UGC Bangladesh',
    logo: 'https://heat.ugc.gov.bd/heat-gov-images/logos/right-logo2.svg',
  },
  {
    name: 'World Bank',
    logo: 'https://heat.ugc.gov.bd/heat-gov-images/logos/right-logo3.svg',
  },
  {
    name: 'University of Chittagong',
    logo: 'https://cu.ac.bd/wp-content/uploads/2024/03/university-of-chittagong-seeklogo.com-removebg-preview-removebg-preview-1-222x300.png',
  },
];

export default function Consortium() {
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Consortium</h1>
            <p className="text-sm text-gray-500">Partner institutions &amp; collaborators</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center gap-4"
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <p className="text-sm font-semibold text-[#0c2461] text-center leading-tight">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
