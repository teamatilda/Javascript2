import { Info } from "lucide-react";
import "../styles/CountryInfo.css";
import "../styles/index.css";
import WeatherWidget from "./WeatherWidget";
import "flag-icons/css/flag-icons.min.css";
import CountryMap from "./CountryMaps";

export default function CountryInfo({ country }) {

  return (
    <section className="country-info-card">
      <div className="country-info-header">
        <span className={`fi fi-${country.code}`} />
        <h1 className="country-info-title">{country.name}</h1>
      </div>

    <div className="country-info-facts">
      <div className="country-info-section">
        <InfoSection label="Capital" value={country.capital} />
        <InfoSection label="Currency" value={country.currency} />
        <InfoSection label="Population" value={country.population} />
        <InfoSection label="Total Area" value={country.area} />
        <InfoSection label="Region" value={country.region} />
        <InfoSection label="Population" value={country.population} />
         <InfoSection label="Languages" value={country.languages} />
      </div>

      <h2 className="country-info-section-title">Geography</h2>
      <div className="country-info-geography"> 
        <InfoSection label="Area" value={country.area} />
        <InfoSection label="Climate" value={country.climate} />
        <InfoSection label="Terrain" value={country.terrain} />
      </div>

       <h2 className="country-info-section-title">People & Society</h2>
      <div className="country-info-society">
        <InfoSection label="Ethnic Groups" value={country.ethnicity} />
        <InfoSection label="Religion" value={country.religion} />
      </div> 

      <h2 className="country-info-section-title">Economy</h2>
      <div className="country-info-economy">
        <InfoSection label="Currency" value={country.currency} />
        <InfoSection label="Economic Overview" value={country.economy} />
      </div>

       <h2 className="country-info-section-title">Government</h2>
      <div className="country-info-government">
        <InfoSection label="Government Type" value={country.government} />
        <InfoSection label="National Holiday" value={country.holiday} />
      </div>
    </div>

      <div className="country-info-weather">
        <WeatherWidget capital={country.capital} />
      </div>

      <div className="country-info-box">
        <h2>Background</h2>
        <p>{country.background}</p>
      </div>

      
      <div className="country-map">
        <h2 className="country-map-title">Map of {country.name}</h2>
        <CountryMap country={country} />
      </div>
    </section>
  );
}

function InfoSection({ label, value }) {
  return (
    <div className="info-section">
      <h2 className="label">{label}</h2>
      <h2 className="value">{value}</h2>
    </div>
  );
}
