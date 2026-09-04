import { createClient } from '@sanity/client';
import type { Category, Project, Service, SiteSettings } from '@/types';
import brocaCover from '@/assets/portfolio/broca-gourmet-01.jpg';
import brocaGallery from '@/assets/portfolio/broca-gourmet-02.jpg';
import picininCover from '@/assets/portfolio/acougue-picinin-01.jpg';
import picininGallery from '@/assets/portfolio/acougue-picinin-02.jpg';
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
  whatsapp: '556791626723',
  phone: '+55 67 9162-6723',
  primaryCta: 'Vamos conversar',
  defaultSeoTitle: 'Agência Yoop — Criatividade, estratégia e resultado',
  defaultSeoDescription:
    'Agência Yoop. Criatividade e estratégia para elevar marcas no mundo digital.',
};

const photographyCategory: Category = {
  _id: 'local-category-photography',
  name: 'Fotografia',
  slug: 'fotografia',
  description: 'Produção de imagens para marcas, produtos e redes sociais.',
};

const contentServices: Service[] = [
  {
    _id: 'local-service-food-photography',
    name: 'Fotografia gastronômica',
    slug: 'fotografia-gastronomica',
    active: true,
  },
  {
    _id: 'local-service-content-production',
    name: 'Produção de conteúdo',
    slug: 'producao-de-conteudo',
    active: true,
  },
];

const fallbackProjects: Project[] = [
  {
    _id: 'local-project-broca-gourmet',
    title: 'Broca Gourmet',
    slug: 'broca-gourmet',
    client: 'Broca Gourmet',
    localCover: brocaCover,
    localGallery: [brocaGallery],
    shortDescription: 'Fotografia gastronômica que transforma sabor em desejo.',
    caseDescription:
      'Produção de imagens para valorizar os produtos da Broca Gourmet nas redes sociais, com direção de cena, enquadramentos próximos e uma linguagem visual intensa.',
    category: photographyCategory,
    services: contentServices,
    tags: ['fotografia gastronômica', 'conteúdo', 'redes sociais'],
    projectDate: '2025-03-03',
    featured: true,
    manualOrder: 1,
    externalUrl: 'https://photos.app.goo.gl/cB9DpiWcAn7mwcPQ9',
    seoDescription:
      'Fotografia gastronômica produzida pela Agência Yoop para a Broca Gourmet.',
  },
  {
    _id: 'local-project-acougue-picinin',
    title: 'Açougue Picinin',
    slug: 'acougue-picinin',
    client: 'Açougue Picinin',
    localCover: picininCover,
    localGallery: [picininGallery],
    shortDescription: 'Conteúdo visual que destaca qualidade, textura e origem.',
    caseDescription:
      'Ensaio de produtos desenvolvido para apresentar os cortes do Açougue Picinin com personalidade, reforçando a identidade da marca e criando material para sua comunicação digital.',
    category: photographyCategory,
    services: contentServices,
    tags: ['fotografia de produto', 'conteúdo', 'redes sociais'],
    projectDate: '2025-01-27',
    featured: true,
    manualOrder: 2,
    externalUrl: 'https://photos.app.goo.gl/iEnh8uWYc3NcW77n7',
    seoDescription:
      'Fotografia de produtos produzida pela Agência Yoop para o Açougue Picinin.',
  },
];

function mergeProjects(remote: Project[], local = fallbackProjects) {
  const remoteSlugs = new Set(remote.map((project) => project.slug));
  return [...remote, ...local.filter((project) => !remoteSlugs.has(project.slug))];
}
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
export const getFeaturedProjects = async () => {
  const remote = await safeFetch<Project[]>(featuredProjectsQuery, {}, []);
  return mergeProjects(
    remote,
    fallbackProjects.filter((project) => project.featured),
  ).slice(0, 6);
};
export const getProjects = async () =>
  mergeProjects(await safeFetch<Project[]>(projectsQuery, {}, []));
export const getCategories = async () => {
  const remote = await safeFetch<Category[]>(categoriesQuery, {}, []);
  return remote.some((category) => category.slug === photographyCategory.slug)
    ? remote
    : [...remote, photographyCategory];
};
export const getProjectSlugs = async () => {
  const remote = await safeFetch<Array<{ slug: string }>>(
    projectSlugsQuery,
    {},
    [],
  );
  const remoteSlugs = new Set(remote.map((item) => item.slug));
  return [
    ...remote,
    ...fallbackProjects
      .filter((project) => !remoteSlugs.has(project.slug))
      .map((project) => ({ slug: project.slug })),
  ];
};
export const getProjectBySlug = async (slug: string) =>
  (await safeFetch<Project | null>(projectBySlugQuery, { slug }, null)) ||
  fallbackProjects.find((project) => project.slug === slug) ||
  null;
export const getRelatedProjects = async (slug: string, categoryId: string) => {
  const remote = await safeFetch<Project[]>(
    relatedProjectsQuery,
    { slug, categoryId },
    [],
  );
  const local = fallbackProjects.filter(
    (project) =>
      project.slug !== slug && project.category?._id === categoryId,
  );
  return mergeProjects(remote, local).slice(0, 3);
};
