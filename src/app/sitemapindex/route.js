// app/sitemapindex/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const today = new Date();
  const sitemaps = [];

  sitemaps.push(`
  <sitemap>
    <loc>https://www.playtogl.com</loc>
    <lastmod>${today.toISOString().split("T")[0]}</lastmod>
  </sitemap>
`);

  // Generate last 7 days
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
    sitemaps.push(`
      <sitemap>
        <loc>https://www.playtogl.com/${dateStr}</loc>
        <lastmod>${dateStr}</lastmod>
      </sitemap>
    `);
  }

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.join("\n")}
</sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    headers: { "Content-Type": "application/xml" },
  });
}
