import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import { getAllCountries, getCountryBySlug } from "./api/countriesApi";
import "./styles/WeatherWidget.css";
import Navbar from "./components/Navbar";
import "./styles/Navbar.css";
import CountryInfoDetails from "./pages/CountryInfoDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Country/:info" element={<CountryInfoDetails />} />
      </Routes>
      </>
  );
}

export default App;

{
  /*
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

  */
}
