import { Link } from "react-router-dom";
import "./CountryCard.css";

function CountryCard({ country, onAddFavorite, onRemoveFavorite }) {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddFavorite?.(country);
  };

  const handleRemoveFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemoveFavorite?.(country.name?.common || country.name);
  };

  return (
    <Link
      to={`/country/${country?.name?.common || ""}`}
      className="country-card"
    >
  <div className="country-card__image-wrapper">
      <img
        className="country-card__flag"
        src={country?.flags?.png || ""}
        alt={`Flagga för ${country?.name?.common || "okänt land"}`}
      />

    {onAddFavorite && (
      <button
        className="favorite-button"
        onClick={handleFavoriteClick}
        type="button"
      >
        ☆
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
  </div>

      <div className="country-card__content">
        <div className="country-card__header">
          <h2 className="country-card__title">
            {country?.name?.common || "Okänt land"}
          </h2>

          {onAddFavorite && (
            <button
              className="favorite-button"
              onClick={handleFavoriteClick}
              type="button"
            >
              ☆
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
        </div>

        <p className="country-card__text">
          <strong>Region:</strong> {country?.region || "Ingen data"}
        </p>

        <p className="country-card__text">
          <strong>Huvudstad:</strong> {country?.capital?.[0] || "Ingen data"}
        </p>
      </div>
    </Link>
  );
}

export default CountryCard;