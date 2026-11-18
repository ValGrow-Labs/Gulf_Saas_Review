"use client";

import React, { useState } from "react";
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
  Eye,
  Compass,
} from "lucide-react";

interface GulfSkylinesAnimationProps {
  selectedCountry: GccCountryCode | "all";
  onSelectCountry: (country: GccCountryCode | "all") => void;
}

export default function GulfSkylinesAnimation({
  selectedCountry,
  onSelectCountry,
}: GulfSkylinesAnimationProps) {
  const [activeTab, setActiveTab] = useState<GccCountryCode | "all">(selectedCountry);
  const [isHovered, setIsHovered] = useState(false);

  const handleCountryClick = (country: GccCountryCode | "all") => {
    setActiveTab(country);
    onSelectCountry(country);
  };

  const currentCountry =
    activeTab !== "all"
      ? gccCountries.find((c) => c.id === activeTab)
      : null;

  return (
    <div className="w-full space-y-6">
      {/* Top Controller Strip: City & Panorama Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E4DC]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C6A66B] flex items-center gap-1.5 mb-1">
            <Compass className="h-4 w-4" />
            <span>Interactive GCC Metropolis Showcase</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#101F35]">
            Gulf Innovation Metropolises &amp; Architectural Skylines
          </h3>
        </div>

        {/* Tab Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => handleCountryClick("all")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "all"
                ? "bg-[#101F35] text-[#FCFAF5] shadow-sm"
                : "bg-white text-[#101F35] border border-[#E7E4DC] hover:border-[#C6A66B]"
            }`}
          >
            🏙️ Panoramic Fly-Through
          </button>
          {gccCountries.map((country) => (
            <button
              key={country.id}
              onClick={() => handleCountryClick(country.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shrink-0 cursor-pointer ${
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
      <div
        className="relative w-full rounded-3xl overflow-hidden border border-[#172B46] bg-gradient-to-b from-[#091322] via-[#0D1C33] to-[#12233D] shadow-xl text-[#FCFAF5] select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Ambient Sky Decor: Stars & Laser Beams */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle star field */}
          <div className="absolute top-4 left-1/4 h-1 w-1 rounded-full bg-white opacity-80 shadow-[0_0_8px_white]" />
          <div className="absolute top-10 left-1/2 h-1 w-1 rounded-full bg-white opacity-60" />
          <div className="absolute top-6 right-1/4 h-1.5 w-1.5 rounded-full bg-[#DFCA9B] opacity-90 shadow-[0_0_6px_#C6A66B]" />
          <div className="absolute top-16 right-1/6 h-1 w-1 rounded-full bg-white opacity-70" />
          <div className="absolute top-12 left-1/12 h-1 w-1 rounded-full bg-[#DFCA9B] opacity-50" />

          {/* Sweeping searchlight beams from the tech district */}
          <div className="absolute -bottom-10 left-[22%] w-16 h-80 bg-gradient-to-t from-[#C6A66B]/25 via-[#C6A66B]/5 to-transparent blur-md animate-beam pointer-events-none" />
          <div className="absolute -bottom-10 right-[35%] w-20 h-96 bg-gradient-to-t from-sky-400/20 via-sky-400/5 to-transparent blur-md animate-beam pointer-events-none [animation-delay:3s]" />

          {/* Drifting Clouds */}
          <div className="absolute top-8 w-full h-16 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl animate-cloud-drift pointer-events-none" />
        </div>

        {/* Status Overlay Badge */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#101F35]/90 border border-[#C6A66B]/50 px-3 py-1 text-xs font-bold text-[#C6A66B] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#C6A66B] animate-ping" />
            {activeTab === "all" ? "Continuous GCC Skyline Panorama" : `${currentCountry?.name} Tech Capital`}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-[#E7E4DC] backdrop-blur-xs">
            {activeTab === "all" ? "All 6 Nations Moving In Parallax" : currentCountry?.capital}
          </span>
        </div>

        {/* VIEW 1: PANORAMIC MOVING MARQUEE (Shown when activeTab === "all") */}
        {activeTab === "all" ? (
          <div className="relative pt-24 pb-4 overflow-hidden">
            {/* The Moving Continuous Skyline Band (Duplicates itself for seamless infinite 100% loop) */}
            <div className="flex w-[200%] animate-skyline-marquee hover:[animation-play-state:paused]">
              {/* Set 1 */}
              <div className="w-1/2 flex items-end justify-between px-6 shrink-0">
                <RiyadhBuildings />
                <DubaiBuildings />
                <DohaBuildings />
                <KuwaitBuildings />
                <ManamaBuildings />
                <MuscatBuildings />
              </div>

              {/* Set 2 (for seamless loop) */}
              <div className="w-1/2 flex items-end justify-between px-6 shrink-0">
                <RiyadhBuildings />
                <DubaiBuildings />
                <DohaBuildings />
                <KuwaitBuildings />
                <ManamaBuildings />
                <MuscatBuildings />
              </div>
            </div>

            {/* Ground / Coastal Boulevard Strip */}
            <div className="relative h-14 bg-gradient-to-t from-[#070D18] to-[#0A1526] border-t border-[#1C3252] flex items-center justify-between px-6 text-xs text-[#8BA0BD] z-10">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">Live Regional Enterprise Corridors</span>
                <span className="hidden md:inline text-[#697386]">• High-Velocity Cloud Zones (Oracle, GCP, Azure, Huawei)</span>
              </div>
              <div className="text-[11px] text-[#C6A66B] font-semibold">
                Hover to pause motion • Click city tabs to explore
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 2: DEDICATED CITY METROPOLIS SHOWCASE */
          <div className="pt-20 pb-4 px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end min-h-[360px]">
              {/* Left: Prominent Animated City Architecture (Col 7) */}
              <div className="lg:col-span-7 flex items-end justify-center py-4 overflow-hidden">
                {activeTab === "saudi-arabia" && <RiyadhBuildings standalone />}
                {activeTab === "uae" && <DubaiBuildings standalone />}
                {activeTab === "qatar" && <DohaBuildings standalone />}
                {activeTab === "kuwait" && <KuwaitBuildings standalone />}
                {activeTab === "bahrain" && <ManamaBuildings standalone />}
                {activeTab === "oman" && <MuscatBuildings standalone />}
              </div>

              {/* Right: City Tech Metrics Card (Col 5) */}
              {currentCountry && (
                <div className="lg:col-span-5 rounded-2xl border border-[#22395C] bg-[#0A1628]/85 backdrop-blur-md p-5 sm:p-6 space-y-4 mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{currentCountry.flagEmoji}</span>
                        <h4 className="text-xl sm:text-2xl font-bold font-editorial text-white">
                          {currentCountry.name}
                        </h4>
                      </div>
                      <span className="text-xs text-[#C6A66B] font-semibold block mt-0.5">
                        Capital &amp; Hub: {currentCountry.capital} • {currentCountry.nativeName}
                      </span>
                    </div>
                    <span className="rounded-lg bg-[#C6A66B]/20 border border-[#C6A66B]/40 px-2.5 py-1 text-xs font-bold text-[#DFCA9B]">
                      {currentCountry.metrics.aiRank}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#C8D5E5] leading-relaxed">
                    {currentCountry.summary}
                  </p>

                  <div className="rounded-xl bg-[#102038] border border-[#1C3252] p-3 text-xs">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C6A66B] block mb-1">
                      Strategic Mandate:
                    </span>
                    <span className="font-semibold text-white">
                      {currentCountry.keyInitiative}
                    </span>
                  </div>

                  {/* 4 Quantitative Metrics */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="rounded-xl bg-[#0F223D] border border-[#1F3A60] p-2.5 text-center">
                      <span className="text-[11px] text-[#8BA0BD] block">Startups</span>
                      <strong className="text-sm sm:text-base font-extrabold text-white">
                        {currentCountry.metrics.startups}
                      </strong>
                    </div>
                    <div className="rounded-xl bg-[#0F223D] border border-[#1F3A60] p-2.5 text-center">
                      <span className="text-[11px] text-[#8BA0BD] block">Cloud Regions</span>
                      <strong className="text-sm sm:text-base font-extrabold text-[#C6A66B]">
                        {currentCountry.metrics.cloudRegions}
                      </strong>
                    </div>
                    <div className="rounded-xl bg-[#0F223D] border border-[#1F3A60] p-2.5 text-center">
                      <span className="text-[11px] text-[#8BA0BD] block">SaaS YoY</span>
                      <strong className="text-sm sm:text-base font-extrabold text-emerald-400">
                        {currentCountry.metrics.saasGrowth}
                      </strong>
                    </div>
                    <div className="rounded-xl bg-[#0F223D] border border-[#1F3A60] p-2.5 text-center">
                      <span className="text-[11px] text-[#8BA0BD] block">Tech Districts</span>
                      <strong className="text-xs sm:text-sm font-bold text-white truncate block">
                        {currentCountry.techHubs[0]?.split(" ")[0]}
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Strip */}
            <div className="h-12 bg-gradient-to-t from-[#070D18] to-[#0A1526] -mx-4 sm:-mx-8 -mb-4 px-6 flex items-center justify-between text-xs text-[#8BA0BD] border-t border-[#1C3252]">
              <span className="flex items-center gap-1.5 text-white font-medium">
                <MapPin className="h-3.5 w-3.5 text-[#C6A66B]" />
                Districts: {currentCountry?.techHubs.slice(0, 3).join(" • ")}
              </span>
              <button
                onClick={() => handleCountryClick("all")}
                className="text-[#C6A66B] hover:text-white font-bold cursor-pointer"
              >
                Back to Panorama &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===================================================================== */
/* ARCHITECTURAL BUILDING VECTOR COMPONENTS (High-Precision Landmarks)  */
/* ===================================================================== */

/** 1. RIYADH: Kingdom Centre, PIF Tower (KAFD), Al Faisaliah Tower */
function RiyadhBuildings({ standalone = false }: { standalone?: boolean }) {
  const scale = standalone ? "scale-110 sm:scale-125" : "scale-90 sm:scale-100";
  return (
    <div className={`relative flex items-end gap-3 mx-4 ${scale} transition-transform duration-500`}>
      {/* Al Faisaliah Tower (Pyramid with golden glass globe) */}
      <div className="flex flex-col items-center">
        {/* Needle & Glowing Globe */}
        <div className="h-6 w-0.5 bg-[#C6A66B]" />
        <div className="h-4 w-4 rounded-full bg-[#DFCA9B] shadow-[0_0_12px_#C6A66B] -my-1 border border-amber-300 z-10" />
        <svg width="42" height="150" viewBox="0 0 42 150" className="fill-[#1A2E4C] stroke-[#C6A66B]/50">
          <polygon points="21,0 42,150 0,150" />
          {/* Internal illuminated chevron floors */}
          <line x1="16" y1="35" x2="26" y2="35" stroke="#DFCA9B" strokeWidth="1.5" />
          <line x1="12" y1="70" x2="30" y2="70" stroke="#DFCA9B" strokeWidth="1.5" />
          <line x1="8" y1="105" x2="34" y2="105" stroke="#DFCA9B" strokeWidth="1.5" />
          <line x1="4" y1="135" x2="38" y2="135" stroke="#DFCA9B" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Kingdom Centre Tower (Inverted Parabolic Arch with Skybridge) */}
      <div className="flex flex-col items-center">
        {/* Skybridge blinking aviation beacon */}
        <div className="h-2 w-2 rounded-full bg-rose-500 animate-beacon shadow-[0_0_8px_red] mb-0.5" />
        <svg width="68" height="230" viewBox="0 0 68 230" className="drop-shadow-[0_0_15px_rgba(198,166,107,0.2)]">
          {/* Tower Silhouette with Arch Cutout */}
          <defs>
            <linearGradient id="ksaGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#253D63" />
              <stop offset="100%" stopColor="#13233A" />
            </linearGradient>
          </defs>
          {/* Main outer body */}
          <path
            d="M 6 230 L 16 0 L 52 0 L 62 230 Z"
            fill="url(#ksaGrad)"
            stroke="#C6A66B"
            strokeWidth="1.5"
          />
          {/* Inverted parabolic arch cutout */}
          <path
            d="M 22 18 Q 34 95 46 18 Z"
            fill="#091322"
            stroke="#DFCA9B"
            strokeWidth="1.5"
          />
          {/* Skybridge catwalk spanning the arch */}
          <rect x="23" y="16" width="22" height="4" fill="#DFCA9B" rx="1" />
          {/* Vertical Illuminated Elevator Strip */}
          <line x1="34" y1="100" x2="34" y2="230" stroke="#C6A66B" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
        <span className="text-[10px] font-bold text-[#C6A66B] uppercase tracking-wider mt-1">
          Riyadh • KSA
        </span>
      </div>

      {/* PIF Tower (KAFD Faceted Diamond Crystal Tower) */}
      <div className="flex flex-col items-center">
        <svg width="50" height="190" viewBox="0 0 50 190" className="fill-[#1A3152] stroke-[#67A3E6]/60">
          <polygon points="25,0 48,40 42,190 8,190 2,40" />
          {/* Crystal facets */}
          <line x1="25" y1="0" x2="25" y2="190" stroke="#90CAF9" strokeWidth="1.2" />
          <line x1="25" y1="50" x2="45" y2="110" stroke="#90CAF9" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="25" y1="50" x2="5" y2="110" stroke="#90CAF9" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>
    </div>
  );
}

/** 2. DUBAI: Burj Khalifa, Museum of the Future, Burj Al Arab */
function DubaiBuildings({ standalone = false }: { standalone?: boolean }) {
  const scale = standalone ? "scale-110 sm:scale-125" : "scale-90 sm:scale-100";
  return (
    <div className={`relative flex items-end gap-3 mx-4 ${scale} transition-transform duration-500`}>
      {/* Museum of the Future (Torus with glowing green calligraphy) */}
      <div className="flex flex-col items-center">
        <svg width="64" height="85" viewBox="0 0 64 85">
          {/* Oblong Torus Ring */}
          <ellipse cx="32" cy="45" rx="30" ry="24" fill="#203554" stroke="#C6A66B" strokeWidth="2" />
          <ellipse cx="32" cy="45" rx="14" ry="11" fill="#091322" stroke="#67A3E6" strokeWidth="1.5" />
          {/* Calligraphic cutouts glowing emerald/gold */}
          <path d="M 12 45 Q 20 35 28 42" stroke="#34D399" strokeWidth="1.5" fill="none" className="animate-pulse" />
          <path d="M 36 48 Q 44 40 52 46" stroke="#34D399" strokeWidth="1.5" fill="none" className="animate-pulse" />
          <rect x="22" y="72" width="20" height="13" fill="#13233A" />
        </svg>
      </div>

      {/* Burj Khalifa (World's Tallest - Stepped Pinnacle) */}
      <div className="flex flex-col items-center">
        {/* Pulsing Spire Beacon */}
        <div className="h-12 w-0.5 bg-white shadow-[0_0_12px_white] relative">
          <div className="absolute -top-1 -left-1 h-2.5 w-2.5 rounded-full bg-white animate-ping" />
        </div>
        <svg width="60" height="250" viewBox="0 0 60 250">
          <defs>
            <linearGradient id="burjGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3B5985" />
              <stop offset="100%" stopColor="#162942" />
            </linearGradient>
          </defs>
          {/* Setbacks Tier 1 to 5 */}
          <polygon points="30,0 33,40 27,40" fill="#90CAF9" />
          <polygon points="26,40 34,40 36,80 24,80" fill="url(#burjGrad)" stroke="#C6A66B" strokeWidth="0.8" />
          <polygon points="22,80 38,80 40,130 20,130" fill="url(#burjGrad)" stroke="#C6A66B" strokeWidth="0.8" />
          <polygon points="17,130 43,130 46,180 14,180" fill="url(#burjGrad)" stroke="#C6A66B" strokeWidth="0.8" />
          <polygon points="10,180 50,180 56,250 4,250" fill="url(#burjGrad)" stroke="#C6A66B" strokeWidth="1" />
          {/* Center glowing elevator shaft */}
          <line x1="30" y1="40" x2="30" y2="250" stroke="#DFCA9B" strokeWidth="1.5" strokeDasharray="4 2" />
        </svg>
        <span className="text-[10px] font-bold text-[#C6A66B] uppercase tracking-wider mt-1">
          Dubai • UAE
        </span>
      </div>

      {/* Burj Al Arab (Iconic Sail Tower & Helipad) */}
      <div className="flex flex-col items-center">
        <svg width="55" height="175" viewBox="0 0 55 175">
          {/* Triangular rear mast */}
          <line x1="10" y1="175" x2="10" y2="15" stroke="#DFCA9B" strokeWidth="3" />
          {/* Helipad disc */}
          <ellipse cx="14" cy="40" rx="9" ry="3" fill="#C6A66B" />
          {/* Sweeping Fabric Sail Curve */}
          <path
            d="M 10 15 Q 52 75 42 175 L 10 175 Z"
            fill="#1B3150"
            stroke="#DFCA9B"
            strokeWidth="1.5"
          />
          {/* Diagonal cross braces */}
          <line x1="10" y1="60" x2="32" y2="110" stroke="#67A3E6" strokeWidth="1.2" />
          <line x1="10" y1="110" x2="38" y2="160" stroke="#67A3E6" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
}

/** 3. DOHA: Katara Crescent Towers, Doha Tower (Jean Nouvel Mashrabiya) */
function DohaBuildings({ standalone = false }: { standalone?: boolean }) {
  const scale = standalone ? "scale-110 sm:scale-125" : "scale-90 sm:scale-100";
  return (
    <div className={`relative flex items-end gap-3 mx-4 ${scale} transition-transform duration-500`}>
      {/* Doha Tower (Cylindrical tower with Islamic Mashrabiya pattern) */}
      <div className="flex flex-col items-center">
        <div className="h-4 w-1 bg-[#C6A66B]" />
        <svg width="44" height="170" viewBox="0 0 44 170">
          {/* Domed cylindrical silhouette */}
          <path
            d="M 6 30 Q 22 5 38 30 L 38 170 L 6 170 Z"
            fill="#1B3150"
            stroke="#DFCA9B"
            strokeWidth="1.5"
          />
          {/* Geometric Diamond Mesh Pattern (Mashrabiya) */}
          <line x1="8" y1="50" x2="36" y2="80" stroke="#C6A66B" strokeWidth="0.8" />
          <line x1="36" y1="50" x2="8" y2="80" stroke="#C6A66B" strokeWidth="0.8" />
          <line x1="8" y1="90" x2="36" y2="120" stroke="#C6A66B" strokeWidth="0.8" />
          <line x1="36" y1="90" x2="8" y2="120" stroke="#C6A66B" strokeWidth="0.8" />
          <line x1="8" y1="130" x2="36" y2="160" stroke="#C6A66B" strokeWidth="0.8" />
          <line x1="36" y1="130" x2="8" y2="160" stroke="#C6A66B" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Katara Towers (Lusail Crescent Curved Swords) */}
      <div className="flex flex-col items-center">
        <svg width="84" height="205" viewBox="0 0 84 205">
          {/* Left Crescent Sword */}
          <path
            d="M 12 205 C 4 110, 20 40, 42 10 C 32 40, 26 120, 36 205 Z"
            fill="#233B5E"
            stroke="#C6A66B"
            strokeWidth="1.8"
          />
          {/* Right Crescent Sword */}
          <path
            d="M 72 205 C 80 110, 64 40, 42 10 C 52 40, 58 120, 48 205 Z"
            fill="#233B5E"
            stroke="#C6A66B"
            strokeWidth="1.8"
          />
          {/* Intersecting Center Podium */}
          <ellipse cx="42" cy="180" rx="16" ry="6" fill="#DFCA9B" />
          <line x1="42" y1="10" x2="42" y2="180" stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
        <span className="text-[10px] font-bold text-[#C6A66B] uppercase tracking-wider mt-1">
          Doha • Qatar
        </span>
      </div>
    </div>
  );
}

/** 4. KUWAIT: Kuwait Towers & Al Hamra Sculpted Tower */
function KuwaitBuildings({ standalone = false }: { standalone?: boolean }) {
  const scale = standalone ? "scale-110 sm:scale-125" : "scale-90 sm:scale-100";
  return (
    <div className={`relative flex items-end gap-3 mx-4 ${scale} transition-transform duration-500`}>
      {/* Kuwait Towers (Main Needle with 2 signature spheres) */}
      <div className="flex flex-col items-center">
        {/* Needle Peak */}
        <div className="h-10 w-0.5 bg-[#C6A66B]" />
        <svg width="50" height="210" viewBox="0 0 50 210">
          {/* Main Needle Shaft */}
          <line x1="25" y1="0" x2="25" y2="210" stroke="#DFCA9B" strokeWidth="3" />
          {/* Upper Viewing Sphere */}
          <circle cx="25" cy="50" r="10" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" className="shadow-lg" />
          {/* Lower Large Sphere */}
          <circle cx="25" cy="110" r="18" fill="#0369A1" stroke="#38BDF8" strokeWidth="2" />
          {/* Sphere Tile Grid Pattern */}
          <line x1="12" y1="110" x2="38" y2="110" stroke="#DFCA9B" strokeWidth="1.2" />
          <line x1="25" y1="92" x2="25" y2="128" stroke="#DFCA9B" strokeWidth="1.2" />
        </svg>
        <span className="text-[10px] font-bold text-[#C6A66B] uppercase tracking-wider mt-1">
          Kuwait City
        </span>
      </div>

      {/* Secondary Kuwait Water Tower (Single Sphere) */}
      <div className="flex flex-col items-center">
        <div className="h-6 w-0.5 bg-[#C6A66B]" />
        <svg width="34" height="150" viewBox="0 0 34 150">
          <line x1="17" y1="0" x2="17" y2="150" stroke="#DFCA9B" strokeWidth="2.5" />
          <circle cx="17" cy="65" r="12" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.8" />
        </svg>
      </div>

      {/* Al Hamra Tower (Sculpted Twisting Skyscraper) */}
      <div className="flex flex-col items-center">
        <svg width="46" height="190" viewBox="0 0 46 190">
          <path
            d="M 6 190 L 10 10 L 38 25 L 34 190 Z"
            fill="#1B3150"
            stroke="#DFCA9B"
            strokeWidth="1.5"
          />
          {/* Sweeping stone facade carve */}
          <path d="M 10 10 Q 30 90 20 190" stroke="#C6A66B" strokeWidth="2" fill="none" />
          <line x1="20" y1="190" x2="34" y2="190" stroke="#C6A66B" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

/** 5. BAHRAIN: Bahrain World Trade Center (Dual Sail Towers with Rotating Wind Turbines!) */
function ManamaBuildings({ standalone = false }: { standalone?: boolean }) {
  const scale = standalone ? "scale-110 sm:scale-125" : "scale-90 sm:scale-100";
  return (
    <div className={`relative flex items-end gap-3 mx-4 ${scale} transition-transform duration-500`}>
      {/* Bahrain WTC */}
      <div className="flex flex-col items-center">
        <svg width="86" height="210" viewBox="0 0 86 210">
          {/* Tower 1 (West Sail) */}
          <path
            d="M 6 210 L 30 10 L 34 210 Z"
            fill="#1E375B"
            stroke="#DFCA9B"
            strokeWidth="1.8"
          />
          {/* Tower 2 (East Sail) */}
          <path
            d="M 80 210 L 56 10 L 52 210 Z"
            fill="#1E375B"
            stroke="#DFCA9B"
            strokeWidth="1.8"
          />

          {/* Skybridge 1 (Top) with Rotating Turbine */}
          <rect x="30" y="58" width="26" height="4" fill="#DFCA9B" />
          <g transform="translate(43, 60)" className="animate-turbine">
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#38BDF8" strokeWidth="1.5" />
            <line x1="-7" y1="4" x2="7" y2="-4" stroke="#38BDF8" strokeWidth="1.5" />
          </g>

          {/* Skybridge 2 (Middle) with Rotating Turbine */}
          <rect x="31" y="108" width="24" height="4" fill="#DFCA9B" />
          <g transform="translate(43, 110)" className="animate-turbine [animation-duration:3s]">
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#38BDF8" strokeWidth="1.5" />
            <line x1="-7" y1="4" x2="7" y2="-4" stroke="#38BDF8" strokeWidth="1.5" />
          </g>

          {/* Skybridge 3 (Bottom) with Rotating Turbine */}
          <rect x="32" y="158" width="22" height="4" fill="#DFCA9B" />
          <g transform="translate(43, 160)" className="animate-turbine [animation-duration:4s]">
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#38BDF8" strokeWidth="1.5" />
            <line x1="-7" y1="4" x2="7" y2="-4" stroke="#38BDF8" strokeWidth="1.5" />
          </g>
        </svg>
        <span className="text-[10px] font-bold text-[#C6A66B] uppercase tracking-wider mt-1">
          Manama • Bahrain
        </span>
      </div>

      {/* Bahrain Financial Harbour Tower */}
      <div className="flex flex-col items-center">
        <svg width="42" height="175" viewBox="0 0 42 175">
          <rect x="6" y="15" width="30" height="160" fill="#152842" stroke="#67A3E6" strokeWidth="1.5" rx="2" />
          <line x1="21" y1="0" x2="21" y2="15" stroke="#DFCA9B" strokeWidth="2" />
          {/* Horizontal floors */}
          <line x1="6" y1="50" x2="36" y2="50" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="6" y1="90" x2="36" y2="90" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="6" y1="130" x2="36" y2="130" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 2" />
        </svg>
      </div>
    </div>
  );
}

/** 6. OMAN: Royal Opera House & Muttrah Architectural Heritage Spire */
function MuscatBuildings({ standalone = false }: { standalone?: boolean }) {
  const scale = standalone ? "scale-110 sm:scale-125" : "scale-90 sm:scale-100";
  return (
    <div className={`relative flex items-end gap-3 mx-4 ${scale} transition-transform duration-500`}>
      {/* Muscat Smart Tech Gateway & Minarets */}
      <div className="flex flex-col items-center">
        {/* Slender Minaret Spire */}
        <div className="h-8 w-1 bg-[#DFCA9B]" />
        <svg width="30" height="180" viewBox="0 0 30 180">
          <polygon points="15,0 22,25 8,25" fill="#C6A66B" />
          <rect x="9" y="25" width="12" height="155" fill="#1C3353" stroke="#DFCA9B" strokeWidth="1.5" />
          <circle cx="15" cy="50" r="3" fill="#DFCA9B" />
          <circle cx="15" cy="90" r="3" fill="#DFCA9B" />
          <circle cx="15" cy="130" r="3" fill="#DFCA9B" />
        </svg>
      </div>

      {/* Royal Opera & Convention Arch Complex */}
      <div className="flex flex-col items-center">
        <svg width="76" height="120" viewBox="0 0 76 120">
          {/* Traditional Omani Tiered Stone Crenellations */}
          <rect x="8" y="35" width="60" height="85" fill="#20395D" stroke="#C6A66B" strokeWidth="1.5" />
          {/* Main Grand Archway */}
          <path d="M 24 120 L 24 75 Q 38 50 52 75 L 52 120 Z" fill="#091322" stroke="#DFCA9B" strokeWidth="1.8" />
          {/* Flanking Arches */}
          <path d="M 12 120 L 12 90 Q 18 78 24 90 L 24 120 Z" fill="#091322" stroke="#67A3E6" strokeWidth="1" />
          <path d="M 52 120 L 52 90 Q 58 78 64 90 L 64 120 Z" fill="#091322" stroke="#67A3E6" strokeWidth="1" />
          {/* Dome */}
          <ellipse cx="38" cy="35" rx="14" ry="12" fill="#DFCA9B" stroke="#C6A66B" strokeWidth="1.5" />
        </svg>
        <span className="text-[10px] font-bold text-[#C6A66B] uppercase tracking-wider mt-1">
          Muscat • Oman
        </span>
      </div>
    </div>
  );
}

