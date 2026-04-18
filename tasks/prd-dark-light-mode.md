# PRD: Dark / Light Mode

## Introduction

Add a user-controllable light mode to the portfolio site, which currently renders only in dark mode (GitHub Dark palette). Visitors on light-OS setups or with a personal preference for light themes will get a comfortable reading experience. The feature includes a manual toggle button, OS preference detection, and flash prevention for smooth transitions.

## Goals

- Allow users to switch between dark and light modes via a toggle button
- Detect and respect user's OS color scheme preference on first visit
- Remember user's theme choice across sessions (localStorage)
- Prevent flash of incorrect theme on page load
- Support modern desktop and mobile browsers (last 2 versions)
- Complete theme switch within 50ms of toggle click

## User Stories

### US-001: Define CSS custom properties for both themes
**Description:** As a developer, I need to define CSS variables for all color tokens so that Tailwind utilities can reference theme-appropriate values.

**Acceptance Criteria:**
- [ ] Create `:root` block with light mode (Warm Paper) RGB triplet values for all 12 color tokens
- [ ] Create `.dark` class block with dark mode (GitHub Dark) RGB triplet values for all 12 color tokens
- [ ] Replace existing `body` rule with new rule using `rgb(var(--color-bg))` and `rgb(var(--color-fg))`
- [ ] Verify CSS validates without errors

### US-002: Configure Tailwind to use CSS variables
**Description:** As a developer, I need to remap Tailwind color tokens to CSS variables so all existing utilities continue to work without component changes.

**Acceptance Criteria:**
- [ ] Add `darkMode: 'class'` to top-level Tailwind config
- [ ] Update all 12 color values in `theme.extend.colors` to use `rgb(var(--color-*) / <alpha-value>)` format
- [ ] Verify existing Tailwind utilities (bg-bg, text-fg, border-stroke, etc.) generate correct CSS
- [ ] Verify opacity modifiers work (e.g., `bg-bg/80` generates valid rgba)

### US-003: Implement flash-prevention script
**Description:** As a user, I want the page to load in my preferred theme immediately without any flash of incorrect colors.

**Acceptance Criteria:**
- [ ] Add `<meta name="color-scheme" content="light dark">` to `<head>` in Base.astro
- [ ] Add inline synchronous script in `<head>` that checks localStorage then OS preference
- [ ] Script adds `.dark` class to `document.documentElement` before first paint when appropriate
- [ ] Script uses `is:inline` directive to prevent Astro bundling
- [ ] Verify no flash on hard refresh (Cmd+Shift+R) in both light and dark OS modes

### US-004: Create ThemeToggle component
**Description:** As a user, I want a toggle button that shows the current theme and lets me switch between light and dark modes.

**Acceptance Criteria:**
- [ ] Create `src/components/ThemeToggle.astro` with button containing sun icon, moon icon, and label
- [ ] Sun icon + "light" label shown in dark mode
- [ ] Moon icon + "dark" label shown in light mode
- [ ] Button uses Tailwind classes: bg-bg-surface, border-stroke, text-fg-muted, hover:text-fg
- [ ] Script uses `is:inline` to prevent deduplication
- [ ] Script uses `data-*` attributes for element queries (no `id` attributes)
- [ ] Click handler toggles `.dark` class, updates localStorage, syncs all toggle instances, calls `window.closeMenu()`
- [ ] `syncUI()` function aligns icon/label with current theme on load
- [ ] Typecheck passes

### US-005: Integrate ThemeToggle into navigation
**Description:** As a user, I want to access the theme toggle from both the desktop navigation and mobile menu drawer.

**Acceptance Criteria:**
- [ ] Import ThemeToggle.astro in Nav.astro
- [ ] Render `<ThemeToggle />` as last item in desktop nav link row
- [ ] Render `<ThemeToggle />` at bottom of mobile drawer (after last `<a>`, before closing `</div>`)
- [ ] Expose `closeMenu` function on `window` in Nav's script block
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Verify theme persistence and OS preference
**Description:** As a user, I want my theme choice to persist across sessions, and I want the site to respect my OS preference on first visit.

**Acceptance Criteria:**
- [ ] Verify `localStorage.setItem('theme', ...)` stores correct value on toggle
- [ ] Verify `localStorage.getItem('theme')` retrieves value on page load
- [ ] Verify with no stored value: dark OS loads dark mode, light OS loads light mode
- [ ] Verify with stored value "light": loads light mode regardless of OS preference
- [ ] Verify with stored value "dark": loads dark mode regardless of OS preference
- [ ] Verify in browser using dev-browser skill

