import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import CountryInfoDetails from "./pages/CountryInfoDetails";

import "./WeatherWidget.css";
import "./Navbar.css";
import "./style.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Country/:info" element={<CountryInfoDetails />} />
        <Route path="/FlagQuiz" element={<FlagQuizPage />} />
      </Routes>
    </>
  );
}

export default App;
