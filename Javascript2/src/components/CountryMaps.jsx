import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";


export default function CountryMap({ country }) {
  const [geoData, setGeoData] = useState(null);
  const geoRef = useRef();

  const countryName = country?.name ?? "";

  // Fetch GeoJSON
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson",
    )
      .then((res) => res.json())
      .then(setGeoData);
  }, []);

  const style = (feature) => {
  if (!countryName) return {};

  const isSelected =
    feature.properties.ADMIN?.toLowerCase() ===
    countryName.toLowerCase();

  return {
    fillColor: isSelected ? "green" : "#ccc",
    fillOpacity: 0.6,
    color: "#333",
    weight: 1
  };
};

  return (
    <MapContainer 
    center={[50, 10]} 
    zoom={4} 
    style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {geoData && (
        <>
          <GeoJSON ref={geoRef} data={geoData} style={style} />

          <Zoom geoData={geoData} country={country} />
        </>
      )}
    </MapContainer>
  );
};

// Zoom function - Zooms in on the country
function Zoom({ geoData, country }) {
  const map = useMap();

  useEffect(() => {
    if (!geoData || !country) return;

    const feature = geoData.features.find(
      (f) => f.properties.ADMIN?.toLowerCase() === country.name.toLowerCase(),
    );

    if (!feature) return;

    const layer = L.geoJSON(feature);

    map.fitBounds(layer.getBounds(), {
      padding: [40, 40],
    });
  }, [geoData, country, map]);

  if (!country) return null;
  if (!geoData) return null;
  return null;
};
