import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "accounting-finance",
    slug: "accounting-finance",
    name: "Accounting & Finance",
    description: "Cloud accounting platforms, VAT compliance engines and financial reporting tools for the various regional tax regimes.",
    iconName: "Calculator",
    count: 24,
    gulfRelevance: "Critical for Saudi Arabia ZATCA Phase 2 E-Invoicing and UAE FTA 5% VAT filing.",
    popularSoftwareSlugs: ["zoho-one", "odoo", "quickbooks-online", "xero"],
    keyCriteria: [
      "ZATCA Phase 2 cryptographic e-invoicing compliance (Saudi Arabia)",
      "UAE FTA VAT Audit File (FAF) generation",
      "SAR / AED / USD multi-currency reconciliation",
      "Direct integration with regional GCC banks"
    ]
  },
  {
    id: "crm-sales",
    slug: "crm-sales",
    name: "CRM & Sales",
    description: "Customer relationship management, multi-currency deal tracking and high touch regional sales pipeline tools.",
    iconName: "Users",
    count: 19,
    gulfRelevance: "Essential for managing GCC multi-currency pipelines and regional WhatsApp sales conversations.",
    popularSoftwareSlugs: ["hubspot-crm", "zoho-one", "freshdesk"],
    keyCriteria: [
      "WhatsApp Business API two-way sync for Gulf client messaging",
      "Multi-currency deal tracking (SAR, AED, USD, EUR)",
      "Bilingual customer contact management & quotes",
      "Lead generation attribution from regional social channels"
    ]
  },
  {
    id: "hr-payroll",
    slug: "hr-payroll",
    name: "HR & Payroll",
    description: "Human Resources, automated payroll, End of Service calculations and regional labour law compliance software.",
    iconName: "Briefcase",
    count: 15,
    gulfRelevance: "Guarantees Wage Protection System (WPS) and GOSI / End-of-Service Gratuity compliance.",
    popularSoftwareSlugs: ["deel", "zoho-one", "odoo"],
    keyCriteria: [
      "Wage Protection System (WPS) file format generation (UAE & KSA)",
      "Statutory End-of-Service Gratuity (EOSG) automated calculation",
      "Saudi GOSI and Qiwa / Muqeem labor portal alignment",
      "Bilingual employee self-service mobile portal"
    ]
  },
  {
    id: "project-management",
    slug: "project-management",
    name: "Project Management",
    description: "Modern work operating systems, Gantt roadmaps, PMO dashboards and collaborative delivery tools.",
    iconName: "CheckSquare",
    count: 22,
    gulfRelevance: "Aligns multinational teams across Vision 2030 initiatives and fast-paced UAE infrastructure projects.",
    popularSoftwareSlugs: ["monday-com", "zoho-one"],
    keyCriteria: [
      "Executive PMO rollup dashboards for stakeholders",
      "Resource workload capacity balancing",
      "Regional data residency (AWS UAE / GCP Dammam) availability",
      "Bilingual task collaboration and document sharing"
    ]
  },
  {
    id: "marketing-automation",
    slug: "marketing-automation",
    name: "Marketing Automation",
    description: "Omnichannel customer journeys, predictive sending, SMS marketing and local lead nurturing.",
    iconName: "Send",
    count: 18,
    gulfRelevance: "Drives high-converting campaigns with Arabic RTL email rendering and regional telecom SMS routing.",
    popularSoftwareSlugs: ["activecampaign", "hubspot-crm", "zoho-one"],
    keyCriteria: [
      "Native Right-to-Left (RTL) Arabic email template builders",
      "Time-zone optimized delivery for Middle Eastern evening engagement",
      "Local GCC telecom SMS gateway integration (Saudi & UAE)",
      "Two-way synchronization with Shopify and regional e-commerce"
    ]
  },
  {
    id: "ecommerce",
    slug: "ecommerce",
    name: "E-Commerce",
    description: "High volume online store fronts, Arabic checkout flows and payment gateway ecosystems specifically for Gulf shoppers.",
    iconName: "ShoppingBag",
    count: 16,
    gulfRelevance: "Integrates essential regional payment methods: Mada, Tabby, Tamara, and Apple Pay.",
    popularSoftwareSlugs: ["shopify-plus", "odoo"],
    keyCriteria: [
      "Native Mada debit card and Apple Pay Middle East checkout",
      "Buy Now Pay Later (Tabby & Tamara) conversion drivers",
      "Peak-traffic stability for White Friday and Ramadan sales",
      "Automated logistics connectors with Aramex, SMSA, and DHL"
    ]
  },
  {
    id: "erp-business-management",
    slug: "erp-business-management",
    name: "ERP & Business Management",
    description: "Unified enterprise platforms (connecting accounting, inventory, supply chain and retail point of sale).",
    iconName: "Layers",
    count: 14,
    gulfRelevance: "Central nervous system for GCC trading groups, multi-branch retailers, and manufacturing entities.",
    popularSoftwareSlugs: ["odoo", "zoho-one", "sap-business-one"],
    keyCriteria: [
      "Complete ZATCA Phase 2 Fatoora integration (Saudi Arabia)",
      "Multi-branch, multi-warehouse batch & inventory tracking",
      "Certified local implementation partner network across KSA and UAE",
      "Sovereign on-premise or local cloud hosting compliance"
    ]
  },
  {
    id: "customer-support",
    slug: "customer-support",
    name: "Customer Support",
    description: "Omnichannel helpdesks, bilingual customer portals and Whatsapp first support ticketing systems.",
    iconName: "Headphones",
    count: 21,
    gulfRelevance: "Bridges customer inquiries across WhatsApp, email, and social with custom GCC working hour SLAs.",
    popularSoftwareSlugs: ["freshdesk", "zendesk", "hubspot-crm"],
    keyCriteria: [
      "Two-way WhatsApp Business API integration",
      "Arabic customer self-service knowledge base with RTL layout",
      "Configurable Middle Eastern workweek SLAs (Sunday-Thursday / Monday-Friday)",
      "Skills-based routing to native Arabic-speaking support reps"
    ]
  }
];

export const categoryLookup: Record<string, Category> = categories.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<string, Category>
);

