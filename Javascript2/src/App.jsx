import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import CountryInfoDetails from "./pages/CountryInfoPage.jsx";
import { getWeather } from "./api/weatherApi";
import FlagQuizPage from "./pages/FlagQuizPage.jsx";
import { useCountriesStore } from "./store/countriesStore.js";
import WeatherWidget from "./components/WeatherWidget.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Country/:info" element={<CountryInfoDetails />} />
        <Route path="/Quiz" element={<FlagQuizPage />} />
      </Routes>
      <main>
        <WeatherWidget />
      </main>
    </>
  );
}

export default App;
