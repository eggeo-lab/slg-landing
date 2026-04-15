import React, { useState } from "react";
import { motion } from "framer-motion";
import { tokens } from "../../theme/tokens";
import { siteContent } from "../../data/content";
import Button from "../ui/Button";

// =============================================================================
// CONTACT FORM
// =============================================================================
// EMAIL DELIVERY — Formspree
// -----------------------------------------------------------------------------
// Formspree is a no-backend form relay. We POST the form data to a Formspree
// endpoint, and Formspree forwards every submission to the destination email
// configured on the Formspree form.
//
// Endpoint is hardcoded below. To swap providers or rotate the endpoint,
// change ENDPOINT — the rest of the form contract stays the same.
//
// First submission after setup requires confirming the verification email
// Formspree sends to the destination inbox.
// =============================================================================

const ENDPOINT = "https://formspree.io/f/xojyjkgg";

export default function Contact() {
  // status: "idle" | "submitting" | "success" | "error"
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const inputClasses =
    "w-full bg-transparent border-b border-brand-border " +
    "pb-3 pt-3 min-h-12 " +
    "text-brand-ivory focus:outline-none focus:border-brand-cream " +
    "transition-colors duration-500 " +
    "font-label text-sm tracking-[0.18em] uppercase " +
    "placeholder:text-brand-gray/50";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        // Try to surface a useful error from the provider response.
        const data = await res.json().catch(() => ({}));
        const msg =
          data?.errors?.[0]?.message || "Submission failed. Please try again.";
        setStatus("error");
        setErrorMsg(msg);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section
      id="contact"
      className={`${tokens.spacing.section} relative section-tint-wine`}
    >
      {/* Top hairline framing */}
      <div className="absolute inset-x-0 top-0 h-px bg-cream-line opacity-50" />

      <div className={`${tokens.spacing.container} max-w-3xl relative`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={tokens.animation.transition}
        >
          <div className="text-center mb-10 sm:mb-16">
            <p className={`${tokens.typography.label} mb-4`}>Contact</p>
            <h2 className={`${tokens.typography.h2} font-serif italic`}>
              {siteContent.contact.headline}
            </h2>
            <p className={`${tokens.typography.body} mt-6 max-w-xl mx-auto`}>
              {siteContent.contact.subcopy}
            </p>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center border-l-2 border-brand-cream/60
                         bg-brand-surface/40 px-6 py-12"
              role="status"
              aria-live="polite"
            >
              <p className="font-label text-xs tracking-[0.25em] uppercase
                            text-brand-cream mb-4">
                Inquiry Received
              </p>
              <p className="font-serif italic text-3xl text-brand-ivory mb-4">
                Thank you.
              </p>
              <p className="font-sans text-sm text-brand-gray max-w-md mx-auto">
                A member of the concierge team will review your request and
                respond directly.
              </p>
            </motion.div>
          ) : (
            <form className="space-y-7 sm:space-y-8" onSubmit={handleSubmit} noValidate>
              {/* Honeypot field — bots fill this, humans don't see it.
                  Formspree drops any submission where _gotcha is non-empty. */}
              <input
                type="text"
                name="_gotcha"
                tabIndex="-1"
                autoComplete="off"
                className="absolute left-[-9999px] w-0 h-0 opacity-0"
                aria-hidden="true"
              />

              {/* Subject line that arrives in the inbox. */}
              <input
                type="hidden"
                name="_subject"
                value="New SLG inquiry"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Full name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="FULL NAME"
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="EMAIL ADDRESS"
                    className={inputClasses}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Inquiry details (optional)
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="INQUIRY DETAILS (OPTIONAL)"
                  rows="4"
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="text-center text-xs uppercase tracking-[0.2em]
                             text-brand-red font-label"
                >
                  {errorMsg}
                </p>
              )}

              <div className="pt-4 sm:pt-8 text-center flex flex-col items-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Book a Service"}
                </Button>
                <p className="mt-6 font-label text-[10px] sm:text-xs
                              text-brand-gray uppercase tracking-[0.22em]">
                  All inquiries strictly confidential
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
