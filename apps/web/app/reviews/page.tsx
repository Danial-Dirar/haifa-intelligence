import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Reviews } from "@/components/sections/reviews";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "What clients say about working with Haifa Intelligence, quoted with their permission.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title={
          <>
            In our clients&rsquo; <span className="text-gradient">words</span>
          </>
        }
        description="The people we've built for, quoted with their permission."
      />

      <Reviews withHeading={false} />

      <CTA />
    </>
  );
}
