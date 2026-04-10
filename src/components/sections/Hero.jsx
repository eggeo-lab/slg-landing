import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "../../theme/tokens";
import { siteContent } from "../../data/content";
import Button from "../ui/Button";
import SerpentGlyph from "../ui/SerpentGlyph";

// =============================================================================
// HERO — Editorial / mythological / B2B luxury concierge
// =============================================================================
// Background media slot — flip HAS_HERO_MEDIA to true once /public/hero.mp4
// exists. Mobile + desktop play the same muted, looped, playsinline video.
// Recommended specs: 1920×1080, h264, < 5 MB, no audio track.
//
// Visual layering (back → front):
//   1. Background media (video / image / radial fallback)
//   2. Duotone emerald gradient overlay
//   3. Vignette
//   4. Hero grain
//   5. Decorative botanical SVG paths
//   6. Content
//   7. Scroll indicator
// =============================================================================

const HAS_HERO_MEDIA = true;
const HERO_VIDEO_SRC = "/hero.mp4";
const HERO_POSTER_SRC = "/hero.jpg";

const REVEAL_EASE = [0.7, 0, 0.2, 1];

export default function Hero() {
  const headlineParts = siteContent.hero.headline.split("\n");
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex items-center pt-32 overflow-hidden
                 min-h-screen min-h-[100svh] bg-hero-radial"
    >
      {/* ─── 1. Background media ──────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {HAS_HERO_MEDIA ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_POSTER_SRC}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <div className="h-full w-full flex items-center justify-center
                          bg-hero-radial">
            <div className="border border-dashed border-brand-cream/40
                            px-6 py-4 max-w-[80%] text-center">
              <p className="font-label text-[10px] sm:text-xs uppercase
                            tracking-[0.25em] text-brand-cream/80">
                Video / Image Slot
              </p>
              <p className="mt-2 font-sans text-[10px] sm:text-xs
                            text-brand-gray/60">
                1920 × 1080 · 16:9 · drop into /public/hero.mp4
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ─── 2. Duotone emerald + dark gradient overlay ───────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] duotone-wine pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] bg-hero-overlay pointer-events-none"
      />

      {/* ─── 3. Vignette ──────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[3] hero-vignette pointer-events-none"
      />

      {/* ─── 4. Hero film grain ───────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[4] hero-grain pointer-events-none"
      />

      {/* ─── 5. Decorative botanical paths ────────────────────────────────── */}
      {!reduceMotion && (
        <div
          className="absolute inset-0 z-[5] opacity-[0.13] pointer-events-none
                     hidden sm:flex justify-center items-center"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1000 1000"
            className="w-[120%] h-[120%] stroke-brand-cream"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="presentation"
          >
            <motion.path
              d="M-100,500 C100,200 300,800 500,500 C700,200 900,800 1100,500"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              transition={{
                duration: 24,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M-100,600 C150,300 350,900 550,600 C750,300 950,900 1150,600"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.35 }}
              transition={{
                duration: 28,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </svg>
        </div>
      )}

      {/* ─── 6. Content ───────────────────────────────────────────────────── */}
      <div className={`${tokens.spacing.container} relative z-10 w-full`}>
        <div className="max-w-[90vw] mx-auto text-center flex flex-col items-center">
          {/* Botanical flourish above the eyebrow */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="flex items-center gap-3 mb-6 sm:mb-8"
            aria-hidden="true"
          >
            <span className="block w-10 sm:w-14 h-px bg-brand-cream/60" />
            <SerpentGlyph size={20} className="text-brand-cream/80" />
            <span className="block w-10 sm:w-14 h-px bg-brand-cream/60" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, letterSpacing: "0em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`${tokens.typography.label} mb-6 sm:mb-8`}
          >
            {siteContent.hero.label}
          </motion.p>

          {/* Headline — Bebas Neue, clip-path reveal per line */}
          <h1
            className={`${tokens.typography.hero} mb-8 sm:mb-10
                        flex flex-col items-center text-brand-ivory`}
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { clipPath: "inset(0 100% 0 0)", y: 8 }
                }
                animate={
                  reduceMotion
                    ? { opacity: 1 }
                    : { clipPath: "inset(0 0% 0 0)", y: 0 }
                }
                transition={{ duration: 1.2, delay: 0.2, ease: REVEAL_EASE }}
              >
                {headlineParts[0]}
              </motion.span>
            </span>
            {headlineParts[1] && (
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-cream-shimmer"
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { clipPath: "inset(0 100% 0 0)", y: 8 }
                  }
                  animate={
                    reduceMotion
                      ? { opacity: 1 }
                      : { clipPath: "inset(0 0% 0 0)", y: 0 }
                  }
                  transition={{ duration: 1.2, delay: 0.55, ease: REVEAL_EASE }}
                >
                  {headlineParts[1]}
                </motion.span>
              </span>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className={`${tokens.typography.body} max-w-xl mb-10 sm:mb-12
                        text-center text-brand-ivory/80`}
          >
            {siteContent.hero.subcopy}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full
                       sm:w-auto justify-center"
          >
            <Button
              href={siteContent.hero.primaryLink}
              variant="primary"
              className="w-full sm:w-auto"
            >
              {siteContent.hero.primaryCta}
            </Button>
            <Button
              href={siteContent.hero.secondaryLink}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {siteContent.hero.secondaryCta}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* ─── 7. Scroll indicator ─────────────────────────────────────────── */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2
                   z-10 hidden sm:flex flex-col items-center gap-2
                   text-brand-cream/70 hover:text-brand-cream transition-colors"
      >
        <span className="font-label text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <span
          className="block w-px h-10 bg-gradient-to-b from-brand-cream/70
                     to-transparent animate-pulse-soft"
        />
      </a>
    </section>
  );
}
