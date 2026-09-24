/**
 * BDAI Backend API Client for Public Website
 * Serves live database records from the Rust Backend (Axum + Supabase PostgreSQL)
 * with graceful fallback to static seed data.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface LiveTeamMember {
  id: string;
  name: string;
  designation: string;
  role?: string;
  category?: string;
  institution: string;
  email?: string;
  bio?: string;
  image?: string;
  scholar_url?: string;
  linkedin_url?: string;
  display_order: number;
}

export interface LiveNewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  publish_date: string;
  author: string;
  status: string;
  featured: boolean;
  tags: string[];
}

export interface LiveVacancy {
  id: string;
  title: string;
  department: string;
  work_package: string;
  notice_type: string;
  location: string;
  deadline: string;
  status: string;
  description: string;
  requirements: string[];
  applicant_count: number;
}

export interface LiveObjective {
  id: string;
  title: string;
  details: string;
  researcher: string;
  sector: string;
  status: string;
  progress: number;
  deliverables: number;
}

export async function getLiveTeam(): Promise<LiveTeamMember[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/team`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getLiveNews(): Promise<LiveNewsArticle[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/news`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getLiveVacancies(): Promise<LiveVacancy[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/vacancies`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getLiveObjectives(): Promise<LiveObjective[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/objectives`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
