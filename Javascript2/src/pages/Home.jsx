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

const cardsPerPage = 4;
const numberOfSections = 4;

const [countryPages, setCountryPages] = useState(
  Array(numberOfSections).fill(0)
);

const getVisibleCountries = (sectionIndex) => {
  const page = countryPages[sectionIndex];
  const startIndex = sectionIndex * cardsPerPage + page * cardsPerPage;

  return countries.slice(startIndex, startIndex + cardsPerPage);
};

const handleNext = (sectionIndex) => {
  const page = countryPages[sectionIndex];
  const nextStartIndex =
    sectionIndex * cardsPerPage + (page + 1) * cardsPerPage;

  if (nextStartIndex < countries.length) {
    setCountryPages((prev) => {
      const updated = [...prev];
      updated[sectionIndex] += 1;
      return updated;
    });
  }
};

const handlePrev = (sectionIndex) => {
  if (countryPages[sectionIndex] > 0) {
    setCountryPages((prev) => {
      const updated = [...prev];
      updated[sectionIndex] -= 1;
      return updated;
    });
  }
};

  useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

   useEffect(() => {
  async function loadCountries() {
    try {
      const data = await getAllCountries();
      console.log("All countries for cards:", data);
      setCountries(data);
    } catch (err) {
      console.error("Error loading countries:", err.message);
    }
  }

  loadCountries();
}, []);

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


const favoritesPerPage = 4;
const favoritesStartIndex = favoritesPage * favoritesPerPage;

const visibleFavorites = favorites.slice(
  favoritesStartIndex,
  favoritesStartIndex + favoritesPerPage
);

const handleNextFavorites = () => {
    if (favoritesStartIndex + favoritesPerPage < favorites.length) {
      setFavoritesPage((prev) => prev + 1);
    }
  };

  const handlePrevFavorites = () => {
    if (favoritesPage > 0) {
      setFavoritesPage((prev) => prev - 1);
    }
  };

   return (
      <main className="app-layout">
        <section className="left-panel">
          <CountrySection
            title="Favoriter"
            countries={visibleFavorites}
            emptyText="Inga favoriter ännu"
            onPrev={handlePrevFavorites}
            onNext={handleNextFavorites}
            prevDisabled={favoritesPage === 0}
            nextDisabled={
              favoritesStartIndex + favoritesPerPage >= favorites.length
            }
            onRemoveFavorite={removeFromFavorites}
            sectionClassName="favorites-section"
          />

{Array.from({ length: numberOfSections }).map((_, index) => {
  const page = countryPages[index];
  const startIndex = index * cardsPerPage + page * cardsPerPage;

  return (
    <CountrySection
      key={index}
      title="Utforska länder"
      countries={getVisibleCountries(index)}
      emptyText="Inga länder att visa"
      onPrev={() => handlePrev(index)}
      onNext={() => handleNext(index)}
      prevDisabled={countryPages[index] === 0}
      nextDisabled={startIndex + cardsPerPage >= countries.length}
      onAddFavorite={addToFavorites}
    />
  );
})}

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