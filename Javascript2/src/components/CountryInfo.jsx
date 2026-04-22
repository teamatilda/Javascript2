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

      <div className="country-info-section">
        <InfoSection label="Capital" value={country.capital} />
        <InfoSection label="Currency" value={country.currency} />
        <InfoSection label="Population" value={country.population} />
        <InfoSection label="Area" value={country.area} />
        <InfoSection label="Region" value={country.region} />
        <InfoSection label="Languages" value={country.languages} />
      </div>

      <div className="country-info-weather">
        <WeatherWidget capital={country.capital} />
      </div>

      <div className="country-info-box">
        <h2>Background</h2>
        <p>{country.background}</p>
      </div>

      
      <div className="country-map">
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
