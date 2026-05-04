import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import "./styles/Navbar.css";
import "./style.css";
import CountryInfoDetails from "./pages/CountryInfoPage.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
<<<<<<< 40-add-facts
import CountryInfo from "./components/CountryInfo.jsx";
=======
import Home from "./pages/Home.jsx";
>>>>>>> main
import { getWeather } from "./api/weatherApi";
import FlagQuizPage from "./pages/FlagQuizPage.jsx";
import { useCountriesStore } from "./store/countriesStore.js";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CountryDetails />} />
        <Route path="/Country/:info" element={<CountryInfoDetails />} />
<<<<<<< 40-add-facts
        <Route path="/Quiz" element={<FlagQuizPage />} />
=======
        <Route path="/FlagQuiz" element={<FlagQuizPage />} />
        <Route path="/Country/" element={<CountryDetails />} />
>>>>>>> main
      </Routes>
    </>
  );
}

export default App;
