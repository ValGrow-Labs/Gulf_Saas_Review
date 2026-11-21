import { GccCountryProfile } from "@/types";

export const gccCountries: GccCountryProfile[] = [
  {
    id: "saudi-arabia",
    name: "Saudi Arabia",
    shortName: "KSA",
    nativeName: "المملكة العربية السعودية",
    capital: "Riyadh",
    techHubs: ["Riyadh Tech District", "Jeddah Digital City", "NEOM Oxagon", "Dhahran Techno Valley"],
    flagEmoji: "🇸🇦",
    summary: "The economic powerhouse of the GCC leading Vision 2030 digital transformations, ZATCA e-invoicing Phase 2 mandates, and a massive $40B sovereign AI capital commitment.",
    keyInitiative: "Vision 2030 National Transformation",
    metrics: {
      startups: "1,200+",
      cloudRegions: "3 (Google, Oracle, Huawei)",
      aiRank: "#1 in Arab World",
      saasGrowth: "+38% YoY"
    },
    coordinates: { x: 380, y: 360 }
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    shortName: "UAE",
    nativeName: "الإمارات العربية المتحدة",
    capital: "Abu Dhabi",
    techHubs: ["Dubai Internet City", "DIFC Innovation Hub", "Abu Dhabi Hub71", "Sharjah SRTIP"],
    flagEmoji: "🇦🇪",
    summary: "Global gateway for B2B SaaS and artificial intelligence with sovereign LLMs (Falcon), Dubai AI Campus, 0% tax free-zones, and seamless multi-currency commercial corridors.",
    keyInitiative: "UAE Digital Economy Strategy 2031",
    metrics: {
      startups: "2,100+",
      cloudRegions: "4 (AWS, Azure, Oracle, GCP)",
      aiRank: "Global Tier 1 Hub",
      saasGrowth: "+42% YoY"
    },
    coordinates: { x: 560, y: 320 }
  },
  {
    id: "qatar",
    name: "Qatar",
    shortName: "Qatar",
    nativeName: "دولة قطر",
    capital: "Doha",
    techHubs: ["Lusail Smart City", "Qatar Science & Tech Park (QSTP)", "Msheireb Downtown"],
    flagEmoji: "🇶🇦",
    summary: "Rapidly expanding technology market focusing on high-tier enterprise SaaS, sovereign cloud infrastructure with Google Cloud and Microsoft Azure, and global Web Summit events.",
    keyInitiative: "Third National Development Strategy (NDS3)",
    metrics: {
      startups: "450+",
      cloudRegions: "2 (Google Cloud, Microsoft Azure)",
      aiRank: "Top 5 Regional",
      saasGrowth: "+31% YoY"
    },
    coordinates: { x: 505, y: 295 }
  },
  {
    id: "kuwait",
    name: "Kuwait",
    shortName: "Kuwait",
    nativeName: "دولة الكويت",
    capital: "Kuwait City",
    techHubs: ["Kuwait Innovation Center", "Shuwaikh Digital Park"],
    flagEmoji: "🇰🇼",
    summary: "Strategic transformation across commercial banking, retail ERPs, and logistics with major Google Cloud public sector framework agreements and digital identity adoption.",
    keyInitiative: "New Kuwait (Vision 2035)",
    metrics: {
      startups: "380+",
      cloudRegions: "1 (Google Cloud Kuwait)",
      aiRank: "Banking Modernization Leader",
      saasGrowth: "+27% YoY"
    },
    coordinates: { x: 440, y: 175 }
  },
  {
    id: "bahrain",
    name: "Bahrain",
    shortName: "Bahrain",
    nativeName: "مملكة البحرين",
    capital: "Manama",
    techHubs: ["Bahrain FinTech Bay", "Seef Technology Hub"],
    flagEmoji: "🇧🇭",
    summary: "The pioneer of Open Banking and regulatory sandboxes in the Middle East. Home to the first regional AWS cloud infrastructure region and agile cross-border financial SaaS.",
    keyInitiative: "Economic Recovery Plan 2030",
    metrics: {
      startups: "320+",
      cloudRegions: "1 (AWS Middle East)",
      aiRank: "FinTech Regulatory Benchmark",
      saasGrowth: "+29% YoY"
    },
    coordinates: { x: 488, y: 268 }
  },
  {
    id: "oman",
    name: "Oman",
    shortName: "Oman",
    nativeName: "سلطنة عمان",
    capital: "Muscat",
    techHubs: ["Knowledge Oasis Muscat (KOM)", "Salalah Green Data Zone", "Duqm Smart Port"],
    flagEmoji: "🇴🇲",
    summary: "Emerging green data center corridor and logistics tech hub leveraging strategic subsea fiber cable landings between Asia, Europe, and Africa under Oman Vision 2040.",
    keyInitiative: "Oman Vision 2040 Tech & Logistics Mandate",
    metrics: {
      startups: "280+",
      cloudRegions: "1 (National Cloud Platform)",
      aiRank: "Green Cloud Pioneer",
      saasGrowth: "+24% YoY"
    },
    coordinates: { x: 620, y: 410 }
  }
];

// News stories are managed in the CMS (/admin) and stored in content/news.json.
