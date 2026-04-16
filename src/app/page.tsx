import { Hero } from "@/components/home/Hero";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { Pillars } from "@/components/home/Pillars";
import { Stats } from "@/components/home/Stats";
import { Process } from "@/components/home/Process";
import { CTA } from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <Pillars />
      <Stats />
      <Process />
      <CTA />
    </>
  );
}
