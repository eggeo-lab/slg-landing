import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "../../theme/tokens";
import { siteContent } from "../../data/content";
import SerpentGlyph from "../ui/SerpentGlyph";

// Services section.
//
// Desktop: editorial 2-column grid with refined hover (left gold accent +
// row tint, no glow shadows).
//
// Mobile: horizontal scroll-snap carousel with AUTO-ADVANCE every 4.5s.
// Auto-advance pauses when the user touches the carousel and resumes after
// a few seconds of inactivity. Respects prefers-reduced-motion.
//
// Layout fix: each card is its own bordered "tile" with consistent height
// and padding so the carousel doesn't look jagged on mobile.
const AUTO_ADVANCE_MS = 4500;
const RESUME_DELAY_MS = 6000;

export default function Services() {
  const services = siteContent.services;
  const reduceMotion = useReducedMotion();

  const scrollerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Track scroll position → active index.
  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || !el.firstElementChild) return;
    const cardWidth = el.firstElementChild.offsetWidth + 16; // gap-4
    const idx = Math.round(el.scrollLeft / cardWidth);
    if (idx !== activeIdx) setActiveIdx(idx);
  }, [activeIdx]);

  // Auto-advance the carousel.
  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setInterval(() => {
      const el = scrollerRef.current;
      if (!el || !el.firstElementChild) return;
      const cardWidth = el.firstElementChild.offsetWidth + 16;
      const next = (activeIdx + 1) % services.length;
      el.scrollTo({ left: next * cardWidth, behavior: "smooth" });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [activeIdx, paused, reduceMotion, services.length]);

  // Pause-on-interaction handlers.
  const handleInteractionStart = useCallback(() => {
    setPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);
  const handleInteractionEnd = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setPaused(false), RESUME_DELAY_MS);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const progressPct = ((activeIdx + 1) / services.length) * 100;

  // Click on a dot/index → jump to that card.
  const goTo = (idx) => {
    const el = scrollerRef.current;
    if (!el || !el.firstElementChild) return;
    const cardWidth = el.firstElementChild.offsetWidth + 16;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
    handleInteractionStart();
    handleInteractionEnd();
  };

  return (
    <section
      id="services"
      className={`${tokens.spacing.section} relative section-tint-wine`}
    >
      {/* Subtle large serpent watermark in the corner */}
      <SerpentGlyph
        size={420}
        variant="line"
        className="absolute -right-20 top-10 text-brand-wine/[0.04]
                   pointer-events-none hidden lg:block"
      />

      <div className={`${tokens.spacing.container} relative`}>
        {/* Section opener */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={tokens.animation.transition}
          className="mb-12 sm:mb-16 max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <SerpentGlyph size={14} className="text-brand-cream" />
            <p className={tokens.typography.label}>Capabilities</p>
          </div>
          <h2 className={`${tokens.typography.h2} mb-6`}>
            Fourteen disciplines.
            <br />
            <span className="italic text-brand-cream">One concierge.</span>
          </h2>
          <p className={tokens.typography.body}>
            End-to-end cultivation support for licensed commercial operators.
            Engage the full program or pull from our menu à la carte.
          </p>
        </motion.div>

        {/* ─── DESKTOP GRID ───────────────────────────────────────────────── */}
        <ul className="hidden md:grid grid-cols-1 md:grid-cols-2
                       gap-x-12 gap-y-2">
          {services.map((service, i) => (
            <ServiceRow key={service.title} service={service} index={i} />
          ))}
        </ul>

        {/* ─── MOBILE CAROUSEL ─────────────────────────────────────────────── */}
        <div className="md:hidden">
          <div
            ref={scrollerRef}
            onScroll={onScroll}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            onMouseDown={handleInteractionStart}
            onMouseUp={handleInteractionEnd}
            className="flex gap-4 overflow-x-auto snap-x-mandatory no-scrollbar
                       -mx-4 px-4 pb-4"
          >
            {services.map((service, i) => (
              <article
                key={service.title}
                className="snap-start shrink-0 basis-[85%]
                           bg-brand-surface/60 border-l-2 border-brand-cream/40
                           p-6 min-h-[200px] flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display text-3xl text-brand-cream
                                   tabular-nums leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="block h-px flex-1 bg-brand-cream/30" />
                </div>
                <h3 className="font-label text-base uppercase
                               tracking-[0.18em] text-brand-ivory mb-3">
                  {service.title}
                </h3>
                <p className="font-sans text-sm text-brand-gray font-light
                              leading-relaxed flex-1">
                  {service.description}
                </p>
              </article>
            ))}
          </div>

          {/* Counter + progress bar */}
          <div className="mt-6 flex items-center gap-4">
            <span className="font-label text-[11px] tracking-[0.25em]
                             text-brand-cream tabular-nums">
              {String(activeIdx + 1).padStart(2, "0")}
              <span className="text-brand-gray/60">
                {" "}/ {String(services.length).padStart(2, "0")}
              </span>
            </span>
            <div className="flex-1 h-px bg-brand-border relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-brand-cream
                           transition-[width] duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            {/* Pause indicator */}
            <span
              className={`font-label text-[10px] tracking-[0.2em] uppercase
                          transition-colors ${
                            paused ? "text-brand-cream" : "text-brand-gray/40"
                          }`}
              aria-live="polite"
            >
              {paused ? "Paused" : "Auto"}
            </span>
          </div>

          {/* Dots — one per service, click to jump */}
          <div className="mt-4 flex justify-center flex-wrap gap-1.5">
            {services.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to service ${i + 1}`}
                className={`h-1 transition-all duration-500
                            ${i === activeIdx
                              ? "w-6 bg-brand-cream"
                              : "w-1.5 bg-brand-gray/30 hover:bg-brand-gray/60"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Desktop row — clean hover: small slide right + gold left bar grows in.
function ServiceRow({ service, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...tokens.animation.transition, delay: (index % 6) * 0.06 }}
      className="group relative flex gap-6 border-t border-brand-border py-6
                 transition-colors duration-500
                 hover:bg-white/[0.012]"
    >
      {/* Vertical gold accent — grows in on hover from top */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 w-px h-full bg-brand-cream
                   origin-top scale-y-0 transition-transform duration-700
                   ease-[cubic-bezier(0.16,1,0.3,1)]
                   group-hover:scale-y-100"
      />
      <span className="font-display text-3xl text-brand-cream tabular-nums
                       shrink-0 leading-none mt-1
                       transition-transform duration-500
                       group-hover:translate-x-1">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex-1 transition-transform duration-500
                      group-hover:translate-x-1">
        <h3 className="font-label text-base md:text-lg uppercase
                       tracking-[0.18em] text-brand-ivory
                       group-hover:text-brand-cream transition-colors duration-500">
          {service.title}
        </h3>
        <p className="mt-3 font-sans text-sm md:text-base text-brand-gray
                      font-light leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.li>
  );
}
