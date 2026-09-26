/**
 * BDAI Web - Backend API Client
 * Connects the public frontend directly to the Axum Rust Backend API.
 */

import { getEventTimestamp } from './date-utils';

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

const MEMORY_CACHE = new Map<string, any>();

export function getCachedData<T>(key: string): T | null {
  if (MEMORY_CACHE.has(key)) {
    return MEMORY_CACHE.get(key) as T;
  }
  if (typeof window !== 'undefined') {
    try {
      const stored = sessionStorage.getItem(`bdai_cache_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        MEMORY_CACHE.set(key, parsed);
        return parsed as T;
      }
    } catch {}
  }
  return null;
}

export function setCachedData<T>(key: string, data: T): void {
  MEMORY_CACHE.set(key, data);
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(`bdai_cache_${key}`, JSON.stringify(data));
    } catch {}
  }
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

    const data = await res.json();
    setCachedData(endpoint, data);
    return data;
  } catch (err: any) {
    console.warn(`Backend API fetch failed for ${endpoint}:`, err?.message || err);
    return null;
  }
}

export function getCachedTeam(): BackendTeamMember[] | null {
  return getCachedData<BackendTeamMember[]>('/team');
}

export function getCachedNews(): BackendNewsArticle[] | null {
  return getCachedData<BackendNewsArticle[]>('/news');
}

export function getCachedVacancies(): BackendVacancy[] | null {
  return getCachedData<BackendVacancy[]>('/vacancies');
}

export function getCachedObjectives(): BackendObjective[] | null {
  return getCachedData<BackendObjective[]>('/objectives');
}

export function getCachedSiteSettings(): SiteSettings | null {
  return getCachedData<SiteSettings>('/settings');
}

export function getCachedPartners(): any[] | null {
  return getCachedData<any[]>('/partners') || getCachedData<SiteSettings>('/settings')?.partners || null;
}

export function getCachedTools(): BackendTool[] | null {
  return getCachedData<BackendTool[]>('/tools');
}

export function getCachedVideos(): BackendVideo[] | null {
  return getCachedData<BackendVideo[]>('/videos') || getCachedData<any>('/settings/videos') || null;
}

export async function fetchTeam(): Promise<BackendTeamMember[] | null> {
  return fetchFromBackend<BackendTeamMember[]>('/team');
}

export async function fetchNews(params?: { category?: string; status?: string }): Promise<BackendNewsArticle[] | null> {
  const parts: string[] = [];
  if (params?.category) parts.push(`category=${encodeURIComponent(params.category)}`);
  const statusParam = params?.status || 'published';
  parts.push(`status=${encodeURIComponent(statusParam)}`);
  const qs = `?${parts.join('&')}`;
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

export async function fetchPartners(): Promise<any[]> {
  const data = await fetchFromBackend<any[]>('/partners');
  return data && Array.isArray(data) ? data : [];
}

export interface BackendTool {
  id: string;
  title: string;
  subtitle?: string | null;
  description: string;
  abstract?: string | null;
  paper_url?: string | null;
  source_url?: string | null;
  platform_url?: string | null;
  video_url?: string | null;
  image_url?: string | null;
  authors?: string | null;
  features?: string[] | null;
  display_order?: number;
  badge?: string | null;
}

export async function fetchTools(): Promise<BackendTool[] | null> {
  return fetchFromBackend<BackendTool[]>('/tools');
}

export interface BackendVideo {
  id: string;
  title: string;
  url: string;
  thumbnail?: string | null;
  description?: string | null;
  posted_at?: string | null;
  order?: number;
}

export async function fetchVideos(): Promise<BackendVideo[] | null> {
  const direct = await fetchFromBackend<BackendVideo[]>('/videos');
  if (direct && Array.isArray(direct) && direct.length > 0) {
    return direct;
  }
  const fromSettings = await fetchFromBackend<any>('/settings/videos');
  if (fromSettings) {
    if (Array.isArray(fromSettings)) return fromSettings;
    if (Array.isArray(fromSettings.data)) return fromSettings.data;
  }
  return null;
}

export interface BackendGalleryItem {
  src: string;
  alt: string;
}

export interface BackendEvent {
  id: string;
  title: string;
  date: string;
  date_iso?: string;
  status: 'held' | 'upcoming' | string;
  category?: string;
  location?: string | null;
  description?: string | null;
  banner: string;
  gallery?: BackendGalleryItem[];
  order?: number;
  is_visible?: boolean;
  created_at?: string;
  updated_at?: string;
}

export function getCachedEvents(status?: string): BackendEvent[] | null {
  const all = getCachedData<BackendEvent[]>('/events');
  if (!all) return null;
  const visible = all.filter((e) => e.is_visible !== false);
  let sorted = [...visible].sort((a, b) => getEventTimestamp(b) - getEventTimestamp(a));
  if (status) {
    const s = status.toLowerCase();
    return sorted.filter((e) => (e.status || '').toLowerCase() === s);
  }
  return sorted;
}

export async function fetchEvents(params?: { status?: string }): Promise<BackendEvent[] | null> {
  const qs = params?.status ? `?status=${encodeURIComponent(params.status)}` : '';

  // 1. Try dedicated REST endpoint: /events
  try {
    const direct = await fetchFromBackend<BackendEvent[]>(`/events${qs}`);
    if (direct && Array.isArray(direct)) {
      const visible = direct.filter((e) => e.is_visible !== false);
      visible.sort((a, b) => getEventTimestamp(b) - getEventTimestamp(a));
      if (!params?.status) setCachedData('/events', visible);
      return visible;
    }
  } catch {}

  // 2. Fallback to site settings: /settings/events
  try {
    const fromSettings = await fetchFromBackend<any>('/settings/events');
    if (fromSettings) {
      let list: BackendEvent[] = [];
      if (Array.isArray(fromSettings)) list = fromSettings;
      else if (Array.isArray(fromSettings.data)) list = fromSettings.data;

      if (list.length > 0) {
        let visible = list.filter((e) => e.is_visible !== false);
        visible.sort((a, b) => getEventTimestamp(b) - getEventTimestamp(a));
        if (params?.status) {
          const s = params.status.toLowerCase();
          return visible.filter((e) => (e.status || '').toLowerCase() === s);
        }
        return visible;
      }
    }
  } catch {}

  // 3. Fallback direct to Supabase REST API (high-availability failover)
  try {
    const supabaseUrl = 'https://qcqwzeaoukkhfvhrbygf.supabase.co/rest/v1/site_settings?id=eq.events&select=data';
    const anonKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjcXd6ZWFvdWtraGZ2aHJieWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNzIyMDIsImV4cCI6MjEwNTg0ODIwMn0.QTUyXl189Cy_1xFgz35980EUYC9al-5DjEyThxdOdp4';
    const res = await fetch(supabaseUrl, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data[0]?.data && Array.isArray(data[0].data)) {
        let list: BackendEvent[] = data[0].data;
        let visible = list.filter((e) => e.is_visible !== false);
        visible.sort((a, b) => getEventTimestamp(b) - getEventTimestamp(a));
        if (params?.status) {
          const s = params.status.toLowerCase();
          visible = visible.filter((e) => (e.status || '').toLowerCase() === s);
        }
        return visible;
      }
    }
  } catch (e) {
    console.warn('Direct Supabase events failover error:', e);
  }

  return null;
}


