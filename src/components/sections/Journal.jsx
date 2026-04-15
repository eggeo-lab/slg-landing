import React from "react";
import { motion } from "framer-motion";
import { tokens } from "../../theme/tokens";
import { siteContent } from "../../data/content";
import SerpentGlyph from "../ui/SerpentGlyph";

// =============================================================================
// JOURNAL — editorial magazine grid (Chrome Hearts inspired)
// =============================================================================
// Asymmetric tile layout that mixes product/field imagery with typographic
// cards and pull quotes. On desktop it's a 12-col grid with tiles spanning
// different widths + aspect ratios. On mobile everything stacks into a
// single column that stays scannable.
//
// Content lives in siteContent.journal.items (src/data/content.js). Each
// item has:
//   kind:    "image" | "quote" | "text"
//   size:    "tall" | "square" | "wide"    (controls grid span + aspect)
//   image:   relative path under /public (e.g. "journal/01.jpg")
//   caption: small label shown in the corner of image tiles
//   title:   tile headline (appears on hover on image tiles)
//   quote:   pull-quote body (for kind:"quote")
//   eyebrow: label above the body (for kind:"text")
//   body:    main copy (for kind:"text")
//
// If an image path is missing or fails to load, the tile falls back to a
// dark gradient + serpent watermark so nothing looks broken.
// =============================================================================

// Grid size → desktop column span + aspect ratio
const sizeMap = {
  tall:   { span: "md:col-span-4 md:row-span-2", aspect: "aspect-[3/4]" },
  square: { span: "md:col-span-4",               aspect: "aspect-square" },
  wide:   { span: "md:col-span-8",               aspect: "aspect-[16/9]" },
};

// BASE_URL prefix so images work on GitHub Pages sub-paths.
const withBase = (p) => `${import.meta.env.BASE_URL}${p}`;

export default function Journal() {
  const { journal } = siteContent;

  return (
    <section
      id="journal"
      className={`${tokens.spacing.section} relative section-tint-cream`}
    >
      {/* Top hairline framing */}
      <div className="absolute inset-x-0 top-0 h-px bg-cream-line opacity-60" />

      <div className={tokens.spacing.container}>
        {/* ─── Section header ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={tokens.animation.transition}
          className="mb-10 sm:mb-16 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-3 mb-4" aria-hidden="true">
            <span className="block w-10 h-px bg-brand-cream/60" />
            <SerpentGlyph size={14} className="text-brand-cream/80" />
            <span className="block w-10 h-px bg-brand-cream/60" />
          </div>
          <p className={`${tokens.typography.label} mb-3`}>
            {journal.label}
          </p>
          <h2 className={`${tokens.typography.h2} font-serif italic`}>
            {journal.headline}
          </h2>
          <p className={`${tokens.typography.body} mt-4 max-w-xl`}>
            {journal.subcopy}
          </p>
        </motion.div>

        {/* ─── Magazine grid ────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-12
                     gap-4 sm:gap-5 md:gap-6
                     auto-rows-auto"
        >
          {journal.items.map((item, i) => (
            <JournalTile key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tile ────────────────────────────────────────────────────────────────
function JournalTile({ item, index }) {
  const { span, aspect } = sizeMap[item.size] || sizeMap.square;

  // Common motion props — staggered reveal as user scrolls.
  const motionProps = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      ...tokens.animation.transition,
      delay: (index % 3) * 0.08,
    },
  };

  // ─── IMAGE tile ─────────────────────────────────────────────────────────
  if (item.kind === "image") {
    return (
      <motion.figure
        {...motionProps}
        className={`${span} ${aspect} relative overflow-hidden
                    bg-brand-surface group cursor-pointer`}
      >
        {/* Image (falls back to gradient if missing) */}
        <img
          src={withBase(item.image)}
          alt={item.title || item.caption || ""}
          loading="lazy"
          // If the image fails to load, hide it so the fallback shows.
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="absolute inset-0 w-full h-full object-cover
                     transition-transform duration-[1200ms] ease-out
                     group-hover:scale-105"
        />

        {/* Fallback gradient + serpent watermark (always under image) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br
                     from-brand-wine/30 via-brand-bg to-brand-deep
                     flex items-center justify-center"
        >
          <SerpentGlyph
            size={48}
            className="text-brand-cream/20"
          />
        </div>

        {/* Duotone darken overlay on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 duotone-wine opacity-40
                     group-hover:opacity-60
                     transition-opacity duration-700"
        />

        {/* Corner caption — top-left, always visible */}
        {item.caption && (
          <figcaption
            className="absolute top-4 left-4 z-10 font-label
                       text-[10px] tracking-[0.25em] uppercase
                       text-brand-cream/80"
          >
            {item.caption}
          </figcaption>
        )}

        {/* Title — bottom, slides up on hover */}
        {item.title && (
          <div
            className="absolute bottom-0 inset-x-0 z-10
                       p-4 sm:p-6
                       translate-y-2 group-hover:translate-y-0
                       transition-transform duration-700
                       ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <div className="h-px w-8 bg-brand-cream/70 mb-3
                            transition-all duration-700
                            group-hover:w-16" />
            <p className="font-serif italic text-lg sm:text-2xl
                          text-brand-ivory leading-tight">
              {item.title}
            </p>
          </div>
        )}
      </motion.figure>
    );
  }

  // ─── QUOTE tile ─────────────────────────────────────────────────────────
  if (item.kind === "quote") {
    return (
      <motion.blockquote
        {...motionProps}
        className={`${span} ${aspect} relative
                    border border-brand-border
                    bg-brand-surface/40
                    flex items-center justify-center
                    p-8 sm:p-10 text-center
                    group hover:bg-brand-wine/10
                    transition-colors duration-700`}
      >
        <span
          aria-hidden="true"
          className="absolute top-4 left-6 font-serif text-5xl
                     text-brand-cream/30 leading-none
                     transition-colors duration-700
                     group-hover:text-brand-cream/60"
        >
          &ldquo;
        </span>
        <p className="font-serif italic text-lg sm:text-xl
                      text-brand-ivory leading-snug
                      max-w-[28ch]">
          {item.quote}
        </p>
        <span
          aria-hidden="true"
          className="absolute bottom-4 right-6 font-serif text-5xl
                     text-brand-cream/30 leading-none rotate-180
                     transition-colors duration-700
                     group-hover:text-brand-cream/60"
        >
          &ldquo;
        </span>
      </motion.blockquote>
    );
  }

  // ─── TEXT tile ──────────────────────────────────────────────────────────
  if (item.kind === "text") {
    return (
      <motion.div
        {...motionProps}
        className={`${span} ${aspect} relative
                    border-l-2 border-brand-wine/70
                    bg-brand-surface/40
                    flex flex-col justify-center
                    p-8 sm:p-10
                    group hover:border-brand-cream
                    transition-colors duration-700`}
      >
        {item.eyebrow && (
          <p className="font-label text-[10px] tracking-[0.28em] uppercase
                        text-brand-cream mb-4">
            {item.eyebrow}
          </p>
        )}
        <p className="font-serif italic text-lg sm:text-xl
                      text-brand-ivory leading-snug
                      transition-transform duration-700
                      group-hover:translate-x-1">
          {item.body}
        </p>
        <div className="mt-5">
          <SerpentGlyph
            size={16}
            className="text-brand-cream/60
                       transition-transform duration-700
                       group-hover:translate-x-2"
          />
        </div>
      </motion.div>
    );
  }

  return null;
}
