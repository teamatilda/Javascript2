import "./ZustandRenderTest.css";
import { useFilterStore } from "./store/filterStore";

export default function ZustandRenderTest() {
  const { countryType, regions, sortBy, searchQuery } = useFilterStore();

  return (
    <div className="zustand-render-test-wrapper">
      <p>Country type: {countryType}</p>
      <div>
        Regions:
        {regions.map((region) => (
          <p>{region}</p>
        ))}
      </div>
      <p>Sort by: {sortBy}</p>
      <p>Search query: {searchQuery}</p>
    </div>
  );
}
