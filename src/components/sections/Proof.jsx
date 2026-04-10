import React from "react";
import { motion } from "framer-motion";
import { tokens } from "../../theme/tokens";
import { siteContent } from "../../data/content";
import SerpentGlyph from "../ui/SerpentGlyph";

// Social Proof / testimonials.
//
// Editorial framing: top + bottom gold hairlines, emerald section tint,
// large open-quote glyph, slow fade-up reveal per testimonial.
export default function SocialProof() {
  return (
    <section
      className="py-20 sm:py-28 bg-brand-surface/40 relative
                 section-tint-wine overflow-hidden"
    >
      {/* Hairline gold separators top + bottom for editorial framing */}
      <div className="absolute inset-x-0 top-0 h-px bg-cream-line opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-cream-line opacity-60" />

      <div className={`${tokens.spacing.container} relative`}>
        {/* Section opener with serpent flourish */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={tokens.animation.transition}
          className="flex flex-col items-center mb-14 sm:mb-20"
        >
          <div
            className="flex items-center gap-3 mb-4"
            aria-hidden="true"
          >
            <span className="block w-10 h-px bg-brand-cream/60" />
            <SerpentGlyph size={14} className="text-brand-cream/80" />
            <span className="block w-10 h-px bg-brand-cream/60" />
          </div>
          <p className={`${tokens.typography.label} text-center`}>
            {siteContent.socialProof.label}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16
                        max-w-5xl mx-auto">
          {siteContent.socialProof.testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                ...tokens.animation.transition,
                delay: i * 0.18,
              }}
              className="text-center px-2 group"
            >
              {/* Decorative open quote in gold serif */}
              <span
                aria-hidden="true"
                className="block font-serif text-6xl text-brand-cream/40
                           leading-none mb-4
                           transition-colors duration-700
                           group-hover:text-brand-cream/70"
              >
                &ldquo;
              </span>
              <blockquote className="font-serif italic text-xl sm:text-2xl
                                     text-brand-ivory mb-8 leading-snug">
                {t.quote}
              </blockquote>
              {/* Hairline + author */}
              <div className="flex items-center justify-center gap-3
                              mb-2">
                <span className="block w-8 h-px bg-brand-cream/40" />
                <SerpentGlyph
                  size={10}
                  variant="line"
                  className="text-brand-cream/60"
                />
                <span className="block w-8 h-px bg-brand-cream/40" />
              </div>
              <figcaption className="font-label text-[10px] sm:text-xs
                                     uppercase tracking-[0.25em]
                                     text-brand-gray">
                {t.author}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
