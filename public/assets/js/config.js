/**
 * ZELVYN — Central Business Configuration
 * Brand Meaning:
 * Zero-friction Engineering, Logic, Vision, Your-growth & Networks
 */

const ZELVYN_CONFIG = {
  // Brand Identity
  brand: {
    name: "ZELVYN",
    mark: "Z",
    meaning: "Zero-friction Engineering, Logic, Vision, Your-growth & Networks",
    tagline: "Intelligent systems for modern business.",
    description: "We build AI agents, WhatsApp automations, custom apps, websites and digital systems that help businesses save time, capture leads and operate more efficiently.",
    year: 2026,
    legalName: "ZELVYN Systems"
  },

  // Contact Information (Easily configurable placeholders)
  contact: {
    email: "click here", // Updated to point to contact page instead of direct email
    whatsappNumber: "", // Enter digits (e.g. '919876543210') to activate WhatsApp click-to-chat
    whatsappDisplay: "Available on Request",
    location: "Global (Remote & On-Site by Request)",
    businessHours: "Monday – Friday: 9:00 AM – 6:00 PM",
    defaultWhatsAppMessage: "Hi ZELVYN, I would like to discuss an automation / development project."
  },

  // Social Links (Easily replaceable placeholders)
  social: {
    // linkedin: "https://linkedin.com/company/zelvyn-placeholder",
    // twitter: "https://twitter.com/zelvyn_placeholder",
    github: "https://github.com/Chanchal2425/ZELVYN",
    instagram: "https://www.instagram.com/zelvyn_ai/"
  },

  // Base Pricing (INR & USD conversion reference)
  pricing: {
    currency: "INR",
    rates: {
      usdToInr: 85 // baseline conversion
    },
    services: {
      whatsapp: {
        starter: { inr: 2000, usd: 200, label: "Starter" },
        growth: { inr: 5000, usd: 400, label: "Growth" },
        advanced: { inr: 15000, usd: 800, label: "Advanced" }
      },
      aiAgents: {
        basic: { inr: 5000, usd: 275, label: "Basic" },
        business: { inr: 12000, usd: 550, label: "Business" },
        advanced: { inr: 20000, usd: 1000, label: "Advanced" }
      },
      // customCrm: {
      //   basic: { inr: 35000, usd: 475, label: "Basic CRM" },
      //   business: { inr: 75000, usd: 1000, label: "Business CRM" },
      //   advanced: { inr: 150000, usd: 2000, label: "Advanced CRM" }
      // },
      websites: {
        landingPage: { inr: 5000, usd: 140, label: "Landing Page" },
        businessSite: { inr: 20000, usd: 340, label: "Business Website" },
        customWebApp: { inr: 35000, usd: 680, label: "Custom Web App" }
      },
      aiAdvertising: {
        starter: { inr: 5000, usd: 70, label: "Starter" },
        campaign: { inr: 15000, usd: 200, label: "Campaign" },
        custom: { inr: 30000, usd: 400, label: "Custom" }
      }
    }
  }
};

// Make config globally accessible across legacy and new naming
if (typeof window !== 'undefined') {
  window.ZELVYN_CONFIG = ZELVYN_CONFIG;
  window.NOVAFLOW_CONFIG = ZELVYN_CONFIG;
  window.NEXORA_CONFIG = ZELVYN_CONFIG;
}
