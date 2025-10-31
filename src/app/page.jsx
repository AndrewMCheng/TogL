import { redirect } from "next/navigation";
import { getLocalDateString } from "./seedGen";

export default function HomePage() {
  const today = getLocalDateString();
  redirect(`/puzzle/${today}`);
}
