import { Info } from "lucide-react";
import "../styles/CountryInfo.css";
import "../styles/index.css";
import WeatherWidget from "./WeatherWidget";
import "flag-icons/css/flag-icons.min.css";

export default function CountryInfo({ country }) {

  return (
    <section className="country-info-card">
      <div className="country-info-header">
        <span className={`fi fi-${country.code}`} />
        <h1 className="country-info-title">{country.name}</h1>
      </div>

      <div className="country-info-section">
        <InfoSection label="Capital" value={country.capital} />
        <InfoSection label="Region" value={country.region} />
        <InfoSection label="Population" value={country.population} />
        <InfoSection label="Languages" value={country.languages} />
      </div>

      <div className="country-info-geography"> 
        <h2 className="country-info-section-title">Geography</h2>
        <InfoSection label="Area" value={country.area} />
        <InfoSection label="Climate" value={country.climate} />
        <InfoSection label="Terrain" value={country.terrain} />
        <InfoSection label="Geographic notes" value={country.geography} />
      </div>

      <div className="country-info-society">
        <h2 className="country-info-section-title">People & Society</h2>
        <InfoSection label="Ethnic Groups" value={country.ethnicity} />
        <InfoSection label="Religion" value={country.religion} />
      </div> 

      <div className="country-info-economy">
        <h2 className="country-info-section-title">Economy</h2>
        <InfoSection label="Currency" value={country.currency} />
        <InfoSection label="Economic Overview" value={country.economy} />
      </div>

      <div className="country-info-government">
        <h2 className="country-info-section-title">Government</h2>
        <InfoSection label="Government Type" value={country.government} />
        <InfoSection label="National Holiday" value={country.holiday} />
      </div>
      

      <div className="country-info-weather">
        <WeatherWidget capital={country.capital} />
      </div>

      <div className="country-info-box">
        <h2>Background</h2>
        <p>{country.background}</p>
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
