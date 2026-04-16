# Design Language: Vlad Burca | Product Designer & Design Systems Lead

> Extracted from `https://vladburca.com` on April 16, 2026
> 266 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#e2e2f0` | rgb(226, 226, 240) | hsl(240, 32%, 91%) | 374 |
| Secondary | `#0000ee` | rgb(0, 0, 238) | hsl(240, 100%, 47%) | 78 |
| Accent | `#1a1a2e` | rgb(26, 26, 46) | hsl(240, 28%, 14%) | 5 |

### Background Colors

Used on large-area elements: `#1a1a2e`, `#0a0a14`, `#252540`

### Text Colors

Text color palette: `#e2e2f0`, `#6a6a8a`, `#e87c7c`, `#8888aa`, `#e8a87c`, `#7ec89b`, `#0000ee`

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#e2e2f0` | text, border | 374 |
| `#0000ee` | text, border | 78 |
| `#8888aa` | text, border | 38 |
| `#e8a87c` | text, border | 20 |
| `#6a6a8a` | text, border | 8 |
| `#1a1a2e` | background | 5 |
| `#e87c7c` | text, border | 4 |
| `#3a3a5c` | border | 4 |
| `#7ec89b` | text, border | 4 |
| `#252540` | background | 2 |
| `#ff5f57` | background | 2 |
| `#febc2e` | background | 2 |
| `#28c840` | background | 2 |
| `#5a5a8a` | border | 2 |
| `#0a0a14` | background | 1 |

## Typography

### Font Families

