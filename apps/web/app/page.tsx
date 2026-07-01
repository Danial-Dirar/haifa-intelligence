import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Services } from "@/components/sections/services";
import { StudioShowcase } from "@/components/sections/studio-showcase";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ModelsShowcase } from "@/components/sections/models-showcase";
import { VideoGallery } from "@/components/sections/video-gallery";
import { Process } from "@/components/sections/process";
import { FounderCallout } from "@/components/sections/founder-callout";
import { Team } from "@/components/sections/team";
import { Reviews } from "@/components/sections/reviews";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <StudioShowcase />
      <FeaturedWork />
      <ModelsShowcase />
      <VideoGallery />
      <Process />
      <FounderCallout />
      <Team />
      <Reviews />
      <CTA />
    </>
  );
}
