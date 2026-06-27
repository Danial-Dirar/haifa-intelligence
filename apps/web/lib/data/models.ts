export type AIModel = {
  slug: string;
  name: string;
  task: string;
  description: string;
  metrics: { label: string; value: string }[];
  inputs: string[];
  status: "Live" | "Beta" | "Research";
  tags: string[];
};

export const models: AIModel[] = [
  {
    slug: "aquifer-forecast",
    name: "Aquifer Forecast",
    task: "Groundwater level prediction",
    description:
      "Forecasts groundwater levels weeks ahead from rainfall, temperature, and historical well readings. Built for water authorities and researchers.",
    metrics: [
      { label: "Horizon", value: "12 wk" },
      { label: "R²", value: "0.93" },
      { label: "Signals", value: "8" },
    ],
    inputs: ["Rainfall", "Temperature", "Well history", "Season"],
    status: "Research",
    tags: ["Time-series", "Hydrology"],
  },
  {
    slug: "credit-sense",
    name: "CreditSense",
    task: "Loan approval scoring",
    description:
      "Explainable risk model that scores loan applications and surfaces the top factors behind each decision.",
    metrics: [
      { label: "AUC", value: "0.91" },
      { label: "Latency", value: "40ms" },
      { label: "Features", value: "23" },
    ],
    inputs: ["Income", "History", "Debt ratio", "Employment"],
    status: "Beta",
    tags: ["Classification", "Fintech"],
  },
  {
    slug: "shipsight",
    name: "ShipSight",
    task: "Delivery delay prediction",
    description:
      "Flags e-commerce orders at risk of late delivery so operations teams can intervene before customers notice.",
    metrics: [
      { label: "Precision", value: "0.88" },
      { label: "Recall", value: "0.84" },
      { label: "Orders/s", value: "2k" },
    ],
    inputs: ["Route", "Carrier", "Weather", "Order size"],
    status: "Live",
    tags: ["Logistics", "Prediction"],
  },
  {
    slug: "score-muse",
    name: "ScoreMuse",
    task: "Generative music",
    description:
      "An unsupervised generative model that composes original short pieces from a learned latent space of musical structure.",
    metrics: [
      { label: "Length", value: "30s" },
      { label: "Voices", value: "4" },
      { label: "Mode", value: "Unsup." },
    ],
    inputs: ["Seed", "Tempo", "Key", "Mood"],
    status: "Research",
    tags: ["Generative", "Audio"],
  },
];

export function getModel(slug: string) {
  return models.find((m) => m.slug === slug);
}
