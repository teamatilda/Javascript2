import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { getAllCountries, getCountryBySlug } from "./api/countriesApi";
import WeatherWidget from "./components/WeatherWidget";
import "./styles/WeatherWidget.css";
import CountryInfo from "./components/CountryInfo";
import Japan from "./assets/Japan.jpg";
import "./styles/Navbar.css";
import { getWeather } from "./api/weatherApi";
import FlagQuiz from "./pages/FlagQuiz";
import { useCountriesStore } from "./store/countriesStore.js";

function App() {
  const [count, setCount] = useState(0);
  const [country, setCountry] = useState(null);

  const japan = {
    name: "Japan",
    image: Japan,
    language: "Japanese",
    currency: "Yen",
    population: "122 M",
  };

  // Stores data from getAllCountries in a Zustand store
  const setCountries = useCountriesStore((state) => state.setCountries);

  useEffect(() => {
    async function fetchCountries() {
      const data = await getAllCountries();
      setCountries(data);
    }
    fetchCountries();
  }, []);

  // function for testing API
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

        const weather = await getWeather(fullCountry.lat, fullCountry.lon);
        console.log("Weather:", weather);
      } catch (err) {
        console.error("Error:", err.message);
      }
    }

    testApi();
  }, []);

  return (
    <>
      <Navbar />
      {/* <CountryInfo country={japan} /> */}
      <FlagQuiz />
    </>
  );
}

export default App;
