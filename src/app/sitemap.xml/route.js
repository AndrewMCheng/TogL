import { NextResponse } from "next/server";

export async function GET() {
  // Simply redirect Google to the dynamic sitemap index
  return NextResponse.redirect(
    "https://www.playtogl.com/sitemapindex",
    301 // permanent redirect
  );
}