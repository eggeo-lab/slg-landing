import React from "react";

// SerpentGlyph — minimal stylised serpent / vine inspired by the Gorgona
// brand pillars (mythology, transformation, secrecy). Inline SVG so it
// inherits text color via `currentColor` and ships zero extra requests.
//
// Props:
//   size      number  — pixel size (default 24)
//   className string  — passed through (use to set color, e.g. "text-brand-cream")
//   variant   "line" | "ornate"  — line is the simple S-curve, ornate adds
//                                  a small head + tongue
export default function SerpentGlyph({
  size = 24,
  className = "",
  variant = "ornate",
  ...props
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* S-curve body */}
      <path
        d="M12 2 C 8 6, 16 10, 12 14 C 8 18, 16 22, 12 22"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {variant === "ornate" && (
        <>
          {/* Head dot */}
          <circle cx="12" cy="2.4" r="0.9" fill="currentColor" />
          {/* Tongue fork */}
          <path
            d="M10.6 1.2 L12 2.2 L13.4 1.2"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tail flick */}
          <circle cx="12" cy="22" r="0.6" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

// SerpentMark — large decorative version used as a section watermark.
// Renders as a faint, oversized glyph in a corner or center of a section
// to add visual depth without competing with content.
export function SerpentMark({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Large coiled serpent silhouette */}
      <path
        d="M100 20 C 60 50, 140 80, 100 110 C 60 140, 140 170, 100 200"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M100 30 C 70 55, 130 80, 100 105"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Head */}
      <circle cx="100" cy="22" r="3" fill="currentColor" />
      <path
        d="M96 16 L100 22 L104 16"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Decorative rays around the center coil */}
      <g opacity="0.3">
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x1 = 100 + Math.cos(angle) * 50;
          const y1 = 110 + Math.sin(angle) * 50;
          const x2 = 100 + Math.cos(angle) * 70;
          const y2 = 110 + Math.sin(angle) * 70;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
          );
        })}
      </g>
    </svg>
  );
}
