// app/sitemap.xml/route.ts
import { locales } from "@/lib/constants";
import { PMRPortfolioController } from "@/lib/controllers/PMRPortfolioController";

export async function GET() {
    const projects = await new PMRPortfolioController("fr").loadProjects();

    const urls: string[] = [];
    const staticPages = [
        "about",
        "education",
        "experiences",
        "portfolio",
        "skills",
    ];

    locales.forEach((locale) => {
        staticPages.forEach((page) => {
            urls.push(`https://mathis-ratron.fr/${locale}/${page}`);
        });
        projects.forEach((slug) => {
            urls.push(
                `https://mathis-ratron.fr/${locale}/portfolio/${slug.id}`
            );
        });
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
    <loc>https://www.mathis-ratron.fr/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
</url>
${urls
    .map(
        (url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
    )
    .join("")}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
