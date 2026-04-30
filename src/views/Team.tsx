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

const studentResearchers = [
  {
    id: 'nesarul',
    role: 'PhD Fellow',
    name: 'Md. Nesarul Haque',
    email: '',
    affiliation: 'Student, CSE, CU',
    image: '/team/nesarul.jpg',
  },
  {
    id: 'noortaz',
    role: 'PhD Fellow',
    name: 'Noortaz Rezwana',
    email: '',
    affiliation: 'Student, CSE, CU',
    image: '/team/noor.jpg',
  },
  {
    id: 'atik',
    role: 'Research Assistant',
    name: 'Atik Ishrak',
    email: 'atikishrak66@gmail.com',
    affiliation: 'Student, CSE, CU',
    image: '/team/atikishrak.jpg',
  },
  {
    id: 'raihan',
    role: 'Masters Fellow',
    name: 'Md Raihan Kabir Rifat',
    email: 'raihankabir@std.cu.ac.bd',
    affiliation: 'Student, CSE, CU',
    image: '/team/raihan.jpg',
  },
];

const dataAnnotators = [
  {
    id: 'kais',
    role: 'Data Annotator',
    name: 'Md. Kais',
    email: 'mdkais3@gmail.com',
    affiliation: 'Student, CSE, CU',
    image: '/team/kais.jpg',
  },
  {
    id: 'minhaj',
    role: 'Data Annotator',
    name: 'Md. Minhajul Islam',
    email: 'minhaj@std.cu.ac.bd',
    affiliation: 'Student, CSE, CU',
    image: '/team/minhaj.png',
  },
  {
    id: 'aong',
    role: 'Data Annotator',
    name: 'Aong Cho Thing Marma',
    email: 'aongcho880@gmail.com',
    affiliation: 'Student, CSE, CU',
    image: '/team/aong.jpg',
  },
  {
    id: 'taqi',
    role: 'Data Annotator',
    name: 'Taqi Ismail',
    email: 'taqiismail10@gmail.com',
    affiliation: 'Student, CSE, CU',
    image: '/team/taqi.jpg',
  },
  {
    id: 'aryan',
    role: 'Data Annotator',
    name: 'Aryan Bin Ashraf',
    email: ' aryanashraf.csecu@gmail.com',
    affiliation: 'Student, CSE, CU',
    image: '/team/aryan.jpg',
  },
  {
    id: 'miskatul',
    role: 'Data Annotator',
    name: 'Miskatul Anwar',
    email: 'miskat@std.cu.ac.bd',
    affiliation: 'Student, CSE, CU',
    image: '/team/miskat.jpg',
  },
];

const staffMembers = [
  {
    id: 'Kausik Das',
    role: 'Office Manager',
    name: 'Kausik Das',
    email: 'cukaushikdas@gmail.com',
    affiliation: 'Student, EEE, CU',
    image: '/team/kausik.jpeg',
  },
  {
    id: 'sykot',
    role: 'Accountant',
    name: 'Sykot Deb',
    email: 'soikotjps1998@gmail.com',
    affiliation: 'University of Chittagong',
    image: '/team/sykot.png',
  },
  {
    id: 'robiul',
    role: 'Office Assistant',
    name: 'Mohammad Robiul Hossen',
    email: 'm.robiul1212@gmail.com',
    affiliation: 'University of Chittagong',
    image: '/team/robiul.png',
  }
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
            <p className="text-sm text-gray-500">SPM Team, Student Researchers, and Data Annotators</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="font-bold text-[#0c2461] mb-6 text-lg">SPM Team</h2>
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
                  <a href={`mailto:${p.email}`} className="text-xs text-[#0c2461]/70 hover:text-[#0c2461] hover:underline break-all">
                    {p.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="font-bold text-[#0c2461] mb-6 text-lg">Student Researchers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentResearchers.map((s) => (
              <div key={s.id} id={s.id} className="flex flex-col items-center text-center gap-3">
                <MemberAvatar src={s.image} name={s.name} />
                <div>
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest text-white bg-[#0c2461]/80 rounded px-2 py-0.5 mb-1">
                    {s.role}
                  </span>
                  <p className="font-semibold text-[#0c2461] text-sm leading-snug">{s.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.affiliation}</p>
                  {s.email ? (
                    <a href={`mailto:${s.email}`} className="text-xs text-[#0c2461]/70 hover:text-[#0c2461] hover:underline break-all">
                      {s.email}
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="font-bold text-[#0c2461] mb-6 text-lg">Data Annotators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataAnnotators.map((s) => (
              <div key={s.id} id={s.id} className="flex flex-col items-center text-center gap-3">
                <MemberAvatar src={s.image} name={s.name} />
                <div>
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest text-white bg-[#0c2461]/80 rounded px-2 py-0.5 mb-1">
                    {s.role}
                  </span>
                  <p className="font-semibold text-[#0c2461] text-sm leading-snug">{s.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.affiliation}</p>
                  {s.email ? (
                    <a href={`mailto:${s.email}`} className="text-xs text-[#0c2461]/70 hover:text-[#0c2461] hover:underline break-all">
                      {s.email}
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mt-8">
          <h2 className="font-bold text-[#0c2461] mb-6 text-lg">Administrative Staff</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staffMembers.map((s) => (
              <div key={s.id} id={s.id} className="flex flex-col items-center text-center gap-3">
                <MemberAvatar src={s.image} name={s.name} />
                <div>
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest text-white bg-[#0c2461]/80 rounded px-2 py-0.5 mb-1">
                    {s.role}
                  </span>
                  <p className="font-semibold text-[#0c2461] text-sm leading-snug">{s.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.affiliation}</p>
                  {s.email ? (
                    <a href={`mailto:${s.email}`} className="text-xs text-[#0c2461]/70 hover:text-[#0c2461] hover:underline break-all">
                      {s.email}
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
