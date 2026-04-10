import React, { useState } from "react";
import { siteContent } from "../../data/content";
import LegalModal from "../ui/LegalModal";

// Footer.
//
// Compliance: a SHORT compliance line is always visible. The full MAUCRSA /
// licensing language lives in <LegalModal /> and is reachable via the
// "Licensing Notice" link. Terms of Service and Privacy Policy open the
// same modal with their respective copy from siteContent.legal.documents.
//
// To remove a legal document entirely, delete its entry from
// siteContent.legal.links AND from siteContent.legal.documents.
export default function Footer() {
  const year = new Date().getFullYear();
  const [openDoc, setOpenDoc] = useState(null); // "terms" | "privacy" | "licensing" | null

  const activeDocument = openDoc ? siteContent.legal.documents[openDoc] : null;

  return (
    <>
      <footer className="relative pt-20 sm:pt-24 pb-12 mt-8
                         border-t border-brand-cream/30">
        {/* Decorative gold gradient line atop the border */}
        <div className="absolute inset-x-0 top-0 h-px bg-cream-line" />
        {/* Subtle vignette to seal the bottom of the page */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none
                     bg-gradient-to-b from-transparent to-black/40"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Top row: logo, legal nav, copyright */}
          <div className="flex flex-col md:flex-row justify-between
                          items-center gap-8 md:gap-6">
            <a href="#top" className="flex-shrink-0" aria-label="Back to top">
              <img
                src={siteContent.global.logoPath}
                alt={`${siteContent.global.brandName} — ${siteContent.global.fullName}`}
                className="h-12 w-auto object-contain opacity-80
                           hover:opacity-100 transition-opacity"
              />
            </a>

            <nav
              aria-label="Legal"
              className="flex flex-wrap justify-center gap-6 sm:gap-8
                         text-[10px] sm:text-xs font-label tracking-[0.22em]
                         uppercase text-brand-gray"
            >
              {siteContent.legal.links.map((link) => (
                <button
                  key={link.doc}
                  type="button"
                  onClick={() => setOpenDoc(link.doc)}
                  className="hover:text-brand-cream transition-colors
                             min-h-[44px] inline-flex items-center
                             border-b border-transparent
                             hover:border-brand-cream/40 pb-0.5"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="text-[10px] sm:text-xs font-label tracking-[0.22em]
                            uppercase text-brand-gray text-center md:text-right">
              <div>{siteContent.global.location}</div>
              <div className="mt-1">© {year} SLG. All rights reserved.</div>
            </div>
          </div>

          {/* Compact compliance signal — full text lives in the Licensing modal */}
          <div className="mt-12 sm:mt-16 pt-8
                          border-t border-brand-border/50
                          flex flex-col items-center gap-3 text-center">
            <p className="font-sans text-[11px] sm:text-xs leading-relaxed
                          text-brand-gray/70 max-w-3xl">
              {siteContent.legal.shortDisclaimer}
            </p>
            <p className="font-label text-[10px] tracking-[0.25em]
                          uppercase text-brand-gray/50">
              Must be 21+
              <span className="mx-2 text-brand-cream/40">·</span>
              Licensed operators only
              <span className="mx-2 text-brand-cream/40">·</span>
              No products for sale
            </p>
            <button
              type="button"
              onClick={() => setOpenDoc("licensing")}
              className="mt-2 font-label text-[10px] tracking-[0.25em]
                         uppercase text-brand-cream/80 hover:text-brand-cream
                         transition-colors min-h-[44px] inline-flex items-center"
            >
              Read full licensing notice →
            </button>
          </div>
        </div>
      </footer>

      <LegalModal
        open={!!activeDocument}
        onClose={() => setOpenDoc(null)}
        title={activeDocument?.title || ""}
        paragraphs={activeDocument?.body || []}
      />
    </>
  );
}
