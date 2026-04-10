import React, { useState } from "react";
import { motion } from "framer-motion";
import { tokens } from "../../theme/tokens";
import { siteContent } from "../../data/content";
import Button from "../ui/Button";

// =============================================================================
// CONTACT FORM
// =============================================================================
// Compliance: the CA license number field is REQUIRED. Do not remove it.
//
// EMAIL DELIVERY — currently wired to Formspree.
// -----------------------------------------------------------------------------
// Formspree is a no-backend form relay. We POST the form data to a Formspree
// endpoint, and Formspree forwards every submission to whatever email address
// you configured (e.g. studiolagorgona@gmail.com).
//
// To activate:
//   1. Sign up at https://formspree.io with the destination email address.
//   2. Create a new form. Formspree gives you an endpoint that looks like:
//        https://formspree.io/f/abcdwxyz
//   3. Copy that endpoint into a `.env` file at the project root:
//        VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz
//   4. Restart `npm run dev` (Vite only reads .env at startup).
//   5. Submit the form. The first submission will arrive at the inbox after
//      you confirm the email Formspree sends you.
//
// If VITE_FORMSPREE_ENDPOINT is missing, the form still "works" visually
// (it shows the success state) but logs a warning to the console — useful
// for design iteration without spamming the inbox.
//
// To swap providers later (Web3Forms, EmailJS, your own /api endpoint),
// just change ENDPOINT below — the rest of the form contract stays the same.
// =============================================================================

const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "";

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

    if (!ENDPOINT) {
      // Dev mode — no endpoint configured. Don't actually send anything,
      // just show the success state and warn the developer.
      // eslint-disable-next-line no-console
      console.warn(
        "[Contact form] VITE_FORMSPREE_ENDPOINT is not set. " +
        "Submission was NOT sent. Configure .env to send real emails. " +
        "See src/components/sections/Contact.jsx for setup instructions."
      );
      // Tiny artificial delay so the loading state is visible.
      setTimeout(() => setStatus("success"), 700);
      return;
    }

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
        const msg = data?.errors?.[0]?.message || "Submission failed. Please try again.";
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
          <div className="text-center mb-12 sm:mb-16">
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
                respond directly. All inquiries are reviewed individually.
              </p>
            </motion.div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit} noValidate>
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
                value="New SLG inquiry — slg-la.com"
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
                <label htmlFor="contact-license" className="sr-only">
                  CA license number
                </label>
                <input
                  id="contact-license"
                  name="license"
                  type="text"
                  placeholder="CA LICENSE NUMBER (CDPH / CCL / DCC)"
                  className={inputClasses}
                  required
                  aria-describedby="license-help"
                />
                <p
                  id="license-help"
                  className="mt-2 font-label text-[10px] tracking-[0.2em]
                             uppercase text-brand-gray/60"
                >
                  Required · Licensed operators only
                </p>
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Inquiry details
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="INQUIRY DETAILS — FACILITY SIZE, SCOPE, TIMING"
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

              <div className="pt-6 sm:pt-8 text-center flex flex-col items-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Submit Request"}
                </Button>
                <p className="mt-6 font-label text-[10px] sm:text-xs
                              text-brand-gray uppercase tracking-[0.22em]">
                  Licensed operators only · All inquiries strictly confidential
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
