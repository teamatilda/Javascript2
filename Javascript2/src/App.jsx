import Navbar from "./Navbar";
import ZustandRenderTest from "./ZustandRenderTest";
import { useState, useEffect } from "react";
import { getAllCountries, getCountryBySlug } from "./api/countriesApi";
import WeatherWidget from "./WeatherWidget";
import "./WeatherWidget.css";
import CountryInfo from "./CountryInfo";
import Japan from "./assets/japan.jpg";
import "./Navbar.css";
import "./style.css";
import CountryCard from "./components/CountryCard";

function App() {
  const [count, setCount] = useState(0);
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);

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

  const japan = {
    name: "Japan",
    image: Japan,
    language: "Japanese",
    currency: "Yen",
  };

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
        <input
          className="search-input"
          type="text"
          placeholder="Sök land..."
        />

        <div className="favorites-section">
          <h3>Favoriter</h3>
         <div className="favorites-row">
  {favorites.length === 0 ? (
    <p>Inga favoriter ännu</p>
  ) : (
    favorites.map((country, index) => (
      <div
        className="card-scroll-item"
        key={country.name?.common || country.name || index}
      >
        <CountryCard country={country} />
      </div>
    ))
  )}
</div>
        </div>

        <div className="countries-section">
          <h3>Utforska länder</h3>
          <div className="countries-row">
  {countries.map((country, index) => (
    <div
      className="card-scroll-item"
      key={country.name?.common || country.name || index}
      onClick={() => addToFavorites(country)}
    >
      <CountryCard country={country} />
    </div>
  ))}
</div>
        </div>

        <div className="bottom-showcase">

          <div className="weather-side">
            <WeatherWidget />
          </div>
        </div>
      </section>

      <section className="right-panel">
        <p>Välj ett land</p>
      </section>
    </main>
  </>
);
}

export default App; 