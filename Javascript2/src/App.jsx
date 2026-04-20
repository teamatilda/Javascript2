import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import { getAllCountries, getCountryBySlug } from "./api/countriesApi";
import "./styles/WeatherWidget.css";
import Navbar from "./components/Navbar";
import "./styles/Navbar.css";
import CountryInfoDetails from "./pages/CountryInfoDetails";
import CountryInfo from "./components/CountryInfo";
import { getWeather } from "./api/weatherApi";
import WeatherWidget from "./components/WeatherWidget";
import FlagQuizPage from "./pages/FlagQuizPage.jsx";
import { useCountriesStore } from "./store/countriesStore.js";

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
