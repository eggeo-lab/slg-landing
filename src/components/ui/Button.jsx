import React from "react";

// Editorial CTA button.
//
// Variants:
//   - primary:   solid wine background, ivory text. Hover deepens the
//                wine and the cream hairline grows full-width.
//   - secondary: outline only — soft cream border, ivory text. Hover
//                fills with translucent wine and shifts text to cream.
//   - red:       reserved for the most urgent CTA on the page.
//   - ghost:     transparent, faint cream border. Hover deepens border.
//
// Mobile-first sizing: min-h-[48px], padding scales with breakpoint.
// NO box-shadow glow effects (intentionally — too "saas-y").
export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  ...props
}) {
  const baseStyles =
    "group relative inline-flex items-center justify-center " +
    "px-7 sm:px-9 py-4 text-xs sm:text-sm tracking-[0.2em] uppercase " +
    "font-label font-medium overflow-hidden " +
    "min-h-[48px] " +
    "transition-colors duration-500";

  const variants = {
    primary:
      "bg-brand-wine text-brand-ivory border border-brand-wine " +
      "hover:bg-brand-wine-deep hover:border-brand-wine-bright",
    secondary:
      "bg-transparent text-brand-ivory border border-brand-cream/40 " +
      "hover:border-brand-cream hover:bg-brand-wine/15 hover:text-brand-cream",
    red:
      "bg-brand-red text-brand-ivory border border-brand-red " +
      "hover:bg-brand-red-dark",
    ghost:
      "bg-transparent text-brand-cream border border-brand-gray/20 " +
      "hover:border-brand-cream hover:bg-brand-surface",
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  // Hover content:
  //  - All variants get a thin cream underline at the bottom that grows
  //    from 0 → 100% on hover (no glow, no shadow).
  //  - Label translates a hair to the right on hover.
  const innerContent = (
    <>
      {/* Bottom hairline that grows on hover */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full bg-brand-cream
                   origin-left scale-x-0 transition-transform duration-700
                   ease-[cubic-bezier(0.16,1,0.3,1)]
                   group-hover:scale-x-100"
      />
      <span className="relative z-10 inline-flex items-center gap-2
                       transition-transform duration-500
                       group-hover:translate-x-0.5">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {innerContent}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {innerContent}
    </button>
  );
}
