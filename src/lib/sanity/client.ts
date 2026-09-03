import { createClient } from '@sanity/client';
import type { Category, Project, Service, SiteSettings } from '@/types';
import {
  categoriesQuery,
  featuredProjectsQuery,
  projectBySlugQuery,
  projectsQuery,
  projectSlugsQuery,
  relatedProjectsQuery,
  servicesQuery,
  settingsQuery,
} from './queries';

const configured = Boolean(
  import.meta.env.PUBLIC_SANITY_PROJECT_ID &&
  import.meta.env.PUBLIC_SANITY_PROJECT_ID !== 'placeholder',
);
const client = configured
  ? createClient({
      projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
      dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
      apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2026-09-03',
      useCdn: true,
    })
  : null;
export const fallbackSettings: SiteSettings = {
  companyName: 'Agência Yoop',
  institutionalDescription: 'Elevamos a sua empresa no mundo digital.',
  instagram: 'https://www.instagram.com/agencia.yoop/',
  primaryCta: 'Vamos conversar',
  defaultSeoTitle: 'Agência Yoop — Criatividade, estratégia e resultado',
  defaultSeoDescription:
    'Agência Yoop. Criatividade e estratégia para elevar marcas no mundo digital.',
};
async function safeFetch<T>(
  query: string,
  params: Record<string, string> = {},
  fallback: T,
): Promise<T> {
  if (!client) return fallback;
  try {
    return await client.fetch<T>(query, params);
  } catch {
    return fallback;
  }
}
export const getSettings = () =>
  safeFetch<SiteSettings | null>(settingsQuery, {}, fallbackSettings).then(
    (v) => v || fallbackSettings,
  );
export const getServices = () => safeFetch<Service[]>(servicesQuery, {}, []);
export const getFeaturedProjects = () =>
  safeFetch<Project[]>(featuredProjectsQuery, {}, []);
export const getProjects = () => safeFetch<Project[]>(projectsQuery, {}, []);
export const getCategories = () =>
  safeFetch<Category[]>(categoriesQuery, {}, []);
export const getProjectSlugs = () =>
  safeFetch<Array<{ slug: string }>>(projectSlugsQuery, {}, []);
export const getProjectBySlug = (slug: string) =>
  safeFetch<Project | null>(projectBySlugQuery, { slug }, null);
export const getRelatedProjects = (slug: string, categoryId: string) =>
  safeFetch<Project[]>(relatedProjectsQuery, { slug, categoryId }, []);
