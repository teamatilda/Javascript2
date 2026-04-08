import { create } from "zustand";

function setMultiSelectFilter(prev, filterArrayKey, selectedFilter) {
  if (selectedFilter === "All") return { [filterArrayKey]: [] };
  return {
    [filterArrayKey]: prev[filterArrayKey].includes(selectedFilter)
      ? prev[filterArrayKey].filter((item) => item !== selectedFilter)
      : [...prev[filterArrayKey], selectedFilter],
  };
}

export const useFilterStore = create((set) => ({
  countryTypes: [],
  regions: [],
  sortBy: "Name",
  searchQuery: "",
  setCountryTypes: (countryType) =>
    set((prev) => setMultiSelectFilter(prev, "countryTypes", countryType)),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setRegions: (region) =>
    set((prev) => setMultiSelectFilter(prev, "regions", region)),
}));
