import { useState, useEffect } from "react";
import { getAllCountries } from "../api/countriesApi";
import WeatherWidget from "../components/WeatherWidget";
import CountrySection from "../components/CountrySection";

function Home() {
  const [countries, setCountries] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [favoritesPage, setFavoritesPage] = useState(0);

  // ⭐ GLOBAL PAGINATION (Altoal-style)
  const [page, setPage] = useState(0);
  const cardsPerPage = 16; // 4 rader × 4 kort

  // ========================
  // LOAD COUNTRIES
  // ========================
  useEffect(() => {
    async function loadCountries() {
      try {
        const data = await getAllCountries();
        setCountries(data);
      } catch (err) {
        console.error("Error loading countries:", err.message);
      }
    }

    loadCountries();
  }, []);

  // ========================
  // FAVORITES STORAGE
  // ========================
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ========================
  // FAVORITES LOGIC
  // ========================
  const addToFavorites = (country) => {
    setFavorites((prev) => {
      const exists = prev.find(
        (c) =>
          (c.name?.common || c.name) ===
          (country.name?.common || country.name)
      );

      if (exists) return prev;
      return [...prev, country];
    });
  };

  const removeFromFavorites = (countryName) => {
    setFavorites((prev) =>
      prev.filter((c) => (c.name?.common || c.name) !== countryName)
    );
  };

  // ========================
  // FAVORITES PAGINATION
  // ========================
  const favoritesPerPage = 4;
  const favoritesStartIndex = favoritesPage * favoritesPerPage;

  const visibleFavorites = favorites.slice(
    favoritesStartIndex,
    favoritesStartIndex + favoritesPerPage
  );

  // ========================
  // MAIN COUNTRIES PAGINATION
  // ========================
  const startIndex = page * cardsPerPage;

  const visibleCountries = countries.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  return (
    <main className="app-layout">
      <section className="left-panel">

        {/* ================= FAVORITES ================= */}
        <CountrySection
          title="Favorites"
          countries={visibleFavorites}
          emptyText="No favorites yet"
          onPrev={() => setFavoritesPage((p) => Math.max(p - 1, 0))}
          onNext={() =>
            setFavoritesPage((p) =>
              (p + 1) * favoritesPerPage < favorites.length ? p + 1 : p
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

        {/* ================= COUNTRIES GRID ================= */}
        <CountrySection
          countries={visibleCountries}
          emptyText="Inga länder att visa"
          onAddFavorite={addToFavorites}
          onPrev={() => setPage((p) => Math.max(p - 1, 0))}
          onNext={() =>
            setPage((p) =>
              (p + 1) * cardsPerPage < countries.length ? p + 1 : p
            )
          }
          prevDisabled={page === 0}
          nextDisabled={(page + 1) * cardsPerPage >= countries.length}
        />

        {/* ================= WEATHER ================= */}
        <div className="content-box">
          <div className="weather-side">
            <WeatherWidget />
          </div>
        </div>

      </section>
    </main>
  );
}

export default Home;