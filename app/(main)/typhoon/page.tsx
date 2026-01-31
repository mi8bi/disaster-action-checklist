import DisasterPageClient from "@/components/DisasterPageClient";
import { disasterData } from "@/data/disasters";
import { notFound } from "next/navigation";

export default function TyphoonPage() {
  const disaster = disasterData.typhoon;

  if (!disaster) {
    notFound();
  }

  return <DisasterPageClient disaster={disaster} />;
}
