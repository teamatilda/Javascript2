import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import "./styles/Navbar.css";
import CountryInfoDetails from "./pages/CountryInfoPage.jsx";
import { getWeather } from "./api/weatherApi";
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