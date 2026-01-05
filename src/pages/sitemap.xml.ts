import type { APIRoute } from 'astro';

const staticPaths = ['/' ];

export const GET: APIRoute = ({ site }) => {
  const origin = site ? site.origin : '';
  const lastmod = new Date().toISOString();
  const urls = staticPaths
    .map((path) => {
      const loc = origin ? new URL(path, origin).toString() : path;
      return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
    })
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    `${urls}` +
    `</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
