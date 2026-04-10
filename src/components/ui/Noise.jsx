import React from "react";

// Film grain overlay — subtle SVG noise applied via mix-blend-overlay across
// the whole viewport. Inline data URI so there's no extra request and the
// asset ships with the bundle. The opacity is intentionally low (3-6%) to
// add texture without making the page feel dirty.
//
// `pointer-events-none` ensures it never blocks clicks; `fixed` keeps it
// on top of the entire scroll surface; `z-50` puts it above content but
// below modals (Nav overlay sits at z-[60]).
export default function Noise() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full
                 opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
