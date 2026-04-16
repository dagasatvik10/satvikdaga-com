# satvikdaga.com — Portfolio Design Spec

**Date:** 2026-04-16  
**Status:** Approved

---

## Context

Satvik Daga is an ML Engineer / Data Scientist building a personal portfolio site at satvikdaga.com. The site serves two purposes equally: showcasing technical project depth (for recruiters and hiring managers) and establishing a personal brand / thought leadership presence. The design language is derived from vladburca.com (extracted via `designlang`) and adapted into a GitHub-dark palette to better suit a data/systems engineering identity.

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Astro | Content-first, static output, MDX support, no framework overhead |
| Styling | Tailwind CSS | Utility-first, fast iteration, custom theme from extracted tokens |
| Content | Astro Content Collections | Type-safe frontmatter, schema validation at build time |
| Blog source | MDX files (imported from dev.to) | Simple, no live API dependency |
| Deployment | TBD (Vercel / Netlify / GitHub Pages — default static output works with all) |

---

## Site Structure — Hybrid

| Route | Type | Description |
|-------|------|-------------|
| `/` | Scrolling SPA-like | Hero → Now → Recent Writing → Projects → Experience → Contact |
| `/projects` | Static page | Full project index with tag filter |
| `/projects/[slug]` | Dynamic | Project writeup (MDX) |
| `/blog` | Static page | All posts, sorted by date |
| `/blog/[slug]` | Dynamic | Blog post (MDX) |

---

## Visual Design

### Palette — GitHub-dark remix

| Token name (Tailwind) | Hex | Usage |
|-------|-----|-------|
| `bg` | `#0d1117` | Page background |
| `bg-surface` | `#161b22` | Cards, code blocks |
| `bg-subtle` | `#1c2128` | Hover states |
| `stroke` | `#30363d` | Dividers, card borders |
| `stroke-muted` | `#21262d` | Subtle separators |
| `fg` | `#e6edf3` | Primary text |
| `fg-muted` | `#8b949e` | Secondary text, labels |
| `accent-blue` | `#58a6ff` | Links, active states, CTA |
| `accent-green` | `#3fb950` | Section labels, success states |
| `accent-purple` | `#bc8cff` | Tags, ML/AI topics |
| `accent-yellow` | `#e8d87c` | Section headings |
| `accent-red` | `#f85149` | Errors, warnings |

**Note on naming:** Tokens are named `stroke` (not `border`) and `fg` (not `text`) to avoid collisions with Tailwind's built-in `border-{width}` and `text-{size}` utility families. Tailwind usage: `border-stroke`, `border-stroke-muted`, `text-fg`, `text-fg-muted`.

### Typography

- **Font:** JetBrains Mono (self-hosted, weights 400/600/700) — same as vladburca.com, signals developer identity
- **Scale:** 36px (h1) → 27px (h2) → 21px (h3) → 18px (body) → 14px (small/labels) — font sizes are rounded to whole pixels; fractional values from the extracted vladburca.com config are intentionally not used
- **Base unit:** 2px spacing scale (4→8→12→16→20→24→32→40px)

### Component Patterns

| Component | Style |
|-----------|-------|
| Cards | `bg-bg-surface`, `border-stroke`, `rounded-md` (6px) |
| Section labels | Uppercase, `text-accent-yellow`, `text-[11px]`, `tracking-widest` |
| Tags/chips | `bg-bg-subtle`, colored text per domain, `rounded-sm` (3px) |
| Nav | Sticky, `backdrop-blur-sm`, `bg-bg/80` |
| Links | `text-accent-blue`, no underline default, underline on hover |
| Dividers | `border-t border-stroke-muted mx-8` |
| Blog list items | Left border `2px`, recent = `border-accent-blue`, older = `border-stroke` |

---

## Homepage Sections (scroll order)

1. **Nav** — sticky, `sd.` logo left, section links right
2. **Hero** — name, title, tagline ("I build systems that learn from data at scale."), CTA buttons (→ projects, github ↗, linkedin ↗)
3. **Now** — card with current work/reading/writing, manually updated, shows date
4. **Recent Writing** — 3 latest non-draft posts, left-border treatment, "all posts →" link
5. **Projects** — 2-column card grid, 2–4 featured (`featured: true`), "all projects →" link
6. **Experience** — timeline dot list, company + title + dates
7. **Contact** — short note, links to email / github / linkedin / dev.to

---

## Content Collections Schema

Defined in `src/content/config.ts` using `defineCollection` + zod schemas. This file is required for Astro v3+ Content Collections to enforce type-safety at build time.

### Blog (`src/content/blog/*.mdx`)
```ts
{
  title: string
  date: Date
  description: string
  tags: string[]
  draft?: boolean       // default false; excluded from all queries if true
  devToUrl?: string     // canonical URL on dev.to; rendered as attribution in Post.astro
}
```

