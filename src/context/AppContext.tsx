"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { softwares } from "@/data/software";
import { Software } from "@/types";

interface AppContextType {
  // Compare State
  compareSlugs: string[];
  addToCompare: (slug: string) => boolean;
  removeFromCompare: (slug: string) => void;
  isInCompare: (slug: string) => boolean;
  clearCompare: () => void;
  isCompareTrayOpen: boolean;
  setIsCompareTrayOpen: (open: boolean) => void;
  comparedSoftwares: Software[];

  // Global Search Modal State
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [isCompareTrayOpen, setIsCompareTrayOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load comparison list from sessionStorage on client load
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("gsr_compare_slugs");
      if (stored) {
        setCompareSlugs(JSON.parse(stored));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save comparison changes
  useEffect(() => {
    try {
      sessionStorage.setItem("gsr_compare_slugs", JSON.stringify(compareSlugs));
    } catch {
      // Ignore storage errors
    }
  }, [compareSlugs]);

  // Keyboard shortcut Cmd+K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const addToCompare = (slug: string): boolean => {
    if (compareSlugs.includes(slug)) return false;
    if (compareSlugs.length >= 3) {
      alert("You can compare up to 3 software platforms simultaneously.");
      return false;
    }
    setCompareSlugs((prev) => [...prev, slug]);
    setIsCompareTrayOpen(true);
    return true;
  };

  const removeFromCompare = (slug: string) => {
    setCompareSlugs((prev) => prev.filter((s) => s !== slug));
  };

  const isInCompare = (slug: string) => {
    return compareSlugs.includes(slug);
  };

  const clearCompare = () => {
    setCompareSlugs([]);
    setIsCompareTrayOpen(false);
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const comparedSoftwares = compareSlugs
    .map((slug) => softwares.find((s) => s.slug === slug))
    .filter((s): s is Software => Boolean(s));

  return (
    <AppContext.Provider
      value={{
        compareSlugs,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        isCompareTrayOpen,
        setIsCompareTrayOpen,
        comparedSoftwares,
        isSearchOpen,
        openSearch,
        closeSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

