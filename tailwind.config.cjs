/** @type {import('tailwindcss').Config} */
// NOTE: this file is .cjs and MUST use module.exports — `export default` is
// invalid in CommonJS and silently breaks the Tailwind theme extension.
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ─── Color system — Riot Atelier / YSL editorial direction ──────────
      // Studio La Gorgona / SLG / Exotic Garden Concierge.
      // Pillars: mystery, mythology, exclusivity. Gorgon / serpent imagery.
      //
      // Palette intent (overrides the original PDF emerald + gold which read
      // too "saas-y" / canary): warm near-black ground, deep wine as the
      // primary brand accent (replaces emerald), warm cream as the metallic
      // hairline / typographic accent (replaces gold). Far more YSL-Riot,
      // far less spa-website.
      colors: {
        brand: {
          // Backgrounds — warm, not pure neutral black
          bg:        '#0A0707',
          surface:   '#141010',
          deep:      '#050403',

          // Primary brand accent — DEEP WINE / OXBLOOD
          // Used for CTA fills, hover accents, section watermarks.
          wine:        '#5C0A1A',
          'wine-deep': '#3A0610',
          'wine-bright': '#7A1428',
          'wine-tint': 'rgba(92,10,26,0.10)',

          // Metallic detail — soft warm CREAM (no canary yellow).
          // Used for hairlines, eyebrow labels, italic accent words.
          cream:       '#EDE4D3',
          'cream-dim': '#A89A85',

          // CTA red — kept for high-energy moments and form errors.
          red:        '#D72638',
          'red-dark': '#9C1B28',

          // Neutrals — warm ivories + taupe gray
          ivory:      '#F2EBDD',
          gray:       '#A39A8E',
          'gray-dark':'#5C544B',
          border:     '#1F1A18',
        }
      },

      fontFamily: {
        // Body — clean, neutral, structured
        sans:  ['Inter', 'sans-serif'],

        // Serif elegante — closest free substitute for "The Seasons" from
        // the brand PDF. Cormorant Garamond is delicate, refined, editorial.
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],

        // Display — high-impact headlines. The brand PDF specifies "Niagara
        // Regular"; Bebas Neue is the closest widely-available substitute
        // (condensed, geometric display sans, all caps).
        display: ['"Bebas Neue"', 'Oswald', 'sans-serif'],

        // Label / structured marketing text — Oswald per the brand PDF.
        label:   ['Oswald', 'Inter', 'sans-serif'],
      },

      fontSize: {
        // Fluid typography — clamp(min, preferred, max).
        'fluid-label': ['clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem)',  { lineHeight: '1.4', letterSpacing: '0.25em' }],
        'fluid-body':  ['clamp(0.95rem, 0.9rem + 0.3vw, 1.125rem)', { lineHeight: '1.7' }],
        'fluid-h2':    ['clamp(1.875rem, 1.4rem + 2.4vw, 3rem)',    { lineHeight: '1.05' }],
        'fluid-hero':  ['clamp(3.25rem, 1.5rem + 8vw, 8rem)',       { lineHeight: '0.92', letterSpacing: '0.005em' }],
        'fluid-mega':  ['clamp(4rem, 2rem + 10vw, 10rem)',          { lineHeight: '0.9',  letterSpacing: '0.01em'  }],
      },

      letterSpacing: {
        tightest: '-.075em',
        widest:   '.25em',
        wider:    '.18em',
      },

      backgroundImage: {
        'hero-radial':  'radial-gradient(ellipse at center, #1a1414 0%, #0A0707 70%, #050403 100%)',
        'hero-overlay': 'linear-gradient(to bottom, rgba(10,7,7,0.30) 0%, rgba(10,7,7,0.55) 50%, rgba(10,7,7,0.94) 100%)',
        // Hairlines — warm cream gradient, soft on the edges
        'cream-line':   'linear-gradient(to right, transparent, rgba(237,228,211,0.40), transparent)',
        'wine-line':    'linear-gradient(to right, transparent, rgba(122,20,40,0.55), transparent)',
        // Duotone gradients for media overlays
        'duotone-wine': 'linear-gradient(135deg, rgba(92,10,26,0.55) 0%, rgba(10,7,7,0.85) 100%)',
        'duotone-red':  'linear-gradient(135deg, rgba(215,38,56,0.45) 0%, rgba(10,7,7,0.85) 100%)',
      },

      keyframes: {
        'fade-up':   {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'page-in':   {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4', transform: 'translateY(0)' },
          '50%':      { opacity: '1',   transform: 'translateY(6px)' },
        },
        'serpent-drift': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':      { transform: 'translateY(-8px) rotate(2deg)' },
        },
      },
      animation: {
        'fade-up':       'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'page-in':       'page-in 0.5s ease-out both',
        'pulse-soft':    'pulse-soft 2.4s ease-in-out infinite',
        'serpent-drift': 'serpent-drift 12s ease-in-out infinite',
      },

      spacing: {
        'screen-svh': '100svh',
      },
    },
  },
  plugins: [],
}
