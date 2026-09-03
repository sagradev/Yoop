export function GET({ site }: { site?: URL }) {
  const origin = (
    site || new URL('https://agencia-yoop.example.com')
  ).toString();
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: ${origin}sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
}
