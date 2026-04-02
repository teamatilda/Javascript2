import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-content">
        <NavHeader />
        <div className="nav-controls">
          <NavSearchBar />
          <NavRegionDropdown />
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
  return (
    <div className="nav-search-wrapper">
      <Search size="15" />
      <input
        type="search"
        id="nav-search-bar"
        placeholder="Search countries..."
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
