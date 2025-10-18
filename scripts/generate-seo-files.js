import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// URL base da aplicação (pode ser sobrescrita por variável de ambiente)
const BASE_URL = process.env.VITE_APP_URL || 'https://movie-mb.vercel.app';
const currentDate = new Date().toISOString().split('T')[0];

// Gera robots.txt
const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml
`;

// Gera sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/favorites</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/search</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
`;

// Escreve os arquivos
const publicDir = join(__dirname, '..', 'public');
writeFileSync(join(publicDir, 'robots.txt'), robotsTxt);
writeFileSync(join(publicDir, 'sitemap.xml'), sitemapXml);

console.log('✅ SEO files generated successfully!');
console.log(`   Base URL: ${BASE_URL}`);
console.log(`   Date: ${currentDate}`);
