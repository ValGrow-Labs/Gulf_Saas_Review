import { Article } from "@/types";

export const articles: Article[] = [
  {
    id: "best-accounting-software-saudi-arabia-zatca",
    slug: "best-accounting-software-saudi-arabia-zatca",
    title: "Best Accounting Software for Businesses in Saudi Arabia (2026 ZATCA Phase 2 Guide)",
    excerpt: "A full analysis of cloud accounting platforms that are certified for ZATCA Phase 2, for the generation of cryptographic stamps and for compliance with Saudi tax.",
    category: "Accounting & Compliance",
    readTime: "7 min read",
    publishedDate: "October 24, 2026",
    author: {
      name: "Tariq Al-Mansoor",
      role: "Head of Regional ERP Research",
      avatar: "/authors/tariq.jpg",
    },
    image: "/articles/zatca-guide.jpg",
    featured: true,
    keyTakeaways: [
      "ZATCA Phase 2 mandates cryptographic stamp (CSID) and real-time XML transmission",
      "Native integrations in Zoho Books & Odoo avoid expensive third-party middleware",
      "B2C simplified tax invoices require automated QR code validation within 24 hours",
    ],
    relatedSoftwareSlugs: ["zoho-one", "odoo", "quickbooks-online"],
    content: [
      "Saudi Arabia's digital transformation under Vision 2030 has fundamentally redefined how businesses manage accounting and financial records. With the Zakat, Tax and Customs Authority (ZATCA) rolling out Phase 2 of the Fatoora e-invoicing mandate across escalating revenue tiers, selecting an accounting platform is no longer merely about bookkeeping convenience — it is an existential compliance priority.",
      "In Phase 2 (Integration Phase), businesses cannot simply issue PDF invoices with static QR codes. Each invoice must be generated in standardized UBL 2.1 XML syntax, cryptographically signed, assigned a Cryptographic Stamp Identifier (CSID), and transmitted to the ZATCA Fatoora portal in real-time or within strict 24-hour windows for simplified B2C invoices.",
      "Among the platforms evaluated by our research team, Zoho Books and Odoo ERP have distinguished themselves by providing native, certified integration modules that require zero third-party middleware. While international platforms like QuickBooks and Xero remain popular globally, their lack of native ZATCA Phase 2 connectivity places a heavy integration burden on Saudi accounting departments.",
    ],
  },
  {
    id: "top-crm-platforms-uae-companies",
    slug: "top-crm-platforms-uae-companies",
    title: "Top CRM Platforms for UAE Companies: WhatsApp Integration & Regional Pipelines",
    excerpt: "How forward thinking Dubai and Abu Dhabi sales organisations are using multi-currency pipelines, WhatsApp automation and bilingual lead management to close faster.",
    category: "Sales & CRM",
    readTime: "5 min read",
    publishedDate: "November 2, 2026",
    author: {
      name: "Leila Haddad",
      role: "Senior SaaS Analyst",
      avatar: "/authors/leila.jpg",
    },
    image: "/articles/uae-crm.jpg",
    featured: true,
    keyTakeaways: [
      "WhatsApp Business API integration is essential for UAE buyer communication speed",
      "Multi-currency deal tracking (AED, SAR, USD) prevents exchange rate friction",
      "Bilingual Arabic and English customer portals increase regional conversion rates",
    ],
    relatedSoftwareSlugs: ["hubspot-crm", "zoho-one", "freshdesk"],
    content: [
      "In the United Arab Emirates, business moves at high velocity and relationships are nurtured through immediate, personal channels. Traditional cold-email sequences that work in North America often fall flat in the Gulf, where business executives, property investors, and procurement managers conduct high-stakes discussions directly over WhatsApp.",
      "When evaluating CRM software for the UAE market, three factors separate effective platforms from expensive shelfware: native or reliable WhatsApp Business API synchronisation, effortless multi-currency deal tracking (AED, SAR, USD, EUR), and fast user adoption among multinational sales forces.",
      "HubSpot CRM continues to lead user sentiment in Dubai Internet City for inbound marketing and intuitive pipeline drag-and-drop mechanics. Meanwhile, Zoho CRM offers the strongest value proposition for organizations requiring deep back-office ERP integration and full Arabic interface capabilities.",
    ],
  },
  {
    id: "how-to-choose-erp-gcc-enterprises",
    slug: "how-to-choose-erp-gcc-enterprises",
    title: "How to Choose the Right ERP Software in the GCC: Cost, Compliance & Scalability",
    excerpt: "A strategic evaluation framework for GCC business owners contemplating between a modular open core solution (Odoo) and a heavyweight legacy system (SAP).",
    category: "ERP & Strategy",
    readTime: "9 min read",
    publishedDate: "November 10, 2026",
    author: {
      name: "Omar Farooq",
      role: "Enterprise Systems Director",
      avatar: "/authors/omar.jpg",
    },
    image: "/articles/gcc-erp.jpg",
    featured: true,
    keyTakeaways: [
      "Audit native Wage Protection System (WPS) and GOSI payroll support before signing",
      "Ensure local certified implementation partners exist in your primary operating city",
      "Factor in total cost of ownership (TCO) beyond initial per-user license fees",
    ],
    relatedSoftwareSlugs: ["odoo", "zoho-one", "xero"],
    content: [
      "Enterprise Resource Planning (ERP) selections are among the highest-risk capital investments a Middle Eastern enterprise will undertake. In our audit of over 120 GCC ERP implementations, more than 40% suffered timeline delays or budget overruns due to one recurring oversight: underestimating the complexity of regional compliance and local language operations.",
      "A software suite that excels in Europe may lack crucial capabilities when confronted with the Saudi Wage Protection System (WPS), GOSI contributions, Hijri calendar accounting periods, and multi-entity transfer pricing between Free Zone and Mainland jurisdictions in the UAE.",
      "We recommend evaluating candidates across four mandatory GCC pillars: sovereign data residency capabilities, availability of local certified implementation partners, native Arabic RTL support, and transparent recurring total cost of ownership (TCO) beyond initial license fees.",
    ],
  },
];

export const articleLookup: Record<string, Article> = articles.reduce(
  (acc, a) => {
    acc[a.slug] = a;
    acc[a.id] = a;
    return acc;
  },
  {} as Record<string, Article>
);
