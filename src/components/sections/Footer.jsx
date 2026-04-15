import React from "react";
import { siteContent } from "../../data/content";

// Minimal footer: logo, location, copyright line.
// No legal links, no compliance copy.
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-16 sm:pt-24 pb-10 sm:pb-12 mt-8
                       border-t border-brand-cream/25">
      {/* Decorative cream gradient line atop the border */}
      <div className="absolute inset-x-0 top-0 h-px bg-cream-line" />
      {/* Subtle vignette to seal the bottom of the page */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none
                   bg-gradient-to-b from-transparent to-black/40"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <a href="#top" className="flex-shrink-0" aria-label="Back to top">
            <img
              src={siteContent.global.logoPath}
              alt={`${siteContent.global.brandName} — ${siteContent.global.fullName}`}
              className="h-12 sm:h-14 w-auto object-contain opacity-80
                         hover:opacity-100 transition-opacity"
            />
          </a>

          <p className="font-label text-[10px] sm:text-xs tracking-[0.25em]
                        uppercase text-brand-gray">
            {siteContent.global.location}
          </p>

          <p className="font-label text-[10px] sm:text-xs tracking-[0.25em]
                        uppercase text-brand-gray/70">
            © {year} SLG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
