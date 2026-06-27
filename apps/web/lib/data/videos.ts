export type VideoEdit = {
  slug: string;
  title: string;
  kind: string;
  duration: string;
  description: string;
  accent: string;
  poster?: string; // /public path; placeholder gradient if absent
  src?: string; // video url; lightbox falls back to a message if absent
};

export const videos: VideoEdit[] = [
  {
    slug: "product-reel",
    title: "Product Launch Reel",
    kind: "Short-form",
    duration: "0:32",
    description: "Punchy vertical cut for a product launch — generative b-roll + motion graphics.",
    accent: "from-violet-600/40 to-fuchsia-500/20",
  },
  {
    slug: "ai-brand-film",
    title: "AI Brand Film",
    kind: "Generative",
    duration: "1:10",
    description: "Fully AI-generated brand film, color-graded and scored.",
    accent: "from-sky-600/40 to-cyan-500/20",
  },
  {
    slug: "founder-story",
    title: "Founder Story",
    kind: "Documentary",
    duration: "2:24",
    description: "Talking-head edit with captions, b-roll, and clean pacing.",
    accent: "from-amber-600/40 to-orange-500/20",
  },
  {
    slug: "app-promo",
    title: "App Promo",
    kind: "Ad",
    duration: "0:18",
    description: "Snappy app walkthrough ad built for paid social.",
    accent: "from-emerald-600/40 to-teal-500/20",
  },
  {
    slug: "music-visual",
    title: "Music Visualizer",
    kind: "Generative",
    duration: "0:45",
    description: "Audio-reactive visuals driven by our generative pipeline.",
    accent: "from-rose-600/40 to-pink-500/20",
  },
  {
    slug: "explainer",
    title: "Model Explainer",
    kind: "Motion",
    duration: "1:35",
    description: "Animated explainer breaking down how a model makes decisions.",
    accent: "from-indigo-600/40 to-blue-500/20",
  },
];
