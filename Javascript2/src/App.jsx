import { useState } from 'react'
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
      <WeatherWidget />
      <CountryInfo country={japan} />
    </>
  );
}

export default App;
