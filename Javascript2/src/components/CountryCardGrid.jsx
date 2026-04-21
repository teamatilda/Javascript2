import CountryCard from "./CountryCard";

function CountryCardGrid({
  countries,
  emptyText,
  onAddFavorite,
  onRemoveFavorite,
}) {
  if (countries.length === 0) {
    return <p>{emptyText}</p>;
  }

  return (
    <div className="countries-grid">
      {countries.map((country, index) => (
        <div
          className="card-scroll-item"
          key={country.name?.common || country.name || index}
        >
          <CountryCard
            country={country}
            onAddFavorite={onAddFavorite}
            onRemoveFavorite={onRemoveFavorite}
          />
        </div>
      ))}
    </div>
  );
}

export default CountryCardGrid;