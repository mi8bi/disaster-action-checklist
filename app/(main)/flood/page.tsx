import DisasterPageClient from "@/components/DisasterPageClient";
import { disasterData } from "@/data/disasters";
import { notFound } from "next/navigation";

export default function FloodPage() {
  const disaster = disasterData.flood;

  if (!disaster) {
    notFound();
  }

  return <DisasterPageClient disaster={disaster} />;
}
