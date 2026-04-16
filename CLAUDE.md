# satvikdaga-com

Personal portfolio site. Astro + Tailwind CSS, static output. **Not yet scaffolded** — PRD and design spec are ready; code is generated story-by-story via Ralph (`plans/PROMPT.md`).

## Commands

```bash
npm install
npm run dev       # localhost:4321 (Astro default)
npm run build     # static output to dist/
npm run preview   # preview dist/ locally
```

## Architecture

```
src/
  content/        # MDX blog posts & projects (Content Layer API)
  content.config.ts  # Collection definitions — defineCollection + glob loaders + Zod schemas
  data/           # Static TS objects: now.ts, experience.ts
  components/     # .astro components, no React
  layouts/        # Base.astro (head/OG), Post.astro (blog/project)
  pages/          # index.astro, blog/[slug].astro, projects/[slug].astro
  styles/         # global.css — @font-face + base resets
public/fonts/     # Self-hosted JetBrains Mono .woff2 files
design-extract-output/  # Reference: extracted design tokens from vladburca.com
tasks/prd-portfolio-site.md  # Full PRD — 21 user stories
docs/superpowers/specs/2026-04-16-portfolio-design.md  # Design spec
```

## Gotchas

### Tailwind token naming (avoid class collisions)
- Use `stroke` / `stroke-muted` for border colors → `border-stroke` (not `border-gray-700`)
- Use `fg` / `fg-muted` for text colors → `text-fg-muted` (not `text-gray-400`)
- Dynamic template literals (`text-${color}`) are **purged by Tailwind JIT in production** — always use full class strings in data files

### Tailwind spacing scale
- **Replace** Tailwind's default spacing, don't extend it: use `theme.spacing`, not `theme.extend.spacing`
- Scale is 2px-base: 0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40

### Fonts
- All fonts self-hosted in `public/fonts/` as `.woff2`
- Only 400-weight preloaded in `<head>` (`<link rel="preload" as="font" crossorigin>`)
- No Google Fonts CDN

### No JavaScript frameworks
- Navigation hamburger: vanilla JS toggling `.hidden` — no React, no Astro `client:` directives
- Projects tag filter: vanilla JS with `data-tags` attributes on cards — same constraint

### Draft content
- `draft: true` frontmatter produces **no route** (404 on direct URL)
- All collection queries must filter: `getCollection('blog', ({ data }) => !data.draft)`

### Content Collections (Content Layer API)
- Config lives at `src/content.config.ts` (NOT inside `src/content/`)
- Each collection requires a `loader: glob({ pattern, base })` — no implicit file discovery
- Import `z` from `astro/zod`, NOT from `astro:content`
- Import `glob` from `astro/loaders`
- Entries use `id` (the slug), NOT `slug` — replace all `post.slug` with `post.id`
- Render with standalone `render(entry)` from `astro:content`, NOT `entry.render()`
- Zod schemas validate frontmatter at build time — TypeScript errors appear immediately on bad frontmatter

### Tailwind via PostCSS
- Uses `postcss.config.cjs` with `tailwindcss` plugin (NOT `@astrojs/tailwind`)
- `@tailwind base/components/utilities` directives in `src/styles/global.css`
- Config in `tailwind.config.mjs` at project root
