import { getProjectSlugs } from '@/lib/sanity/client';
export async function GET({ site }: { site?: URL }) {
  const origin = (
    site || new URL('https://agencia-yoop.example.com')
  ).toString();
  const slugs = await getProjectSlugs();
  const paths = [
    '',
    'portfolio',
    ...slugs.map(({ slug }) => `portfolio/${slug}`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${new URL(p, origin)}</loc></url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
