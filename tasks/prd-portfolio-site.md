# PRD: satvikdaga.com — Personal Portfolio Site

## Introduction

Build a full static portfolio site for Satvik Daga (ML Engineer / Data Scientist) at satvikdaga.com. The site serves two equal purposes: showcasing technical project depth for recruiters/hiring managers, and establishing personal brand / thought leadership. It is built with Astro + Tailwind CSS using a GitHub-dark palette and JetBrains Mono typography derived from the vladburca.com design language.

The project starts from scratch — no Astro scaffolding exists yet. Design tokens and the extracted vladburca.com Tailwind config are available in `design-extract-output/` for reference.

**Reference spec:** `docs/superpowers/specs/2026-04-16-portfolio-design.md`

---

## Goals

- Ship a complete, statically-generated portfolio with 7 homepage sections and 4 routes
- Pass all 6 verification steps defined in the spec
- Produce a zero-error `npm run build` output
- Render correctly at mobile (< 640px), tablet (640–960px), and desktop (> 960px)
- Establish a content workflow: MDX files for blog posts and projects, TypeScript data files for Now and Experience

---

## User Stories

### US-001: Project Scaffolding
**Description:** As an AI agent, I need to initialize the Astro + Tailwind project so that all subsequent components have a working build environment.

**Acceptance Criteria:**
- [ ] `package.json` created with `astro`, `@astrojs/tailwind`, `tailwindcss`, `reading-time` dependencies
- [ ] `astro.config.mjs` created with `@astrojs/tailwind` integration, `site: 'https://satvikdaga.com'`, `output: 'static'`
- [ ] `tailwind.config.mjs` created with full GitHub-dark palette tokens (`bg`, `bg-surface`, `bg-subtle`, `stroke`, `stroke-muted`, `fg`, `fg-muted`, `accent-*`), `fontFamily.mono`, and 2px-base `theme.spacing` (replacing defaults, not extending)
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts without errors (even with empty pages)

---

### US-002: Font Loading & Global CSS
**Description:** As a site visitor, I want JetBrains Mono to load quickly and consistently so that the developer identity is immediately apparent.

