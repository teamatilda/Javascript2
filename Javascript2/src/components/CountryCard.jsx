import { Link } from "react-router-dom";
import "../styles/CountryCard.css";

function CountryCard({ country, onAddFavorite, onRemoveFavorite }) {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddFavorite?.(country);
  };

  const handleRemoveFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemoveFavorite?.(country.name);
  };

  return (
    <Link
      to={`/country/${country?.slug || country?.name || ""}`}
      className="country-card"
    >
      {onAddFavorite && (
        <button
          className="favorite-button"
          onClick={handleFavoriteClick}
          type="button"
        >
          ★
        </button>
      )}

      {onRemoveFavorite && (
        <button
          className="favorite-button"
          onClick={handleRemoveFavorite}
          type="button"
        >
          ✕
        </button>
      )}

      <h2 className="country-card__title">
        {country?.name || "Okänt land"}
      </h2>

      <div className="country-card__body">
        <div className="country-card__text-left">
          <p className="country-card__text">
            <strong>Region:</strong> {country?.region || "Ingen data"}
          </p>

          <p className="country-card__text">
            <strong>Huvudstad:</strong> {country?.capital || "Ingen data"}
          </p>
        </div>

        <div className="country-card__flag-right">
          <span
            className={`fi fi-${country?.code || ""}`}
            aria-label={`Flagga för ${country?.name || "okänt land"}`}
          ></span>
        </div>
      </div>
    </Link>
  );
}

export default CountryCard;