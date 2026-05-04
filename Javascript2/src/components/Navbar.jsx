import { Search, ListFilter } from "lucide-react";
import { useState } from "react";
import { useFilterStore } from "../store/filterStore";
import { Link } from "react-router-dom";

// Complete navbar component. The search bar and filter menu values
// are synced with /store/filterStore.js using Zustand.
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

// Header and sub-header
function NavHeader() {
  return (
    <div className="nav-header">
      <h1>Country Explorer</h1>
      <p>See information from countries around the world</p>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
      </div>
    </div>
  );
}

// Search input field
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

// Animated filter menu with country types, regions, sort, and reset button
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
            <NavFilterButtonGroup
              buttonLabels={["All", "Sovereign State", "Dependent", "Other"]}
              filtersArray={countryTypes}
              setFiltersArray={setCountryTypes}
            />
          </div>
          <div className="nav-filter-menu-regions">
            <p>Regions</p>
            <NavFilterButtonGroup
              buttonLabels={[
                "All",
                "Africa",
                "Americas",
                "Antarctica",
                "Asia",
                "Europe",
                "Oceania",
              ]}
              filtersArray={regions}
              setFiltersArray={setRegions}
            />
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

// Reusable toggle-button group for multi-select filters
function NavFilterButtonGroup({ buttonLabels, filtersArray, setFiltersArray }) {
  return (
    <div className="nav-filter-controls-buttons-wrapper">
      {buttonLabels.map((label) => (
        <button
          key={label}
          onClick={() => setFiltersArray(label)}
          className={
            label === "All"
              ? filtersArray.length === 0
                ? "active"
                : ""
              : filtersArray.includes(label)
                ? "active"
                : ""
          }>
          {label}
        </button>
      ))}
    </div>
  );
}

// Dropdown for selecting sort order
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

