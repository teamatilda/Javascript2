import "./ZustandRenderTest.css";
import { useFilterStore } from "../store/filterStore";

export default function ZustandRenderTest() {
  const { countryTypes, regions, sortBy, searchQuery } = useFilterStore();

  return (
    <div className="zustand-render-test-wrapper">
      <p>CURRENT FILTERS</p>
      <hr />
      <div>
        Country types:
        {countryTypes.map((countryType) => (
          <p>{countryType}</p>
        ))}
      </div>
      <div>
        Regions:
        {regions.map((region) => (
          <p>{region}</p>
        ))}
      </div>
      <br />
      <p>Sort by: {sortBy}</p>
      <p>Search query: {searchQuery}</p>
    </div>
  );
}
