'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';
import { fetchTeam, getCachedTeam, BackendTeamMember } from '@/lib/api';
import { TeamGridLoading } from '@/components/ui/LoadingAnimation';

export interface PublicTeamMember {
  id?: string;
  name: string;
  designation?: string;
  role?: string;
  category: string;
  institution?: string;
  affiliation?: string;
  email?: string;
  image: string;
}

function mapBackendTeam(data: any[]): PublicTeamMember[] {
  return data.map((m) => {
    let cat = (m.category || '').trim();
    if (cat.toLowerCase() === 'lead' || cat.toLowerCase() === 'co-lead') {
      cat = 'SPM Team';
    } else if (cat.toLowerCase() === 'research-assistant' || cat.toLowerCase() === 'researcher') {
      const des = (m.designation || '').toLowerCase();
      const r = (m.role || '').toLowerCase();
      if (des.includes('annotat') || r.includes('annotat')) {
        cat = 'Data Annotators';
      } else {
        cat = 'Student Researchers';
      }
    } else if (cat.toLowerCase() === 'staff') {
      cat = 'Administrative Staff';
    } else if (!cat) {
      const des = (m.designation || '').toLowerCase();
      const r = (m.role || '').toLowerCase();
      if (des.includes('spm') || des.includes('professor') || r.includes('spm')) {
        cat = 'SPM Team';
      } else if (des.includes('annotat') || r.includes('annotat')) {
        cat = 'Data Annotators';
      } else if (des.includes('manager') || des.includes('accountant') || des.includes('office')) {
        cat = 'Administrative Staff';
      } else {
        cat = 'Student Researchers';
      }
    }

    return {
      id: m.id,
      name: m.name,
      designation: m.designation,
      role: m.role || m.designation,
      category: cat,
      institution: m.institution || 'Department of CSE, University of Chittagong',
      email: m.email || '',
      image: m.image || '/team/miskat.jpg',
    };
  });
}

function MemberAvatar({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0c2461]/20 to-[#0c2461]/5 flex items-center justify-center text-[#0c2461]/40">
        <Users className="w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm relative bg-slate-100">
      <Image
        src={src}
        alt={name}
        width={128}
        height={128}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<PublicTeamMember[]>(() => {
    const cached = getCachedTeam();
    if (cached && cached.length > 0) {
      return mapBackendTeam(cached);
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(() => !getCachedTeam());

  useEffect(() => {
    fetchTeam()
      .then((data) => {
        if (data && data.length > 0) {
          setTeamMembers(mapBackendTeam(data));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Standard category priority ordering
  const standardCategoryOrder = [
    'SPM Team',
    'Student Researchers',
    'Data Annotators',
    'Administrative Staff',
  ];

  // Extract all categories currently present
  const presentCategories = Array.from(
    new Set(teamMembers.map((m) => (m.category || 'General').trim()))
  );

  // Sort: Standard categories first in priority order, followed by any custom categories alphabetically
  const orderedCategories = [
    ...standardCategoryOrder.filter((cat) =>
      presentCategories.some((c) => c.toLowerCase() === cat.toLowerCase())
    ),
    ...presentCategories
      .filter(
        (cat) =>
          !standardCategoryOrder.some((sc) => sc.toLowerCase() === cat.toLowerCase())
      )
      .sort(),
  ];

  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Team</h1>
              <p className="text-sm text-gray-500">
                {orderedCategories.length > 0 ? orderedCategories.join(' • ') : 'Research & Development Team'}
              </p>
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        {isLoading && teamMembers.length === 0 && <TeamGridLoading />}

        {/* Empty State */}
        {!isLoading && teamMembers.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#0c2461] text-base mb-1">No Team Members Listed</h3>
            <p className="text-sm text-gray-500">Personnel listings are updated dynamically via the portal backend.</p>
          </div>
        )}

        {/* Dynamic Category Placement Sections */}
        {orderedCategories.map((category) => {
          const members = teamMembers.filter(
            (m) =>
              (m.category || 'General').trim().toLowerCase() === category.toLowerCase()
          );

          if (members.length === 0) return null;

          return (
            <div
              key={category}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8"
            >
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
                <h2 className="font-bold text-[#0c2461] text-lg">{category}</h2>
                <span className="text-xs text-gray-400 font-medium">
                  {members.length} {members.length === 1 ? 'Member' : 'Members'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {members.map((m) => (
                  <div
                    key={m.id || m.email || m.name}
                    id={m.id}
                    className="flex flex-col items-center text-center gap-3 group"
                  >
                    <MemberAvatar src={m.image} name={m.name} />
                    <div>
                      {/* Designation Badge: Category + Designation = Placement */}
                      <span className="inline-block text-[10px] font-black uppercase tracking-widest text-white bg-[#0c2461] rounded px-2.5 py-0.5 mb-1.5 shadow-xs">
                        {m.designation || m.role || 'Member'}
                      </span>
                      <p className="font-semibold text-[#0c2461] text-sm leading-snug">
                        {m.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {m.institution || m.affiliation}
                      </p>
                      {m.email ? (
                        <a
                          href={`mailto:${m.email}`}
                          className="text-xs text-[#0c2461]/70 hover:text-[#0c2461] hover:underline break-all block mt-0.5"
                        >
                          {m.email}
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
