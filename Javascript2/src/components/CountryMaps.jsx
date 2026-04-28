import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";
import "../styles/index.css";

export default function CountryMap({ country }) {
  // GeoJSON data of all countries
  const [geoData, setGeoData] = useState(null);
  const geoRef = useRef();

  const countryName = country?.name ?? "";

  // Fetch GeoJSON (geometry)
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson",
    )
      .then((res) => res.json())
      .then(setGeoData);
  }, []);

  const style = (feature) => {
    console.log(feature.properties);

    const isSelected =
      feature.properties.name?.toLowerCase() === countryName.toLowerCase();

    // Styling: current country is green, rest is beige
    return {
      fillColor: isSelected ? "green" : "var(--color-accent-dark)",
      fillOpacity: 0.3,
      color: "grey",
      weight: 1,
    };
  };

  // Rendering the map
  // Center - start position
  // Zoom - initial zoom
  // Style - size of map
  // Tilelayer gets street tiles from OpenStreetMap
  // GeoData loading - GeoJSON draws map - Zoom moves map to current country
  return (
    <MapContainer
      center={[50, 10]}
      zoom={4}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {geoData && (
        <>
          <GeoJSON ref={geoRef} data={geoData} style={style} />

          <Zoom geoData={geoData} country={country} key={country?.name} />
        </>
      )}
    </MapContainer>
  );
}

// Zoom function - Zooms in on the current country
// GeoData.feature = array with all countries
// matches right country with the name
function Zoom({ geoData, country }) {
  const map = useMap();

  useEffect(() => {
    if (!geoData || !country) return;

    const feature = geoData.features.find(
      (f) => f.properties.name?.toLowerCase() === country.name?.toLowerCase(),
    );

    // If country doesnt exist - stops execution
    if (!feature) return;

    // converts GeoJSON to leaflet-layer object
    const layer = L.geoJSON(feature);
    const bounds = layer.getBounds();

    map.fitBounds(bounds);
  }, [geoData, country, map]);

  if (!country) return null;
  if (!geoData) return null;
  return null;
}