### Projects (`src/content/projects/*.mdx`)
```ts
{
  title: string
  description: string
  tags: string[]
  date: Date
  githubUrl?: string
  demoUrl?: string
  featured?: boolean    // if true, shown in homepage ProjectGrid
  draft?: boolean       // default false; excluded from all queries if true
}
```

---

## File Structure

```
satvikdaga-com/
├── public/
│   ├── fonts/
│   │   ├── JetBrainsMono-Regular.woff2
│   │   ├── JetBrainsMono-SemiBold.woff2
│   │   └── JetBrainsMono-Bold.woff2
│   ├── favicon.svg
│   ├── favicon.ico
│   └── og-default.png          # 1200×630, used as OG image fallback
├── src/
│   ├── content/
│   │   ├── config.ts            # defineCollection schemas (required for Astro v3+)
│   │   ├── blog/
│   │   └── projects/
│   ├── data/
│   │   ├── now.ts               # "Now" section content
│   │   └── experience.ts        # Work experience entries
│   ├── styles/
│   │   └── global.css           # @font-face declarations, base resets
│   ├── utils/
│   │   └── readingTime.ts       # reading time helper
│   ├── layouts/
│   │   ├── Base.astro
│   │   └── Post.astro
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── Now.astro
│   │   ├── RecentPosts.astro
│   │   ├── ProjectGrid.astro
│   │   ├── Experience.astro
│   │   └── Contact.astro
│   └── pages/
│       ├── index.astro
│       ├── 404.astro
│       ├── projects/
│       │   ├── index.astro
│       │   └── [slug].astro
│       └── blog/
│           ├── index.astro
│           └── [slug].astro
├── tailwind.config.mjs
└── astro.config.mjs
```

---

## Tailwind Config Structure

The Tailwind theme is derived from `design-extract-output/vladburca-com-tailwind.config.js` (structure/spacing) with palette overridden to GitHub-dark values. Token mapping in `tailwind.config.mjs`:

```js
theme: {
  extend: {
    colors: {
      bg: {
        DEFAULT: '#0d1117',
        surface: '#161b22',
        subtle:  '#1c2128',
      },
      stroke: {              // "border" avoided — collides with Tailwind border-width utilities
        DEFAULT: '#30363d',
        muted:   '#21262d',
      },
      fg: {                  // "text" avoided — collides with Tailwind text-size utilities
        DEFAULT: '#e6edf3',
        muted:   '#8b949e',
      },
      accent: {
        blue:   '#58a6ff',
        green:  '#3fb950',
        purple: '#bc8cff',
        yellow: '#e8d87c',
        red:    '#f85149',
      },
    },
    fontFamily: {
      mono: ['JetBrains Mono', 'monospace'],
    },
  },
  // Spacing replaces Tailwind defaults entirely (not extend) to avoid
  // ambiguity between Tailwind's default spacing and the 2px-base scale.
  // Place under `theme.spacing`, not `theme.extend.spacing`.
  spacing: {
    '0': '0px',
    '1': '2px',
    '2': '4px',
    '3': '6px',
    '4': '8px',
    '5': '10px',
    '6': '12px',
    '8': '16px',
    '10': '20px',
    '12': '24px',
    '14': '28px',
    '16': '32px',
    '20': '40px',
    // px, full, etc. kept from Tailwind defaults
  },
}
```

Usage in components: `bg-bg`, `bg-bg-surface`, `text-fg-muted`, `text-accent-blue`, `border-stroke`, `border-stroke-muted`.

---

## Post.astro Layout

Used for both `/blog/[slug]` and `/projects/[slug]`. Accepts `backLabel: string` and `backHref: string` props — each `[slug].astro` page passes its own values (e.g. `backLabel="← all posts"` / `backHref="/blog"` or `backLabel="← all projects"` / `backHref="/projects"`).

Renders:

```
<Base> (injects title, meta, OG tags)
  <Nav />
  <article>
    <a href={backHref}>{backLabel}</a>
    <header>
      title (h1)
      date · reading-time estimate · tag chips
      [blog only] "Originally published on dev.to ↗" if devToUrl present
    </header>
    <MDX body />
  </article>
  <footer> (contact links strip)
</Base>
```

Reading time: computed using the `reading-time` npm package in `src/utils/readingTime.ts`. Called at build time, passed as a prop into the layout. Tag chips: colored per domain matching homepage style. No comments, no prev/next navigation in v1.

---

## Data Sources for Non-MDX Sections

### "Now" section
Stored in `src/data/now.ts` — a single exported object:
```ts
export const now = {
  items: [
    // color must be a full Tailwind class string — dynamic template literals
    // (e.g. `text-${color}`) are stripped by JIT purge in production builds
    { label: 'Building', text: 'RAG evaluation pipelines', color: 'text-accent-blue' },
    { label: 'Exploring', text: 'mechanistic interpretability', color: 'text-accent-green' },
    { label: 'Writing', text: 'LLM evaluation methodology', color: 'text-accent-purple' },
  ],
  updatedAt: '2026-04-16',
}
```
`Now.astro` imports this directly and applies `item.color` as a class string directly (`class={item.color}`). No content collection needed — it's a single object edited in code.

