import ClientPage from "./clientpage";

// ✅ Server function — only allowed here
export async function generateStaticParams() {
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return { date: d.toISOString().split("T")[0] };
  });
  return dates;
}

export default function Page({ params }) {
  return <ClientPage date={params.date} />;
}
