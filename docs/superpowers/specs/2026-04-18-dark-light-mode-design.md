# Dark / Light Mode — Design Spec

**Date:** 2026-04-18  
**Status:** Approved

---

## Context

The portfolio site currently renders only in dark mode (GitHub Dark palette). The goal is to add a user-controllable light mode so visitors on light-OS setups or with a personal preference for light themes get a comfortable reading experience. The chosen light palette is "Warm Paper" — a cream/off-white base with warm amber accents — which was selected from three options during the design session.

---

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Mode switching | Manual toggle + OS default | User can override; first-visit default follows `prefers-color-scheme` |
| Toggle style | Icon + label button | Sun icon + "light" label in dark mode; moon icon + "dark" label in light mode. Fits monospace aesthetic. |
| Light palette | Warm Paper | Cream base (`#fafaf8`), warm amber accent (`#c07a3a`), dark warm text (`#1a1814`) |
| Implementation approach | CSS custom properties + Tailwind token remapping | Zero changes to existing components; entire theme encapsulated in `global.css` + `tailwind.config.mjs` |
| Flash prevention | Synchronous inline script in `<head>` | Reads `localStorage` → OS preference before first paint |

---

## Architecture

Five files are touched. No page, layout, or existing component (other than `Nav.astro`) is modified.

```
src/styles/global.css             ← CSS vars: :root (light) + .dark (dark); replace body rule
tailwind.config.mjs               ← token values in theme.extend.colors: hex → rgb(var(...))
src/layouts/Base.astro            ← inline <script> + color-scheme meta
src/components/ThemeToggle.astro  ← NEW: button + click handler
src/components/Nav.astro          ← expose closeMenu on window; import + render <ThemeToggle />
```

---

## Color Tokens

All 12 tokens are redefined as CSS custom properties. `tailwind.config.mjs` maps each token to its variable inside **`theme.extend.colors`** (keeping the existing nesting — do NOT move colors to `theme.colors`) so all existing Tailwind utility classes (`bg-bg`, `text-fg`, `border-stroke`, etc.) continue to work without modification.

CSS variable values are stored as **space-separated RGB channel triplets** (e.g. `13 17 23`) rather than hex strings. This is required so Tailwind's opacity modifier syntax (`bg-bg/80`, used in `Nav.astro`) can generate valid `rgb(var(--color-bg) / 0.8)` CSS. Hex-valued CSS vars silently break opacity modifiers.

| Token | Dark (hex ref) | Dark (RGB triplet) | Light (hex ref) | Light (RGB triplet) | Used for |
|---|---|---|---|---|---|
| `--color-bg` | `#0d1117` | `13 17 23` | `#fafaf8` | `250 250 248` | Page background |
| `--color-bg-surface` | `#161b22` | `22 27 34` | `#f0ede8` | `240 237 232` | Cards, nav glassmorphism |
| `--color-bg-subtle` | `#21262d` | `33 38 45` | `#e8e4dd` | `232 228 221` | Hover states, tag chips |
| `--color-stroke` | `#30363d` | `48 54 61` | `#d4cfc8` | `212 207 200` | Borders, dividers |
| `--color-stroke-muted` | `#21262d` | `33 38 45` | `#e8e4dd` | `232 228 221` | Subtle borders |
| `--color-fg` | `#e6edf3` | `230 237 243` | `#1a1814` | `26 24 20` | Primary text |
| `--color-fg-muted` | `#8b949e` | `139 148 158` | `#6b6560` | `107 101 96` | Secondary text, labels |
| `--color-accent-blue` | `#58a6ff` | `88 166 255` | `#c07a3a` | `192 122 58` | Links, name, highlights (amber in light) |
| `--color-accent-green` | `#3fb950` | `63 185 80` | `#2d7a3a` | `45 122 58` | Status, tags |
| `--color-accent-purple` | `#bc8cff` | `188 140 255` | `#7c5cbf` | `124 92 191` | Tags, decorative |
| `--color-accent-yellow` | `#d29922` | `210 153 34` | `#a06010` | `160 96 16` | Warnings, decorative |
| `--color-accent-red` | `#f85149` | `248 81 73` | `#c0392b` | `192 57 43` | Errors, destructive |

**Note:** `accent-blue` becomes amber (`#c07a3a`) in light mode. Intentional — chosen during design review.

