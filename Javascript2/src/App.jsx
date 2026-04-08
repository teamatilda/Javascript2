import Navbar from "./Navbar";
import ZustandRenderTest from "./ZustandRenderTest";
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllCountries, getCountryBySlug } from './api/countriesApi'

function App() {
  const [count, setCount] = useState(0)
  const [country, setCountry] = useState(null)

  // function for testing API
  useEffect(() => {
    async function testApi() {
      try {
        const countries = await getAllCountries()
        console.log("Countries:", countries)

        const firstCountry = countries[0]
        console.log("First country:", firstCountry)

        const fullCountry = await getCountryBySlug(firstCountry.slug)
        console.log("Full country raw:", fullCountry)

        setCountry(fullCountry)
        
      } catch (err) {
        console.error("Error:", err.message)
      }
    }

    testApi()
  }, [])

  return (
    <>
      {/* Function for getting flag */}
      {country && (
        <span className={`fi fi-${country.code.toLowerCase()}`}></span>
      )}
import "./Navbar.css";
import WeatherWidget from "./WeatherWidget";
import "./WeatherWidget.css";

import Navbar from "./Navbar";
import CountryInfo from './CountryInfo'

import Japan from "./assets/japan.jpg"

function App() {
  const japan = {
    name: "Japan",
    image: Japan,
    language: "Japanese",
    currency: "Yen"
};

  return (
    <>
      <Navbar />
      <ZustandRenderTest />
      <WeatherWidget />
      <CountryInfo country={japan} />
    </>
  );
}

export default App;
