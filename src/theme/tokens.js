// Design tokens — single source of truth for typography & spacing strings
// reused across sections. Color tokens live in tailwind.config.cjs so the
// `bg-brand-*` / `text-brand-*` utilities pick them up.
//
// Palette intent: Riot Atelier / YSL editorial — wine + cream over warm
// near-black. Replaces the original PDF emerald-and-gold direction.
//
// Font system (per official Branding PDF):
//   font-display → Bebas Neue (Niagara substitute) — hero headlines, big impact
//   font-serif   → Cormorant Garamond (The Seasons substitute) — section h2s
//   font-label   → Oswald — eyebrows, labels, structured text
//   font-sans    → Inter — body copy
export const tokens = {
  colors: {
    background: '#0A0707',
    surface:    '#141010',
    primary:    '#F2EBDD',
    secondary:  '#A39A8E',
    cream:      '#EDE4D3', // metallic / hairline accent
    wine:       '#5C0A1A', // primary brand accent
    red:        '#D72638',
    border:     '#1F1A18',
  },
  typography: {
    // Hero — Bebas Neue, fluid, condensed display
    hero:  'font-display text-fluid-hero uppercase',
    // Section H2 — Cormorant Garamond serif, fluid
    h2:    'font-serif text-fluid-h2 leading-[1.05] text-brand-ivory',
    // Body — Inter, fluid
    body:  'font-sans text-fluid-body text-brand-gray font-light',
    // Eyebrow label — Oswald, all caps, cream
    label: 'font-label text-fluid-label text-brand-cream font-medium uppercase',
  },
  spacing: {
    section:   'py-16 sm:py-20 md:py-28',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 md:px-12',
  },
  animation: {
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};
