import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteContent } from "../../data/content";
import Button from "../ui/Button";

// Top nav with fullscreen overlay menu.
//
// Mobile-first decisions:
//   - Compact heights: 64px (h-16) on mobile when scrolled, 80px when at top.
//   - Desktop keeps the more spacious 80/112 rhythm.
//   - Hamburger button is a 44×44 hit area even though the icon is 28px.
//   - Overlay menu closes on link click, on Esc, and on click outside content.
//   - body scroll locked while overlay is open (prevents background scroll).
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Esc-to-close + body scroll lock for the overlay menu.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const navHeight = scrolled
    ? "h-16 md:h-20"
    : "h-20 md:h-28";

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500
                    ${navHeight}
                    ${scrolled
                      ? "bg-brand-bg/95 backdrop-blur-md border-b border-brand-border"
                      : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-full
                        relative flex items-center justify-between">
          {/* Hamburger — 44px hit area */}
          <div className="w-1/3 flex justify-start">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center
                         min-w-[44px] min-h-[44px] -ml-2
                         text-brand-ivory hover:text-brand-cream
                         transition-colors focus:outline-none"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </div>

          {/* Centered logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2
                          -translate-y-1/2 flex justify-center">
            <a href="#top" className="block" aria-label="SLG home">
              <img
                src={siteContent.global.logoPath}
                alt={siteContent.global.brandName}
                className={`w-auto object-contain hover:scale-105
                            transition-all duration-500 drop-shadow-md
                            ${scrolled ? "h-10 md:h-14" : "h-12 md:h-20"}`}
              />
            </a>
          </div>

          {/* Right CTA — hidden on the smallest screens to keep the bar tidy */}
          <div className="hidden sm:flex items-center justify-end w-1/3">
            <Button
              href="#contact"
              className="!min-h-[44px] !py-3 !px-5 !text-[11px]"
              variant="primary"
            >
              Consultation
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            // Click on the overlay backdrop closes the menu.
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
            className="fixed inset-0 z-[60] bg-brand-bg/[0.96] backdrop-blur-sm
                       flex flex-col justify-center px-6 sm:px-12 md:px-24"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 left-2 sm:top-8 sm:left-12
                         inline-flex items-center justify-center
                         min-w-[44px] min-h-[44px]
                         text-brand-ivory hover:text-brand-cream
                         transition-colors"
            >
              <X size={32} strokeWidth={1} />
            </button>

            <div className="flex flex-col space-y-5 sm:space-y-7
                            font-serif italic text-4xl sm:text-6xl md:text-7xl
                            text-brand-gray">
              {[
                { label: "Services", href: "#services" },
                { label: "Approach", href: "#approach" },
                { label: "Methodology", href: "#systems" },
                { label: "Trust", href: "#trust" },
                { label: "Contact", href: "#contact" },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.2, duration: 0.5 }}
                  className="group flex items-baseline gap-4 w-max
                             hover:text-brand-ivory transition-colors
                             duration-500"
                >
                  <span className="font-label text-[11px] not-italic
                                   tracking-[0.25em] uppercase
                                   text-brand-cream/60 tabular-nums
                                   transition-all duration-500
                                   group-hover:text-brand-cream">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="transition-transform duration-500
                                   group-hover:translate-x-2">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
