import { Software } from "@/types";

export const softwares: Software[] = [
  {
    id: "zoho-one",
    slug: "zoho-one",
    name: "Zoho One",
    tagline: "The Operating System for Business with Deep Middle East Localization",
    description: "An integrated suite of 45+ business applications covering CRM, accounting, HR, and marketing. Exceptional value for growing Gulf businesses with native Arabic support and ZATCA compliance.",
    category: "erp-business-management",
    categoryName: "ERP & Business Management",
    rating: 4.6,
    reviewCount: 38,
    isVerifiedReview: false,
    sampleNotice: "Illustrative evaluation profile based on public GCC specifications and regional feature availability.",
    countrySuitability: ["Saudi Arabia", "UAE", "GCC"],
    arabicSupport: "Native UI & RTL",
    localCompliance: [
      "ZATCA Phase 2 E-Invoicing Certified (Zoho Books)",
      "UAE FTA VAT Audit File (FAF) Compliant",
      "Bahrain & Oman VAT Ready",
      "Saudi PDPL Data Handling Compatible"
    ],
    localIntegrations: [
      "PayTabs Middle East",
      "Tap Payments",
      "Telr Payment Gateway",
      "Saudi Riyal (SAR) & AED Direct Currency Feeds",
      "Saudi National Bank & FAB Bank Statement Import"
    ],
    pricing: {
      model: "Monthly Subscription",
      startingPrice: "$37",
      currency: "USD",
      billingPeriod: "per employee / month (billed annually)",
      regionalNote: "Approx. 138 SAR or 136 AED per user/month. Highly competitive vs standalone modular suites.",
      tiers: [
        {
          name: "All-Employee Pricing",
          price: "$37",
          period: "user/month",
          regionalEstimateSAR: "139 SAR/mo",
          regionalEstimateAED: "136 AED/mo",
          description: "Must purchase licenses for all full-time employees in your organization.",
          features: [
            "Access to 45+ enterprise applications",
            "Zoho Books with ZATCA Phase 2 QR & XML generation",
            "Zoho CRM with Arabic RTL interface",
            "Mobile apps for iOS & Android",
            "Regional data center options (UAE & Saudi)"
          ],
          highlight: true
        },
        {
          name: "Flexible User Pricing",
          price: "$90",
          period: "user/month",
          regionalEstimateSAR: "338 SAR/mo",
          regionalEstimateAED: "330 AED/mo",
          description: "Purchase licenses only for specific team members who require software access.",
          features: [
            "Select individual user seats",
            "Full enterprise app ecosystem",
            "Central administrative control",
            "Priority phone & email support"
          ]
        }
      ]
    },
    easeOfUse: 8.2,
    deploymentTime: "2 - 5 Weeks",
    pros: [
      "Native full-suite Arabic interface with right-to-left (RTL) alignment",
      "Zoho Books is certified for ZATCA Phase 2 e-invoicing in Saudi Arabia",
      "Seamless UAE FTA VAT return calculations and FAF generation",
      "Extremely cost-effective for mid-market GCC enterprises",
      "Dedicated data centers in Riyadh and Dubai for data sovereignty"
    ],
    cons: [
      "Steep learning curve due to sheer breadth of 45+ applications",
      "UI consistency can vary slightly between older and newer modules",
      "Complex customizations often require Deluge scripting knowledge"
    ],
    keyFeatures: [
      {
        title: "Regional Tax & E-Invoicing",
        score: 9.6,
        description: "Pre-configured ZATCA e-invoicing Phase 2 cryptographic stamping and UAE FTA VAT filing out of the box."
      },
      {
        title: "Arabic Language Support",
        score: 9.2,
        description: "Complete Arabic interface for both administrative dashboards and customer-facing portals."
      },
      {
        title: "Cross-Department Integration",
        score: 8.8,
        description: "Data flows automatically between CRM, Books, Inventory, Desk, and People without custom connectors."
      },
      {
        title: "Local Payment Gateways",
        score: 9.0,
        description: "Native integrations with PayTabs, Tap, and Telr enable instant regional credit/debit card acceptance."
      }
    ],
    gulfSuitabilityAnalysis: {
      summary: "Zoho One is one of the most comprehensive and regionally aligned business suites available in the GCC. The vendor has invested heavily in local infrastructure, opening regional headquarters in Riyadh and Dubai, offering native ZATCA e-invoicing and Arabic support.",
      zatcaStatus: "Fully Certified for Phase 1 & Phase 2 Integration with ZATCA Fatoora portal.",
      uaeVatStatus: "Certified FTA Tax Accounting Software with automated 5% VAT calculations.",
      arabicExperience: "Excellent: Native Arabic RTL across Books, CRM, and Desk with bilingual PDF invoice generation.",
      regionalSupport: "Dedicated bilingual support teams operating on GMT+3 / GMT+4 business hours (Sunday to Thursday/Friday).",
      dataResidency: "Local GCC cloud instances hosted in Saudi Arabia and the UAE."
    },
    verdict: {
      score: 9.1,
      badge: "Best Value for GCC SMBs",
      summary: "An unbeatable value proposition for Middle Eastern businesses that want an all-in-one suite with native Arabic support and complete ZATCA / UAE VAT compliance without enterprise consulting fees.",
      bestFor: "Growing businesses in KSA and UAE seeking an affordable, fully compliant all-in-one platform.",
      notRecommendedFor: "Global conglomerates requiring bespoke manufacturing or highly specialized niche industry workflows."
    },
    similarSoftwareSlugs: ["odoo", "hubspot-crm", "sap-business-one"],
    websiteUrl: "https://www.zoho.com/one/",
    accentColor: "#DE2A2A",
    badges: ["ZATCA Ready", "UAE VAT", "Arabic RTL", "GCC Data Center"]
  },
  {
    id: "hubspot-crm",
    slug: "hubspot-crm",
    name: "HubSpot",
    tagline: "World-Class Inbound Marketing & Sales Platform for Ambitious GCC Teams",
    description: "The gold standard for scaling customer relationships, inbound marketing, and pipeline automation. Popular among fast-growing startups in Dubai Internet City and Riyadh tech hubs.",
    category: "crm-sales",
    categoryName: "CRM & Sales",
    rating: 4.7,
    reviewCount: 42,
    isVerifiedReview: false,
    sampleNotice: "Illustrative evaluation profile based on public GCC specifications and regional feature availability.",
    countrySuitability: ["UAE", "Saudi Arabia", "GCC"],
    arabicSupport: "Partial (Portal / Forms)",
    localCompliance: [
      "GDPR & Regional Privacy Alignment",
      "Multi-Currency Pipeline (SAR, AED, QAR, KWD, USD)",
      "Standard SOC 2 Type II Security"
    ],
    localIntegrations: [
      "WhatsApp Business API (via Spoke Phone / Rasayel / Twilio)",
      "Stripe Middle East",
      "Gmail & Outlook Middle East Exchange",
      "Zapier GCC Webhook Connectors"
    ],
    pricing: {
      model: "Monthly Subscription",
      startingPrice: "$20",
      currency: "USD",
      billingPeriod: "per month (Starter Tier)",
      regionalNote: "Free core CRM with generous contact limits. Professional & Enterprise tiers scale significantly in cost.",
      tiers: [
        {
          name: "Free CRM",
          price: "$0",
          period: "forever",
          regionalEstimateSAR: "0 SAR",
          regionalEstimateAED: "0 AED",
          description: "Foundational contact management, deal pipelines, and basic email tracking.",
          features: [
            "Up to 1,000,000 contacts",
            "Deal pipeline tracking",
            "Forms and landing page builders",
            "Multi-currency deal tracking"
          ]
        },
        {
          name: "CRM Suite Starter",
          price: "$20",
          period: "month",
          regionalEstimateSAR: "75 SAR/mo",
          regionalEstimateAED: "73 AED/mo",
          description: "Essential sales, marketing, and service automation for emerging teams.",
          features: [
            "Removes HubSpot branding on forms",
            "Simple automated follow-up sequences",
            "Live chat and ticketing",
            "Bilingual landing page creation"
          ],
          highlight: true
        },
        {
          name: "Sales Hub Professional",
          price: "$90",
          period: "seat/month",
          regionalEstimateSAR: "338 SAR/mo",
          regionalEstimateAED: "330 AED/mo",
          description: "Advanced pipeline management, custom reporting, and sales analytics.",
          features: [
            "Custom deal stages and team permissions",
            "Advanced forecasting and goal tracking",
            "E-signatures with localized formats",
            "Direct phone calling with GCC country codes"
          ]
        }
      ]
    },
    easeOfUse: 9.4,
    deploymentTime: "1 - 2 Weeks",
    pros: [
      "Industry-leading UI/UX with near-zero training required for sales reps",
      "Multi-currency support allows managing SAR, AED, and USD pipelines simultaneously",
      "Vast ecosystem of integrations and robust WhatsApp API connectivity partners",
      "Exceptional email deliverability across GCC corporate and government domains",
      "Rich free tier allows early-stage GCC startups to establish professional sales pipelines"
    ],
    cons: [
      "The internal administrative interface does not have a native Arabic RTL mode",
      "Pricing escalates rapidly as marketing contact database grows",
      "No native regional invoicing or ZATCA integration (requires third-party sync)"
    ],
    keyFeatures: [
      {
        title: "Pipeline & Deal Automation",
        score: 9.7,
        description: "Visual drag-and-drop pipelines with automated task assignments and deal probability weighting."
      },
      {
        title: "Multi-Currency Management",
        score: 9.1,
        description: "Seamlessly track deals in SAR, AED, and USD with automatic real-time conversion rates."
      },
      {
        title: "WhatsApp & Omnichannel Sales",
        score: 8.6,
        description: "Integrates with GCC WhatsApp providers to log conversations directly against customer timelines."
      },
      {
        title: "Marketing Automation",
        score: 9.5,
        description: "World-class email workflows, lead scoring, and customer journey orchestration."
      }
    ],
    gulfSuitabilityAnalysis: {
      summary: "HubSpot is widely adopted among UAE tech firms, financial services, and venture-backed startups across Riyadh. While it lacks native ZATCA e-invoicing, its sales and marketing capabilities are unmatched.",
      zatcaStatus: "No direct native ZATCA integration; typically paired with Zoho Books or Xero for billing.",
      uaeVatStatus: "Tracks VAT fields in quotes; invoices usually managed via accounting integrations.",
      arabicExperience: "Public landing pages and customer forms support Arabic RTL; the back-office admin UI is in English.",
      regionalSupport: "Support available via EMEA desks, with growing agency partner networks in Dubai and Riyadh.",
      dataResidency: "US and EU cloud hosting (check organizational compliance with Saudi PDPL regulations)."
    },
    verdict: {
      score: 9.3,
      badge: "Best Modern CRM for GCC Sales Teams",
      summary: "If your primary goal is scaling sales revenue, lead nurturing, and pipeline visibility across the Middle East, HubSpot delivers the finest user experience on the market.",
      bestFor: "Tech companies, consulting agencies, and B2B sales teams in UAE and Saudi Arabia.",
      notRecommendedFor: "Companies needing native back-office Arabic accounting and automated ZATCA e-invoicing in one single tool."
    },
    similarSoftwareSlugs: ["zoho-one", "freshdesk", "activecampaign"],
    websiteUrl: "https://www.hubspot.com/",
    accentColor: "#FF7A59",
    badges: ["Top UX", "Multi-Currency", "WhatsApp Ready", "Startup Friendly"]
  },
  {
    id: "quickbooks-online",
    slug: "quickbooks-online",
    name: "QuickBooks Online",
    tagline: "Intuitive Cloud Accounting with International VAT Tracking",
    description: "One of the world's most recognizable accounting solutions. Offers straightforward bookkeeping, expense tracking, and invoicing suitable for small UAE businesses and service agencies.",
    category: "accounting-finance",
    categoryName: "Accounting & Finance",
    rating: 4.3,
    reviewCount: 31,
    isVerifiedReview: false,
    sampleNotice: "Illustrative evaluation profile based on public GCC specifications and regional feature availability.",
    countrySuitability: ["UAE", "GCC"],
    arabicSupport: "Third-Party Localization",
    localCompliance: [
      "UAE 5% VAT Tracking & Reporting",
      "Standard Financial Audit Export Formats",
      "International Multi-Currency Support"
    ],
    localIntegrations: [
      "PayPal Middle East",
      "Wise Business (AED / SAR / USD)",
      "Standard CSV bank import for UAE banks (ENBD, ADCB, FAB)",
      "Zapier connections for regional e-commerce"
    ],
    pricing: {
      model: "Monthly Subscription",
      startingPrice: "$17.50",
      currency: "USD",
      billingPeriod: "per month",
      regionalNote: "Regular 50% discount promotions for the first 3 months are common for Middle East accounts.",
      tiers: [
        {
          name: "Simple Start",
          price: "$17.50",
          period: "month",
          regionalEstimateSAR: "66 SAR/mo",
          regionalEstimateAED: "64 AED/mo",
          description: "Designed for solopreneurs and freelancers in Dubai & UAE Free Zones.",
          features: [
            "Income and expense tracking",
            "UAE VAT tracking and basic reporting",
            "Custom invoice creation",
            "Receipt capture via mobile app"
          ]
        },
        {
          name: "Plus",
          price: "$42.50",
          period: "month",
          regionalEstimateSAR: "160 SAR/mo",
          regionalEstimateAED: "156 AED/mo",
          description: "The standard package for small trading and service businesses.",
          features: [
            "Up to 5 billable users",
            "Track inventory & billable hours",
            "Manage bills and recurring vendor payments",
            "Multi-currency transactions (AED, SAR, USD, EUR)"
          ],
          highlight: true
        }
      ]
    },
    easeOfUse: 8.9,
    deploymentTime: "1 - 3 Days",
    pros: [
      "Extremely intuitive interface that non-accountants can master quickly",
      "Reliable 5% VAT calculations suited for standard UAE commercial returns",
      "Vast global accountant familiarity — easy to find bookkeepers familiar with QBO",
      "Solid mobile app for capturing petrol and expense receipts on the go"
    ],
    cons: [
      "Not natively compliant with Saudi Arabia ZATCA Phase 2 e-invoicing requirements",
      "No native Arabic user interface or RTL dashboard",
      "Automated bank feeds for GCC local banks are limited compared to US/UK markets"
    ],
    keyFeatures: [
      {
        title: "VAT Tracking",
        score: 8.5,
        description: "Tracks taxable supplies and outputs with pre-set UAE 5% VAT tax codes."
      },
      {
        title: "Expense Management",
        score: 9.0,
        description: "Mobile receipt capture and automatic categorization for simplified tax season prep."
      },
      {
        title: "Cash Flow Visibility",
        score: 8.7,
        description: "Interactive dashboard displaying 90-day cash trends, pending invoices, and receivables."
      }
    ],
    gulfSuitabilityAnalysis: {
      summary: "QuickBooks Online works smoothly for small UAE trading companies, marketing agencies, and freelancers who require standard 5% VAT tracking and English bookkeeping. However, Saudi businesses must look elsewhere due to ZATCA e-invoicing constraints.",
      zatcaStatus: "NOT certified for Saudi ZATCA Phase 2 without complex third-party middleware.",
      uaeVatStatus: "Supported: tracks standard 5% VAT and zero-rated supplies accurately.",
      arabicExperience: "Limited: UI is entirely English; basic Arabic text can be inserted on invoice descriptions.",
      regionalSupport: "Online support available, though time-zone coverage can be delayed during GCC morning hours.",
      dataResidency: "Hosted in US/Global cloud infrastructure."
    },
    verdict: {
      score: 8.3,
      badge: "Best for UAE Freelancers & Agencies",
      summary: "A reliable and familiar accounting staple for UAE-based teams operating in English, but superseded by Zoho Books and Odoo in the Saudi market.",
      bestFor: "Dubai and Abu Dhabi small businesses, consultants, and digital agencies.",
      notRecommendedFor: "Saudi Arabian companies subject to ZATCA Phase 2 mandatory integration."
    },
    similarSoftwareSlugs: ["xero", "zoho-one", "odoo"],
    websiteUrl: "https://quickbooks.intuit.com/global/",
    accentColor: "#2CA01C",
    badges: ["UAE VAT", "Quick Setup", "Expense Tracking"]
  },
  {
    id: "xero",
    slug: "xero",
    name: "Xero",
    tagline: "Beautiful Cloud Accounting with Open Banking & Ecosystem Connectivity",
    description: "Beloved by modern accountants and agency founders for its clean design, automated bank reconciliation, and extensive marketplace of add-on applications.",
    category: "accounting-finance",
    categoryName: "Accounting & Finance",
    rating: 4.5,
    reviewCount: 36,
    isVerifiedReview: false,
    sampleNotice: "Illustrative evaluation profile based on public GCC specifications and regional feature availability.",
    countrySuitability: ["UAE", "GCC"],
    arabicSupport: "English Only (Arabic Docs)",
    localCompliance: [
      "UAE FTA VAT Return Calculations",
      "International Audit Trail (IFRS Aligned)",
      "Multi-Currency Revaluations"
    ],
    localIntegrations: [
      "Lean Technologies (Open Banking GCC Feeds)",
      "Stripe Middle East",
      "Airwallex / Wise Multi-Currency",
      "Shopify & WooCommerce Regional Stores"
    ],
    pricing: {
      model: "Monthly Subscription",
      startingPrice: "$15",
      currency: "USD",
      billingPeriod: "per month",
      regionalNote: "Pricing is in USD; billed monthly with unlimited users on all plans.",
      tiers: [
        {
          name: "Early",
          price: "$15",
          period: "month",
          regionalEstimateSAR: "56 SAR/mo",
          regionalEstimateAED: "55 AED/mo",
          description: "Entry tier for early-stage founders with limited monthly billing.",
          features: [
            "Send up to 20 invoices",
            "Enter up to 5 bills",
            "Reconcile bank transactions",
            "UAE VAT tracking"
          ]
        },
        {
          name: "Growing",
          price: "$42",
          period: "month",
          regionalEstimateSAR: "158 SAR/mo",
          regionalEstimateAED: "154 AED/mo",
          description: "Unlimited invoices and bills for expanding Gulf businesses.",
          features: [
            "Unlimited invoicing and quotes",
            "Unlimited bill payments",
            "Bulk bank reconciliation",
            "Unlimited user seats included"
          ],
          highlight: true
        },
        {
          name: "Established",
          price: "$78",
          period: "month",
          regionalEstimateSAR: "293 SAR/mo",
          regionalEstimateAED: "286 AED/mo",
          description: "Comprehensive multi-currency support and project expense tracking.",
          features: [
            "Full multi-currency revaluations (SAR, AED, USD, EUR)",
            "Project profitability tracking",
            "In-depth analytics and cash forecasting",
            "Expense claim management"
          ]
        }
      ]
    },
    easeOfUse: 9.2,
    deploymentTime: "2 - 5 Days",
    pros: [
      "Clean, modern UI that accountants and founders genuinely enjoy using",
      "Unlimited users on all tiers eliminates per-seat license penalization",
      "Thriving ecosystem of 1,000+ app integrations including GCC open banking tools",
      "Superb automated bank reconciliation workflows"
    ],
    cons: [
      "No native ZATCA Phase 2 compliance for Saudi Arabian e-invoicing",
      "No Arabic UI or native RTL document rendering without third-party template hacks",
      "Inventory tracking on standard tiers is relatively rudimentary"
    ],
    keyFeatures: [
      {
        title: "Bank Reconciliation",
        score: 9.6,
        description: "AI-assisted reconciliation matching bank feeds to invoices and bills automatically."
      },
      {
        title: "Multi-Currency Engine",
        score: 9.4,
        description: "Live exchange rates with automated unrealized and realized forex gain/loss calculations."
      },
      {
        title: "Unlimited Users",
        score: 9.5,
        description: "Invite your entire finance department and external auditors at no extra per-seat cost."
      }
    ],
    gulfSuitabilityAnalysis: {
      summary: "Xero is a preferred accounting system for UAE digital agencies, venture studios, and tech startups. With the rise of GCC open banking aggregators like Lean and Dapi, local bank synchronization in the UAE has become seamless.",
      zatcaStatus: "No native ZATCA Phase 2 certification; not recommended for KSA tax entities.",
      uaeVatStatus: "Solid FTA VAT calculation module with exportable summary reports.",
      arabicExperience: "English interface only; not suited for teams requiring Arabic operational workflows.",
      regionalSupport: "Support operates via web ticketing with EMEA business hour coverage.",
      dataResidency: "Global cloud infrastructure."
    },
    verdict: {
      score: 8.8,
      badge: "Best for UAE Startups & Modern Teams",
      summary: "An exceptional, collaborative accounting platform for English-speaking UAE firms, offering unlimited users and best-in-class third-party integrations.",
      bestFor: "UAE tech startups, digital agencies, and professional services companies.",
      notRecommendedFor: "Saudi Arabian enterprises requiring ZATCA compliance and native Arabic operations."
    },
    similarSoftwareSlugs: ["quickbooks-online", "zoho-one", "odoo"],
    websiteUrl: "https://www.xero.com/",
    accentColor: "#13B5EA",
    badges: ["Unlimited Users", "UAE VAT", "Open Banking Ready"]
  },
  {
    id: "odoo",
    slug: "odoo",
    name: "Odoo ERP",
    tagline: "Modular Open-Core ERP with Official Saudi & UAE Localizations",
    description: "A remarkably agile and customizable ERP platform. Combines accounting, inventory, manufacturing, CRM, POS, and HR into one cohesive system with certified ZATCA Phase 2 support.",
    category: "erp-business-management",
    categoryName: "ERP & Business Management",
    rating: 4.8,
    reviewCount: 49,
    isVerifiedReview: false,
    sampleNotice: "Illustrative evaluation profile based on public GCC specifications and regional feature availability.",
    countrySuitability: ["Saudi Arabia", "UAE", "GCC"],
    arabicSupport: "Native UI & RTL",
    localCompliance: [
      "Official ZATCA Phase 1 & Phase 2 Integration Module (Saudi)",
      "UAE FTA VAT Return & Audit File Compatible",
      "Saudi GOSI & Wage Protection System (WPS) HR Modules",
      "UAE MOHRE Wage Protection System Integration"
    ],
    localIntegrations: [
      "Saudi National Bank & Al Rajhi Statement Formats",
      "Mada & Apple Pay via Point-of-Sale Hardware",
      "PayTabs, Tamara, and Tabby e-commerce plugins",
      "SMSA Express & Aramex Shipping Logistics"
    ],
    pricing: {
      model: "Monthly Subscription",
      startingPrice: "$24.90",
      currency: "USD",
      billingPeriod: "per user / month (Standard Plan)",
      regionalNote: "Approx. 93 SAR / 91 AED per user/month. Includes access to ALL standard Odoo apps.",
      tiers: [
        {
          name: "One App Free",
          price: "$0",
          period: "forever",
          regionalEstimateSAR: "0 SAR",
          regionalEstimateAED: "0 AED",
          description: "Use a single Odoo app (e.g., Invoicing or CRM) with unlimited users at zero cost.",
          features: [
            "1 chosen application (e.g. Invoicing)",
            "Unlimited user seats",
            "Cloud hosted on Odoo Online",
            "Basic community support"
          ]
        },
        {
          name: "Standard",
          price: "$24.90",
          period: "user/month",
          regionalEstimateSAR: "93 SAR/mo",
          regionalEstimateAED: "91 AED/mo",
          description: "All Odoo apps included on Odoo Online cloud infrastructure.",
          features: [
            "Access to ALL official Odoo apps (Accounting, CRM, Inventory, HR)",
            "ZATCA Phase 2 Saudi localization included",
            "Native Arabic RTL user interface",
            "Odoo cloud hosting and automatic backups"
          ],
          highlight: true
        },
        {
          name: "Custom",
          price: "$37.40",
          period: "user/month",
          regionalEstimateSAR: "140 SAR/mo",
          regionalEstimateAED: "137 AED/mo",
          description: "For businesses needing custom development, Odoo.sh, or on-premise hosting.",
          features: [
            "Hosting on Odoo.sh or private GCC on-premise servers",
            "Odoo Studio customization engine",
            "Multi-company architecture",
            "External API connectors and custom modules"
          ]
        }
      ]
    },
    easeOfUse: 8.4,
    deploymentTime: "3 - 8 Weeks",
    pros: [
      "Official certified ZATCA Phase 2 module built directly into core accounting",
      "Flawless Arabic right-to-left (RTL) interface across all modules",
      "Unrivaled modular flexibility: activate POS, inventory, manufacturing, or HR as you grow",
      "Can be hosted on local Saudi or UAE private cloud to satisfy strict data residency requirements",
      "Large network of certified implementation partners across Riyadh, Jeddah, and Dubai"
    ],
    cons: [
      "Custom implementations require competent certified partners to avoid scope creep",
      "Upgrading heavily modified custom modules between major versions can be complex",
      "On-premise deployments require dedicated internal IT expertise"
    ],
    keyFeatures: [
      {
        title: "ZATCA Phase 2 Integration",
        score: 9.8,
        description: "Official module generates UBL 2.1 XML invoices, calculates cryptographic hashes, and communicates with Fatoora API."
      },
      {
        title: "Arabic UI & Localization",
        score: 9.6,
        description: "Comprehensive Arabic translation, Hijri calendar support, and regional tax invoicing formats."
      },
      {
        title: "Modular Scalability",
        score: 9.7,
        description: "Start with simple invoicing and seamlessly scale into warehouse barcoding, MRP, and multi-branch POS."
      },
      {
        title: "Data Residency Control",
        score: 9.4,
        description: "Deploy on Odoo Cloud, Odoo.sh, or on-premise in Saudi sovereign cloud (Oracle KSA / Google Cloud Dammam)."
      }
    ],
    gulfSuitabilityAnalysis: {
      summary: "Odoo has emerged as the premier ERP of choice for small-to-midsize enterprises across Saudi Arabia and the UAE. Its combination of official ZATCA certification, bilingual capabilities, and affordable per-user pricing makes it the direct challenger to legacy ERPs.",
      zatcaStatus: "Officially certified ZATCA Phase 2 compliance out of the box in Odoo 16, 17, and 18.",
      uaeVatStatus: "Pre-configured UAE FTA VAT charts of accounts and tax return reporting.",
      arabicExperience: "Superb: 100% Arabic interface, Hijri calendar toggles, and bilingual printable documents.",
      regionalSupport: "Odoo operates major regional offices in Dubai Internet City and Riyadh with extensive partner networks.",
      dataResidency: "Options for local GCC hosting on AWS UAE, Google Cloud Dammam/Saudi, or local on-premise servers."
    },
    verdict: {
      score: 9.5,
      badge: "Top Choice for Saudi Arabia & GCC Mid-Market",
      summary: "The definitive ERP powerhouse for Gulf businesses needing full ZATCA compliance, bilingual operations, and unified inventory/accounting without million-dollar enterprise licenses.",
      bestFor: "Wholesale, retail, manufacturing, and multi-branch trading companies across KSA and UAE.",
      notRecommendedFor: "Micro-businesses that only need basic 2-invoice-per-month freelance billing."
    },
    similarSoftwareSlugs: ["zoho-one", "sap-business-one", "quickbooks-online"],
    websiteUrl: "https://www.odoo.com/",
    accentColor: "#714B67",
    badges: ["ZATCA Phase 2 Certified", "Arabic RTL", "WPS HR Ready", "Top Overall ERP"]
  },
  {
    id: "freshdesk",
    slug: "freshdesk",
    name: "Freshdesk",
    tagline: "Omnichannel Customer Support Powered by AI & Regional WhatsApp Messaging",
    description: "An intuitive helpdesk and ticketing platform by Freshworks. Empowers GCC support teams to unify customer inquiries across WhatsApp, email, phone, and web chat into a single bilingual inbox.",
    category: "customer-support",
    categoryName: "Customer Support",
    rating: 4.4,
    reviewCount: 29,
    isVerifiedReview: false,
    sampleNotice: "Illustrative evaluation profile based on public GCC specifications and regional feature availability.",
    countrySuitability: ["UAE", "Saudi Arabia", "GCC"],
    arabicSupport: "Native UI & RTL",
    localCompliance: [
      "SOC 2 Type II Certified",
      "Regional Telecom SMS Gateway Integration Ready",
      "Middle East WhatsApp Business Policy Compliance"
    ],
    localIntegrations: [
      "WhatsApp Business API (Official Freshchat connector)",
      "Unifonic & Infobip SMS for Saudi & UAE notifications",
      "Shopify & Salla e-commerce customer data sync",
      "Local VOIP numbers via Freshcaller GCC endpoints"
    ],
    pricing: {
      model: "Tiered Plan",
      startingPrice: "$15",
      currency: "USD",
      billingPeriod: "per agent / month (billed annually)",
      regionalNote: "Free plan supports up to 10 agents for basic ticketing. Growth tier adds regional WhatsApp channels.",
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "up to 10 agents",
          regionalEstimateSAR: "0 SAR",
          regionalEstimateAED: "0 AED",
          description: "Essential email and social ticketing for early-stage customer service teams.",
          features: [
            "Integrated ticketing across email & social",
            "Ticket dispatch automation",
            "Team collaboration notes",
            "Knowledge base articles"
          ]
        },
        {
          name: "Growth",
          price: "$15",
          period: "agent/month",
          regionalEstimateSAR: "56 SAR/mo",
          regionalEstimateAED: "55 AED/mo",
          description: "Automated ticket routing, business hours, and SLA management.",
          features: [
            "Automation rules & custom ticket fields",
            "Custom SSL and localized knowledge base",
            "SLA management with GCC working hours",
            "Arabic customer self-service portal"
          ],
          highlight: true
        },
        {
          name: "Pro",
          price: "$49",
          period: "agent/month",
          regionalEstimateSAR: "184 SAR/mo",
          regionalEstimateAED: "180 AED/mo",
          description: "Advanced omnichannel routing, round-robin dispatch, and Freddy AI insights.",
          features: [
            "Omnichannel support (WhatsApp, chat, phone)",
            "Freddy AI copilot for agent drafting",
            "Multiple SLA policies across regional time zones",
            "Customer satisfaction (CSAT) surveys"
          ]
        }
      ]
    },
    easeOfUse: 9.1,
    deploymentTime: "3 - 7 Days",
    pros: [
      "Deep WhatsApp integration — vital for high-touch Middle Eastern customer communication",
      "Configurable Sunday-to-Thursday or modern UAE Monday-to-Friday SLA schedules",
      "Full Arabic knowledge base and customer self-service portal support",
      "Extremely friendly pricing and generous free tier for small support teams"
    ],
    cons: [
      "Advanced AI features require higher-tier add-on packages",
      "Reporting dashboards can feel slightly rigid for complex multi-brand reporting",
      "Voice telephony pricing depends heavily on local telecom carrier routing"
    ],
    keyFeatures: [
      {
        title: "WhatsApp & Omnichannel Inbox",
        score: 9.5,
        description: "Manage incoming customer WhatsApp chats, web queries, and emails in one unified agent view."
      },
      {
        title: "Regional SLA Schedules",
        score: 9.2,
        description: "Set custom operational hours aligned with Saudi and UAE business weeks and public holidays."
      },
      {
        title: "Bilingual Knowledge Base",
        score: 9.0,
        description: "Host Arabic and English customer self-service articles with SEO optimization."
      }
    ],
    gulfSuitabilityAnalysis: {
      summary: "In the Middle East, customer service happens largely over WhatsApp. Freshdesk excels in this region by providing a friction-free WhatsApp integration, Arabic customer portals, and flexible regional SLA calendars.",
      zatcaStatus: "N/A (Customer service tool, integrates with billing engines).",
      uaeVatStatus: "N/A.",
      arabicExperience: "Excellent customer portal Arabic support; agent portal supports Arabic inputs and formatting.",
      regionalSupport: "Active regional presence with Gulf partner network and EMEA support coverage.",
      dataResidency: "Hosted in secure global AWS cloud regions."
    },
    verdict: {
      score: 8.9,
      badge: "Best Customer Support Platform for GCC",
      summary: "A practical, cost-effective, and WhatsApp-friendly helpdesk that allows Gulf businesses to deliver responsive, bilingual customer support.",
      bestFor: "E-commerce brands, service providers, and growing tech platforms in Saudi and the UAE.",
      notRecommendedFor: "Large global contact centers requiring thousands of bespoke PBX lines."
    },
    similarSoftwareSlugs: ["zendesk", "hubspot-crm", "zoho-one"],
    websiteUrl: "https://freshdesk.com/",
    accentColor: "#F37023",
    badges: ["WhatsApp Omnichannel", "Bilingual Support", "GCC Workweek SLA"]
  },
  {
    id: "sap-business-one",
    slug: "sap-business-one",
    name: "SAP Business One",
    tagline: "Enterprise-Grade Digital Core for High-Volume Gulf Enterprises",
    description: "The premier tier-2 enterprise management system built specifically for established mid-market enterprises. Known for ironclad financial governance, complex supply chain modeling, and widespread GCC partner certification.",
    category: "erp-business-management",
    categoryName: "ERP & Business Management",
    rating: 4.5,
    reviewCount: 34,
    isVerifiedReview: false,
    sampleNotice: "Illustrative evaluation profile based on public GCC specifications and regional feature availability.",
    countrySuitability: ["Saudi Arabia", "UAE", "GCC"],
    arabicSupport: "Native UI & RTL",
    localCompliance: [
      "Certified ZATCA Phase 2 E-Invoicing (via certified SAP Gold Partners)",
      "GCC Unified VAT Framework Compliant",
      "GOSI & Saudi Labor Law Audit Readiness",
      "Strict Saudi PDPL & UAE Federal Data Law Compliance"
    ],
    localIntegrations: [
      "Direct integration with major Saudi & UAE corporate banks (NCB, Al Rajhi, FAB, ENBD)",
      "Bespoke WMS and RFID warehouse management systems",
      "Industrial manufacturing PLC and IoT sensors",
      "Enterprise customs declaration systems (FASAH KSA / Dubai Customs)"
    ],
    pricing: {
      model: "Enterprise Quote",
      startingPrice: "Custom Quote",
      currency: "USD",
      billingPeriod: "annual license / perpetual + implementation",
      regionalNote: "Typically requires implementation investment starting from $25,000 to $80,000+ depending on customization.",
      tiers: [
        {
          name: "Professional User",
          price: "Quote",
          period: "user/month or perpetual",
          regionalEstimateSAR: "Contact Partner",
          regionalEstimateAED: "Contact Partner",
          description: "Full access to all operational, financial, and administrative functionality.",
          features: [
            "Complete financial accounting and reporting",
            "Full supply chain & multi-warehouse controls",
            "Production planning & material requirements (MRP)",
            "Custom workflow approvals and audit trails"
          ],
          highlight: true
        },
        {
          name: "Limited User (CRM / Logistics)",
          price: "Quote",
          period: "user/month",
          regionalEstimateSAR: "Contact Partner",
          regionalEstimateAED: "Contact Partner",
          description: "Restricted role-based license for sales reps or warehouse staff.",
          features: [
            "Role-specific data entry",
            "Mobile sales and inventory scanning",
            "Restricted administrative visibility",
            "Cost-effective license tiering"
          ]
        }
      ]
    },
    easeOfUse: 7.3,
    deploymentTime: "8 - 20 Weeks",
    pros: [
      "Uncompromising financial controls, audit logs, and fraud prevention protocols",
      "Massive network of certified SAP Gold and Platinum implementation partners across GCC",
      "Flawlessly handles high-volume inventory, multi-company consolidation, and intercompany billing",
      "High credibility with regional commercial banks, investors, and prospective IPO auditors"
    ],
    cons: [
      "Substantial upfront implementation cost and longer deployment timelines",
      "Traditional user interface requires formal staff training",
      "Ongoing maintenance and custom changes necessitate certified partner billing"
    ],
    keyFeatures: [
      {
        title: "Enterprise Financial Governance",
        score: 9.9,
        description: "Rigorous IFRS financial structures, multi-currency ledgers, and impenetrable audit trails."
      },
      {
        title: "Supply Chain & Multi-Warehouse",
        score: 9.7,
        description: "Advanced batch, serial number, and bin location tracking across multiple GCC distribution centers."
      },
      {
        title: "Partner Certification Ecosystem",
        score: 9.5,
        description: "Dozens of certified regional system integrators available in Riyadh, Al Khobar, and Dubai."
      }
    ],
    gulfSuitabilityAnalysis: {
      summary: "SAP Business One is the gold standard for established trading conglomerates, pharmaceutical distributors, and manufacturing groups in Saudi Arabia and the UAE. When corporate governance, IPO readiness, or complex multi-company structures are required, SAP B1 is unmatched.",
      zatcaStatus: "Supported via certified regional SAP partners with official ZATCA Phase 2 Fatoora connectors.",
      uaeVatStatus: "Full FTA VAT compliance with automated tax return generation.",
      arabicExperience: "Complete Arabic interface with RTL support and localized documentation.",
      regionalSupport: "World-class regional presence with SAP Middle East headquarters in Dubai and Riyadh.",
      dataResidency: "Can be hosted locally on SAP HANA Enterprise Cloud, local cloud providers, or on-premise."
    },
    verdict: {
      score: 9.2,
      badge: "Best for Established GCC Mid-Market & Enterprises",
      summary: "A robust, battle-tested digital core that gives GCC executives complete confidence in financial governance, supply chain velocity, and regional regulatory compliance.",
      bestFor: "Mid-to-large trading companies, manufacturers, and multi-entity conglomerates preparing for audit or IPO.",
      notRecommendedFor: "Early-stage startups or micro-teams seeking lightweight, self-serve software."
    },
    similarSoftwareSlugs: ["odoo", "zoho-one"],
    websiteUrl: "https://www.sap.com/products/erp/business-one.html",
    accentColor: "#008FD3",
    badges: ["Enterprise Grade", "IPO Ready", "ZATCA Certified Partner", "Bespoke Supply Chain"]
  },
  {
    id: "zendesk",
    slug: "zendesk",
    name: "Zendesk Suite",
    tagline: "Scalable Omnichannel Service & Ticketing for High-Velocity Gulf Brands",
    description: "The enterprise benchmark for customer experience. Delivers sophisticated AI agent routing, comprehensive help centers, and multi-brand support for leading GCC consumer applications and institutions.",
    category: "customer-support",
    categoryName: "Customer Support",
    rating: 4.6,
    reviewCount: 37,
    isVerifiedReview: false,
    sampleNotice: "Illustrative evaluation profile based on public GCC specifications and regional feature availability.",
    countrySuitability: ["UAE", "Saudi Arabia", "GCC"],
    arabicSupport: "Native UI & RTL",
    localCompliance: [
      "SOC 2 Type II, ISO 27001",
      "Saudi PDPL & UAE Personal Data Protection Compliance",
      "HIPAA / Financial Services Grade Security"
    ],
    localIntegrations: [
      "Enterprise WhatsApp Business Solution Providers (Karix, Infobip, Twilio)",
      "Amazon Connect UAE Telephony",
      "Salesforce & Microsoft Dynamics Connectors",
      "Local GCC Mobile App SDKs (iOS & Android)"
    ],
    pricing: {
      model: "Monthly Subscription",
      startingPrice: "$55",
      currency: "USD",
      billingPeriod: "per agent / month (Suite Team, billed annually)",
      regionalNote: "Premium enterprise pricing with advanced AI agent credits available.",
      tiers: [
        {
          name: "Suite Team",
          price: "$55",
          period: "agent/month",
          regionalEstimateSAR: "206 SAR/mo",
          regionalEstimateAED: "202 AED/mo",
          description: "Foundational omnichannel ticketing across email, chat, voice, and social.",
          features: [
            "Ticketing system across all digital channels",
            "Single help center with bilingual support",
            "Pre-built analytics dashboards",
            "Standard business hours and SLAs"
          ]
        },
        {
          name: "Suite Growth",
          price: "$89",
          period: "agent/month",
          regionalEstimateSAR: "334 SAR/mo",
          regionalEstimateAED: "327 AED/mo",
          description: "Multiple ticket forms, multi-brand support, and SLA policies.",
          features: [
            "Multiple help centers for distinct GCC brands",
            "Custom ticket forms and conditional fields",
            "Multilingual content management (Arabic & English)",
            "Customer satisfaction (CSAT) surveys"
          ],
          highlight: true
        },
        {
          name: "Suite Professional",
          price: "$115",
          period: "agent/month",
          regionalEstimateSAR: "431 SAR/mo",
          regionalEstimateAED: "422 AED/mo",
          description: "Enterprise routing, workforce management, and advanced AI agents.",
          features: [
            "Skills-based routing to Arabic-specialist agents",
            "Integrated voice with regional call routing",
            "Advanced conversational AI bots",
            "Custom analytics and real-time dashboards"
          ]
        }
      ]
    },
    easeOfUse: 8.7,
    deploymentTime: "2 - 6 Weeks",
    pros: [
      "Unrivaled scalability for fast-growing GCC super-apps, fintechs, and airlines",
      "Skills-based routing directs Arabic queries to native Arabic-speaking support reps automatically",
      "Outstanding knowledge base builder with complete RTL and dual-language switching",
      "Deep marketplace of enterprise connectors and custom API webhooks"
    ],
    cons: [
      "Higher price point compared to Freshdesk or Zoho Desk",
      "Advanced AI features carry separate token usage charges",
      "Requires dedicated administration for complex multi-brand routing setups"
    ],
    keyFeatures: [
      {
        title: "Skills-Based Language Routing",
        score: 9.7,
        description: "Intelligently classifies incoming queries by language and routes Arabic requests directly to fluent team members."
      },
      {
        title: "Multilingual Help Center",
        score: 9.6,
        description: "Flawless Arabic RTL knowledge base with dynamic language toggling and contextual search."
      },
      {
        title: "Enterprise Security & SLA",
        score: 9.8,
        description: "Custom operational SLAs with granular tracking across different regional holiday schedules."
      }
    ],
    gulfSuitabilityAnalysis: {
      summary: "Zendesk is the preferred customer service platform for premier regional brands such as Careem, Tamara, and luxury hospitality groups across the GCC. Its capacity to handle millions of interactions with sophisticated language routing is unmatched.",
      zatcaStatus: "N/A (Integrates with core billing platforms).",
      uaeVatStatus: "N/A.",
      arabicExperience: "Exceptional: Native RTL knowledge base, bilingual macros, and automated language detection.",
      regionalSupport: "Regional team based in Dubai with dedicated Middle East customer success managers.",
      dataResidency: "Enterprise cloud with advanced security compliance certifications."
    },
    verdict: {
      score: 9.4,
      badge: "Best Enterprise Customer Experience",
      summary: "The definitive customer support platform for high-growth consumer apps, fintechs, and regional enterprises requiring elite omnichannel reliability and bilingual routing.",
      bestFor: "Fintechs, e-commerce leaders, and enterprises in UAE and KSA with dedicated support teams.",
      notRecommendedFor: "Small teams with 2 to 3 staff looking for a low-cost email ticket tracker."
    },
    similarSoftwareSlugs: ["freshdesk", "hubspot-crm"],
    websiteUrl: "https://www.zendesk.com/",
    accentColor: "#03363D",
    badges: ["Enterprise Scale", "Arabic Routing", "Multi-Brand Ready"]
  },
  {
    id: "deel",
    slug: "deel",
    name: "Deel",
    tagline: "Global Payroll & Regional HR Compliance for Expanding Middle East Teams",
    description: "Streamline international hiring, contractor compliance, and regional GCC payroll. Seamlessly hire and pay talent in UAE, Saudi Arabia, and across 150+ countries with local labor law compliance.",
    category: "hr-payroll",
    categoryName: "HR & Payroll",
    rating: 4.7,
    reviewCount: 35,
    isVerifiedReview: false,
    sampleNotice: "Illustrative evaluation profile based on public GCC specifications and regional feature availability.",
    countrySuitability: ["UAE", "Saudi Arabia", "GCC"],
    arabicSupport: "Partial (Portal / Forms)",
    localCompliance: [
      "UAE MOHRE Wage Protection System (WPS) Compliant",
      "Saudi Arabia Mudad & GOSI Payroll Integration",
      "GCC End-of-Service Gratuity (EOSG) Calculation Automation",
      "Statutory Local Social Security Deductions"
    ],
    localIntegrations: [
      "Local bank disbursements in AED and SAR via direct ACH",
      "Saudi Qiwa & Muqeem employment contract synchronization",
      "Xero, QuickBooks, and NetSuite accounting sync",
      "Slack and Google Workspace HR automated onboarding"
    ],
    pricing: {
      model: "Monthly Subscription",
      startingPrice: "$29",
      currency: "USD",
      billingPeriod: "per employee / month (Deel HR Free for up to 200 people)",
      regionalNote: "Free core HR platform; contractor management from $29/mo; Employer of Record (EOR) from $599/mo.",
      tiers: [
        {
          name: "Deel HR",
          price: "$0",
          period: "up to 200 people",
          regionalEstimateSAR: "0 SAR",
          regionalEstimateAED: "0 AED",
          description: "Modern HR management, time-off tracking, and document storage for all teams.",
          features: [
            "Central employee database and org charts",
            "Leave and time-off tracking with regional holidays",
            "Document collection and digital signatures",
            "Automated GCC onboarding workflows"
          ],
          highlight: true
        },
        {
          name: "Global Payroll",
          price: "$29",
          period: "employee/month",
          regionalEstimateSAR: "109 SAR/mo",
          regionalEstimateAED: "106 AED/mo",
          description: "Run payroll for your direct regional entities in Saudi Arabia and the UAE.",
          features: [
            "WPS file generation for UAE and Saudi banks",
            "Automated GOSI social security deductions",
            "End of Service gratuity liability calculation",
            "Bilingual digital salary slips"
          ]
        }
      ]
    },
    easeOfUse: 9.3,
    deploymentTime: "1 - 3 Weeks",
    pros: [
      "Automates tedious End-of-Service Gratuity calculations according to Saudi and UAE labor laws",
      "Generates Wage Protection System (WPS) compliant files to ensure regulatory compliance",
      "Free core HR platform saves early-stage GCC companies thousands in software overhead",
      "Effortless contractor payments in local SAR, AED, or USD currencies"
    ],
    cons: [
      "Employer of Record (EOR) service carries premium per-employee monthly fees",
      "Full Arabic employee mobile app is continually evolving",
      "Custom government visa portal synchronizations require periodic administrative checks"
    ],
    keyFeatures: [
      {
        title: "Labor Law Compliance",
        score: 9.7,
        description: "Pre-loaded with Saudi Labor Law and UAE Decree Law contracts with statutory probation and notice rules."
      },
      {
        title: "WPS Payroll Generation",
        score: 9.6,
        description: "Produces standardized SIF/WPS electronic files for direct submission to central bank systems."
      },
      {
        title: "End of Service Calculator",
        score: 9.5,
        description: "Automatically computes statutory gratuity reserves according to tenure and termination terms."
      }
    ],
    gulfSuitabilityAnalysis: {
      summary: "Deel has transformed how UAE and Saudi companies manage their increasingly distributed workforces. With deep local knowledge of WPS and End of Service calculations, it eliminates manual Excel spreadsheets for GCC HR directors.",
      zatcaStatus: "N/A (HR and payroll platform).",
      uaeVatStatus: "Invoices clear of local VAT with appropriate cross-border billing.",
      arabicExperience: "Employee onboarding documents support Arabic; portal navigation available in multiple languages.",
      regionalSupport: "Fast-growing regional offices in Dubai and Riyadh with local labor law specialists.",
      dataResidency: "Enterprise global cloud with strict data privacy adherence."
    },
    verdict: {
      score: 9.3,
      badge: "Best HR & Payroll for Modern Gulf Teams",
      summary: "An indispensable platform for companies in KSA and UAE managing local and remote talent, ensuring seamless WPS payroll and labor law compliance.",
      bestFor: "Scaleups, agencies, and regional tech firms employing both local and remote GCC talent.",
      notRecommendedFor: "Traditional industrial plants with 10,000 blue-collar biometric punch-clock operations."
    },
    similarSoftwareSlugs: ["zoho-one", "odoo"],
    websiteUrl: "https://www.deel.com/",
    accentColor: "#2C3437",
    badges: ["WPS Compliant", "End of Service Auto-Calc", "Free Core HR"]
  },
  {
    id: "shopify-plus",
    slug: "shopify-plus",
    name: "Shopify Plus",
    tagline: "High-Volume E-Commerce Platform with Native Gulf Payment & Logistics Support",
    description: "The enterprise e-commerce platform powering leading Middle Eastern direct-to-consumer and omnichannel brands. Features seamless Mada, Tabby, Tamara, and Aramex integrations with Arabic checkout.",
    category: "ecommerce",
    categoryName: "E-Commerce",
    rating: 4.8,
    reviewCount: 46,
    isVerifiedReview: false,
    sampleNotice: "Illustrative evaluation profile based on public GCC specifications and regional feature availability.",
    countrySuitability: ["Saudi Arabia", "UAE", "GCC"],
    arabicSupport: "Native UI & RTL",
    localCompliance: [
      "Saudi Ministry of Commerce E-Commerce Law Compliant",
      "UAE National E-Commerce Framework Aligned",
      "ZATCA E-Invoicing Integration (via certified Shopify Apps)",
      "PCI DSS Level 1 Security"
    ],
    localIntegrations: [
      "Mada (Saudi Debit Network)",
      "Tabby & Tamara (Buy Now Pay Later in KSA & UAE)",
      "Apple Pay Middle East Native Checkout",
      "SMSA Express, Aramex, and DHL Express GCC Shipping",
      "PayTabs, Tap Payments, and Telr"
    ],
    pricing: {
      model: "Monthly Subscription",
      startingPrice: "$39",
      currency: "USD",
      billingPeriod: "per month (Basic Plan) / Plus from $2,300/mo",
      regionalNote: "Standard Shopify plans start at $39/mo; Shopify Plus designed for brands exceeding $1M annual GMV.",
      tiers: [
        {
          name: "Shopify Basic",
          price: "$39",
          period: "month",
          regionalEstimateSAR: "146 SAR/mo",
          regionalEstimateAED: "143 AED/mo",
          description: "Everything you need to launch a modern bilingual GCC online store.",
          features: [
            "Full online store with Arabic RTL theme support",
            "Mada, Tabby, Tamara, and Apple Pay acceptance",
            "Up to 2 staff accounts",
            "Competitive transaction fees"
          ]
        },
        {
          name: "Shopify Plus",
          price: "$2,300",
          period: "month",
          regionalEstimateSAR: "8,625 SAR/mo",
          regionalEstimateAED: "8,445 AED/mo",
          description: "Enterprise scale, custom checkout extensibility, and 9 expansion stores.",
          features: [
            "Bespoke Arabic checkout customization",
            "Up to 9 localized expansion stores (e.g. .sa, .ae, .kw)",
            "Automated wholesale B2B portal",
            "Dedicated merchant success manager"
          ],
          highlight: true
        }
      ]
    },
    easeOfUse: 9.5,
    deploymentTime: "1 - 4 Weeks",
    pros: [
      "Flawless integration with dominant Gulf payment methods: Mada, Tabby, Tamara, and Apple Pay",
      "Rich ecosystem of beautiful Arabic RTL themes with high conversion rates",
      "Unmatched 99.99% uptime during high-traffic GCC retail events (White Friday, Ramadan, National Day)",
      "Automated multi-currency and multi-language store switching for GCC cross-border sales"
    ],
    cons: [
      "ZATCA Phase 2 compliance requires using a certified third-party app or ERP sync",
      "Shopify Plus carries a high entry cost suited primarily for proven revenue-generating stores",
      "Third-party payment gateway transaction fees apply if not using Shopify Payments"
    ],
    keyFeatures: [
      {
        title: "Regional Payment Acceptance",
        score: 9.9,
        description: "Native one-click checkout supporting Mada, Apple Pay, Tamara, Tabby, and regional credit cards."
      },
      {
        title: "Bilingual Storefronts & RTL",
        score: 9.7,
        description: "Native multi-language engine renders English and Arabic side-by-side with fluid RTL formatting."
      },
      {
        title: "Ramadan & Peak Traffic Resiliency",
        score: 9.9,
        description: "Handles flash sales and White Friday traffic spikes with zero infrastructure degradation."
      }
    ],
    gulfSuitabilityAnalysis: {
      summary: "Shopify is the gold standard for modern retail brands in Riyadh, Dubai, and across the GCC. Its native compatibility with Mada and BNPL giants Tabby and Tamara yields conversion rates significantly higher than legacy custom carts.",
      zatcaStatus: "Compatible via ZATCA-certified Shopify App store connectors (e.g. Salla sync or Odoo/Zoho ERP sync).",
      uaeVatStatus: "Native tax configuration accurately calculates 5% UAE VAT and displays tax breakdowns on order receipts.",
      arabicExperience: "Superb: modern themes support Arabic typography, right-to-left layout, and bilingual product catalogues.",
      regionalSupport: "Dedicated regional merchant team with extensive Gulf digital agency ecosystem.",
      dataResidency: "Global CDN with high-speed regional points of presence in UAE and KSA."
    },
    verdict: {
      score: 9.6,
      badge: "Premier E-Commerce Engine for GCC Brands",
      summary: "The definitive e-commerce solution for Gulf brands demanding high checkout conversion, Mada and Apple Pay support, and peak-season reliability.",
      bestFor: "DTC brands, omnichannel retailers, and expanding Gulf fashion and lifestyle merchants.",
      notRecommendedFor: "B2B manufacturers with complex custom configure-price-quote (CPQ) engineering needs."
    },
    similarSoftwareSlugs: ["odoo", "zoho-one"],
    websiteUrl: "https://www.shopify.com/plus",
    accentColor: "#96BF48",
    badges: ["Mada & BNPL Ready", "White Friday Proven", "Arabic RTL Native"]
  },
  {
    id: "monday-com",
    slug: "monday-com",
    name: "Monday.com Work OS",
    tagline: "Visual Collaborative Work Management for Modern Middle Eastern Organizations",
    description: "An intuitive work operating system enabling teams to build custom workflow apps, project trackers, and executive dashboards. Highly favored by creative agencies, government PMOs, and developers in Dubai and Riyadh.",
    category: "project-management",
    categoryName: "Project Management",
    rating: 4.6,
    reviewCount: 33,
    isVerifiedReview: false,
    sampleNotice: "Illustrative evaluation profile based on public GCC specifications and regional feature availability.",
    countrySuitability: ["UAE", "Saudi Arabia", "GCC"],
    arabicSupport: "English Only (Arabic Docs)",
    localCompliance: [
      "ISO 27001, SOC 2 Type II Certified",
      "UAE Regional Enterprise Data Center Availability (AWS UAE)",
      "GDPR & Regional Privacy Alignment"
    ],
    localIntegrations: [
      "Microsoft Teams & Office 365 GCC instances",
      "Google Workspace & Slack",
      "Jira & GitHub for technical sprint tracking",
      "Power BI and Tableau enterprise dashboards"
    ],
    pricing: {
      model: "Monthly Subscription",
      startingPrice: "$9",
      currency: "USD",
      billingPeriod: "per seat / month (Basic Plan, billed annually)",
      regionalNote: "Minimum 3 seats required for paid tiers. Enterprise tier offers dedicated UAE data hosting.",
      tiers: [
        {
          name: "Basic",
          price: "$9",
          period: "seat/month",
          regionalEstimateSAR: "34 SAR/mo",
          regionalEstimateAED: "33 AED/mo",
          description: "Essential task tracking and shared boards for small internal teams.",
          features: [
            "Unlimited boards and docs",
            "Over 200 project templates",
            "iOS and Android mobile apps",
            "1 week activity log history"
          ]
        },
        {
          name: "Standard",
          price: "$12",
          period: "seat/month",
          regionalEstimateSAR: "45 SAR/mo",
          regionalEstimateAED: "44 AED/mo",
          description: "Timeline, Gantt charts, calendar views, and cross-board automations.",
          features: [
            "Timeline & Gantt views",
            "Calendar and map views",
            "250 automation actions per month",
            "Shareable guest boards for GCC clients"
          ],
          highlight: true
        },
        {
          name: "Pro",
          price: "$19",
          period: "seat/month",
          regionalEstimateSAR: "71 SAR/mo",
          regionalEstimateAED: "70 AED/mo",
          description: "Workload tracking, private boards, time tracking, and formula columns.",
          features: [
            "Private boards and fine-grained permissions",
            "Formula column and dependency tracking",
            "Time tracking per task",
            "Resource workload management"
          ]
        }
      ]
    },
    easeOfUse: 9.3,
    deploymentTime: "3 - 10 Days",
    pros: [
      "Visually stunning and delightful interface that drives rapid user adoption across teams",
      "Powerful Gantt and Timeline views ideal for government PMOs and marketing campaigns",
      "Workload management prevents team burnout during demanding regional launch cycles",
      "Seamless integration with Microsoft 365, widely used in Gulf corporate environments"
    ],
    cons: [
      "The web app UI does not offer full Arabic right-to-left layout localization",
      "Minimum 3-seat requirement makes it less suited for solo consultants",
      "Pricing can add up quickly as automation action caps are reached"
    ],
    keyFeatures: [
      {
        title: "Visual Board Flexibility",
        score: 9.6,
        description: "Transform tables into Gantt, Kanban, Calendar, and Workload views with a single click."
      },
      {
        title: "Cross-Platform Automations",
        score: 9.4,
        description: "Trigger automatic task assignments, email notifications, and status updates without coding."
      },
      {
        title: "Executive PMO Dashboards",
        score: 9.3,
        description: "Roll up data across 50+ individual project boards into high-level KPI overviews for directors."
      }
    ],
    gulfSuitabilityAnalysis: {
      summary: "Monday.com has achieved rapid adoption across UAE media agencies, real estate developers, and Saudi Vision 2030 project offices. Its visual clarity makes project status instantly understandable for multinational teams.",
      zatcaStatus: "N/A (Work and project management).",
      uaeVatStatus: "N/A.",
      arabicExperience: "Text fields fully support Arabic input; main navigation and button chrome remain in English.",
      regionalSupport: "Certified regional training partners across UAE and Saudi Arabia.",
      dataResidency: "Enterprise plans support regional hosting on AWS Middle East (UAE)."
    },
    verdict: {
      score: 9.1,
      badge: "Best Visual Project Management Tool",
      summary: "The top choice for Gulf teams seeking a beautiful, highly adaptable project tracker that breaks down departmental silos and elevates executive reporting.",
      bestFor: "Creative agencies, marketing departments, PMOs, and tech teams across KSA and UAE.",
      notRecommendedFor: "Teams requiring 100% Arabic native menu navigation."
    },
    similarSoftwareSlugs: ["zoho-one", "hubspot-crm"],
    websiteUrl: "https://monday.com/",
    accentColor: "#6C5CE7",
    badges: ["Visual Work OS", "PMO Dashboards", "UAE AWS Hosting Option"]
  },
  {
    id: "activecampaign",
    slug: "activecampaign",
    name: "ActiveCampaign",
    tagline: "Intelligent Marketing Automation & Omnichannel Customer Journeys",
    description: "An advanced marketing automation and customer experience platform. Combines email marketing, SMS, CRM, and predictive AI to nurture Gulf leads through sophisticated multi-touch campaigns.",
    category: "marketing-automation",
    categoryName: "Marketing Automation",
    rating: 4.5,
    reviewCount: 28,
    isVerifiedReview: false,
    sampleNotice: "Illustrative evaluation profile based on public GCC specifications and regional feature availability.",
    countrySuitability: ["UAE", "Saudi Arabia", "GCC"],
    arabicSupport: "Partial (Portal / Forms)",
    localCompliance: [
      "Anti-Spam & International Telecom Compliance",
      "Opt-In Verification & Regional Privacy Standards",
      "GDPR / CCPA Framework Aligned"
    ],
    localIntegrations: [
      "Twilio & GCC SMS Gateways",
      "Shopify, WooCommerce, and Magento stores",
      "Stripe Middle East & PayTabs",
      "Facebook & Instagram Middle East Lead Ads"
    ],
    pricing: {
      model: "Monthly Subscription",
      startingPrice: "$29",
      currency: "USD",
      billingPeriod: "per month (Starter Tier, billed annually)",
      regionalNote: "Pricing scales with total contact list size; includes unlimited email sending on marketing tiers.",
      tiers: [
        {
          name: "Starter",
          price: "$29",
          period: "month (1,000 contacts)",
          regionalEstimateSAR: "109 SAR/mo",
          regionalEstimateAED: "106 AED/mo",
          description: "Essential email marketing and automated trigger sequences.",
          features: [
            "Unlimited email sending",
            "Multi-step marketing automation",
            "Bilingual email template builder",
            "Site and event tracking"
          ]
        },
        {
          name: "Plus",
          price: "$49",
          period: "month (1,000 contacts)",
          regionalEstimateSAR: "184 SAR/mo",
          regionalEstimateAED: "180 AED/mo",
          description: "Built-in CRM, lead scoring, and conditional email content.",
          features: [
            "Sales CRM with deal stages",
            "Lead scoring and engagement tagging",
            "SMS marketing integration for GCC",
            "Landing pages and custom forms"
          ],
          highlight: true
        },
        {
          name: "Pro",
          price: "$149",
          period: "month (2,500 contacts)",
          regionalEstimateSAR: "559 SAR/mo",
          regionalEstimateAED: "547 AED/mo",
          description: "Predictive sending, split automation testing, and attribution reporting.",
          features: [
            "Predictive sending based on subscriber time zones",
            "Split testing across entire automated funnels",
            "Deep e-commerce revenue attribution",
            "1-on-1 strategy consultations"
          ]
        }
      ]
    },
    easeOfUse: 8.6,
    deploymentTime: "1 - 3 Weeks",
    pros: [
      "World-class visual automation workflow builder with infinite branching logic",
      "Email builder supports right-to-left (RTL) Arabic typography with proper alignment",
      "Predictive sending algorithms adjust to Middle Eastern opening habits (high evening engagement)",
      "Deep two-way sync with Shopify and WooCommerce regional storefronts"
    ],
    cons: [
      "The internal backend configuration interface is in English",
      "Deliverability to regional corporate mailboxes requires proper DKIM/DMARC domain authentication",
      "Pricing scales up quickly if subscriber lists are not regularly cleaned"
    ],
    keyFeatures: [
      {
        title: "Visual Journey Automation",
        score: 9.8,
        description: "Build intricate customer journeys based on website visits, purchase history, and link clicks."
      },
      {
        title: "Bilingual Email Designer",
        score: 9.1,
        description: "RTL text formatting and dynamic content blocks allow showing Arabic or English content automatically."
      },
      {
        title: "Omnichannel SMS & Email",
        score: 8.9,
        description: "Coordinate transactional emails with SMS follow-ups through regional telecom gateways."
      }
    ],
    gulfSuitabilityAnalysis: {
      summary: "ActiveCampaign is the platform of choice for performance marketers, course creators, and e-commerce brands in the UAE and Saudi Arabia who have outgrown basic newsletter tools like Mailchimp.",
      zatcaStatus: "N/A.",
      uaeVatStatus: "N/A.",
      arabicExperience: "Email campaigns and signup forms support flawless Arabic RTL rendering; backend admin in English.",
      regionalSupport: "Global 24/5 support with active EMEA digital agency network.",
      dataResidency: "Enterprise cloud hosting."
    },
    verdict: {
      score: 9.0,
      badge: "Best for Advanced E-Commerce Marketing Automation",
      summary: "The most potent customer journey builder on the market for GCC digital brands looking to turn subscribers into repeat purchasers.",
      bestFor: "DTC brands, online educators, and marketing agencies across the Gulf.",
      notRecommendedFor: "Teams only sending a single generic announcement once every quarter."
    },
    similarSoftwareSlugs: ["hubspot-crm", "zoho-one"],
    websiteUrl: "https://www.activecampaign.com/",
    accentColor: "#004CFF",
    badges: ["RTL Email Builder", "Predictive Sending", "E-Commerce Funnels"]
  }
];

export const softwareLookup: Record<string, Software> = softwares.reduce(
  (acc, s) => {
    acc[s.slug] = s;
    return acc;
  },
  {} as Record<string, Software>
);

export const softwareList = softwares;


