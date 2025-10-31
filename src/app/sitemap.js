export const dynamic = "force-dynamic"; // if using Next.js app router

const BASE_URL = "https://playtogl.com";

export default async function sitemap() {
  const today = new Date();

  // Generate URLs for the last 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  const urls = [
    {
      url: `${BASE_URL}/`,
      lastModified: today.toISOString(),
    },
    ...dates.map((date) => ({
      url: `${BASE_URL}/puzzle/${date}`,
      lastModified: date,
    })),
  ];

  return urls;
}
