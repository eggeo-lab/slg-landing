import React from "react";
import { motion } from "framer-motion";
import { tokens } from "../../theme/tokens";
import { siteContent } from "../../data/content";
import SerpentGlyph, { SerpentMark } from "../ui/SerpentGlyph";

// Systems — methodology section. Two columns on desktop:
//   left = label + headline + bulleted method,
//   right = numbered capabilities list with hover state.
//
// Visual: faint serpent watermark, gold hairline divider above,
// emerald glow on bullet check icons.
export default function Systems() {
  return (
    <section className={`${tokens.spacing.section} relative section-tint-cream`}>
      {/* Faint serpent watermark — left side */}
      <SerpentMark
        className="absolute -left-16 top-1/2 -translate-y-1/2
                   w-[420px] h-[420px] text-brand-wine/[0.05]
                   pointer-events-none hidden lg:block"
      />

      <div className={`${tokens.spacing.container} relative`}>
        {/* Top hairline + label divider */}
        <div className="flex items-center gap-4 mb-16 sm:mb-24">
          <span className="block h-px flex-1 bg-cream-line" />
          <SerpentGlyph size={14} className="text-brand-cream" />
          <span className="block h-px flex-1 bg-cream-line" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          {/* ─── Left column: label, headline, method bullets ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={tokens.animation.transition}
          >
            <div className="flex items-center gap-3 mb-4">
              <SerpentGlyph size={14} className="text-brand-cream" />
              <p className={tokens.typography.label}>
                {siteContent.systems.label}
              </p>
            </div>

            <h2 className={`${tokens.typography.h2} mb-8 sm:mb-10`}>
              Systems behind
              <br />
              <span className="italic text-brand-cream">every cycle.</span>
            </h2>

            <ul className="space-y-5 sm:space-y-6">
              {siteContent.systems.bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    ...tokens.animation.transition,
                    delay: 0.1 + i * 0.08,
                  }}
                  className="group flex items-start gap-4"
                >
                  {/* Custom bullet — small emerald square that rotates 45° */}
                  <span
                    aria-hidden="true"
                    className="mt-2 shrink-0 w-2 h-2 bg-brand-wine
                               rotate-45 transition-transform duration-500
                               group-hover:rotate-[225deg]
                               group-hover:bg-brand-cream"
                  />
                  <span
                    className={`${tokens.typography.body}
                                group-hover:text-brand-ivory
                                transition-colors duration-500`}
                  >
                    {bullet}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ─── Right column: capabilities list ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...tokens.animation.transition, delay: 0.15 }}
            className="lg:border-l lg:border-brand-border lg:pl-16
                       border-t border-brand-border/60 pt-10 lg:pt-0
                       lg:border-t-0 flex flex-col justify-center"
          >
            <p className={`${tokens.typography.label} mb-8 opacity-70`}>
              Capabilities
            </p>

            <div className="space-y-6 sm:space-y-7">
              {siteContent.systems.capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    ...tokens.animation.transition,
                    delay: 0.25 + i * 0.08,
                  }}
                  className="group cursor-default relative"
                >
                  {/* Hover emerald hairline that grows from left */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-4 top-1/2 -translate-y-1/2
                               w-0 h-px bg-brand-wine
                               transition-all duration-700
                               group-hover:w-3"
                  />
                  <h4 className="font-display text-xl sm:text-2xl
                                 text-brand-gray group-hover:text-brand-ivory
                                 group-hover:translate-x-1
                                 transition-all duration-500
                                 tracking-wide">
                    <span className="text-brand-cream tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mx-3 text-brand-cream/40">/</span>
                    {cap}
                  </h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
