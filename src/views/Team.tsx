'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';

const professors = [
  {
    role: 'SPM',
    name: 'Prof. Dr. Rudra Pratap Deb Nath',
    title: 'Professor',
    email: 'rudra@cu.ac.bd',
    image: '/team/rpdn.png',
  },
  {
    role: 'ASPM',
    name: 'Dr. Abu Nowshed Chy',
    title: 'Assistant Professor',
    email: 'nowshed@cu.ac.bd',
    image: '/team/anc.png',
  },
  {
    role: 'Member',
    name: 'Dr. Md. Mahbubul Islam',
    title: 'Associate Professor',
    email: 'mahbubcse@cu.ac.bd',
    image: '/team/mmi.png',
  },
  {
    role: 'Member',
    name: 'Shima Chakraborty',
    title: 'Assistant Professor',
    email: 'shimacse@cu.ac.bd',
    image: '/team/sc.png',
  },
];

const students = [
  {
    id: 'raihan',
    role: 'Masters',
    name: 'Md Raihan Kabir Rifat',
    email: 'raihankabir@std.cu.ac.bd',
    affiliation: 'Student, CSE, CU',
    image: '/team/raihan.jpg',
  },
  {
    id: 'miskatul',
    role: 'Research Associate',
    name: 'Miskatul Anwar',
    email: 'miskat@std.cu.ac.bd',
    affiliation: 'Student, CSE, CU',
    image: '/team/miskat.jpg',
  },
  {
    id: 'atik',
    role: 'Research Assistant',
    name: 'Atik Ishrak',
    email: 'atikishrak66@gmail.com',
    affiliation: 'Student, CSE, CU',
    image: '/team/atikishrak.jpg',
  },
];

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
    <div className="w-32 h-32 rounded-full overflow-hidden">
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
  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">Team</h1>
            <p className="text-sm text-gray-500">Research team &amp; members</p>
          </div>
        </div>

        {/* Faculty / Supervisor section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="font-bold text-[#0c2461] mb-6 text-lg">Faculty Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {professors.map((p) => (
              <div key={p.email} className="flex flex-col items-center text-center gap-3">
                <MemberAvatar src={p.image} name={p.name} />
                <div>
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest text-white bg-[#0c2461] rounded px-2 py-0.5 mb-1">
                    {p.role}
                  </span>
                  <p className="font-semibold text-[#0c2461] text-sm leading-snug">{p.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{p.title}</p>
                  <a
                    href={`mailto:${p.email}`}
                    className="text-xs text-[#0c2461]/70 hover:text-[#0c2461] hover:underline break-all"
                  >
                    {p.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student / Researcher section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="font-bold text-[#0c2461] mb-6 text-lg">Student Researchers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {students.map((s) => (
              <div key={s.id} id={s.id} className="flex flex-col items-center text-center gap-3">
                <MemberAvatar src={s.image} name={s.name} />
                <div>
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest text-white bg-[#0c2461]/80 rounded px-2 py-0.5 mb-1">
                    {s.role}
                  </span>
                  <p className="font-semibold text-[#0c2461] text-sm leading-snug">{s.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.affiliation}</p>
                  <a
                    href={`mailto:${s.email}`}
                    className="text-xs text-[#0c2461]/70 hover:text-[#0c2461] hover:underline break-all"
                  >
                    {s.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
