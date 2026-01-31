import DisasterPageClient from "@/components/DisasterPageClient";
import { disasterData } from "@/data/disasters";
import { notFound } from "next/navigation";

export default function EarthquakePage() {
  const disaster = disasterData.earthquake;

  if (!disaster) {
    notFound();
  }

  return <DisasterPageClient disaster={disaster} />;
}