- **JetBrains Mono** — used for all (264 elements)
- **monospace** — used for all (2 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 36px | 2.25rem | 700 | normal | normal | h1 |
| 27px | 1.6875rem | 700 | normal | normal | h2 |
| 21.06px | 1.3162rem | 700 | normal | normal | h3 |
| 18px | 1.125rem | 400 | normal | normal | html, head, meta, title |
| 16.2px | 1.0125rem | 400 | normal | normal | div, span, input |
| 15.3px | 0.9563rem | 400 | normal | 0.5px | div, span, h2 |
| 14.4px | 0.9rem | 400 | normal | normal | a, button, div, span |
| 9.9px | 0.6188rem | 700 | 10.89px | 1px | pre |
| 5.04px | 0.315rem | 400 | 5.292px | normal | pre |

### Heading Scale

```css
h1 { font-size: 36px; font-weight: 700; line-height: normal; }
h2 { font-size: 27px; font-weight: 700; line-height: normal; }
h3 { font-size: 21.06px; font-weight: 700; line-height: normal; }
h2 { font-size: 18px; font-weight: 400; line-height: normal; }
h2 { font-size: 15.3px; font-weight: 400; line-height: normal; }
```

### Body Text

```css
body { font-size: 18px; font-weight: 400; line-height: normal; }
```

### Font Weights in Use

`400` (236x), `700` (27x), `600` (3x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-4 | 4px | 0.25rem |
| spacing-8 | 8px | 0.5rem |
| spacing-12 | 12px | 0.75rem |
| spacing-16 | 16px | 1rem |
| spacing-20 | 20px | 1.25rem |
| spacing-24 | 24px | 1.5rem |
| spacing-28 | 28px | 1.75rem |
| spacing-32 | 32px | 2rem |
| spacing-40 | 40px | 2.5rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| sm | 4px | 3 |
| md | 8px | 1 |
| lg | 12px | 2 |
| full | 50px | 6 |

## Box Shadows

**xl** — blur: 80px
```css
box-shadow: rgba(0, 0, 0, 0.5) 0px 25px 80px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px;
```

## CSS Custom Properties

### Colors

```css
--bg: #1a1a2e;
--bg-window: #252540;
--bg-darker: #1e1e35;
--border: #3a3a5c;
--border-dashed: #5a5a8a;
--text-muted: #6a6a8a;
--accent: #e8a87c;
--accent-bright: #f0c4a0;
```

### Typography

```css
--text: #e2e2f0;
--text-dim: #8888aa;
```

### Other

```css
--green: #7ec89b;
--red: #e87c7c;
--blue: #7caae8;
--yellow: #e8d87c;
--purple: #b88ce8;
--cyan: #7ce8d8;
--dot-red: #ff5f57;
--dot-yellow: #febc2e;
--dot-green: #28c840;
```

## Breakpoints

| Name | Value | Type |
|------|-------|------|
| xs | 360px | max-width |
| sm | 480px | max-width |
| sm | 700px | max-width |

## Transitions & Animations

**Durations:** `0.5s`, `0.3s`, `0.4s`, `0.2s`, `0.15s`

### Common Transitions

```css
transition: all;
transition: filter 0.5s, transform 0.5s;
transition: opacity 0.3s;
transition: opacity 0.4s, visibility 0.4s;
transition: opacity 0.2s;
transition: border-color 0.2s, background 0.2s, transform 0.15s;
transition: max-width 0.3s, min-height 0.3s, max-height 0.3s, border-radius 0.3s, box-shadow 0.3s;
```

### Keyframe Animations

**fadeSlideIn**
```css
@keyframes fadeSlideIn {
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0px); }
}
```

**staggerReveal**
```css
@keyframes staggerReveal {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0px); }
}
```

**blink**
```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

**thinkingDot**
```css
@keyframes thinkingDot {
  0%, 20% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
}
```

**thinkingPulse**
```css
@keyframes thinkingPulse {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (3 instances)

```css
.button {
  color: rgb(232, 168, 124);
  font-size: 14.4px;
  font-weight: 400;
  padding-top: 6px;
  padding-right: 14px;
  border-radius: 4px;
}
```

### Cards (2 instances)

```css
.card {
  background-color: rgb(37, 37, 64);
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 25px 80px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Inputs (1 instances)

```css
.input {
  color: rgb(226, 226, 240);
  border-color: rgb(226, 226, 240);
  border-radius: 0px;
  font-size: 16.2px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (41 instances)

```css
.link {
  color: rgb(0, 0, 238);
  font-size: 18px;
  font-weight: 400;
}
```

### Modals (1 instances)

```css
.modal {
  background-color: rgba(10, 10, 20, 0.85);
  border-radius: 0px;
  padding-top: 20px;
  padding-right: 20px;
}
```

## Layout System

**0 grid containers** and **16 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 480px | 0px |
| 960px | 0px |
| 600px | 0px |

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 12x |
| row/wrap | 1x |
| column/nowrap | 3x |

**Gap values:** `12px`, `16px`, `8px`

## Accessibility (WCAG 2.1)

**Overall Score: 57%** — 8 passing, 6 failing color pairs

### Failing Color Pairs

| Foreground | Background | Ratio | Level | Used On |
|------------|------------|-------|-------|---------|
| `#e2e2f0` | `#ff5f57` | 2.33:1 | FAIL | div (2x) |
| `#e2e2f0` | `#febc2e` | 1.32:1 | FAIL | div (2x) |
| `#e2e2f0` | `#28c840` | 1.74:1 | FAIL | div (2x) |

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#e2e2f0` | `#1e1e35` | 12.67:1 | AAA |
| `#e2e2f0` | `#252540` | 11.55:1 | AAA |
| `#e2e2f0` | `#1a1a2e` | 13.3:1 | AAA |
| `#e2e2f0` | `#0a0a14` | 15.35:1 | AAA |

## Design System Score

**Overall: 85/100 (Grade: B)**

| Category | Score |
|----------|-------|
| Color Discipline | 85/100 |
| Typography Consistency | 85/100 |
| Spacing System | 100/100 |
| Shadow Consistency | 100/100 |
| Border Radius Consistency | 85/100 |
| Accessibility | 57/100 |
| CSS Tokenization | 75/100 |

**Strengths:** Tight, disciplined color palette, Consistent typography system, Well-defined spacing scale, Clean elevation system, Consistent border radii, Good CSS variable tokenization

**Issues:**
- 6 WCAG contrast failures

## Z-Index Map

**4 unique z-index values** across 3 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| dropdown | 100,200 | div.c.l.o.s.e.-.o.v.e.r.l.a.y, canvas, canvas |
| sticky | 10,10 | div.a.u.t.o.c.o.m.p.l.e.t.e |
| base | -1,-1 | div.w.a.l.l.p.a.p.e.r |

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| JetBrains Mono | self-hosted | 400, 600, 700 | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| hero | 1 | objectFit: cover, borderRadius: 0px, shape: square |

**Aspect ratios:** 3:2 (1x)

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `JetBrains Mono` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
