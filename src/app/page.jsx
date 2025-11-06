"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getLocalDateString } from "@/app/seedGen";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const today = getLocalDateString();
    router.replace(`/${today}`);
  }, []);

  return null;
}