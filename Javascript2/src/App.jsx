import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { getAllCountries } from "./api/countriesApi";
import WeatherWidget from "./WeatherWidget";
import "./WeatherWidget.css";
import "./Navbar.css";
import "./style.css";
import CountrySection from "./components/CountrySection";

function App() {
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
});
  const [currentPage, setCurrentPage] = useState(0);
  const [favoritesPage, setFavoritesPage] = useState(0);

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

    
const cardsPerPage = 4;
const startIndex = currentPage * cardsPerPage;

const visibleCountries = countries.slice( 
  startIndex, 
  startIndex + cardsPerPage
);

const handleNext = () => {
  if (startIndex + cardsPerPage < countries.length) {
    setCurrentPage((prev) => prev + 1);
  }
};

const handlePrev = () => {
  if (currentPage > 0) {
    setCurrentPage((prev) => prev - 1);
  }
};

 return (
  <>
    <Navbar />

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

<CountrySection
  title="Utforska länder"
  countries={visibleCountries}
  emptyText="Inga länder att visa"
  onPrev={handlePrev}
  onNext={handleNext}
  prevDisabled={currentPage === 0}
  nextDisabled={startIndex + cardsPerPage >= countries.length}
  onAddFavorite={addToFavorites}
/>

<div className="content-box">
  <div className="weather-side">
    <WeatherWidget />
    </div>
  </div>
 </section>
</main>
</>
);
}

export default App; 