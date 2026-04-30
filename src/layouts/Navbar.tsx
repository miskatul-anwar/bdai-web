'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Info,
  BookOpen,
  Layers,
  Users,
  Search,
  ChevronDown,
  Menu,
  X,
  PlayCircle,
  TrendingUp,
  Target,
  FileText,
  Package,
  Handshake,
  Hammer
} from 'lucide-react';
import Image from 'next/image';

interface NavChild {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavChild[];
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  {
    name: 'About',
    href: '/about/background',
    icon: Info,
    children: [
      { name: 'Background', href: '/about/background', icon: BookOpen },
      { name: 'BDAI Videos', href: '/about/bdai-videos', icon: PlayCircle },
      { name: 'Impact', href: '/about/impact', icon: TrendingUp },
      { name: 'Objectives', href: '/about/objectives', icon: Target },
      { name: 'At a Glance', href: '/about/onepager', icon: FileText },
    ],
  },
  {
    name: 'Work Packages',
    href: '/work-packages/wp1',
    icon: Layers,
    children: [
      { name: 'WP1', href: '/work-packages/wp1', icon: Package },
      { name: 'WP2', href: '/work-packages/wp2', icon: Package },
      { name: 'WP3', href: '/work-packages/wp3', icon: Package },
      { name: 'WP4', href: '/work-packages/wp4', icon: Package },
    ],
  },
  { name: 'Partners', href: '/consortium', icon: Handshake },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Publications', href: '/results/publications', icon: BookOpen },
  { name: 'News', href: '/news', icon: FileText },
  { name: 'Tools', href: '/tools', icon: Hammer },
];

function DropdownMenu({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <item.icon className="w-3.5 h-3.5" />
        {item.name}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 z-[6000] animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-1">
            {item.children!.map((child) => {
              const isActive = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${isActive
                    ? 'bg-[#0c2461]/5 text-[#0c2461]'
                    : 'text-gray-600 hover:bg-[#0c2461]/5 hover:text-[#0c2461]'
                    }`}
                >
                  <child.icon className="w-3.5 h-3.5 flex-shrink-0" />
                  {child.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop / tablet navbar */}
      <nav className="fixed top-0 inset-x-0 z-[5000] h-14 flex items-center px-6 bg-[#0c2461] shadow-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 mr-auto">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
            <Image src="/logo.png" alt="BD AI" width={32} height={32} className="object-contain scale-90" />
          </div>
          <span className="text-white font-bold text-base tracking-tight hidden sm:inline">
            BD<span className="text-[#60a5fa]">AI</span>
          </span>
        </Link>

        {/* Desktop links — aligned right */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <DropdownMenu key={item.href} item={item} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full transition-colors ${(item.href === '/' ? pathname === '/' : pathname.startsWith(item.href))
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white ml-auto"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[6000] md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="absolute top-0 right-0 h-full w-72 bg-[#0c2461] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 h-14 border-b border-white/10">
              <span className="text-white font-bold text-lg">BD<span className="text-[#60a5fa]">AI</span></span>
              <button
                className="p-1 text-white/80 hover:text-white"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer links */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <div key={item.href}>
                    <button
                      onClick={() =>
                        setOpenMobileDropdown(
                          openMobileDropdown === item.name ? null : item.name
                        )
                      }
                      className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${openMobileDropdown === item.name ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                    {openMobileDropdown === item.name && (
                      <div className="mt-1 ml-4 pl-3 border-l border-white/10 space-y-0.5">
                        {item.children.map((child) => {
                          const isActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${isActive
                                ? 'bg-white/20 text-white'
                                : 'text-white/60 hover:text-white hover:bg-white/10'
                                }`}
                            >
                              <child.icon className="w-3.5 h-3.5" />
                              {child.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors ${(item.href === '/' ? pathname === '/' : pathname.startsWith(item.href))
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
