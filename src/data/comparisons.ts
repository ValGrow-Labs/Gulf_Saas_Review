import { Comparison } from "@/types";

export const comparisons: Comparison[] = [
  {
    id: "zoho-vs-hubspot",
    slug: "zoho-vs-hubspot",
    title: "Zoho One vs HubSpot CRM",
    shortDescription: "All in one regional ERP value with full Arabic RTL and ZATCA compliance versus the gold standard in inbound sales UX and marketing automation.",
    productAId: "zoho-one",
    productBId: "hubspot-crm",
    winnerSummary: "Zoho One wins decisively on regional compliance, Arabic localization, and all-in-one affordability; HubSpot CRM remains the premier choice for modern B2B sales pipelines and brand marketing UX.",
    gulfContext: "For Saudi companies looking at ZATCA e-invoicing and the associated Arabic back office processes, Zoho One is the obvious choice. For the venture backed startups and the international companies in Dubai where the priority is on sales rep uptake, HubSpot is the way to go.",
    categories: ["CRM & Sales", "ERP & Business Management"]
  },
  {
    id: "quickbooks-vs-xero",
    slug: "quickbooks-vs-xero",
    title: "QuickBooks Online vs Xero",
    shortDescription: "A head to head comparison of the two leading cloud accounting systems for small businesses, freelancers and agencies in the UAE.",
    productAId: "quickbooks-online",
    productBId: "xero",
    winnerSummary: "Xero wins for collaborative teams and agency owners due to unlimited users and superior open banking integrations; QuickBooks is slightly faster to learn for solo practitioners.",
    gulfContext: "Both are capable of handling the UAE 5% VAT calculations, neither of them however is natively capable of doing the Saudi Arabia ZATCA Phase 2 without some form of middleware. In Dubai Xero has the better uptake with the modern accounting firms.",
    categories: ["Accounting & Finance"]
  },
  {
    id: "odoo-vs-sap-business-one",
    slug: "odoo-vs-sap-business-one",
    title: "Odoo ERP vs SAP Business One",
    shortDescription: "Modern open core agile modularity with direct ZATCA Phase 2 certification versus the time proven corporate financial governance and enterprise supply chain power.",
    productAId: "odoo",
    productBId: "sap-business-one",
    winnerSummary: "Odoo wins on implementation speed, modern UI, and cost efficiency for fast-growing GCC mid-market businesses; SAP Business One wins for heavy industrial conglomerates and companies preparing for IPO.",
    gulfContext: "Odoo has taken a huge amount of market share in Riyadh and Jeddah as a result of having the official ZATCA Phase 2 certification right out of the box and the ability to deploy very quickly. SAP Business One is still the go-to solution for multi-company holding groups where there are very strict audit requirements.",
    categories: ["ERP & Business Management"]
  },
  {
    id: "freshdesk-vs-zendesk",
    slug: "freshdesk-vs-zendesk",
    title: "Freshdesk vs Zendesk Suite",
    shortDescription: "Accessible, Whatsapp first omnichannel support for the growing GCC brand vs enterprise grade bilingual routing and multi-brand customer experience infrastructure.",
    productAId: "freshdesk",
    productBId: "zendesk",
    winnerSummary: "Freshdesk delivers the best price-to-performance ratio for growing regional brands needing WhatsApp support; Zendesk is the undisputed champion for large-scale consumer applications with bilingual routing needs.",
    gulfContext: "Both know that WhatsApp is the dominant mode of communication in the Middle East. Freshdesk is the solution for 5-20 agent teams where cost is a major factor. Zendesk is the tool of choice for tier one fintechs and airlines with very complex language queues.",
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

