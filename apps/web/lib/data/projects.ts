export type Project = {
  slug: string;
  title: string;
  category: "ML" | "Web" | "Mobile" | "Systems" | "Graphics";
  year: string;
  summary: string;
  description: string;
  tags: string[];
  stack: string[];
  repo?: string;
  accent: string; // gradient pair for the card
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "haifa-hivemind",
    title: "Haifa HiveMind",
    category: "ML",
    year: "2026",
    summary:
      "A private, local AI research assistant — drop in your papers, ask grounded questions with citations, and it learns from your feedback. Runs entirely offline on your own machine.",
    description:
      "Built for a microbiology researcher who needed an assistant that never sends data to the cloud. HiveMind ingests PDFs, DOCX, text and images into a local knowledge base, answers questions grounded in those sources with citations, and reads screenshots with a vision model. When an answer misses, the user rejects it and the assistant rethinks; approved answers feed a QLoRA fine-tuning loop, so it adapts to how the researcher works. Chat history is searchable with a 30-day recycle bin, and simple On / Pause / Off power controls keep the GPU busy only when needed. Shipped as a cross-platform Electron desktop app over a FastAPI + React core — API-first, so mobile clients can connect over the LAN later.",
    tags: ["Local AI", "RAG", "Fine-tuning"],
    stack: ["Python", "FastAPI", "React", "Electron", "Ollama", "QLoRA"],
    repo: "https://github.com/Danial-Dirar/haifa-hivemind",
    accent: "from-brand-1/30 to-brand-2/20",
    featured: true,
  },
  {
    slug: "groundwater-prediction",
    title: "Groundwater Level Prediction",
    category: "ML",
    year: "2026",
    summary:
      "Thesis-grade model forecasting groundwater levels from hydrological & climate signals.",
    description:
      "A deep time-series pipeline that ingests rainfall, temperature, and historical well data to forecast groundwater levels — built to support sustainable water-resource planning. This is the research engine behind Haifa Intelligence.",
    tags: ["Time-series", "Forecasting", "Research"],
    stack: ["Python", "PyTorch", "Pandas", "Hydrology data"],
    accent: "from-sky-500/30 to-cyan-400/20",
    featured: true,
  },
  {
    slug: "project-grd",
    title: "GRD — Global River Database",
    category: "Web",
    year: "2026",
    summary: "A searchable global river database with a typed full-stack interface.",
    description:
      "A structured, queryable database of rivers worldwide with a clean TypeScript web front-end — making large-scale hydrological data explorable.",
    tags: ["Database", "Geospatial", "Full-stack"],
    stack: ["TypeScript", "Node", "PostgreSQL"],
    repo: "https://github.com/Danial-Dirar/project_grd",
    accent: "from-emerald-500/30 to-teal-400/20",
    featured: true,
  },
  {
    slug: "music-generation",
    title: "Unsupervised Music Generation",
    category: "ML",
    year: "2026",
    summary: "A neural network that composes music without labelled data.",
    description:
      "An unsupervised deep-learning project (CSE425) that learns musical structure from raw sequences and generates original compositions.",
    tags: ["Generative", "Neural nets", "Audio"],
    stack: ["Python", "PyTorch"],
    repo: "https://github.com/Danial-Dirar/music-generation-unsupervised",
    accent: "from-fuchsia-500/30 to-violet-400/20",
    featured: true,
  },
  {
    slug: "loan-approval-ai",
    title: "Loan Approval AI",
    category: "ML",
    year: "2025",
    summary: "Risk-scoring model that predicts loan approval from applicant data.",
    description:
      "A supervised classification model that scores loan applications, with a focus on interpretability and fair, explainable decisions.",
    tags: ["Classification", "Risk scoring", "Fintech"],
    stack: ["Python", "scikit-learn"],
    repo: "https://github.com/Danial-Dirar/loan_approval_ai",
    accent: "from-amber-500/30 to-orange-400/20",
    featured: true,
  },
  {
    slug: "ecommerce-shipping-ai",
    title: "E-commerce Shipping AI",
    category: "ML",
    year: "2026",
    summary: "Predicts shipping outcomes & delays for online orders.",
    description:
      "A model that forecasts whether e-commerce shipments will arrive on time, helping logistics teams flag at-risk orders early.",
    tags: ["Logistics", "Prediction", "Operations"],
    stack: ["Python", "Pandas", "scikit-learn"],
    repo: "https://github.com/Danial-Dirar/e_commerce_shipping_ai",
    accent: "from-indigo-500/30 to-blue-400/20",
  },
  {
    slug: "dishdash",
    title: "DishDash",
    category: "Mobile",
    year: "2025",
    summary: "Realtime, location-based app that finds the best food offers near you.",
    description:
      "A cross-platform Flutter app that surfaces the best deals based on a user's live location — realtime data, clean UX, native feel.",
    tags: ["Flutter", "Realtime", "Location"],
    stack: ["Dart", "Flutter", "Firebase"],
    repo: "https://github.com/Danial-Dirar/CSE47020_DishDash",
    accent: "from-rose-500/30 to-pink-400/20",
  },
  {
    slug: "distributed-ml",
    title: "Distributed ML System",
    category: "Systems",
    year: "2025",
    summary: "High-performance distributed system for training ML at scale.",
    description:
      "A CSE449 project focused on high-performance computing and distributed systems — parallelising ML workloads across nodes for throughput.",
    tags: ["HPC", "Distributed", "Infra"],
    stack: ["Python", "MPI", "Distributed compute"],
    repo: "https://github.com/Danial-Dirar/CSE449_distributed_ml_system",
    accent: "from-violet-500/30 to-purple-400/20",
  },
  {
    slug: "signal-sweep",
    title: "Signal Sweep",
    category: "Graphics",
    year: "2024",
    summary: "Bluetooth radar — visual device detection in real space.",
    description:
      "A computer-graphics project (CSE423) that visualises Bluetooth device detection as a sweeping radar, blending signal processing with OpenGL rendering.",
    tags: ["OpenGL", "Signals", "Visualization"],
    stack: ["Python", "OpenGL"],
    repo: "https://github.com/Danial-Dirar/Project-Signal-Sweep",
    accent: "from-lime-500/30 to-green-400/20",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