---

## CSS Variable Structure (`global.css`)

**Replace** the existing `body { background: #0d1117; color: #e6edf3; }` rule entirely — do not append.

```css
/* Light mode (Warm Paper) — default */
:root {
  --color-bg: 250 250 248;
  --color-bg-surface: 240 237 232;
  --color-bg-subtle: 232 228 221;
  --color-stroke: 212 207 200;
  --color-stroke-muted: 232 228 221;
  --color-fg: 26 24 20;
  --color-fg-muted: 107 101 96;
  --color-accent-blue: 192 122 58;
  --color-accent-green: 45 122 58;
  --color-accent-purple: 124 92 191;
  --color-accent-yellow: 160 96 16;
  --color-accent-red: 192 57 43;
}

/* Dark mode */
.dark {
  --color-bg: 13 17 23;
  --color-bg-surface: 22 27 34;
  --color-bg-subtle: 33 38 45;
  --color-stroke: 48 54 61;
  --color-stroke-muted: 33 38 45;
  --color-fg: 230 237 243;
  --color-fg-muted: 139 148 158;
  --color-accent-blue: 88 166 255;
  --color-accent-green: 63 185 80;
  --color-accent-purple: 188 140 255;
  --color-accent-yellow: 210 153 34;
  --color-accent-red: 248 81 73;
}

/* Replace (do not append) the existing body rule */
body {
  font-family: 'JetBrains Mono', monospace;
  background: rgb(var(--color-bg));
  color: rgb(var(--color-fg));
  margin: 0;
}
```

---

## Tailwind Config (`tailwind.config.mjs`)

Also add `darkMode: 'class'` at the top level of the config so Tailwind's `dark:` utility variants (if used now or in future) track the same `.dark` class as the toggle.

Update the values inside **`theme.extend.colors`** (keep the existing nesting — do not move to `theme.colors`). Use `rgb(var(...) / <alpha-value>)` so opacity modifiers like `bg-bg/80` work correctly.

```js
// top-level — add alongside content, theme, plugins
darkMode: 'class',

// inside theme.extend.colors — same location as current hex values
colors: {
  bg: 'rgb(var(--color-bg) / <alpha-value>)',
  'bg-surface': 'rgb(var(--color-bg-surface) / <alpha-value>)',
  'bg-subtle': 'rgb(var(--color-bg-subtle) / <alpha-value>)',
  stroke: 'rgb(var(--color-stroke) / <alpha-value>)',
  'stroke-muted': 'rgb(var(--color-stroke-muted) / <alpha-value>)',
  fg: 'rgb(var(--color-fg) / <alpha-value>)',
  'fg-muted': 'rgb(var(--color-fg-muted) / <alpha-value>)',
  'accent-blue': 'rgb(var(--color-accent-blue) / <alpha-value>)',
  'accent-green': 'rgb(var(--color-accent-green) / <alpha-value>)',
  'accent-purple': 'rgb(var(--color-accent-purple) / <alpha-value>)',
  'accent-yellow': 'rgb(var(--color-accent-yellow) / <alpha-value>)',
  'accent-red': 'rgb(var(--color-accent-red) / <alpha-value>)',
}
```

The `<alpha-value>` placeholder is Tailwind's internal token — it is replaced at build time with the actual opacity value from the modifier (e.g. `/80` → `0.8`). When no modifier is used, Tailwind substitutes `1`.

---

## Flash Prevention (`Base.astro` `<head>`)

Add `<meta name="color-scheme" content="light dark">` and the inline script immediately after `<meta charset="utf-8">`. The flash-prevention guarantee comes from two properties: (1) the script is synchronous (no `defer`, no `type="module"`), so it runs before the browser renders the first frame; (2) it sets the class on `document.documentElement` before the CSS cascade applies, so `.dark` is present from the very first paint. Position within `<head>` is not load-order-sensitive as long as the script remains synchronous and in `<head>` rather than `<body>`.

