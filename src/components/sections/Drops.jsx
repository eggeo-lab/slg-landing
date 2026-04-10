import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { tokens } from "../../theme/tokens";
import products from "../../data/products.json";

// =============================================================================
// FUTURE PHASE — MERCH ECOMMERCE
// =============================================================================
// This section is scaffolded but NOT mounted in App.jsx yet.
// Mount it when the merch line is ready to launch.
//
// TODO: fetch from /api/products instead of static JSON
// TODO: connect to cart state (Zustand or Context)
// TODO: Stripe checkout integration
// TODO: product detail route (/product/:id)
// TODO: drop countdown / scheduled release gating
// TODO: stock management / sync with backend inventory
// TODO: admin panel integration
//
// Already wired with the same mobile-first carousel pattern as <Services />
// so this is plug-and-play once products + imagery are ready.
// =============================================================================

export default function Drops() {
  const scrollerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || !el.firstElementChild) return;
    const cardWidth = el.firstElementChild.offsetWidth + 16;
    const idx = Math.round(el.scrollLeft / cardWidth);
    if (idx !== activeIdx) setActiveIdx(idx);
  }, [activeIdx]);

  const progressPct = ((activeIdx + 1) / products.length) * 100;

  return (
    <section id="drops" className={tokens.spacing.section}>
      <div className={tokens.spacing.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={tokens.animation.transition}
          className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end
                     md:justify-between gap-6"
        >
          <div>
            <p className={`${tokens.typography.label} mb-4`}>The Drop</p>
            <h2 className={tokens.typography.h2}>Limited release.</h2>
          </div>
          <a
            href="#newsletter"
            className="font-display text-xs uppercase tracking-[0.2em]
                       text-brand-cream hover:text-brand-ivory
                       transition-colors min-h-[44px] inline-flex items-center"
          >
            Notify me →
          </a>
        </motion.div>

        {/* ─── DESKTOP GRID ───────────────────────────────────────────────── */}
        <div className="product-grid hidden md:grid grid-cols-2 lg:grid-cols-3
                        gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} animated />
          ))}
        </div>

        {/* ─── MOBILE CAROUSEL ─────────────────────────────────────────────── */}
        <div className="md:hidden">
          <div
            ref={scrollerRef}
            onScroll={onScroll}
            className="flex gap-4 overflow-x-auto snap-x-mandatory no-scrollbar
                       -mx-4 px-4 pb-4"
          >
            {products.map((product, i) => (
              <div
                key={product.id}
                className="snap-start shrink-0 basis-[88%]"
              >
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>

          {/* Counter + progress bar (matches Services pattern) */}
          <div className="mt-6 flex items-center gap-4">
            <span className="font-display text-[11px] tracking-[0.25em]
                             text-brand-cream tabular-nums">
              {String(activeIdx + 1).padStart(2, "0")}
              <span className="text-brand-gray/60">
                {" "}/ {String(products.length).padStart(2, "0")}
              </span>
            </span>
            <div className="flex-1 h-px bg-brand-border relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-brand-cream
                           transition-[width] duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index, animated }) {
  const Wrapper = animated ? motion.article : "article";
  const motionProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { ...tokens.animation.transition, delay: (index % 3) * 0.08 },
      }
    : {};

  return (
    <Wrapper {...motionProps} className="product-card group">
      {/* Image placeholder — replace with real product imagery */}
      <div className="relative aspect-[4/5] w-full overflow-hidden
                      border border-brand-border bg-brand-surface/50
                      group-hover:border-brand-cream/40 transition-colors duration-500">
        <div className="absolute inset-0 flex items-center justify-center
                        p-6 text-center">
          <span className="font-display text-[10px] uppercase tracking-[0.2em]
                           text-brand-gray/60">
            {product.imageLabel}
          </span>
        </div>
        {product.badge && (
          <span className="product-badge absolute top-4 left-4 px-3 py-1
                           text-[10px] uppercase tracking-widest font-display
                           text-brand-bg bg-brand-cream">
            {product.badge}
          </span>
        )}
      </div>

      <div className="mt-5 flex justify-between items-start gap-4">
        <div>
          <h3 className="font-display text-sm uppercase tracking-[0.15em]
                         text-brand-ivory group-hover:text-brand-cream
                         transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 font-sans text-xs text-brand-gray">
            {product.colorway}
          </p>
        </div>
        <p className="product-price font-serif text-lg text-brand-ivory
                      tabular-nums">
          ${product.price}
        </p>
      </div>

      <div className="product-variants mt-3 flex gap-2 flex-wrap">
        {product.sizes.map((size) => {
          const inStock = (product.stockBySize?.[size] ?? 0) > 0;
          return (
            <span
              key={size}
              className={`product-stock text-[10px] uppercase tracking-widest
                          font-display px-2 py-1 border ${
                            inStock
                              ? "border-brand-border text-brand-gray"
                              : "border-brand-border/50 text-brand-gray/40 line-through"
                          }`}
            >
              {size}
            </span>
          );
        })}
      </div>
    </Wrapper>
  );
}
