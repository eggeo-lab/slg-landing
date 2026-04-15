export const siteContent = {
  global: {
    brandName: "SLG",
    fullName: "Exotic Garden Concierge",
    // BASE_URL = "/" in dev, "/slg-landing/" on GitHub Pages.
    // Using it here keeps the logo working under any base path.
    logoPath: `${import.meta.env.BASE_URL}SLG-1.png`,
    contactEmail: "concierge@slg-la.com",
    location: "Los Angeles, California"
  },

  hero: {
    label: "EXOTIC GARDEN CONCIERGE",
    headline: "THE APEX OF\nBOTANICAL LUXURY",
    subcopy:
      "End-to-end cultivation services for licensed operators in Los Angeles. Discreet, precise, vertically integrated — built for facilities that demand the extraordinary.",
    primaryCta: "Book a Service",
    primaryLink: "#contact",
    secondaryCta: "Our Services",
    secondaryLink: "#services"
  },

  // Services — taken from the operations sheet + compliance/accounting.
  // Used by <Services /> section. Order matters: it's the displayed order.
  services: [
    {
      title: "Nursery",
      description:
        "Mother room management, cloning programs, and propagation built for genetic stability across every cycle."
    },
    {
      title: "Plant Management",
      description:
        "Daily canopy work — defoliation, training, IPM, fertigation tuning — handled by trained cultivation staff."
    },
    {
      title: "Harvest Services",
      description:
        "Coordinated harvest crews, harvest-day logistics, and chain-of-custody handling for licensed facilities."
    },
    {
      title: "Post-Harvest",
      description:
        "Drying room oversight, hand-trim teams, bucking, sorting, and grading to spec."
    },
    {
      title: "Maintenance and Grow Support",
      description:
        "Room turnovers, deep cleans between cycles, environmental tuning, and ongoing facility support."
    },
    {
      title: "Quality Control",
      description:
        "Pre-test screening, visual grading, moisture and density checks, and pre-roll quality oversight."
    },
    {
      title: "Temp Personnel",
      description:
        "Vetted, on-call cultivation labor for surge weeks, harvest peaks, and gap coverage."
    },
    {
      title: "Consultation",
      description:
        "Strategic input on facility design, SOP buildouts, compliance prep, and operational diagnostics."
    },
    {
      title: "Facility Management",
      description:
        "Day-to-day site oversight: scheduling, vendor coordination, and operational continuity."
    },
    {
      title: "Scheduling",
      description:
        "Cycle planning, labor scheduling, and harvest-window forecasting tied to your facility's cadence."
    },
    {
      title: "Workshop and Training",
      description:
        "On-site training for cultivation, post-harvest, and compliance — tailored to your team's level."
    },
    {
      title: "Facility Cleanup with Eco-Friendly Options",
      description:
        "Deep cleans, sanitation, and waste handling using low-impact, environmentally responsible methods."
    },
    {
      title: "À La Carte Work",
      description:
        "One-off project work — single rooms, single tasks, single days. Pay only for what you need."
    },
    {
      title: "Presentation Support",
      description:
        "Investor walkthroughs, buyer visits, and facility presentation: every detail dialed in."
    },
    {
      title: "Compliance",
      description:
        "Expert regulatory compliance for licensed cannabis operators — state and local guidance, license renewals and maintenance, audit readiness, and uninterrupted operations."
    },
    {
      title: "Accounting",
      description:
        "Specialized cannabis accounting — 280E-aware bookkeeping, cost accounting, reconciliations, and monthly reporting built for licensed operators."
    }
  ],

  approach: {
    label: "The Approach",
    headline: "Cultivation as ritual.",
    body:
      "Every facility we touch is treated like a private garden — built from genetics up, refined cycle after cycle. We work in silence, by appointment, with the discipline of a craft that rewards patience.",
    quote: "Power, transformation, and the beauty of secrecy.",
    cta: "Inquire privately",
    ctaLink: "#contact",
  },

  systems: {
    label: "Methodology",
    headline: "Systems Behind Every Cycle",
    bullets: [
      "Rigorous intake, facility audit, and scope definition",
      "Bespoke SOPs aligned to your license type and room layout",
      "Continuous, real-time optimization across every phase",
      "Executive-level reporting and absolute discretion"
    ],
    capabilities: [
      "Private Consultation",
      "Cycle Forecasting",
      "Resource Allocation",
      "Ongoing Management"
    ]
  },

  contact: {
    headline: "Initiate Dialogue",
    subcopy:
      "Private consultations by appointment. All inquiries are reviewed individually."
  },

  // ─── NEW — Journal / editorial grid (Chrome Hearts inspired) ────────────
  // Magazine-style tile grid that showcases the brand world. Each tile is
  // either an image (dropped into /public/journal/) or a text block. Used by
  // <Journal /> section. Sizes drive the asymmetric magazine layout.
  //
  // Drop your own images into /public/journal/ and point `image` at them.
  // If `image` is missing, the tile renders as a dark typographic card.
  journal: {
    label: "The Journal",
    headline: "Field Notes",
    subcopy:
      "An unfolding record of the work — rooms, rituals, and the details behind every cycle.",
    items: [
      {
        kind: "image",
        size: "tall",
        image: "journal/01.jpg",
        caption: "Room 04 · Cycle 09",
        title: "Genetics from the ground up",
      },
      {
        kind: "quote",
        size: "square",
        quote:
          "Cultivation is not a product. It is a ritual repeated in silence.",
      },
      {
        kind: "image",
        size: "square",
        image: "journal/02.jpg",
        caption: "Mother Room",
        title: "Phenohunt — Lot 12",
      },
      {
        kind: "image",
        size: "wide",
        image: "journal/03.jpg",
        caption: "Post-Harvest",
        title: "Hand-trimmed to spec",
      },
      {
        kind: "text",
        size: "square",
        eyebrow: "By Appointment",
        body:
          "Our work begins before a plant enters the room — in the facility, in the SOPs, in the hands of the people who will execute.",
      },
      {
        kind: "image",
        size: "tall",
        image: "journal/04.jpg",
        caption: "Field Study",
        title: "On discipline",
      },
    ]
  }
};
