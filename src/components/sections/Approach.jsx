import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "../../theme/tokens";
import { siteContent } from "../../data/content";
import Button from "../ui/Button";
import SerpentGlyph from "../ui/SerpentGlyph";

// =============================================================================
// APPROACH — Full-width media panel between Services and Systems.
// =============================================================================
// Editorial break in the page rhythm. Uses a video/image background slot
// (same pattern as the hero) with a duotone emerald overlay and an editorial
// quote + short copy + CTA on top.
//
// To activate the media: drop /public/approach.mp4 (or .jpg) into public/
// and flip HAS_APPROACH_MEDIA below to true.
// =============================================================================

const HAS_APPROACH_MEDIA = true; // flip to true once /public/approach.mp4 exists
const APPROACH_VIDEO_SRC = "/approach.mp4";
const APPROACH_POSTER_SRC = "/approach.jpg";

export default function Approach() {
  const reduceMotion = useReducedMotion();
  const c = siteContent.approach;

  return (
    <section
      id="approach"
      className="relative overflow-hidden
                 min-h-[80vh] sm:min-h-[85vh] flex items-center
                 my-16 sm:my-24"
    >
      {/* ─── Background media ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {HAS_APPROACH_MEDIA ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={APPROACH_POSTER_SRC}
          >
            <source src={APPROACH_VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          // Placeholder — visible label so the slot is obvious in design review
          <div className="h-full w-full bg-brand-deep flex items-center justify-center">
            <div className="text-center">
              <SerpentGlyph
                size={120}
                className="text-brand-wine/20 mx-auto mb-4"
              />
              <p
                className="font-label text-[10px] sm:text-xs uppercase
                            tracking-[0.25em] text-brand-cream/60"
              >
                Approach Media Slot
              </p>
              <p className="mt-2 font-sans text-[10px] text-brand-gray/40">
                drop /public/approach.mp4 — 1920×1080, dark editorial
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ─── Duotone emerald overlay ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] duotone-wine pointer-events-none"
      />
      {/* Extra darkening at the edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] hero-vignette pointer-events-none"
      />
      {/* Subtle grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[3] hero-grain pointer-events-none"
      />

      {/* ─── Top + bottom hairlines for editorial framing ─────────────────── */}
      <div className="absolute inset-x-0 top-0 z-[4] h-px bg-cream-line opacity-60" />
      <div className="absolute inset-x-0 bottom-0 z-[4] h-px bg-cream-line opacity-60" />

      {/* ─── Content ──────────────────────────────────────────────────────── */}
      <div
        className={`${tokens.spacing.container} relative z-10 w-full
                       text-center sm:text-left`}
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={tokens.animation.transition}
            className="flex items-center gap-3 mb-6 justify-center sm:justify-start"
          >
            <span className="block w-10 h-px bg-brand-cream/60" />
            <p className={tokens.typography.label}>{c.label}</p>
            <span className="block w-10 h-px bg-brand-cream/60 sm:hidden" />
          </motion.div>

          <motion.h2
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { clipPath: "inset(0 100% 0 0)", opacity: 0 }
            }
            whileInView={
              reduceMotion
                ? { opacity: 1 }
                : { clipPath: "inset(0 0% 0 0)", opacity: 1 }
            }
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
            className={`${tokens.typography.h2} mb-8 text-brand-ivory
                        font-serif italic`}
          >
            {c.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...tokens.animation.transition, delay: 0.15 }}
            className={`${tokens.typography.body} text-brand-ivory/80 mb-10
                        max-w-xl mx-auto sm:mx-0`}
          >
            {c.body}
          </motion.p>

          {/* Pull quote in serif italic — mythological tone */}
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...tokens.animation.transition, delay: 0.3 }}
            className="relative pl-6 mb-10 mx-auto sm:mx-0 max-w-md
                       border-l-2 border-brand-cream/60"
          >
            <p
              className="font-serif italic text-lg sm:text-xl text-brand-cream
                          leading-snug"
            >
              "{c.quote}"
            </p>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...tokens.animation.transition, delay: 0.45 }}
            className="flex justify-center sm:justify-start"
          >
            <Button href={c.ctaLink} variant="secondary">
              {c.cta}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
