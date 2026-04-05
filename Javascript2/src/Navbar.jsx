import { Search } from "lucide-react";
import { useFilterStore } from "./store/filterStore";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-content">
        <NavHeader />
        <div className="nav-controls">
          <NavSearchBar />
          <NavRegionDropdown />
        </div>
        <NavFilterControls />
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
  const { setSearchQuery } = useFilterStore();

  return (
    <div className="nav-search-wrapper">
      <Search size="15" />
      <input
        type="search"
        id="nav-search-bar"
        placeholder="Search countries..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

function NavRegionDropdown() {
  return (
    <>
      <select>
        <option value="All Regions">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </>
  );
}

function NavFilterControls() {
  const { setCountryType, setRegions } = useFilterStore();

  return (
    <div className="nav-filter-controls">
      <p>Country type:</p>
      <div className="nav-filter-controls-country-type">
        <NavFilterButton text="All" onClick={() => setCountryType("")} />
        <NavFilterButton
          text="Sovereign State"
          onClick={() => setCountryType("Sovereign State")}
        />
        <NavFilterButton
          text="Dependent"
          onClick={() => setCountryType("Dependent")}
        />
        <NavFilterButton text="Other" onClick={() => setCountryType("Other")} />
      </div>
      <div className="nav-filter-controls-region">
        <p>Regions:</p>
        <NavFilterButton text="All" onClick={() => setRegions("")} />
        <NavFilterButton text="Africa" onClick={() => setRegions("Africa")} />
        <NavFilterButton
          text="Americas"
          onClick={() => setRegions("Americas")}
        />
        <NavFilterButton
          text="Antarctica"
          onClick={() => setRegions("Antarctica")}
        />
        <NavFilterButton text="Asia" onClick={() => setRegions("Asia")} />
        <NavFilterButton text="Europe" onClick={() => setRegions("Europe")} />
        <NavFilterButton text="Oceania" onClick={() => setRegions("Oceania")} />
      </div>
      <div className="nav-filter-controls-sort-by">
        <p>Sort by:</p>
        <NavSortDropdown />
      </div>
    </div>
  );
}

function NavFilterButton({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

function NavSortDropdown() {
  const { setSortBy } = useFilterStore();

  return (
    <>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="Name">Name</option>
        <option value="Population">Population</option>
      </select>
    </>
  );
}
