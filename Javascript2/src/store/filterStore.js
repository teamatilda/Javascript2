import { create } from "zustand";

// Helper function that handles selection of multi-select filters.
// Toggles a value in a filter array on or off, or clears it if
// "All" is selected.
function setMultiSelectFilter(prev, filterArrayKey, selectedFilter) {
  if (selectedFilter === "All") return { [filterArrayKey]: [] };
  return {
    [filterArrayKey]: prev[filterArrayKey].includes(selectedFilter)
      ? prev[filterArrayKey].filter((item) => item !== selectedFilter)
      : [...prev[filterArrayKey], selectedFilter],
  };
}

// Global Zustand filter state for filtering countries during rendering
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
