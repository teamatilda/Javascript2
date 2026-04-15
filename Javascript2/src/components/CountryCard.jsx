import { Link } from "react-router-dom";
import "../styles/CountryCard.css";

function CountryCard({ country }) {
  return (
    <Link to={`/country/${country.name.common}`} className="country-card">
      <img
        className="country-card__flag"
        src={country.flags?.png}
        alt={`Flagga för ${country.name?.common}`}
      />

      <div className="country-card__content">
        <h2 className="country-card__title">{country.name?.common}</h2>

        <p className="country-card__text">
          <strong>Region:</strong> {country.region}
        </p>

        <p className="country-card__text">
          <strong>Huvudstad:</strong> {country.capital?.[0] || "Ingen data"}
        </p>
      </div>
    </Link>
  );
}

export default CountryCard;
