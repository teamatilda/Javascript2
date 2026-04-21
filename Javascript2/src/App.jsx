import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";

import "./styles/WeatherWidget.css";
import "./styles/Navbar.css";
import "./style.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Country/:info" element={<CountryDetails />} />
      </Routes>
    </>
  );
}

export default App;