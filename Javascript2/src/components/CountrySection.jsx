import CountryCardGrid from "./CountryCardGrid";

function CountrySection({
  title,
  countries,
  emptyText,
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
  onAddFavorite,
  onRemoveFavorite,
  sectionClassName = "countries-section",
}) {
  return (
    <div className="content-box">
      <div className={sectionClassName}>
        <div className="section-header">
          <h3>{title}</h3>

          <div className="pager-buttons">
            <button onClick={onPrev} disabled={prevDisabled}>
              Previous
            </button>
            <button onClick={onNext} disabled={nextDisabled}>
              Next
            </button>
          </div>
        </div>

        <CountryCardGrid
          countries={countries}
          emptyText={emptyText}
          onAddFavorite={onAddFavorite}
          onRemoveFavorite={onRemoveFavorite}
        />
      </div>
    </div>
  );
}

export default CountrySection;