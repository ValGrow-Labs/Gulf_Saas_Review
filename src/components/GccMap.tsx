"use client";

import React, { useState } from "react";
import { gccCountries } from "@/data/news";
import { GccCountryCode, GccCountryProfile } from "@/types";
import {
  Globe2,
  TrendingUp,
  Server,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  MapPin
} from "lucide-react";

interface GccMapProps {
  selectedCountry?: GccCountryCode | "all";
  onSelectCountry?: (country: GccCountryCode | "all") => void;
  className?: string;
}

export default function GccMap({
  selectedCountry = "all",
  onSelectCountry,
  className = ""
}: GccMapProps) {
  const [hoveredCountryId, setHoveredCountryId] = useState<GccCountryCode | null>(null);
  const [internalSelected, setInternalSelected] = useState<GccCountryCode | "all">(selectedCountry);

  const activeId = onSelectCountry ? selectedCountry : internalSelected;

  const handleSelect = (id: GccCountryCode | "all") => {
    if (onSelectCountry) {
      onSelectCountry(id);
    } else {
      setInternalSelected(id);
    }
  };

  const currentCountry: GccCountryProfile =
    gccCountries.find((c) => c.id === (hoveredCountryId || (activeId !== "all" ? activeId : "saudi-arabia"))) ||
    gccCountries[0];

  // Geographically calibrated vector paths for the Arabian Peninsula GCC nations
  // Base projection centered on Arabian Peninsula (Red Sea to Gulf of Oman, Kuwait to Salalah)
  const countrySvgPaths: Record<GccCountryCode, { path: string; labelPos: { x: number; y: number } }> = {
    "saudi-arabia": {
      // Extensive territory covering central/western/eastern Arabian Peninsula
      path: "M 160 145 C 190 120, 240 100, 310 95 L 390 110 L 460 120 L 510 135 L 530 160 L 515 185 L 540 215 L 570 235 L 590 270 L 630 290 L 640 330 L 665 350 L 660 380 L 685 410 L 640 450 L 580 490 L 480 530 L 370 545 L 300 525 L 250 495 L 230 460 L 225 390 L 205 320 L 175 250 L 150 180 Z",
      labelPos: { x: 370, y: 320 }
    },
    kuwait: {
      // Northern corner on the Gulf, nestled between Iraq and Saudi Arabia
      path: "M 525 145 C 540 135, 560 138, 575 148 C 580 162, 570 178, 555 182 C 540 185, 530 172, 525 145 Z",
      labelPos: { x: 550, y: 130 }
    },
    bahrain: {
      // Archipelago in Gulf of Bahrain west of Qatar
      path: "M 612 245 C 618 240, 626 244, 628 252 C 627 262, 618 266, 612 258 C 609 252, 608 247, 612 245 Z",
      labelPos: { x: 605, y: 232 }
    },
    qatar: {
      // Distinct northern peninsula extending into the Gulf
      path: "M 645 272 C 655 252, 672 254, 678 274 C 682 295, 680 320, 668 332 C 655 334, 646 312, 645 272 Z",
      labelPos: { x: 685, y: 265 }
    },
    uae: {
      // Southern coast of Arabian Gulf curving northeast toward Musandam
      path: "M 670 335 C 705 322, 745 315, 775 305 L 790 325 L 785 365 L 755 395 L 715 405 L 685 390 L 670 360 Z",
      labelPos: { x: 740, y: 355 }
    },
    oman: {
      // Southeastern coast along Arabian Sea and Gulf of Oman + Musandam tip
      path: "M 780 295 C 795 285, 805 298, 798 315 L 785 325 Z M 785 335 C 815 330, 845 350, 860 380 C 865 410, 850 445, 820 480 L 780 520 L 710 560 L 675 540 L 710 495 L 750 445 L 785 390 Z",
      labelPos: { x: 810, y: 440 }
    }
  };

  // Tech hub capital coordinates on the SVG canvas
  const techHubPins: {
    countryId: GccCountryCode;
    city: string;
    label: string;
    x: number;
    y: number;
  }[] = [
    { countryId: "saudi-arabia", city: "Riyadh", label: "Riyadh Tech District", x: 440, y: 310 },
    { countryId: "saudi-arabia", city: "Jeddah", label: "Jeddah Port & SaaS Hub", x: 250, y: 380 },
    { countryId: "uae", city: "Dubai", label: "Dubai AI Campus", x: 745, y: 318 },
    { countryId: "uae", city: "Abu Dhabi", label: "Hub71 Innovation", x: 710, y: 345 },
    { countryId: "qatar", city: "Doha", label: "Lusail Digital Zone", x: 665, y: 290 },
    { countryId: "kuwait", city: "Kuwait City", label: "Kuwait FinTech Center", x: 550, y: 155 },
    { countryId: "bahrain", city: "Manama", label: "Bahrain FinTech Bay", x: 618, y: 250 },
    { countryId: "oman", city: "Muscat", label: "Knowledge Oasis Muscat", x: 825, y: 375 }
  ];

  // Inter-GCC connectivity network arcs (illustrating the unified regional digital infrastructure)
  const connectionArcs = [
    { from: { x: 440, y: 310 }, to: { x: 745, y: 318 }, label: "Riyadh-Dubai Tech Corridor" },
    { from: { x: 745, y: 318 }, to: { x: 665, y: 290 }, label: "Dubai-Doha Cloud Bridge" },
    { from: { x: 665, y: 290 }, to: { x: 618, y: 250 }, label: "Doha-Manama Financial Link" },
    { from: { x: 618, y: 250 }, to: { x: 550, y: 155 }, label: "Manama-Kuwait City Backbone" },
    { from: { x: 440, y: 310 }, to: { x: 550, y: 155 }, label: "Riyadh-Kuwait Highway" },
    { from: { x: 745, y: 318 }, to: { x: 825, y: 375 }, label: "Dubai-Muscat Subsea Landing" },
    { from: { x: 440, y: 310 }, to: { x: 250, y: 380 }, label: "Riyadh-Jeddah High-Speed Transit" }
  ];

  return (
    <div className={`w-full ${className}`}>
      {/* Country Selection Pill Bar for Quick Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
        <button
          onClick={() => handleSelect("all")}
          className={`px-4 py-2 rounded-xl text-sm font-bold tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer ${
            activeId === "all"
              ? "bg-[#064734] text-[#FFF8EF] shadow-md border border-[#064734]"
              : "bg-[#FFF8EF] text-[#064734] border border-[#E5DAC8] hover:border-[#064734] hover:bg-[#FFF8EF]"
          }`}
        >
          🌐 All GCC Countries
        </button>
        {gccCountries.map((c) => {
          const isSelected = activeId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => handleSelect(c.id)}
              onMouseEnter={() => setHoveredCountryId(c.id)}
              onMouseLeave={() => setHoveredCountryId(null)}
              className={`px-4 py-2 rounded-xl text-sm font-bold tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? "bg-[#064734] text-[#FFF8EF] shadow-md border border-[#064734]"
                  : "bg-[#FFF8EF] text-[#064734] border border-[#E5DAC8] hover:border-[#064734] hover:bg-[#FFF8EF]"
              }`}
            >
              <span>{c.flagEmoji}</span>
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Map & Executive Briefing Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFF8EF] rounded-3xl border border-[#E5DAC8] p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
        {/* Subtle background ambient watermarks */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E0FFC2]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#064734]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Left Column: Interactive GCC SVG Map */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center">
          <div className="w-full relative max-w-[620px] aspect-[920/660]">
            <svg
              viewBox="100 80 800 520"
              className="w-full h-full drop-shadow-md select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gradient for water body (Arabian Gulf / Red Sea subtle background) */}
                <radialGradient id="gulfWaterGrad" cx="65%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#064734" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="#064734" stopOpacity="0.01" />
                </radialGradient>

                {/* Country highlight gradient */}
                <linearGradient id="activeCountryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#064734" />
                  <stop offset="100%" stopColor="#043224" />
                </linearGradient>

                <linearGradient id="hoverCountryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E0FFC2" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#E0FFC2" stopOpacity="0.15" />
                </linearGradient>

                <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Waterway Backdrop Curve representing Arabian Gulf */}
              <ellipse
                cx="660"
                cy="260"
                rx="180"
                ry="120"
                fill="url(#gulfWaterGrad)"
                className="pointer-events-none"
              />

              {/* Inter-GCC Connectivity Network Lines */}
              <g className="opacity-45 pointer-events-none">
                {connectionArcs.map((arc, i) => (
                  <g key={i}>
                    <line
                      x1={arc.from.x}
                      y1={arc.from.y}
                      x2={arc.to.x}
                      y2={arc.to.y}
                      stroke="#E0FFC2"
                      strokeWidth="1.6"
                      strokeDasharray="4 4"
                      strokeOpacity="0.75"
                    />
                  </g>
                ))}
              </g>

              {/* Country Polygons */}
              {(Object.keys(countrySvgPaths) as GccCountryCode[]).map((countryKey) => {
                const info = gccCountries.find((c) => c.id === countryKey);
                const isSelected = activeId === countryKey;
                const isHovered = hoveredCountryId === countryKey;

                let fillColor = "#FFF8EF";
                let strokeColor = "#E5DAC8";
                let strokeWidth = "1.8";

                if (isSelected) {
                  fillColor = "#064734";
                  strokeColor = "#E0FFC2";
                  strokeWidth = "2.8";
                } else if (isHovered) {
                  fillColor = "#E5DAC8";
                  strokeColor = "#E0FFC2";
                  strokeWidth = "2.2";
                }

                return (
                  <g
                    key={countryKey}
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleSelect(countryKey)}
                    onMouseEnter={() => setHoveredCountryId(countryKey)}
                    onMouseLeave={() => setHoveredCountryId(null)}
                  >
                    <path
                      d={countrySvgPaths[countryKey].path}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeLinejoin="round"
                      className="transition-all duration-200"
                    />

                    {/* Country Text Label */}
                    <text
                      x={countrySvgPaths[countryKey].labelPos.x}
                      y={countrySvgPaths[countryKey].labelPos.y}
                      textAnchor="middle"
                      className={`text-[13px] font-bold tracking-wider uppercase pointer-events-none transition-colors duration-200 select-none ${
                        isSelected ? "fill-[#FFF8EF]" : isHovered ? "fill-[#064734]" : "fill-[#4A6D5F]"
                      }`}
                    >
                      {info?.shortName || countryKey}
                    </text>
                  </g>
                );
              })}

              {/* Tech Hub Capital Locations & Glowing Pulsing Indicators */}
              {techHubPins.map((pin, idx) => {
                const isCountryActive = activeId === pin.countryId || activeId === "all";
                const isHovered = hoveredCountryId === pin.countryId;

                return (
                  <g
                    key={idx}
                    className="cursor-pointer group"
                    onClick={() => handleSelect(pin.countryId)}
                    onMouseEnter={() => setHoveredCountryId(pin.countryId)}
                    onMouseLeave={() => setHoveredCountryId(null)}
                  >
                    {/* Concentric Glow Pulse Ring */}
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r="9"
                      fill="#E0FFC2"
                      fillOpacity="0.25"
                      className={isCountryActive || isHovered ? "animate-ping-slow" : "opacity-0"}
                    />
                    {/* Outer Ring */}
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r="5.5"
                      fill={isHovered ? "#E0FFC2" : isCountryActive ? "#064734" : "#4A6D5F"}
                      stroke="#FFF8EF"
                      strokeWidth="1.8"
                    />
                    {/* Inner Core */}
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r="2.4"
                      fill="#E0FFC2"
                    />

                    {/* City Name Label */}
                    <text
                      x={pin.x}
                      y={pin.y - 9}
                      textAnchor="middle"
                      className={`text-[10.5px] font-extrabold tracking-tight pointer-events-none select-none transition-colors ${
                        isHovered || isCountryActive ? "fill-[#064734]" : "fill-[#4A6D5F]"
                      }`}
                    >
                      {pin.city}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <p className="mt-2 text-xs text-[#4A6D5F] font-semibold text-center flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#E0FFC2] inline-block animate-pulse" />
            Interactive GCC Technology Corridor • Hover or tap any country to explore regional news
          </p>
        </div>

        {/* Right Column: Country Executive Intelligence Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-white rounded-2xl border border-[#E5DAC8] p-6 lg:p-7 shadow-sm">
          <div>
            {/* Header: Flag, Name, Native Arabic */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E5DAC8]">
              <div className="flex items-center gap-3.5">
                <span className="text-4xl shadow-2xs rounded-lg p-1 bg-[#FFF8EF]">
                  {currentCountry.flagEmoji}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold font-editorial text-[#064734]">
                      {currentCountry.name}
                    </h3>
                  </div>
                  <p className="text-sm font-semibold text-[#15803D] mt-0.5" dir="rtl">
                    {currentCountry.nativeName}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#064734] text-[#FFF8EF]">
                {currentCountry.capital}
              </span>
            </div>

            {/* Country Editorial Summary */}
            <p className="mt-4 text-[16px] text-[#334155] leading-relaxed">
              {currentCountry.summary}
            </p>

            {/* Key Initiative Highlight */}
            <div className="mt-4 rounded-xl bg-[#FFF8EF] border border-[#E5DAC8] p-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4A6D5F] block mb-1">
                National Transformation Mandate:
              </span>
              <p className="text-sm font-bold text-[#064734] flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#15803D] shrink-0" />
                <span>{currentCountry.keyInitiative}</span>
              </p>
            </div>

            {/* 4 Key Metrics */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#E5DAC8] bg-[#FFF8EF] p-3">
                <span className="text-xs font-semibold text-[#4A6D5F] block">
                  B2B Tech Startups
                </span>
                <span className="text-lg font-extrabold text-[#064734]">
                  {currentCountry.metrics.startups}
                </span>
              </div>

              <div className="rounded-xl border border-[#E5DAC8] bg-[#FFF8EF] p-3">
                <span className="text-xs font-semibold text-[#4A6D5F] block">
                  Cloud Regions
                </span>
                <span className="text-lg font-extrabold text-[#064734]">
                  {currentCountry.metrics.cloudRegions}
                </span>
              </div>

              <div className="rounded-xl border border-[#E5DAC8] bg-[#FFF8EF] p-3">
                <span className="text-xs font-semibold text-[#4A6D5F] block">
                  AI Hub Ranking
                </span>
                <span className="text-sm font-bold text-[#15803D]">
                  {currentCountry.metrics.aiRank}
                </span>
              </div>

              <div className="rounded-xl border border-[#E5DAC8] bg-[#FFF8EF] p-3">
                <span className="text-xs font-semibold text-[#4A6D5F] block">
                  Annual SaaS Growth
                </span>
                <span className="text-lg font-extrabold text-emerald-700">
                  {currentCountry.metrics.saasGrowth}
                </span>
              </div>
            </div>

            {/* Tech Hub Districts */}
            <div className="mt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4A6D5F] block mb-2">
                Major Innovation Districts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentCountry.techHubs.map((hub, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-md bg-[#FFF8EF] border border-[#E5DAC8] px-2.5 py-1 text-xs font-semibold text-[#064734]"
                  >
                    <Building2 className="h-3 w-3 text-[#15803D]" />
                    {hub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTA Link */}
          <div className="pt-4 border-t border-[#E5DAC8]">
            <button
              onClick={() => handleSelect(currentCountry.id)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#064734] px-5 py-3.5 text-[15px] font-bold text-[#FFF8EF] hover:bg-[#043224] active:scale-[0.99] transition-all shadow-sm cursor-pointer"
            >
              <span>Explore {currentCountry.name} News &amp; SaaS Reviews</span>
              <ArrowRight className="h-4 w-4 text-[#15803D]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

