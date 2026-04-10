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
    primaryCta: "Request Consultation",
    primaryLink: "#contact",
    secondaryCta: "Our Services",
    secondaryLink: "#services"
  },

  // 14 services — taken from the operations sheet.
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

  socialProof: {
    label: "Trust",
    testimonials: [
      {
        quote:
          "An unparalleled level of service. They fundamentally redefined what we expected from a cultivation partner.",
        author: "Director of Cultivation, Licensed LA Operator"
      },
      {
        quote:
          "The consistency and discretion are exactly what a facility at this scale requires.",
        author: "Managing Partner, Vertically Integrated Brand"
      }
    ]
  },

  contact: {
    headline: "Initiate Dialogue",
    subcopy:
      "Private consultations for licensed commercial operators. All inquiries are reviewed individually."
  },

  legal: {
    // Short footer line shown to everyone — visible compliance signal.
    shortDisclaimer:
      "SLG provides cultivation support services to licensed commercial cannabis operators in California. Nothing on this site is offered for sale to the public.",

    // Long-form documents — rendered inside <LegalModal /> when the matching
    // footer link is clicked. All copy is BOILERPLATE and should be reviewed
    // by counsel before launch. Edit copy here, never in components.
    documents: {
      licensing: {
        title: "Licensing Notice",
        body: [
          "SLG — Exotic Garden Concierge is a service provider operating in Los Angeles, California. Services are provided exclusively to commercial cannabis businesses licensed by the California Department of Cannabis Control (DCC) and, where applicable, the City of Los Angeles Department of Cannabis Regulation (DCR).",
          "Nothing on this website constitutes an offer to sell, distribute, or transfer cannabis, cannabis products, or any controlled substance. No products of any kind are sold through this site. All imagery and language is presented for informational and brand purposes only.",
          "All engagements require proof of valid state and local licensing. SLG does not work with unlicensed operators. You must be 21 years of age or older to engage SLG's services. SLG complies with all applicable California cannabis regulations, including but not limited to MAUCRSA and Title 4, Division 19 of the California Code of Regulations.",
          "By using this site you acknowledge that SLG makes no medical claims and that cannabis remains a Schedule I controlled substance under United States federal law."
        ]
      },

      terms: {
        title: "Terms of Service",
        body: [
          "Last updated: " + new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
          "1. Acceptance of Terms. By accessing or using the SLG website (slg-la.com) or engaging SLG's services, you agree to be bound by these Terms of Service. If you do not agree, do not use this site or engage our services.",
          "2. Eligibility. Use of this site and engagement of SLG services is restricted to (a) individuals 21 years of age or older, and (b) entities holding a valid commercial cannabis license issued by the California Department of Cannabis Control (DCC) and any applicable local authority. SLG reserves the right to verify licensing prior to commencing any engagement.",
          "3. Services. SLG provides cultivation support, consulting, facility management, post-harvest, training, and ancillary services to licensed commercial cannabis operators. The scope, deliverables, fees, and timeline of any engagement are governed by a separate written agreement executed between SLG and the client.",
          "4. No Sale of Cannabis. SLG does not sell, distribute, transport, manufacture, or transfer cannabis, cannabis products, or any controlled substance. Nothing on this site constitutes an offer to sell, and no transactions involving cannabis or cannabis products take place through this site.",
          "5. Intellectual Property. All content on this site — including but not limited to text, graphics, logos, images, and the SLG name and marks — is the property of SLG or its licensors and is protected by United States and international copyright and trademark law. You may not reproduce, distribute, or create derivative works from any content without prior written permission.",
          "6. Confidentiality. Information shared through the inquiry form is treated as confidential and used solely to evaluate and respond to your request. SLG does not sell, rent, or disclose inquirer information to third parties except as required by law.",
          "7. Disclaimer of Warranties. The site and all content are provided \"as is\" without warranty of any kind, express or implied. SLG does not warrant that the site will be uninterrupted, error-free, or free from harmful components.",
          "8. Limitation of Liability. To the maximum extent permitted by law, SLG, its officers, employees, and affiliates shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of or related to your use of this site or engagement of SLG's services.",
          "9. Governing Law. These Terms are governed by the laws of the State of California, without regard to conflict of laws principles. Any dispute arising under these Terms shall be resolved exclusively in the state or federal courts located in Los Angeles County, California.",
          "10. Changes to Terms. SLG may update these Terms at any time. Continued use of the site after changes are posted constitutes acceptance of the updated Terms.",
          "11. Contact. Questions regarding these Terms may be directed to concierge@slg-la.com."
        ]
      },

      privacy: {
        title: "Privacy Policy",
        body: [
          "Last updated: " + new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
          "1. Scope. This Privacy Policy describes how SLG — Exotic Garden Concierge (\"SLG\", \"we\", \"us\") collects, uses, and protects information submitted through slg-la.com.",
          "2. Information We Collect. When you submit an inquiry through the contact form, we collect: full name, email address, California cannabis license number, and any details you provide about your facility, scope, or timing. We do not collect payment information through this site.",
          "3. How We Use Information. Submitted information is used solely to (a) verify that you are a licensed commercial operator, (b) evaluate your inquiry, and (c) respond to your request. We do not use submitted information for marketing, advertising, or unrelated communications without your explicit consent.",
          "4. Sharing. We do not sell, rent, lease, or trade your information. We may share information only (a) with employees and contractors of SLG who need it to respond to your inquiry, and (b) when required by law, subpoena, or court order.",
          "5. Retention. Inquiry data is retained for the duration necessary to respond to and follow up on your request, plus any retention period required by California law. You may request deletion at any time by contacting concierge@slg-la.com.",
          "6. Cookies. This site uses only essential cookies required for the site to function. We do not use third-party advertising or tracking cookies.",
          "7. Your Rights (California Residents). Under the California Consumer Privacy Act (CCPA), California residents have the right to (a) know what personal information is collected, (b) request deletion of personal information, (c) opt out of any sale of personal information (we do not sell data), and (d) non-discrimination for exercising these rights. To exercise these rights, contact concierge@slg-la.com.",
          "8. Security. We implement reasonable administrative, technical, and physical safeguards to protect submitted information. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
          "9. Children. This site is not directed to anyone under the age of 21. We do not knowingly collect information from minors.",
          "10. Changes. We may update this Privacy Policy from time to time. The \"Last updated\" date above will reflect any changes. Continued use of the site after changes are posted constitutes acceptance of the updated policy.",
          "11. Contact. Privacy questions may be directed to concierge@slg-la.com."
        ]
      }
    },

    links: [
      { label: "Terms of Service", doc: "terms" },
      { label: "Privacy Policy", doc: "privacy" },
      { label: "Licensing Notice", doc: "licensing" }
    ]
  }
};
