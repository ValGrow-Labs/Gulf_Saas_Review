import { Comparison } from "@/types";

export const comparisons: Comparison[] = [
  {
    id: "zoho-vs-hubspot",
    slug: "zoho-vs-hubspot",
    title: "Zoho One vs HubSpot CRM",
    shortDescription: "All-in-one regional ERP value with full Arabic RTL and ZATCA compliance vs the gold standard in inbound sales UX and marketing automation.",
    productAId: "zoho-one",
    productBId: "hubspot-crm",
    winnerSummary: "Zoho One wins decisively on regional compliance, Arabic localization, and all-in-one affordability; HubSpot CRM remains the premier choice for modern B2B sales pipelines and brand marketing UX.",
    gulfContext: "For Saudi companies needing ZATCA e-invoicing and Arabic back-office workflows, Zoho One is the natural fit. For venture-backed startups and international firms in Dubai prioritizing sales rep adoption, HubSpot leads.",
    categories: ["CRM & Sales", "ERP & Business Management"]
  },
  {
    id: "quickbooks-vs-xero",
    slug: "quickbooks-vs-xero",
    title: "QuickBooks Online vs Xero",
    shortDescription: "A head-to-head comparison of the two dominant cloud accounting systems for small businesses, freelancers, and agencies in the UAE.",
    productAId: "quickbooks-online",
    productBId: "xero",
    winnerSummary: "Xero wins for collaborative teams and agency owners due to unlimited users and superior open banking integrations; QuickBooks is slightly faster to learn for solo practitioners.",
    gulfContext: "Both handle UAE 5% VAT calculations well, but neither is natively equipped for Saudi Arabia ZATCA Phase 2 without third-party middleware. In Dubai, Xero has stronger traction with modern accounting firms.",
    categories: ["Accounting & Finance"]
  },
  {
    id: "odoo-vs-sap-business-one",
    slug: "odoo-vs-sap-business-one",
    title: "Odoo ERP vs SAP Business One",
    shortDescription: "Modern open-core agile modularity with direct ZATCA Phase 2 certification vs time-tested corporate financial governance and enterprise supply chain power.",
    productAId: "odoo",
    productBId: "sap-business-one",
    winnerSummary: "Odoo wins on implementation speed, modern UI, and cost efficiency for fast-growing GCC mid-market businesses; SAP Business One wins for heavy industrial conglomerates and companies preparing for IPO.",
    gulfContext: "Odoo has taken substantial market share across Riyadh and Jeddah due to official ZATCA Phase 2 certification out of the box and rapid deployment. SAP Business One remains the standard for multi-company holding groups with strict audit protocols.",
    categories: ["ERP & Business Management"]
  },
  {
    id: "freshdesk-vs-zendesk",
    slug: "freshdesk-vs-zendesk",
    title: "Freshdesk vs Zendesk Suite",
    shortDescription: "Accessible, WhatsApp-first omnichannel support for growing GCC brands vs enterprise-grade bilingual routing and multi-brand customer experience infrastructure.",
    productAId: "freshdesk",
    productBId: "zendesk",
    winnerSummary: "Freshdesk delivers the best price-to-performance ratio for growing regional brands needing WhatsApp support; Zendesk is the undisputed champion for large-scale consumer applications with bilingual routing needs.",
    gulfContext: "Both understand that WhatsApp is the primary communication channel in the Middle East. Freshdesk makes it cost-effective for 5-20 agent teams; Zendesk powers tier-one fintechs and airlines with complex language queues.",
    categories: ["Customer Support"]
  }
];

export const comparisonLookup: Record<string, Comparison> = comparisons.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<string, Comparison>
);

