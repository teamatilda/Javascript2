import { useState, useEffect } from "react";
import { useCountriesStore } from "../store/countriesStore";
import { useFilterStore } from "../store/filterStore";
import { getAllCountries } from "../api/countriesApi";
import CountrySection from "../components/CountrySection";
import "../styles/Home.css";

// This function produces a filtered array of countries based
// on the filters selected in the navbar. The filters are synced
// with a Zustand store in /store/filterStore.js.
function filterCountries(filters, rawCountries) {
  let filteredCountries = rawCountries;

  if (filters.countryTypes.length > 0) {
    filteredCountries = filteredCountries.filter((country) =>
      filters.countryTypes.includes(country.type),
    );
  }

  if (filters.regions.length > 0) {
    filteredCountries = filteredCountries.filter((country) =>
      filters.regions.includes(country.region),
    );
  }

  if (filters.searchQuery.length > 0) {
    filteredCountries = filteredCountries.filter((country) =>
      country.name.toLowerCase().includes(filters.searchQuery.toLowerCase()),
    );
  }

  if (filters.sortBy === "Name") {
    filteredCountries = [...filteredCountries].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  } else if (filters.sortBy === "Population") {
    filteredCountries = [...filteredCountries].sort(
      (a, b) => (b.population ?? 0) - (a.population ?? 0),
    );
  }

  return filteredCountries;
}

function Home() {
  const [countries, setCountries] = useState([]);
  const RawCountries = useCountriesStore((state) => state.countries);
  const setRawCountries = useCountriesStore((state) => state.setCountries);
  const filters = useFilterStore();
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [favoritesPage, setFavoritesPage] = useState(0);

  const [page, setPage] = useState(0);
  const cardsPerPage = 16; // 4 rader × 4 kort

  // Fetches all countries from the API if the array is empty.
  // Syncs with Zustand store in /store/countriesStore.js
  useEffect(() => {
    if (RawCountries.length > 0) return;

    async function loadCountries() {
      try {
        const data = await getAllCountries();
        setRawCountries(data);
        setCountries(filterCountries(filters, data));
      } catch (err) {
        console.error("Error loading countries:", err.message);
      }
    }

    loadCountries();
  }, []);

  // Calls the filter function when either the filters or the
  // raw countries-array changes.
  useEffect(() => {
    setCountries(filterCountries(filters, RawCountries));
  }, [filters, RawCountries]);

  // Goes back to the first page whenever a filter is changed
  // to avoid issues with the filter function.
  useEffect(() => {
    setPage(0);
  }, [filters]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (country) => {
    setFavorites((prev) => {
      const exists = prev.find(
        (c) =>
          (c.name?.common || c.name) === (country.name?.common || country.name),
      );

      if (exists) return prev;
      return [...prev, country];
    });
  };

  const removeFromFavorites = (countryName) => {
    setFavorites((prev) =>
      prev.filter((c) => (c.name?.common || c.name) !== countryName),
    );
  };

  const favoritesPerPage = 4;
  const favoritesStartIndex = favoritesPage * favoritesPerPage;

  const visibleFavorites = favorites.slice(
    favoritesStartIndex,
    favoritesStartIndex + favoritesPerPage,
  );

  const startIndex = page * cardsPerPage;

  const visibleCountries = countries.slice(
    startIndex,
    startIndex + cardsPerPage,
  );

  return (
    <main className="app-layout">
      <section className="left-panel">
        <CountrySection
          title="Favorites"
          countries={visibleFavorites}
          emptyText="No favorites yet"
          onPrev={() => setFavoritesPage((p) => Math.max(p - 1, 0))}
          onNext={() =>
            setFavoritesPage((p) =>
              (p + 1) * favoritesPerPage < favorites.length ? p + 1 : p,
            )
          }
          prevDisabled={favoritesPage === 0}
          nextDisabled={
            (favoritesPage + 1) * favoritesPerPage >= favorites.length
          }
          onRemoveFavorite={removeFromFavorites}
          sectionClassName="favorites-section"
        />

        <h2 className="explore-title">Explore countries</h2>

        <CountrySection
          countries={visibleCountries}
          emptyText="Inga länder att visa"
          onAddFavorite={addToFavorites}
          onPrev={() => setPage((p) => Math.max(p - 1, 0))}
          onNext={() =>
            setPage((p) =>
              (p + 1) * cardsPerPage < countries.length ? p + 1 : p,
            )
          }
          prevDisabled={page === 0}
          nextDisabled={(page + 1) * cardsPerPage >= countries.length}
        />

        <div className="content-box">
          <div className="weather-side"></div>
        </div>
      </section>
    </main>
  );
}

export default Home;
