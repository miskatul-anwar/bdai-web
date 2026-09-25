'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';
import { fetchTeam, getCachedTeam, BackendTeamMember } from '@/lib/api';

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

const initialTeam: PublicTeamMember[] = [
  // SPM Team
  {
    role: 'SPM',
    designation: 'SPM & Professor',
    category: 'SPM Team',
    name: 'Prof. Dr. Rudra Pratap Deb Nath',
    institution: 'Department of Computer Science and Engineering, University of Chittagong',
    email: 'rudra@cu.ac.bd',
    image: '/team/rpdn.png',
  },
  {
    role: 'ASPM',
    designation: 'ASPM & Associate Professor',
    category: 'SPM Team',
    name: 'Dr. Abu Nowshed Chy',
    institution: 'Department of Computer Science and Engineering, University of Chittagong',
    email: 'nowshed@cu.ac.bd',
    image: '/team/anc.png',
  },
  {
    role: 'Member',
    designation: 'Associate Professor',
    category: 'SPM Team',
    name: 'Dr. Md. Mahbubul Islam',
    institution: 'Department of Computer Science and Engineering, University of Chittagong',
    email: 'mahbubcse@cu.ac.bd',
    image: '/team/mmi.png',
  },
  {
    role: 'Member',
    designation: 'Assistant Professor',
    category: 'SPM Team',
    name: 'Shima Chakraborty',
    institution: 'Department of Computer Science and Engineering, University of Chittagong',
    email: 'shimacse@cu.ac.bd',
    image: '/team/sc.png',
  },

  // Student Researchers
  {
    id: 'sayed',
    role: 'PhD Fellow',
    designation: 'PhD Fellow',
    category: 'Student Researchers',
    name: 'Sayed Hossain',
    email: 'sayed.fellow@cu.ac.bd',
    institution: 'Department of Computer Science and Engineering, University of Chittagong',
    image: '/team/sayed.jpg',
  },
  {
    id: 'nesarul',
    role: 'PhD Fellow',
    designation: 'PhD Fellow',
    category: 'Student Researchers',
    name: 'Md. Nesarul Haque',
    email: 'nesarul@std.cu.ac.bd',
    institution: 'Student, CSE, CU',
    image: '/team/nesarul.jpg',
  },
  {
    id: 'noortaz',
    role: 'PhD Fellow',
    designation: 'PhD Fellow',
    category: 'Student Researchers',
    name: 'Noortaz Rezwana',
    email: 'noortaz@std.cu.ac.bd',
    institution: 'Student, CSE, CU',
    image: '/team/noor.jpg',
  },
  {
    id: 'atik',
    role: 'Research Assistant',
    designation: 'Research Assistant',
    category: 'Student Researchers',
    name: 'Atik Ishrak',
    email: 'atikishrak66@gmail.com',
    institution: 'Student, CSE, CU',
    image: '/team/atikishrak.jpg',
  },
  {
    id: 'kais',
    role: 'Research Assistant',
    designation: 'Research Assistant',
    category: 'Student Researchers',
    name: 'Md. Kais',
    email: 'mdkais3@gmail.com',
    institution: 'Student, CSE, CU',
    image: '/team/kais.jpg',
  },
  {
    id: 'raihan',
    role: 'Masters Fellow',
    designation: 'Masters Fellow',
    category: 'Student Researchers',
    name: 'Md Raihan Kabir Rifat',
    email: 'raihankabir@std.cu.ac.bd',
    institution: 'Student, CSE, CU',
    image: '/team/raihan.jpg',
  },

  // Data Annotators
  {
    id: 'minhaj',
    role: 'Data Annotator',
    designation: 'Data Annotator',
    category: 'Data Annotators',
    name: 'Minhajul Islam',
    email: 'minhaj@std.cu.ac.bd',
    institution: 'Student, CSE, CU',
    image: '/team/minhaj.png',
  },
  {
    id: 'arafat',
    role: 'Data Annotator',
    designation: 'Data Annotator',
    category: 'Data Annotators',
    name: 'Arafat Sheikh',
    email: 'arafat.csecu@gmail.com',
    institution: 'Student, CSE, CU',
    image: '/team/arafat.png',
  },
  {
    id: 'aong',
    role: 'Data Annotator',
    designation: 'Data Annotator',
    category: 'Data Annotators',
    name: 'Aong Cho Thing Marma',
    email: 'aongcho880@gmail.com',
    institution: 'Student, CSE, CU',
    image: '/team/aong.jpg',
  },
  {
    id: 'taqi',
    role: 'Data Annotator',
    designation: 'Data Annotator',
    category: 'Data Annotators',
    name: 'Taqi Ismail',
    email: 'taqiismail10@gmail.com',
    institution: 'Student, CSE, CU',
    image: '/team/taqi.jpg',
  },
  {
    id: 'tihan',
    role: 'Data Annotator',
    designation: 'Data Annotator',
    category: 'Data Annotators',
    name: 'Md Sadman Sami Khan',
    email: 'samisadman6@gmail.com',
    institution: 'Student, CSE, CU',
    image: '/team/tihan.jpg',
  },
  {
    id: 'aryan',
    role: 'Data Annotator',
    designation: 'Data Annotator',
    category: 'Data Annotators',
    name: 'Aryan Bin Ashraf',
    email: 'aryanashraf.csecu@gmail.com',
    institution: 'Student, CSE, CU',
    image: '/team/aryan.jpg',
  },
  {
    id: 'miskatul',
    role: 'Data Annotator & Developer',
    designation: 'Data Annotator',
    category: 'Data Annotators',
    name: 'Miskatul Anwar',
    email: 'miskat@std.cu.ac.bd',
    institution: 'Student, CSE, CU',
    image: '/team/miskat.jpg',
  },
  {
    id: 'sadia',
    role: 'Data Annotator & Analyst',
    designation: 'Data Annotator & Analyst',
    category: 'Data Annotators',
    name: 'Sadia Afrin',
    email: 'sadia.annotator@cu.ac.bd',
    institution: 'Department of Computer Science and Engineering, University of Chittagong',
    image: '/team/sadia.jpg',
  },

  // Administrative Staff
  {
    id: 'kausik',
    role: 'Office Manager',
    designation: 'Office Manager',
    category: 'Administrative Staff',
    name: 'Kausik Das',
    email: 'cukaushikdas@gmail.com',
    institution: 'Student, EEE, CU',
    image: '/team/kausik.jpeg',
  },
  {
    id: 'sykot',
    role: 'Accountant',
    designation: 'Accountant',
    category: 'Administrative Staff',
    name: 'Sykot Deb',
    email: 'soikotjps1998@gmail.com',
    institution: 'University of Chittagong',
    image: '/team/sykot.png',
  },
  {
    id: 'robiul',
    role: 'Office Assistant',
    designation: 'Office Assistant',
    category: 'Administrative Staff',
    name: 'Mohammad Robiul Hossen',
    email: 'm.robiul1212@gmail.com',
    institution: 'University of Chittagong',
    image: '/team/robiul.png',
  },
];

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
    fetchTeam().then((data) => {
      if (data && data.length > 0) {
        setTeamMembers(mapBackendTeam(data));
      } else if (teamMembers.length === 0) {
        setTeamMembers(initialTeam);
      }
      setIsLoading(false);
    }).catch(() => {
      if (teamMembers.length === 0) setTeamMembers(initialTeam);
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

        {/* Loading Skeleton */}
        {isLoading && teamMembers.length === 0 && (
          <div className="space-y-8 animate-pulse">
            {[1, 2].map((s) => (
              <div key={s} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="h-6 w-36 bg-slate-200 rounded mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                      <div className="w-32 h-32 rounded-full bg-slate-200" />
                      <div className="h-4 w-20 bg-slate-200 rounded" />
                      <div className="h-4 w-32 bg-slate-200 rounded" />
                      <div className="h-3 w-24 bg-slate-100 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
