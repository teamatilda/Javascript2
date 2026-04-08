import { Search, ListFilter } from "lucide-react";
import { useState } from "react";
import { useFilterStore } from "./store/filterStore";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-content">
        <NavHeader />
        <div className="nav-controls">
          <NavSearchBar />
          <NavFilters />
        </div>
      </div>
    </nav>
  );
}

function NavHeader() {
  return (
    <div className="nav-header">
      <h1>Country Explorer</h1>
      <p>See information from countries around the world</p>
    </div>
  );
}

function NavSearchBar() {
  const { searchQuery, setSearchQuery } = useFilterStore();

  return (
    <div className="nav-search-wrapper">
      <Search size="15" />
      <input
        type="search"
        id="nav-search-bar"
        placeholder="Search countries..."
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
    </div>
  );
}

function NavFilters() {
  const [filterMenuActive, setFilterMenuActive] = useState(false);
  const {
    countryTypes,
    regions,
    setCountryTypes,
    setRegions,
    setSortBy,
    setSearchQuery,
  } = useFilterStore();

  return (
    <div className="nav-filter-controls">
      <div className={`nav-filter-menu ${filterMenuActive ? "active" : ""}`}>
        <div className="nav-filter-menu-top">
          <div className="nav-filter-menu-country-type">
            <p>Country Type</p>
            <div className="nav-filter-controls-buttons-wrapper">
              {["All", "Sovereign State", "Dependent", "Other"].map((value) => (
                <button
                  key={value}
                  onClick={() => setCountryTypes(value)}
                  className={
                    value === "All"
                      ? countryTypes.length === 0
                        ? "active"
                        : ""
                      : countryTypes.includes(value)
                        ? "active"
                        : ""
                  }>
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div className="nav-filter-menu-regions">
            <p>Regions</p>
            <div className="nav-filter-controls-buttons-wrapper">
              {[
                "All",
                "Africa",
                "Americas",
                "Antarctica",
                "Asia",
                "Europe",
                "Oceania",
              ].map((value) => (
                <button
                  key={value}
                  onClick={() => setRegions(value)}
                  className={
                    value === "All"
                      ? regions.length === 0
                        ? "active"
                        : ""
                      : regions.includes(value)
                        ? "active"
                        : ""
                  }>
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="nav-filter-menu-bottom">
          <div className="nav-filter-menu-sort">
            <p>Sort By</p>
            <NavSortDropdown />
          </div>
          <div className="nav-filter-menu-reset">
            <button
              id="nav-filters-reset-btn"
              onClick={() => {
                setCountryTypes("All");
                setRegions("All");
                setSearchQuery("");
                setSortBy("Name");
              }}>
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <button
        id="nav-filter-toggle-btn"
        onClick={() => setFilterMenuActive(!filterMenuActive)}>
        {filterMenuActive ? "Hide filters" : "Show filters"}
        <ListFilter size="11" />
      </button>
    </div>
  );
}

function NavSortDropdown() {
  const { sortBy, setSortBy } = useFilterStore();

  return (
    <>
      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <option value="Name">Name</option>
        <option value="Population">Population</option>
      </select>
    </>
  );
}
