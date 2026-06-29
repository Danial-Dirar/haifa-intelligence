export const site = {
  name: "Haifa Intelligence",
  shortName: "Haifa",
  monogram: "Hi",
  tagline: "Intelligence, engineered.",
  description:
    "Haifa Intelligence is an AI & ML studio. We build machine-learning models, web & mobile products, and generative image / video work for teams who want to move fast and look sharp.",
  url: "https://haifa.intelligence",
  email: "danieldirar@protonmail.com",
  location: "Dhaka, Bangladesh · Remote worldwide",
  social: {
    github: "https://github.com/Danial-Dirar",
    githubOrg: "https://github.com/Danial-Dirar",
    x: "https://x.com",
    linkedin: "https://linkedin.com",
  },
  founder: {
    name: "Danial Dirar",
    role: "Founder · ML & Software Engineer",
    github: "https://github.com/Danial-Dirar",
    scholar: "https://scholar.google.com/citations?user=OeiDTrwAAAAJ&hl=en",
    orcid: "https://orcid.org/0009-0002-4081-4175",
  },
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/studio" },
  { label: "Work", href: "/work" },
  { label: "Models", href: "/models" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/contact" },
] as const;
