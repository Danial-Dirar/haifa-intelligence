import {
  BrainCircuit,
  Globe,
  Smartphone,
  Sparkles,
  Clapperboard,
  LineChart,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "ml-models",
    title: "Custom ML Models",
    tagline: "Models trained on your problem, not a demo.",
    description:
      "From data pipeline to deployed inference. We design, train, and ship machine-learning models for prediction, classification, forecasting, and decision support — built around your business or research objective.",
    icon: BrainCircuit,
    bullets: [
      "Time-series & regression forecasting",
      "Classification & risk scoring",
      "Recommendation & ranking",
      "Computer vision & signal models",
    ],
    deliverables: ["Trained model + weights", "Inference API", "Eval report", "Docs & handover"],
  },
  {
    slug: "web",
    title: "Web Platforms",
    tagline: "Fast, beautiful, production-grade.",
    description:
      "Marketing sites, dashboards, and full-stack web apps. Next.js on the front, NestJS / Node on the back, deployed and monitored. The kind of site you are looking at right now.",
    icon: Globe,
    bullets: ["Next.js + TypeScript", "Design systems & shadcn UI", "REST / GraphQL APIs", "Auth, payments, dashboards"],
    deliverables: ["Responsive web app", "API & database", "CI/CD pipeline", "Analytics"],
  },
  {
    slug: "mobile",
    title: "Mobile Apps",
    tagline: "One codebase, both stores.",
    description:
      "Cross-platform mobile apps with Flutter — location-aware, offline-capable, and connected to your AI backend. Like DishDash, our real-time offer finder.",
    icon: Smartphone,
    bullets: ["Flutter / Dart", "Realtime & location features", "On-device + cloud AI", "Play Store & App Store"],
    deliverables: ["iOS + Android app", "Backend integration", "Store submission", "Maintenance"],
  },
  {
    slug: "generative",
    title: "Generative AI",
    tagline: "Image & video, generated to spec.",
    description:
      "We run local and cloud generative pipelines to produce images, video, and creative assets at scale — plus custom fine-tunes so the output looks like you, not like everyone else.",
    icon: Sparkles,
    bullets: ["Image generation & editing", "AI video generation", "Custom LoRA / fine-tunes", "Batch creative pipelines"],
    deliverables: ["Asset library", "Reusable pipeline", "Style fine-tune", "Usage guide"],
  },
  {
    slug: "video",
    title: "Video Editing",
    tagline: "Cuts that hold attention.",
    description:
      "Short-form, ads, product reels, and AI-assisted edits. We pair editing craft with generative tools to turn raw footage into something people finish watching.",
    icon: Clapperboard,
    bullets: ["Short-form & reels", "Product & ad edits", "Motion graphics", "AI upscale & cleanup"],
    deliverables: ["Edited masters", "Platform cutdowns", "Thumbnails", "Source project"],
  },
  {
    slug: "consulting",
    title: "AI Strategy",
    tagline: "Know what to build before you build it.",
    description:
      "Not sure where AI fits? We audit your data, scope the highest-leverage use case, and hand you a concrete roadmap — so the model you commission actually moves a number.",
    icon: LineChart,
    bullets: ["Data & feasibility audit", "Use-case scoping", "Architecture roadmap", "Build vs. buy guidance"],
    deliverables: ["Opportunity map", "Technical roadmap", "Cost estimate", "Risk review"],
  },
];