```html
<meta name="color-scheme" content="light dark" />
<script is:inline>
  (function() {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

`is:inline` is required — without it Astro bundles the script as a module and defers execution, causing a flash.

---

## ThemeToggle Component (`ThemeToggle.astro`)

New file at `src/components/ThemeToggle.astro`. `is:inline` is required because Astro deduplicates standard `<script>` tags across component instances — since `ThemeToggle` is rendered twice (desktop nav and mobile drawer), a standard `<script>` would only execute once. `is:inline` ensures the handler and `syncUI()` call run for each rendered instance. Do not change it to a plain `<script>` when integrating into Nav. The custom spacing scale has no `1.5` key; use `gap-2` (4px) instead.

Elements are queried using `document.currentScript.previousElementSibling` (the button immediately before the script tag) and then scoped `querySelector` calls using `data-*` attributes — **no `id` attributes**. This is critical: `ThemeToggle` is rendered twice in the DOM (desktop + mobile), so `getElementById` would always target the first instance from both IIFEs, leaving the second instance's icon and label never updating.

```astro
---
// No props — reads/writes DOM directly
---

<button
  data-theme-toggle
  aria-label="Toggle theme"
  class="flex items-center gap-2 bg-bg-surface border border-stroke rounded text-fg-muted px-2 py-1 text-xs font-mono cursor-pointer hover:text-fg transition-colors"
>
  <!-- Sun icon — shown in dark mode (click to go light) -->
  <svg data-icon-sun width="13" height="13" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
  <!-- Moon icon — shown in light mode (click to go dark) -->
  <svg data-icon-moon width="13" height="13" viewBox="0 0 24 24" fill="none"
       class="hidden" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
  <span data-theme-label>light</span>
</button>

<script is:inline>
  (function() {
    // document.currentScript is the <script> element itself, available synchronously.
    // previousElementSibling is the <button> immediately above it in this component.
    // This scopes all queries to this instance — safe when rendered multiple times.
    var btn = document.currentScript.previousElementSibling;
    var iconSun = btn.querySelector('[data-icon-sun]');
    var iconMoon = btn.querySelector('[data-icon-moon]');
    var label = btn.querySelector('[data-theme-label]');

    function syncUI() {
      var isDark = document.documentElement.classList.contains('dark');
      iconSun.classList.toggle('hidden', !isDark);
      iconMoon.classList.toggle('hidden', isDark);
      label.textContent = isDark ? 'light' : 'dark';
    }

    syncUI(); // align icons/label with whatever the flash-prevention script set

    btn.addEventListener('click', function() {
      var isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      // Sync all rendered toggle instances so both stay in visual agreement
      document.querySelectorAll('[data-theme-toggle]').forEach(function(b) {
        var sun = b.querySelector('[data-icon-sun]');
        var moon = b.querySelector('[data-icon-moon]');
        var lbl = b.querySelector('[data-theme-label]');
        sun.classList.toggle('hidden', !isDark);
        moon.classList.toggle('hidden', isDark);
        lbl.textContent = isDark ? 'light' : 'dark';
      });
      if (typeof window.closeMenu === 'function') window.closeMenu();
    });
  })();
</script>
```

---

## Nav Integration (`Nav.astro`)

1. Import `ThemeToggle.astro` at the top of the frontmatter block
2. Render `<ThemeToggle />` as the last item in the desktop nav link row
3. Render `<ThemeToggle />` at the bottom of the mobile drawer (after the last `<a>` link, before the closing `</div>`)
4. In Nav's existing `<script>` block, expose `closeMenu` on `window` so the ThemeToggle `is:inline` script can call it:

```js
// add inside Nav's existing <script> block, after closeMenu is defined
window.closeMenu = closeMenu;
```

The ThemeToggle script already guards the call with `typeof window.closeMenu === 'function'`, so this is safe if Nav ever changes.

---

## Verification

1. `npm run dev` → visit `localhost:4321`
2. Confirm page loads in your OS default mode with no flash of wrong theme
3. Click toggle → page switches mode instantly; label and icon flip
4. Reload → mode persists (localStorage)
5. Open DevTools → Application → Local Storage → confirm `theme` key is set to `"dark"` or `"light"`
6. Delete `theme` key in DevTools, set OS to light mode, reload → page loads in light
7. Delete `theme` key in DevTools, set OS to dark mode, reload → page loads in dark
8. `npm run build && npm run preview` → repeat steps 2–7 against production build
9. Verify mobile: resize browser below 640px (Tailwind `sm` breakpoint) or use DevTools device emulation → open hamburger drawer → confirm toggle appears at bottom → click toggle → confirm mode switches and drawer closes
