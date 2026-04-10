import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// LegalModal — used by the footer to show Terms / Privacy / Licensing.
//
// Props:
//   open       boolean       — whether the modal is visible
//   onClose    () => void    — close handler
//   title      string        — modal title (e.g. "Terms of Service")
//   paragraphs string[]      — body content, one paragraph per array entry
//
// Behaviour:
//   - Esc key closes
//   - Click on backdrop closes
//   - Body scroll is locked while open
//   - Focus trap is intentionally NOT implemented (single-CTA modal, low risk)
export default function LegalModal({ open, onClose, title, paragraphs = [] }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          className="fixed inset-0 z-[70] flex items-end sm:items-center
                     justify-center p-0 sm:p-6 md:p-12
                     bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh]
                       bg-brand-surface border-t border-brand-cream/40
                       flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4
                            px-6 sm:px-10 pt-8 pb-6
                            border-b border-brand-border">
              <div>
                <p className="font-display text-[10px] tracking-[0.25em]
                              uppercase text-brand-cream mb-2">
                  Compliance Document
                </p>
                <h3
                  id="legal-modal-title"
                  className="font-serif text-2xl sm:text-3xl text-brand-ivory
                             leading-tight"
                >
                  {title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 inline-flex items-center justify-center
                           min-w-[44px] min-h-[44px] -mr-2 -mt-2
                           text-brand-gray hover:text-brand-cream
                           transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Body — scrollable */}
            <div
              className="overflow-y-auto px-6 sm:px-10 py-8
                         space-y-4 text-[12px] sm:text-sm leading-relaxed
                         font-sans text-brand-gray/90"
            >
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="pt-4 text-[10px] uppercase tracking-widest
                            text-brand-gray/50 font-display">
                This document is provided for informational purposes and
                should be reviewed by counsel before relying on it.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
