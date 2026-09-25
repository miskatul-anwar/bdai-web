/**
 * BDAI Web - Backend API Client
 * Connects the public frontend directly to the Axum Rust Backend API.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://bdai-backend.onrender.com/api';

export interface BackendTeamMember {
  id: string;
  name: string;
  designation: string;
  role?: string | null;
  category?: string | null;
  institution?: string;
  email?: string | null;
  bio?: string | null;
  image?: string | null;
  scholar_url?: string | null;
  linkedin_url?: string | null;
  display_order?: number;
}

export interface BackendNewsArticle {
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

export interface BackendVacancy {
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

export interface BackendObjective {
  id: string;
  title: string;
  details: string;
  researcher: string;
  sector: string;
  status: 'in-progress' | 'completed' | 'planned';
  progress: number;
  deliverables: number;
}

async function fetchFromBackend<T>(endpoint: string): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
      next: { revalidate: 60 }, // ISR cache for 60 seconds
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Backend API ${endpoint} responded with status: ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (err: any) {
    console.warn(`Backend API fetch failed for ${endpoint}:`, err?.message || err);
    return null;
  }
}

export async function fetchTeam(): Promise<BackendTeamMember[] | null> {
  return fetchFromBackend<BackendTeamMember[]>('/team');
}

export async function fetchNews(params?: { category?: string }): Promise<BackendNewsArticle[] | null> {
  const qs = params?.category ? `?category=${encodeURIComponent(params.category)}` : '';
  return fetchFromBackend<BackendNewsArticle[]>(`/news${qs}`);
}

export async function fetchVacancies(): Promise<BackendVacancy[] | null> {
  return fetchFromBackend<BackendVacancy[]>('/vacancies');
}

export async function fetchObjectives(): Promise<BackendObjective[] | null> {
  return fetchFromBackend<BackendObjective[]>('/objectives');
}

export interface SiteSettings {
  hero_stats?: Array<{ label: string; value: string; sub?: string; color?: string }>;
  hero_content?: {
    badge?: string;
    title?: string;
    title_highlight?: string;
    subtitle?: string;
    primary_btn_text?: string;
    primary_btn_url?: string;
    secondary_btn_text?: string;
    secondary_btn_url?: string;
  };
  about?: {
    vision?: string;
    mission?: string;
    research_areas?: Array<{ title: string; desc: string }>;
  };
  sectors?: Array<{
    id: string;
    name: string;
    bengali: string;
    desc: string;
    color: string;
    icon?: string;
  }>;
  partners?: Array<{
    name: string;
    type?: string;
    role?: string;
    logo: string;
    desc?: string;
    url?: string;
  }>;
  work_packages?: Array<{
    id: string;
    title: string;
    lead?: string;
    status?: string;
    objective: string;
    highlights?: string[];
    tasks?: string[];
  }>;
  publications?: Array<{
    id: string;
    title: string;
    authors: string;
    venue: string;
    year: string;
    doi_url?: string;
    pdf_url?: string;
  }>;
  reports?: Array<{
    id: string;
    title: string;
    wp?: string;
    type?: string;
    date?: string;
    size?: string;
    download_url?: string;
  }>;
  contact?: {
    office?: string;
    email?: string;
    sub_project?: string;
    copyright?: string;
  };
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  return fetchFromBackend<SiteSettings>('/settings');
}

