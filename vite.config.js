import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages deploys this site under a sub-path that matches the repo name,
// e.g. https://eggeo-lab.github.io/slg-landing/
//
// Vite needs to know that prefix at build time so all asset URLs (CSS, JS,
// /hero.mp4, /SLG-1.png, etc.) get rewritten with it. Locally we want the
// normal "/" base so `npm run dev` keeps working.
//
// If you rename the repo, change REPO_NAME below.
// If you switch to the special repo `eggeo-lab.github.io` (which serves at the
// domain root), set REPO_NAME to '' (empty string).
const REPO_NAME = 'slg-landing';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' && REPO_NAME ? `/${REPO_NAME}/` : '/',
}));
