import Navbar from "./Navbar";
//import ZustandRenderTest from "./ZustandRenderTest";
import { useState, useEffect } from "react";
import { getAllCountries, getCountryBySlug } from "./api/countriesApi";
import WeatherWidget from "./WeatherWidget";
import "./WeatherWidget.css";
//import CountryInfo from "./CountryInfo";
//import Japan from "./assets/japan.jpg";
import "./Navbar.css";
import "./style.css";
import CountryCard from "./components/CountryCard";

function App() {
  const [count, setCount] = useState(0);
  const [country, setCountry] = useState(null);
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
    prev.filter(
      (c) =>
        (c.name?.common || c.name) !== countryName
    )
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
const visibleCountries = countries.slice(startIndex, startIndex + cardsPerPage);

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

 // const japan = {
   // name: "Japan",
    //image: Japan,
    //language: "Japanese",
    //currency: "Yen",
  //};

  useEffect(() => {
    async function testApi() {
      try {
        const countries = await getAllCountries();
        console.log("Countries:", countries);

        const firstCountry = countries[0];
        console.log("First country:", firstCountry);

        const fullCountry = await getCountryBySlug(firstCountry.slug);
        console.log("Full country raw:", fullCountry);

        setCountry(fullCountry);
      } catch (err) {
        console.error("Error:", err.message);
      }
    }

    testApi();
  }, []);

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

 return (
  <>
    <Navbar />

    <main className="app-layout">
     <section className="left-panel">
  

  <div className="content-box">
  <div className="favorites-section">
    <div className="section-header">
      <h3>Favoriter</h3>

      <div className="pager-buttons">
        <button onClick={handlePrevFavorites} disabled={favoritesPage === 0}>
          Föregående
        </button>
        <button
          onClick={handleNextFavorites}
          disabled={favoritesStartIndex + favoritesPerPage >= favorites.length}
        >
          Nästa
        </button>
      </div>
    </div>

    <div className="countries-grid">
      {favorites.length === 0 ? (
        <p>Inga favoriter ännu</p>
      ) : (
        visibleFavorites.map((country, index) => (
          <div
            className="card-scroll-item"
            key={country.name?.common || country.name || index}
          >
            <CountryCard
            country={country}
            onRemoveFavorite={removeFromFavorites}
            />
          </div>
        ))
      )}
    </div>
  </div>
</div>

  <div className="content-box">
  <div className="countries-section">
    <div className="section-header">
      <h3>Utforska länder</h3>

      <div className="pager-buttons">
        <button onClick={handlePrev} disabled={currentPage === 0}>
          Föregående
        </button>
        <button
          onClick={handleNext}
          disabled={startIndex + cardsPerPage >= countries.length}
        >
          Nästa
        </button>
      </div>
    </div>

    <div className="countries-grid">
      {visibleCountries.map((country, index) => (
        <div
          className="card-scroll-item"
          key={country.name?.common || country.name || index}
        >
           <CountryCard
        country={country}
        onAddFavorite={addToFavorites}
      />
    </div>
  ))}
</div>
  </div>
</div>

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