import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Services } from "@/components/sections/services";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ModelsShowcase } from "@/components/sections/models-showcase";
import { VideoGallery } from "@/components/sections/video-gallery";
import { Process } from "@/components/sections/process";
import { FounderCallout } from "@/components/sections/founder-callout";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <FeaturedWork />
      <ModelsShowcase />
      <VideoGallery />
      <Process />
      <FounderCallout />
      <CTA />
    </>
  );
}