**Acceptance Criteria:**
- [ ] `public/fonts/JetBrainsMono-Regular.woff2`, `SemiBold.woff2`, `Bold.woff2` downloaded from the [JetBrains GitHub releases](https://github.com/JetBrains/JetBrainsMono/releases) (latest stable) and placed in `public/fonts/`
- [ ] `src/styles/global.css` declares `@font-face` for weights 400, 600, 700 pointing to `/fonts/JetBrainsMono-*.woff2`
- [ ] `Base.astro` preloads the 400-weight font via `<link rel="preload" as="font" crossorigin>`
- [ ] `global.css` sets `body { font-family: 'JetBrains Mono', monospace; background: #0d1117; color: #e6edf3; }`
- [ ] Verify in browser using dev-browser skill

---

### US-003: Content Collections Schema
**Description:** As an AI agent, I need type-safe content schemas so that MDX frontmatter is validated at build time and TypeScript errors surface early.

**Acceptance Criteria:**
- [ ] `src/content/config.ts` exists and exports two collections via `defineCollection`
- [ ] `blog` collection schema: `title` (string), `date` (Date), `description` (string), `tags` (string[]), `draft` (boolean, default false), `devToUrl` (string, optional)
- [ ] `projects` collection schema: `title` (string), `description` (string), `tags` (string[]), `date` (Date), `githubUrl` (string, optional), `demoUrl` (string, optional), `featured` (boolean, optional), `draft` (boolean, default false)
- [ ] `npm run build` produces no TypeScript errors related to content collections

---

### US-004: Data Files — Now & Experience
**Description:** As a developer, I need structured TypeScript data files for the Now and Experience sections so that they can be updated without touching component code.

**Acceptance Criteria:**
- [ ] `src/data/now.ts` exports `now` object with `items` array (each item has `label`, `text`, `color` as full Tailwind class string) and `updatedAt` string
- [ ] `src/data/experience.ts` exports `experience` array with entries containing `title`, `company`, `url` (optional), `period`, `current` (boolean)
- [ ] Both files are populated with realistic placeholder data (at least 2–3 entries each)
- [ ] TypeScript typechecks with no errors

---

### US-005: Base.astro Layout
**Description:** As a site visitor, I want consistent `<head>` metadata across all pages so that sharing links and search indexing work correctly.

**Acceptance Criteria:**
- [ ] `src/layouts/Base.astro` accepts `title`, `description`, `ogImage` props
- [ ] `<title>` rendered as `"{title} | Satvik Daga"`; default description is `"ML Engineer building systems that learn from data at scale."`; default `ogImage` is `/og-default.png`
- [ ] `<meta property="og:*">` tags rendered for title, description, image, url
- [ ] `<link rel="icon">` pointing to `/favicon.svg`
- [ ] 400-weight JetBrains Mono font preloaded via `<link rel="preload">`
- [ ] `global.css` imported

---

### US-006: Nav.astro
**Description:** As a site visitor, I want a sticky navigation bar so that I can jump to any section from anywhere on the page.

**Acceptance Criteria:**
- [ ] Nav is sticky (`position: sticky; top: 0`), `backdrop-blur-sm`, `bg-bg/80`
- [ ] `sd.` logo left-aligned, links (`Now`, `Writing`, `Projects`, `Experience`, `Contact`) right-aligned on desktop
- [ ] On mobile (< 640px): nav links hidden, 3-line hamburger SVG shown right-aligned
- [ ] Hamburger open state: full-width dropdown below nav, links stacked vertically, `bg-bg-surface`
- [ ] Dropdown closes on: X icon click, any nav link click, ESC key press
- [ ] Implemented via vanilla JS `<script>` in `Nav.astro` toggling a `.hidden` class — no React or framework
- [ ] Verify in browser using dev-browser skill

---

### US-007: Hero.astro
**Description:** As a recruiter visiting the site, I want a clear, compelling hero section so that I immediately understand who Satvik is and what he does.

**Acceptance Criteria:**
- [ ] Renders full name ("Satvik Daga"), title ("ML Engineer · Data Scientist"), tagline ("I build systems that learn from data at scale.")
- [ ] Two CTA buttons: "→ projects" (internal link to `#projects`), "GitHub ↗" (https://github.com/dagasatvik10), and "LinkedIn ↗" (https://linkedin.com/in/satvik-daga) — external links open in new tab
- [ ] CTA buttons styled: primary = `bg-accent-blue text-bg`, secondary = `border border-stroke text-fg`
- [ ] Verify in browser using dev-browser skill

---

### US-008: Now.astro
**Description:** As a visitor, I want to see what Satvik is currently working on so that I understand his current focus areas.

**Acceptance Criteria:**
- [ ] Renders a card (`bg-bg-surface border-stroke rounded-md`) with the section label "NOW" (uppercase, `text-accent-yellow`, `text-[11px]`, `tracking-widest`)
- [ ] Imports `now` from `src/data/now.ts` and maps over `items`, applying `item.color` as a class directly (`class={item.color}`) — no dynamic template literals
- [ ] Displays `updatedAt` date as `text-fg-muted text-[14px]`
- [ ] Verify in browser using dev-browser skill

---

### US-009: RecentPosts.astro
**Description:** As a visitor, I want to see Satvik's latest writing so that I can gauge his communication style and areas of expertise.

**Acceptance Criteria:**
- [ ] Fetches up to 3 most recent non-draft blog posts via `getCollection('blog', ({ data }) => !data.draft)` sorted by date descending
- [ ] Each post rendered as a list item with 2px left border: most recent = `border-accent-blue`, others = `border-stroke`
- [ ] Displays post title, date, and description
- [ ] "all posts →" link to `/blog` at the bottom
- [ ] If fewer than 3 posts exist, renders however many are available (no minimum, no placeholder)
- [ ] Verify in browser using dev-browser skill

---

### US-010: ProjectGrid.astro
**Description:** As a recruiter, I want to see Satvik's featured projects in a visual grid so that I can quickly assess his technical breadth.

**Acceptance Criteria:**
- [ ] Fetches non-draft projects where `featured: true`; falls back to 4 most recent non-draft projects sorted by date if no featured projects exist
- [ ] Renders a 2-column card grid (`grid grid-cols-2 gap-4` on tablet+, single column on mobile)
- [ ] Each card: `bg-bg-surface border-stroke rounded-md`, shows title, description, and tag chips
- [ ] Tag chips: `bg-bg-subtle rounded-sm`, colored text per domain (purple for ML/AI, blue for general)
- [ ] If projects collection is empty, renders a single placeholder card with text "projects coming soon"
- [ ] "all projects →" link to `/projects` at the bottom
- [ ] Verify in browser using dev-browser skill

---

### US-011: Experience.astro
**Description:** As a recruiter, I want to see Satvik's work history in a timeline format so that I can assess career progression at a glance.

**Acceptance Criteria:**
- [ ] Imports `experience` from `src/data/experience.ts` and maps over entries
- [ ] Each entry rendered as a timeline row: dot + company (linked if `url` provided, opens in new tab) + title + period
- [ ] Current role dot: `bg-accent-blue`; past role dot: `bg-stroke`
- [ ] Company name is `<a href={url} target="_blank" rel="noopener">` when `url` present; plain text otherwise
- [ ] Verify in browser using dev-browser skill

---

### US-012: Contact.astro
**Description:** As a visitor who wants to reach out, I want a simple contact section so that I can find the right channel to connect with Satvik.

**Acceptance Criteria:**
- [ ] Renders a short note (e.g., "Let's talk.") in `text-fg`
- [ ] Links to: email (`mailto:dagasatvik@gmail.com`), GitHub (`https://github.com/dagasatvik10`), LinkedIn (`https://linkedin.com/in/satvik-daga`), dev.to — each as `text-accent-blue` with hover underline
- [ ] External links open in new tab with `rel="noopener"`
- [ ] Verify in browser using dev-browser skill

---

### US-013: index.astro — Homepage Assembly
**Description:** As a visitor, I want a single-page scrolling experience so that I can explore all sections without navigating away.

**Acceptance Criteria:**
- [ ] Imports and renders sections in order: `<Nav>`, `<Hero>`, `<Now>`, `<RecentPosts>`, `<ProjectGrid>`, `<Experience>`, `<Contact>`
- [ ] Each section has matching `id` attribute for anchor nav links (`id="now"`, `id="writing"`, `id="projects"`, `id="experience"`, `id="contact"`)
- [ ] Dividers (`<hr class="border-t border-stroke-muted mx-8">`) between sections
- [ ] Wrapped in `<Base title="Satvik Daga" description="...">`
- [ ] All 7 sections visible at `npm run dev`
- [ ] Verify in browser using dev-browser skill

---

### US-014: Post.astro Layout
**Description:** As a reader, I want a clean, readable layout for blog posts and project writeups so that the content is the focus.

**Acceptance Criteria:**
- [ ] `src/layouts/Post.astro` accepts `backLabel: string` and `backHref: string` props
- [ ] Renders: `<Nav>`, `<article>`, footer contact links strip — all inside `<Base>`
- [ ] Article header: back link (`← all posts` / `← all projects`), `<h1>` title, date · reading time · tag chips
- [ ] If `devToUrl` present in frontmatter: renders "Originally published on dev.to ↗" attribution below the header
- [ ] Reading time computed via `src/utils/readingTime.ts` using the `reading-time` npm package
- [ ] `<MDXContent />` slot rendered in article body
- [ ] Prose content max-width 720px centered on desktop
- [ ] Tag chips colored per domain matching homepage style

---

### US-015: blog/index.astro
**Description:** As a reader, I want to browse all of Satvik's blog posts in one place so that I can find articles relevant to my interests.

**Acceptance Criteria:**
- [ ] Fetches all non-draft blog posts sorted by date descending
- [ ] Renders each post as a list item with title, date, description, and tag chips
- [ ] Page title: "Writing | Satvik Daga"
- [ ] Verify in browser using dev-browser skill

---

### US-016: blog/[slug].astro
**Description:** As a reader, I want to read individual blog posts with proper formatting so that the content is presented cleanly.

**Acceptance Criteria:**
- [ ] Generates static paths via `getStaticPaths` using non-draft blog collection entries
- [ ] Uses `Post.astro` layout with `backLabel="← all posts"` and `backHref="/blog"`
- [ ] Passes `title` and `description` from frontmatter to `<Base>` via `Post.astro`
- [ ] Reading time computed at build time and passed to layout
- [ ] Direct URL to a draft slug returns 404 (draft excluded from `getStaticPaths`)
- [ ] Verify in browser using dev-browser skill

---

### US-017: projects/index.astro — Tag Filter
**Description:** As a recruiter, I want to filter projects by technology tag so that I can focus on projects relevant to a specific skill area.

**Acceptance Criteria:**
- [ ] Renders all non-draft projects as cards (same card style as ProjectGrid)
- [ ] Each card has `data-tags` attribute with comma-separated tag list (e.g., `data-tags="pytorch,python"`)
- [ ] Tag filter buttons rendered above the grid — one per unique tag across all projects
- [ ] Clicking a tag button shows only cards with that tag (`.hidden` toggled via vanilla JS `<script>`)
- [ ] Active tag button styled: `bg-bg-surface border-accent-blue`; inactive: `bg-bg-subtle border-stroke`
- [ ] Clicking the active tag again shows all cards (deselect)
- [ ] No React or Astro client directives — pure vanilla JS
- [ ] Verify in browser using dev-browser skill

---

### US-018: projects/[slug].astro
**Description:** As a visitor, I want to read detailed project writeups so that I can understand the technical depth behind each project.

**Acceptance Criteria:**
- [ ] Generates static paths via `getStaticPaths` using non-draft projects collection entries
- [ ] Uses `Post.astro` layout with `backLabel="← all projects"` and `backHref="/projects"`
- [ ] Passes `title` and `description` from frontmatter to `<Base>`
- [ ] Renders `githubUrl` and `demoUrl` as link buttons in the header if present
- [ ] Verify in browser using dev-browser skill

---

### US-019: 404.astro
**Description:** As a visitor who lands on a nonexistent URL, I want a clear error page so that I can navigate back to the site.

**Acceptance Criteria:**
- [ ] `src/pages/404.astro` exists and is rendered by all deployment targets
- [ ] Shows "404 — not found" in `text-fg`
- [ ] Shows "This page doesn't exist." in `text-fg-muted`
- [ ] Shows `← go home` link in `text-accent-blue` pointing to `/`
- [ ] Visiting `/blog/nonexistent` renders this page
- [ ] Verify in browser using dev-browser skill

---

### US-020: Favicon
**Description:** As a visitor, I want a recognizable browser tab icon so that the site feels polished and professional.

**Acceptance Criteria:**
- [ ] `public/favicon.svg`: `sd.` text in JetBrains Mono, `#58a6ff` color on `#0d1117` background, 32×32 viewBox
- [ ] `public/favicon.ico` present (generated from SVG for legacy browser support)
- [ ] `Base.astro` `<link rel="icon" href="/favicon.svg">` points to correct file

---

### US-021: Sample Content for Verification
**Description:** As a developer running verification, I need sample MDX content so that all 6 spec verification steps can be executed.

**Acceptance Criteria:**
- [ ] At least 1 non-draft MDX file in `src/content/blog/` with all required frontmatter fields
- [ ] At least 1 non-draft MDX file in `src/content/projects/` with `featured: true` and all required frontmatter fields
- [ ] At least 1 draft MDX file in `src/content/blog/` — direct URL access returns 404
- [ ] Blog post renders at `/blog/[slug]` with reading time and tag chips visible
- [ ] Project renders at `/projects/[slug]`
- [ ] `npm run build` completes with no TypeScript or Astro errors
- [ ] Verify in browser using dev-browser skill

---

## Functional Requirements

- **FR-1:** Static output only (`output: 'static'`) — no SSR adapter required in v1
- **FR-2:** All content queries must filter drafts: `getCollection('blog', ({ data }) => !data.draft)`
- **FR-3:** Tailwind spacing must replace defaults entirely (`theme.spacing`, not `theme.extend.spacing`) using the 2px-base scale defined in the spec
- **FR-4:** Token names `stroke` (not `border`) and `fg` (not `text`) to avoid collision with Tailwind's built-in utility families
- **FR-5:** Tag color classes in `now.ts` must be full Tailwind class strings (not dynamic template literals) to survive JIT purge
- **FR-6:** Mobile nav implemented as vanilla JS `<script>` toggling `.hidden` — no Astro client directives, no framework
- **FR-7:** Projects tag filter implemented as vanilla JS `<script>` in `projects/index.astro` using `data-tags` attributes — no adapter needed
- **FR-8:** Reading time computed at build time via `reading-time` npm package in `src/utils/readingTime.ts`
- **FR-9:** `Base.astro` must preload JetBrains Mono 400-weight font (`<link rel="preload" as="font" crossorigin>`) — 600 and 700 weights load normally
- **FR-10:** `Post.astro` is shared for both `/blog/[slug]` and `/projects/[slug]` — differentiated via `backLabel`/`backHref` props
- **FR-11:** Tag color mapping — `text-accent-purple` for ML/AI tags (e.g., `python`, `pytorch`, `llm`, `ml`, `ai`, `rag`, `nlp`); `text-accent-blue` for all other tags. Implement as a lookup function in `src/utils/tagColor.ts`

---

## Non-Goals (Out of Scope — v1)

- Dark/light mode toggle
- Search functionality
- Comments on blog posts
- Analytics integration
- CMS integration (Contentful, Sanity, etc.)
- Per-post OG image generation
- SSR or server-side features
- React or other JS framework components
- Prev/next post navigation
- RSS feed

---

## Design Considerations

- **Palette:** GitHub-dark remix — full token table in spec §Visual Design
- **Typography:** JetBrains Mono, self-hosted, weights 400/600/700. Scale: 36/27/21/18/14px (whole pixels only)
- **Component patterns:** Cards = `bg-bg-surface border-stroke rounded-md`; Section labels = uppercase `text-accent-yellow text-[11px] tracking-widest`; Tags = `bg-bg-subtle rounded-sm`
- **Reference Tailwind config:** `design-extract-output/vladburca-com-tailwind.config.js` for structure/spacing — override palette with GitHub-dark values
- **Brainstorm wireframes:** `.superpowers/brainstorm/64642-1776296531/` — visual reference HTML files available

---

## Technical Considerations

- **Astro version:** v3+ (required for Content Collections `defineCollection` API in `src/content/config.ts`)
- **Node package manager:** use `npm` (not yarn/pnpm) unless otherwise specified
- **Font files:** Must be woff2 format, self-hosted in `public/fonts/` — no Google Fonts CDN
- **Font download:** JetBrains GitHub releases (`https://github.com/JetBrains/JetBrainsMono/releases`) — download latest stable, extract `fonts/webfonts/JetBrainsMono-Regular.woff2`, `JetBrainsMono-SemiBold.woff2`, `JetBrainsMono-Bold.woff2`
- **`og-default.png`:** 1200×630 static fallback in `public/` — can be a placeholder image in v1
- **Astro config:** `site: 'https://satvikdaga.com'` — required for canonical URLs and OG tags
- **No backwards-compat shims** — this is a greenfield build; no legacy browser polyfills

---

## Success Metrics

All 6 spec verification steps must pass:

1. `npm run dev` — homepage loads, all 7 sections visible, scroll works
2. Test MDX in `src/content/blog/` renders at `/blog/[slug]` with reading time and tags
3. Test MDX in `src/content/projects/` renders at `/projects/[slug]`
4. `/blog/nonexistent` renders the 404 page
5. Resize to 480px — nav collapses to hamburger, project grid is single column
6. `npm run build` completes with no TypeScript or Astro errors

---

## Open Questions

None — all questions resolved.
