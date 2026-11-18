"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GccCountryCode } from "@/types";
import { gccCountries } from "@/data/news";
import {
  Building2,
  Sparkles,
  MapPin,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  Compass,
  Play,
  Pause,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface RealBuilding {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: GccCountryCode;
  flagEmoji: string;
  height: string;
  floors: string;
  completed: string;
  techDistrict: string;
  highlight: string;
  image: string;
}

const realBuildings: RealBuilding[] = [
  {
    id: "burj-khalifa",
    name: "Burj Khalifa",
    city: "Dubai",
    country: "United Arab Emirates",
    countryCode: "uae",
    flagEmoji: "🇦🇪",
    height: "828 m (2,717 ft)",
    floors: "163 floors",
    completed: "2010",
    techDistrict: "DIFC & Dubai AI Campus",
    highlight: "World's tallest skyscraper & global epicenter of UAE digital economy",
    image: "/buildings/burj-khalifa.jpg",
  },
  {
    id: "kingdom-centre",
    name: "Kingdom Centre",
    city: "Riyadh",
    country: "Saudi Arabia",
    countryCode: "saudi-arabia",
    flagEmoji: "🇸🇦",
    height: "302 m (992 ft)",
    floors: "99 floors",
    completed: "2002",
    techDistrict: "Riyadh Tech Corridor",
    highlight: "Iconic parabolic skybridge tower anchoring the capital's skyline",
    image: "/buildings/kingdom-centre.jpg",
  },
  {
    id: "museum-of-future",
    name: "Museum of the Future",
    city: "Dubai",
    country: "United Arab Emirates",
    countryCode: "uae",
    flagEmoji: "🇦🇪",
    height: "77 m (Torus Ring)",
    floors: "7 floors",
    completed: "2022",
    techDistrict: "Dubai Internet City & Future Labs",
    highlight: "Engineering marvel wrapped in illuminated Arabic calligraphy",
    image: "/buildings/museum-of-future.jpg",
  },
  {
    id: "riyadh-kafd",
    name: "PIF Tower (KAFD)",
    city: "Riyadh",
    country: "Saudi Arabia",
    countryCode: "saudi-arabia",
    flagEmoji: "🇸🇦",
    height: "385 m (1,263 ft)",
    floors: "80 floors",
    completed: "2021",
    techDistrict: "King Abdullah Financial District",
    highlight: "Faceted crystalline diamond skyscraper leading Vision 2030 fintech",
    image: "/buildings/riyadh-kafd.jpg",
  },
  {
    id: "kuwait-towers",
    name: "Kuwait Towers",
    city: "Kuwait City",
    country: "Kuwait",
    countryCode: "kuwait",
    flagEmoji: "🇰🇼",
    height: "187 m (614 ft)",
    floors: "Spherical Decks",
    completed: "1979",
    techDistrict: "Kuwait Digital Innovation Park",
    highlight: "Signature blue-green tiled spheres symbolizing Kuwait's modernization",
    image: "/buildings/kuwait-towers.jpg",
  },
  {
    id: "doha-towers",
    name: "Doha West Bay & Katara Towers",
    city: "Doha / Lusail",
    country: "Qatar",
    countryCode: "qatar",
    flagEmoji: "🇶🇦",
    height: "238 m & 211 m",
    floors: "46 & 38 floors",
    completed: "2012 / 2022",
    techDistrict: "Qatar Science & Technology Park",
    highlight: "Soaring crescent curved sword towers and mashrabiya architecture",
    image: "/buildings/doha-towers.jpg",
  },
  {
    id: "bahrain-wtc",
    name: "Bahrain World Trade Center",
    city: "Manama",
    country: "Bahrain",
    countryCode: "bahrain",
    flagEmoji: "🇧🇭",
    height: "240 m (787 ft)",
    floors: "50 floors",
    completed: "2008",
    techDistrict: "Bahrain FinTech Bay",
    highlight: "World's first commercial towers with integrated utility-scale wind turbines",
    image: "/buildings/bahrain-wtc.jpg",
  },
  {
    id: "muscat-opera",
    name: "Muscat Royal Architecture",
    city: "Muscat",
    country: "Oman",
    countryCode: "oman",
    flagEmoji: "🇴🇲",
    height: "Contemporary Monument",
    floors: "Complex",
    completed: "2011",
    techDistrict: "Knowledge Oasis Muscat (KOM)",
    highlight: "Contemporary Omani architectural jewel & sovereign green cloud corridor",
    image: "/buildings/muscat-opera.jpg",
  },
];

interface GulfSkylinesAnimationProps {
  selectedCountry: GccCountryCode | "all";
  onSelectCountry: (country: GccCountryCode | "all") => void;
}

export default function GulfSkylinesAnimation({
  selectedCountry,
  onSelectCountry,
}: GulfSkylinesAnimationProps) {
  const [activeTab, setActiveTab] = useState<GccCountryCode | "all">(selectedCountry);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<RealBuilding>(realBuildings[0]);

  const handleCountryClick = (country: GccCountryCode | "all") => {
    setActiveTab(country);
    onSelectCountry(country);

    if (country !== "all") {
      const match = realBuildings.find((b) => b.countryCode === country);
      if (match) setSelectedBuilding(match);
    }
  };

  const currentCountry =
    activeTab !== "all"
      ? gccCountries.find((c) => c.id === activeTab)
      : null;

  const countryBuildings =
    activeTab !== "all"
      ? realBuildings.filter((b) => b.countryCode === activeTab)
      : realBuildings;

  return (
    <div className="w-full space-y-6">
      {/* Top Controller Strip: City & Panorama Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E4DC]">
        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-[#C6A66B] flex items-center gap-1.5 mb-1">
            <Compass className="h-4.5 w-4.5" />
            <span>Interactive GCC Architectural Metropolises</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#101F35]">
            Gulf Innovation Capitals &amp; Real Landmark Buildings
          </h3>
        </div>

        {/* Tab Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => handleCountryClick("all")}
            className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "all"
                ? "bg-[#101F35] text-[#FCFAF5] shadow-sm"
                : "bg-white text-[#101F35] border border-[#E7E4DC] hover:border-[#C6A66B]"
            }`}
          >
            🏙️ All GCC Panorama
          </button>
          {gccCountries.map((country) => (
            <button
              key={country.id}
              onClick={() => handleCountryClick(country.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === country.id
                  ? "bg-[#101F35] text-[#FCFAF5] shadow-sm"
                  : "bg-white text-[#101F35] border border-[#E7E4DC] hover:border-[#C6A66B]"
              }`}
            >
              <span>{country.flagEmoji}</span>
              <span>{country.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Skyline Canvas Box */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-[#172B46] bg-gradient-to-b from-[#091322] via-[#0E1E36] to-[#12233D] shadow-2xl text-[#FCFAF5] select-none">
        {/* Ambient Sky: Real Stars, Lasers & Clouds */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Subtle star field */}
          <div className="absolute top-4 left-1/4 h-1 w-1 rounded-full bg-white opacity-80 shadow-[0_0_8px_white]" />
          <div className="absolute top-10 left-1/2 h-1 w-1 rounded-full bg-white opacity-60" />
          <div className="absolute top-6 right-1/4 h-1.5 w-1.5 rounded-full bg-[#DFCA9B] opacity-90 shadow-[0_0_6px_#C6A66B]" />
          <div className="absolute top-14 right-1/10 h-1 w-1 rounded-full bg-white opacity-70" />

          {/* Sweeping laser searchlights */}
          <div className="absolute -bottom-10 left-[22%] w-16 h-80 bg-gradient-to-t from-[#C6A66B]/20 via-[#C6A66B]/5 to-transparent blur-md animate-beam pointer-events-none" />
          <div className="absolute -bottom-10 right-[35%] w-20 h-96 bg-gradient-to-t from-sky-400/20 via-sky-400/5 to-transparent blur-md animate-beam pointer-events-none [animation-delay:3.5s]" />

          {/* Drifting Clouds */}
          <div className="absolute top-6 w-full h-20 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-2xl animate-cloud-drift pointer-events-none" />
        </div>

        {/* Status Bar */}
        <div className="relative z-20 px-6 pt-6 pb-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#101F35]/90 border border-[#C6A66B]/50 px-4 py-1.5 text-sm font-bold text-[#C6A66B] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#C6A66B] animate-ping" />
              {activeTab === "all" ? "Continuous Real Building Parallax Fly-Through" : `${currentCountry?.name} Architectural Showcase`}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-[#E7E4DC] backdrop-blur-xs">
              {activeTab === "all" ? "8 Iconic GCC Skylines in Motion" : `Tech Capital: ${currentCountry?.capital}`}
            </span>
          </div>

          {activeTab === "all" && (
            <button
              onClick={() => setIsMarqueePaused(!isMarqueePaused)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#142642] border border-[#25406B] px-3.5 py-1.5 text-sm font-semibold text-[#DFCA9B] hover:bg-[#1A3358] transition-colors cursor-pointer"
            >
              {isMarqueePaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              <span>{isMarqueePaused ? "Resume Motion" : "Pause Motion"}</span>
            </button>
          )}
        </div>

        {/* VIEW 1: CONTINUOUS MOVING REAL BUILDING MARQUEE */}
        {activeTab === "all" ? (
          <div className="relative pt-6 pb-6 overflow-hidden">
            {/* The Moving Continuous Real Building Cards Track */}
            <div
              className={`flex w-[200%] ${
                isMarqueePaused ? "" : "animate-skyline-marquee"
              } hover:[animation-play-state:paused]`}
            >
              {/* Set 1 */}
              <div className="w-1/2 flex items-end justify-between gap-5 px-6 shrink-0">
                {realBuildings.map((building) => (
                  <BuildingRealCard
                    key={`s1-${building.id}`}
                    building={building}
                    onSelect={() => handleCountryClick(building.countryCode)}
                  />
                ))}
              </div>

              {/* Set 2 (Duplicates Set 1 for seamless infinite loop) */}
              <div className="w-1/2 flex items-end justify-between gap-5 px-6 shrink-0">
                {realBuildings.map((building) => (
                  <BuildingRealCard
                    key={`s2-${building.id}`}
                    building={building}
                    onSelect={() => handleCountryClick(building.countryCode)}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Boulevard / Marina Water Strip */}
            <div className="relative mt-6 h-14 bg-gradient-to-t from-[#060D18] to-[#0A1628] border-t border-[#1C3354] flex items-center justify-between px-6 text-xs text-[#8BA0BD] z-10">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">Live Regional Enterprise Innovation Corridors</span>
                <span className="hidden md:inline text-[#697386]">
                  • High-Velocity Sovereign Clouds &amp; AI Clusters
                </span>
              </div>
              <div className="text-[11px] text-[#C6A66B] font-semibold">
                Hover any landmark to pause &amp; inspect • Click to explore city
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 2: DEDICATED CITY REAL ARCHITECTURAL SHOWCASE */
          <div className="pt-6 pb-6 px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
              {/* Left: Real Building Showcase Cards (Col 7) */}
              <div className="lg:col-span-7 flex flex-wrap items-center justify-center gap-6 py-4">
                {countryBuildings.map((b) => (
                  <div
                    key={b.id}
                    className="group relative w-full sm:w-[320px] rounded-2xl overflow-hidden border border-[#2B4670] bg-[#0E1E34] shadow-xl transition-all duration-300 hover:border-[#C6A66B] hover:shadow-[0_12px_36px_rgba(198,166,107,0.25)] hover:-translate-y-1"
                  >
                    {/* Real Building Image with Altitude overlay */}
                    <div className="relative aspect-4/5 w-full overflow-hidden bg-[#0A1628]">
                      <Image
                        src={b.image}
                        alt={b.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="320px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1E34] via-[#0E1E34]/30 to-transparent" />

                      {/* Beacon Strobe Top Left */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-[#101F35]/90 border border-[#C6A66B]/50 px-2.5 py-0.5 text-[11px] font-bold text-[#C6A66B] backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-beacon" />
                        <span>{b.height}</span>
                      </div>

                      {/* City Badge Top Right */}
                      <span className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-xs">
                        {b.city}
                      </span>

                      {/* Content Overlay at bottom of photo */}
                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <h4 className="text-xl font-bold font-editorial text-white leading-tight">
                          {b.name}
                        </h4>
                        <span className="text-xs text-[#C6A66B] font-semibold block mt-0.5">
                          {b.techDistrict}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2 text-xs">
                      <p className="text-[#C8D5E5] leading-relaxed">
                        {b.highlight}
                      </p>
                      <div className="pt-2 border-t border-[#1C3354] flex items-center justify-between text-[#8BA0BD]">
                        <span>Completed: {b.completed}</span>
                        <span>{b.floors}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: National Tech Transformation Metrics Card (Col 5) */}
              {currentCountry && (
                <div className="lg:col-span-5 rounded-2xl border border-[#22395C] bg-[#0A1628]/90 backdrop-blur-md p-6 space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{currentCountry.flagEmoji}</span>
                        <h4 className="text-2xl font-bold font-editorial text-white">
                          {currentCountry.name}
                        </h4>
                      </div>
                      <span className="text-xs text-[#C6A66B] font-semibold block mt-1">
                        Capital: {currentCountry.capital} • {currentCountry.nativeName}
                      </span>
                    </div>
                    <span className="rounded-lg bg-[#C6A66B]/20 border border-[#C6A66B]/40 px-3 py-1 text-xs font-bold text-[#DFCA9B]">
                      {currentCountry.metrics.aiRank}
                    </span>
                  </div>

                  <p className="text-sm text-[#C8D5E5] leading-relaxed">
                    {currentCountry.summary}
                  </p>

                  <div className="rounded-xl bg-[#102038] border border-[#1C3252] p-3.5 text-xs">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C6A66B] block mb-1">
                      National Vision &amp; Policy Mandate:
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {currentCountry.keyInitiative}
                    </span>
                  </div>

                  {/* 4 Quantitative Metrics */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="rounded-xl bg-[#0F223D] border border-[#1F3A60] p-3 text-center">
                      <span className="text-xs text-[#8BA0BD] block">Startups</span>
                      <strong className="text-lg font-extrabold text-white">
                        {currentCountry.metrics.startups}
                      </strong>
                    </div>
                    <div className="rounded-xl bg-[#0F223D] border border-[#1F3A60] p-3 text-center">
                      <span className="text-xs text-[#8BA0BD] block">Cloud Regions</span>
                      <strong className="text-lg font-extrabold text-[#C6A66B]">
                        {currentCountry.metrics.cloudRegions}
                      </strong>
                    </div>
                    <div className="rounded-xl bg-[#0F223D] border border-[#1F3A60] p-3 text-center">
                      <span className="text-xs text-[#8BA0BD] block">SaaS YoY</span>
                      <strong className="text-lg font-extrabold text-emerald-400">
                        {currentCountry.metrics.saasGrowth}
                      </strong>
                    </div>
                    <div className="rounded-xl bg-[#0F223D] border border-[#1F3A60] p-3 text-center">
                      <span className="text-xs text-[#8BA0BD] block">Tech District</span>
                      <strong className="text-xs font-bold text-white truncate block">
                        {currentCountry.techHubs[0]}
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Strip */}
            <div className="h-12 bg-gradient-to-t from-[#060D18] to-[#0A1628] -mx-4 sm:-mx-8 -mb-6 px-6 flex items-center justify-between text-xs text-[#8BA0BD] border-t border-[#1C3354]">
              <span className="flex items-center gap-1.5 text-white font-medium">
                <MapPin className="h-3.5 w-3.5 text-[#C6A66B]" />
                Key Hubs: {currentCountry?.techHubs.slice(0, 3).join(" • ")}
              </span>
              <button
                onClick={() => handleCountryClick("all")}
                className="text-[#C6A66B] hover:text-white font-bold cursor-pointer"
              >
                Return to Full Panorama &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Individual Real Building Card for the Moving Panorama */
function BuildingRealCard({
  building,
  onSelect,
}: {
  building: RealBuilding;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className="group relative w-64 sm:w-72 shrink-0 rounded-2xl overflow-hidden border border-[#233C61] bg-[#0B182B] shadow-lg transition-all duration-300 hover:border-[#C6A66B] hover:shadow-[0_16px_40px_rgba(198,166,107,0.3)] hover:-translate-y-2 cursor-pointer"
    >
      {/* Real Building Photo */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-[#081220]">
        <Image
          src={building.image}
          alt={building.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-108"
          sizes="288px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B182B] via-[#0B182B]/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#101F35]/90 border border-[#C6A66B]/50 px-3 py-1 text-xs font-bold text-[#C6A66B] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-beacon" />
            <span>{building.height}</span>
          </span>
          <span className="rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-xs">
            {building.flagEmoji} {building.city}
          </span>
        </div>

        {/* Building Name on bottom of photo */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <h4 className="text-xl font-bold font-editorial text-white leading-tight group-hover:text-[#DFCA9B] transition-colors">
            {building.name}
          </h4>
          <span className="text-xs text-[#C6A66B] font-semibold block mt-0.5 truncate">
            {building.techDistrict}
          </span>
        </div>
      </div>

      {/* Building Facts Strip */}
      <div className="p-4 space-y-2 text-[13px] border-t border-[#1C3354]">
        <p className="text-[#C8D5E5] line-clamp-2 leading-relaxed">
          {building.highlight}
        </p>
        <div className="pt-2 border-t border-[#1C3354]/60 flex items-center justify-between text-xs text-[#8BA0BD]">
          <span>{building.floors}</span>
          <span className="text-[#C6A66B] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
            Explore &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
