{/* Här hämtas information om ett land baserat på URL, som sedan visas i CountryInfo.jsx */}

import CountryInfo from "../components/CountryInfo";
import { getCountryBySlug } from "../api/countriesApi";    {/* Hämtar data från API */}
import { useParams } from "react-router-dom";              {/* Hämtar parametrar från URL */}
import { useEffect, useState } from "react";

export default function CountryInfoDetails() {
  const { info } = useParams();
  const [country, setCountry] = useState(null);            {/* Sparar data från API, börjar som null */}
  const [loading, setLoading] = useState(true);            {/* Väntar på API */}
  const [error, setError] = useState("");

 useEffect(() => {
  async function fetchCountry() {
    try {
    const data = await getCountryBySlug(info);             {/* Väntar på svar från API */}
    setCountry(data);                                      {/* Resultatet sparas i state */}

    } catch (err) {
      setError(err.message);
    }
    finally {
        setLoading(false);
    }
  }

  if (info) fetchCountry();                                {/* Om info saknas, körs ej API */}
}, [info]);                                                {/* Komponenten körs varje gång info ändras */}

if (!info) return <p>No parameters</p>;
if (loading) return <p>Loading...</p>
if (error) return <p>{error}</p>
if (!country) return <p>Country could not be found</p>;

  return <CountryInfo country={country} />;        {/* Skickar datan som props till CountryInfo */}
}
