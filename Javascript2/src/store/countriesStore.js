import { create } from "zustand";

// Global Zustand filter state for storing countries
export const useCountriesStore = create((set) => ({
  countries: [],
  setCountries: (countries) => {
    set({ countries });
  },
}));
