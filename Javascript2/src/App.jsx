import Navbar from "./Navbar";
import ZustandRenderTest from "./ZustandRenderTest";
import { useState, useEffect } from "react";
import { getAllCountries, getCountryBySlug } from "./api/countriesApi";
import WeatherWidget from "./WeatherWidget";
import "./WeatherWidget.css";
import CountryInfo from "./CountryInfo";
import Japan from "./assets/japan.jpg";
import "./Navbar.css"

function App() {
  const [count, setCount] = useState(0);
  const [country, setCountry] = useState(null);

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

  return (
    <>
      <Navbar />
      <WeatherWidget />

      <CountryInfo country={japan} />
    </>
  );
}

export default App;