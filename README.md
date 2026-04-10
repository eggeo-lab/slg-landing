# SLG — Exotic Garden Concierge

Marketing site for **SLG**, a cultivation support concierge serving licensed commercial cannabis operators in Los Angeles, California.

> Nothing on this site is offered for sale. SLG provides services to licensed operators only. See the in-app footer disclaimer for full compliance language.

## Stack

- React 18 + Vite 5
- Tailwind CSS 3
- Framer Motion 11
- lucide-react

## Install & run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview production build
```

## Project structure

```
src/
  components/
    sections/
      Nav.jsx           navbar + fullscreen overlay menu
      Hero.jsx          hero with animated decorative SVG
      Services.jsx      14 cultivation disciplines (rendered from content.js)
      Systems.jsx       methodology + capabilities
      Proof.jsx         testimonials
      Contact.jsx       inquiry form (licensed operators only)
      Footer.jsx        legal disclaimer + compliance notice
      Drops.jsx         [FUTURE PHASE] merch ecommerce — not mounted yet
    ui/
      Button.jsx
      Divider.jsx
      Noise.jsx         grain texture overlay
  data/
    content.js          all marketing copy + services + legal text
    products.json       [FUTURE PHASE] merch product mock data
  styles/
    index.css           tailwind entrypoint
  theme/
    tokens.js           typography + spacing tokens
```

## Editing copy

All marketing copy lives in `src/data/content.js`. Edit there, never in the components.

The 14 services rendered by `Services.jsx` come from `siteContent.services`. Reorder, rename, or add new entries in that array — the UI will follow.

The legal disclaimer block in the footer is driven by `siteContent.legal.longDisclaimer`. Update those paragraphs if compliance language changes.

## Design tokens

Colors and font families are defined in two places that must stay in sync:
- `tailwind.config.cjs` → Tailwind utility classes (`bg-brand-bg`, `text-brand-gold`, etc.)
- `src/theme/tokens.js` → typography/spacing class strings used by sections

## Contact form — email delivery

The inquiry form on the contact section is wired to **Formspree**, a no-backend
form relay. Submissions are POSTed to a Formspree endpoint, and Formspree
forwards every submission to the inbox you configured.

### One-time setup

1. Sign up at [https://formspree.io](https://formspree.io) using the
   destination email (e.g. `studiolagorgona@gmail.com`).
2. Create a new form. Formspree will give you an endpoint that looks like:
   `https://formspree.io/f/abcdwxyz`.
3. Copy `.env.example` to `.env` in the project root:
   ```bash
   cp .env.example .env
   ```
4. Open `.env` and replace the placeholder with your real Formspree endpoint:
   ```
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz
   ```
5. Restart the dev server (`npm run dev`) — Vite only reads `.env` at startup.
6. Submit a test through the form. Formspree will email you a confirmation
   the first time; click the link to activate the inbox. After that, every
   submission lands directly in your email.

### Testing the form locally

- **Without `.env`**: the form still "works" visually (it shows the success
  state) but logs a warning to the browser console and does NOT send anything.
  Useful for design iteration without spamming the inbox.
- **With `.env` configured**: submit through the live form; check the inbox
  within a minute. Formspree's free tier allows 50 submissions/month — plenty
  for an inquiry form.
- Test cases to run:
  - Submit with all fields filled → should land in the inbox.
  - Submit with the email field blank → browser native validation kicks in.
  - Open DevTools → Network tab → submit → look for the POST to
    `formspree.io/f/...`. A 200 response means success.

### Switching providers later

If you outgrow Formspree, the contract is simple: any provider that accepts
a `multipart/form-data` POST and returns 200 on success will drop in. Open
`src/components/sections/Contact.jsx` and replace `ENDPOINT`. Alternatives:

- **Web3Forms** (250/month free) — same shape, different URL.
- **EmailJS** — requires their SDK, slightly more setup.
- **Resend / SendGrid + a serverless function** (Vercel / Netlify) — full
  control, requires writing an API route.

## Editing legal copy

All Terms / Privacy / Licensing copy lives in `src/data/content.js` under
`siteContent.legal.documents`. Edit there — the footer modals re-render
automatically. The full copy is **boilerplate** and should be reviewed by
counsel before public launch.

## Compliance notes

- Site must keep the licensing disclaimer visible in the footer at all times.
- Contact form requires a CA license number field — do not remove it.
- No cannabis products or imagery of cannabis flower/products should be added without legal review.
- The site is **mature-rated** (`<meta name="rating" content="mature">` in `index.html`).

## Future phase — Merch ecommerce

A merch line is planned. The architecture is already prepared for it:

- `src/data/products.json` — mock product data with the schema the store will use (id, name, colorway, price, sizes, stockBySize, badge, imageLabel)
- `src/components/sections/Drops.jsx` — fully built product grid component, currently **not** imported by `App.jsx`. Mount it when the merch line is ready.
- Semantic CSS classes already in place: `.product-card`, `.product-grid`, `.product-price`, `.product-badge`, `.product-variants`, `.product-stock`
- TODO markers throughout `Drops.jsx` and `App.jsx` flag the integration points

### To launch the merch phase
1. Replace `src/data/products.json` with real product data (or wire to an API).
2. Add real product imagery to `/public` and reference it in the JSON.
3. Import `Drops` in `App.jsx` and place it where you want it in the page flow.
4. Add cart state (Zustand or Context).
5. Add Stripe Checkout (or Shopify Storefront API as a backend).
6. Add a product detail route (`react-router-dom` or migrate to Next.js if SSR/SEO is critical).
7. **Critical:** revisit the legal footer. Selling merch is independent of cannabis services, but the disclaimer must continue to make clear that cannabis products are not sold.