### US-007: Performance - theme switch under 50ms
**Description:** As a user, I want the theme switch to feel instant when I click the toggle button.

**Acceptance Criteria:**
- [ ] Measure time from toggle click to visual theme change using Chrome DevTools Performance panel
- [ ] Verify switch completes within 50ms on desktop Chrome
- [ ] Verify switch completes within 50ms on mobile Chrome DevTools emulation
- [ ] Verify no layout shift during theme transition

### US-008: Cross-browser compatibility
**Description:** As a developer, I need to verify the feature works on modern desktop and mobile browsers.

**Acceptance Criteria:**
- [ ] Verify feature works on Chrome (latest)
- [ ] Verify feature works on Firefox (latest)
- [ ] Verify feature works on Safari (latest)
- [ ] Verify feature works on mobile Safari (iOS)
- [ ] Verify feature works on mobile Chrome (Android)
- [ ] Verify in browser using dev-browser skill

## Functional Requirements

- FR-1: System must provide light mode (Warm Paper palette) and dark mode (GitHub Dark palette)
- FR-2: System must detect OS color scheme preference via `prefers-color-scheme` media query
- FR-3: System must store user's theme preference in localStorage under 'theme' key
- FR-4: System must apply correct theme before first paint to prevent flash
- FR-5: System must provide toggle button in desktop navigation and mobile drawer
- FR-6: Toggle button must show sun icon + "light" label in dark mode, moon icon + "dark" label in light mode
- FR-7: System must complete theme transition within 50ms of toggle click
- FR-8: System must sync all toggle instances when theme changes
- FR-9: System must close mobile drawer after theme toggle
- FR-10: All existing Tailwind utility classes must work without modification

## Non-Goals

- No analytics tracking of theme preferences or toggle events
- No time-based automatic theme switching
- No custom theme options beyond light/dark binary
- No theme transition animations (instant switch only)
- No per-page theme settings (global preference only)
- No support for Internet Explorer or legacy browsers
- No high-contrast mode or additional accessibility themes

## Design Considerations

### Light Palette: Warm Paper
- Cream base (`#fafaf8`) for comfortable reading
- Warm amber accent (`#c07a3a`) for links and highlights
- Dark warm text (`#1a1814`) for contrast
- Selected from three options during design review

### Toggle Button Design
- Icon + label approach fits monospace aesthetic
- Sun icon in dark mode (clicking goes to light)
- Moon icon in light mode (clicking goes to dark)
- Glassmorphism background using `bg-bg-surface`

### Responsive Behavior
- Desktop: toggle in main navigation link row
- Mobile: toggle at bottom of hamburger drawer

## Technical Considerations

### CSS Variable Format
- RGB triplet format (e.g., `250 250 248`) required for Tailwind opacity modifiers
- Hex-valued CSS variables would break `bg-bg/80` syntax
- Tailwind's `<alpha-value>` placeholder substituted at build time

### Flash Prevention
- Synchronous inline script required in `<head>`
- `is:inline` directive prevents Astro from bundling as module
- Script runs before CSS cascade applies, ensuring `.dark` present on first paint

### Component Duplication
- `ThemeToggle` rendered twice (desktop + mobile)
- `is:inline` prevents Astro script deduplication
- `data-*` attributes used instead of `id` for scoped queries
- All instances synced on toggle to maintain visual agreement

### Browser Support
- Modern browsers only (last 2 versions of Chrome/Firefox/Safari)
- Mobile browsers prioritized
- CSS custom properties and `prefers-color-scheme` widely supported

### No JavaScript Frameworks
- Vanilla JS only (no React, no Astro client-side directives)
- Theme toggle uses standard DOM APIs and event listeners

## Success Metrics

- Theme switch completes within 50ms of toggle click
- No flash of incorrect theme on page load
- Theme persists across browser sessions
- OS preference correctly detected on first visit
- All existing components render correctly in both themes without modification
- Feature works on all target browsers (Chrome, Firefox, Safari, mobile)

## Open Questions

None — all requirements clarified in design spec and through stakeholder questions.

---

**Related Documents:**
- Design Spec: `docs/superpowers/specs/2026-04-18-dark-light-mode-design.md`
- PRD: `tasks/prd-portfolio-site.md` (main portfolio PRD)
