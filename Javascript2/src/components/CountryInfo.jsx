import "../styles/CountryInfo.css";
import "../styles/index.css";
import WeatherWidget from "./WeatherWidget";

export default function CountryInfo({ country }) {

const currency = country.identity?.currency?.name || "N/A";

  return (
    <section className="country-info-card">
        {/* Header med namn på landet och flagga */}
      <div className="country--info-header">
        <h1 className="country-info-title">{country.name}</h1>
        <img src={country.flag} alt={country.name} />
        {/* Kan behöva ändras beroende på hur vi tar in flaggan */}
      </div>

    {/* Sektion med info om landet */}
      <div className="country-info-section">
        <InfoSection label="Capital" value={country.capital} />
        <InfoSection label="Languages" value={country.languages} />
        <InfoSection label="Currency" value={currency} />
        <InfoSection label="Population" value={country.population} />
      </div>

    {/* Väder widget */}
      <div className="-country-info-weather">
        <WeatherWidget />
      </div>

    {/* Info-box med historia och annan info */}
      <div className="country-info-box">
        <h2>History</h2>
        <p>Text here...{country.history}</p>
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
