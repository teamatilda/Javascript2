
  /* Here we get information about a land based on the URL, that is then shown in CountryInfo.jsx */

import CountryInfo from "../components/CountryInfo";
import CountryMap from "../components/CountryMaps";
import { getCountryBySlug } from "../api/countriesApi";    /* Gets data from API */

import { useParams } from "react-router-dom";    /* Gets parameteres from URL */

import { useEffect, useState } from "react";

export default function CountryInfoDetails() {
  const { info } = useParams();
  const [country, setCountry] = useState(null);    /* Saves the data from API, starts as null */
  
  const [loading, setLoading] = useState(true);    /* awaits API */

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCountry() {
      try {
        const data = await getCountryBySlug(info);    /* awaits answer from API */
      
        setCountry(data);                             /* Result is saved in state */
  
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (info) fetchCountry();     /* If information is missing, the API doesn't run */
  
  }, [info]);                     /* The component runs every time information changes */


  if (!info) return <p>No parameters</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!country) return <p>Country could not be found</p>;

  return (
    <>
      <CountryInfo country={country} />
    </>
  );
}
