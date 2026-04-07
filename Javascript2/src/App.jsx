import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CountryCard from "./components/CountryCard";
import CountryDetails from "./pages/CountryDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,capital,cca3")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Kunde inte hämta länder");
        }
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <h1>Country App</h1>

            {loading && <p>Laddar...</p>}
            {error && <p>{error}</p>}

            <div className="country-grid">
              {countries.map((country) => (
                <CountryCard key={country.cca3} country={country} />
              ))}
            </div>
          </div>
        }
      />

      <Route path="/country/:name" element={<CountryDetails />} />
    </Routes>
  );
}

export default App;