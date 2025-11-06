import ClientPage from "./clientpage";

export async function generateStaticParams() {
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return { date: d.toISOString().split("T")[0] };
  });
  return dates;
}

export async function generateMetadata({ params }) {
  const { date } = params;
  return {
    title: `Togl - ${date} Puzzle`,
    description: `Solve Togl's puzzle for ${date}!`,
    metadataBase: new URL("https://www.playtogl.com"),
    alternates: { canonical: `https://www.playtogl.com/${date}` },
  };
}

export default function Page({ params }) {
  return <ClientPage date={params.date} />;
}

