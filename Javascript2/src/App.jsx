import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import "./styles/Navbar.css";
import "./style.css";
import CountryInfoDetails from "./pages/CountryInfoPage.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
import CountryInfo from "./components/CountryInfo.jsx";
import { getWeather } from "./api/weatherApi";
import FlagQuizPage from "./pages/FlagQuizPage.jsx";
import { useCountriesStore } from "./store/countriesStore.js";
import  WeatherWidget from "./components/WeatherWidget.jsx"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CountryDetails />} />
        <Route path="/Country/:info" element={<CountryInfoDetails />} />
        <Route path="/Quiz" element={<FlagQuizPage />} />
      </Routes>
      <main> 
        <WeatherWidget/>
      </main>
    </>
  );
}

export default App;