### Experience section
Stored in `src/data/experience.ts`:
```ts
export const experience = [
  {
    title: 'ML Engineer',
    company: 'Company Name',
    url: 'https://company.com',   // company name rendered as <a href={url} target="_blank">
    period: '2023–present',
    current: true,
  },
  // ...
]
```
`Experience.astro` maps over this array. Company name is a link (opens in new tab) when `url` is provided. Current role uses `accent-blue` dot; past roles use `stroke` dot.

---

## Projects Tag Filter

Client-side vanilla JS — no React integration needed. Static Astro renders all project cards with `data-tags="pytorch,python"` attributes. A `<script>` block in `projects/index.astro` filters by toggling `.hidden` on cards when a tag button is clicked. Active tag button gets `bg-bg-surface border-accent-blue` styling. No extra Astro adapter or integration required.

---

## SEO / Meta Tags

`Base.astro` accepts `title`, `description`, `ogImage` props. Defaults:
- `title`: `"{page title} | Satvik Daga"`
- `description`: `"ML Engineer building systems that learn from data at scale."`
- `ogImage`: `/og-default.png` (1200×630 static fallback in `public/`)

All posts share the default OG image (`/og-default.png`) — no per-post OG image in v1. Blog and project `[slug].astro` pages pass their frontmatter `title` and `description` to `<Base>`.

---

## Responsive Breakpoints

| Breakpoint | Width | Key changes |
|-----------|-------|-------------|
| Mobile | < 640px | Single column everywhere; nav links hidden, hamburger icon shown |
| Tablet | 640–960px | 2-col project grid; nav links visible |
| Desktop | > 960px | Prose content max-width 720px centered; project grid uses full container width (up to 960px) |

### Mobile Nav
- Hamburger: 3-line SVG icon (24×24), right-aligned in nav
- Open state: full-width dropdown below nav, links stacked vertically, `bg-bg-surface`
- Close triggers: clicking the X icon (same position), clicking any nav link, pressing ESC
- Implemented as a vanilla JS `<script>` in `Nav.astro` toggling a `.hidden` class on the dropdown

---

## Font Loading

Font files in `public/fonts/JetBrainsMono-{Regular,SemiBold,Bold}.woff2`. Declared in `src/styles/global.css` via `@font-face`. Preloaded in `Base.astro` `<head>` with `<link rel="preload" as="font" crossorigin>` for the 400 weight only (critical path). 600 and 700 weights load normally via `@font-face`.

---

## Draft Post Behavior

Posts and projects with `draft: true` are excluded from all content queries in both dev and production builds. They produce no routes — a direct URL to a draft slug returns a 404. Enforced via:
```ts
const posts = await getCollection('blog', ({ data }) => !data.draft)
```

---

## 404 Page

`src/pages/404.astro` — rendered by all deployment targets. Shows:
- "404 — not found" heading in `text-fg`
- "This page doesn't exist." one-liner in `text-fg-muted`
- `← go home` link in `text-accent-blue`

---

## Deployment

Default: **Astro static output** (`output: 'static'`, no adapter). Compatible with GitHub Pages, Netlify, and Vercel static hosting. `astro.config.mjs` sets `site: 'https://satvikdaga.com'`. Adapter added later when deployment target is finalized.

---

## Favicon

SVG favicon at `public/favicon.svg` — the `sd.` text mark in JetBrains Mono, `#58a6ff` on `#0d1117` background, 32×32 viewBox. Also `public/favicon.ico` (generated from SVG) for legacy browser support.

---

## Edge Cases

- **Fewer than 3 blog posts:** `RecentPosts.astro` renders however many non-draft posts exist (no minimum, no placeholder)
- **`devToUrl` field:** Rendered as "Originally published on dev.to ↗" attribution at the top of blog post body in `Post.astro`
- **Empty projects collection:** `ProjectGrid.astro` renders a placeholder card ("projects coming soon")
- **No featured projects:** Homepage `ProjectGrid` falls back to showing the 4 most recent non-draft projects sorted by date

---

## Out of Scope (v1)

- Dark/light mode toggle
- Search functionality
- Comments on blog posts
- Analytics (add later)
- CMS integration
- Per-post OG images

---

## Verification

1. `npm run dev` — homepage loads, all 7 sections visible, scroll works
2. Create a test MDX file in `src/content/blog/` — verify it renders at `/blog/[slug]` with reading time and tags
3. Create a test MDX file in `src/content/projects/` — verify it renders at `/projects/[slug]`
4. Visit `/blog/nonexistent` — verify 404 page renders
5. Resize to 480px — nav collapses to hamburger, project grid is single column
6. `npm run build` — build completes with no TypeScript or Astro errors
