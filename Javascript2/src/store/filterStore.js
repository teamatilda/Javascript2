import { create } from "zustand";

export const useFilterStore = create((set) => ({
  countryTypes: [],
  regions: [],
  sortBy: "Name",
  searchQuery: "",
  setCountryTypes: (countryType) =>
    set((prev) => {
      if (countryType === "All") return { countryTypes: [] };
      return {
        countryTypes: prev.countryTypes.includes(countryType)
          ? prev.countryTypes.filter(
              (activeCountryType) => activeCountryType !== countryType,
            )
          : [...prev.countryTypes, countryType],
      };
    }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setRegions: (region) =>
    set((prev) => {
      if (region === "All") return { regions: [] };
      return {
        regions: prev.regions.includes(region)
          ? prev.regions.filter((activeRegion) => activeRegion !== region)
          : [...prev.regions, region],
      };
    }),
}));
