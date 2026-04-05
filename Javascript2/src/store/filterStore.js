import { create } from "zustand";

export const useFilterStore = create((set) => ({
  countryType: "",
  regions: [],
  sortBy: "Name",
  searchQuery: "",
  setCountryType: (countryType) => set({ countryType }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setRegions: (region) =>
    set((prev) => {
      if (region === "") return { regions: [] };
      return {
        regions: prev.regions.includes(region)
          ? prev.regions.filter((activeRegion) => activeRegion !== region)
          : [...prev.regions, region],
      };
    }),
}));
