# Haifa Intelligence

The website for **Haifa Intelligence** — an AI & ML studio. Showcases services,
work/portfolio, a shelf of AI models, video edits, and a founder portfolio, with
a lead-capture contact flow.

Design language: calm-but-premium, heavy motion (smooth scroll + scroll reveals +
parallax), light **and** dark themes (default dark).

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack) — `apps/web`
- **Tailwind CSS v4** + **shadcn/ui** + **lucide-react**
- **Framer Motion** (reveals, parallax) + **Lenis** (smooth scroll)
- **next-themes** (light/dark) with CSS-variable design tokens
- npm workspaces + **Turborepo** monorepo (so a NestJS `apps/api` drops in later)

## Run it

```bash
# from the repo root
npm install
npm run dev          # turbo runs every app's dev task
# or just the web app:
npm run web
```

Open http://localhost:3000.

```bash
npm run build        # production build (type-checks everything)
```

## Structure

```
apps/web                 Next.js frontend (the current deliverable)
  app/                   routes: / · /work · /work/[slug] · /services
                         /models · /founder · /contact · /api/contact (stub)
  components/
    motion/              SmoothScroll, Reveal, Parallax, Marquee
    layout/              Navbar, MobileMenu, Footer, Logo
    sections/            home + page sections
    shared/              cards, headings, aurora, icons
    ui/                  shadcn primitives
  lib/data/              typed content: services, projects, models, videos
packages/                reserved (shared ui/config, NestJS api later)
```

Content lives in `apps/web/lib/data/*` — adding a project, model, or video is a
single typed array entry, no JSX.

## Roadmap

- [ ] `apps/api` — NestJS lead capture, email, Postgres + Prisma (the contact form
      currently posts to a stub route at `/api/contact`).
- [ ] Real media: project images, video reels, founder photos.
- [ ] CMS / admin, live model inference demos.
```
