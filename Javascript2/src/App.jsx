import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import "./styles/Navbar.css";
import "./style.css";
import CountryInfoDetails from "./pages/CountryInfoPage.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
import Home from "./pages/Home.jsx";
import { getWeather } from "./api/weatherApi";
import FlagQuizPage from "./pages/FlagQuizPage.jsx";
import { useCountriesStore } from "./store/countriesStore.js";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/quiz" element={<FlagQuizPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/Country/:info" element={<CountryInfoDetails />} />
        <Route path="/FlagQuiz" element={<FlagQuizPage />} />
        <Route path="/Country/" element={<CountryDetails />} />
      </Routes>
    </>
  );
}

export default App;
